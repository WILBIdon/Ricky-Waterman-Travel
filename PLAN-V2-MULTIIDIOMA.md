# Plan V2 — Alemán primero, panel de administración y Supabase

**Fecha:** 2026-11-12
**Alcance:** tres idiomas (DE · EN · ES), panel tipo WordPress propio, contenido en Supabase (UE)

---

## Lo primero: esto es un cambio estratégico, no solo técnico

Ricky vende desde **Viena** a clientes **europeos**. La web está hoy **100 % en español**.

Un austriaco buscando *"Karibik Urlaub Winter"* no la encuentra, y si llega no la entiende. Poner el alemán primero no es una mejora: es corregir un desajuste entre el producto y su mercado. Es, probablemente, el cambio con más impacto comercial de todo lo que llevamos hecho.

Dicho eso, hay una trampa que conviene ver antes de empezar (ver *Traducción*, más abajo).

---

## El bloqueo que hay que resolver antes que nada

La cabecera y el pie **están copiados a mano en los 8 archivos**. Cambiar un enlace del menú obliga a tocar 8 sitios.

Con tres idiomas eso pasa a **24 copias**. Es insostenible: el primer error que se cuele queda replicado 24 veces.

**Por eso la fase 0 no es Supabase ni el panel: es dejar de duplicar.** Todo lo demás se apoya en eso.

---

## Decisión de arquitectura

### Lo que propongo

Mantener **Express + plantillas en el servidor**, leyendo contenido de Supabase con caché en memoria.

```
Visitante → Express (Railway) → plantilla + contenido de Supabase (cacheado)
                                        ↑
                              Panel admin escribe aquí
```

**Por qué así:**

- Ya tienes Express funcionando y endurecido. No hay que tirar nada.
- Cada idioma sale **renderizado desde el servidor**, con su propia URL. Google lo indexa bien, que es de lo que depende el negocio.
- Lo que Ricky cambie en el panel **se ve al instante** (invalidando la caché), que es la sensación "WordPress" que buscas.
- Sin build, sin framework nuevo, sin node_modules de 300 MB.

### Lo que descarto, y por qué

| Alternativa | Por qué no |
|---|---|
| **Reescribir en Next.js / Astro** | Multiplica el trabajo y las cosas que pueden romperse. Lo que tienes es un sitio de 8 páginas, no una aplicación. El framework resolvería problemas que no tienes |
| **Traducir en el navegador** (i18n con JSON) | Google indexaría una sola versión. Para un negocio que vive de que lo encuentren buscando en alemán, es tirar el SEO |
| **Generar estático en cada cambio** | Rápido de servir, pero cada edición de Ricky exigiría un despliegue. Mata la sensación de panel |
| **WordPress de verdad** | Resuelve el panel y los idiomas, sí. Pero hay que migrar todo, mantener actualizaciones y plugins, y el rendimiento que acabamos de ganar se pierde |

---

## Supabase: qué va dónde

Proyecto: `zkitgkcrhrnpmajshvdz` (región UE)

| Servicio | Para qué | Nota |
|---|---|---|
| **Postgres** | Todos los textos de la web, en los 3 idiomas | El contenido deja de vivir en el HTML |
| **Auth** | El login del panel | Resuelve de raíz el problema de "quién puede editar" |
| **Storage** | Las fotos | Sustituye a `uploads/`, y sirve desde CDN |
| **Row Level Security** | Lectura pública, escritura solo autenticado | Es la barrera de verdad, no el código |

**Dos ventajas que no son obvias:**

1. **La región UE ayuda con el RGPD.** Es una de las preguntas abiertas de Ricky. Que los datos de los visitantes europeos no salgan de la UE es justo lo que pide el reglamento.
2. **Storage con CDN** sirve las fotos desde un servidor cercano al visitante. Hoy salen todas desde Railway.

### Esquema propuesto

```sql
-- Una fila por bloque de texto, con una columna por idioma.
-- Más simple que una tabla de traducciones aparte, y para 3 idiomas sobra.
create table contenido (
  clave        text primary key,        -- 'home.hero.titulo'
  de           text,
  en           text,
  es           text,
  tipo         text default 'texto',    -- texto | html | lista
  seccion      text,                    -- para agrupar en el panel
  nota         text,                    -- ayuda para quien traduce
  actualizado  timestamptz default now()
);

create table medios (
  id        uuid primary key default gen_random_uuid(),
  ruta      text not null,              -- ruta en Storage
  alt_de    text, alt_en text, alt_es text,
  ancho     int, alto int,
  subido    timestamptz default now()
);

-- Lectura pública, escritura solo para quien ha iniciado sesión
alter table contenido enable row level security;
create policy "lectura publica"  on contenido for select using (true);
create policy "escritura admin"  on contenido for all
  using (auth.role() = 'authenticated');
```

---

## El panel de administración

Una página protegida (`/admin`) con login de Supabase Auth.

**Lo que debe poder hacer Ricky sin llamarte:**

- Editar cualquier texto de cualquier página, **con los tres idiomas uno al lado del otro** (así ve si falta una traducción)
- Cambiar fotos: subir, recortar, poner el texto alternativo
- Editar precios y el número de WhatsApp
- Activar o desactivar secciones (ej. publicar Canaima cuando abra)
- Ver qué textos **aún no están traducidos** — esto importa mucho con 3 idiomas

**Lo que NO debe poder hacer** (y aquí está la diferencia con WordPress): tocar la estructura, el CSS ni el HTML. Un panel que lo permite todo es un panel con el que se rompe la web. El panel edita **contenido**, no diseño.

**Seguridad:** Supabase Auth + RLS. Nada de un token en una variable de entorno como el parche actual.

---

## Multiidioma

### URLs

```
/            → redirige a /de/ (o al idioma del navegador)
/de/         /de/choroni   /de/ueber-ricky   ...
/en/         /en/choroni   /en/about-ricky   ...
/es/         /es/choroni   /es/sobre-ricky   ...
```

Cada página lleva sus `hreflang`, para que Google sepa que son la misma página en tres idiomas y no las tome por contenido duplicado:

```html
<link rel="alternate" hreflang="de" href="https://.../de/choroni">
<link rel="alternate" hreflang="en" href="https://.../en/choroni">
<link rel="alternate" hreflang="es" href="https://.../es/choroni">
<link rel="alternate" hreflang="x-default" href="https://.../de/choroni">
```

El `sitemap.xml` pasa de 8 a 24 URLs.

### La traducción: aquí está la trampa

**Son 4.591 palabras.** Por dos idiomas nuevos, unas **9.200 palabras a traducir.**

Y no es texto cualquiera. Mira cómo escribe Ricky:

> *"sentí cómo ese calor entraba por las plantas de mis pies y calentaba mis huesos"*

Eso es lo que vende. Pasado por DeepL al alemán sale correcto y **muerto**. El alemán es el idioma en el que vas a vender: un texto que suena a traducción automática resta credibilidad justo donde más cuesta ganarla.

**Mi recomendación:**

| Tipo de texto | Cómo |
|---|---|
| Interfaz (botones, menús, etiquetas) | Traducción automática + repaso rápido. Son pocas palabras y poco riesgo |
| Itinerario y datos prácticos | Automática + repaso. Es información, no emoción |
| **Bio de Ricky y textos de destino** | **Traductor nativo.** Son unas 2.000 palabras. Es donde está la venta |

Un nativo alemán para esas 2.000 palabras es un gasto pequeño comparado con el daño de una web que suena a robot.

---

## Fases

Cada fase deja el sitio **funcionando y publicable**. Nada de ramas largas.

### Fase 0 · Dejar de duplicar — ✅ **HECHA (2026-11-12)**
Nunjucks. Cabecera, menú móvil, pie, botón flotante y scripts comunes extraídos a `views/parciales/`; las 8 páginas son ahora `views/paginas/*.njk` sobre una `base.njk`. El servidor las renderiza manteniendo las mismas URLs.
Verificado comparando el HTML generado contra el original de las 8: mismos textos, mismos enlaces, cero imágenes rotas.
**Se recuperó un fallo por el camino:** el botón flotante de WhatsApp se perdía en la primera extracción. Era el principal elemento de conversión del sitio.

### Fase 1 · Supabase y el contenido fuera del HTML
Crear las tablas, sacar los textos actuales del HTML a la base (en español, que es lo que hay), y hacer que las plantillas lean de ahí con caché.
*Sigue viéndose igual. Pero ya es editable.*

### Fase 2 · El panel
Login con Supabase Auth, pantalla de edición, subida de imágenes a Storage.
*A partir de aquí Ricky puede cambiar textos sin ti.*

### Fase 3 · Los tres idiomas
Rutas por idioma, selector, `hreflang`, sitemap ampliado, detección del idioma del navegador. Cargar las traducciones.
*Esta es la fase que depende de que lleguen los textos traducidos.*

### Fase 4 · Fotos a Storage
Mover las imágenes a Supabase Storage y servirlas desde CDN. Retirar `uploads/`.

**Orden recomendado:** 0 → 1 → 2 → 3 → 4. La 3 es la más larga y la que depende de terceros; conviene tener el panel (fase 2) listo antes, para cargar las traducciones con él en vez de a mano.

---

## Lo que necesito de ti para empezar

1. **Las claves de Supabase** — del panel del proyecto, en *Settings → API*:
   - `Project URL`
   - `anon public key` (va en el navegador, es pública)
   - `service_role key` (solo en el servidor, **nunca** en el repo — va en variables de entorno de Railway)

   Dices que ya está conectado al repo, pero no hay rastro de configuración en el código: ni `.env`, ni carpeta `supabase/`, ni la dependencia instalada. Puede que la conexión sea solo a nivel de GitHub en el panel de Supabase, que no es lo mismo.

2. **Decisiones:**
   - ¿`/de/` como raíz, o detectar el idioma del navegador y redirigir?
   - ¿Traductor nativo para los textos de Ricky, o tiras con automática y repasas?
   - ¿El panel en alemán o en español? (Ricky habla español; si lo va a usar él, en español)

3. **El dominio.** Sigue pendiente, y ahora pesa más: las URLs por idioma y los `hreflang` lo necesitan.

---

## Riesgos, dichos a tiempo

| Riesgo | Cómo lo manejo |
|---|---|
| **Es una reforma de la capa de entrega.** No es añadir una página | Las fases dejan el sitio publicable en cada paso. Nunca una rama de semanas |
| **El contenido sale del HTML.** Si Supabase cae, la web se queda sin textos | Caché en memoria + copia de los textos en el repo como respaldo. La web no debe depender de que un servicio externo responda |
| **Traducción automática en el idioma de venta** | Separar lo que puede ir automático de lo que no (arriba) |
| **Un panel que pueda romper el diseño** | El panel edita contenido, no estructura ni CSS |
| **Las claves en el repo** | `service_role` solo en variables de entorno de Railway. Si se filtra, se puede escribir en toda la base |

---

## Nota sobre lo que ya está hecho

Lo de las últimas sesiones **no se tira**: el CSS, las fotos reales, los colores, el arreglo del logo, el endurecimiento del servidor y el poster del video siguen igual. Lo que cambia es de dónde salen los **textos** y cuántos **idiomas** se sirven.

Una cosa a limpiar de paso: `package.json` todavía declara `cors`, que quedó sin usar al endurecer el servidor.
