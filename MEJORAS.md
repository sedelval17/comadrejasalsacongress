# Mejoras aplicadas

## Identidad y composición

- Bordó, dorado, crema y fotografía del evento mantienen la identidad reconocible. Tipografía de exhibición Oswald y lectura Manrope, con denominación completa de la marca siempre legible.
- Portada con imagen vertical de 585 × 750 contenida, en lugar de ampliarla y recortarla a todo el ancho del monitor. La marca íntegra se recuperó del afiche porque los archivos separados ya tenían letras cortadas. Luego, por pedido del usuario, se reconstruyó un logo de 2170 × 725 px que conserva su composición, serif fino y blanco/dorado; se integró en portada, encabezado y pie.
- Secciones claras, franjas editoriales, numeración discreta y jerarquía consistente entre las siete páginas. Los bloques de información extensa tienen anclas y agrupación temática.
- Fotografías y afiches se conservan completos. Artistas internacionales, grilla, grupos, conducción y DJs tienen presentaciones acordes a su material real.
- No se generaron retratos ni fondos fotográficos alternativos. Todos los originales permanecen archivados.

## Contenido y recorridos

- Siete páginas completas y rutas históricas `.html`; `/index.html` sigue sirviendo la portada y canonical apunta a `/`.
- Cronograma de cuatro días con navegación interna y nueve actividades de formación identificadas. Los horarios no publicados se muestran como pendientes.
- 31 registros de artistas/parejas, compañías, conductores y DJs. El afiche anterior se retiró del contenido vigente tras las confirmaciones de sede y cancelación de Ramón Vacilón; sus variantes de nombres siguen documentadas.
- Full Pass, categorías de El Mundial, tres entradas de social y tres medios de pago. Los importes provienen de la web original, con las aclaraciones recibidas; los destinos de WhatsApp se actualizaron para dirigir todas las inscripciones a Isa.
- Todas las inscripciones con Isa, incluido Battle Master. Rodrigo conserva su presentación como organizador. No se simula una compra ni un formulario que no envía nada.
- El Mundial incluye las etapas, estilos, formatos, niveles, edades y 13 referencias de eliminatorias/sedes publicadas.
- Battle Master conserva formato, evaluación, restricciones y cinturones; se retiró el premio en efectivo por indicación de la organización.
- Reglamento de El Mundial recibido e integrado como descarga: documento original 2027, confirmado para las fechas de noviembre de 2026. Se identifican edición, 16 páginas y tamaño; Battle Master mantiene el contacto con Isa mientras falta su PDF.
- Una única sede confirmada: Hotel Estilo MB, Almafuerte 40, con mapa y enlace directo. La eliminatoria de Córdoba del 1 de noviembre se distingue de la Final Nacional del 26 y 27.

## Accesibilidad y estabilidad

- HTML semántico, un H1 por página, navegación con nombre accesible, enlace para saltar al contenido y `aria-current`.
- Menú nativo `details/summary`: funciona sin JavaScript, con teclado; Escape cierra y devuelve el foco. El desplegable no desplaza el contenido.
- Espacio reservado por dimensiones nativas y `aspect-ratio` para fotografías, video, miniaturas y mapas. No hay inserciones tardías de tarjetas.
- Foco visible, estados legibles, contraste verificado con Axe, respeto por movimiento reducido y estilos de impresión para el programa.
- Textos alternativos ligados al contenido. Los nombres no se dedujeron de la apariencia física de las personas.
- Los videos de YouTube son enlaces reales sin JavaScript y se convierten en reproductores al activarlos.

## Rendimiento y mantenibilidad

- Astro estático y TypeScript; sin framework de cliente, backend, base de datos ni paquetes de animación.
- Originales locales, versiones AVIF/WebP y `srcset`; ninguna variante se genera por encima de la resolución original. Los 48 WebP de mayor tamaño reducen el peso comparable un 63 % frente a los originales (medición en `research/image-optimization.json`).
- Solo las imágenes iniciales son prioritarias. El resto utiliza carga diferida; el video usa `preload="none"` y los iframes de YouTube no se descargan hasta reproducir.
- Video original H.264 de 10 bits/HLG preservado y versiones SDR de entrega en MP4 Main de 8 bits y WebM; reproducción real de la entrega WebM comprobada en Chromium, 406 × 720, 24,233 segundos.
- Dos fuentes variables locales, sin solicitudes a Google Fonts, y solo subconjuntos latinos.
- Componentes compartidos y datos separados para evento, programa, precios, artistas y recursos. Lockfile y scripts para desarrollo, build, imágenes y validación.
- Metadatos únicos, canonical, Open Graph, `robots.txt`, sitemap y página 404. No se anuncia un hotel conflictivo mediante datos estructurados de evento.

## Evidencia

Las capturas originales y textos completos están en `research/`; las capturas nuevas y resultados están en `validation/`. **[VALIDACIONES.md](VALIDACIONES.md)** distingue los resultados ejecutados de las limitaciones de servicios externos y de los datos pendientes.

## Ajuste de legibilidad tras la revisión del usuario

Se aumentó el menú de escritorio de 11,68 a 16 px, con peso 600 y mayor contraste. El texto de lectura pasa a 16 px, los botones a 15 px y la información secundaria a 13–15 px; las leyendas decorativas usan 12 px. Se eliminaron las reducciones excesivas en móvil y se apilaron las llamadas a la acción de la portada en pantallas pequeñas. Los titulares y la identidad visual mantienen su escala.
