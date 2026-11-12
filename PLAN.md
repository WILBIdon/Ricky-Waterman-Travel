# Plan de trabajo — Waterman Experience Tour

**Actualizado:** 2026-11-11 · (después de recibir el material del cliente: 146 archivos + `Ajuste Web RICKY.docx`)

Leyenda: ✅ hecho · 🔨 en curso · ⬜ pendiente · 🧍 necesita algo del cliente

---

## 1. Contenido nuevo (sale del material del cliente)

| # | Tarea | Estado | Detalle |
|---|---|---|---|
| 1.1 | **Itinerario real de 15 días** en la home | ✅ | Tarjetas corregidas (Choroní 1–4 · Margarita 5–9 · Coche 10–15) con desplegable "Ver día a día" por etapa. Nota sobre posible noche en Caracas |
| 1.2 | **Sección "Canaima — Próximamente"** | 🔨 | Fotos ya elegidas de las 48 del Salto Ángel. Falta: convertir a WebP, montar la tarjeta en `#destinos` con texto de expectativa, sin precio |
| 1.3 | **Foto real de Ricky** (retrato) | ✅ | `ricky-waterman.webp` reemplazó a la imagen generada por IA en hero, banner y og:image |
| 1.4 | **Segunda foto falsa de Ricky** (`ricky-surfing-youth.png`, texto en espejo en la tabla) | ⬜ | Reemplazar con `material-cliente/extraido/Fotos y videos Los Roques/richy warterman.jpg` (foto real) |
| 1.5 | **Bio de Ricky en primera persona** | ✅ | Ya estaba montada en `ricky.html` con el mismo texto del docx |
| 1.6 | **Repartir fotos reales por destinos** | ⬜ | Choroní (33), Los Roques (37), Coche (15), Transporte (3). Convertir HEIC→WebP, elegir las mejores por página, reemplazar las genéricas/IA |
| 1.7 | **Ilustraciones (lettering de cada destino)** | ⬜ | 8 PNG en `material-cliente/extraido/Ilustraciones/`. Decidir si se usan como títulos gráficos en las páginas de destino |
| 1.8 | **Videos del cliente** | ⬜ | Posada Coche (18 MB), Los Roques, actividades Coche. Pesan mucho para la web: comprimir o subir a un host de video. Decidir dónde van |
| 1.9 | **Caracas como etapa** | 🧍 | Nota ya puesta en el itinerario. El tratamiento completo (sección propia, fotos) espera a que el cliente defina si la noche es a la llegada o al regreso |

## 2. Decisiones del cliente (del docx "Ajustes")

| # | Tarea | Estado | Detalle |
|---|---|---|---|
| 2.1 | **GDPR / WhatsApp en la UE** | 🧍 | El cliente duda si el botón de WhatsApp es viable en Europa; alternativa: formulario de correo + casilla de consentimiento. Es decisión legal/comercial — no tocar hasta que decida |
| 2.2 | **Fondo arena → ¿turquesa?** | 🧍 | El docx duda del color arena de fondo. Ya pasamos la marca a azules (opción A). Enseñarle el sitio azul antes de tocar también el arena |
| 2.3 | **Precios** | 🧍 | El docx trae cotizaciones (15d ≈ US$4.390 · Choroní 7n US$2.800 · Margarita US$2.890 · Coche US$3.090) pero **él mismo dice no publicarlas como garantizadas**. La web sigue con "Pide tu presupuesto". También faltan precios reales de las camisas |
| 2.4 | **Paleta definitiva** | 🧍 | Aplicada la A (Azul océano). Si el cliente prefiere B (más clara) o C (más profunda), es re-correr el script: https://claude.ai/code/artifact/56094589-9801-4b7f-bc9b-769e6b9498c0 |
| 2.5 | **Foto real de la Casa Ricky Waterman** (Choroní) | 🧍 | Sigue usando una foto de playa como relleno. Revisar si entre las 33 fotos de Choroní hay alguna de la casa; si no, pedirla |

## 3. Fallos conocidos de la web

| # | Tarea | Estado | Detalle |
|---|---|---|---|
| 3.1 | **Logo cortado en móvil** | ⬜ | 160px fijos sin regla responsive: el wordmark se desborda hasta 493px en una pantalla de 375 y la hamburguesa queda encima del texto. Afecta a las 8 páginas. Arreglo: media query (~10 líneas) que baje el logo a ~64px y deje partir el texto. El nav pasaría de 196px a ~80px de alto |
| 3.2 | **Imágenes pesadas** | ⬜ | `choroni-panorama.webp` 6,2 MB cargada 2 veces en la home; `choroni-paraiso.webp` 4032px para un hueco de 420. Redimensionar (ideal: sustituir por fotos reales del cliente, tarea 1.6) |
| 3.3 | **Video del hero sin `poster`** | ⬜ | 5,7 MB; en móvil con mala conexión se ve negro. Añadir imagen de respaldo |
| 3.4 | **`sitemap.xml` no existe** y `robots.txt` apunta a `rickywaterman.com` mientras el schema.org dice `watermanexperiencetour.com` | 🧍 | Crear sitemap con las 8 páginas + unificar dominio. **Necesito saber cuál es el dominio real** |
| 3.5 | **CMS legado** | ⬜ | `admin.js` huérfano y APIs sin autenticación en `server.js`. Decidir: borrar el CMS o protegerlo. Mientras, no se sirve a visitantes |

## 4. Limpieza

| # | Tarea | Estado |
|---|---|---|
| 4.1 | Borrar `assets/ricky-portrait.png` (656 KB, IA, ya sin referencias) — tras confirmar | ⬜ |
| 4.2 | Borrar el zip duplicado de Choroní en `~/Downloads` (376 MB) | ⬜ |
| 4.3 | Al terminar 1.6: borrar las imágenes IA que queden sin uso en `assets/` | ⬜ |

---

## Orden sugerido

1. **1.2 Canaima** (en curso) → 2. **1.4 foto surf real** → 3. **3.1 logo móvil** → 4. **1.6 fotos por destino** (incluye 3.2) → 5. **3.3 poster del hero** → 6. **3.4 sitemap** (cuando haya dominio) → el resto según respuestas del cliente.

## Regla fija

El material crudo vive en `material-cliente/` (ignorado por git — GitHub rechaza archivos >100 MB). A la web solo entran copias optimizadas en `assets/` (WebP, tamaño justo). Antes de publicar cambios de CSS: subir el `?v=` del cache-buster.
