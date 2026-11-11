# Avances — 4 tareas nuevas (Los Roques, Surf, Casa, Tienda)

**Última actualización:** 2026-11-10
**Estado:** ✅ **Las 4 tareas están completas, verificadas en navegador y subidas.**

---

## ✅ Tarea 1 — Los Roques, experiencia de 10 días

**Archivo nuevo: `destino-roques.html`**

Construido con el **contenido auténtico del CMS legado** (`data/cms_db.json`), que era
de la versión vieja del sitio sobre Los Roques. No se inventó nada: Cayo Francisquí,
Cayo de Agua, Gran Roque, downwinders, vuelo chárter de 40 min, grupos de 10-15,
posadas B&B, Reef-Safe / Zero Plastic.

- Hero con la ruta **Europa → Los Roques → Europa**
- Franja de datos: 10 días · Todo el año · 18-25 kts · 10-15 personas
- La ruta en 3 bloques (ida / 10 días en el archipiélago / vuelta)
- Bloque de temporada, 6 tarjetas de "qué te espera", 5 de deportes, galería y CTA
- Añadido también como **4º destino en la home** (`#destinos`), con tema propio en dorado

## ✅ Tarea 2 — Deporte Surf

Añadido como 5ª tarjeta en la sección `#deportes` de `index.html`.

La grilla estaba fijada a `repeat(4, 1fr)` y los colores de icono acababan en
`nth-child(4)`, así que un 5º elemento la rompía. Arreglado:
`repeat(auto-fit, minmax(195px, 1fr))`, `max-width` a 1180px, color para el 5º icono
y tarjetas más compactas. **Verificado: los 5 deportes caben en una sola fila a 1280px.**

## ✅ Tarea 3 — Casa Ricky Waterman Experience

Nueva sección en `destino-choroni.html`, entre "Qué te espera" y "Deportes".
Es el **alojamiento base del tour**: foto con badge, texto, 6 características
(habitaciones, comidas, cercanía a la playa, guardado de equipos, terraza,
punto de salida) y CTA propio a WhatsApp.

## ✅ Tarea 4 — Micro tienda de camisas

- **`tienda.html`** — página completa de la tienda
- **Sección de muestra al final de `index.html`**, justo antes del footer (como pediste)
- **`assets/js/shop.js`** — lógica compartida por ambas

4 camisas (Waterman Classic, Kitesurf Caribe, Los Roques 18–25 kts, Choroní Tambores)
con selector de talla y color. Al pulsar "Pedir por WhatsApp" se abre un chat con
modelo, talla, color y precio ya escritos. Sin pasarela de pago.

Los mockups son **SVG inline** (no hay fotos de camisas en `assets/`), y el estampado
**invierte su color automáticamente** según la luminancia de la camisa elegida, para
que siempre contraste.

---

## Pendientes (necesitan datos tuyos)

| # | Qué falta | Dónde |
|---|---|---|
| 1 | **Precio de Los Roques.** No se inventó: el CTA dice "Consulta tu fecha" + "Pide tu presupuesto" | `destino-roques.html` |
| 2 | **Precios reales de las camisas.** Ahora son de referencia (€29 / €32), marcados con el badge "Muestra de tienda" | `tienda.html`, `index.html` |
| 3 | **Foto real de la Casa.** Se usa `choroni-paraiso.webp`, que es una playa de Choroní, no la casa | `destino-choroni.html` |

## ⚠️ Fallo preexistente detectado (no introducido por este trabajo)

**El logo del nav mide 160px fijos y no tiene regla responsive.** En móvil (375px)
ocupa 160px de alto y el wordmark se desborda hasta los 493px, quedando cortado
bajo el botón de hamburguesa. Afecta a **todas las páginas del sitio**, no solo a
las nuevas. Está en `assets/css/styles.css`, regla `.nav-logo img`.

No se tocó por estar fuera del encargo. Se arregla con una media query que reduzca
el logo en pantallas pequeñas.

---

## Decisiones tomadas

**Temporada de Los Roques.** El contenido original decía viento constante "de
Noviembre a Junio"; tú pediste "en cualquier momento del año". Se redactaron ambas
sin contradicción: salidas todo el año + nota franca de que la temporada fuerte de
viento es noviembre-junio y que fuera de esos meses el plan se ajusta hacia buceo,
snorkel y paddle.

**Surf NO en Los Roques.** Los Roques es un spot de **agua plana** — es justo lo que
lo hace bueno para kite y wing. Poner surf de olas ahí sería falso. En esa página hay
una línea que remite el surf a Choroní y Margarita, que es donde el contenido original
sí lo menciona (Playa Grande y Parguito). El Surf como deporte está en la home.

---

## Pendientes de antes (siguen abiertos)

De [ESTRUCTURA-WEB.md](ESTRUCTURA-WEB.md):

1. **WhatsApp de relleno** `584120000000` en todo el sitio, incluidas las páginas nuevas. Es la única vía de conversión
2. `choroni-panorama.webp` pesa **6,2 MB** y se carga dos veces en la home. `choroni-paraiso.webp` es de 4032×3024 para un hueco de 420px
3. `sitemap.xml` no existe, y `robots.txt` apunta a un dominio distinto al del schema.org. Las 2 páginas nuevas tampoco están en él
4. CMS legado: `admin.js` huérfano y APIs sin autenticación en `server.js`
