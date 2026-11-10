# DELTA VIVO

Experiencia web interactiva sobre los humedales del Delta del Paraná: biodiversidad, transformación territorial, conflictos ambientales y conservación.

## Estructura de archivos

```
delta-vivo/
├── index.html   → estructura y textos de los 9 capítulos
├── style.css    → identidad visual "Ecological Editorial / Nature-Tech"
├── script.js    → datos (especies, casos, organizaciones, trivia, fuentes) e interacciones
└── README.md    → este archivo
```

Todos los contenidos que cambian con frecuencia (especies, casos judiciales, organizaciones, medidas, línea de tiempo, trivia y fuentes) están en la sección **1. DATOS** al comienzo de `script.js`. Para corregir o agregar información no hace falta tocar el HTML.

## Cómo verlo en tu computadora

1. Descomprimí la carpeta `delta-vivo`.
2. Hacé doble clic en `index.html`. Se abre en el navegador.

Necesita conexión a internet: las librerías (Tailwind, Chart.js, Lucide), las tipografías y las fotografías se cargan desde servidores externos. No requiere Node.js ni instalaciones.

## Cómo publicarlo en GitHub Pages

1. Entrá a [github.com](https://github.com) e iniciá sesión.
2. Creá un repositorio nuevo (botón **New**), por ejemplo `delta-vivo`, de tipo **Public**.
3. En el repositorio, elegí **Add file → Upload files** y arrastrá `index.html`, `style.css`, `script.js`, `README.md` y la carpeta `img` (con las dos imágenes del comparador adentro). Confirmá con **Commit changes**.
4. Andá a **Settings → Pages**.
5. En **Source**, elegí **Deploy from a branch**; en **Branch**, elegí `main` y la carpeta `/ (root)`. Guardá con **Save**.
6. En uno o dos minutos aparece la dirección pública, del tipo `https://TU-USUARIO.github.io/delta-vivo/`.

Para actualizar el sitio, volvé a subir el archivo modificado con **Upload files**: GitHub Pages se actualiza solo.

## Funcionalidades

Navbar fija con capítulo activo y barra de progreso · menú responsive · animaciones al desplazarse · contadores animados · acordeón de humedales bonaerenses · carrusel de paisajes (flechas, puntos, teclado y deslizamiento táctil) · catálogo de 45 especies en 5 pestañas (la ficha muestra imagen y nombre; al tocarla se amplía con la descripción) · comparador deslizable antes/ahora de Nordelta y Villanueva · selector hábitat vs. animales · 2 gráficos (Chart.js) · línea de tiempo · lista de lugares con enlace a su sitio oficial o a Google Maps · filtros por ubicación y estado judicial · fichas de expediente desplegables · glosario de estados judiciales · organizaciones filtrables y desplegables · medidas por barrio en pestañas · trivia de 5 preguntas al azar sobre un banco de 27 · botón volver arriba.

## Comparador antes / ahora (capítulo 04)

El comparador usa dos imágenes que hay que agregar en la carpeta `img/`:

- `img/nordelta-antes.jpg` → alrededor del año 2000
- `img/nordelta-hoy.jpg` → la imagen más reciente

Mientras falten, el sitio muestra un aviso en su lugar. Cómo obtenerlas con **Google Earth Pro** (gratuito, para escritorio):

1. Buscá "Nordelta, Tigre" y encuadrá la zona de Nordelta y Villanueva. Inclinación 0 (vista desde arriba, tecla **U**) y norte arriba (tecla **N**).
2. Activá las imágenes históricas: **Ver → Imágenes históricas** (o el ícono del reloj). Aparece un deslizador de fechas.
3. Elegí la fecha más antigua con buena resolución cercana al 2000 y usá **Archivo → Guardar → Guardar imagen** → `nordelta-antes.jpg`.
4. Sin mover el encuadre, pasá a la fecha más reciente y guardá `nordelta-hoy.jpg`.
5. Copiá las dos a la carpeta `img/`.

Las dos imágenes deben tener exactamente el mismo encuadre y tamaño. Google Earth incluye su atribución en la imagen guardada: no hay que recortarla. Si las fechas reales son otras (por ejemplo 2003 y 2025), cambiá los rótulos en `COMPARE`, al comienzo de `script.js`; ahí también están el texto del pie y el crédito.

## Trivia

Cada ronda toma 5 preguntas al azar de `QUIZ_BANK` (en `script.js`) y mezcla el orden de las opciones. Las preguntas respondidas se recuerdan en el navegador de cada persona, así que "Jugar otra ronda" prioriza las que todavía no respondió. Cuando quedan menos de 5 nuevas, el banco se vuelve a mezclar completo. Para sumar preguntas, agregalas a `QUIZ_BANK` con el mismo formato.

## Fotografías

Las fotos se obtienen en vivo desde **Wikimedia Commons** a través de la API pública de Wikipedia, buscando cada especie por su nombre científico. Solo se aceptan archivos alojados en Commons (licencias libres) y cada foto enlaza a su página, donde figuran autor y licencia. Si una imagen no existe o no carga, el sitio muestra una ilustración de reemplazo y sigue funcionando.

Para fijar una foto propia en una ficha, agregá a la especie en `script.js` un campo `wiki` con otro título de Wikipedia (`'es:Título|en:Title'`).

Las dos vistas del carrusel tomadas desde el espacio (Delta del Paraná y río Paraná) son de NASA Earth Observatory, de dominio público, y se cargan por URL directa (`LANDSCAPES` en `script.js`).

## Notas de verificación

Inconsistencias y datos incompletos detectados en la investigación, y cómo se resolvieron:

1. **Caso de Ramallo sin nombre.** La investigación lo presentaba como "la empresa arenera" y en la tabla comparativa como Naviera Lojda S.A. Se verificó en Economía Sustentable que es el mismo caso (Paso del Tonelero). De esa verificación se agregaron dos datos marcados como tales: el expediente se inició en 2012 y la sentencia ordena reparar 2 hectáreas.
2. **El Mapuche SRL.** Se verificó que la denuncia la presentó la asociación UPVA en noviembre de 2020 y que los informes son de organismos de Entre Ríos.
3. **Enlace de Fundación Humedales.** La bibliografía decía `wetlands.org.ar`; el sitio verificado es `lac.wetlands.org`.
4. **CAUCE.** Sin enlace en la investigación; se usó `cauceecologico.org`, verificado. También se verificó y agregó su presentación como "amigo del tribunal" junto con FARN (2021).
5. **Lagarto overo.** La investigación lo llamaba "iguana": es un lagarto teido, no una iguana. Corregido con nota en la ficha.
6. **Monte blanco.** Figuraba en la lista de plantas, pero es una comunidad vegetal (selva ribereña), no una especie. Se presenta así.
7. **"Rana" dorada de Monteverde.** Es un sapo (*Incilius periglenes*). La causa de su extinción que da la investigación (alteraciones microclimáticas por asentamiento humano) queda marcada "A verificar".
8. **Estudios sin referencia completa.** Se identificaron: la pérdida de 163.000 ha y el 70 % convertido en pasturas provienen de Sica (2016), tesis doctoral FCEN-UBA; el relevamiento de aves 1997-1999 / 2012-2013 es Sica y otros (2018), *Austral Ecology*. La misma tesis indica que cerca del 20 % de la pérdida pasó a plantaciones forestales.
9. **Fuentes de casos sin enlace.** Eco Urbano, R2820, ERA Verde, La Gaceta Online, Rosario3 y el documento judicial de Carboquímica figuran por nombre, sin URL, porque la investigación no las incluía.
10. **Datos de contexto global.** IPBES, incendios de Australia, paloma viajera y cotorra de Carolina no corresponden al Delta: se muestran con la etiqueta "Contexto global".
11. **Transformación urbana sin cifras.** La investigación no trae superficies rellenadas ni fechas de Nordelta o Villanueva. El capítulo 04 muestra el cambio con imágenes aéreas en lugar de cifras.
12. **Cálculos derivados.** El índice 2013 (≈ 67) y las hectáreas por destino (≈ 114.100 / ≈ 48.900) se calcularon a partir de "un tercio" y "cerca del 70 %". Están etiquetados así.
13. **Mapa retirado.** El mapa interactivo se reemplazó por una lista de lugares con enlace a su sitio oficial o a Google Maps.
14. **Sitio Ramsar 2016.** Dato agregado y verificado (Levrand, 2023) para la línea de tiempo.
15. **Texto ajeno al proyecto.** La investigación incluía una frase sobre "tu mundo de Minecraft" y un tono coloquial; se reescribió en registro editorial.

## Fuentes y referencias

La lista completa, con enlaces, está en el pie del sitio y en `SOURCES` dentro de `script.js`. Incluye: Ministerio de Ambiente de la Provincia de Buenos Aires; Gobierno nacional; Malvárez (1999); Kalesnik y Quintana (2006); Parques Nacionales; SIB; Aves Argentinas / Ministerio de Ambiente (2020); Fundación Temaikèn (2023 y s.f.); Proyecto Pantano; UICN (2023); BirdLife International; INTA / Ministerio de Ambiente; IPBES (2019); WWF (2020); AVN (2021); EIDICO; Dirección de Flora y Fauna PBA (2021); Wetlands International LAC; Rewilding Argentina; Sica (2016); Sica y otros (2018); NASA Earth Observatory; FARN (2023); La Voz de Ramallo; Economía Sustentable; Eco Urbano; R2820; ERA Verde; La Gaceta Online; Rosario3; Análisis Digital; Levrand (2023).

## Auditoría técnica realizada

- Sintaxis de JavaScript verificada, sin errores.
- Todos los `id` referenciados por el JavaScript existen en el HTML; sin `id` duplicados; todos los enlaces internos del menú apuntan a secciones existentes.
- Prueba en navegador real (Chromium) a 1440 px y 390 px: sin errores de JavaScript, sin desplazamiento horizontal, y todas las interacciones probadas una por una (pestañas, ficha ampliada y cierre con Esc, filtros, lista de lugares, fichas de expediente, organizaciones, pestañas de medidas, comparador, cinco rondas de trivia sin preguntas repetidas, carrusel, menú móvil).
- Si falla una librería externa, cada módulo falla por separado y muestra un aviso; el resto del sitio sigue funcionando.
