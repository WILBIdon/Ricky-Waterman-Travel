/* ==========================================================================
   WATERMAN ADMIN — Panel Logic (Full Pre-populated CMS Engine)
   ========================================================================== */
(function () {
    'use strict';

    const STORAGE_KEY = 'waterman_cms_data';
    const ADMIN_PASS = 'waterman2026';

    // ===================== DATA SCHEMA =====================
    // Complete editable fields for all public pages with default website content
    const PAGES = {
        index: {
            label: 'Inicio',
            icon: 'fa-house',
            pageFile: 'index.html',
            sections: [
                {
                    title: 'Hero Principal',
                    icon: 'fa-film',
                    fields: [
                        { id: 'hero-title', label: 'Título Hero', type: 'textarea', defaultText: 'Tu Aventura<br>Te Espera' },
                        { id: 'hero-subtitle', label: 'Subtítulo Hero', type: 'textarea', defaultText: 'Ciudad, naturaleza y Caribe en una experiencia exclusiva diseñada a tu medida.' },
                        { id: 'hero-video', label: 'Video de Fondo (Hero)', type: 'video', defaultVideo: 'assets/hero-video.mp4' },
                        { id: 'hero-fallback', label: 'Imagen de Respaldo (Hero)', type: 'image', defaultImg: 'assets/IMG_4118.JPG' }
                    ]
                },
                {
                    title: 'Barra de Estadísticas (Stats Strip)',
                    icon: 'fa-chart-simple',
                    fields: [
                        { id: 'stat1-num', label: 'Estadística 1 - Valor', type: 'text', defaultText: '14+' },
                        { id: 'stat1-label', label: 'Estadística 1 - Etiqueta', type: 'text', defaultText: 'Años en el agua' },
                        { id: 'stat2-num', label: 'Estadística 2 - Valor', type: 'text', defaultText: '32' },
                        { id: 'stat2-label', label: 'Estadística 2 - Etiqueta', type: 'text', defaultText: 'Cayos & Spots' },
                        { id: 'stat3-num', label: 'Estadística 3 - Valor', type: 'text', defaultText: '500+' },
                        { id: 'stat3-label', label: 'Estadística 3 - Etiqueta', type: 'text', defaultText: 'Viajeros felices' },
                        { id: 'stat4-num', label: 'Estadística 4 - Valor', type: 'text', defaultText: '18-25 Kts' },
                        { id: 'stat4-label', label: 'Estadística 4 - Etiqueta', type: 'text', defaultText: 'Viento alisio continuo' }
                    ]
                },
                {
                    title: 'Destinos Destacados (Tres Caras de Venezuela)',
                    icon: 'fa-map-location-dot',
                    fields: [
                        { id: 'dest1-img', label: 'Foto Destino 1 (Caracas)', type: 'image', defaultImg: 'assets/IMG_4129.JPG' },
                        { id: 'dest1-title', label: 'Título Destino 1', type: 'text', defaultText: 'Caracas: El Comienzo de la Historia' },
                        { id: 'dest1-text', label: 'Descripción Destino 1', type: 'textarea', defaultText: 'Mucho más que una puerta de entrada, es una vibrante metrópolis que late al pie del imponente cerro El Ávila. Sofisticada mezcla de gastronomía, arquitectura icónica y rica herencia cultural.' },
                        { id: 'dest2-img', label: 'Foto Destino 2 (Choroní)', type: 'image', defaultImg: 'assets/IMG_4160.JPG' },
                        { id: 'dest2-title', label: 'Título Destino 2', type: 'text', defaultText: 'Choroní: Entre la Selva y el Mar' },
                        { id: 'dest2-text', label: 'Descripción Destino 2', type: 'textarea', defaultText: 'Cruza las montañas nubladas del Parque Nacional Henri Pittier para llegar a Choroní, un tesoro colonial donde la selva tropical abraza las aguas del Caribe en un entorno virgen.' },
                        { id: 'dest3-img', label: 'Foto Destino 3 (Margarita y Coche)', type: 'image', defaultImg: 'assets/IMG_4118.JPG' },
                        { id: 'dest3-title', label: 'Título Destino 3', type: 'text', defaultText: 'Margarita y Coche: El Encanto de las Islas' },
                        { id: 'dest3-text', label: 'Descripción Destino 3', type: 'textarea', defaultText: 'Desde la vibrante Isla de Margarita hasta la paz absoluta de las arenas blancas de Coche. Disfruta de atardeceres inolvidables, deportes acuáticos y la calidez de nuestra gente.' }
                    ]
                },
                {
                    title: 'Banner Canaima & Salto Ángel (Próximamente)',
                    icon: 'fa-mountain-sun',
                    fields: [
                        { id: 'canaima-banner-title', label: 'Título Banner', type: 'text', defaultText: 'Canaima y el Salto Ángel' },
                        { id: 'canaima-banner-text', label: 'Texto Banner', type: 'textarea', defaultText: 'Estamos preparando algo extraordinario. Muy pronto abriremos las puertas a una de las maravillas naturales más impresionantes del mundo. Imagina encontrarte frente a la caída de agua más alta del planeta, en una tierra ancestral que parece detenida en el tiempo. Mantente atento: las plazas serán limitadas para garantizar una experiencia de máxima exclusividad. Canaima te espera.' }
                    ]
                },
                {
                    title: 'Bloques Editoriales',
                    icon: 'fa-pen-fancy',
                    fields: [
                        { id: 'edit1-title', label: 'Título Bloque 1', type: 'text', defaultText: 'La Aventura Es Para Todos' },
                        { id: 'edit1-text', label: 'Texto Bloque 1', type: 'textarea', defaultText: 'Creemos que la aventura en el mar no es exclusiva de atletas extremos. Diseñamos nuestras expediciones para que tanto principiantes que nunca han tocado una tabla como navegantes avanzados disfruten al máximo en un entorno seguro y cálido.' },
                        { id: 'edit1-img', label: 'Foto Bloque 1', type: 'image', defaultImg: 'assets/IMG_4118.JPG' },
                        { id: 'edit2-title', label: 'Título Bloque 2', type: 'text', defaultText: 'Tu Viaje, Perfeccionado' },
                        { id: 'edit2-text', label: 'Texto Bloque 2', type: 'textarea', defaultText: 'Nos encargamos de absolutamente toda la logística para que tú solo pienses en disfrutar del agua. Desde tu llegada al aeropuerto de Caracas hasta cada transfer diario en lancha privada a los cayos más remotos.' },
                        { id: 'edit2-img', label: 'Foto Bloque 2', type: 'image', defaultImg: 'assets/IMG_4160.JPG' },
                        { id: 'edit3-title', label: 'Título Bloque 3', type: 'text', defaultText: 'Descubre Una Mejor Forma de Viajar' },
                        { id: 'edit3-text', label: 'Texto Bloque 3', type: 'textarea', defaultText: 'Los Roques es una reserva marina protegida de valor incalculable. Operamos bajo estrictas normas de sostenibilidad: cero plásticos de un solo uso, protectores solares Reef-Safe y respeto absoluto por las comunidades pesqueras locales.' },
                        { id: 'edit3-img', label: 'Foto Bloque 3', type: 'image', defaultImg: 'assets/IMG_4128.JPG' }
                    ]
                },
                {
                    title: 'Historias de Impacto',
                    icon: 'fa-heart',
                    fields: [
                        { id: 'impact1-img', label: 'Foto Historia 1', type: 'image', defaultImg: 'assets/IMG_4162.JPG' },
                        { id: 'impact1-title', label: 'Título Historia 1', type: 'text', defaultText: 'La Historia de Ricky' },
                        { id: 'impact1-text', label: 'Texto Historia 1', type: 'textarea', defaultText: 'Fundador y apasionado del mar compartiendo el paraíso marino de su infancia con el mundo.' },
                        { id: 'impact2-img', label: 'Foto Historia 2', type: 'image', defaultImg: 'assets/IMG_4160.JPG' },
                        { id: 'impact2-title', label: 'Título Historia 2', type: 'text', defaultText: 'Protección de Arrecifes' },
                        { id: 'impact2-text', label: 'Texto Historia 2', type: 'textarea', defaultText: 'Iniciativas para mantener intacta la barrera coralina de Los Roques para futuras generaciones.' },
                        { id: 'impact3-img', label: 'Foto Historia 3', type: 'image', defaultImg: 'assets/IMG_4165.JPG' },
                        { id: 'impact3-title', label: 'Título Historia 3', type: 'text', defaultText: 'Apoyo a Capitanes Locales' },
                        { id: 'impact3-text', label: 'Texto Historia 3', type: 'textarea', defaultText: 'Integración y trabajo digno con las familias de pescadores de la isla.' },
                        { id: 'impact4-img', label: 'Foto Historia 4', type: 'image', defaultImg: 'assets/IMG_4129.JPG' },
                        { id: 'impact4-title', label: 'Título Historia 4', type: 'text', defaultText: 'Política Zero Plastic' },
                        { id: 'impact4-text', label: 'Texto Historia 4', type: 'textarea', defaultText: 'Eliminación completa de plásticos en todos nuestros safaris náuticos.' }
                    ]
                },
                {
                    title: 'Historias que Inspiran (Blog / Guías)',
                    icon: 'fa-newspaper',
                    fields: [
                        { id: 'story-main-title', label: 'Título Artículo Destacado', type: 'text', defaultText: '¿Por qué Los Roques es el Mejor Spot de Agua Plana del Mundo?' },
                        { id: 'story-main-text', label: 'Descripción Artículo Destacado', type: 'textarea', defaultText: 'Descubre las razones meteorológicas e hidrográficas que convierten al archipiélago en un paraíso constante.' },
                        { id: 'story-main-img', label: 'Foto Artículo Destacado', type: 'image', defaultImg: 'assets/IMG_4118.JPG' },
                        { id: 'story1-title', label: 'Historia Lateral 1 - Título', type: 'text', defaultText: 'Qué Llevar a Tu Primera Expedición en Los Roques' },
                        { id: 'story1-img', label: 'Historia Lateral 1 - Foto', type: 'image', defaultImg: 'assets/IMG_4129.JPG' },
                        { id: 'story2-title', label: 'Historia Lateral 2 - Título', type: 'text', defaultText: 'Cómo Funciona la Conexión VIP en Caracas' },
                        { id: 'story2-img', label: 'Historia Lateral 2 - Foto', type: 'image', defaultImg: 'assets/IMG_4163.JPG' },
                        { id: 'story3-title', label: 'Historia Lateral 3 - Título', type: 'text', defaultText: 'Pescado Fresco & Langosta en Cayos Desiertos' },
                        { id: 'story3-img', label: 'Historia Lateral 3 - Foto', type: 'image', defaultImg: 'assets/IMG_4161.JPG' }
                    ]
                }
            ]
        },
        deportes: {
            label: 'Deportes & Safaris',
            icon: 'fa-wind',
            pageFile: 'deportes.html',
            sections: [
                {
                    title: 'Encabezado General',
                    icon: 'fa-heading',
                    fields: [
                        { id: 'dep-title', label: 'Título Principal', type: 'text', defaultText: 'Elige Tu Deporte & Descubre Los Destinos' },
                        { id: 'dep-subtitle', label: 'Subtítulo', type: 'textarea', defaultText: 'Selecciona primero la disciplina deportiva o actividad que deseas realizar y te mostraremos exactamente en qué lugares de Venezuela puedes disfrutarla al máximo.' }
                    ]
                },
                {
                    title: 'Paso 1: Configuración de Destinos',
                    icon: 'fa-map-location-dot',
                    fields: [
                        { id: 'dest-caracas-title', label: 'Destino 1: Caracas (Título)', type: 'text', defaultText: 'Caracas (Ciudad & Cultura)' },
                        { id: 'dest-caracas-desc', label: 'Destino 1: Caracas (Descripción)', type: 'textarea', defaultText: 'El comienzo de la historia. Cultura, gastronomía VIP, El Ávila y skydiving.' },
                        { id: 'dest-choroni-title', label: 'Destino 2: Choroní (Título)', type: 'text', defaultText: 'Choroní (Selva & Mar)' },
                        { id: 'dest-choroni-desc', label: 'Destino 2: Choroní (Descripción)', type: 'textarea', defaultText: 'Selva tropical y aguas del Caribe. Kitesurf, Surf y trekking en Henri Pittier.' },
                        { id: 'dest-margarita-title', label: 'Destino 3: Margarita & Coche (Título)', type: 'text', defaultText: 'Margarita & Coche (Islas)' },
                        { id: 'dest-margarita-desc', label: 'Destino 3: Margarita & Coche (Descripción)', type: 'textarea', defaultText: 'La Perla del Caribe. El Yaque meca de Windsurf, Wingfoil y Buceo Los Frailes.' },
                        { id: 'dest-losroques-title', label: 'Destino 4: Los Roques (Título)', type: 'text', defaultText: 'Los Roques (Safaris Acuáticos VIP)' },
                        { id: 'dest-losroques-desc', label: 'Destino 4: Los Roques (Descripción)', type: 'textarea', defaultText: 'El paraíso acuático por excelencia. Kitesurf, Windsurf, Wingfoil y Buceo PADI.' }
                    ]
                },
                {
                    title: 'Kitesurf Experience',
                    icon: 'fa-wind',
                    fields: [
                        { id: 'kite-title', label: 'Título Kitesurf', type: 'text', defaultText: 'Kitesurf Experience' },
                        { id: 'kite-desc', label: 'Descripción Kitesurf', type: 'textarea', defaultText: 'Aguas totalmente llanas ("flat water"), viento continuo de 18 a 25 nudos y temperatura perfecta.' },
                        { id: 'kite-beg-d1', label: 'Principiante: Día 1 - Texto', type: 'textarea', defaultText: 'Bienvenida en Gran Roque, setup de equipos, principios aerodinámicos de la cometa y primeros vuelos con Kite de entrenamiento en la playa.' },
                        { id: 'kite-beg-d23', label: 'Principiante: Días 2-3 - Texto', type: 'textarea', defaultText: 'Body drag en la piscina natural de Francisquí, water start (puesta de tabla) y primeros deslizamientos asistidos por instructor 1:1.' },
                        { id: 'kite-beg-d46', label: 'Principiante: Días 4-6 - Texto', type: 'textarea', defaultText: 'Navegación independiente ganando barlovento, perfeccionamiento de postura y safari de graduación en Cayo Crasquí.' },
                        { id: 'kite-adv-d1', label: 'Avanzado: Día 1 - Texto', type: 'textarea', defaultText: 'Evaluación de spots locales, ajuste de arnés/foils y sesión de calentamiento en la barra de Francisquí.' },
                        { id: 'kite-adv-d23', label: 'Avanzado: Días 2-3 - Texto', type: 'textarea', defaultText: 'Excursión en lancha rápida privada a una de las playas más bellas del mundo. Navegación en istmo de arena blanca y fotos HD.' },
                        { id: 'kite-adv-d46', label: 'Avanzado: Días 4-6 - Texto', type: 'textarea', defaultText: 'Downwinder de 15km asistido por lancha de rescate entre cayos remotos (Sebastopol/Nordisquí) y clínica de saltos con Ricky.' }
                    ]
                },
                {
                    title: 'Windsurf Paradise',
                    icon: 'fa-sailboat',
                    fields: [
                        { id: 'wind-title', label: 'Título Windsurf', type: 'text', defaultText: 'Windsurf Paradise' },
                        { id: 'wind-desc', label: 'Descripción Windsurf', type: 'textarea', defaultText: 'El equilibrio perfecto entre vela, agua y brisa constante. Ideal para aprender rápido o planear a máxima velocidad.' },
                        { id: 'wind-d1', label: 'Día 1 - Texto', type: 'textarea', defaultText: 'Izado de vela, posición del cuerpo, virada básica y navegación de ida y vuelta en zona protegida.' },
                        { id: 'wind-d24', label: 'Días 2-4 - Texto', type: 'textarea', defaultText: 'Uso del arnés, entrada en footstraps y técnica para entrar en planeo sostenido en la laguna.' },
                        { id: 'wind-d56', label: 'Días 5-6 - Texto', type: 'textarea', defaultText: 'Perfeccionamiento de jibe (trasuchada) y recorrido libre descubriendo los manglares y bajos de arena.' }
                    ]
                },
                {
                    title: 'Wingfoil Levitation',
                    icon: 'fa-plane-up',
                    fields: [
                        { id: 'wing-title', label: 'Título Wingfoil', type: 'text', defaultText: 'Wingfoil Experience' },
                        { id: 'wing-desc', label: 'Descripción Wingfoil', type: 'textarea', defaultText: 'Vuela sin ruido sobre las aguas transparentes con el ala neumática y el hydrofoil.' },
                        { id: 'wing-d1', label: 'Día 1 - Texto', type: 'textarea', defaultText: 'Aprende a dominar el viento con el ala neumática sobre tabla de SUP sin foil para entender la propulsión.' },
                        { id: 'wing-d24', label: 'Días 2-4 - Texto', type: 'textarea', defaultText: 'Remolque suave detrás de la lancha para sentir el despegue del Foil, seguido del acople con el Wing.' },
                        { id: 'wing-d56', label: 'Días 5-6 - Texto', type: 'textarea', defaultText: 'Desplazamiento fluido entre cayos volando sobre la superficie turquesa con coaching en video.' }
                    ]
                },
                {
                    title: 'Buceo PADI Arrecifes',
                    icon: 'fa-water',
                    fields: [
                        { id: 'dive-title', label: 'Título Buceo', type: 'text', defaultText: 'Buceo en el Arrecife' },
                        { id: 'dive-desc', label: 'Descripción Buceo', type: 'textarea', defaultText: 'Explora una de las barreras coralinas más vivas del Caribe: tortugas, rayas, pecios y corales de fuego.' },
                        { id: 'dive-d12', label: 'Días 1-2 - Texto', type: 'textarea', defaultText: 'Módulos PADI, ensamble del equipo autónomo y prácticas de flotabilidad en aguas poco profundas.' },
                        { id: 'dive-d34', label: 'Días 3-4 - Texto', type: 'textarea', defaultText: 'Inmersiones reales en la barrera coralina hasta 18m de profundidad acompañados por Instructores PADI Master.' },
                        { id: 'dive-d56', label: 'Días 5-6 - Texto', type: 'textarea', defaultText: 'Buceo de graduación en barcos hundidos y arrecifes de coral profundo con expedición fotográfica.' }
                    ]
                }
            ]
        },
        caracas: {
            label: 'Destino: Caracas',
            icon: 'fa-city',
            pageFile: 'destino-caracas.html',
            sections: [
                {
                    title: 'Hero & Descripción',
                    icon: 'fa-mountain',
                    fields: [
                        { id: 'caracas-hero-img', label: 'Imagen Hero', type: 'image', defaultImg: 'assets/IMG_4129.JPG' },
                        { id: 'caracas-title', label: 'Título Principal', type: 'text', defaultText: 'Caracas: El Comienzo de la Historia' },
                        { id: 'caracas-desc', label: 'Descripción General', type: 'textarea', defaultText: 'Mucho más que una puerta de entrada, Caracas es una vibrante metrópolis que late al pie del imponente cerro El Ávila. Sofisticada mezcla de gastronomía de clase mundial, arquitectura icónica y rica herencia cultural.' }
                    ]
                },
                {
                    title: 'Atractivos de Caracas',
                    icon: 'fa-star',
                    fields: [
                        { id: 'caracas-a1-title', label: 'Atractivo 1 - Título', type: 'text', defaultText: 'Parque Nacional El Ávila' },
                        { id: 'caracas-a1-text', label: 'Atractivo 1 - Texto', type: 'textarea', defaultText: 'Ascenso en teleférico VIP, caminatas por senderos selváticos con vistas al mar Caribe y aire puro de montaña a 2.100m de altura.' },
                        { id: 'caracas-a2-title', label: 'Atractivo 2 - Título', type: 'text', defaultText: 'Gastronomía de Autor' },
                        { id: 'caracas-a2-text', label: 'Atractivo 2 - Texto', type: 'textarea', defaultText: 'Ruta gastronómica exclusiva visitando restaurantes galardonados, cata de rones premium venezolanos y café de especialidad.' },
                        { id: 'caracas-a3-title', label: 'Atractivo 3 - Título', type: 'text', defaultText: 'Skydiving & Vuelos en Helicóptero' },
                        { id: 'caracas-a3-text', label: 'Atractivo 3 - Texto', type: 'textarea', defaultText: 'Saltos en paracaídas tándem de alta altitud y sobrevuelos privados en helicóptero sobre el valle caraqueño y la costa marítima.' }
                    ]
                }
            ]
        },
        choroni: {
            label: 'Destino: Choroní',
            icon: 'fa-tree',
            pageFile: 'destino-choroni.html',
            sections: [
                {
                    title: 'Hero & Descripción',
                    icon: 'fa-water',
                    fields: [
                        { id: 'choroni-hero-img', label: 'Imagen Hero', type: 'image', defaultImg: 'assets/IMG_4160.JPG' },
                        { id: 'choroni-title', label: 'Título Principal', type: 'text', defaultText: 'Choroní: Entre la Selva y el Mar' },
                        { id: 'choroni-desc', label: 'Descripción General', type: 'textarea', defaultText: 'Cruza las montañas nubladas del Parque Nacional Henri Pittier para llegar a Choroní, un tesoro colonial donde la selva tropical abraza las aguas del Caribe en un entorno virgen lleno de tradición.' }
                    ]
                },
                {
                    title: 'Atractivos de Choroní',
                    icon: 'fa-star',
                    fields: [
                        { id: 'choroni-a1-title', label: 'Atractivo 1 - Título', type: 'text', defaultText: 'Parque Henri Pittier' },
                        { id: 'choroni-a1-text', label: 'Atractivo 1 - Texto', type: 'textarea', defaultText: 'El primer parque nacional de Venezuela. Selva nublada, cascadas de agua dulce y biodiversidad única a minutos del mar.' },
                        { id: 'choroni-a2-title', label: 'Atractivo 2 - Título', type: 'text', defaultText: 'Playa Grande & Olas' },
                        { id: 'choroni-a2-text', label: 'Atractivo 2 - Texto', type: 'textarea', defaultText: 'Una amplia bahía rodeada de cocoteros gigantes ideales para la práctica de Surf, Kitesurf y kayak de mar costero.' },
                        { id: 'choroni-a3-title', label: 'Atractivo 3 - Título', type: 'text', defaultText: 'Pueblo Colonial de Puerto Colombia' },
                        { id: 'choroni-a3-text', label: 'Atractivo 3 - Texto', type: 'textarea', defaultText: 'Posadas pintorescas, música de tambores al atardecer y gastronomía marina a base de pescado fresco del día.' }
                    ]
                }
            ]
        },
        margarita: {
            label: 'Destino: Margarita & Coche',
            icon: 'fa-umbrella-beach',
            pageFile: 'destino-margarita.html',
            sections: [
                {
                    title: 'Hero & Descripción',
                    icon: 'fa-sun',
                    fields: [
                        { id: 'margarita-hero-img', label: 'Imagen Hero', type: 'image', defaultImg: 'assets/IMG_4118.JPG' },
                        { id: 'margarita-title', label: 'Título Principal', type: 'text', defaultText: 'Margarita y Coche: El Encanto de las Islas' },
                        { id: 'margarita-desc', label: 'Descripción General', type: 'textarea', defaultText: 'Desde la vibrante Isla de Margarita hasta la paz absoluta de las arenas blancas de la Isla de Coche. Disfruta de atardeceres inolvidables, deportes acuáticos de clase mundial y la calidez de nuestra gente.' }
                    ]
                },
                {
                    title: 'Atractivos de Margarita & Coche',
                    icon: 'fa-star',
                    fields: [
                        { id: 'margarita-a1-title', label: 'Atractivo 1 - Título', type: 'text', defaultText: 'El Yaque (Meca Mundial del Viento)' },
                        { id: 'margarita-a1-text', label: 'Atractivo 1 - Texto', type: 'textarea', defaultText: 'Reconocida mundialmente por sus condiciones ideales de viento alisio, agua tibia y poca profundidad para el Windsurf y Kitesurf.' },
                        { id: 'margarita-a2-title', label: 'Atractivo 2 - Título', type: 'text', defaultText: 'Isla de Coche (Arenas Blancas & Paz)' },
                        { id: 'margarita-a2-text', label: 'Atractivo 2 - Texto', type: 'textarea', defaultText: 'A 20 minutos en lancha rápida. Un oasis de paz absoluta con mar espejo ideal para la práctica de Wingfoil y relax total.' },
                        { id: 'margarita-a3-title', label: 'Atractivo 3 - Título', type: 'text', defaultText: 'Archipiélago Los Frailes' },
                        { id: 'margarita-a3-text', label: 'Atractivo 3 - Texto', type: 'textarea', defaultText: 'Grupo de islotes rocosos rodeados de agua transparente habitados por mantarrayas, tortugas y cardúmenes de peces tropicales.' }
                    ]
                }
            ]
        },
        losroques: {
            label: 'Destino: Los Roques',
            icon: 'fa-water',
            pageFile: 'destino-losroques.html',
            sections: [
                {
                    title: 'Hero & Descripción',
                    icon: 'fa-sailboat',
                    fields: [
                        { id: 'losroques-hero-img', label: 'Imagen Hero', type: 'image', defaultImg: 'assets/IMG_4161.JPG' },
                        { id: 'losroques-title', label: 'Título Principal', type: 'text', defaultText: 'Los Roques: El Santuario del Viento y Cristal' },
                        { id: 'losroques-desc', label: 'Descripción General', type: 'textarea', defaultText: 'Considerado uno de los archipiélagos coralinos más prístinos del planeta. Aguas totalmente planas ("flat water"), viento alisio constante de 18 a 25 nudos y una visibilidad submarina infinita.' }
                    ]
                },
                {
                    title: 'Atractivos de Los Roques',
                    icon: 'fa-star',
                    fields: [
                        { id: 'losroques-a1-title', label: 'Atractivo 1 - Título', type: 'text', defaultText: 'Cayo Francisquí & Cayo de Agua' },
                        { id: 'losroques-a1-text', label: 'Atractivo 1 - Texto', type: 'textarea', defaultText: 'Piscinas naturales protegidas por arrecifes de coral y la famosa barra de arena blanca votada entre las mejores del mundo.' },
                        { id: 'losroques-a2-title', label: 'Atractivo 2 - Título', type: 'text', defaultText: 'Viento Continuo 18-25 Nudos' },
                        { id: 'losroques-a2-text', label: 'Atractivo 2 - Texto', type: 'textarea', defaultText: 'Brisa constante y pareja de Noviembre a Junio. Condiciones de entrenamiento e instrucción de nivel internacional.' },
                        { id: 'losroques-a3-title', label: 'Atractivo 3 - Título', type: 'text', defaultText: 'Barrera Coralina & PADI' },
                        { id: 'losroques-a3-text', label: 'Atractivo 3 - Texto', type: 'textarea', defaultText: 'Paredes profundas de coral vivo, pecios hundidos, tortugas marinas y certificación PADI Open Water completa.' }
                    ]
                },
                {
                    title: 'Safaris Acuáticos en Los Roques',
                    icon: 'fa-compass',
                    fields: [
                        { id: 'losroques-s1-title', label: 'Safari 1 - Título', type: 'text', defaultText: 'Kitesurf Experience' },
                        { id: 'losroques-s1-desc', label: 'Safari 1 - Descripción', type: 'textarea', defaultText: 'Navegación en agua plana de Francisquí y downwinders extremos a Cayo de Agua con lancha de apoyo privada.' },
                        { id: 'losroques-s2-title', label: 'Safari 2 - Título', type: 'text', defaultText: 'Windsurf Paradise' },
                        { id: 'losroques-s2-desc', label: 'Safari 2 - Descripción', type: 'textarea', defaultText: 'Planeo ilimitado en la laguna turquesa de Gran Roque con tablas y velas de marcas líderes.' },
                        { id: 'losroques-s3-title', label: 'Safari 3 - Título', type: 'text', defaultText: 'Wingfoil Levitation' },
                        { id: 'losroques-s3-desc', label: 'Safari 3 - Descripción', type: 'textarea', defaultText: 'Aprende a levitar sobre el agua con remo o remolque de lancha (towing) seguido de vuelo independiente.' },
                        { id: 'losroques-s4-title', label: 'Safari 4 - Título', type: 'text', defaultText: 'Buceo PADI 6 Días' },
                        { id: 'losroques-s4-desc', label: 'Safari 4 - Descripción', type: 'textarea', defaultText: 'Curso completo Open Water PADI con 4 inmersiones en mar abierto, pecios y fotos submarinas HD.' }
                    ]
                }
            ]
        },
        canaima: {
            label: 'Destino: Canaima',
            icon: 'fa-mountain-sun',
            pageFile: 'destino-canaima.html',
            sections: [
                {
                    title: 'Hero & Descripción',
                    icon: 'fa-tree',
                    fields: [
                        { id: 'canaima-hero-img', label: 'Imagen Hero', type: 'image', defaultImg: 'assets/IMG_4129.JPG' },
                        { id: 'canaima-title', label: 'Título Principal', type: 'text', defaultText: 'Canaima y Salto Ángel: La Tierra Sagrada' },
                        { id: 'canaima-desc', label: 'Descripción General', type: 'textarea', defaultText: 'Navega los ríos de agua roja teñida por minerales ancestrales hasta la caída de agua más alta del planeta (979 metros). Una aventura mística entre tepuyes millonarios.' }
                    ]
                },
                {
                    title: 'Atractivos de Canaima',
                    icon: 'fa-star',
                    fields: [
                        { id: 'canaima-a1-title', label: 'Atractivo 1 - Título', type: 'text', defaultText: 'Salto Ángel (Kerepakupai Vená)' },
                        { id: 'canaima-a1-text', label: 'Atractivo 1 - Texto', type: 'textarea', defaultText: 'La caída de agua ininterrumpida más alta del mundo con 979 metros cayendo desde el Auyantepuy.' },
                        { id: 'canaima-a2-title', label: 'Atractivo 2 - Título', type: 'text', defaultText: 'Laguna de Canaima & Saltos' },
                        { id: 'canaima-a2-text', label: 'Atractivo 2 - Texto', type: 'textarea', defaultText: 'Navegación en curiaras tradicionales frente a los saltos Ucaima, Golondrina, Wadaima y Hacha.' },
                        { id: 'canaima-a3-title', label: 'Atractivo 3 - Título', type: 'text', defaultText: 'Cultura Pemón & Tepuyes' },
                        { id: 'canaima-a3-text', label: 'Atractivo 3 - Texto', type: 'textarea', defaultText: 'Conexión con las comunidades indígenas pemones en un paisaje místico de formaciones geológicas de más de 2.000 millones de años.' }
                    ]
                }
            ]
        },
        nosotros: {
            label: 'Nosotros',
            icon: 'fa-users',
            pageFile: 'nosotros.html',
            sections: [
                {
                    title: 'Encabezado',
                    icon: 'fa-heading',
                    fields: [
                        { id: 'nos-title', label: 'Título', type: 'text', defaultText: 'Confianza y Pasión por Venezuela' },
                        { id: 'nos-subtitle', label: 'Subtítulo', type: 'textarea', defaultText: 'Creemos que la gente compra confianza antes que un viaje. Nuestra historia nace del amor profundo por Venezuela y el deseo de mostrar su cara más auténtica al mundo.' }
                    ]
                },
                {
                    title: 'Perfil del Fundador',
                    icon: 'fa-user-tie',
                    fields: [
                        { id: 'nos-founder-img', label: 'Foto Fundador', type: 'image', defaultImg: 'assets/IMG_4162.JPG' },
                        { id: 'nos-founder-name', label: 'Nombre', type: 'text', defaultText: 'Ricardo "Ricky"' },
                        { id: 'nos-founder-role', label: 'Cargo / Rol', type: 'text', defaultText: 'Fundador & Anfitrión (Base en Austria)' },
                        { id: 'nos-bio1', label: 'Bio Párrafo 1', type: 'textarea', defaultText: 'Desde nuestra base en Austria, diseñamos experiencias de turismo responsable que apoyan directamente a proveedores locales, garantizando que cada viaje sea un intercambio justo y enriquecedor.' },
                        { id: 'nos-bio2', label: 'Bio Párrafo 2', type: 'textarea', defaultText: 'Somos tus anfitriones en una tierra que conocemos y amamos, comprometidos con la calidad y la personalización total de tu aventura: desde la metrópolis cultural de Caracas y la selva marina de Choroní, hasta la paz caribeña de Margarita, Coche y los safaris acuáticos en Los Roques.' }
                    ]
                },
                {
                    title: 'Credenciales & Pilares',
                    icon: 'fa-shield-halved',
                    fields: [
                        { id: 'nos-c1-title', label: 'Credencial 1 - Título', type: 'text', defaultText: 'Explorando Los Roques' },
                        { id: 'nos-c2-title', label: 'Credencial 2 - Título', type: 'text', defaultText: 'Reef-Safe & Zero Plastic' }
                    ]
                },
                {
                    title: 'Banner CTA Tripulación',
                    icon: 'fa-bullhorn',
                    fields: [
                        { id: 'nos-cta-title', label: 'Título CTA', type: 'text', defaultText: '¿Quieres Conocer a la Tripulación?' },
                        { id: 'nos-cta-desc', label: 'Descripción CTA', type: 'textarea', defaultText: 'Únete a nuestras próximas expediciones en grupos reducidos de 10 a 15 personas.' }
                    ]
                }
            ]
        },
        paquetes: {
            label: 'Paquetes All-In-One',
            icon: 'fa-suitcase',
            pageFile: 'paquetes.html',
            sections: [
                {
                    title: 'Encabezado',
                    icon: 'fa-heading',
                    fields: [
                        { id: 'paq-title', label: 'Título', type: 'text', defaultText: 'Tú Solo Preocúpate de Disfrutar' },
                        { id: 'paq-subtitle', label: 'Subtítulo', type: 'textarea', defaultText: 'Nos encargamos de absolutamente toda la logística desde tu llegada al aeropuerto de Caracas hasta cada traslado diario a los cayos vírgenes.' }
                    ]
                },
                {
                    title: 'Showcase Principal',
                    icon: 'fa-image',
                    fields: [
                        { id: 'paq-showcase-img', label: 'Foto Principal', type: 'image', defaultImg: 'assets/IMG_4161.JPG' },
                        { id: 'paq-showcase-badge', label: 'Etiqueta Badge', type: 'text', defaultText: 'Alojamiento B&B Incluido' },
                        { id: 'paq-showcase-title', label: 'Título Showcase', type: 'text', defaultText: 'Posadas Seleccionadas con Encanto Caribeño' }
                    ]
                },
                {
                    title: 'Features Incluidos',
                    icon: 'fa-check-double',
                    fields: [
                        { id: 'paq-feature1-title', label: 'Feature 1 - Título', type: 'text', defaultText: 'Alojamiento B&B Seleccionado' },
                        { id: 'paq-feature1-text', label: 'Feature 1 - Descripción', type: 'textarea', defaultText: 'Habitaciones VIP con A/C, baño privado, desayunos frescos y cenas gourmet de pescado fresco frente al mar.' },
                        { id: 'paq-feature2-title', label: 'Feature 2 - Título', type: 'text', defaultText: 'Logística Completa de Vuelos & Lanchas' },
                        { id: 'paq-feature2-text', label: 'Feature 2 - Descripción', type: 'textarea', defaultText: 'Recibimiento VIP en Caracas, pasajes de avión charter Caracas–Los Roques–Caracas y embarcaciones diarias equipadas.' },
                        { id: 'paq-feature3-title', label: 'Feature 3 - Título', type: 'text', defaultText: 'Equipos Deportivos Top & Hidratación' },
                        { id: 'paq-feature3-text', label: 'Feature 3 - Descripción', type: 'textarea', defaultText: 'Cavas con hielo, fruta fresca y agua mineral ilimitada en cada playa. Equipos de kite/wind/wing de última generación.' },
                        { id: 'paq-extras', label: 'Actividades Extra (Lifestyle)', type: 'textarea', defaultText: 'Sessions de SUP al atardecer, Snorkel con tortugas en arrecifes, Yoga en la playa al amanecer, opción de Skydiving (Salto en paracaídas con César) y hogueras nocturnas bajo las estrellas.' }
                    ]
                }
            ]
        },
        contacto: {
            label: 'Contacto & Cotizador',
            icon: 'fa-envelope',
            pageFile: 'contacto.html',
            sections: [
                {
                    title: 'Encabezado',
                    icon: 'fa-heading',
                    fields: [
                        { id: 'con-title', label: 'Título Principal', type: 'text', defaultText: 'Personaliza Tu Experiencia' },
                        { id: 'con-subtitle', label: 'Subtítulo', type: 'textarea', defaultText: 'Calcula un estimado de tu paquete según deporte, nivel y número de participantes.' }
                    ]
                },
                {
                    title: 'Datos Directos de Contacto',
                    icon: 'fa-address-card',
                    fields: [
                        { id: 'con-whatsapp', label: 'Número WhatsApp', type: 'text', defaultText: '+58 412 000 0000' },
                        { id: 'con-email', label: 'Email Oficial', type: 'text', defaultText: 'info@rickywaterman.com' },
                        { id: 'con-instagram', label: 'Instagram', type: 'text', defaultText: '@rickywaterman' }
                    ]
                },
                {
                    title: 'Tarjeta Lateral del Formulario',
                    icon: 'fa-id-card',
                    fields: [
                        { id: 'con-hero-title', label: 'Título Tarjeta Lateral', type: 'text', defaultText: 'Únete a la Tripulación' },
                        { id: 'con-hero-desc', label: 'Texto Tarjeta Lateral', type: 'textarea', defaultText: 'Escríbenos tus fechas estimadas y deporte de interés. Diseñaremos un itinerario a tu medida en menos de 24 horas.' }
                    ]
                }
            ]
        },
        experiencia: {
            label: 'La Experiencia',
            icon: 'fa-star',
            pageFile: 'experiencia.html',
            sections: [
                {
                    title: 'Encabezado',
                    icon: 'fa-heading',
                    fields: [
                        { id: 'exp-title', label: 'Título', type: 'text', defaultText: 'Más Que Un Viaje, Una Transformación' },
                        { id: 'exp-subtitle', label: 'Subtítulo', type: 'textarea', defaultText: 'Nos apasiona el mar y queremos compartir esa devoción contigo en uno de nuestros rincones favoritos de la Tierra: el archipiélago de Los Roques.' }
                    ]
                },
                {
                    title: '3 Pilares de Filosofía',
                    icon: 'fa-layer-group',
                    fields: [
                        { id: 'exp-p1-title', label: 'Pilar 1 - Título', type: 'text', defaultText: '1. Adrenalina & Progresión' },
                        { id: 'exp-p1-text', label: 'Pilar 1 - Texto', type: 'textarea', defaultText: 'No importa si estás comenzando desde cero o si buscas volar en safaris de kite extremos. Nuestros entrenadores certificados garantizan que avances a tu máximo potencial de forma 100% segura.' },
                        { id: 'exp-p1-badge', label: 'Pilar 1 - Badge', type: 'text', defaultText: 'Equipos de última generación incluidos' },
                        { id: 'exp-p2-title', label: 'Pilar 2 - Título', type: 'text', defaultText: '2. Naturaleza Caribeña Virgen' },
                        { id: 'exp-p2-text', label: 'Pilar 2 - Texto', type: 'textarea', defaultText: 'Los Roques es un Parque Nacional protegido de belleza hipnótica. Navegaremos a cayos desiertos, barras de arena blanca impecable y barreras de coral llenas de vida marina sin multitudes.' },
                        { id: 'exp-p2-badge', label: 'Pilar 2 - Badge', type: 'text', defaultText: 'Compromiso 100% Eco-Ocean (Zero plastic)' },
                        { id: 'exp-p3-title', label: 'Pilar 3 - Título', type: 'text', defaultText: '3. Comunidad & Vibra Local' },
                        { id: 'exp-p3-text', label: 'Pilar 3 - Texto', type: 'textarea', defaultText: 'Viajamos en grupos reducidos de 10 a 15 personas. Crearás lazos de amistad genuinos con viajeros afines, disfrutando de cenas frente al mar, música y la calidez del pueblo pesquero.' },
                        { id: 'exp-p3-badge', label: 'Pilar 3 - Badge', type: 'text', defaultText: 'Guías locales y expertos náuticos' }
                    ]
                },
                {
                    title: 'Galería de Fotos',
                    icon: 'fa-images',
                    fields: [
                        { id: 'exp-gal1', label: 'Foto Galería 1', type: 'image', defaultImg: 'assets/IMG_4118.JPG' },
                        { id: 'exp-gal1-caption', label: 'Caption 1', type: 'text', defaultText: 'Aguas Turquesas Cristalinas' },
                        { id: 'exp-gal2', label: 'Foto Galería 2', type: 'image', defaultImg: 'assets/IMG_4128.JPG' },
                        { id: 'exp-gal2-caption', label: 'Caption 2', type: 'text', defaultText: 'Kite Safaris en Lancha' },
                        { id: 'exp-gal3', label: 'Foto Galería 3', type: 'image', defaultImg: 'assets/IMG_4160.JPG' },
                        { id: 'exp-gal3-caption', label: 'Caption 3', type: 'text', defaultText: 'Cayos Vírgenes Remotos' },
                        { id: 'exp-gal4', label: 'Foto Galería 4', type: 'image', defaultImg: 'assets/IMG_4165.JPG' },
                        { id: 'exp-gal4-caption', label: 'Caption 4', type: 'text', defaultText: 'Atardeceres Únicos' }
                    ]
                }
            ]
        },
        faq: {
            label: 'Preguntas Frecuentes',
            icon: 'fa-circle-question',
            pageFile: 'prepara-tu-viaje.html',
            sections: [
                {
                    title: 'Encabezado',
                    icon: 'fa-heading',
                    fields: [
                        { id: 'faq-title', label: 'Título', type: 'text', defaultText: 'Preguntas Frecuentes' },
                        { id: 'faq-subtitle', label: 'Subtítulo', type: 'textarea', defaultText: 'Todo lo que necesitas saber antes de empacar tu traje de baño y volar al paraíso caribeño de Los Roques.' }
                    ]
                },
                {
                    title: 'Lista de Preguntas y Respuestas',
                    icon: 'fa-comments',
                    fields: [
                        { id: 'faq-q1', label: 'Pregunta 1', type: 'text', defaultText: '¿Cómo gestiono los vuelos hasta Los Roques?' },
                        { id: 'faq-a1', label: 'Respuesta 1', type: 'textarea', defaultText: 'Te asesoramos en la compra de tu vuelo internacional con destino al Aeropuerto de Caracas (CCS). Una vez allí, nosotros nos encargamos de reservar tus pasajes domésticos en avión chárter privado directo a Los Roques (40 min de vuelo) y del acompañamiento VIP en el terminal.' },
                        { id: 'faq-q2', label: 'Pregunta 2', type: 'text', defaultText: '¿Necesito visa para ingresar a Venezuela?' },
                        { id: 'faq-a2', label: 'Respuesta 2', type: 'textarea', defaultText: 'La mayoría de los ciudadanos europeos, británicos y latinoamericanos pueden ingresar como turistas por hasta 90 días con solo pasaporte vigente (mínimo 6 meses). Te daremos todos los requerimientos migratorios vigentes antes de tu salida.' },
                        { id: 'faq-q3', label: 'Pregunta 3', type: 'text', defaultText: '¿Qué debo empacar en mi equipaje? (Checklist)' },
                        { id: 'faq-a3', label: 'Respuesta 3', type: 'textarea', defaultText: 'Protector solar Reef-Safe (biodegradable), Lycras con protección UV / Neopreno ligero 1.5mm, Gafas de sol polarizadas con sujetador acuático, Sombrero o gorra protectora, Ropa ligera de algodón/lino para las noches y Repelente biodegradable de mosquitos.' },
                        { id: 'faq-q4', label: 'Pregunta 4', type: 'text', defaultText: '¿Tengo que llevar mi propio equipo deportivo?' },
                        { id: 'faq-a4', label: 'Respuesta 4', type: 'textarea', defaultText: 'No es necesario. Todos nuestros paquetes incluyen equipos de primera categoría (kites, tablas, arneses, velas, tanques y reguladores). Si prefieres traer tus propias cometas, te ayudaremos a coordinar el sobrepeso de equipaje en la aerolínea local.' },
                        { id: 'faq-q5', label: 'Pregunta 5', type: 'text', defaultText: '¿Cómo se compone el grupo de viaje?' },
                        { id: 'faq-a5', label: 'Respuesta 5', type: 'textarea', defaultText: 'Organizamos grupos pequeños de 10 a 15 personas apasionadas por el mar y la naturaleza. Pueden unirse viajeros individuales, parejas, amigos o familias. Promovemos un ambiente cálido, inclusivo y lleno de compañerismo.' }
                    ]
                }
            ]
        }
    };

    let currentPage = 'index';
    let cmsData = {};

    // ===================== INIT =====================
    function init() {
        loadData();
        setupLogin();
        renderSidebar();
        switchPage('index');
        setupHamburger();
        checkServerStatus();
    }

    // ===================== POPULATE DEFAULTS =====================
    function populateDefaults() {
        Object.keys(PAGES).forEach(function (pageKey) {
            var page = PAGES[pageKey];
            page.sections.forEach(function (section) {
                section.fields.forEach(function (field) {
                    if (!cmsData[field.id]) {
                        cmsData[field.id] = {};
                    }
                    if (cmsData[field.id].text === undefined && field.defaultText !== undefined) {
                        cmsData[field.id].text = field.defaultText;
                    }
                    if (!cmsData[field.id].img && field.defaultImg) {
                        cmsData[field.id].img = field.defaultImg;
                    }
                    if (!cmsData[field.id].video && field.defaultVideo) {
                        cmsData[field.id].video = field.defaultVideo;
                    }
                });
            });
        });
    }

    // ===================== STORAGE & SERVER API =====================
    function loadData() {
        fetch('/api/cms')
            .then(function (res) { return res.json(); })
            .then(function (resData) {
                if (resData && resData.success && resData.data) {
                    cmsData = resData.data;
                    populateDefaults();
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(cmsData));
                    if (PAGES[currentPage]) renderEditor(PAGES[currentPage]);
                } else {
                    loadFromLocalStorage();
                }
            })
            .catch(function () {
                loadFromLocalStorage();
            });
    }

    function loadFromLocalStorage() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            cmsData = raw ? JSON.parse(raw) : {};
        } catch (e) {
            cmsData = {};
        }
        populateDefaults();
    }

    function saveData() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cmsData));
        } catch (e) {}

        showToast('Guardando en la base de datos del servidor...', 'info');
        fetch('/api/cms', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cmsData)
        })
        .then(function (res) { return res.json(); })
        .then(function (resData) {
            if (resData && resData.success) {
                showToast('✅ Cambios guardados en el servidor y sincronizados globalmente', 'success');
                checkServerStatus();
            } else {
                showToast('Guardado en caché local (Servidor no respondió)', 'info');
            }
        })
        .catch(function () {
            showToast('Guardado localmente en navegador', 'info');
        });
    }

    function checkServerStatus() {
        fetch('/api/status')
            .then(function (res) { return res.json(); })
            .then(function (data) {
                var badge = document.getElementById('server-status-badge');
                if (badge) {
                    badge.innerHTML = '<i class="fa-solid fa-server"></i> Servidor Activo (' + data.dbSizeKB + ' KB DB / ' + data.uploadsCount + ' archivos ' + (data.uploadsSizeMB || '0') + ' MB / ' + (data.backupsCount || '0') + ' backups)';
                    badge.className = 'status-badge status-online';
                }
            })
            .catch(function () {
                var badge = document.getElementById('server-status-badge');
                if (badge) {
                    badge.innerHTML = '<i class="fa-solid fa-database"></i> Modo Local (Navegador)';
                    badge.className = 'status-badge status-offline';
                }
            });
    }

    // ===================== LOGIN =====================
    function setupLogin() {
        const overlay = document.getElementById('login-overlay');
        const form = document.getElementById('login-form');
        const errorEl = document.getElementById('login-error');

        if (sessionStorage.getItem('waterman_admin_auth') === 'true') {
            overlay.classList.add('hidden');
            return;
        }

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const pass = document.getElementById('login-pass').value;
            if (pass === ADMIN_PASS) {
                sessionStorage.setItem('waterman_admin_auth', 'true');
                overlay.classList.add('hidden');
                showToast('Bienvenido al panel de administración', 'success');
            } else {
                errorEl.textContent = 'Contraseña incorrecta';
                document.getElementById('login-pass').value = '';
            }
        });
    }

    // ===================== SIDEBAR =====================
    function renderSidebar() {
        const nav = document.getElementById('sidebar-nav');
        let html = '<div class="nav-group-label">Páginas del Sitio</div>';

        Object.keys(PAGES).forEach(function (key) {
            const page = PAGES[key];
            html += '<button class="admin-nav-item' + (key === currentPage ? ' active' : '') + '" data-page="' + key + '">';
            html += '<i class="fa-solid ' + page.icon + '"></i>';
            html += page.label;
            html += '</button>';
        });

        nav.innerHTML = html;

        nav.querySelectorAll('.admin-nav-item').forEach(function (btn) {
            btn.addEventListener('click', function () {
                switchPage(this.getAttribute('data-page'));
                closeSidebarMobile();
            });
        });
    }

    // ===================== PAGE SWITCHING =====================
    function switchPage(pageKey) {
        currentPage = pageKey;
        const page = PAGES[pageKey];

        document.querySelectorAll('.admin-nav-item').forEach(function (btn) {
            btn.classList.toggle('active', btn.getAttribute('data-page') === pageKey);
        });

        document.getElementById('topbar-title').textContent = page.label;
        renderEditor(page);
    }

    // ===================== EDITOR RENDERING =====================
    function renderEditor(page) {
        const container = document.getElementById('editor-content');
        let html = '';

        page.sections.forEach(function (section) {
            html += '<div class="editor-section">';
            html += '<div class="editor-section-header">';
            html += '<i class="fa-solid ' + section.icon + '"></i>';
            html += '<h3>' + section.title + '</h3>';
            html += '<span class="section-badge">' + section.fields.length + ' campos</span>';
            html += '</div>';

            section.fields.forEach(function (field) {
                html += renderField(field);
            });

            html += '</div>';
        });

        container.innerHTML = html;
        bindFieldEvents();
    }

    function renderField(field) {
        var value = cmsData[field.id];
        var currentText = (value && value.text !== undefined) ? value.text : (field.defaultText !== undefined ? field.defaultText : '');
        var currentImg = (value && value.img) ? value.img : (field.defaultImg || '');
        var currentVid = (value && value.video) ? value.video : (field.defaultVideo || '');

        var html = '<div class="editor-card">';
        html += '<div class="editor-card-label">';

        if (field.type === 'image') {
            html += '<i class="fa-solid fa-image"></i>';
        } else if (field.type === 'video') {
            html += '<i class="fa-solid fa-video"></i>';
        } else {
            html += '<i class="fa-solid fa-font"></i>';
        }
        html += field.label + '</div>';

        if (field.type === 'text') {
            html += '<input class="admin-input" type="text" data-field-id="' + field.id + '" ';
            html += 'placeholder="' + (field.placeholder || '') + '" ';
            html += 'value="' + escapeAttr(currentText) + '">';
        } else if (field.type === 'textarea') {
            html += '<textarea class="admin-textarea" data-field-id="' + field.id + '" rows="3" ';
            html += 'placeholder="' + (field.placeholder || '') + '">';
            html += escapeHtml(currentText) + '</textarea>';
        } else if (field.type === 'image') {
            var imgSrc = currentImg;
            html += '<div class="img-upload-area' + (imgSrc ? ' has-preview' : '') + '" data-field-id="' + field.id + '">';
            html += '<input type="file" accept="image/*" data-field-id="' + field.id + '">';
            if (imgSrc) {
                html += '<img src="' + imgSrc + '" class="img-preview" alt="Preview">';
                html += '<button class="remove-img-btn" data-field-id="' + field.id + '" title="Eliminar"><i class="fa-solid fa-xmark"></i></button>';
            } else {
                html += '<div class="upload-placeholder">';
                html += '<i class="fa-solid fa-cloud-arrow-up"></i>';
                html += 'Haz clic o arrastra una imagen aquí';
                html += '</div>';
            }
            html += '</div>';
        } else if (field.type === 'video') {
            var vidSrc = currentVid;
            html += '<div class="img-upload-area' + (vidSrc ? ' has-preview' : '') + '" data-field-id="' + field.id + '">';
            html += '<input type="file" accept="video/mp4,video/webm" data-field-id="' + field.id + '">';
            if (vidSrc) {
                html += '<video class="img-preview" style="height:200px" autoplay muted loop playsinline><source src="' + vidSrc + '"></video>';
                html += '<button class="remove-img-btn" data-field-id="' + field.id + '" title="Eliminar"><i class="fa-solid fa-xmark"></i></button>';
            } else {
                html += '<div class="upload-placeholder">';
                html += '<i class="fa-solid fa-video"></i>';
                html += 'Haz clic para subir un video MP4';
                html += '</div>';
            }
            html += '</div>';
        }

        html += '</div>';
        return html;
    }

    // ===================== EVENT BINDING =====================
    function bindFieldEvents() {
        document.querySelectorAll('.admin-input[data-field-id], .admin-textarea[data-field-id]').forEach(function (el) {
            el.addEventListener('input', function () {
                var id = this.getAttribute('data-field-id');
                if (!cmsData[id]) cmsData[id] = {};
                cmsData[id].text = this.value;
            });
        });

        document.querySelectorAll('.img-upload-area input[type="file"]').forEach(function (input) {
            input.addEventListener('change', function () {
                var file = this.files[0];
                if (!file) return;
                var id = this.getAttribute('data-field-id');

                showToast('Subiendo archivo al servidor...', 'info');

                var formData = new FormData();
                formData.append('file', file);

                fetch('/api/upload', {
                    method: 'POST',
                    body: formData
                })
                .then(function (res) { return res.json(); })
                .then(function (resData) {
                    if (resData && resData.success && resData.url) {
                        if (!cmsData[id]) cmsData[id] = {};
                        if (file.type.startsWith('video/')) {
                            cmsData[id].video = resData.url;
                        } else {
                            cmsData[id].img = resData.url;
                        }
                        renderEditor(PAGES[currentPage]);
                        showToast('✅ Archivo subido al servidor (' + (file.size / 1024 / 1024).toFixed(2) + ' MB)', 'success');
                        checkServerStatus();
                    } else {
                        fallbackLocalUpload(file, id);
                    }
                })
                .catch(function () {
                    fallbackLocalUpload(file, id);
                });
            });
        });

        function fallbackLocalUpload(file, id) {
            if (file.type.startsWith('video/')) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    if (!cmsData[id]) cmsData[id] = {};
                    cmsData[id].video = e.target.result;
                    renderEditor(PAGES[currentPage]);
                };
                reader.readAsDataURL(file);
            } else {
                compressImageFile(file, function (compressedUrl) {
                    if (!cmsData[id]) cmsData[id] = {};
                    cmsData[id].img = compressedUrl;
                    renderEditor(PAGES[currentPage]);
                    showToast('Imagen comprimida guardada en navegador', 'info');
                });
            }
        }

        document.querySelectorAll('.remove-img-btn').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                var id = this.getAttribute('data-field-id');
                if (cmsData[id]) {
                    delete cmsData[id].img;
                    delete cmsData[id].video;
                }
                renderEditor(PAGES[currentPage]);
            });
        });
    }

    // ===================== HAMBURGER =====================
    function setupHamburger() {
        var hamburger = document.getElementById('hamburger-btn');
        if (hamburger) hamburger.addEventListener('click', toggleSidebarMobile);

        var overlay = document.getElementById('sidebar-overlay');
        if (overlay) overlay.addEventListener('click', closeSidebarMobile);
    }

    function toggleSidebarMobile() {
        document.getElementById('admin-sidebar').classList.toggle('open');
        document.getElementById('sidebar-overlay').classList.toggle('open');
    }

    function closeSidebarMobile() {
        document.getElementById('admin-sidebar').classList.remove('open');
        document.getElementById('sidebar-overlay').classList.remove('open');
    }

    // ===================== LIVE PREVIEW ENGINE =====================
    window.adminLivePreview = function () {
        var modal = document.getElementById('live-preview-modal');
        var iframe = document.getElementById('preview-iframe');
        if (!modal || !iframe) return;

        var targetPageFile = PAGES[currentPage].pageFile || 'index.html';
        showToast('Cargando vista previa en tiempo real...', 'info');

        iframe.onload = function () {
            try {
                var doc = iframe.contentDocument || iframe.contentWindow.document;
                if (!doc) return;

                // Inject current in-memory draft cmsData into iframe DOM
                Object.keys(cmsData).forEach(function (id) {
                    var entry = cmsData[id];
                    var el = doc.querySelector('[data-cms-id="' + id + '"]');
                    if (!el) return;

                    if (entry.text !== undefined && entry.text !== null && entry.text !== '') {
                        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                            el.value = entry.text;
                        } else {
                            el.innerHTML = entry.text;
                        }
                    }
                    if (entry.img && el.tagName === 'IMG') el.src = entry.img;
                    if (entry.video && el.tagName === 'VIDEO') {
                        var source = el.querySelector('source');
                        if (source) source.src = entry.video;
                        el.load();
                    }
                });
            } catch (err) {
                console.warn('Error patching preview iframe:', err);
            }
        };

        iframe.src = targetPageFile + '?preview=' + Date.now();
        modal.classList.add('open');
    };

    window.closeLivePreview = function () {
        var modal = document.getElementById('live-preview-modal');
        if (modal) modal.classList.remove('open');
    };

    window.setPreviewDevice = function (device) {
        var wrapper = document.querySelector('.admin-preview-iframe-wrapper');
        if (!wrapper) return;

        wrapper.className = 'admin-preview-iframe-wrapper ' + device;

        document.querySelectorAll('.preview-device-toggle .device-btn').forEach(function (btn) {
            btn.classList.remove('active');
        });
        if (event && event.currentTarget) {
            event.currentTarget.classList.add('active');
        }
    };

    // ===================== SERVER BACKUPS ENGINE =====================
    window.adminOpenBackupsModal = function () {
        var modal = document.getElementById('backups-modal');
        if (modal) modal.classList.add('open');
        fetchServerBackupsList();
    };

    window.closeBackupsModal = function () {
        var modal = document.getElementById('backups-modal');
        if (modal) modal.classList.remove('open');
    };

    function fetchServerBackupsList() {
        var container = document.getElementById('backups-list-container');
        if (!container) return;

        container.innerHTML = '<div style="text-align:center;padding:2rem;color:var(--admin-text-dim);"><i class="fa-solid fa-spinner fa-spin" style="font-size:1.5rem"></i> Cargando...</div>';

        fetch('/api/backups')
            .then(function (res) { return res.json(); })
            .then(function (data) {
                if (data && data.success && data.backups && data.backups.length > 0) {
                    var html = '';
                    data.backups.forEach(function (b) {
                        var dateStr = new Date(b.mtime).toLocaleString('es-ES');
                        html += '<div class="backup-item-row">';
                        html += '<div class="backup-info">';
                        html += '<span class="backup-name"><i class="fa-solid fa-file-code" style="color:var(--admin-accent);margin-right:0.4rem"></i>' + escapeHtml(b.filename) + '</span>';
                        html += '<span class="backup-meta">' + dateStr + ' • ' + b.sizeKB + ' KB</span>';
                        html += '</div>';
                        html += '<button class="admin-btn admin-btn-sm admin-btn-success" onclick="adminRestoreServerBackup(\'' + escapeAttr(b.filename) + '\')">';
                        html += '<i class="fa-solid fa-rotate-left"></i> Restaurar';
                        html += '</button>';
                        html += '</div>';
                    });
                    container.innerHTML = html;
                } else {
                    container.innerHTML = '<div style="text-align:center;padding:2rem;color:var(--admin-text-dim);">No hay copias de seguridad aún. Haz clic en "Crear Nueva Copia".</div>';
                }
            })
            .catch(function () {
                container.innerHTML = '<div style="text-align:center;padding:2rem;color:var(--admin-danger);">Error al cargar las copias de seguridad desde el servidor.</div>';
            });
    }

    window.adminCreateServerBackup = function () {
        showToast('Generando copia de seguridad...', 'info');
        fetch('/api/backups/create', { method: 'POST' })
            .then(function (res) { return res.json(); })
            .then(function (data) {
                if (data && data.success) {
                    showToast('✅ Copia de seguridad creada con éxito', 'success');
                    fetchServerBackupsList();
                    checkServerStatus();
                } else {
                    showToast('Error al crear copia de seguridad', 'error');
                }
            })
            .catch(function () {
                showToast('Error de conexión con el servidor', 'error');
            });
    };

    window.adminRestoreServerBackup = function (filename) {
        if (!confirm('¿Seguro que quieres restaurar la copia "' + filename + '"? El estado actual cambiará a esa versión.')) return;

        showToast('Restaurando copia de seguridad...', 'info');
        fetch('/api/backups/restore', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename: filename })
        })
        .then(function (res) { return res.json(); })
        .then(function (resData) {
            if (resData && resData.success && resData.data) {
                cmsData = resData.data;
                populateDefaults();
                localStorage.setItem(STORAGE_KEY, JSON.stringify(cmsData));
                renderEditor(PAGES[currentPage]);
                closeBackupsModal();
                showToast('✅ Sitio restaurado con éxito a ' + filename, 'success');
                checkServerStatus();
            } else {
                showToast('Error al restaurar copia de seguridad', 'error');
            }
        })
        .catch(function () {
            showToast('Error de conexión al restaurar', 'error');
        });
    };

    // ===================== GLOBAL ACTIONS =====================
    window.adminSave = function () {
        saveData();
    };

    window.adminPreview = function () {
        var targetPageFile = PAGES[currentPage].pageFile || 'index.html';
        window.open(targetPageFile, '_blank');
    };

    window.adminExport = function () {
        var dataStr = JSON.stringify(cmsData, null, 2);
        var blob = new Blob([dataStr], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'waterman-cms-backup-' + new Date().toISOString().slice(0, 10) + '.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast('Backup descargado correctamente', 'success');
    };

    window.adminImport = function () {
        var input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.addEventListener('change', function () {
            var file = this.files[0];
            if (!file) return;
            var reader = new FileReader();
            reader.onload = function (e) {
                try {
                    var imported = JSON.parse(e.target.result);
                    cmsData = imported;
                    populateDefaults();
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(cmsData));
                    renderEditor(PAGES[currentPage]);
                    showToast('Datos importados correctamente', 'success');
                } catch (err) {
                    showToast('Error: archivo JSON inválido', 'error');
                }
            };
            reader.readAsText(file);
        });
        input.click();
    };

    window.adminResetPage = function () {
        if (!confirm('¿Seguro que quieres borrar todos los cambios de "' + PAGES[currentPage].label + '"? Esta acción no se puede deshacer.')) return;
        var page = PAGES[currentPage];
        page.sections.forEach(function (section) {
            section.fields.forEach(function (field) {
                if (cmsData[field.id]) {
                    delete cmsData[field.id].text;
                    delete cmsData[field.id].img;
                    delete cmsData[field.id].video;
                }
            });
        });
        populateDefaults();
        saveData();
        renderEditor(page);
        showToast('Cambios de "' + page.label + '" restaurados a los valores por defecto', 'info');
    };

    window.adminResetAll = function () {
        if (!confirm('¿Seguro que quieres borrar TODOS los cambios del CMS? Se restaurarán los contenidos originales.')) return;
        cmsData = {};
        localStorage.removeItem(STORAGE_KEY);
        populateDefaults();
        saveData();
        renderEditor(PAGES[currentPage]);
        showToast('Todos los contenidos han sido restaurados a los valores originales', 'info');
    };

    window.adminLogout = function () {
        sessionStorage.removeItem('waterman_admin_auth');
        location.reload();
    };

    // ===================== INTERACTIVE ADMIN TOUR =====================
    var currentTourStep = 0;
    var tourSteps = [
        {
            title: '1. Organización Modular por Páginas 📁',
            icon: 'fa-cubes',
            text: 'El panel está estructurado en módulos según las páginas públicas del sitio (Inicio, Deportes, Nosotros, Paquetes, Contacto, Experiencia, FAQ, Destinos). Selecciona cualquier página en el menú lateral izquierdo para editar sus contenidos.'
        },
        {
            title: '2. Edición Modular con Textos Precargados ✏️',
            icon: 'fa-layer-group',
            text: 'Todos los textos actuales de la página web aparecen ya escritos dentro de las casillas. Solo edita las palabras que quieras cambiar y listo.'
        },
        {
            title: '3. Vista Previa en Vivo 👁️',
            icon: 'fa-eye',
            text: 'Haz clic en "Vista Previa en Vivo" para probar y verificar tus cambios en vivo en tiempo real antes de confirmarlos.'
        },
        {
            title: '4. Copias de Seguridad en Servidor 📂',
            icon: 'fa-database',
            text: 'Cada vez que guardas en el servidor se crea una copia automática. Puedes ver el historial de backups y restaurar el sitio a cualquier fecha previa.'
        }
    ];

    window.startAdminTour = function () {
        currentTourStep = 0;
        showTourStep(0);
        var modal = document.getElementById('admin-tour-modal');
        if (modal) modal.classList.add('open');
    };

    window.closeAdminTour = function () {
        var modal = document.getElementById('admin-tour-modal');
        if (modal) modal.classList.remove('open');
    };

    window.nextTourStep = function () {
        if (currentTourStep < tourSteps.length - 1) {
            currentTourStep++;
            showTourStep(currentTourStep);
        } else {
            closeAdminTour();
            showToast('¡Tour completado! Ya estás listo para administrar el sitio.', 'success');
        }
    };

    window.prevTourStep = function () {
        if (currentTourStep > 0) {
            currentTourStep--;
            showTourStep(currentTourStep);
        }
    };

    function showTourStep(idx) {
        var step = tourSteps[idx];
        document.getElementById('tour-step-title').innerHTML = '<i class="fa-solid ' + step.icon + '" style="color:var(--admin-accent);margin-right:0.5rem"></i>' + step.title;
        document.getElementById('tour-step-body').textContent = step.text;
        document.getElementById('tour-step-counter').textContent = 'Paso ' + (idx + 1) + ' de ' + tourSteps.length;

        var prevBtn = document.getElementById('tour-prev-btn');
        var nextBtn = document.getElementById('tour-next-btn');
        if (prevBtn) prevBtn.style.display = idx === 0 ? 'none' : 'inline-flex';
        if (nextBtn) nextBtn.textContent = idx === tourSteps.length - 1 ? 'Entendido / Finalizar' : 'Siguiente paso →';
    }

    // ===================== TOAST =====================
    function showToast(message, type) {
        type = type || 'info';
        var container = document.getElementById('toast-container');
        var icons = { success: 'fa-circle-check', error: 'fa-circle-xmark', info: 'fa-circle-info' };
        var toast = document.createElement('div');
        toast.className = 'admin-toast toast-' + type;
        toast.innerHTML = '<i class="fa-solid ' + (icons[type] || icons.info) + '"></i><span>' + message + '</span>';
        container.appendChild(toast);

        setTimeout(function () {
            toast.classList.add('toast-exit');
            setTimeout(function () {
                if (toast.parentNode) toast.parentNode.removeChild(toast);
            }, 300);
        }, 3000);
    }

    // ===================== HELPERS =====================
    function compressImageFile(file, callback) {
        var img = new Image();
        var reader = new FileReader();
        reader.onload = function (e) {
            img.onload = function () {
                var canvas = document.createElement('canvas');
                var maxW = 1200;
                var maxH = 1200;
                var width = img.width;
                var height = img.height;

                if (width > height) {
                    if (width > maxW) {
                        height *= maxW / width;
                        width = maxW;
                    }
                } else {
                    if (height > maxH) {
                        width *= maxH / height;
                        height = maxH;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                var ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                var compressedUrl = canvas.toDataURL('image/jpeg', 0.75);
                callback(compressedUrl);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function escapeAttr(str) {
        if (!str) return '';
        return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    // ===================== START =====================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
