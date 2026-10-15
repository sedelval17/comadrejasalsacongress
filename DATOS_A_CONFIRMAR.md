# Datos a confirmar con la organización

Revisión de las fuentes públicas: **15 de octubre de 2026**. Los textos originales están archivados en `research/pages/`; las imágenes en `public/assets/original/`. Este documento conserva las versiones incompatibles sin decidir cuál es correcta. Una respuesta HTTP exitosa no confirma la vigencia comercial de un dato.

## 1. Sede y domicilio — prioridad crítica

| Fuente | Información publicada |
| --- | --- |
| [Inicio](https://comadrejaproducciones.com/), [Contacto](https://comadrejaproducciones.com/contacto.html), encabezados y pie de las páginas | Hotel Estilo MB, Almafuerte 40, Villa Carlos Paz, Córdoba. El mapa original apunta a esa dirección. |
| [Afiche de la grilla](https://comadrejaproducciones.com/assets/img/lineup-group.jpg), enlazado en Inicio y Talleres | DOMUS AUDITORIUM SUITES, Jerónimo Luis de Cabrera 2091, Villa Carlos Paz, Córdoba. |

Confirmar hotel y domicilio definitivos. No trasladar el mapa silenciosamente ni presentar ambos hoteles como sedes confirmadas. La transcripción del afiche está en `research/graphic-content.json`. El afiche dice 26 al 29 de noviembre de 2026, de modo que su conflicto de sede no puede descartarse como una imagen de otra edición.

## 2. Fecha de la Final Nacional de El Mundial — prioridad crítica

| Fuente | Información publicada |
| --- | --- |
| Párrafo de sedes en [El Mundial](https://comadrejaproducciones.com/el-mundial.html) | La gran final se disputa en Córdoba el 26 y 27 de noviembre. |
| [Cronograma](https://comadrejaproducciones.com/talleres.html) | Jueves 26 y viernes 27 de noviembre: Final Nacional El Mundial, partes 1 y 2. |
| Última fila de la tabla de sedes en [El Mundial](https://comadrejaproducciones.com/el-mundial.html) | «Dom 1° nov — Córdoba · Final Nacional». |

Confirmar si el 1 de noviembre corresponde a una eliminatoria distinta o es un dato desactualizado. El sitio no lo aclara. Mantener la discrepancia visible al consultar esa fila; no reasignar una actividad inventada al 1 de noviembre.

## 3. Premio de Battle Master — prioridad crítica

| Fuente | Información publicada |
| --- | --- |
| Tarjeta Battle Master en [Inicio](https://comadrejaproducciones.com/) | «$500.000 en efectivo más cinturón para el campeón». |
| Sección Premio en [Battle Master](https://comadrejaproducciones.com/battle-master.html) | «$250.000 + cinturón Battle Master, para el Master de Salsa y el Master de Bachata». |

Confirmar monto por ganador y monto total. Es posible que $500.000 sea el total de dos premios de $250.000, pero esa equivalencia **no está explicitada** y no se asume como confirmación.

## 4. Reglamentos inaccesibles

- [Reglamento El Mundial 2026](https://comadrejaproducciones.com/assets/pdf/reglamento-el-mundial-2026.pdf): HTTP 404.
- [Reglamento Battle Master](https://comadrejaproducciones.com/assets/pdf/reglamento-battle-master.pdf): HTTP 404.

Los destinos devuelven HTML de error, no archivos PDF. Se preservaron las URL y el resultado HTTP en `research/assets.json` y `research/http.json`; no se fabricaron reglamentos. Faltan los PDF oficiales vigentes para publicar descargas funcionales. Los resúmenes HTML no sustituyen reglas completas, tiempos, puntuaciones ni penalizaciones.

## 5. Nombres distintos entre HTML, archivos y afiche

| HTML de artistas / talleres | Otra versión encontrada | Acción |
| --- | --- | --- |
| Santiago y Bautista | Archivo `artist-santiago-davor.jpg`; afiche «Santiago & Davor» | Confirmar integrante y nombre de la pareja. |
| Iván y Silvana | Afiche «Iván & Vichy» | Confirmar si son la misma pareja o participantes distintos. |
| Isidora y Cristian; taller con Cristian Paredes e Isidora Jacob | Afiche «Cristian & Isadora» | Confirmar grafía. |
| Angel y Carly; taller con Ángel Rojas y Carla Martínez | Afiche «Ángel & Carla» | Confirmar nombre artístico; no reemplazar automáticamente. |
| Anthony y Belén | Archivo `artist-antoni-belen.jpg`; Instagram `antoniybelenoficial` | Conservar nombre visible de la página hasta aclaración. |
| DJ Matias Casco | Afiche «DJ Mati Casco» | Confirmar nombre público preferido. |

Todos los nombres HTML se conservan literalmente en `research/artists.json`. No se identificó ni se renombró a una persona a partir de su rostro.

## 6. Participantes y actividades presentes solo en el afiche

El afiche incluye **Aquiles Goro, Cato Sosa, Aymará, Jorge López**, la banda **Ramón Vacilón** y **stands de ventas**. Estos datos no aparecen en los textos HTML de la grilla. No se recuperaron retratos individuales inequívocos de esos cuatro artistas. Confirmar su participación y el cronograma antes de tratarlos como programación vigente. Los nombres y la mención musical permanecen archivados y atribuibles a su fuente, sin fotos sustitutas.

## 7. Horarios y condiciones que la fuente no define

- Los talleres del sábado y domingo y la final Battle Master no tienen horarios publicados. El guion «—» del original indica ausencia de horario; no se asignó una hora estimada.
- La social del viernes figura a las 00:00 en la columna del viernes. Confirmar la interpretación nocturna: cronológicamente correspondería a la madrugada del sábado si sucede tras el cierre de las 23:00.
- La Mega Stars Class anuncia ocho profesores pero no enumera cuáles son; no deducirlos de la grilla general.
- No se publica precio independiente del Battle Master; solo su inclusión en el Full Pass y contacto con Rodrigo.
- No se publica link permanente de Mercado Pago, CBU, alias bancario, cuotas, recargos, política de devolución ni condiciones de alojamiento. La fuente indica coordinación por WhatsApp; no se crearon condiciones nuevas.
- La página Precios llama a Isa «único contacto oficial» para Full Pass e inscripciones, mientras Battle Master y Contacto remiten su inscripción a Rodrigo. La reconstrucción debe conservar los canales por actividad sin ampliar la exclusividad a actividades distintas.

## 8. Recursos gráficos originales

`logo-comadreja.png` y `logo-congress.png` ya presentan letras cortadas en los archivos públicos; `logo.png` no contiene la marca completa. Se necesitan originales completos, preferentemente vectoriales. El detalle y las fotos cuya resolución limita su ampliación están en `IMAGENES_A_REEMPLAZAR.md`.

## Decisión del usuario durante la reconstrucción

El 15 de octubre de 2026 el usuario indicó conservar por ahora las referencias contradictorias de sede, fecha y premio, y confirmarlas más adelante. No se resolvió ninguna por suposición. El nuevo sitio presenta aclaraciones visibles y contacto con la organización; la ubicación general se limita a Villa Carlos Paz.
