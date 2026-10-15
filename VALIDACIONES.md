# Validaciones ejecutadas

Fecha: **15 de octubre de 2026**. Entorno local Linux, Node 22.23.3, Astro 7.3.8 y Chromium mediante Playwright. Se revisó la salida estática de producción servida en el puerto 4323 en la revisión más reciente.

## Compilación

- `npm run check`: **0 errores, 0 advertencias, 0 sugerencias** en la ejecución final.
- `npm run build`: **correcto**; genera las siete páginas del evento, `404.html` y `sitemap.xml`.
- No se necesitó un servidor de aplicación ni base de datos para servir `dist/`.

## Sitio original

Se ejecutó `npm run test:original` contra el dominio público: **14 capturas completas**, las siete páginas a 375 y 1440 px. Evidencia: `research/screenshots/original/` y `research/original-browser.json`.

En esa captura el original no presentó scroll horizontal ni imágenes rotas en los dos anchos comprobados. Se identificaron imágenes sin atributos de dimensiones, dos enlaces de reglamento HTTP 404 y los conflictos documentados de contenido. No se atribuyen al original fallos que no aparecieron en las pruebas.

Se compararon visualmente las capturas originales con las nuevas: fuente hero vertical contenida, jerarquía más clara, navegación consistente, tarjetas que conservan retratos completos y cronograma más legible. Se inspeccionaron además las vistas de detalle de artistas y precios.

## Responsive y recursos

`npm test` recorrió las siete páginas en **320, 375, 768, 1024, 1440 y 1920 px**: **42 combinaciones y 42 capturas completas**, conservadas en `validation/screenshots/`.

Resultado final de la suite: **0 fallos**.

| Revisión | Resultado |
| --- | --- |
| Respuesta de las siete rutas | HTTP 200 en todos los anchos |
| Desbordamiento del documento y de elementos visibles | Ninguno detectado |
| Imágenes rotas visibles | Ninguna |
| Atributos de ancho y alto de imágenes | Presentes en todas las imágenes |
| Excepciones JavaScript y errores de recursos locales | Ninguno |
| H1, descripción y canonical por página | Correctos |
| Enlaces vacíos o de marcador `#` | Ninguno |
| Enlaces internos y anclas recopiladas | 33 destinos comprobados, sin fallos |
| `/index.html`, sitemap, robots y página 404 | Servidos correctamente |

La prueba mide cambios de posición con `PerformanceObserver`. En la revisión más reciente, el CLS observado fue **0 en 40 de las 42 combinaciones**, y aproximadamente **0,0008 y 0,0026** en la página de artistas a 320 y 375 px, respectivamente. Son observaciones locales sin simular red móvil ni limitar CPU; no equivalen a datos de campo ni a una garantía universal de Core Web Vitals. No se ejecutó Lighthouse ni se inventó una puntuación.

## Accesibilidad y funcionamiento

- **14 análisis Axe**: siete páginas a 375 y 1440 px, etiquetas WCAG 2 A/AA y WCAG 2.1 A/AA. Resultado final: **0 infracciones detectadas automáticamente**.
- Se corrigieron discrepancias entre texto visible y nombre accesible en la marca y en los enlaces de reproducción.
- Menú móvil probado a 320, 375, 768 y 1024 px: Enter abre, Escape cierra y restaura el foco, y el enlace de precios navega a su ruta real.
- Contexto sin JavaScript a 375 px: el menú nativo abre y los enlaces de video conservan sus destinos de YouTube.
- Las 31 entradas de la grilla aparecen en la página de artistas. El afiche anterior fue retirado tras las confirmaciones de la organización.
- Las cuatro anclas del cronograma llevan a su día sin ocultarlo detrás del encabezado fijo.
- Activación real de las cuatro miniaturas de YouTube: se inserta el iframe de `youtube-nocookie.com` correspondiente después del clic, y no antes.
- La sede confirmada, Hotel Estilo MB, tiene un único mapa con título, dimensiones reservadas y enlace externo a Almafuerte 40.

La ausencia de infracciones de Axe no certifica conformidad completa. Quedaron comprobaciones automáticas inconclusas de contraste sobre imágenes, atributos ARIA contextuales y subtitulado del video. No se recuperaron subtítulos oficiales del material. No se declara probado el acceso con todos los lectores de pantalla.

## Video local

La inspección del MP4 recuperado detectó **H.264 High 10 de 10 bits, HLG/BT.2020**, perfil que el Chromium disponible no decodifica. Se generaron copias compatibles preservando el original:

- MP4 H.264 Main de 8 bits/AAC, con inicio rápido.
- WebM VP9/Opus.
- Conversión de HLG a SDR, misma filmación y audio, sin contenido agregado.

La prueba final **reprodujo realmente la copia WebM** en Chromium: **406 × 720, duración 24,233 s**, con avance del tiempo de reproducción mayor a un segundo. Los archivos MP4 de entrega y WebM son accesibles localmente; la reproducción del MP4 de entrega no se certifica en este navegador sin soporte H.264. Procedimiento y tamaños en `research/video-optimization.json`.

Los reproductores de YouTube pueden depender de restricciones del proveedor, región o cuenta. Se verificaron sus referencias, miniaturas públicas, activación de iframe y enlaces originales; no se certificó la reproducción completa de los cuatro videos ni una disponibilidad futura del servicio.

## Límites y datos pendientes

- Los dos enlaces originales de reglamentos devolvieron HTTP 404 durante la auditoría. Posteriormente el usuario proporcionó El Mundial 2027 y confirmó que corresponde a las fechas de noviembre de 2026; ya está disponible como descarga. Battle Master conserva el contacto con Isa mientras falta su PDF.
- No se enviaron mensajes de WhatsApp, no se realizaron compras ni transacciones. Los destinos de inscripción y sus mensajes predefinidos se dirigen a Isa, incluido Battle Master.
- Se aplicaron las confirmaciones de sede, eliminatoria/final, contacto único de inscripción y sociales; se retiró el premio en efectivo de Battle Master. La tarifa por cantidad de categorías continúa pendiente de aclaración.
- No se publicaron cambios en el dominio original.
- No se probaron todos los navegadores, dispositivos físicos ni condiciones de conectividad.

Los resultados completos y reproducibles están en `validation/report.json` y `validation/links.json`. Para repetirlos, compilar, iniciar `npm run preview -- --port 4321` y ejecutar `npm test` desde otra terminal con Node 22.12 o superior.

## Verificación tras integrar el logo reconstruido

Se volvió a ejecutar `npm run check`, `npm run build` y la suite completa después de integrar el logo en portada, encabezado y pie: 42 combinaciones responsive, 14 análisis Axe y pruebas funcionales, con cero fallos. Vistas finales inspeccionadas: `validation/screenshots/home-final-hero.png` y `home-final-mobile.png`.

## Preparación para GitHub Pages en sedelval17

La compilación de revisión se probó con `COMADREJA_SITE_URL=https://sedelval17.github.io`, `COMADREJA_BASE_PATH=/comadrejasalsacongress` y `COMADREJA_PREVIEW=1`. `scripts/validate-pages.mjs` verificó las siete páginas a 375 y 1440 px: 14 combinaciones, navegación móvil, canonical, estado activo, noindex, robots y sitemap. Los 201 destinos/recursos locales recopilados devolvieron HTTP 200, sin escapes de ruta ni desbordamiento. Evidencia en `validation/github-pages.json`. Esto verifica la preparación local; no certifica una publicación remota sin autorización y despliegue.

## Validación del ajuste de legibilidad

Después de aumentar los tamaños se ejecutaron nuevamente `npm run check`, `npm run build` y la suite de producción: 42 combinaciones responsive y 14 análisis Axe, sin fallos; CLS observado 0 en las 42 combinaciones de esta ejecución. Se revisó además la portada a 1100 y 1280 px para comprobar que el menú de 16 px entra completo, y la navegación del cronograma a 375 px: el día seleccionado queda debajo de la barra fija. Capturas de revisión: `validation/screenshots/readability-home-1440.png`, `readability-home-375.png` y `readability-program-375.png`.

## Confirmaciones posteriores de la organización

Se ejecutaron `npm run check`, `npm run build`, las 42 combinaciones de la suite y 14 análisis Axe, sin fallos. Se comprobó además en las siete páginas que los WhatsApp dirigen a Isa y que no se muestran Domus, Ramón Vacilón, los importes retirados de Battle Master ni el afiche anterior, incluso en Open Graph. Se verificaron la eliminatoria de Córdoba del 1 de noviembre, la Final Nacional del 26 y 27 y la aclaración de la social del viernes a las 00:00 del sábado 28.

La tarifa de $20.000 desde la segunda categoría se muestra sin asumir si aplica desde tres o desde más de tres categorías. Después de acortar el botón de consulta de Battle Master se recompiló y se comprobó su texto y destino en móvil. Vistas revisadas: `validation/screenshots/confirmed-prices-1440.png`, `confirmed-socials-375.png`, `confirmed-location-1440.png` y `confirmed-battle-375.png`. Estos cambios se mantienen en local para revisión.

## Descarga del reglamento recibido de El Mundial

Se revisaron las 16 páginas del PDF recibido y se verificó visualmente su portada, que identifica la edición 2027. El usuario confirmó su aplicación a las fechas de Córdoba de noviembre de 2026. Se trasladó íntegro a `public/documents/reglamento-oficial-el-mundial-2027.pdf`, preservando el contenido y su SHA-256, registrado en `research/rulebook-review.json`.

`npm run check` y `npm run build` finalizaron correctamente. La salida estática devuelve HTTP 200 con `application/pdf`, 7.725.342 bytes y el mismo SHA-256 del original. Se verificaron la navegación desde el botón Reglamento, la descarga real con nombre correcto y las vistas a 320, 375, 768 y 1440 px sin desbordes. Los dos análisis Axe de El Mundial a 375 y 1440 px no detectaron infracciones. El botón de Battle Master mantiene el destino de WhatsApp de Isa y no descarga un archivo inexistente. Estos cambios siguen en local.
