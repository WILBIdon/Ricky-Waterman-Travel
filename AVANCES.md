# Avances — 4 tareas nuevas (Los Roques, Surf, Casa, Tienda)

**Última actualización:** 2026-11-11
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

---

## 2026-11-11 — Número real de WhatsApp + títulos más pequeños en móvil

### WhatsApp real

`+43 677 64216757` (Austria) sustituye al relleno `584120000000` en las **46
referencias**: los 8 `.html` (nav, menú móvil, CTAs, footer, botón flotante),
`assets/js/shop.js` y el `telephone` del schema.org de `index.html`.

Queda fuera a propósito el CMS legado (`assets/js/admin.js`, `data/cms_db.json`),
que conserva `+58 412 000 0000`. `admin.js` está huérfano — no lo carga ningún
HTML — así que no lo ve ningún visitante.

### Títulos más pequeños en móvil

**37 declaraciones** en 8 archivos. El método importa: casi todos los títulos ya
usaban `clamp(min, Xvw, max)`, y en un móvil el término `vw` siempre queda por
debajo del mínimo, así que **es el mínimo el que manda**. Bajando sólo el mínimo,
el móvil encoge y **el escritorio no cambia ni un píxel** — verificado midiendo a
1280px antes y después: lista de tamaños idéntica.

Los 3 tamaños fijos (`.gallery-head h2`, `.itin-card h3`, `.sport-card h3`) se
convirtieron a `clamp()` con el valor viejo como máximo, con el mismo efecto.

| Título | Antes | Ahora |
|---|---|---|
| `.gallery-head h2` | 40 px | 32 px |
| `.dest-hero-content h1` (destinos, tienda) | 38,4 px | 32 px |
| `.cta h2` (cierre de todas las páginas) | 35,2 px | 30,4 px |
| `.ricky-hero-text h1` | 35,2 px | 30,4 px |
| `.dest-text / .sports-head / .itin-head / .shop-head h2` | 32 px | 28 px |
| `.hero h1` (home) | 30,4 px | 27,2 px |
| `.ricky-banner-text / .casa-text h2` | 28,8 px | 25,6 px |
| `.itin-card h3` | 24 px | 21,6 px |
| `.sport-card h3` | 21,6 px | 20 px |

Entre −7 % y −20 %: más recorte cuanto más grande era el título. `.info-card h3`
(18,4 px) se dejó igual, ya estaba en el límite de lo legible.

Ojo: 19 de esas declaraciones estaban **inline en el HTML**, no en el CSS — sobre
todo en las páginas de destino. Una media query no las habría tocado.

**El cache-buster subió de `?v=2.4` a `?v=2.5`** en los 8 `.html`. Sin eso, quien
ya hubiera visitado el sitio seguiría viendo la hoja de estilos vieja.

Verificado en las 8 páginas a 375 px: ningún desborde horizontal.

---

## 2026-11-11 (2) — La marca pasa del verde al azul

El cliente dijo que casi no le gusta el negro y que prefiere la gama de azules
sobre los verdes. Se aplicó la **opción A (Azul océano)** de las tres que se le
presentaron.

### Alcance real: 104 apariciones, no 5 variables

La paleta no vivía solo en `:root`. Había verdes escritos a mano por todo el
proyecto — `#122a26` aparecía **40 veces**, la mayoría inline en el HTML. En
total **20 valores verdes distintos en 104 apariciones**, en el CSS y en los
8 `.html`.

### Cómo se transformaron

No se eligieron 104 colores a mano. Los verdes estaban todos en un rango de
matiz muy cerrado (162°–195°), así que se aplicó una transformación por bandas
de luminosidad:

- **Estructura** (luz < 30 %): matiz +40° (tope 218°), saturación ×1,35 (tope
  72 %), luz **+6,5 puntos**. Ese empujón de luz es lo que responde al "casi no
  me gusta el negro": los fondos dejan de leerse como negro y pasan a azul marino.
- **Acentos** (luz ≥ 30 %): matiz +18°, saturación y luz intactas. El turquesa se
  vuelve cian azulado sin perder el carácter caribeño.

Las 5 variables de marca de `:root` se fijaron a mano para que coincidieran
exactamente con la opción A que vio el cliente:

| Variable | Antes | Ahora |
|---|---|---|
| `--ink` | `#122a26` | `#14304d` |
| `--deep` | `#183a34` | `#1b4268` |
| `--ocean` | `#1e4a43` | `#215a86` |
| `--turq` | `#1fc7b6` | `#22b5d8` |
| `--turq-soft` | `#79e3d6` | `#8ad8ec` |

### Lo que NO se tocó

- **Coral, mango y dorado.** Son la energía de la marca, y sobre azul marino
  contrastan mejor que sobre verde: son colores opuestos. Los botones de
  "Reservar" resaltan más que antes.
- **El verde de WhatsApp** (`#25D366`, `#1da851`): sus 8 apariciones intactas.
  Es el color de una marca ajena, no de la nuestra.
- Arena, papel y hielo.

**Cache-buster a `?v=2.6`.**

### Si hay que cambiar de opinión

La transformación es un script por bandas de luminosidad, no una lista escrita a
mano. Cambiar a la opción B (Caribe claro) o C (Azul noche) es volver a correrlo
con otras constantes. Comparación de las tres:
https://claude.ai/code/artifact/56094589-9801-4b7f-bc9b-769e6b9498c0

### Sobre el briefing del cliente

El documento de Drive (`Briefing Diseño Web.docx`) **está prácticamente vacío**:
es una plantilla de briefing de agencia sin rellenar. El único campo con texto es
la lista de valores de marca, y parece el menú de opciones de la propia plantilla,
no una elección del cliente. No contiene fotos ni cambios para el itinerario.

---

## 2026-11-11 (3) — Foto real de Ricky

`assets/ricky-waterman.webp` (1200×1200, **93 KB**) sustituye a
`assets/ricky-portrait.png` (656 KB) en sus 3 referencias: el hero de
`ricky.html`, el banner de la home y el `og:image` de la vista previa al
compartir. El hero pasó a `loading="eager"` + `fetchpriority="high"` porque
está sobre el pliegue y es el elemento LCP de esa página.

El `alt` ahora describe la foto de verdad: "Ricky Waterman saliendo del agua
con su tabla de kitesurf".

### Por qué importaba

La foto anterior **era generada por IA**: un hombre genérico con camisa azul en
una playa, presentado como Ricky Waterman en la página "Sobre Ricky" y en la
vista previa de WhatsApp y redes. En un negocio construido sobre la marca
personal de una persona real, eso es un problema de credibilidad, no de diseño.

### ⚠️ Queda otra foto falsa

`assets/ricky-surfing-youth.png` (1 MB), en `ricky.html`, también es generada
por IA y es **un tercer hombre distinto**. Se delata sola: el texto de la tabla
("Venezuela", "Los Roques") está escrito **en espejo**. Hace falta una foto real
para reemplazarla.

`assets/ricky-portrait.png` queda en el repo sin que nada la referencie (656 KB
muertos). Se puede borrar cuando se confirme que no hace falta.

---

## 2026-11-11 (4) — Llegó el material del cliente

El cliente bajó el Drive y lo dejó en la carpeta del proyecto. Está ordenado en
`material-cliente/` (excluido del repo: GitHub rechazó un zip de 117 MB que se
coló en un commit; ese commit se reescribió antes de subir).

**146 archivos, ~624 MB**, extraídos en `material-cliente/extraido/`:
Choroní (33), Los Roques (27 + 10 de César), Coche (14 + video de la posada),
**Canaima/Salto Ángel (50)**, Transporte (3), Ilustraciones (8: lettering de cada
destino). Muchos HEIC de iPhone: convertir antes de usar.

**`Ajuste Web RICKY.docx`** — lo que faltaba. Contiene:

1. **Itinerario real de 15 días**, día a día: Choroní 4d · Margarita 5d · Coche 6d
   (difiere del actual: la web dice "3 destinos, 15 días" con otro reparto)
2. **Bio de Ricky en primera persona** (Ricardo Parada, Viena) + textos por
   destino en su voz — reemplaza el texto genérico de ricky.html
3. Copy nuevo "Descubre tres caras de Venezuela: ciudad, naturaleza y Caribe"
4. **Ajustes pedidos:**
   - Sección/botón "Canaima — Próximamente" con fotos del Salto Ángel y texto de
     expectativa (sin precio, lista de espera)
   - **Incluir Caracas** como parada (los turistas duermen ahí al menos 1 noche)
   - **GDPR:** estudiar si WhatsApp desde la web es viable en la UE; quizá pasar
     a correo + casilla de consentimiento
   - Duda sobre el fondo color arena ("¿turquesa? ¿un color que estimule compra?")
5. Cotizaciones (15d US$4.390 ref · Choroní 7n US$2.800 · Margarita US$2.890 ·
   Coche US$3.090) — **el propio doc dice NO publicarlas como precio garantizado**

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

1. ~~**WhatsApp de relleno**~~ **Resuelto (2026-11-11):** número real `+43 677 64216757` aplicado en las 46 referencias (8 `.html` + `assets/js/shop.js`) y en el `telephone` del schema.org. Queda fuera a propósito el CMS legado (`assets/js/admin.js`, `data/cms_db.json`), que no se sirve a los visitantes
2. `choroni-panorama.webp` pesa **6,2 MB** y se carga dos veces en la home. `choroni-paraiso.webp` es de 4032×3024 para un hueco de 420px
3. `sitemap.xml` no existe, y `robots.txt` apunta a un dominio distinto al del schema.org. Las 2 páginas nuevas tampoco están en él
4. CMS legado: `admin.js` huérfano y APIs sin autenticación en `server.js`
