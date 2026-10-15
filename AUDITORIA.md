# Auditoría del sitio publicado

**Fuente:** https://comadrejaproducciones.com/  
**Fecha de investigación:** 15 de octubre de 2026.  
**Alcance:** todas las secciones enlazadas, sus recursos HTML/CSS/JS, imágenes, documentos, multimedia, enlaces y metadatos públicos. La aplicación nueva se desarrolla por separado; el código original solo se conserva como evidencia.

## Resultado de la recuperación

| Elemento | Resultado |
| --- | --- |
| Páginas | Siete secciones completas, HTTP 200, más `/index.html` como alias del Inicio. |
| Archivos de evidencia | HTML y texto por página en `research/pages/`; JSON estructurado en `research/pages.json`. |
| Imágenes | 48 descargadas y verificadas con Pillow: 44 del sitio y cuatro miniaturas YouTube. |
| Video local | Un MP4 de 3.639.421 bytes con firma MP4 válida. |
| YouTube | Cuatro videos identificados, miniaturas descargadas y títulos confirmados por oEmbed HTTP 200. |
| PDF | Dos referencias encontradas; ambas HTTP 404. No se fabricaron documentos sustitutos. |
| Artistas | 31 registros: 20 artistas/parejas, dos compañías, cuatro conductores y cinco DJs. |
| Texto de afiche | Transcrito por separado en `research/graphic-content.json`; incluye datos contradictorios y participantes adicionales. |
| Enlaces | 90 URL únicas descubiertas en HTML/CSS; destinos, origen y respuestas documentados. |
| Peso recuperado | 15.411.548 bytes de imágenes y video originales; no representa el peso de carga de una página nueva. |
| Recursos fuente | CSS, JS y CSS de Google Fonts archivados, sin reutilizar el diseño original como implementación. |
| Robots / sitemap originales | Ambos HTTP 404. |
| Directorios de recursos | Sin listado público: 403 en assets, imágenes, decor y video; 404 en PDF. |

Archivos principales: `research/assets.json`, `research/asset-map.json`, `research/http.json`, `research/links.json`, `research/external-http.json`, `research/directory-http.json` y `research/recovery.json`. Los recursos se mantienen bajo nombres locales sin colisiones en `public/assets/original/`. No se obtuvieron recursos de áreas privadas.

## Estructura y contenido del original

1. **Inicio:** marca, presentación, fechas, sede, cuenta regresiva, trayectoria, video resumen, competencias, artistas y Full Pass.
2. **El Mundial:** origen de la competencia, etapas, categorías, trece sedes nacionales, inscripción y PDF enlazado.
3. **Battle Master:** duelos 1vs1, formato, evaluación, prohibiciones, premios, contacto directo y PDF enlazado.
4. **Talleres:** cuatro días, horarios disponibles, nueve talleres/masterclasses y profesores con Instagram.
5. **Artistas:** invitados internacionales, grilla restante, compañías, conducción y DJs.
6. **Precios:** Full Pass, categorías de El Mundial, entradas a sociales y formas de pago.
7. **Contacto:** Rodrigo Perazolo, canales de Isa y Rodrigo, redes oficiales, cuatro videos, sede y mapa.

No se hallaron otras páginas HTML enlazadas. Toda la navegación comparte las siete rutas originales y llamadas a WhatsApp. Se preservan las URL exactas y los mensajes predefinidos; no existe un checkout público que pueda reconstruirse como pasarela real.

## Identidad visual recuperada

La identidad combina fondos de escenario y luces cálidas, negro/marrón oscuro, vino, dorado y crema. Los colores declarados en la hoja original son `#130F0A` (fondo), `#1C1610` y `#241C13` (variantes), `#C9A24D` (dorado), `#E9CE8E` (dorado claro), `#6E1F2A` (vino), `#8B3240` (vino claro) y `#F3E7D0` (crema). Las fuentes originales son Cinzel para títulos y Montserrat para texto, cargadas externamente por Google Fonts.

Se recuperaron cinco archivos de marca, fondos, un afiche general, retratos individuales, fotografías de compañías/conducción, afiche de DJs, organizador y elementos recortados de decoración. Las hojas de contacto `research/contact-sheet.jpg` y `research/decor-contact-sheet.jpg` permiten revisar el material sin alterar originales.

**Limitación importante de marca:** `logo-comadreja.png` corta la última letra y parte inferior; `logo-congress.png` corta trazos superiores. `logo.png` solo contiene gráficamente «Salsa» y «2026» en posiciones separadas, pese al texto alternativo que lo describe como marca completa. El problema existe en los píxeles fuente y no puede solucionarse con `object-fit`. El afiche general sí conserva una marca legible completa. Los recursos se mantienen y las carencias quedan registradas; no se inventó un nuevo logo.

## Imágenes, encuadres y rendimiento

- El fondo principal `hero-congreso.jpg` mide **585 × 750**, es vertical y pierde definición al cubrir un encabezado ancho. No se encontró una versión mayor enlazada.
- Los retratos de Carine y Rafael y Anthony y Belén miden **552 × 722** y **552 × 747**. Son utilizables en tarjetas contenidas, con limitación para grandes pantallas y alta densidad.
- Karen y Ricardo tiene **1000 × 1499**. Los otros diecisiete retratos individuales de la grilla tienen **746 px de ancho** y alturas entre 988 y 1031 px.
- Las compañías y conductores son fotos grupales horizontales; deben mantener la composición y su relación propia. No corresponde convertirlas en retratos individuales ni recortar rostros para rellenar tarjetas.
- El CSS original fuerza `aspect-ratio: 3/4; object-fit: cover` en todas las tarjetas de artistas. El retrato 1000 × 1499, por ejemplo, pierde parte vertical al llenar 3:4. Las miniaturas de talleres usan círculos de 56 × 56 y también recortan las parejas.
- El afiche general y el de DJs contienen texto dentro de la imagen. No deben sustituir la información HTML accesible y necesitan mostrarse completos si se presentan como documentos visuales.
- El video y su poster son verticales mientras el CSS original les asigna 16:9. Debe reservarse una proporción acorde al recurso real, verificada al cargar sus metadatos.
- Las imágenes no incluyen `width` y `height` en el HTML original. Hay algunas proporciones impuestas por CSS, pero no una reserva sistemática de espacio.
- No se encontró `loading="lazy"` ni conjuntos de imágenes responsive en los HTML recuperados. Varios PNG decorativos pesan de 372 KB a 750 KB; conviene optimizar los seleccionados y evitar cargarlos repetidamente como contenido principal.

El inventario completo de dimensiones, aspectos, pesos y límites está en `INVENTARIO_CONTENIDO.md` y `research/assets.json`; las prioridades de reemplazo están en `IMAGENES_A_REEMPLAZAR.md`. Una mayor dimensión no certifica nitidez: la clasificación automática de calidad es una referencia de tamaño y se complementó con inspección visual.

## Accesibilidad y SEO del original

Se encontraron títulos por página, metadescripciones, `lang="es"`, textos alternativos en retratos y nombres visibles. El menú móvil tiene botón con etiqueta accesible, pero el JavaScript original solo alterna una clase y un carácter: no actualiza `aria-expanded` ni implementa gestión del foco, cierre con Escape o contención explícita del foco. La animación y desplazamiento suave carecen de reglas `prefers-reduced-motion` en el CSS recuperado.

No se encontraron URL canónicas, etiquetas Open Graph, sitemap válido ni marcado estructurado del evento en las páginas originales. La marca del encabezado usa un recurso incompleto. Los fondos no tienen contenido semántico; cualquier información importante impresa en afiches debe quedar disponible también como texto. Los reglamentos se anuncian como descargas aunque sus destinos son errores 404.

Estas son observaciones del código y las fuentes recuperadas, no una declaración de auditoría normativa completa ni una puntuación Lighthouse que no se haya ejecutado.

## Verificación del original en navegador

Las capturas completas de las siete secciones en **375 px y 1440 px** están en `research/screenshots/original/`; los resultados están en `research/original-browser.json`.

- 14 navegaciones: todas HTTP 200.
- Ningún desbordamiento horizontal ni imagen rota detectados en esas dos anchuras durante la captura.
- Ningún error de página registrado por esa prueba.
- Todas las imágenes carecen de dimensiones intrínsecas declaradas en HTML: Inicio 9, El Mundial 4, Battle Master 3, Talleres 12, Artistas 26, Precios 3 y Contacto 5.

No se deduce de estas capturas que el sitio original falle en todos los tamaños: se distinguen defectos observados de riesgos inferidos. Las pruebas del sitio reconstruido, incluidos los seis anchos pedidos, se documentan en los entregables de validación del proyecto nuevo.

## Datos y servicios externos

El HTML repite **26 al 29 de noviembre de 2026**, **Hotel Estilo MB, Almafuerte 40**, **Full Pass $180.000** y WhatsApp de Isa **+54 9 351 206 6467**. Battle Master remite a Rodrigo **+54 9 351 206 6472**. Esos son datos recuperados, no una confirmación independiente de la organización.

Hay conflictos comerciales que requieren respuesta de la organización:

- **Sede:** afiche Domus Auditorium Suites / Jerónimo Luis de Cabrera 2091 frente a HTML Estilo MB / Almafuerte 40.
- **Fecha Final Nacional:** tabla «Dom 1° nov» frente a texto y cronograma 26–27 de noviembre.
- **Premios Battle Master:** Inicio $500.000 para el campeón frente a detalle $250.000 para Master de Salsa y Master de Bachata.
- **Nombres y participantes:** diferencias entre afiche, HTML y nombres de archivos; participantes adicionales impresos sin ficha individual.

El detalle literal, las fuentes y las condiciones ausentes están en `DATOS_A_CONFIRMAR.md`. No se asumieron equivalencias de premios, cambios de sede ni equivalencias de personas. Los precios de entradas no muestran contradicciones entre las páginas consultadas y se preservan con sus fórmulas originales.

Se verificaron por HTTP los enlaces externos a WhatsApp, Instagram y mapa: respondieron 200. Esto solo verifica respuesta web; no comprueba vigencia de teléfonos, identidad de perfiles, entrega de mensajes o disponibilidad futura. No se envió ningún mensaje ni se realizó una compra. Los cuatro YouTube tienen oEmbed 200 y título real; no se usaron videos inventados. Ambos PDF están ausentes.

## Reproducibilidad y límites

`scripts/recover.py` rastrea las páginas conocidas y enlaces internos, archiva los textos, descubre recursos en HTML/CSS, descarga archivos públicos, verifica dimensiones con Pillow y genera inventarios y mapa de archivos. Requiere Python 3 con `requests`, `beautifulsoup4` y `Pillow`; se usó un entorno `.venv` separado de las dependencias web.

El rastreo se limita a contenidos públicos enlazados. No hay acceso al repositorio, CMS, almacenamiento privado ni listados de recursos del servidor. No se puede afirmar que no existan otros archivos no enlazados. Los robots/sitemap fallidos, directorios cerrados y PDF rotos se registraron como tales y no se reemplazaron por documentos simulados. El contenido manualmente transcrito del afiche permanece separado de los datos HTML para mantener trazabilidad.

## Cierre de validación de la reconstrucción

La entrega incluye las siete páginas y fue compilada y validada en navegador. La suite final comprobó 42 combinaciones de página/ancho, 14 análisis Axe y 35 destinos internos, con cero fallos. El MP4 original resultó H.264 High 10/HLG; se preservó y se prepararon copias web compatibles. Resultados, observaciones de CLS y límites están en `VALIDACIONES.md` y `validation/report.json`.
