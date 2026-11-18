#!/usr/bin/env python3
"""
Parte una imagen grande en una pirámide de teselas WebP para el lienzo.

Uso (desde la raíz del proyecto):
  npm run teselas -- <fuente> [--ancho N]
  (= uv run --with pillow python -I scripts/teselas.py <fuente> [--ancho N])

<fuente> puede ser:
  - la URL de un info.json IIIF (Rijksmuseum, Getty, Art Institute, bibliotecas…): descarga full/max;
  - la URL directa de una imagen;
  - un fichero local;
  - --prueba: genera una imagen de prueba (rejilla numerada de 4096 × 2560) para arrancar la
    plantilla antes de tener la obra.

Salida:
  public/teselas/<n>/<col>_<fila>.webp   nivel n = escala 1/2^n (0 = resolución completa)
  public/teselas/vista.webp              imagen entera de 2048 px de ancho como base
  src/lienzo.json                        {ancho, alto, tesela, niveles}

--ancho N: reduce la imagen a N px de ancho antes de teselar. Úsalo con originales enormes
  (Google Art Project, gigapíxel): el peso crece ×4 por cada ×2 de ancho; 6000–8000 px dan 5–11 MB.

Lo descargado se guarda en originales/ (ignorado por git) y se reutiliza. originales/original.jpg
es siempre la imagen YA reducida que se tesela: recortes.py trabaja sobre ella, en las mismas
coordenadas que src/lienzo.json y los rectángulos de src/content.ts.
La licencia y la procedencia de la imagen van en src/content.ts (OBRA), no aquí.
"""
import hashlib
import json
import math
import pathlib
import sys
import urllib.request

from PIL import Image

Image.MAX_IMAGE_PIXELS = 2_000_000_000  # escaneos gigapíxel (Google Art Project) superan los 600 Mpx
ANCHO_AVISO = 8000  # por encima, las teselas pasan de ~11 MB: sugerir --ancho

RAIZ = pathlib.Path.cwd()
ORIGINALES = RAIZ / "originales"
SALIDA = RAIZ / "public" / "teselas"
TESELA = 512
CALIDAD = 80
ANCHO_VISTA = 2048


def bajar(url: str, destino: pathlib.Path) -> None:
    if destino.exists():
        return
    req = urllib.request.Request(url, headers={"User-Agent": "web-lienzo/1.0"})
    with urllib.request.urlopen(req, timeout=300) as r:
        destino.write_bytes(r.read())


def prueba() -> pathlib.Path:
    from PIL import ImageDraw, ImageFont

    ORIGINALES.mkdir(exist_ok=True)
    w, h, lado = 4096, 2560, 256
    im = Image.new("RGB", (w, h))
    d = ImageDraw.Draw(im)
    fuente = ImageFont.load_default(size=40)
    for fila in range(h // lado):
        for col in range(w // lado):
            tono = 200 + 30 * ((fila + col) % 2)
            d.rectangle([col * lado, fila * lado, (col + 1) * lado, (fila + 1) * lado], fill=(tono, tono - 10 * (fila % 3), tono - 20 * (col % 3)))
            d.text((col * lado + 12, fila * lado + 10), f"{col * lado},{fila * lado}", fill=(40, 40, 60), font=fuente)
    destino = ORIGINALES / "original.jpg"
    im.save(destino, quality=90)
    return destino


def obtener(fuente: str) -> pathlib.Path:
    if fuente == "--prueba":
        return prueba()
    if not fuente.startswith("http"):
        return pathlib.Path(fuente).resolve()
    ORIGINALES.mkdir(exist_ok=True)
    if fuente.endswith("info.json"):
        info = json.loads(urllib.request.urlopen(urllib.request.Request(fuente, headers={"User-Agent": "web-lienzo/1.0"}), timeout=60).read())
        base = info.get("id") or info.get("@id")
        url = f"{base}/full/max/0/default.jpg" if "ImageService3" in str(info.get("type", "")) else f"{base}/full/full/0/default.jpg"
        print(f"IIIF {info['width']}×{info['height']} → {url}")
    else:
        url = fuente
    # Una copia por URL (no se mezcla una obra con otra) y original.jpg apunta a la última usada.
    copia = ORIGINALES / f"{hashlib.sha1(url.encode()).hexdigest()[:10]}.jpg"
    bajar(url, copia)
    return copia


def main() -> None:
    args = sys.argv[1:]
    ancho_max = None
    if "--ancho" in args:
        i = args.index("--ancho")
        ancho_max = int(args[i + 1])
        del args[i : i + 2]
    if not args:
        sys.exit(__doc__)
    fuente = obtener(args[0])
    im = Image.open(fuente)
    reducida = bool(ancho_max and im.width > ancho_max)
    if reducida:
        im.draft("RGB", (ancho_max, round(im.height * ancho_max / im.width)))  # JPEG: decodifica ya reducido
    im = im.convert("RGB")
    if reducida and im.width != ancho_max:
        im = im.resize((ancho_max, round(im.height * ancho_max / im.width)), Image.LANCZOS)
    elif not ancho_max and im.width > ANCHO_AVISO:
        print(f"Aviso: {im.width} px de ancho; las teselas pesarán mucho. Prueba --ancho {ANCHO_AVISO}.")
    # original.jpg = lo que se tesela (mismas coordenadas que lienzo.json); recortes.py lo usa.
    ORIGINALES.mkdir(exist_ok=True)
    original = ORIGINALES / "original.jpg"
    if reducida or fuente != original.resolve():
        im.save(original, quality=92)
    ancho, alto = im.size
    # Niveles hasta que la imagen entera quepa en una tesela.
    niveles = max(1, math.ceil(math.log2(max(ancho, alto) / TESELA)) + 1)
    # Solo se sustituyen las teselas que genera este script (nada más dentro de public/).
    for viejo in SALIDA.glob("*/*.webp"):
        viejo.unlink()
    total = 0
    for n in range(niveles):
        escala = 2 ** n
        w, h = math.ceil(ancho / escala), math.ceil(alto / escala)
        nivel = im if n == 0 else im.resize((w, h), Image.LANCZOS)
        carpeta = SALIDA / str(n)
        carpeta.mkdir(parents=True, exist_ok=True)
        for fila in range(math.ceil(h / TESELA)):
            for col in range(math.ceil(w / TESELA)):
                caja = (col * TESELA, fila * TESELA, min(w, (col + 1) * TESELA), min(h, (fila + 1) * TESELA))
                nivel.crop(caja).save(carpeta / f"{col}_{fila}.webp", "WEBP", quality=CALIDAD, method=6)
                total += 1
    vista = im.resize((ANCHO_VISTA, round(alto * ANCHO_VISTA / ancho)), Image.LANCZOS)
    vista.save(SALIDA / "vista.webp", "WEBP", quality=CALIDAD, method=6)
    (RAIZ / "src" / "lienzo.json").write_text(
        json.dumps({"ancho": ancho, "alto": alto, "tesela": TESELA, "niveles": niveles}) + "\n", encoding="utf-8"
    )
    peso = sum(f.stat().st_size for f in SALIDA.rglob("*.webp"))
    print(f"{ancho}×{alto}, {niveles} niveles, {total} teselas, {peso / 1e6:.1f} MB")


if __name__ == "__main__":
    main()
