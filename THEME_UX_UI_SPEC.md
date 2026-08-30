# 🌊 THE WATERMAN EXPERIENCE — SISTEMA DE DISEÑO UX/UI & ESPECIFICACIÓN DE TEMA

> **Documento de Especificación del Tema Gráfico v1.0.0**  
> *Este documento contiene la arquitectura visual completa, tokens de diseño, paleta de colores, tipografía, micro-animaciones de firma y componentes del sistema UX/UI de "The Waterman Experience". Sirve como respaldo oficial para restaurar o replicar este tema gráfico en el futuro.*

---

## 📸 1. Identidad Visual & Concepto Gráfico

El tema gráfico combina el estilo **editorial de turismo de aventura de lujo** (inspirado en *Adventure.travel*) con elementos marinos dinámicos, glassmorphism esmerilado de agua y una paleta de colores caribeña sofisticada.

### Principios Fundamentales de UX/UI:
1. **Lujo Caribeño & Aventura Consciente**: Contrastes profundos entre fondo cálido tierra (`#F1EFE7`) y contenedores flotantes nocturnos (`#07161B` y `#040E12`).
2. **Glassmorphism de Agua en Capas**: Uso de desfoques de fondo (`backdrop-filter: blur(20px)`), saturación aumentada y bordes turquesas bioluminiscentes.
3. **Micro-animaciones Hídricas de Firma**:
   - Gotas de agua animadas chorreando desde el menú flotante (*Dripping Droplets*).
   - Olas de mar vectoriales SVG de 3 capas animadas en bucle infinito al pie del Hero.
   - Marca de agua fija del isotipo/logo al 4.5% de opacidad en el fondo global.

---

## 🎨 2. Tokens de Diseño & Variables CSS (`:root`)

Todas las variables globales de diseño están declaradas en `assets/css/styles.css`:

```css
:root {
    /* Paleta de Colores de Fondo */
    --color-bg-warm: #F1EFE7;    /* Fondo cálido arena/papel editorial */
    --color-bg-card: #FFFFFF;    /* Fondo de tarjetas claras */
    --color-bg-dark: #000000;    /* Negro puro para contrastes nocturnos */
    --color-nav-dark: #07161B;   /* Azul petróleo oscuro para menú y footers */
    
    /* Colores Acento Hídricos & Caribeños */
    --color-turquoise: #10B3BF;  /* Turquesa bioluminiscente principal */
    --color-teal: #096A71;       /* Verde azulado profundo para gradientes */
    --color-coral: #10B3BF;      /* Acento coral/turquesa de botones */
    --color-coral-hover: #096A71;/* Hover de botones principales */
    --color-cyan: #10B3BF;       /* Cian para etiquetas e íconos */
    --color-silver: #BDBEC0;     /* Plata metálico para bordes sutiles */
    
    /* Tipografía & Textos */
    --color-text-dark: #000000;  /* Encabezados y títulos principales */
    --color-text-body: #333333;  /* Texto de párrafos y lectura */
    --color-text-muted: #555555; /* Textos secundarios y leyendas */
    --color-border: #BDBEC0;     /* Bordes de división de tarjetas */
    
    /* Fuentes Tipográficas */
    --font-serif: 'Fraunces', 'DM Serif Display', Georgia, serif;
    --font-sans: 'Manrope', 'Figtree', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;

    /* Rejilla & Ancho Máximo Editorial */
    --max-editorial: 1236px;
}
```

---

## 💎 3. Componentes Visuales & Micro-animaciones de Firma

### A. Menú Flotante Semi-Redondeado con Gotas Animadas (`.nav-floating`)
- **Posición**: Fijo en la parte superior (`position: fixed; top: 1rem;`).
- **Fondo**: `rgba(4, 14, 18, 0.92)` con `backdrop-filter: blur(20px) saturate(180%)`.
- **Radio de Bordes**: `16px`.
- **Dripping Water Droplets (`.drip-drop`)**: 5 gotas de agua hídricas animadas en bucle con la propiedad `@keyframes dripFallStretch` que se estiran y caen suavemente desde la base del menú.

```css
@keyframes dripFallStretch {
    0%   { transform: translateY(0) scale(0.6, 0.6); opacity: 0; }
    15%  { transform: translateY(1px) scale(1, 1); opacity: 0.95; }
    40%  { transform: translateY(10px) scale(0.55, 2.6); opacity: 1; }  /* Estiramiento líquido */
    60%  { transform: translateY(32px) scale(0.4, 2.2); opacity: 0.85; }  /* Desprendimiento */
    80%  { transform: translateY(58px) scale(0.25, 1.2); opacity: 0; }
    100% { transform: translateY(0) scale(0.6, 0.6); opacity: 0; }
}
```

---

### B. Hero Principal con Caja Esmerilada & Olas Vectoriales (`.hero-section`)
- **Fondo de Video**: Video MP4 en bucle continuo (`assets/hero-video.mp4`) al 70% de opacidad.
- **Hero Glass Box (`.hero-glass-box`)**: Contenedor modal compacto esmerilado (`background: rgba(3, 20, 26, 0.75)`), borde turquesa bioluminiscente y tipografía Serif blanca de alto contraste.
- **Olas Vectoriales (`.wave-wrap`)**: 3 capas de olas SVG superpuestas (`#096A71`, `#0e8f99`, `#07161B`) animadas hidráulicamente con tiempos desfasados (9s, 7s, 5.5s).

---

### C. Barra de Estadísticas Nocturna (`.stats-strip`)
- **Fondo**: Negro Petróleo `#07161B` con bordes superior e inferior en turquesa bioluminiscente `rgba(16, 179, 191, 0.3)`.
- **Números**: Renderizados en `JetBrains Mono` a tamaño responsivo (`clamp(2rem, 4vw, 2.8rem)`) con resplandor `text-shadow: 0 0 20px rgba(16,179,191,0.3)`.
- **Etiquetas**: Texto en mayúsculas `Manrope` con espaciado de letras ampliado (`letter-spacing: 0.12em`).

---

### D. Tarjetas de Destino & Gradientes Hídricos (`.text-gradient-card` / `.dest-card`)
- **Fondo**: Gradiente suave `linear-gradient(135deg, rgba(9, 106, 113, 0.08) 0%, rgba(16, 179, 191, 0.04) 100%)`.
- **Efecto Hover**: Elevación de 6px (`transform: translateY(-6px)`) con sombra turquesa y zoom suave en la imagen (`transform: scale(1.05)`).

---

### E. Modales del Panel Admin (Vista Previa & Doble Seguridad)
- **Modal de Vista Previa en Vivo (`#live-preview-modal`)**: Modal en pantalla completa con selector de dispositivos (Escritorio, Tablet, Móvil) e inyección en tiempo real de borradores en el `iframe`.
- **Modal de Doble Seguridad (`#confirm-action-modal`)**: Modal de alerta crítica que exige al usuario escribir manualmente la palabra de confirmación exacta (`RESTAURAR`, `BORRAR`, `BORRAR TODO`) en mayúsculas para activar el botón de ejecución.

---

## 🏛️ 4. Arquitectura de Páginas del Sitio & Identificadores CMS

El sitio está compuesto por **12 páginas públicas** y **1 panel de administración**, todas conectadas dinámicamente mediante la etiqueta `data-cms-id`:

| Página File | Nombre / Propósito | Componentes Clave & IDs CMS |
| :--- | :--- | :--- |
| `index.html` | Inicio / Portada Principal | `hero-title`, `hero-subtitle`, `hero-video`, `stat1-num` a `stat4-label`, `dest1` a `dest3`, `canaima-banner`, `edit1` a `edit3`, `impact1` a `impact4`, `story-main`, `story1` a `story3` |
| `deportes.html` | Deportes & Safaris Acuáticos | `dep-title`, `dep-subtitle`, `dest-caracas`, `dest-choroni`, `dest-margarita`, `dest-losroques`, itinerarios diarios `kite`, `wind`, `wing`, `dive` |
| `destino-caracas.html` | Destino #1: Caracas | `caracas-hero-img`, `caracas-title`, `caracas-desc`, `caracas-a1-title` a `caracas-a3-text` |
| `destino-choroni.html` | Destino #2: Choroní | `choroni-hero-img`, `choroni-title`, `choroni-desc`, `choroni-a1-title` a `choroni-a3-text` |
| `destino-margarita.html` | Destino #3: Margarita & Coche | `margarita-hero-img`, `margarita-title`, `margarita-desc`, `margarita-a1-title` a `margarita-a3-text` |
| `destino-losroques.html` | Destino #4: Los Roques | `losroques-hero-img`, `losroques-title`, `losroques-desc`, `losroques-a1` a `losroques-a3`, `losroques-s1` a `losroques-s4` |
| `destino-canaima.html` | Destino #5: Canaima | `canaima-hero-img`, `canaima-title`, `canaima-desc`, `canaima-a1` a `canaima-a3` |
| `nosotros.html` | Sobre Nosotros / Tripulación | `nos-title`, `nos-subtitle`, `nos-founder-img`, `nos-founder-name`, `nos-bio1`, `nos-bio2`, `nos-c1-title`, `nos-c2-title`, `nos-cta-title` |
| `paquetes.html` | Paquetes All-In-One | `paq-title`, `paq-subtitle`, `paq-showcase-img`, `paq-feature1` a `paq-feature3`, `paq-extras`, `paq-cta-title` |
| `contacto.html` | Cotizador & Contacto | `con-title`, `con-subtitle`, `con-whatsapp`, `con-email`, `con-instagram`, `con-hero-title`, `con-hero-desc` |
| `experiencia.html` | La Experiencia Waterman | `exp-title`, `exp-subtitle`, `exp-p1` a `exp-p3`, `exp-gal-title`, `exp-gal1` a `exp-gal4`, `exp-cta-title` |
| `prepara-tu-viaje.html` | Preguntas Frecuentes (FAQ) | `faq-title`, `faq-subtitle`, `faq-q1`/`faq-a1` a `faq-q5`/`faq-a5`, `faq-cta-title` |
| `admin.html` | Panel de Control CMS | Panel modular con edición de textos, precarga de defaults, Vista Previa en Vivo, Copias de Seguridad (max 2) y Modales de Seguridad |

---

## 🔄 5. Guía de Restauración de este Tema Gráfico

Si en el futuro se modifica el diseño o se desea volver exactamente a esta versión estética:

1. **Restaurar Archivos CSS**:
   - Verificar que `assets/css/styles.css` mantenga los tokens de `:root` y las reglas de `.nav-floating`, `.drip-drop`, `.hero-glass-box` y `.stats-strip`.
   - Verificar que `assets/css/admin.css` mantenga las reglas de los modales y de la barra superior del Admin.
2. **Restaurar Estructura HTML & data-cms-id**:
   - Asegurarse de que cada elemento de texto contenga su atributo `data-cms-id` correspondiente listado en la tabla de la Sección 4.
3. **Base de Datos Unificada de Contenidos**:
   - El archivo `data/cms_db.json` contiene la estructura completa precargada del sitio web.
   - En el Admin (`admin.html`), se puede usar el botón **"Copias de Seguridad"** para restaurar cualquier snapshot guardado en el servidor con la palabra de confirmación **`RESTAURAR`**.

---

*Documento generado y archivado automáticamente para The Waterman Experience.*
