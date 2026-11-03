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

Necesita conexión a internet: las librerías (Tailwind, Leaflet, Chart.js, Lucide), las tipografías, el mapa base y las fotografías se cargan desde servidores externos. No requiere Node.js ni instalaciones.

## Cómo publicarlo en GitHub Pages

1. Entrá a [github.com](https://github.com) e iniciá sesión.
2. Creá un repositorio nuevo (botón **New**), por ejemplo `delta-vivo`, de tipo **Public**.
3. En el repositorio, elegí **Add file → Upload files** y arrastrá `index.html`, `style.css`, `script.js` y `README.md` (los archivos sueltos, no la carpeta). Confirmá con **Commit changes**.
4. Andá a **Settings → Pages**.
5. En **Source**, elegí **Deploy from a branch**; en **Branch**, elegí `main` y la carpeta `/ (root)`. Guardá con **Save**.
6. En uno o dos minutos aparece la dirección pública, del tipo `https://TU-USUARIO.github.io/delta-vivo/`.

Para actualizar el sitio, volvé a subir el archivo modificado con **Upload files**: GitHub Pages se actualiza solo.

## Funcionalidades

Navbar fija con capítulo activo y barra de progreso · menú responsive · animaciones al desplazarse · contadores animados · acordeón de humedales bonaerenses · carrusel de paisajes (flechas, puntos, teclado y deslizamiento táctil) · catálogo de 45 fichas en 5 pestañas con ficha ampliada · comparador deslizable humedal/urbanización · selector hábitat vs. animales · 2 gráficos (Chart.js) · línea de tiempo · mapa Leaflet con 4 capas activables y 13 marcadores · filtros por ubicación y estado judicial que actúan sobre el mapa y las fichas · fichas de expediente desplegables · glosario de estados judiciales · organizaciones filtrables y desplegables · medidas por barrio en pestañas · trivia de 5 preguntas con puntaje · botón volver arriba.

## Fotografías

Las fotos se obtienen en vivo desde **Wikimedia Commons** a través de la API pública de Wikipedia, buscando cada especie por su nombre científico. Solo se aceptan archivos alojados en Commons (licencias libres) y cada foto enlaza a su página, donde figuran autor y licencia. Si una imagen no existe o no carga, el sitio muestra una ilustración de reemplazo y sigue funcionando.

Para fijar una foto propia en una ficha, agregá a la especie en `script.js` un campo `wiki` con otro título de Wikipedia (`'es:Título|en:Title'`).

## Notas de verificación

Inconsistencias y datos incompletos detectados en la investigación, y cómo se resolvieron:

1. **Caso de Ramallo sin nombre.** La investigación lo presentaba como "la empresa arenera" y en la tabla comparativa como Naviera Lojda S.A. Se verificó en Economía Sustentable que es el mismo caso (Paso del Tonelero). De esa verificación se agregaron dos datos marcados como tales: el expediente se inició en 2012 y la sentencia ordena reparar 2 hectáreas.
2. **El Mapuche SRL.** Se verificó que la denuncia la presentó la asociación UPVA en noviembre de 2020 y que los informes son de organismos de Entre Ríos.
3. **Enlace de Fundación Humedales.** La bibliografía decía `wetlands.org.ar`; el sitio verificado es `lac.wetlands.org`.
4. **CAUCE.** Sin enlace en la investigación; se usó `cauceecologico.org`, verificado. También se verificó y agregó su presentación como "amigo del tribunal" junto con FARN (2021).
5. **Lagarto overo.** La investigación lo llamaba "iguana": es un lagarto teido, no una iguana. Corregido con nota en la ficha.
6. **Monte blanco.** Figuraba en la lista de plantas, pero es una comunidad vegetal (selva ribereña), no una especie. Se presenta así.
7. **"Rana" dorada de Monteverde.** Es un sapo (*Incilius periglenes*). La causa de su extinción que da la investigación (alteraciones microclimáticas por asentamiento humano) queda marcada "A verificar".
8. **Estudios sin referencia completa.** "Estudio científico sobre la pérdida de humedales" y "Estudio sobre las aves del Bajo Delta" aparecen sin autor ni año: figuran en las fuentes como "referencia completa a verificar".
9. **Fuentes de casos sin enlace.** Eco Urbano, R2820, ERA Verde, La Gaceta Online, Rosario3 y el documento judicial de Carboquímica figuran por nombre, sin URL, porque la investigación no las incluía.
10. **Datos de contexto global.** IPBES, incendios de Australia, paloma viajera y cotorra de Carolina no corresponden al Delta: se muestran con la etiqueta "Contexto global".
11. **Transformación urbana sin cifras.** La investigación no trae superficies rellenadas ni fechas de Nordelta o Villanueva. El capítulo 04 lo indica como "Dato faltante" y el comparador es una ilustración conceptual.
12. **Cálculos derivados.** El índice 2013 (≈ 67) y las hectáreas por destino (≈ 114.100 / ≈ 48.900) se calcularon a partir de "un tercio" y "cerca del 70 %". Están etiquetados así.
13. **Ubicaciones del mapa.** Son aproximadas. No se dibujaron polígonos.
14. **Sitio Ramsar 2016.** Dato agregado y verificado (Levrand, 2023) para la línea de tiempo.
15. **Texto ajeno al proyecto.** La investigación incluía una frase sobre "tu mundo de Minecraft" y un tono coloquial; se reescribió en registro editorial.

## Fuentes y referencias

La lista completa, con enlaces, está en el pie del sitio y en `SOURCES` dentro de `script.js`. Incluye: Ministerio de Ambiente de la Provincia de Buenos Aires; Gobierno nacional; Malvárez (1999); Kalesnik y Quintana (2006); Parques Nacionales; SIB; Aves Argentinas / Ministerio de Ambiente (2020); Fundación Temaikèn (2023 y s.f.); Proyecto Pantano; UICN (2023); BirdLife International; INTA / Ministerio de Ambiente; IPBES (2019); WWF (2020); AVN (2021); EIDICO; Dirección de Flora y Fauna PBA (2021); Wetlands International LAC; Rewilding Argentina; FARN (2023); La Voz de Ramallo; Economía Sustentable; Eco Urbano; R2820; ERA Verde; La Gaceta Online; Rosario3; Análisis Digital; Levrand (2023).

## Auditoría técnica realizada

- Sintaxis de JavaScript verificada, sin errores.
- Todos los `id` referenciados por el JavaScript existen en el HTML; sin `id` duplicados; todos los enlaces internos del menú apuntan a secciones existentes.
- Prueba en navegador real (Chromium) a 1440 px y 390 px: sin errores de JavaScript, sin desplazamiento horizontal, y todas las interacciones probadas una por una (pestañas, ficha ampliada y cierre con Esc, filtros y estado vacío, marcadores, ventanas del mapa, fichas de expediente, organizaciones, pestañas de medidas, comparador, trivia completa, carrusel, menú móvil).
- Si falla una librería externa, cada módulo falla por separado y muestra un aviso; el resto del sitio sigue funcionando.
