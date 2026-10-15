# Imágenes a reemplazar o usar con límites

Revisión de píxeles, dimensiones y composición del material público recuperado el **15 de octubre de 2026**. No se generaron fotografías de personas ni se sustituyeron identidades. El inventario completo está en `research/assets.json`, y los originales permanecen en `public/assets/original/`.

## Prioridad alta

| Recurso | Fuente / dimensiones | Problema comprobado | Tratamiento hasta tener original mejor |
| --- | --- | --- | --- |
| `logo-comadreja.png` | [Fuente](https://comadrejaproducciones.com/assets/img/logo-comadreja.png), 1470 × 280 | El archivo ya corta parte de la última «a» y trazos inferiores. No es un problema del contenedor nuevo. | Conservar el archivo; acompañar la marca con texto HTML completo. Solicitar logo vectorial o PNG completo. |
| `logo-congress.png` | [Fuente](https://comadrejaproducciones.com/assets/img/logo-congress.png), 1325 × 274 | Parte superior de letras y remates ya está fuera del lienzo. | Evitar ampliación; conservar trazabilidad y solicitar recurso completo. |
| `logo.png` | [Fuente](https://comadrejaproducciones.com/assets/img/logo.png), 700 × 197 | Solo muestra «Salsa» y «2026» separados; no contiene la marca completa anunciada en su alt. | No usarlo como única identificación. La marca íntegra existe en el afiche como imagen raster con fondo. |
| `hero-congreso.jpg` | [Fuente](https://comadrejaproducciones.com/assets/img/hero-congreso.jpg), 585 × 750 | Fuente vertical, pequeña para cabeceras de escritorio; textura y figuras pierden definición al ampliar. | Presentar como fotografía vertical contenida, sin ocupar 1440/1920 px de ancho. Pedir fotografía de alta resolución, sin inventar otra pareja. |
| `lineup-group.jpg` | [Fuente](https://comadrejaproducciones.com/assets/img/lineup-group.jpg), 1080 × 1920 | Afiche con sede y nombres que contradicen HTML. El texto pequeño no se lee en una tarjeta pequeña. | Conservar como documento visual atribuido y mostrarlo completo. No usar el pie como confirmación de sede; pedir arte actualizado. |

## Retratos internacionales con resolución limitada

| Persona / pareja según HTML | Recurso | Dimensiones | Ancho CSS nativo a 2× | Recomendación |
| --- | --- | --- | --- | --- |
| Carine y Rafael | [artist-carine-rafael.jpg](https://comadrejaproducciones.com/assets/img/artist-carine-rafael.jpg) | 552 × 722 | 276 px | Mantener tarjeta de tamaño contenido; no ampliar artificialmente el bitmap. Solicitar original para usos destacados grandes. |
| Anthony y Belén | [artist-antoni-belen.jpg](https://comadrejaproducciones.com/assets/img/artist-antoni-belen.jpg) | 552 × 747 | 276 px | Mismo límite; conservar nombre HTML hasta confirmar variante del archivo. |

La anchura a 2× es un criterio de nitidez para pantallas de alta densidad, no una prohibición de mostrar un archivo de 552 px a 300 px CSS. Ninguna imagen debería ampliarse por encima de su tamaño nativo para crear una falsa versión de mayor resolución. No se encontraron versiones mayores enlazadas de estos dos retratos en HTML, CSS, JS, los recursos recuperados ni un índice público.

## Recursos utilizables con encuadre cuidadoso

- `artist-karen-ricardo.jpg`: 1000 × 1499, proporción 0,667. Una tarjeta 3:4 con `cover` recorta altura; conservar imagen entera o justificar un encuadre comprobado sin cortar cabezas.
- Los diecisiete retratos restantes de la grilla miden 746 px de ancho y entre 988 y 1031 px de alto. Son adecuados para tarjetas moderadas; no necesitan reemplazo obligatorio. Preservar proporción, dar dimensiones explícitas y evitar el recorte automático de caras/brazos.
- `group-mi-mambo.jpg` (1350 × 910), `group-bailatino.jpg` (1350 × 996) y `group-locutores.jpg` (1350 × 980) son composiciones grupales horizontales. Usar una presentación de grupo que conserve a todos; no recortarlas como tarjetas individuales.
- `dj-lineup.jpg` (1080 × 1345) contiene texto y diseño; conservar el afiche completo y poner los cinco nombres en HTML accesible. No se recuperaron retratos individuales de cada DJ.
- `organizador-rodrigo-perazolo.jpg` (870 × 1146) puede mostrarse como retrato, sin ampliarlo a un encabezado completo.
- `decor-decor-11.jpg` (1973 × 3883) tiene mayor resolución pero no proporciona una atribución nominal inequívoca en el HTML. No se asignó a una ficha de artista por reconocimiento facial.
- Los PNG decorativos tienen entre 358 y 573 px de ancho: son recortes de figuras, algunos de peso elevado. Usarlos con moderación y convertir únicamente las versiones de entrega a formatos eficientes con transparencia, manteniendo los originales.
- `logo-2026.png` (275 × 88) y `logo-salsa.png` (590 × 199) son raster. Usar tamaños contenidos; pedir versión vectorial para aplicaciones grandes.

## Fondos, posters y miniaturas

`stage-bg.jpg` y `mundial-bg-1.jpg` miden 1080 × 1920. Su proporción vertical debe tenerse en cuenta en fondos anchos. El primero es textura de escenario; el segundo incluye marca de El Mundial y no debe recortarse si se usa para mostrar esa marca.

`video-poster.jpg` mide 1280 × 2270 y es vertical. El reproductor debe reservar la proporción real del MP4 y evitar imponer 16:9 sin validación. Las cuatro miniaturas YouTube miden 480 × 360 y algunas incluyen barras negras de origen: sirven como previsualización pequeña, con botón y título HTML. No usarlas como imágenes de cabecera.

## Material que no pudo recuperarse

No se encontraron logos vectoriales, archivos fotográficos originales, imágenes de hotel identificadas como tales ni fotos individuales de todos los conductores/DJs. Tampoco retratos inequívocos de Aquiles Goro, Cato Sosa, Aymará o Jorge López, presentes solo en el afiche. Se preserva texto atribuido sin sustituirlo por fotografías de personas distintas.

No se repararon bordes de logos ni se inventaron áreas faltantes de fotografías. Las versiones optimizadas deben mantener relación de aspecto, no superar dimensiones nativas, conservar rostros y reservar espacio. La revisión final en navegador puede documentarse en las pruebas visuales del proyecto.

## Marca utilizada en la reconstrucción

Para evitar exhibir letras cortadas, la portada usa la marca original completa recuperada del encabezado del afiche: `public/assets/brand/wordmark-from-official-poster.webp` (580 × 165). Es una extracción rectangular de los píxeles existentes, con el fondo original, sin reconstrucción ni generación de letras. Coordenadas y procedencia en `research/brand-recovery.json`. Los PNG incompletos permanecen archivados intactos. El encabezado y pie del sitio usan la denominación completa en HTML accesible; no se presentan como nuevos archivos oficiales de logo. Sigue siendo conveniente solicitar la marca vectorial completa.

## Actualización por pedido del usuario: logo reconstruido

El usuario aportó una miniatura y pidió rehacer el logo respetando tipografía, colores y disposición. La versión final seleccionada está en `output/logo/comadreja-salsa-congress-2026-fondo-negro.png`, 2170 × 725 px. La versión WebP del sitio se usa en portada, encabezado y pie. Es una reconstrucción visual, sin identificación garantizada del nombre exacto de la fuente. Los intentos de fondo transparente introdujeron artefactos y se descartaron; el PNG entregado tiene fondo negro. La extracción fiel del afiche y los archivos fuente siguen intactos. Proceso y prompt: `output/logo/README.md` y `output/logo/PROMPT_FONDO_NEGRO.txt`.
