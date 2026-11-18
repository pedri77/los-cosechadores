/**
 * Todo el texto de la web.
 *
 * Rectángulos en píxeles de la imagen original (src/lienzo.json, 8000 × 5827): [x, y, ancho, alto].
 * Localizados con `npm run recortes -- --rejilla x,y …` y comprobados con `npm run recortes`.
 * Cada afirmación lleva su fuente (claves de FUENTES); el test de contenido lo exige.
 */
import type {Rect} from './lib/camara';

export const ID = 'los-cosechadores';
export const TITULO = 'Los cosechadores, de cerca';
export const SUBTITULO = 'Pieter Bruegel el Viejo, Los cosechadores, 1565';
export const ENTRADA =
  'De lejos es una tarde de agosto dorada. De cerca, alguien duerme la siesta, unos bañistas se meten desnudos en un estanque y en el prado del pueblo le tiran palos a un ave atada. Acércate.';
export const ETIQUETA = 'Bruegel · 1565';
export const TODO_ENCONTRADO = '¡Los has encontrado todos! Sigue mirando: en este cuadro siempre queda algo.';

export const OBRA = {
  autorCorto: 'Bruegel',
  titulo: 'Los cosechadores',
  original: 'The Harvesters',
  autor: 'Pieter Bruegel el Viejo (Breda?, h. 1525 – Bruselas, 1569)',
  fecha: '1565',
  tecnica: 'Óleo sobre tabla de roble, 119 × 162 cm con los añadidos (superficie original 116,5 × 159,5 cm)',
  museo: 'The Metropolitan Museum of Art, Nueva York (19.164)',
  url: 'https://www.metmuseum.org/art/collection/search/435809',
  imagen:
    'Imagen: Google Art Project, vía Wikimedia Commons, dominio público (reproducción fiel de una obra de dominio público). El Met publica la obra en su programa Open Access (CC0).',
};

/** Párrafos de «Sobre el cuadro». */
export const SOBRE = [
  'Bruegel pintó Los cosechadores en 1565 como parte de un ciclo de seis tablas sobre las estaciones que le encargó un comerciante de Amberes para el comedor de su casa de campo. Es julio o agosto: unos siegan, otros recogen fruta y otros descansan a la sombra.',
  'En el Met la consideran una de las primeras pinturas de paisaje sin pretexto religioso: no hay santo ni historia en primer plano, solo el campo y el calendario del trabajo. Lleva en el museo desde 1919.',
];

export type Fuente = {titulo: string; url: string};
export const FUENTES: Record<string, Fuente> = {
  met: {titulo: 'The Met, ficha y audioguía de The Harvesters', url: 'https://www.metmuseum.org/art/collection/search/435809'},
  bringley: {
    titulo: 'Patrick Bringley, «The World, and That’s All», The Met Perspectives, 2024',
    url: 'https://www.metmuseum.org/perspectives/patrick-bringley-harvesters',
  },
  salway: {
    titulo: 'Freya Salway (Google Arts & Culture), en Artnet News, 2024',
    url: 'https://news.artnet.com/art-world/ugly-pretty-bruegel-the-elder-2586634-2586634',
  },
  wikipedia: {titulo: 'Wikipedia, The Harvesters (painting)', url: 'https://en.wikipedia.org/wiki/The_Harvesters_(painting)'},
  commons: {
    titulo: 'Wikimedia Commons, imagen de Google Art Project',
    url: 'https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder-_The_Harvesters_-_Google_Art_Project.jpg',
  },
};

export type Parada = {id: string; titulo: string; texto: string; rect: Rect; fuentes: string[]};

/** Recorrido guiado: alterna zonas y escalas. */
export const PARADAS: Parada[] = [
  {
    id: 'siesta',
    titulo: 'La siesta',
    texto:
      'Bajo el peral, un segador duerme tirado en el suelo, con la camisa abierta y las piernas separadas. Patrick Bringley, que pasó años de vigilante en el Met delante de este cuadro, la llama la siesta más reparadora del mundo.',
    rect: [3580, 4560, 1440, 1160],
    fuentes: ['bringley'],
  },
  {
    id: 'barcos',
    titulo: 'Velas en la bahía',
    texto:
      'Al fondo, sobre el agua, hay dos barcos del tamaño de un grano de arroz, con mástiles y velas. Bringley los imagina listos para llevar la cosecha a puertos lejanos.',
    rect: [2880, 1980, 300, 100],
    fuentes: ['bringley'],
  },
  {
    id: 'comida',
    titulo: 'Comer a la sombra',
    texto:
      'Nueve personas comen a mediodía bajo el único árbol. Para la historiadora Linda Civitello, en la audioguía del Met, la base es el pan: en el siglo XVI la pregunta era qué había para acompañarlo. Aquí hay cuencos de gachas, probablemente de trigo.',
    rect: [5150, 4000, 2400, 1380],
    fuentes: ['met'],
  },
  {
    id: 'gallo',
    titulo: 'Un juego cruel',
    texto:
      'En el prado del pueblo, un ave cuelga de un palo y un grupo le lanza palos. Es el lanzamiento del gallo, un juego de la época que Bringley llama cruel: el animal acababa muerto.',
    rect: [2700, 2770, 820, 170],
    fuentes: ['bringley'],
  },
  {
    id: 'queso',
    titulo: 'La rueda de queso',
    texto:
      'La mujer del gran sombrero negro corta una loncha de una rueda de queso enorme. Según la audioguía del Met, tener algo más que pan ya era una suerte. Civitello añade que no es gente flaca.',
    rect: [6800, 4460, 640, 460],
    fuentes: ['met'],
  },
  {
    id: 'estanque',
    titulo: 'Baño en el estanque',
    texto:
      'Unas figuras diminutas se bañan desnudas y otras se sientan en la orilla. Bringley las describe como monjes; Freya Salway, de Google Arts & Culture, cree ver monjes y mujeres, y se pregunta si Bruegel no dejó aquí un pequeño acto de rebeldía.',
    rect: [1740, 2820, 300, 170],
    fuentes: ['bringley', 'salway'],
  },
  {
    id: 'agachada',
    titulo: 'Doblada como el trigo',
    texto:
      'Una mujer se agacha a recoger el trigo segado. Su silueta, un triángulo, se parece a la de las gavillas que la rodean: el Met dice que parece fundirse con el paisaje.',
    rect: [6000, 3470, 500, 500],
    fuentes: ['met'],
  },
  {
    id: 'jarras',
    titulo: 'El pasillo del trigo',
    texto:
      'Alguien ha abierto un pasillo en el trigo, que llega a la altura de un hombre. Por él baja un joven con una jarra en cada mano. En la audioguía del Met lo dicen así: el trigo es tan alto como los hombres.',
    rect: [2560, 3720, 420, 780],
    fuentes: ['met'],
  },
  {
    id: 'paisaje',
    titulo: 'Un paisaje que no existe',
    texto:
      'Colinas, un valle, un pueblo, una bahía y el horizonte. Adam Eaker, conservador del Met, recuerda que Flandes es muy llano: Bruegel inventó esta vista para que se viera todo, y encima colocó detalles muy reales de la vida diaria.',
    rect: [0, 1650, 4300, 1650],
    fuentes: ['met'],
  },
  {
    id: 'ciclo',
    titulo: 'Un comedor que gira con el año',
    texto:
      'Esta tabla era una de seis sobre las estaciones, encargadas por un comerciante de Amberes para el comedor de su casa de campo. El Met advierte que el trabajo está idealizado: la abundancia y la armonía se ven, la dureza del campo casi no. Ahora te toca buscar a ti.',
    rect: [0, 0, 8000, 5827],
    fuentes: ['met'],
  },
];

export type Busqueda = {id: string; nombre: string; pista: string; hallazgo: string; rect: Rect; fuentes: string[]};

/** «Busca»: detalles pequeños que NO están en el recorrido. */
export const BUSCA: Busqueda[] = [
  {
    id: 'jarra',
    nombre: 'La jarra escondida',
    pista: 'Abajo a la izquierda, entre las espigas, casi tapada.',
    hallazgo: 'Una jarra metida entre el trigo, en la poca sombra que hay, para que el agua siga fresca.',
    rect: [680, 5080, 320, 520],
    fuentes: ['bringley'],
  },
  {
    id: 'carro',
    nombre: 'El carro cargado',
    pista: 'A la izquierda, detrás de la colina de trigo, unos animales tiran de algo.',
    hallazgo: 'Un carro cargado hasta arriba, tirado por bueyes, por el camino del valle.',
    rect: [520, 2860, 540, 290],
    fuentes: ['commons'],
  },
  {
    id: 'pajaros',
    nombre: 'Dos pájaros',
    pista: 'Sobre el trigo de la izquierda, algo vuela bajo.',
    hallazgo: 'Dos pájaros pequeños vuelan a ras del campo.',
    rect: [820, 3680, 330, 200],
    fuentes: ['commons'],
  },
  {
    id: 'fruta',
    nombre: 'La fruta caída',
    pista: 'Al fondo a la derecha, entre gavillas, dos personas miran al suelo.',
    hallazgo: 'Dos personas se agachan a recoger fruta caída. La ficha del Met cuenta que en el cuadro también se recogen manzanas.',
    rect: [7220, 3020, 700, 240],
    fuentes: ['met'],
  },
  {
    id: 'arbol',
    nombre: 'Subido al árbol',
    pista: 'Mira arriba, entre las ramas del borde derecho.',
    hallazgo: 'Alguien se ha subido a un árbol. Wikipedia lo describe cogiendo peras para los de abajo.',
    rect: [7650, 1930, 150, 220],
    fuentes: ['wikipedia'],
  },
  {
    id: 'iglesia',
    nombre: 'La iglesia',
    pista: 'Detrás del peral, algo más alto que las casas.',
    hallazgo: 'La iglesia del pueblo asoma entre los árboles, con su torre de campanario.',
    rect: [5550, 1650, 550, 600],
    fuentes: ['commons'],
  },
];
