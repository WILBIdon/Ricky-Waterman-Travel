# Plan de trabajo — Waterman Experience Tour

**Actualizado:** 2026-11-12 · (itinerario real, Canaima y fotos reales de Ricky ya publicados)

Leyenda: ✅ hecho · 🔨 en curso · ⬜ pendiente · 🧍 necesita algo del cliente

---

## 1. Contenido nuevo (sale del material del cliente)

| # | Tarea | Estado | Detalle |
|---|---|---|---|
| 1.1 | **Itinerario real de 15 días** en la home | ✅ | Tarjetas corregidas (Choroní 1–4 · Margarita 5–9 · Coche 10–15) con desplegable "Ver día a día" por etapa. Nota sobre posible noche en Caracas |
| 1.2 | **Sección "Canaima — Próximamente"** | ✅ | En `#destinos` con 2 fotos reales del Salto Ángel (hover dorado), badge, sin precio, CTA "Avísame cuando abra". Enlace en menú y footer de las 8 páginas |
| 1.3 | **Foto real de Ricky** (retrato) | ✅ | `ricky-waterman.webp` reemplazó a la imagen generada por IA en hero, banner y og:image |
| 1.4 | **Segunda foto falsa de Ricky** (`ricky-surfing-youth.png`, texto en espejo en la tabla) | ✅ | Reemplazada por `ricky-surf-caribe.webp` (Ricky surfeando de verdad, fotos de César). También `venezuela-paradise-aerial.png` (IA) → `paraiso-venezuela.webp` (atardecer real en Los Roques). Queda una IA menor: `caribbean-sand-feet.png` (pies en la arena, genérica). ⚠️ Las fotos de César vienen comprimidas por WhatsApp (~500px): pedir los originales |
| 1.5 | **Bio de Ricky en primera persona** | ✅ | Ya estaba montada en `ricky.html` con el mismo texto del docx |
| 1.6 | **Fotos reales en la home (#destinos)** | ✅ | Choroní y Los Roques con fotos reales niveladas; Coche de-torcida −4°. 10,7 MB → 0,72 MB. **Faltan las páginas de destino** (`destino-*.html`), que siguen con las viejas |
| 1.6b | **Margarita no tiene ni una foto real** | 🧍 | No hay carpeta de Margarita en el material: las 4 carpetas son Choroní, Los Roques, Coche y Canaima. Su foto actual es de banco de imágenes. **Pedir fotos de Margarita** (Playa El Agua, Parguito, Juan Griego, El Yaque) |
| 1.6c | **Coche tiene solo 5 fotos y flojas** | 🧍 | Una es un folleto. La principal de Coche es en realidad una foto del viaje a Los Roques (kitesurf). Contenido correcto, procedencia no. **Pedir fotos de Coche** |
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
| 3.1 | **Logo cortado en móvil** | ✅ | Media query por tramos. A 375px: nav de **196px → 84px**, logo 160→60px, wordmark oculto (el logo ya lo dice), hamburguesa despejada. A 768px: logo 72px, wordmark cabe sin solape. Escritorio sin tocar (160px/196px, verificado a 1280px). `.shop-hero` ajustado, que compensaba el nav gigante |
| 3.2 | **Imágenes pesadas** | ✅ | Resuelto al poner las fotos reales: home 10,7→0,72 MB, Choroní 9,4→1,38 MB, Coche 5,9→0,64 MB. Las panorámicas de 11.952 px ya no se usan |
| 3.3 | **Video del hero sin `poster`** | ✅ | `hero-poster.webp` (61 KB, primer fotograma del propio video). Además **el móvil ya no descarga los 5,7 MB**: el video solo se carga en ≥860px, y nunca con ahorro de datos, 2G o `prefers-reduced-motion`. Verificado: 0 MP4 en móvil, reproduce en escritorio |
| 3.4 | **`sitemap.xml` no existe** y `robots.txt` apunta a `rickywaterman.com` mientras el schema.org dice `watermanexperiencetour.com` | 🧍 | Crear sitemap con las 8 páginas + unificar dominio. **Necesito saber cuál es el dominio real** |
| 3.5 | **CMS legado — era explotable en producción** | ✅ | Verificado atacándolo en local: cualquiera podía **sobrescribir la base de contenidos** y **subir un `.html` que se ejecutaba** desde el dominio del sitio (XSS almacenado), con un límite de 500 MB por archivo. Además `server.js`, `Dockerfile`, `package.json`, `data/cms_db.json` y las notas internas eran **descargables**. Corregido: API apagada salvo que exista `ADMIN_TOKEN`, allowlist de archivos públicos, subidas limitadas a 25 MB con la extensión derivada del tipo MIME. `admin.js` (1.423 líneas, huérfano) eliminado |

## 4. Limpieza

| # | Tarea | Estado |
|---|---|---|
| 4.1 | Borrar `assets/ricky-portrait.png` (656 KB, IA, ya sin referencias) — tras confirmar | ⬜ |
| 4.2 | Borrar el zip duplicado de Choroní en `~/Downloads` (376 MB) | ⬜ |
| 4.3 | Al terminar 1.6: borrar las imágenes IA que queden sin uso en `assets/` | ⬜ |

---

## Orden sugerido

~~1.2 Canaima~~ → ~~1.4 foto surf real~~ → ~~3.1 logo móvil~~ → **siguiente: 1.6 fotos por destino** (incluye 3.2 imágenes pesadas) → 3.3 poster del hero → 3.4 sitemap (cuando haya dominio) → el resto según respuestas del cliente.

## Regla fija

El material crudo vive en `material-cliente/` (ignorado por git — GitHub rechaza archivos >100 MB). A la web solo entran copias optimizadas en `assets/` (WebP, tamaño justo). Antes de publicar cambios de CSS: subir el `?v=` del cache-buster.
