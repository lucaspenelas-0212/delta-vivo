/* =========================================================
   DELTA VIVO — script.js
   JavaScript vanilla. Requiere: Leaflet, Chart.js, Lucide (CDN).
   ========================================================= */
'use strict';

/* =========================================================
   1. DATOS
   Toda la información proviene de la investigación entregada.
   Los agregados verificados se marcan con "verificado: true".
   ========================================================= */

/* ---------- Especies ---------- */
const GROUPS = {
  flora:     { icon: 'sprout',    label: 'Flora',
               intro: 'Entre 643 y 700 especies de plantas, aproximadamente. Árboles del bosque ribereño, plantas flotantes y pajonales adaptados a vivir con el agua o a resistir las crecidas.' },
  mamiferos: { icon: 'paw-print', label: 'Mamíferos',
               intro: 'Del roedor más grande del mundo al ciervo más amenazado del Delta.' },
  aves:      { icon: 'bird',      label: 'Aves',
               intro: 'Garzas inmóviles en la orilla, pescadores en picada y especies que ya no aparecen en los registros.' },
  reptiles:  { icon: 'turtle',    label: 'Reptiles y anfibios',
               intro: 'La banda sonora de la noche en el humedal y algunos vecinos que conviene conocer.' },
  peces:     { icon: 'fish',      label: 'Peces e invertebrados',
               intro: 'Del dorado al caracol manzana: la vida debajo de la superficie.' }
};

const SPECIES = {
  flora: [
    { name: 'Ceibo', sci: 'Erythrina crista-galli', desc: 'Flor nacional argentina, inconfundible por sus flores rojas. Es uno de los árboles característicos del bosque ribereño.', traits: ['Flor nacional', 'Bosque ribereño'] },
    { name: 'Sauce criollo', sci: 'Salix humboldtiana', desc: 'El único sauce nativo de Argentina. Crece en las orillas de ríos y arroyos.', traits: ['Único sauce nativo', 'Orillas'] },
    { name: 'Aliso de río', sci: 'Tessaria integrifolia', desc: 'Arbolito pionero: es de los primeros en crecer cuando se forma una isla nueva.', traits: ['Pionero', 'Islas nuevas'] },
    { name: 'Espinillo', sci: 'Vachellia caven', desc: 'Muy común en las zonas un poco más altas de las islas.', traits: ['Zonas altas'] },
    { name: 'Curupí', sci: 'Sapium haematospermum', desc: 'Árbol frecuente en los sectores más elevados de las islas.', traits: ['Zonas altas'] },
    { name: 'Camalote', sci: 'Pontederia crassipes', note: 'Antes clasificado como Eichhornia crassipes.', desc: 'La “balsa natural” del río: flota, tiene flores lilas y transporta a muchos pequeños animales aguas abajo.', traits: ['Flotante', 'Flores lilas'] },
    { name: 'Junco', sci: 'Schoenoplectus californicus', desc: 'Planta alta de orilla, clave para frenar la erosión del agua. Da refugio a la fauna (y a los mosquitos).', traits: ['Orilla', 'Frena la erosión'] },
    { name: 'Totora', sci: 'Typha spp.', wiki: 'es:Typha domingensis|en:Typha domingensis|en:Typha', desc: 'Junto con los juncos, forma los pastos altos de la orilla: frena la erosión y ayuda a filtrar el agua.', traits: ['Palustre', 'Filtra el agua'] },
    { name: 'Irupé', sci: 'Victoria cruziana', desc: 'Sus hojas flotantes gigantes parecen platos verdes. Es más común hacia el norte, pero también está presente en el Delta.', traits: ['Hojas gigantes', 'Flotante'] },
    { name: 'Lentejita de agua', sci: 'Lemna spp.', wiki: 'es:Lemna|en:Lemna', desc: 'Diminuta planta flotante que cubre de verde la superficie de las lagunas mansas.', traits: ['Flotante', 'Aguas quietas'] },
    { name: 'Helechito de agua', sci: 'Azolla filiculoides', desc: 'Helecho flotante que, junto con la lentejita, tapiza las lagunas tranquilas.', traits: ['Flotante', 'Aguas quietas'] },
    { name: 'Cortadera', sci: 'Cortaderia selloana', desc: 'Gramínea de gran porte, con penachos plumosos, presente en los ambientes húmedos del Delta.', traits: ['Gramínea'] },
    { name: 'Paja de techar', sci: 'Panicum prionitis', note: 'Hoy también clasificada como Coleataenia prionitis.', wiki: 'en:Coleataenia prionitis|es:Panicum prionitis', desc: 'Forma pajonales característicos de las islas. Como indica su nombre, se usó tradicionalmente para techar.', traits: ['Pajonal'] },
    { name: 'Monte blanco', sci: 'Comunidad vegetal', community: true, wiki: '', desc: 'No es una especie sino un tipo de bosque: la selva ribereña de las zonas altas de las islas, conocida como “monte blanco”.', note: 'La investigación lo incluía en la lista de plantas; se presenta aquí como comunidad vegetal.', traits: ['Comunidad', 'Bosque ribereño'] }
  ],
  mamiferos: [
    { name: 'Carpincho', sci: 'Hydrochoerus hydrochaeris', desc: 'El roedor más grande del mundo y emblema indiscutido del Delta. En zonas urbanizadas queda atrapado entre avenidas y sufre altos niveles de atropellamiento.', traits: ['Roedor más grande del mundo'] },
    { name: 'Coipo', sci: 'Myocastor coypus', desc: 'También llamado “falsa nutria”. Roedor acuático más chico que el carpincho, con cola de ratón; se lo ve nadando en los canales.', traits: ['Acuático'] },
    { name: 'Ciervo de los pantanos', sci: 'Blastocerus dichotomus', status: 'Amenazado', desc: 'El animal más grande y más amenazado del Delta: pesa hasta 150 kilos y tiene pezuñas especiales para no hundirse en el barro. El relleno de tierras para barrios privados lo acorraló.', traits: ['Hasta 150 kg', 'Pezuñas adaptadas al barro'] },
    { name: 'Lobito de río', sci: 'Lontra longicaudis', desc: 'Nutria carnívora, juguetona y escurridiza, difícil de ver.', traits: ['Carnívoro', 'Acuático'] },
    { name: 'Gato montés', sci: 'Leopardus geoffroyi', desc: 'Predador de la zona de monte que ayuda a controlar plagas.', traits: ['Predador'] },
    { name: 'Comadreja overa', sci: 'Didelphis albiventris', desc: 'Marsupial del monte; como predador, también contribuye a controlar plagas.', traits: ['Marsupial', 'Predador'] }
  ],
  aves: [
    { name: 'Garza blanca', sci: 'Ardea alba', desc: 'Siempre parada como una estatua en la orilla, al acecho de peces.', traits: ['Pescadora'] },
    { name: 'Garza mora', sci: 'Ardea cocoi', desc: 'La más grande de las garzas del Delta; pesca inmóvil en las orillas.', traits: ['Pescadora'] },
    { name: 'Garza bruja', sci: 'Nycticorax nycticorax', desc: 'Garza robusta de hábitos crepusculares y nocturnos.', traits: ['Nocturna'] },
    { name: 'Biguá', sci: 'Nannopterum brasilianum', note: 'Antes clasificado como Phalacrocorax brasilianus.', desc: 'Ave negra que se sumerge a pescar y después se queda al sol con las alas abiertas para secarse.', traits: ['Buceadora'] },
    { name: 'Martín pescador chico', sci: 'Chloroceryle americana', desc: 'Pequeño, verde y anaranjado: se lanza de cabeza al agua para atrapar mojarras.', traits: ['Pescador en picada'] },
    { name: 'Gavilán caracolero', sci: 'Rostrhamus sociabilis', desc: 'Ave rapaz que se alimenta casi exclusivamente de los caracoles grandes del río, como el caracol manzana.', traits: ['Rapaz', 'Come caracoles'] },
    { name: 'Chajá', sci: 'Chauna torquata', desc: 'Clásico de las lagunas, de gran tamaño y grito inconfundible.', traits: ['Lagunas'] },
    { name: 'Pato sirirí', sci: 'Dendrocygna viduata', desc: 'Otro clásico de las lagunas del Delta.', traits: ['Lagunas'] },
    { name: 'Tordo amarillo', sci: 'Xanthopsar flavus', status: 'Amenazado a nivel mundial', desc: 'Especie amenazada a nivel mundial que dejó de registrarse en el relevamiento de aves del Bajo Delta de 2012-2013.', traits: ['No registrado en 2012-2013'] }
  ],
  reptiles: [
    { name: 'Lagarto overo', sci: 'Salvator merianae', note: 'La investigación lo llamaba “iguana”: es un lagarto de la familia de los teidos, no una iguana.', desc: 'El gran lagarto del Delta: en verano se lo cruza tomando sol en el pasto.', traits: ['Reptil', 'Activo en verano'] },
    { name: 'Tortuga de laguna (campanita)', sci: 'Phrynops hilarii', desc: 'Tortuga acuática frecuente en lagunas y arroyos del Delta.', traits: ['Acuática'] },
    { name: 'Tortuga de cuello largo', sci: 'Hydromedusa tectifera', desc: 'Tortuga acuática de cuello muy largo.', traits: ['Acuática'] },
    { name: 'Rana criolla', sci: 'Leptodactylus latrans', desc: 'Parte de la “banda sonora” de la noche en el humedal.', traits: ['Anfibio'] },
    { name: 'Ranita del zarzal', sci: 'Boana pulchella', desc: 'Pequeña rana arborícola de la vegetación de orilla.', traits: ['Anfibio', 'Arborícola'] },
    { name: 'Sapo común', sci: 'Rhinella arenarum', desc: 'El sapo de todos los jardines y bañados. Ranas y sapos pierden sus fuentes de agua por pavimentación y contaminación.', traits: ['Anfibio'] },
    { name: 'Culebras acuáticas', sci: 'Varias especies', wiki: 'es:Helicops infrataeniatus|en:Helicops infrataeniatus', imgNote: 'Imagen de referencia: Helicops infrataeniatus.', desc: 'Culebras de agua inofensivas para las personas.', traits: ['Inofensivas'] },
    { name: 'Yarará', sci: 'Bothrops alternatus', status: 'Venenosa', desc: 'Serpiente venenosa: de las especies de este catálogo, es la única de la que hay que mantenerse lejos.', traits: ['Venenosa'] }
  ],
  peces: [
    { name: 'Mojarra', sci: 'Astyanax spp.', wiki: 'es:Astyanax|en:Astyanax (fish)', desc: 'Pez pequeño y abundante; alimento de garzas y martines pescadores.', traits: ['Pez'] },
    { name: 'Tararira', sci: 'Hoplias malabaricus', desc: 'Pez predador de aguas quietas y vegetadas.', traits: ['Pez', 'Predador'] },
    { name: 'Sábalo', sci: 'Prochilodus lineatus', desc: 'Uno de los peces emblemáticos del río Paraná.', traits: ['Pez'] },
    { name: 'Bagre', sci: 'Pimelodus maculatus', imgNote: 'Bagre amarillo, una de las especies conocidas como bagre.', desc: 'Pez de fondo con “bigotes” (barbillas) que le permiten encontrar alimento.', traits: ['Pez de fondo'] },
    { name: 'Dorado', sci: 'Salminus brasiliensis', desc: 'El “tigre de los ríos”: gran pez predador del Paraná.', traits: ['Pez', 'Predador'] },
    { name: 'Araña lobo', sci: 'Familia Lycosidae', wiki: 'es:Lycosidae|en:Wolf spider', desc: 'Araña cazadora que no teje telas para atrapar presas.', traits: ['Invertebrado', 'Cazadora'] },
    { name: 'Caracol manzana', sci: 'Pomacea canaliculata', desc: 'Caracol grande de agua dulce; es el alimento casi exclusivo del gavilán caracolero.', traits: ['Invertebrado', 'Acuático'] },
    { name: 'Mosquitos y jejenes', sci: 'Varios grupos de insectos', wiki: 'es:Culicidae|en:Mosquito', imgNote: 'Imagen de referencia: mosquito (familia Culicidae).', desc: 'Los infaltables del verano en el humedal, también parte de la red alimentaria.', traits: ['Invertebrado', 'Verano'] }
  ]
};

/* ---------- Estados judiciales ---------- */
const STATUS = {
  tramite:       { label: 'Investigación en trámite', color: '#D8C3A5', ink: '#202923',
                   def: 'La causa está abierta y se reúnen pruebas. No hay una decisión judicial sobre responsabilidades.' },
  procesamiento: { label: 'Procesamiento', color: '#D9825B', ink: '#fff',
                   def: 'El juez considera que hay elementos suficientes para atribuir de manera provisoria la participación en un hecho y seguir avanzando. No es una condena.' },
  juicio:        { label: 'Elevación a juicio', color: '#C8664F', ink: '#fff',
                   def: 'La causa pasa a la etapa de juicio oral, donde un tribunal decidirá si hay responsabilidad penal. Tampoco es una condena.' },
  firme:         { label: 'Sentencia firme', color: '#2D6A4F', ink: '#fff',
                   def: 'Decisión judicial que ya no puede apelarse: establece obligaciones o responsabilidades definitivas.' },
  pendiente:     { label: 'Cumplimiento pendiente', color: '#E0A458', ink: '#202923',
                   def: 'Existe una orden judicial cuyas medidas (por ejemplo, recomponer el ambiente) todavía deben ejecutarse.' },
  noconf:        { label: 'Estado no confirmado', color: '#9aa39d', ink: '#fff',
                   def: 'Las fuentes consultadas no permiten saber en qué etapa está la causa actualmente.' }
};

const PLACES = {
  ramallo:     'Ramallo (Buenos Aires)',
  lechiguanas: 'Islas Lechiguanas (Entre Ríos)',
  victoria:    'Victoria (Entre Ríos)'
};

/* ---------- Casos judiciales ---------- */
const CASES = [
  {
    id: 'lojda', file: 'Caso 01', company: 'Naviera Lojda S.A.', place: 'ramallo',
    location: 'Humedal de Paso del Tonelero, partido de Ramallo, provincia de Buenos Aires',
    activity: 'Empresa arenera.',
    problem: 'Intervenciones sobre bañados y humedales costeros de Paso del Tonelero. La investigación las resume como rellenos y pérdida de humedal.',
    area: 'La sentencia ordena reparar 2 hectáreas del humedal (dato verificado en Economía Sustentable).',
    status: ['firme', 'pendiente'],
    chron: [
      { d: '2012', t: 'Vecinos y personas afectadas inician el expediente.', verified: true },
      { d: 'Primera instancia', t: 'La Justicia bonaerense ordena detener las actividades que afectan los bañados y recomponer el ambiente dañado.' },
      { d: 'Sep. 2026', t: 'La Suprema Corte bonaerense rechaza el recurso extraordinario de la empresa y la sentencia queda firme. Resta ejecutar la recomposición ambiental.' }
    ],
    sources: [
      { t: 'La Voz de Ramallo, 28/09/2026' },
      { t: 'Economía Sustentable: la Justicia confirmó que Naviera Lojda deberá reparar un humedal de Ramallo', url: 'https://economiasustentable.com/noticias/la-justicia-confirmo-que-la-empresa-naviera-lojda-debera-reparar-un-humedal-de-ramallo/' }
    ],
    note: 'En la investigación original este caso figuraba primero sin nombre (“la empresa arenera”) y luego, en la tabla comparativa, como Naviera Lojda S.A. Se verificó que es el mismo caso. La fecha de 2012 y la superficie de 2 ha se agregaron a partir de esa verificación.',
    legal: 'Es el único de los cuatro casos con sentencia firme.'
  },
  {
    id: 'mapuche', file: 'Caso 02', company: 'El Mapuche SRL', place: 'lechiguanas',
    location: 'Islas Lechiguanas, departamento Gualeguay (Entre Ríos), frente a Ramallo',
    activity: 'Parte de la explotación agrícola y ganadera del establecimiento se desarrolla a través de esta empresa.',
    problem: 'Terraplenes, modificaciones de cursos de agua y presuntas fumigaciones con agroquímicos. Las obras habrían alterado el movimiento natural del agua.',
    area: 'Unas 5.300 hectáreas de humedales, según informes de organismos provinciales.',
    people: 'La demanda también incluye a los empresarios Fabio Ernesto Di Fonzo y Juan Nazar.',
    status: ['tramite'],
    chron: [
      { d: 'Nov. 2020', t: 'La asociación UPVA presenta la denuncia que da origen a la causa, durante una temporada de incendios en las islas frente a Ramallo.', verified: true },
      { d: 'Sep. 2026', t: 'Informes de organismos de Entre Ríos documentan terraplenes y alteraciones ambientales, y señalan que faltaba la autorización definitiva para las obras. La causa sigue en trámite.' }
    ],
    sources: [
      { t: 'Economía Sustentable: informe oficial sobre unas 5.300 hectáreas afectadas', url: 'https://economiasustentable.com/noticias/un-informe-oficial-confirma-el-dano-ambiental-sobre-miles-de-hectareas-en-entre-rios-por-obras-de-empresarios/' },
      { t: 'Eco Urbano: daños ambientales en las Islas Lechiguanas' },
      { t: 'R2820: investigación por diques y agroquímicos' },
      { t: 'Prensa Mercosur (03/06/2026): inspección de terraplenes en las Lechiguanas', url: 'https://prensamercosur.org/2026/06/03/la-justicia-ordena-una-inspeccion-de-terraplenes-en-islas-de-las-lechiguanas/' }
    ],
    legal: 'Los informes técnicos sobre daños no equivalen, por sí solos, a una condena judicial.'
  },
  {
    id: 'laureles', file: 'Caso 03', company: 'Establecimiento Los Laureles S.A.', place: 'victoria',
    location: 'Islas de Victoria, Entre Ríos, a unos 52 km al sur-suroeste de Victoria y 15 km al norte de Villa Constitución, dentro de la Reserva de Usos Múltiples «Humedales e Islas de Victoria»',
    activity: 'Cría y engorde de ganado vacuno.',
    problem: 'Intervenciones sobre el arroyo Colorado: movimientos de suelo, eliminación de vegetación y colocación de estructuras de hormigón para modificar o proteger sectores de la ribera.',
    area: 'Aproximadamente 121 hectáreas de humedal con vegetación eliminada y unos 110 metros de ribera modificados.',
    status: ['procesamiento'],
    chron: [
      { d: 'Oct. 2026', t: 'La Cámara Federal de Apelaciones de Paraná confirma el procesamiento de cuatro personas vinculadas con la firma. El expediente avanzaría hacia el juicio oral.' }
    ],
    sources: [
      { t: 'ERA Verde: confirmación del procesamiento' },
      { t: 'La Gaceta Online: causa judicial en Victoria' },
      { t: 'Prensa Mercosur (25/03/2026): ubicación del predio y detalle de las intervenciones', url: 'https://prensamercosur.org/2026/03/25/el-juez-federal-de-victoria-proceso-a-encargados-de-una-ganadera-por-afectar-humedales-en-el-delta/' }
    ],
    legal: 'Un procesamiento confirmado no es una condena: las personas procesadas no han sido juzgadas.'
  },
  {
    id: 'carboquimica', file: 'Caso 04', company: 'Carboquímica del Paraná S.A.', place: 'ramallo',
    location: 'Complejo Industrial Ramallo, partido de Ramallo, provincia de Buenos Aires',
    activity: 'Industria química vinculada al procesamiento de derivados del alquitrán de hulla.',
    problem: 'Presuntos vertidos contaminantes y enterramiento de residuos peligrosos donde funcionaba la planta. Se menciona contaminación del suelo, el agua y el aire, con impacto sobre la ribera, bosques nativos y humedales costeros, y consecuencias para familias de pescadores.',
    area: 'No documentada en la investigación.',
    status: ['juicio', 'noconf'],
    chron: [
      { d: 'Causa civil previa', t: 'La Justicia ordena medidas de recomposición ambiental.' },
      { d: 'Sep. 2025', t: 'La causa penal contra el presidente y el vicepresidente de la empresa es elevada a juicio oral.' },
      { d: 'Oct. 2026', t: 'Las fuentes consultadas no permiten confirmar si el juicio penal ya concluyó.' }
    ],
    sources: [
      { t: 'Rosario3: elevación a juicio penal' },
      { t: 'La Voz de Ramallo: contaminación del río y los humedales' },
      { t: 'Documento judicial sobre la causa civil' }
    ],
    legal: 'Elevar una causa a juicio no implica una condena.'
  }
];

/* ---------- Lugares (capítulo 06) ----------
   url: sitio oficial. maps: búsqueda en Google Maps (para lugares sin sitio propio). */
const PLACE_GROUPS = [
  { h: 'Casos judiciales', items: [
    { name: 'Paso del Tonelero', where: 'Ramallo, Buenos Aires', maps: 'El Tonelero, Ramallo, Buenos Aires',
      text: 'Bañados y humedales costeros sobre el Paraná. Naviera Lojda S.A. tiene sentencia firme que la obliga a recomponer el ambiente.' },
    { name: 'Islas Lechiguanas', where: 'Departamento Gualeguay, Entre Ríos', maps: 'Islas Lechiguanas, Entre Ríos',
      text: 'Frente a Ramallo. Causa en trámite por terraplenes y alteraciones del agua en unas 5.300 ha (El Mapuche SRL).' },
    { name: 'Islas de Victoria', where: 'Entre Ríos', maps: 'Islas de Victoria, Entre Ríos',
      text: 'Reserva de Usos Múltiples «Humedales e Islas de Victoria». Procesamiento confirmado por intervenciones sobre el arroyo Colorado (Los Laureles S.A.).' },
    { name: 'Complejo Industrial Ramallo', where: 'Ramallo, Buenos Aires', maps: 'Complejo Industrial Ramallo, Buenos Aires',
      text: 'Donde funcionaba la planta de Carboquímica del Paraná S.A. La causa penal fue elevada a juicio en 2025.' }
  ]},
  { h: 'Áreas protegidas', items: [
    { name: 'Parque Nacional Ciervo de los Pantanos', where: 'Campana, Buenos Aires',
      url: 'https://www.argentina.gob.ar/parquesnacionales/centro/parque-nacional-ciervo-de-los-pantanos',
      text: 'Protege 5.200 ha de pastizales, bosque de ribera y humedales. Refugio del ciervo de los pantanos.' },
    { name: 'Parque Nacional Pre-Delta', where: 'Diamante, Entre Ríos',
      url: 'https://www.argentina.gob.ar/parquesnacionales/centro/parque-nacional-pre-delta/panoramica',
      text: 'Al comienzo del Delta, sobre la margen izquierda del Paraná.' },
    { name: 'Reserva Natural Rincón de Milberg', where: 'Tigre, Buenos Aires', maps: 'Reserva Natural Rincón de Milberg, Tigre',
      text: 'Reserva natural en el partido de Tigre.' }
  ]},
  { h: 'Urbanizaciones sobre humedal', items: [
    { name: 'Tigre', where: 'Buenos Aires', maps: 'Tigre, Buenos Aires',
      text: 'Puerta de entrada al Delta y partido donde se concentran las urbanizaciones sobre humedal.' },
    { name: 'Nordelta', where: 'Tigre, Buenos Aires', maps: 'Nordelta, Tigre, Buenos Aires',
      text: 'Urbanización sobre humedal rellenado. Aplica un programa de manejo de fauna silvestre.' },
    { name: 'Villanueva', where: 'Benavídez, Tigre', maps: 'Villanueva, Benavídez, Buenos Aires',
      text: 'Complejo de EIDICO con corredores ribereños y reforestación nativa.' },
    { name: 'Dique Luján', where: 'Tigre, Buenos Aires', maps: 'Dique Luján, Buenos Aires',
      text: 'Zona baja que la reforestación de Villanueva busca conectar biológicamente.' },
    { name: 'Villa La Ñata', where: 'Tigre, Buenos Aires', maps: 'Villa La Ñata, Buenos Aires',
      text: 'Zona baja que la reforestación de Villanueva busca conectar biológicamente.' }
  ]},
  { h: 'Conservación', items: [
    { name: 'Fundación Temaikèn', where: 'Escobar, Buenos Aires', url: 'https://www.temaiken.org.ar',
      text: 'Centro de Recuperación de Especies (CRET) y Programa Delta.' }
  ]}
];

/* Territorios del capítulo 04 (se toman de la lista anterior) */
const TERRITORIES = ['Tigre', 'Nordelta', 'Villanueva', 'Dique Luján', 'Villa La Ñata'];

/* ---------- Comparador del capítulo 04 ----------
   Colocá las dos imágenes en la carpeta img/ con estos nombres
   (o cambiá las rutas). Ver el README para obtenerlas. */
const COMPARE = {
  before: { src: 'img/nordelta-antes.jpg', label: 'c. 2000' },
  after:  { src: 'img/nordelta-hoy.jpg',  label: 'Hoy' },
  caption: 'Nordelta y Villanueva (Tigre) vistas desde arriba, antes y después de la urbanización. Deslizá para comparar.',
  credit: 'Imágenes: Google Earth'
};

/* ---------- Organizaciones ---------- */
const ORG_CATS = {
  humedales: 'Humedales', fauna: 'Fauna y flora', legal: 'Legal y políticas', internacional: 'Internacionales', rescate: 'Rescate y educación'
};
const ORGS = [
  { name: 'Fundación Humedales', sub: 'Wetlands International', cats: ['humedales'], url: 'https://lac.wetlands.org',
    desc: 'Se dedica por completo a conservar y restaurar humedales, cuencas y lagunas, como el Delta del Paraná.',
    items: ['Forma parte de la red global Wetlands International.', 'Proyectos de conservación y restauración de humedales.'] },
  { name: 'Fundación Temaikèn', cats: ['rescate', 'fauna'], url: 'https://www.temaiken.org.ar',
    desc: 'Pieza central de la conservación en el Delta del Paraná.',
    items: ['Centro de Recuperación de Especies (CRET).', 'Programa Delta: rescate del ciervo de los pantanos, corredores biológicos y reforestación nativa.', 'Educación para convivir con la fauna silvestre.'] },
  { name: 'Fundación Rewilding Argentina', cats: ['fauna'], url: 'https://www.rewildingargentina.org',
    desc: 'Conocida por reintroducir especies en peligro.',
    items: ['Reintroducción del yaguareté y del oso hormiguero.'] },
  { name: 'Aves Argentinas', cats: ['fauna'], url: 'https://www.avesargentinas.org.ar',
    desc: 'La organización conservacionista más antigua del país.',
    items: ['Protección de hábitats enteros y de especies amenazadas.'] },
  { name: 'FARN', sub: 'Fundación Ambiente y Recursos Naturales', cats: ['legal'], url: 'https://farn.org.ar',
    desc: 'Arma el frente legal de la defensa ambiental.',
    items: ['Impulsa leyes como la Ley de Humedales.', 'Denuncia desmontes.'] },
  { name: 'Taller Ecologista', cats: ['humedales'], url: 'https://www.tallerecologista.org.ar',
    desc: 'ONG de Rosario muy activa en la defensa del ecosistema del río Paraná.',
    items: ['Acciones frente a la contaminación y los incendios en el Delta.'] },
  { name: 'Fundación CAUCE', sub: 'Cultura Ambiental – Causa Ecologista', cats: ['humedales', 'legal'], url: 'https://cauceecologico.org',
    desc: 'Fundación de Paraná, Entre Ríos, activa en la defensa del ecosistema del río Paraná.',
    items: ['Acciones frente a la contaminación y los incendios.', 'Junto con FARN se presentó como “amigo del tribunal” en la causa por quemas en islas del Delta entrerriano (2021).'] },
  { name: 'WCS Argentina', sub: 'Wildlife Conservation Society', cats: ['fauna'], url: 'https://argentina.wcs.org',
    desc: 'Monitorea fauna y combate la caza furtiva.',
    items: ['Trabajo en la Patagonia y el Chaco.'] },
  { name: 'Fundación Vida Silvestre', sub: 'Asociada a WWF', cats: ['internacional'], url: 'https://www.vidasilvestre.org.ar',
    desc: 'Trabaja a nivel global y local contra la destrucción de hábitats.',
    items: ['Organización asociada a la red internacional WWF.'] },
  { name: 'Greenpeace', cats: ['internacional'], url: 'https://www.greenpeace.org/argentina/',
    desc: 'Trabaja a nivel global y local contra la destrucción de hábitats.',
    items: ['Campañas contra la destrucción de ecosistemas.'] }
];

/* ---------- Medidas de recuperación ---------- */
const RECOVERY = {
  nordelta: {
    src: 'Fuentes: Asociación Vecinal Nordelta (2021); Dirección de Flora y Fauna de la Provincia de Buenos Aires (2021).',
    items: [
      { icon: 'scan-eye', t: 'Manejo ético de carpinchos', d: 'Censos con drones y control de natalidad mediante vasectomías, para evitar la sobrepoblación sin recurrir al sacrificio.' },
      { icon: 'leaf', t: 'Refugios naturales', d: 'Franjas de vegetación alta en los bordes de las lagunas (buffers) para que la fauna tenga alimento y lugares donde anidar.' },
      { icon: 'gauge', t: 'Seguridad vial', d: 'Reducción de las velocidades máximas, fotomultas y cartelería especial para evitar atropellamientos.' },
      { icon: 'flower-2', t: 'Flora nativa y lagunas sin tóxicos', d: 'Fomentan que los vecinos planten especies autóctonas para atraer aves y polinizadores, y limpian las lagunas sin químicos tóxicos.' }
    ]
  },
  villanueva: {
    src: 'Fuente: EIDICO / Complejo Villanueva (s.f.), informes de gestión ambiental, paisajismo y manejo de lagunas.',
    items: [
      { icon: 'waves', t: 'Corredores ribereños', d: 'Conservan juncos y totoras en los márgenes de las lagunas para filtrar el agua y dar refugio a anfibios, coipos y tortugas.' },
      { icon: 'trees', t: 'Reforestación', d: 'Plantan árboles autóctonos en espacios comunes para conectar biológicamente los barrios con las zonas bajas de Dique Luján y Villa La Ñata.' },
      { icon: 'siren', t: 'Protocolos de rescate', d: 'Redes de aviso vecinal para llamar al Municipio o a fundaciones como Temaikèn si aparece un animal herido o atacado por perros.' }
    ]
  }
};

/* ---------- Pérdida: hábitat vs individuos ---------- */
const LOSS = {
  habitat: {
    icon: 'map', title: 'Lo que sí se midió: superficie',
    html: '<p>Entre 1999 y 2013 se perdieron aproximadamente <strong>163.000 hectáreas</strong> de bañados de agua dulce en el Bajo Delta, cerca de un tercio del total. Es una medida de <strong>superficie de hábitat</strong>.</p><p>Menos hábitat significa menos lugares para alimentarse, refugiarse y reproducirse. Pero no equivale a una cantidad de animales perdidos.</p><span class="badge badge--doc">Dato documentado</span>'
  },
  individuos: {
    icon: 'bird', title: 'Lo que no tiene una cifra única: animales',
    html: '<p>No existe un porcentaje único que indique cuántos animales se perdieron en todo el Delta hasta 2026. <strong>Perder un tercio de los bañados no significa que haya desaparecido un tercio de los animales.</strong></p><p>Lo que sí se registró: al comparar los relevamientos de aves de 1997-1999 y 2012-2013, se encontraron menos especies propias de los humedales, y algunas dejaron de registrarse, como el tordo amarillo, amenazado a nivel mundial.</p><span class="badge badge--ver">Sin cifra total disponible</span>'
  }
};

/* ---------- Línea de tiempo ---------- */
const TIMELINE = [
  { y: '1997–1999', t: 'Primeros registros', d: 'Investigadores relevan las aves del Bajo Delta del Paraná para saber qué especies vivían allí y poder comparar cambios futuros.' },
  { y: '1999–2013', t: 'Un tercio de los bañados, perdido', d: 'Desaparecen unas 163.000 ha de bañados de agua dulce. Cerca del 70 % de esa superficie se convierte en pasturas para ganado.' },
  { y: '2012–2013', t: 'Menos aves de humedal', d: 'Un nuevo relevamiento encuentra menos especies propias de los humedales. El tordo amarillo deja de registrarse.' },
  { y: '2016', t: 'Sitio Ramsar Delta del Paraná', d: 'Una porción del Delta se incorpora a la Convención de Ramsar sobre humedales de importancia internacional.', badge: '<span class="badge badge--doc">Dato agregado y verificado</span>' },
  { y: '2020', t: 'Denuncia por las Islas Lechiguanas', d: 'Comienza la causa por terraplenes y alteraciones del agua en unas 5.300 ha de humedales.' },
  { y: 'Hoy', t: 'Amenazas que persisten', d: 'Ganadería, modificaciones del agua, incendios y contaminación siguen amenazando a la fauna. No hay un porcentaje único de pérdida de animales.' }
];

/* ---------- Carrusel de paisajes ---------- */
const LANDSCAPES = [
  { wiki: 'en:Paraná Delta', cap: 'Vista aérea del Bajo Delta, al norte de Buenos Aires' },
  { wiki: 'es:Parque nacional Ciervo de los Pantanos|en:Ciervo de los Pantanos National Park', cap: 'Parque Nacional Ciervo de los Pantanos' },
  { wiki: 'es:Parque nacional Pre-Delta|en:Pre-Delta National Park', cap: 'Parque Nacional Pre-Delta' },
  { wiki: 'es:Bahía Samborombón|en:Samborombón Bay', cap: 'Bahía de Samborombón' },
  { cap: 'El río Paraná y su delta desde la Estación Espacial Internacional (2015)',
    src: 'https://assets.science.nasa.gov/content/dam/science/esd/eo/images/imagerecords/85000/85950/iss043e91884.jpg/jcr:content/renditions/cq5dam.web.1280.1280.jpeg',
    credit: 'Imagen: <a href="https://science.nasa.gov/earth/earth-observatory/good-air-and-brown-water-85950/" target="_blank" rel="noopener">NASA Earth Observatory</a> · fotografía de astronauta ISS043-E-91884 · dominio público' }
];

/* ---------- Trivia ---------- */
/* Cada partida toma 5 preguntas al azar, priorizando las que la persona todavía no respondió.
   Para agregar preguntas: q = pregunta, o = opciones, a = índice de la correcta (0 = primera), e = explicación. */
const QUIZ_BANK = [
  { q: '¿Cuántas hectáreas de bañados de agua dulce se perdieron en el Bajo Delta entre 1999 y 2013?',
    o: ['Unas 16.300 ha', 'Unas 163.000 ha', 'Unas 1,6 millones de ha', 'Unas 5.200 ha'], a: 1,
    e: 'Fueron aproximadamente 163.000 ha, cerca de un tercio de los bañados de agua dulce del Bajo Delta.' },
  { q: '¿En qué se convirtió cerca del 70 % de esa superficie perdida?',
    o: ['Barrios cerrados', 'Puertos', 'Pasturas para ganado', 'Plantaciones forestales'], a: 2,
    e: 'Según la tesis de Sica (UBA, 2016), el 70 % de la pérdida se debió a la conversión en pasturas para ganado.' },
  { q: 'Que se haya perdido un tercio de los bañados del Bajo Delta significa que…',
    o: ['Desapareció un tercio de los animales', 'Se redujo el hábitat disponible, pero no hay una cifra de cuántos animales se perdieron', 'La cantidad de animales no cambió', 'Se perdieron dos tercios de los animales'], a: 1,
    e: 'Es una medida de superficie de hábitat. No existe un porcentaje único de animales perdidos en todo el Delta.' },
  { q: 'Si una causa tiene un “procesamiento confirmado”, significa que…',
    o: ['Las personas acusadas fueron condenadas', 'El juez considera que hay elementos para avanzar, pero no hay condena', 'La causa fue archivada', 'La empresa ya reparó el daño'], a: 1,
    e: 'El procesamiento es una etapa del proceso. Las responsabilidades solo quedan establecidas con una sentencia firme.' },
  { q: '¿Qué significa que una causa sea “elevada a juicio”?',
    o: ['Que hubo una condena', 'Que la causa pasa a juicio oral, donde un tribunal decidirá', 'Que la causa se cerró', 'Que las partes llegaron a un acuerdo'], a: 1,
    e: 'Es la etapa en la que un tribunal decidirá si hay responsabilidad penal. Tampoco es una condena.' },
  { q: 'En el caso de Naviera Lojda S.A. (Paso del Tonelero, Ramallo), ¿en qué situación está la causa?',
    o: ['Investigación en trámite', 'Sentencia firme, con la recomposición del ambiente pendiente', 'Procesamiento confirmado', 'Causa archivada'], a: 1,
    e: 'Es el único de los cuatro casos con sentencia firme: la empresa debe recomponer el humedal.' },
  { q: '¿Qué porcentaje del territorio bonaerense se estima que corresponde a humedales?',
    o: ['Entre el 5 % y el 10 %', 'Entre el 30 % y el 35 %', 'Entre el 50 % y el 60 %', 'Alrededor del 80 %'], a: 1,
    e: 'Se estima entre el 30 % y el 35 %, aunque la cifra varía según cómo se identifiquen y delimiten los humedales.' },
  { q: '¿Cuántas especies de plantas hay, aproximadamente, en los humedales del Delta del Paraná?',
    o: ['Entre 60 y 70', 'Entre 150 y 200', 'Entre 643 y 700', 'Entre 6.000 y 7.000'], a: 2,
    e: 'Las fuentes consultadas hablan de entre 643 y 700 especies de plantas, aproximadamente.' },
  { q: '¿Cuántas hectáreas protege el Parque Nacional Ciervo de los Pantanos?',
    o: ['520 ha', '5.200 ha', '52.000 ha', '163.000 ha'], a: 1,
    e: 'Protege 5.200 hectáreas de pastizales, bosque de ribera y humedales.' },
  { q: '¿Cuál es el único sauce nativo de Argentina?',
    o: ['Sauce llorón', 'Sauce criollo', 'Sauce eléctrico', 'Aliso de río'], a: 1,
    e: 'El sauce criollo (Salix humboldtiana) es el único sauce nativo del país y crece en las orillas.' },
  { q: '¿Qué árbol del Delta es la flor nacional argentina?',
    o: ['Espinillo', 'Curupí', 'Ceibo', 'Sauce criollo'], a: 2,
    e: 'El ceibo, inconfundible por sus flores rojas, es uno de los árboles característicos del bosque ribereño.' },
  { q: '¿Qué árbol es de los primeros en crecer cuando se forma una isla nueva?',
    o: ['Aliso de río', 'Ceibo', 'Curupí', 'Espinillo'], a: 0,
    e: 'El aliso de río es un arbolito pionero de las islas nuevas.' },
  { q: '¿Qué planta flotante de flores lilas funciona como “balsa natural” del río?',
    o: ['Irupé', 'Junco', 'Camalote', 'Cortadera'], a: 2,
    e: 'El camalote flota y transporta a muchos pequeños animales aguas abajo.' },
  { q: '¿Qué animal del Delta pesa hasta 150 kilos y tiene pezuñas adaptadas para no hundirse en el barro?',
    o: ['Carpincho', 'Coipo', 'Ciervo de los pantanos', 'Lobito de río'], a: 2,
    e: 'El ciervo de los pantanos, el animal más grande y más amenazado del Delta.' },
  { q: '¿Qué tipo de animal es el lobito de río?',
    o: ['Un roedor herbívoro', 'Una nutria carnívora', 'Un ave pescadora', 'Un pez de fondo'], a: 1,
    e: 'Es una nutria carnívora, juguetona y escurridiza.' },
  { q: '¿De qué se alimenta casi exclusivamente el gavilán caracolero?',
    o: ['De mojarras', 'De ranas', 'De los caracoles grandes del río', 'De semillas'], a: 2,
    e: 'Se alimenta casi exclusivamente de caracoles grandes, como el caracol manzana.' },
  { q: '¿Por qué se ve al biguá quieto al sol con las alas abiertas?',
    o: ['Para secarse después de sumergirse a pescar', 'Para atraer pareja', 'Para espantar a otras aves', 'Para dar sombra a sus pichones'], a: 0,
    e: 'Después de bucear se queda al sol con las alas abiertas para secarse.' },
  { q: 'Al lagarto overo a veces se lo llama “iguana”. ¿Qué es en realidad?',
    o: ['Una iguana', 'Un lagarto, no una iguana', 'Un anfibio', 'Una tortuga terrestre'], a: 1,
    e: 'Es un lagarto de la familia de los teidos (Salvator merianae), no una iguana.' },
  { q: '¿Cuál de estos animales del Delta es venenoso?',
    o: ['La culebra acuática', 'La yarará', 'El lagarto overo', 'La tortuga campanita'], a: 1,
    e: 'Las culebras acuáticas son inofensivas para las personas; de la yarará hay que mantenerse lejos.' },
  { q: '¿Qué ave, amenazada a nivel mundial, dejó de registrarse en el relevamiento de aves del Bajo Delta de 2012-2013?',
    o: ['El chajá', 'La garza blanca', 'El tordo amarillo', 'El biguá'], a: 2,
    e: 'El tordo amarillo no fue detectado en los relevamientos recientes (Sica y otros, 2018).' },
  { q: '¿Qué es el “efecto isla” en las zonas urbanizadas?',
    o: ['La formación de islas nuevas en el río', 'La división del territorio en parches aislados por el asfalto y los muros', 'Una laguna artificial en medio de un barrio', 'El aumento de la temperatura en las islas'], a: 1,
    e: 'Los animales quedan encerrados en fragmentos de hábitat; si se mueven, los atropellan o los atacan animales domésticos.' },
  { q: '¿Por qué las medidas ambientales de Nordelta y Villanueva se consideran de mitigación?',
    o: ['Porque el humedal original fue rellenado y no se recupera el ambiente previo', 'Porque son obligatorias por ley', 'Porque solo duran un verano', 'Porque las financia el Estado'], a: 0,
    e: 'Reducen daños, pero la fauna sigue atrapada entre muros y paredones, con el paso hacia el río dificultado.' },
  { q: '¿Qué método aplica Nordelta para evitar la sobrepoblación de carpinchos?',
    o: ['El sacrificio de animales', 'Un control ético de natalidad (vasectomías)', 'Cercar las lagunas', 'Reducir el agua de las lagunas'], a: 1,
    e: 'Hacen censos con drones y aplican vasectomías, sin recurrir al sacrificio.' },
  { q: '¿Para qué conserva Villanueva los juncos y totoras en los márgenes de las lagunas?',
    o: ['Como decoración', 'Para filtrar el agua y dar refugio a anfibios, coipos y tortugas', 'Para la pesca deportiva', 'Para reducir los mosquitos'], a: 1,
    e: 'Forman corredores ribereños que filtran el agua y dan refugio a la fauna.' },
  { q: '¿Cuántos animales devolvió a la naturaleza el Centro de Recuperación de Especies de Temaikèn?',
    o: ['Unos 40', 'Unos 400', 'Más de 4.000', 'Más de 40.000'], a: 2,
    e: 'Según su Memoria Anual 2023, más de 4.000 animales rehabilitados volvieron a la naturaleza.' },
  { q: '¿En qué año una porción del Delta del Paraná se incorporó como sitio Ramsar?',
    o: ['1971', '2000', '2016', '2023'], a: 2,
    e: 'Fue en 2016. 1971 es el año en que se firmó la Convención de Ramsar.' },
  { q: 'Según el IPBES (2019), ¿cuántas especies están en peligro de extinción en el mundo?',
    o: ['Unas 10.000', 'Unas 100.000', 'Más de 1 millón', 'Más de 10 millones'], a: 2,
    e: 'Más de 1 millón, y la pérdida de hábitat es la causa número uno. Es un dato global, no del Delta.' }
];

/* ---------- Fuentes ---------- */
const SOURCES = [
  { h: 'Humedales y territorio', items: [
    { t: 'Ministerio de Ambiente de la Provincia de Buenos Aires: humedales bonaerenses.' },
    { t: 'Gobierno nacional: qué son los humedales y por qué conservarlos.' },
    { t: 'Malvárez, A. I. (1999). El Delta del Río Paraná como mosaico de humedales. En: Tópicos sobre humedales subtropicales y templados de Sudamérica (UBA).' },
    { t: 'Kalesnik, F., & Quintana, R. D. (2006). Las especies de flora y fauna del Bajo Delta del río Paraná. CONICET – UBA.' },
    { t: 'Sica, Y. V. (2016). Cambios en el uso del suelo y sus efectos a diferentes escalas espaciales y temporales sobre la diversidad de aves en el Bajo Delta del río Paraná. Tesis doctoral, FCEN-UBA.', url: 'https://core.ac.uk/download/322642271.pdf' },
    { t: 'Sica, Y. V., Gavier-Pizarro, G. I., Pidgeon, A. M., Travaini, A., Bustamante Santos, A. J., Radeloff, V. C., & Quintana, R. D. (2018). Changes in bird assemblages in a wetland ecosystem after 14 years of intensified cattle farming. Austral Ecology, 43(7), 786–797.', url: 'https://doi.org/10.1111/aec.12621' },
    { t: 'Información sobre el Delta del Paraná y los sitios Ramsar.' },
    { t: 'Levrand, N. E. (2023). El concepto científico de humedal en la creación del sitio Ramsar delta del Paraná, Argentina.', url: 'https://agris.fao.org/search/ru/records/65fc130c85e84924f70b8aaf' }
  ]},
  { h: 'Flora y áreas protegidas', items: [
    { t: 'Argentina.gob.ar — humedales', url: 'https://www.argentina.gob.ar/node/392217' },
    { t: 'Quintana, R. — Simposio Humedales 2016 (Fundación Ciudad)', url: 'https://www.fundacionciudad.org.ar/pdf/2016-SIMPOSIO_HUMEDALES/2016-HUMEDALES-QUINTANA-PPT.pdf' },
    { t: 'Parques Nacionales — Parque Nacional Ciervo de los Pantanos', url: 'https://www.argentina.gob.ar/parquesnacionales/centro/parque-nacional-ciervo-de-los-pantanos' },
    { t: 'SIB — Cartilla FAROS', url: 'https://sib.gob.ar/archivos/cartilla_faros.pdf' },
    { t: 'Humedales del Paraná: biodiversidad, usos y amenazas en el Delta Medio (ResearchGate)', url: 'https://www.researchgate.net/publication/285599713_Humedales_del_Parana_Biodiversidad_usos_y_amenazas_en_el_Delta_Medio' },
    { t: 'Delta Nativo — Flora del Delta', url: 'https://deltanativo.blogspot.com/2013/03/flora-del-delta.html' },
    { t: 'Viajando con Ana — Qué es el Delta del Tigre', url: 'https://www.viajandoconana.com/que-es-el-delta-del-tigre/' }
  ]},
  { h: 'Fauna', items: [
    { t: 'Aves Argentinas / Ministerio de Ambiente (2020). Guía de Biodiversidad y Aves del Delta y la Ribera Platense.' },
    { t: 'Fundación Temaikèn (s.f.). Fichas de Especies del Delta del Paraná y Proyecto Pantano.' },
    { t: 'UICN (2023). Lista Roja de Especies Amenazadas.' },
    { t: 'BirdLife International (s.f.). Base de datos de especies de aves extintas (Ectopistes migratorius).' },
    { t: 'INTA / Ministerio de Ambiente y Desarrollo Sostenible. Informes de monitoreo sobre fauna periurbana (carpinchos y ciervo de los pantanos).' }
  ]},
  { h: 'Contexto global', items: [
    { t: 'IPBES (2019). Informe de la Evaluación Mundial sobre la Diversidad Biológica y los Servicios de los Ecosistemas.' },
    { t: 'WWF (2020). Australia’s 2019-2020 Bushfires: The Wildlife Toll.' }
  ]},
  { h: 'Conservación y organizaciones', items: [
    { t: 'Fundación Temaikèn (2023). Memoria Anual: Programas de Conservación y CRET.' },
    { t: 'Proyecto Pantano (CONICET, INTA, Fundación Temaikèn). Estrategias de conservación para el ciervo de los pantanos.' },
    { t: 'Asociación Vecinal Nordelta (2021). Programa de Manejo de Fauna Silvestre y Medio Ambiente.' },
    { t: 'EIDICO / Complejo Villanueva (s.f.). Informes de gestión ambiental, paisajismo y manejo de lagunas.' },
    { t: 'Dirección de Flora y Fauna de la Provincia de Buenos Aires (2021). Protocolos de intervención y control poblacional de carpinchos.' },
    { t: 'Wetlands International LAC (s.f.). Nuestros proyectos en humedales.', url: 'https://lac.wetlands.org' },
    { t: 'Fundación Rewilding Argentina (s.f.). Proyectos de reintroducción de especies.', url: 'https://www.rewildingargentina.org' },
    { t: 'FARN (2023). Informes sobre políticas ambientales y protección de humedales.', url: 'https://farn.org.ar' },
    { t: 'Análisis Digital (2021). CAUCE y FARN, “amigos del tribunal” en la causa por quemas en el Delta.', url: 'https://www.analisisdigital.com.ar/judiciales/2021/02/19/cauce-y-farn-se-presentaron-como-amigos-del-tribunal-en-la-causa-por-quemas-en' }
  ]},
  { h: 'Imágenes', items: [
    { t: 'NASA Earth Observatory (2015). Good Air and Brown Water. Fotografía de astronauta ISS043-E-91884.', url: 'https://science.nasa.gov/earth/earth-observatory/good-air-and-brown-water-85950/' }
  ]},
  { h: 'Casos judiciales', items: [
    { t: 'La Voz de Ramallo, 28/09/2026 — sentencia firme en Paso del Tonelero.' },
    { t: 'Economía Sustentable — Naviera Lojda deberá reparar un humedal de Ramallo.', url: 'https://economiasustentable.com/noticias/la-justicia-confirmo-que-la-empresa-naviera-lojda-debera-reparar-un-humedal-de-ramallo/' },
    { t: 'Economía Sustentable — informe oficial sobre 5.300 ha en las Islas Lechiguanas.', url: 'https://economiasustentable.com/noticias/un-informe-oficial-confirma-el-dano-ambiental-sobre-miles-de-hectareas-en-entre-rios-por-obras-de-empresarios/' },
    { t: 'Eco Urbano — daños ambientales en las Islas Lechiguanas.' },
    { t: 'R2820 — investigación por diques y agroquímicos.' },
    { t: 'ERA Verde — confirmación del procesamiento (Los Laureles S.A.).' },
    { t: 'La Gaceta Online — causa judicial en Victoria.' },
    { t: 'Rosario3 — elevación a juicio penal (Carboquímica del Paraná S.A.).' },
    { t: 'La Voz de Ramallo — contaminación del río y los humedales.' },
    { t: 'Documento judicial sobre la causa civil (Carboquímica del Paraná S.A.).' }
  ]}
];

/* =========================================================
   2. UTILIDADES
   ========================================================= */
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
const esc = (s = '') => String(s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
const fmt = n => Math.round(n).toLocaleString('es-AR');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let iconTimer = null;
function refreshIcons() {
  clearTimeout(iconTimer);
  iconTimer = setTimeout(() => { if (window.lucide) window.lucide.createIcons(); }, 30);
}

const store = {
  get(k) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* almacenamiento no disponible */ } }
};

/* =========================================================
   3. IMÁGENES DESDE WIKIMEDIA COMMONS (vía API de Wikipedia)
   Solo se aceptan archivos alojados en Commons (licencias libres).
   ========================================================= */
const WIKI_TTL = 1000 * 60 * 60 * 24 * 7; // 7 días
const wikiMem = new Map();

async function wikiSummary(lang, title) {
  const key = `dv-img:${lang}:${title}`;
  if (wikiMem.has(key)) return wikiMem.get(key);
  const cached = store.get(key);
  if (cached && Date.now() - cached.ts < WIKI_TTL) { wikiMem.set(key, cached.data); return cached.data; }

  const p = (async () => {
    try {
      const url = `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title.replace(/ /g, '_'))}`;
      const res = await fetch(url);
      if (!res.ok) return null;
      const j = await res.json();
      const orig = j.originalimage && j.originalimage.source;
      const thumb = j.thumbnail && j.thumbnail.source;
      const any = orig || thumb;
      if (!any || !/\/wikipedia\/commons\//.test(any)) return null; // solo Commons
      const m = any.match(/\/commons\/(?:thumb\/)?[0-9a-f]\/[0-9a-f]{2}\/([^/]+)/);
      const data = {
        orig, thumb,
        origW: j.originalimage ? j.originalimage.width : 0,
        page: j.content_urls && j.content_urls.desktop ? j.content_urls.desktop.page : `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(title)}`,
        file: m ? `https://commons.wikimedia.org/wiki/File:${m[1]}` : null,
        title: j.title
      };
      store.set(key, { ts: Date.now(), data });
      return data;
    } catch (e) { return null; }
  })();
  wikiMem.set(key, p);
  const data = await p;
  wikiMem.set(key, data);
  return data;
}

function pickSrc(info, w) {
  if (info.origW && info.origW <= w && info.orig) return info.orig;
  if (info.thumb) return info.thumb.replace(/\/\d+px-/, `/${w}px-`);
  return info.orig;
}

function creditHTML(info) {
  if (!info) return '';
  if (info.custom) return info.custom;
  const link = info.file || info.page;
  return `Foto: <a href="${esc(link)}" target="_blank" rel="noopener">Wikimedia Commons</a> · autoría y licencia en la página del archivo`;
}

function placeholder(el) {
  if (el.querySelector('.ph')) return;
  const icon = el.dataset.icon || 'leaf';
  const label = el.dataset.label || '';
  el.insertAdjacentHTML('beforeend', `<div class="ph"><i data-lucide="${esc(icon)}"></i>${label ? `<span>${esc(label)}</span>` : ''}</div>`);
  refreshIcons();
}

async function loadWimg(el) {
  if (el.dataset.loaded) return;
  el.dataset.loaded = '1';
  // Imagen con URL directa (no pasa por Wikipedia)
  if (el.dataset.src) {
    el._info = { custom: el.dataset.creditHtml || '' };
    const img = new Image();
    img.alt = el.dataset.alt || el.dataset.label || '';
    img.decoding = 'async';
    img.onload = () => { img.classList.add('is-loaded'); el.dispatchEvent(new CustomEvent('wimg:loaded', { detail: el._info })); };
    img.onerror = () => { img.remove(); placeholder(el); };
    img.src = el.dataset.src;
    el.appendChild(img);
    return;
  }
  const spec = el.dataset.wiki || '';
  const w = parseInt(el.dataset.w || '500', 10);
  if (!spec) { placeholder(el); return; }

  for (const part of spec.split('|')) {
    const i = part.indexOf(':');
    if (i < 0) continue;
    const info = await wikiSummary(part.slice(0, i), part.slice(i + 1));
    if (!info) continue;
    el._info = info;
    const img = new Image();
    img.alt = el.dataset.alt || el.dataset.label || '';
    img.decoding = 'async';
    img.onload = () => {
      img.classList.add('is-loaded');
      el.dispatchEvent(new CustomEvent('wimg:loaded', { detail: info }));
    };
    let triedOrig = false;
    img.onerror = () => {
      if (!triedOrig && info.orig && img.src !== info.orig) { triedOrig = true; img.src = info.orig; return; }
      img.remove(); placeholder(el);
    };
    img.src = pickSrc(info, w);
    el.appendChild(img);
    if (el.dataset.credit) { const c = document.getElementById(el.dataset.credit); if (c) c.innerHTML = creditHTML(info); }
    return;
  }
  placeholder(el);
}

const imgObserver = 'IntersectionObserver' in window
  ? new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { imgObserver.unobserve(en.target); loadWimg(en.target); } });
    }, { rootMargin: '500px 0px' })
  : null;

function observeImages(root = document) {
  $$('.wimg', root).forEach(el => { if (el.dataset.loaded) return; imgObserver ? imgObserver.observe(el) : loadWimg(el); });
}

/* =========================================================
   4. NAVEGACIÓN, PROGRESO, VOLVER ARRIBA
   ========================================================= */
function initNav() {
  const nav = $('#nav'), links = $('#navLinks'), toggle = $('#navToggle');
  const progress = $('#progress'), toTop = $('#toTop');

  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle('is-scrolled', y > 40);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = h > 0 ? `${(y / h) * 100}%` : '0';
    toTop.classList.toggle('is-visible', y > 800);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const setMenu = open => {
    links.classList.toggle('is-open', open);
    nav.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    toggle.innerHTML = `<i data-lucide="${open ? 'x' : 'menu'}"></i>`;
    refreshIcons();
  };
  toggle.addEventListener('click', () => setMenu(!links.classList.contains('is-open')));
  $$('a', links).forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && links.classList.contains('is-open')) setMenu(false); });

  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

  // Capítulo activo
  if ('IntersectionObserver' in window) {
    const map = new Map($$('a', links).map(a => [a.getAttribute('href').slice(1), a]));
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        $$('a', links).forEach(a => a.classList.remove('is-active'));
        const a = map.get(en.target.id);
        if (a) a.classList.add('is-active');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('[data-section]').forEach(s => io.observe(s));
  }
}

/* =========================================================
   5. ANIMACIONES AL DESPLAZARSE Y CONTADORES
   ========================================================= */
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const thousands = el.dataset.format === 'thousands';
  const out = v => thousands ? fmt(v) : String(Math.round(v));
  if (reduceMotion) { el.textContent = out(target); return; }
  const dur = 1800, t0 = performance.now();
  const step = t => {
    const p = Math.min(1, (t - t0) / dur);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = out(target * e);
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function initReveal() {
  const els = $$('.reveal');
  const counters = $$('.counter');
  if (!('IntersectionObserver' in window)) {
    els.forEach(e => e.classList.add('is-in'));
    counters.forEach(animateCounter);
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(e => io.observe(e));

  const cio = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { animateCounter(en.target); cio.unobserve(en.target); } });
  }, { threshold: 0.6 });
  counters.forEach(c => cio.observe(c));
}

/* =========================================================
   6. CAPÍTULO 02: ACORDEÓN Y CARRUSEL
   ========================================================= */
function initAccordion() {
  const items = $$('#habitatList .acc__item');
  items.forEach(item => {
    $('.acc__head', item).addEventListener('click', () => {
      const open = !item.classList.contains('is-open');
      items.forEach(i => { i.classList.remove('is-open'); $('.acc__head', i).setAttribute('aria-expanded', 'false'); });
      if (open) { item.classList.add('is-open'); $('.acc__head', item).setAttribute('aria-expanded', 'true'); }
    });
  });
}

function initCarousel() {
  const root = $('#landscapeCarousel'), track = $('#carTrack'), dots = $('#carDots');
  const cap = $('#carCaption'), credit = $('#carCredit');
  let idx = 0, timer = null, visible = false;

  track.innerHTML = LANDSCAPES.map((s, i) =>
    `<div class="carousel__slide wimg" ${s.src ? `data-src="${esc(s.src)}" data-credit-html="${esc(s.credit || '')}"` : `data-wiki="${esc(s.wiki)}"`} data-w="1280" data-label="${esc(s.cap)}" data-icon="image" data-alt="${esc(s.cap)}" role="group" aria-roledescription="diapositiva" aria-label="${i + 1} de ${LANDSCAPES.length}"></div>`
  ).join('');
  dots.innerHTML = LANDSCAPES.map((s, i) => `<button role="tab" aria-label="Ir a ${esc(s.cap)}" aria-selected="${i === 0}"></button>`).join('');
  const slides = $$('.carousel__slide', track);

  const updateMeta = () => {
    cap.textContent = LANDSCAPES[idx].cap;
    credit.innerHTML = creditHTML(slides[idx]._info);
  };
  slides.forEach((s, i) => s.addEventListener('wimg:loaded', () => { if (i === idx) updateMeta(); }));

  const go = i => {
    idx = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${idx * 100}%)`;
    $$('button', dots).forEach((d, j) => d.setAttribute('aria-selected', String(j === idx)));
    loadWimg(slides[idx]);
    loadWimg(slides[(idx + 1) % slides.length]);
    updateMeta();
  };
  const play = () => { stop(); if (!reduceMotion && visible) timer = setInterval(() => go(idx + 1), 6000); };
  const stop = () => { clearInterval(timer); timer = null; };

  $('#carPrev').addEventListener('click', () => { go(idx - 1); play(); });
  $('#carNext').addEventListener('click', () => { go(idx + 1); play(); });
  $$('button', dots).forEach((d, j) => d.addEventListener('click', () => { go(j); play(); }));
  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', play);
  root.addEventListener('focusin', stop);
  root.addEventListener('focusout', play);
  root.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') { go(idx - 1); play(); }
    if (e.key === 'ArrowRight') { go(idx + 1); play(); }
  });

  // Deslizar en pantallas táctiles
  let x0 = null;
  track.addEventListener('pointerdown', e => { x0 = e.clientX; });
  track.addEventListener('pointerup', e => {
    if (x0 === null) return;
    const dx = e.clientX - x0; x0 = null;
    if (Math.abs(dx) > 40) { go(idx + (dx < 0 ? 1 : -1)); play(); }
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(en => { visible = en[0].isIntersecting; visible ? play() : stop(); }, { threshold: 0.3 }).observe(root);
  }
  go(0);
}

/* =========================================================
   7. CAPÍTULO 03: CATÁLOGO DE ESPECIES Y MODAL
   ========================================================= */
let currentGroup = 'flora';

function speciesWiki(sp) {
  if (sp.wiki !== undefined) return sp.wiki;
  return `es:${sp.sci}|en:${sp.sci}`;
}

function renderSpecies(group) {
  currentGroup = group;
  const grid = $('#speciesGrid');
  $('#tabIntro').textContent = GROUPS[group].intro;
  grid.innerHTML = SPECIES[group].map((sp, i) => `
    <button class="scard" data-i="${i}" style="animation-delay:${Math.min(i, 10) * 50}ms" aria-label="Ver ficha de ${esc(sp.name)}">
      <span class="scard__more" aria-hidden="true"><i data-lucide="plus"></i></span>
      <div class="scard__media wimg" data-wiki="${esc(speciesWiki(sp))}" data-w="500" data-icon="${GROUPS[group].icon}" data-label="${esc(sp.name)}" data-alt="${esc(sp.name)}"></div>
      <div class="scard__body">
        <p class="scard__name">${esc(sp.name)}</p>
      </div>
    </button>`).join('');
  observeImages(grid);
  refreshIcons();
}

function initSpecies() {
  const tabs = $$('#speciesTabs [role="tab"]');
  tabs.forEach(tab => tab.addEventListener('click', () => {
    tabs.forEach(t => { t.setAttribute('aria-selected', 'false'); t.tabIndex = -1; });
    tab.setAttribute('aria-selected', 'true'); tab.tabIndex = 0;
    renderSpecies(tab.dataset.tab);
  }));
  // Navegación con flechas entre pestañas
  $('#speciesTabs').addEventListener('keydown', e => {
    const i = tabs.indexOf(document.activeElement);
    if (i < 0) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      const n = tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
      n.focus(); n.click();
    }
  });
  $('#speciesGrid').addEventListener('click', e => {
    const card = e.target.closest('.scard');
    if (card) openModal(SPECIES[currentGroup][+card.dataset.i], currentGroup, card);
  });
  renderSpecies('flora');
}

let lastFocus = null;
function openModal(sp, group, opener) {
  lastFocus = opener;
  const modal = $('#modal');
  const media = $('#modalMedia');
  media.className = 'modal__media wimg';
  media.innerHTML = '';
  delete media.dataset.loaded;
  media.dataset.wiki = speciesWiki(sp);
  media.dataset.w = '960';
  media.dataset.icon = GROUPS[group].icon;
  media.dataset.label = sp.name;
  media.dataset.alt = sp.name;
  media.dataset.credit = 'modalCredit';

  const rows = [
    ['Grupo', GROUPS[group].label],
    ['Rasgos', sp.traits.join(' · ')],
    sp.status ? ['Situación', sp.status] : null,
    sp.note ? ['Nota', sp.note] : null,
    sp.imgNote ? ['Imagen', sp.imgNote] : null
  ].filter(Boolean);

  $('#modalBody').innerHTML = `
    <p class="grp">${esc(GROUPS[group].label)}</p>
    <h3 id="modalTitle">${esc(sp.name)}</h3>
    <p class="sci">${esc(sp.sci)}</p>
    <p>${esc(sp.desc)}</p>
    <dl>${rows.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl>
    <p class="photo-credit" id="modalCredit"></p>`;

  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  loadWimg(media);
  refreshIcons();
  setTimeout(() => $('#modalClose').focus(), 30);
}

function closeModal() {
  const modal = $('#modal');
  if (modal.hidden) return;
  modal.hidden = true;
  document.body.style.overflow = '';
  if (lastFocus) lastFocus.focus();
}

function initModal() {
  $('#modal').addEventListener('click', e => { if (e.target.closest('[data-close]')) closeModal(); });
  document.addEventListener('keydown', e => {
    if ($('#modal').hidden) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'Tab') { // trampa de foco simple
      const f = $$('#modal button, #modal a[href]').filter(x => x.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
}

/* =========================================================
   8. CAPÍTULO 04: COMPARADOR
   ========================================================= */
function initCompare() {
  const range = $('#compareRange'), top = $('#compareTop'), handle = $('#compareHandle');
  const slot = (el, cfg, alt) => {
    const img = new Image();
    img.alt = alt;
    img.onload = () => img.classList.add('is-loaded');
    img.onerror = () => {
      img.remove();
      el.innerHTML = `<div class="compare__missing"><i data-lucide="image-plus"></i><span>Falta la imagen<br><code>${esc(cfg.src)}</code></span></div>`;
      refreshIcons();
    };
    img.src = cfg.src;
    el.appendChild(img);
  };
  slot($('#compareBefore'), COMPARE.before, `Vista aérea de Nordelta y Villanueva, ${COMPARE.before.label}`);
  slot($('#compareAfter'), COMPARE.after, `Vista aérea de Nordelta y Villanueva, ${COMPARE.after.label}`);
  $('#compareTagL').textContent = COMPARE.before.label;
  $('#compareTagR').textContent = COMPARE.after.label;
  $('#compareCap').innerHTML = `${esc(COMPARE.caption)} <span class="compare__credit">${esc(COMPARE.credit)}</span>`;

  const set = v => { top.style.clipPath = `inset(0 0 0 ${v}%)`; handle.style.left = `${v}%`; };
  range.addEventListener('input', () => set(range.value));
  set(range.value);
}

/* =========================================================
   9. CAPÍTULO 05: PÉRDIDA, LÍNEA DE TIEMPO Y GRÁFICOS
   ========================================================= */
function initLoss() {
  const btns = $$('#lossToggle button'), panel = $('#lossPanel');
  const show = k => {
    const d = LOSS[k];
    btns.forEach(b => b.setAttribute('aria-selected', String(b.dataset.k === k)));
    panel.innerHTML = `<div class="loss-panel__icon"><i data-lucide="${d.icon}"></i></div><div><h3>${esc(d.title)}</h3>${d.html}</div>`;
    panel.style.animation = 'none'; void panel.offsetWidth; panel.style.animation = '';
    refreshIcons();
  };
  btns.forEach(b => b.addEventListener('click', () => show(b.dataset.k)));
  show('habitat');
}

function initTimeline() {
  const el = $('#ecoTimeline');
  el.style.setProperty('--n', TIMELINE.length);
  el.innerHTML = TIMELINE.map(t => `
    <div class="tl">
      <p class="tl__year">${esc(t.y)}</p>
      <div class="tl__dot"></div>
      <p class="tl__t">${esc(t.t)}</p>
      <p class="tl__d">${esc(t.d)}</p>
      ${t.badge || ''}
    </div>`).join('');
}

function initCharts() {
  if (!window.Chart) {
    $$('.chartbox__c').forEach(c => { c.innerHTML = '<p class="note">No se pudo cargar la librería de gráficos. Revisá la conexión a internet.</p>'; });
    return;
  }
  Chart.defaults.font.family = 'Inter, system-ui, sans-serif';
  Chart.defaults.color = '#4a564e';

  const build = {
    chartIndex(ctx) {
      return new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['1999', '2013'],
          datasets: [{ data: [100, 66.7], backgroundColor: ['#2D6A4F', '#95D5B2'], borderRadius: 10, maxBarThickness: 120 }]
        },
        options: {
          maintainAspectRatio: false,
          animation: { duration: reduceMotion ? 0 : 1400, easing: 'easeOutQuart' },
          plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: c => c.dataIndex === 0 ? 'Índice 100 (superficie de referencia)' : 'Índice ≈ 67 (cálculo derivado: −1/3)' } }
          },
          scales: {
            y: { beginAtZero: true, max: 110, grid: { color: 'rgba(32,41,35,.08)' }, ticks: { stepSize: 25 } },
            x: { grid: { display: false }, ticks: { font: { size: 14, weight: '600' } } }
          }
        }
      });
    },
    chartDestino(ctx) {
      return new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Pasturas para ganado (~70 %)', 'Otros cambios (~30 %)'],
          datasets: [{ data: [114100, 48900], backgroundColor: ['#2D6A4F', '#D8C3A5'], borderColor: '#F6F5EF', borderWidth: 4, hoverOffset: 10 }]
        },
        options: {
          maintainAspectRatio: false, cutout: '64%',
          animation: { duration: reduceMotion ? 0 : 1400, animateRotate: true },
          plugins: {
            legend: { position: 'bottom', labels: { usePointStyle: true, padding: 16 } },
            tooltip: { callbacks: { label: c => ` ≈ ${fmt(c.raw)} ha (aprox.)` } }
          }
        }
      });
    }
  };

  const make = cv => { if (!cv._chart && build[cv.id]) cv._chart = build[cv.id](cv); };
  const canvases = $$('#chartIndex, #chartDestino');
  if (!('IntersectionObserver' in window)) { canvases.forEach(make); return; }
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { make(en.target); io.unobserve(en.target); } });
  }, { threshold: 0.35 });
  canvases.forEach(c => io.observe(c));
}

/* =========================================================
   10. CAPÍTULO 06: LUGARES, FILTROS Y FICHAS JUDICIALES
   ========================================================= */
const filters = { place: 'all', status: 'all' };

const mapsURL = q => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
const placeHref = p => p.url || mapsURL(p.maps);

function initPlaces() {
  $('#placeList').innerHTML = PLACE_GROUPS.map(g => `
    <section class="pgroup">
      <h3 class="pgroup__h">${esc(g.h)}</h3>
      <ul>${g.items.map(p => `
        <li><a class="place" href="${esc(placeHref(p))}" target="_blank" rel="noopener">
          <span class="place__top"><span class="place__name">${esc(p.name)}</span>
            <span class="place__kind"><i data-lucide="${p.url ? 'globe' : 'map-pin'}"></i>${p.url ? 'Sitio oficial' : 'Google Maps'}</span></span>
          <span class="place__where">${esc(p.where)}</span>
          <span class="place__text">${esc(p.text)}</span>
        </a></li>`).join('')}
      </ul>
    </section>`).join('');

  // Territorios del capítulo 04
  const all = PLACE_GROUPS.flatMap(g => g.items);
  $('#placesRow').innerHTML = TERRITORIES.map(n => all.find(p => p.name === n)).filter(Boolean).map(p => `
    <a href="${esc(placeHref(p))}" target="_blank" rel="noopener"><b>${esc(p.name)} <i data-lucide="arrow-up-right"></i></b>${esc(p.text)}</a>`).join('');
  refreshIcons();
}

function tagHTML(k) {
  const s = STATUS[k];
  return `<span class="tag" style="--c:${s.color};color:${s.ink}">${esc(s.label)}</span>`;
}

function caseMatches(c) {
  return (filters.place === 'all' || c.place === filters.place) &&
         (filters.status === 'all' || c.status.includes(filters.status));
}

function initFilters() {
  const placeEl = $('#filterPlace'), statusEl = $('#filterStatus');
  placeEl.innerHTML = `<button class="chip is-active" data-v="all">Todas</button>` +
    Object.entries(PLACES).map(([k, v]) => `<button class="chip" data-v="${k}">${esc(v)}</button>`).join('');
  statusEl.innerHTML = `<button class="chip is-active" data-v="all">Todos</button>` +
    Object.entries(STATUS).map(([k, s]) => `<button class="chip" data-v="${k}"><i style="background:${s.color}"></i>${esc(s.label)}</button>`).join('');

  const bind = (el, key) => el.addEventListener('click', e => {
    const b = e.target.closest('.chip'); if (!b) return;
    $$('.chip', el).forEach(c => c.classList.remove('is-active'));
    b.classList.add('is-active');
    filters[key] = b.dataset.v;
    renderCases();
  });
  bind(placeEl, 'place');
  bind(statusEl, 'status');
}

function resetFilters() {
  filters.place = 'all'; filters.status = 'all';
  ['#filterPlace', '#filterStatus'].forEach(sel => $$('.chip', $(sel)).forEach((c, i) => c.classList.toggle('is-active', i === 0)));
  renderCases();
}

function caseCard(c) {
  const st = STATUS[c.status[0]];
  return `
  <article class="ccard" id="case-${c.id}" style="--st:${st.color}">
    <div class="ccard__head" data-toggle>
      <p class="ccard__file"><span>${esc(c.file)}</span><span>${esc(PLACES[c.place])}</span></p>
      <h3 class="ccard__co">${esc(c.company)}</h3>
      <p class="ccard__loc"><i data-lucide="map-pin"></i>${esc(c.location)}</p>
      <div class="tags">${c.status.map(tagHTML).join('')}</div>
      <button class="ccard__toggle" aria-expanded="false" aria-controls="case-body-${c.id}">Ver expediente <i data-lucide="chevron-down"></i></button>
    </div>
    <div class="ccard__body" id="case-body-${c.id}">
      <div class="ccard__inner"><div class="ccard__content">
        <dl class="ccard__dl">
          <dt>Actividad</dt><dd>${esc(c.activity)}</dd>
          <dt>Problema</dt><dd>${esc(c.problem)}</dd>
          <dt>Superficie</dt><dd>${esc(c.area)}</dd>
          ${c.people ? `<dt>Demandados</dt><dd>${esc(c.people)}</dd>` : ''}
          <dt>Estado</dt><dd>${c.status.map(k => STATUS[k].label).join(' · ')}</dd>
        </dl>
        <p class="ccard__h">Cronología</p>
        <ul class="chron">${c.chron.map(x => `<li><b>${esc(x.d)}${x.verified ? ' · dato verificado' : ''}</b>${esc(x.t)}</li>`).join('')}</ul>
        <p class="ccard__h">Fuentes</p>
        <ul class="ccard__src">${c.sources.map(s => `<li>${s.url ? `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.t)}</a>` : esc(s.t)}</li>`).join('')}</ul>
        ${c.note ? `<p class="ccard__note"><strong>Nota de verificación.</strong> ${esc(c.note)}</p>` : ''}
        <p class="ccard__legal">${esc(c.legal)}</p>
      </div></div>
    </div>
  </article>`;
}

function setCaseOpen(card, open) {
  card.classList.toggle('is-open', open);
  $('.ccard__toggle', card).setAttribute('aria-expanded', String(open));
}

function renderCases() {
  const list = $('#caseList');
  const visible = CASES.filter(caseMatches);
  $('#caseCount').textContent = `Mostrando ${visible.length} de ${CASES.length} casos documentados`;
  list.innerHTML = visible.length
    ? visible.map(caseCard).join('')
    : `<div class="cases__empty"><p>No hay casos con esa combinación de filtros.</p><button class="chip is-active" id="resetFilters">Quitar filtros</button></div>`;
  const r = $('#resetFilters'); if (r) r.addEventListener('click', resetFilters);
  refreshIcons();
}

function initCaseList() {
  $('#caseList').addEventListener('click', e => {
    if (e.target.closest('a')) return;
    const head = e.target.closest('[data-toggle]');
    if (head) { const card = head.closest('.ccard'); setCaseOpen(card, !card.classList.contains('is-open')); }
  });
  $('#glossaryList').innerHTML = Object.values(STATUS).map(s => `<dt><span class="tag" style="--c:${s.color};color:${s.ink}">${esc(s.label)}</span></dt><dd>${esc(s.def)}</dd>`).join('');
}

/* =========================================================
   11. CAPÍTULO 07: ORGANIZACIONES
   ========================================================= */
function initOrgs() {
  const filtersEl = $('#orgFilters'), list = $('#orgList');
  let cat = 'all';
  filtersEl.innerHTML = `<button class="chip is-active" data-v="all">Todas</button>` +
    Object.entries(ORG_CATS).map(([k, v]) => `<button class="chip" data-v="${k}">${esc(v)}</button>`).join('');

  const render = () => {
    const items = ORGS.filter(o => cat === 'all' || o.cats.includes(cat));
    list.innerHTML = items.map((o, i) => `
      <li class="org" style="animation-delay:${i * 40}ms">
        <button class="org__head" aria-expanded="false">
          <span class="org__n">${String(ORGS.indexOf(o) + 1).padStart(2, '0')}</span>
          <span class="org__name">${esc(o.name)}${o.sub ? `<small style="display:block;font-family:Inter,sans-serif;font-size:13px;color:#4a564e;margin-top:2px">${esc(o.sub)}</small>` : ''}</span>
          <span class="org__cat">${o.cats.map(c => ORG_CATS[c]).join(' · ')}</span>
          <i data-lucide="plus"></i>
        </button>
        <div class="org__body"><div class="org__inner"><div class="org__content">
          <div><p>${esc(o.desc)}</p><ul>${o.items.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>
          ${o.url ? `<a class="org__link" href="${esc(o.url)}" target="_blank" rel="noopener">Sitio oficial <i data-lucide="arrow-up-right"></i></a>` : '<span class="org__nolink">Sin enlace verificado</span>'}
        </div></div></div>
      </li>`).join('');
    refreshIcons();
  };

  filtersEl.addEventListener('click', e => {
    const b = e.target.closest('.chip'); if (!b) return;
    $$('.chip', filtersEl).forEach(c => c.classList.remove('is-active'));
    b.classList.add('is-active');
    cat = b.dataset.v;
    render();
  });
  list.addEventListener('click', e => {
    const head = e.target.closest('.org__head'); if (!head) return;
    const li = head.parentElement;
    const open = !li.classList.contains('is-open');
    li.classList.toggle('is-open', open);
    head.setAttribute('aria-expanded', String(open));
  });
  render();
}

/* =========================================================
   12. CAPÍTULO 08: MEDIDAS DE RECUPERACIÓN
   ========================================================= */
function initRecovery() {
  const btns = $$('#recTabs button'), panel = $('#recPanel');
  const show = k => {
    btns.forEach(b => b.setAttribute('aria-selected', String(b.dataset.k === k)));
    const d = RECOVERY[k];
    panel.innerHTML = d.items.map((m, i) => `
      <article class="measure" style="animation-delay:${i * 70}ms">
        <i data-lucide="${m.icon}"></i>
        <h3>${esc(m.t)}</h3>
        <p>${esc(m.d)}</p>
      </article>`).join('') + `<p class="rec__src">${esc(d.src)}</p>`;
    refreshIcons();
  };
  btns.forEach(b => b.addEventListener('click', () => show(b.dataset.k)));
  show('nordelta');
}

/* =========================================================
   13. CAPÍTULO 09: TRIVIA
   ========================================================= */
const QUIZ_SIZE = 5;
const QUIZ_KEY = 'dv-quiz-respondidas';

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

function initQuiz() {
  const root = $('#quiz');
  // Preguntas ya respondidas por esta persona (se recuerdan en este navegador)
  let answered = new Set((store.get(QUIZ_KEY) || []).filter(n => n < QUIZ_BANK.length));
  let round = [], i = 0, score = 0;

  const newRound = () => {
    let pending = shuffle(QUIZ_BANK.map((_, n) => n).filter(n => !answered.has(n)));
    if (pending.length < QUIZ_SIZE) {
      // Se agotaron las nuevas: se completan con otras y se reinicia el registro
      const rest = shuffle(QUIZ_BANK.map((_, n) => n).filter(n => !pending.includes(n)));
      pending = pending.concat(rest).slice(0, QUIZ_SIZE);
      answered = new Set();
    }
    round = pending.slice(0, QUIZ_SIZE).map(n => {
      const q = QUIZ_BANK[n];
      const order = shuffle(q.o.map((_, k) => k));
      return { n, q: q.q, e: q.e, o: order.map(k => q.o[k]), a: order.indexOf(q.a) };
    });
    i = 0; score = 0;
    renderQ();
  };

  const renderQ = () => {
    const q = round[i];
    root.innerHTML = `
      <div class="quiz__top"><span>Trivia ambiental</span><span>Pregunta ${i + 1} de ${round.length}</span></div>
      <div class="quiz__bar"><span style="width:${(i / round.length) * 100}%"></span></div>
      <p class="quiz__q">${esc(q.q)}</p>
      <div class="quiz__opts">${q.o.map((o, j) => `<button class="opt" data-j="${j}"><span class="opt__l">${'ABCD'[j]}</span>${esc(o)}</button>`).join('')}</div>
      <div id="quizFb"></div>`;
    $$('.opt', root).forEach(b => b.addEventListener('click', () => answer(+b.dataset.j)));
  };

  const answer = j => {
    const q = round[i];
    const opts = $$('.opt', root);
    opts.forEach(o => { o.disabled = true; });
    opts[q.a].classList.add('is-right');
    const ok = j === q.a;
    if (ok) score++; else opts[j].classList.add('is-wrong');
    answered.add(q.n);
    store.set(QUIZ_KEY, Array.from(answered));
    const last = i === round.length - 1;
    $('#quizFb').innerHTML = `
      <p class="quiz__fb"><b>${ok ? '¡Correcto!' : 'No es esa.'}</b> ${esc(q.e)}</p>
      <div class="quiz__foot"><button class="btn btn--dark" id="quizNext">${last ? 'Ver resultado' : 'Siguiente'} <i data-lucide="arrow-right"></i></button></div>`;
    $('.quiz__bar span', root).style.width = `${((i + 1) / round.length) * 100}%`;
    refreshIcons();
    const next = $('#quizNext');
    next.focus();
    next.addEventListener('click', () => { if (last) result(); else { i++; renderQ(); $('.opt', root).focus(); } });
  };

  const result = () => {
    const total = round.length;
    const msg = score === total ? '¡Excelente! Conocés el Delta a fondo.'
      : score >= 3 ? 'Muy bien. Un repaso por los capítulos y completás el mapa.'
      : 'Buen comienzo: todas las respuestas están en este recorrido.';
    const left = QUIZ_BANK.length - answered.size;
    root.innerHTML = `
      <div class="quiz__score">
        <div class="quiz__top" style="justify-content:center"><span>Resultado</span></div>
        <p class="quiz__big">${score}<small style="font-size:.4em;color:#52B788">/${total}</small></p>
        <p>${msg}</p>
        <p class="quiz__left">${left >= QUIZ_SIZE ? `Te quedan ${left} preguntas nuevas.` : 'Ya respondiste casi todas: la próxima ronda vuelve a mezclar el banco completo.'}</p>
        <button class="btn btn--dark" id="quizRestart"><i data-lucide="rotate-ccw"></i> Jugar otra ronda</button>
      </div>`;
    refreshIcons();
    $('#quizRestart').addEventListener('click', newRound);
  };

  newRound();
}

/* =========================================================
   14. FUENTES
   ========================================================= */
function initSources() {
  $('#sourcesList').innerHTML = SOURCES.map(g => `
    <section>
      <h4>${esc(g.h)}</h4>
      <ul>${g.items.map(s => `<li>${s.url ? `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.t)}</a>` : esc(s.t)}</li>`).join('')}</ul>
    </section>`).join('');
}

/* =========================================================
   15. INICIO
   ========================================================= */
function safe(fn, name) {
  try { fn(); } catch (err) { console.error(`[Delta Vivo] Error en ${name}:`, err); }
}

document.addEventListener('DOMContentLoaded', () => {
  safe(initNav, 'navegación');
  safe(initAccordion, 'acordeón');
  safe(initCarousel, 'carrusel');
  safe(initSpecies, 'especies');
  safe(initModal, 'modal');
  safe(initCompare, 'comparador');
  safe(initLoss, 'pérdida');
  safe(initTimeline, 'línea de tiempo');
  safe(initCharts, 'gráficos');
  safe(initFilters, 'filtros');
  safe(initPlaces, 'lugares');
  safe(initCaseList, 'casos');
  safe(renderCases, 'casos');
  safe(initOrgs, 'organizaciones');
  safe(initRecovery, 'recuperación');
  safe(initQuiz, 'trivia');
  safe(initSources, 'fuentes');
  safe(initReveal, 'animaciones');
  observeImages();
  refreshIcons();
});
