# Waterman Experience Tour — Estructura y Entendimiento de la Web

> Documento guía del proyecto. Explicado sencillo, para entender qué es cada cosa
> y dónde tocar cuando haya que cambiar algo.

---

## 1. ¿Qué es esta web, en una frase?

Es una **web de una sola marca de turismo de aventura** (Waterman Experience Tour,
de Ricky Waterman / Ricardo Parada) que vende **un tour de 15 días por el Caribe
venezolano**: Choroní → Margarita → Isla de Coche, con deportes acuáticos.

El objetivo de toda la página es uno solo: **que el visitante escriba por WhatsApp
para reservar.** Precio mostrado: **€3.499**.

---

## 2. ¿Cómo está hecha? (lo técnico, sencillo)

Es una web **estática y artesanal**: HTML escrito a mano, un CSS único y poquísimo
JavaScript. **No hay React, ni Next.js, ni build, ni compilación.** Abres un `.html`
en el navegador y funciona.

| Pieza | Qué se usó |
|---|---|
| Páginas | 6 archivos `.html` sueltos |
| Estilos | 1 archivo CSS (`assets/css/styles.css`, ~1.600 líneas) |
| JavaScript | ~40 líneas en línea + 1 archivo de 9 líneas |
| Tipografías | Google Fonts (Unbounded para títulos, Inter para texto) |
| Iconos | FontAwesome 6 por CDN |
| Servidor | Node.js + Express (`server.js`) |
| Despliegue | Docker (`Dockerfile`), pensado para Railway |

**Ventaja:** rapidísima de cargar y de entender.
**Consecuencia:** cambiar el menú o el footer obliga a editarlo en los 6 archivos,
porque no hay plantillas ni componentes.

---

## 3. Mapa de archivos

```
PAGINA WEB WATERMAN RICKY/
│
├── index.html              ← PÁGINA PRINCIPAL (la más grande e importante)
├── ricky.html              ← Historia personal de Ricky
├── tripulacion.html        ← El equipo (Ricky, Pedro, Carlos)
├── destino-choroni.html    ← Ficha del destino 1
├── destino-margarita.html  ← Ficha del destino 2
├── destino-coche.html      ← Ficha del destino 3
│
├── assets/
│   ├── css/styles.css      ← TODO el diseño vive aquí
│   ├── js/hover-swap.js    ← Cambia la foto al pasar el mouse
│   ├── js/admin.js         ← (LEGADO, ya no se usa — ver sección 8)
│   ├── hero-video.mp4      ← Video de fondo del inicio (5,7 MB)
│   ├── logo.png, logo-full-services.png, ricky-portrait.png
│   └── *.webp / *.JPG      ← Fotos del sitio (~34 MB en total)
│
├── uploads/                ← Fotos originales sin optimizar (~52 MB, no se usan en la web)
├── data/cms_db.json        ← (LEGADO, ver sección 8)
│
├── server.js               ← Servidor Express (sirve archivos + API legado)
├── package.json            ← Dependencias: express, cors, multer
├── Dockerfile              ← Para desplegar en Railway
├── nginx.conf              ← (sin uso actual: se despliega con Node, no con nginx)
└── robots.txt              ← Permite Google y bots de IA (ChatGPT, Claude, Perplexity)
```

---

## 4. Las 6 páginas, una por una

### `index.html` — la principal
Es la página que hace el trabajo de venta. Va en este orden, de arriba abajo:

1. **Menú flotante** — transparente arriba; al bajar 60px se vuelve oscuro con blur.
2. **Hero** — video a pantalla completa + "Bienvenidos a Waterman Experience Tour"
   + botón "Conoce a Ricky".
3. **Franja de transición** — el gancho emocional: *"A 8.000 km de la lluvia y el gris…"*
4. **Banner de Ricky** — foto + presentación corta + link a su historia.
5. **Los 3 destinos** — bloques alternados (foto izquierda / foto derecha). Cada
   uno con título, texto, etiquetas y link a su página.
6. **Deportes náuticos** — 4 tarjetas: Kitesurf, Windsurf, Wingfoil, Buceo PADI.
7. **Galería** — 6 fotos en rejilla.
8. **Itinerario** — la ruta: días 1–5 Choroní, 6–11 Margarita, 12–15 Coche.
9. **CTA "arma tu tour a tu medida"** → WhatsApp.
10. **CTA final con precio** — €3.499 → WhatsApp.
11. **Footer** + **botón flotante de WhatsApp** (siempre visible).

### `ricky.html`
Página de confianza. Hero con su foto, una cita, su historia larga en bloques y
una galería de acción. Vende a la persona, no al producto.

### `tripulacion.html`
Presenta al equipo con 3 bloques (uno por persona) y cierra con CTA.

### `destino-choroni.html` / `destino-margarita.html` / `destino-coche.html`
Las tres tienen **exactamente la misma estructura**, solo cambian textos, fotos y
los colores de los degradados:

```
Hero del destino → Historia (3 bloques) → Qué hacer (6 tarjetas)
→ Datos prácticos (3-5 tarjetas) → CTA a WhatsApp
```

Cada una tiene su paleta: Choroní marrón/selva, Margarita verde/dorado, Coche océano.

---

## 5. El diseño (sistema de colores y estilo)

Todo está centralizado arriba de `styles.css` en variables CSS. Si cambias una,
cambia en toda la web:

| Variable | Color | Para qué sirve |
|---|---|---|
| `--ink` | `#122a26` verde muy oscuro | Fondo general del sitio |
| `--ocean` / `--deep` | verdes oscuros | Fondos de secciones |
| `--turq` | `#1fc7b6` turquesa | Acentos, detalles |
| `--coral` | `#ff6b45` coral | **Botones principales** (el color que convierte) |
| `--gold` / `--mango` | dorado / naranja | Frases destacadas |
| `--sand` / `--paper` | cremas | Texto sobre fondo oscuro |

**Identidad visual:** modo oscuro tipo revista de viajes. Fondos verde profundo,
títulos enormes en Unbounded, botones coral, degradados suaves entre secciones,
y el logo repetido de fondo al 4% de opacidad en toda la página.

El CSS está organizado en 24 bloques comentados (`/* ---------- NAV ---------- */`,
`/* ---------- HERO ---------- */`, etc.), así que se encuentra rápido lo que buscas.
Tiene 25 media queries → es responsive, con menú hamburguesa en móvil.

---

## 6. El JavaScript (es muy poco)

Solo hace 3 cosas:

1. **Menú al hacer scroll** — añade la clase `.scrolled` pasados 60px.
2. **Menú móvil** — `toggleMobileMenu()` abre/cierra el panel lateral.
3. **Animación de aparición** — `IntersectionObserver` pone la clase `.in-view` a
   todo elemento con clase `.reveal` cuando entra en pantalla, con 80ms de retraso
   escalonado. Es el efecto de "ir apareciendo" al bajar.

Y aparte, `hover-swap.js`: si una `<img>` tiene atributo `data-hover`, al pasar el
mouse cambia a esa otra foto. Se usa en los 3 bloques de destinos.

---

## 7. El servidor (`server.js`)

Express en el puerto `3000` (o el `PORT` que dé Railway). Hace dos cosas:

**Lo que sí se usa hoy:**
- Sirve los archivos estáticos (`.html`, CSS, imágenes).
- Un `app.get('*')` final: si el archivo pedido existe lo manda, si no, manda
  `index.html`.

**Lo que ya no se usa (API del CMS antiguo):**
`/api/cms`, `/api/backups`, `/api/upload`, `/api/status` — ver sección siguiente.

---

## 8. ⚠️ Lo importante de saber: hay código legado

Esto es lo que más confunde al entrar al proyecto por primera vez, así que conviene
tenerlo claro:

**Existió una versión anterior de la web (v2.0) con un panel de administración
editable (CMS).** Esa versión era sobre **Los Roques**, no sobre Choroní/Margarita/Coche.
Esa versión ya no existe, pero **sus archivos siguen en el repositorio**:

| Archivo | Estado |
|---|---|
| `assets/js/admin.js` (1.423 líneas) | **Huérfano.** El `admin.html` que lo cargaba ya no existe. |
| `data/cms_db.json` | Contenido de la web vieja (Los Roques, Caracas, Canaima, estadísticas…). Ninguna página lo lee. |
| API `/api/cms`, `/api/upload`, `/api/backups` en `server.js` | Vivas en el servidor, pero **ningún `.html` las llama**. |
| `nginx.conf` | Config de nginx, pero el despliegue usa Node. |
| `uploads/` (52 MB) | Fotos originales. Las que se usan están optimizadas en `assets/`. |

**Conclusión práctica:** las 6 páginas HTML actuales tienen **el contenido escrito
a mano dentro del HTML**. Para cambiar un texto, se edita el HTML. No hay panel.

> Dato de seguridad a tener en cuenta: `admin.js` tiene la contraseña escrita en el
> código (`ADMIN_PASS = 'waterman2026'`) y las APIs de `server.js` **no piden
> autenticación**. Como el panel ya no existe no se está usando, pero cualquiera que
> conozca `/api/cms` podría sobrescribir `cms_db.json` en el servidor.

---

## 9. Detalles pendientes (encontrados al revisar)

| # | Qué pasa | Dónde |
|---|---|---|
| 1 | **El WhatsApp es un número de relleno:** `584120000000` aparece en los 6 archivos. Hay que reemplazarlo por el real. | todos los `.html` |
| 2 | `robots.txt` apunta a `https://rickywaterman.com/sitemap.xml`, pero el schema.org dice `watermanexperiencetour.com` y **el `sitemap.xml` no existe**. | `robots.txt`, `index.html` |
| 3 | **Imágenes muy pesadas:** `choroni-panorama.webp` pesa **6,2 MB** y se usa dos veces en el inicio. Hay varias de 1–2 MB. Conviene redimensionarlas. | `assets/` |
| 4 | El hero tiene `<video autoplay>` de 5,7 MB sin imagen de respaldo (`poster`), así que en móvil con mala conexión se ve negro al principio. | `index.html` |
| 5 | El menú y el footer están duplicados en los 6 archivos. Cualquier cambio hay que repetirlo 6 veces. | todos los `.html` |
| 6 | El teléfono del schema.org es también el número de relleno. | `index.html` |

---

## 10. Cómo trabajar en el proyecto

**Levantar en local:**
```bash
npm install
npm start
```
Luego abrir `http://localhost:3000`.

También funciona abriendo `index.html` directamente en el navegador (al ser
estática), aunque sin servidor.

**Guía rápida de "dónde toco si quiero…":**

| Quiero cambiar… | Voy a… |
|---|---|
| Un texto, título o precio | El `.html` de esa página |
| Colores, tamaños, espaciados | `assets/css/styles.css`, bloque correspondiente |
| La paleta completa de la marca | Las variables `:root` arriba de `styles.css` |
| El número de WhatsApp | Buscar `584120000000` en los 6 `.html` |
| El menú o el footer | Los 6 `.html` (están duplicados) |
| Añadir un destino nuevo | Copiar un `destino-*.html` y añadir su bloque en `index.html` |
| Que algo aparezca al hacer scroll | Añadirle `class="reveal"` |
| Que una foto cambie al pasar el mouse | Añadirle `data-hover="assets/otra.webp"` |
