# Comadreja Salsa Congress 2026

Reconstrucción estática del sitio público de [Comadreja Producciones](https://comadrejaproducciones.com/), realizada desde cero con **Astro 7, TypeScript y CSS**. Conserva las siete secciones, las rutas `.html`, los contactos y la información recuperada. No requiere backend ni base de datos.

## Ejecutar

Requisito: **Node.js 22.12 o superior** (versión par compatible; `.nvmrc` selecciona 22). El Node 18 que venía instalado en este entorno no es compatible con Astro 7.

```bash
# Si usás nvm:
nvm install
nvm use

npm ci
npm run dev
```

Abrí **http://localhost:4321**. El servidor acepta conexiones de la red local; para limitarlo a la máquina, cambiá `--host 0.0.0.0` en los scripts.

Alternativa sin nvm, usando un Node 22 temporal mediante npm:

```bash
npm exec --package=node@22 -- npm ci
npm exec --package=node@22 -- npm run dev
```

En esta sesión se instaló una herramienta Node 22 aislada en `/tmp/comadreja-toolchain`. Mientras exista, también podés ejecutar:

```bash
PATH=/tmp/comadreja-toolchain/node_modules/.bin:$PATH npm run dev
```

Ese directorio temporal no forma parte del proyecto ni es un requisito para desplegarlo.

## Compilar y revisar producción

```bash
npm run check
npm run build
npm run preview -- --port 4321
```

La salida completa está en `dist/`. El sitio entrega HTML estático; JavaScript solo controla el cierre del menú, la cuenta regresiva y los reproductores de YouTube bajo demanda. El menú, la navegación, las reservas y los enlaces de video siguen funcionando sin JavaScript.

## Páginas

| Ruta | Contenido |
| --- | --- |
| `/` y `/index.html` | Evento, artistas destacados, agenda, video, Full Pass y aclaración de sede |
| `/el-mundial.html` | Etapas, categorías, sedes, inscripción y acceso para solicitar reglamento |
| `/battle-master.html` | Formato 1vs1, evaluación, restricciones, premios publicados e inscripción |
| `/talleres.html` | Cronograma de cuatro días, nueve talleres/actividades formativas y social |
| `/artistas.html` | Grilla completa, compañías, conductores, DJs y afiche con observaciones |
| `/precios.html` | Full Pass, inscripción, entradas nocturnas y medios de pago |
| `/contacto.html` | Contactos, organizador, redes, cuatro videos y mapas de las dos sedes publicadas |
| `/404.html` | Página de error de navegación |
| `/sitemap.xml`, `/robots.txt` | Indexación y descubrimiento de rutas |

No hay botones de pago ficticios: las reservas van a los WhatsApp originales, con sus mensajes originales. Mercado Pago se coordina por ese canal, igual que en la fuente.

## Editar contenido

| Archivo | Responsabilidad |
| --- | --- |
| `src/data/site.ts` | Evento, fechas, precios, enlaces, mensajes, redes, videos y discrepancias |
| `src/data/program.ts` | Cronograma, talleres, profesores, categorías, etapas y sedes nacionales |
| `src/data/artists.json` | 31 registros de artistas/parejas, compañías, conducción y DJs, con procedencia |
| `src/data/images.json` | Manifiesto generado de tamaños y versiones AVIF/WebP |
| `src/components/` | Imágenes, tarjetas, botones, avisos, videos, encabezados y Full Pass |
| `src/layouts/Layout.astro` | Navegación compartida, metadatos y pie de página |
| `src/styles/global.css` | Paleta, tipografía, composición, responsive, impresión y movimiento reducido |
| `public/assets/original/` | Recursos originales, intactos, recuperados de las fuentes públicas |
| `public/assets/images/` | Imágenes responsivas optimizadas, sin ampliación ni recorte de personas |
| `public/assets/brand/` | Marca original completa extraída del afiche, con trazabilidad |
| `public/documents/` | Ubicación prevista para reglamentos oficiales y explicación de los faltantes |

Los datos conflictivos se conservan con atribución, no se resuelven automáticamente. Al confirmar una sede, fecha, nombre o premio, actualizar los datos y sus avisos, las menciones correspondientes en páginas y metadatos, y `DATOS_A_CONFIRMAR.md`. Verificar especialmente el afiche antes de sustituirlo.

## Imágenes y fuentes

```bash
npm run images
```

Regenera `src/data/images.json` y derivados locales desde los originales. Sharp produce AVIF y WebP en anchos de hasta 320, 640, 960 y 1280 px, siempre limitados al ancho nativo. Las tarjetas contienen las imágenes completas; las grupales no se recortan como retratos individuales.

El video original usa H.264 High 10 de 10 bits/HLG, que no todos los navegadores reproducen. Se entregan copias SDR compatibles en MP4 (H.264 Main de 8 bits) y WebM (VP9/Opus), manteniendo el original intacto. Para regenerarlas, instalar `scripts/requirements-research.txt` en un entorno Python y ejecutar `python scripts/optimize-video.py`.

Los PNG públicos de marca tienen letras cortadas. La primera reconstrucción recuperó la marca completa del afiche; esa extracción queda preservada con sus coordenadas en `research/brand-recovery.json`. Después, el usuario pidió rehacer el logo a partir de su referencia: la portada, el encabezado y el pie usan ahora una reconstrucción visual en alta resolución. El PNG final, el prompt y los límites del proceso están en `output/logo/`. No se generaron ni modificaron retratos de personas.

Manrope y Oswald se alojan localmente en sus subconjuntos latinos WOFF2, con precarga y `font-display: swap`. Licencias OFL en los paquetes `@fontsource-variable/*/LICENSE`. El material del evento conserva la titularidad original; no se atribuye una licencia libre a fotografías ni marcas.

## Validaciones

Con la vista de producción activa en otra terminal:

```bash
# Instalar navegador, si no hay uno disponible:
npx playwright install chromium

npm test
```

`scripts/browser.mjs` acepta `CHROMIUM_PATH` o usa Chromium de Playwright. La prueba recorre siete páginas a **320, 375, 768, 1024, 1440 y 1920 px**, captura cada combinación y revisa dimensiones, desbordamientos, errores, enlaces y metadatos. También prueba teclado, menú móvil, navegación por días, las 31 fichas, reproducción real del video local, activación de los cuatro YouTube, mapas y funcionamiento sin JavaScript. Axe analiza las siete páginas en móvil y escritorio.

Resultados: `validation/report.json`, `validation/links.json`, `validation/screenshots/` y **[VALIDACIONES.md](VALIDACIONES.md)**. Las métricas del navegador son mediciones locales de laboratorio, no estadísticas de usuarios reales.

```bash
# Repetir únicamente la captura del sitio original:
npm run test:original
```

La captura original depende de que el sitio público siga disponible. La recuperación se puede repetir con `scripts/recover.py`, cuyas dependencias de investigación están en `scripts/requirements-research.txt`. Repetirla actualiza los archivos de evidencia; conviene conservar un respaldo antes de auditar una edición distinta.

## Publicar

Este trabajo entrega el proyecto local y la compilación; **no modifica el sitio actualmente publicado**.

1. Ejecutar `npm ci`, `npm run check` y `npm run build` con Node 22.12 o superior.
2. Subir **el contenido de `dist/`** a la raíz del hosting estático (Apache, Nginx, Netlify, Cloudflare Pages, etc.). No subir `node_modules`, `research` ni el código fuente como raíz pública.
3. Conservar el servido de archivos `.html`, `assets/` y `_astro/`. No configurar una reescritura SPA de todas las rutas hacia `index.html`.
4. Configurar `404.html` como página de error del hosting. El proyecto no necesita funciones ni servidor Node en producción.
5. Si cambia el dominio, actualizar `site` en `astro.config.mjs` y la configuración de `src/pages/robots.txt.ts`, y volver a compilar. Las canonical, Open Graph y el sitemap se generan con el dominio configurado.
6. Activar compresión y caché larga para `/_astro/` (nombres con hash). Para `/assets/`, usar una caché moderada o cambiar el nombre al reemplazar una imagen: esos nombres no incluyen hash.

Para un hosting que haga su propio build: comando `npm run build`, directorio de salida `dist`, Node 22. El proyecto soporta un subdirectorio mediante `COMADREJA_BASE_PATH`; los enlaces y recursos locales utilizan esa base. La revisión de GitHub Pages está preparada específicamente para la cuenta personal `sedelval17` en `PUBLICACION_GITHUB.md`.

## Documentación y pendientes

- **[AUDITORIA.md](AUDITORIA.md):** sitio original, identidad, recursos y hallazgos comprobados.
- **[INVENTARIO_CONTENIDO.md](INVENTARIO_CONTENIDO.md):** contenido recuperado y páginas de origen.
- **[IMAGENES_A_REEMPLAZAR.md](IMAGENES_A_REEMPLAZAR.md):** calidad, límites y originales necesarios.
- **[DATOS_A_CONFIRMAR.md](DATOS_A_CONFIRMAR.md):** sede, fechas, premios, variantes de nombres y documentos faltantes.
- **[MEJORAS.md](MEJORAS.md):** decisiones de diseño, funcionamiento y arquitectura.
- **[VALIDACIONES.md](VALIDACIONES.md):** pruebas realmente ejecutadas y sus límites.

El usuario pidió mantener por ahora las diferencias de sede, fecha y premio hasta confirmarlas. Ambos reglamentos originales devolvieron HTTP 404 y no se recuperaron versiones alternativas: se ofrecen contactos reales para solicitarlos. No se inventaron reglas, horarios, precios independientes, política de devolución, fotos de hotel ni retratos de artistas faltantes.

## Revisión temporal en GitHub Pages

Ver **[PUBLICACION_GITHUB.md](PUBLICACION_GITHUB.md)**. Cuenta autorizada: **sedelval17**. El workflow de `.github/workflows/deploy.yml` solo despliega para ese propietario y usa la ruta `/comadrejasalsacongress/`. Las credenciales se mantienen separadas en `~/.config/gh-comadreja-personal`; no se modifica la configuración de otras cuentas. La revisión se compila con `COMADREJA_PREVIEW=1` para solicitar no indexación.
