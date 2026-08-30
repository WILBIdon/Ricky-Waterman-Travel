/* ==========================================================================
   WATERMAN ADMIN — Panel Logic (Full Coverage, Live Preview & Server Backups)
   ========================================================================== */
(function () {
    'use strict';

    const STORAGE_KEY = 'waterman_cms_data';
    const ADMIN_PASS = 'waterman2026';

    // ===================== DATA SCHEMA =====================
    // Complete editable fields for all 12 public pages
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
                        { id: 'hero-title', label: 'Título Hero', type: 'textarea', placeholder: 'Tu Aventura Te Espera...' },
                        { id: 'hero-subtitle', label: 'Subtítulo Hero', type: 'textarea', placeholder: 'Descubre el archipiélago...' },
                        { id: 'hero-video', label: 'Video de Fondo (Hero)', type: 'video' },
                        { id: 'hero-fallback', label: 'Imagen de Respaldo (Hero)', type: 'image' }
                    ]
                },
                {
                    title: 'Barra de Estadísticas (Stats Strip)',
                    icon: 'fa-chart-simple',
                    fields: [
                        { id: 'stat1-num', label: 'Estadística 1 - Valor', type: 'text', placeholder: '14+' },
                        { id: 'stat1-label', label: 'Estadística 1 - Etiqueta', type: 'text', placeholder: 'Años en el agua' },
                        { id: 'stat2-num', label: 'Estadística 2 - Valor', type: 'text', placeholder: '32' },
                        { id: 'stat2-label', label: 'Estadística 2 - Etiqueta', type: 'text', placeholder: 'Cayos & Spots' },
                        { id: 'stat3-num', label: 'Estadística 3 - Valor', type: 'text', placeholder: '500+' },
                        { id: 'stat3-label', label: 'Estadística 3 - Etiqueta', type: 'text', placeholder: 'Viajeros felices' },
                        { id: 'stat4-num', label: 'Estadística 4 - Valor', type: 'text', placeholder: '18-25 Kts' },
                        { id: 'stat4-label', label: 'Estadística 4 - Etiqueta', type: 'text', placeholder: 'Viento alisio continuo' }
                    ]
                },
                {
                    title: 'Destinos Destacados (Tres Caras de Venezuela)',
                    icon: 'fa-map-location-dot',
                    fields: [
                        { id: 'dest1-img', label: 'Foto Destino 1 (Caracas)', type: 'image' },
                        { id: 'dest1-title', label: 'Título Destino 1', type: 'text', placeholder: 'Caracas: El Comienzo de la Historia' },
                        { id: 'dest1-text', label: 'Descripción Destino 1', type: 'textarea' },
                        { id: 'dest2-img', label: 'Foto Destino 2 (Choroní)', type: 'image' },
                        { id: 'dest2-title', label: 'Título Destino 2', type: 'text', placeholder: 'Choroní: Entre la Selva y el Mar' },
                        { id: 'dest2-text', label: 'Descripción Destino 2', type: 'textarea' },
                        { id: 'dest3-img', label: 'Foto Destino 3 (Margarita y Coche)', type: 'image' },
                        { id: 'dest3-title', label: 'Título Destino 3', type: 'text', placeholder: 'Margarita y Coche: El Encanto de las Islas' },
                        { id: 'dest3-text', label: 'Descripción Destino 3', type: 'textarea' }
                    ]
                },
                {
                    title: 'Banner Canaima & Salto Ángel (Próximamente)',
                    icon: 'fa-mountain-sun',
                    fields: [
                        { id: 'canaima-banner-title', label: 'Título Banner', type: 'text', placeholder: 'Canaima y el Salto Ángel' },
                        { id: 'canaima-banner-text', label: 'Texto Banner', type: 'textarea', placeholder: 'Estamos preparando algo extraordinario...' }
                    ]
                },
                {
                    title: 'Bloques Editoriales',
                    icon: 'fa-pen-fancy',
                    fields: [
                        { id: 'edit1-title', label: 'Título Bloque 1', type: 'text', placeholder: 'La Aventura Es Para Todos' },
                        { id: 'edit1-text', label: 'Texto Bloque 1', type: 'textarea' },
                        { id: 'edit1-img', label: 'Foto Bloque 1', type: 'image' },
                        { id: 'edit2-title', label: 'Título Bloque 2', type: 'text', placeholder: 'Tu Viaje, Perfeccionado' },
                        { id: 'edit2-text', label: 'Texto Bloque 2', type: 'textarea' },
                        { id: 'edit2-img', label: 'Foto Bloque 2', type: 'image' },
                        { id: 'edit3-title', label: 'Título Bloque 3', type: 'text', placeholder: 'Descubre Una Mejor Forma...' },
                        { id: 'edit3-text', label: 'Texto Bloque 3', type: 'textarea' },
                        { id: 'edit3-img', label: 'Foto Bloque 3', type: 'image' }
                    ]
                },
                {
                    title: 'Historias de Impacto',
                    icon: 'fa-heart',
                    fields: [
                        { id: 'impact1-img', label: 'Foto Historia 1', type: 'image' },
                        { id: 'impact1-title', label: 'Título Historia 1', type: 'text' },
                        { id: 'impact1-text', label: 'Texto Historia 1', type: 'textarea' },
                        { id: 'impact2-img', label: 'Foto Historia 2', type: 'image' },
                        { id: 'impact2-title', label: 'Título Historia 2', type: 'text' },
                        { id: 'impact2-text', label: 'Texto Historia 2', type: 'textarea' },
                        { id: 'impact3-img', label: 'Foto Historia 3', type: 'image' },
                        { id: 'impact3-title', label: 'Título Historia 3', type: 'text' },
                        { id: 'impact3-text', label: 'Texto Historia 3', type: 'textarea' },
                        { id: 'impact4-img', label: 'Foto Historia 4', type: 'image' },
                        { id: 'impact4-title', label: 'Título Historia 4', type: 'text' },
                        { id: 'impact4-text', label: 'Texto Historia 4', type: 'textarea' }
                    ]
                },
                {
                    title: 'Historias que Inspiran (Blog / Guías)',
                    icon: 'fa-newspaper',
                    fields: [
                        { id: 'story-main-title', label: 'Título Artículo Destacado', type: 'text' },
                        { id: 'story-main-text', label: 'Descripción Artículo Destacado', type: 'textarea' },
                        { id: 'story-main-img', label: 'Foto Artículo Destacado', type: 'image' },
                        { id: 'story1-title', label: 'Historia Lateral 1 - Título', type: 'text' },
                        { id: 'story1-img', label: 'Historia Lateral 1 - Foto', type: 'image' },
                        { id: 'story2-title', label: 'Historia Lateral 2 - Título', type: 'text' },
                        { id: 'story2-img', label: 'Historia Lateral 2 - Foto', type: 'image' },
                        { id: 'story3-title', label: 'Historia Lateral 3 - Título', type: 'text' },
                        { id: 'story3-img', label: 'Historia Lateral 3 - Foto', type: 'image' }
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
                        { id: 'dep-title', label: 'Título Principal', type: 'text', placeholder: '¿En Qué Destino Quieres Navegar?' },
                        { id: 'dep-subtitle', label: 'Subtítulo', type: 'textarea', placeholder: 'Primero escoge el lugar de Venezuela...' }
                    ]
                },
                {
                    title: 'Paso 1: Configuración de Destinos',
                    icon: 'fa-map-location-dot',
                    fields: [
                        { id: 'dest-caracas-title', label: 'Destino 1: Caracas (Título)', type: 'text' },
                        { id: 'dest-caracas-desc', label: 'Destino 1: Caracas (Descripción)', type: 'textarea' },
                        { id: 'dest-choroni-title', label: 'Destino 2: Choroní (Título)', type: 'text' },
                        { id: 'dest-choroni-desc', label: 'Destino 2: Choroní (Descripción)', type: 'textarea' },
                        { id: 'dest-margarita-title', label: 'Destino 3: Margarita & Coche (Título)', type: 'text' },
                        { id: 'dest-margarita-desc', label: 'Destino 3: Margarita & Coche (Descripción)', type: 'textarea' },
                        { id: 'dest-losroques-title', label: 'Destino 4: Los Roques (Título)', type: 'text' },
                        { id: 'dest-losroques-desc', label: 'Destino 4: Los Roques (Descripción)', type: 'textarea' }
                    ]
                },
                {
                    title: 'Kitesurf Experience',
                    icon: 'fa-wind',
                    fields: [
                        { id: 'kite-title', label: 'Título Kitesurf', type: 'text' },
                        { id: 'kite-desc', label: 'Descripción Kitesurf', type: 'textarea' },
                        { id: 'kite-beg-d1', label: 'Principiante: Día 1 - Texto', type: 'textarea' },
                        { id: 'kite-beg-d23', label: 'Principiante: Días 2-3 - Texto', type: 'textarea' },
                        { id: 'kite-beg-d46', label: 'Principiante: Días 4-6 - Texto', type: 'textarea' },
                        { id: 'kite-adv-d1', label: 'Avanzado: Día 1 - Texto', type: 'textarea' },
                        { id: 'kite-adv-d23', label: 'Avanzado: Días 2-3 - Texto', type: 'textarea' },
                        { id: 'kite-adv-d46', label: 'Avanzado: Días 4-6 - Texto', type: 'textarea' }
                    ]
                },
                {
                    title: 'Windsurf Paradise',
                    icon: 'fa-sailboat',
                    fields: [
                        { id: 'wind-title', label: 'Título Windsurf', type: 'text' },
                        { id: 'wind-desc', label: 'Descripción Windsurf', type: 'textarea' },
                        { id: 'wind-d1', label: 'Día 1 - Texto', type: 'textarea' },
                        { id: 'wind-d24', label: 'Días 2-4 - Texto', type: 'textarea' },
                        { id: 'wind-d56', label: 'Días 5-6 - Texto', type: 'textarea' }
                    ]
                },
                {
                    title: 'Wingfoil Levitation',
                    icon: 'fa-plane-up',
                    fields: [
                        { id: 'wing-title', label: 'Título Wingfoil', type: 'text' },
                        { id: 'wing-desc', label: 'Descripción Wingfoil', type: 'textarea' },
                        { id: 'wing-d1', label: 'Día 1 - Texto', type: 'textarea' },
                        { id: 'wing-d24', label: 'Días 2-4 - Texto', type: 'textarea' },
                        { id: 'wing-d56', label: 'Días 5-6 - Texto', type: 'textarea' }
                    ]
                },
                {
                    title: 'Buceo PADI Arrecifes',
                    icon: 'fa-water',
                    fields: [
                        { id: 'dive-title', label: 'Título Buceo', type: 'text' },
                        { id: 'dive-desc', label: 'Descripción Buceo', type: 'textarea' },
                        { id: 'dive-d12', label: 'Días 1-2 - Texto', type: 'textarea' },
                        { id: 'dive-d34', label: 'Días 3-4 - Texto', type: 'textarea' },
                        { id: 'dive-d56', label: 'Días 5-6 - Texto', type: 'textarea' }
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
                        { id: 'caracas-hero-img', label: 'Imagen Hero', type: 'image' },
                        { id: 'caracas-title', label: 'Título Principal', type: 'text' },
                        { id: 'caracas-desc', label: 'Descripción General', type: 'textarea' }
                    ]
                },
                {
                    title: 'Atractivos de Caracas',
                    icon: 'fa-star',
                    fields: [
                        { id: 'caracas-a1-title', label: 'Atractivo 1 - Título', type: 'text' },
                        { id: 'caracas-a1-text', label: 'Atractivo 1 - Texto', type: 'textarea' },
                        { id: 'caracas-a2-title', label: 'Atractivo 2 - Título', type: 'text' },
                        { id: 'caracas-a2-text', label: 'Atractivo 2 - Texto', type: 'textarea' },
                        { id: 'caracas-a3-title', label: 'Atractivo 3 - Título', type: 'text' },
                        { id: 'caracas-a3-text', label: 'Atractivo 3 - Texto', type: 'textarea' }
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
                        { id: 'choroni-hero-img', label: 'Imagen Hero', type: 'image' },
                        { id: 'choroni-title', label: 'Título Principal', type: 'text' },
                        { id: 'choroni-desc', label: 'Descripción General', type: 'textarea' }
                    ]
                },
                {
                    title: 'Atractivos de Choroní',
                    icon: 'fa-star',
                    fields: [
                        { id: 'choroni-a1-title', label: 'Atractivo 1 - Título', type: 'text' },
                        { id: 'choroni-a1-text', label: 'Atractivo 1 - Texto', type: 'textarea' },
                        { id: 'choroni-a2-title', label: 'Atractivo 2 - Título', type: 'text' },
                        { id: 'choroni-a2-text', label: 'Atractivo 2 - Texto', type: 'textarea' },
                        { id: 'choroni-a3-title', label: 'Atractivo 3 - Título', type: 'text' },
                        { id: 'choroni-a3-text', label: 'Atractivo 3 - Texto', type: 'textarea' }
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
                        { id: 'margarita-hero-img', label: 'Imagen Hero', type: 'image' },
                        { id: 'margarita-title', label: 'Título Principal', type: 'text' },
                        { id: 'margarita-desc', label: 'Descripción General', type: 'textarea' }
                    ]
                },
                {
                    title: 'Atractivos de Margarita & Coche',
                    icon: 'fa-star',
                    fields: [
                        { id: 'margarita-a1-title', label: 'Atractivo 1 - Título', type: 'text' },
                        { id: 'margarita-a1-text', label: 'Atractivo 1 - Texto', type: 'textarea' },
                        { id: 'margarita-a2-title', label: 'Atractivo 2 - Título', type: 'text' },
                        { id: 'margarita-a2-text', label: 'Atractivo 2 - Texto', type: 'textarea' },
                        { id: 'margarita-a3-title', label: 'Atractivo 3 - Título', type: 'text' },
                        { id: 'margarita-a3-text', label: 'Atractivo 3 - Texto', type: 'textarea' }
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
                        { id: 'losroques-hero-img', label: 'Imagen Hero', type: 'image' },
                        { id: 'losroques-title', label: 'Título Principal', type: 'text' },
                        { id: 'losroques-desc', label: 'Descripción General', type: 'textarea' }
                    ]
                },
                {
                    title: 'Atractivos de Los Roques',
                    icon: 'fa-star',
                    fields: [
                        { id: 'losroques-a1-title', label: 'Atractivo 1 - Título', type: 'text' },
                        { id: 'losroques-a1-text', label: 'Atractivo 1 - Texto', type: 'textarea' },
                        { id: 'losroques-a2-title', label: 'Atractivo 2 - Título', type: 'text' },
                        { id: 'losroques-a2-text', label: 'Atractivo 2 - Texto', type: 'textarea' },
                        { id: 'losroques-a3-title', label: 'Atractivo 3 - Título', type: 'text' },
                        { id: 'losroques-a3-text', label: 'Atractivo 3 - Texto', type: 'textarea' }
                    ]
                },
                {
                    title: 'Safaris Acuáticos en Los Roques',
                    icon: 'fa-compass',
                    fields: [
                        { id: 'losroques-s1-title', label: 'Safari 1 - Título', type: 'text' },
                        { id: 'losroques-s1-desc', label: 'Safari 1 - Descripción', type: 'textarea' },
                        { id: 'losroques-s2-title', label: 'Safari 2 - Título', type: 'text' },
                        { id: 'losroques-s2-desc', label: 'Safari 2 - Descripción', type: 'textarea' },
                        { id: 'losroques-s3-title', label: 'Safari 3 - Título', type: 'text' },
                        { id: 'losroques-s3-desc', label: 'Safari 3 - Descripción', type: 'textarea' },
                        { id: 'losroques-s4-title', label: 'Safari 4 - Título', type: 'text' },
                        { id: 'losroques-s4-desc', label: 'Safari 4 - Descripción', type: 'textarea' }
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
                        { id: 'canaima-hero-img', label: 'Imagen Hero', type: 'image' },
                        { id: 'canaima-title', label: 'Título Principal', type: 'text' },
                        { id: 'canaima-desc', label: 'Descripción General', type: 'textarea' }
                    ]
                },
                {
                    title: 'Atractivos de Canaima',
                    icon: 'fa-star',
                    fields: [
                        { id: 'canaima-a1-title', label: 'Atractivo 1 - Título', type: 'text' },
                        { id: 'canaima-a1-text', label: 'Atractivo 1 - Texto', type: 'textarea' },
                        { id: 'canaima-a2-title', label: 'Atractivo 2 - Título', type: 'text' },
                        { id: 'canaima-a2-text', label: 'Atractivo 2 - Texto', type: 'textarea' },
                        { id: 'canaima-a3-title', label: 'Atractivo 3 - Título', type: 'text' },
                        { id: 'canaima-a3-text', label: 'Atractivo 3 - Texto', type: 'textarea' }
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
                        { id: 'nos-title', label: 'Título', type: 'text' },
                        { id: 'nos-subtitle', label: 'Subtítulo', type: 'textarea' }
                    ]
                },
                {
                    title: 'Perfil del Fundador',
                    icon: 'fa-user-tie',
                    fields: [
                        { id: 'nos-founder-img', label: 'Foto Fundador', type: 'image' },
                        { id: 'nos-founder-name', label: 'Nombre', type: 'text' },
                        { id: 'nos-founder-role', label: 'Cargo / Rol', type: 'text' },
                        { id: 'nos-bio1', label: 'Bio Párrafo 1', type: 'textarea' },
                        { id: 'nos-bio2', label: 'Bio Párrafo 2', type: 'textarea' }
                    ]
                },
                {
                    title: 'Credenciales & Pilares',
                    icon: 'fa-shield-halved',
                    fields: [
                        { id: 'nos-c1-title', label: 'Credencial 1 - Título', type: 'text' },
                        { id: 'nos-c2-title', label: 'Credencial 2 - Título', type: 'text' }
                    ]
                },
                {
                    title: 'Banner CTA Tripulación',
                    icon: 'fa-bullhorn',
                    fields: [
                        { id: 'nos-cta-title', label: 'Título CTA', type: 'text' },
                        { id: 'nos-cta-desc', label: 'Descripción CTA', type: 'textarea' }
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
                        { id: 'paq-title', label: 'Título', type: 'text' },
                        { id: 'paq-subtitle', label: 'Subtítulo', type: 'textarea' }
                    ]
                },
                {
                    title: 'Showcase Principal',
                    icon: 'fa-image',
                    fields: [
                        { id: 'paq-showcase-img', label: 'Foto Principal', type: 'image' },
                        { id: 'paq-showcase-badge', label: 'Etiqueta Badge', type: 'text' },
                        { id: 'paq-showcase-title', label: 'Título Showcase', type: 'text' }
                    ]
                },
                {
                    title: 'Features Incluidos',
                    icon: 'fa-check-double',
                    fields: [
                        { id: 'paq-feature1-title', label: 'Feature 1 - Título', type: 'text' },
                        { id: 'paq-feature1-text', label: 'Feature 1 - Descripción', type: 'textarea' },
                        { id: 'paq-feature2-title', label: 'Feature 2 - Título', type: 'text' },
                        { id: 'paq-feature2-text', label: 'Feature 2 - Descripción', type: 'textarea' },
                        { id: 'paq-feature3-title', label: 'Feature 3 - Título', type: 'text' },
                        { id: 'paq-feature3-text', label: 'Feature 3 - Descripción', type: 'textarea' },
                        { id: 'paq-extras', label: 'Actividades Extra (Lifestyle)', type: 'textarea' }
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
                        { id: 'con-title', label: 'Título Principal', type: 'text' },
                        { id: 'con-subtitle', label: 'Subtítulo', type: 'textarea' }
                    ]
                },
                {
                    title: 'Datos Directos de Contacto',
                    icon: 'fa-address-card',
                    fields: [
                        { id: 'con-whatsapp', label: 'Número WhatsApp', type: 'text', placeholder: '+58 412 000 0000' },
                        { id: 'con-email', label: 'Email Oficial', type: 'text', placeholder: 'info@rickywaterman.com' },
                        { id: 'con-instagram', label: 'Instagram', type: 'text', placeholder: '@rickywaterman' }
                    ]
                },
                {
                    title: 'Tarjeta Lateral del Formulario',
                    icon: 'fa-id-card',
                    fields: [
                        { id: 'con-hero-title', label: 'Título Tarjeta Lateral', type: 'text' },
                        { id: 'con-hero-desc', label: 'Texto Tarjeta Lateral', type: 'textarea' }
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
                        { id: 'exp-title', label: 'Título', type: 'text' },
                        { id: 'exp-subtitle', label: 'Subtítulo', type: 'textarea' }
                    ]
                },
                {
                    title: '3 Pilares de Filosofía',
                    icon: 'fa-layer-group',
                    fields: [
                        { id: 'exp-p1-title', label: 'Pilar 1 - Título', type: 'text' },
                        { id: 'exp-p1-text', label: 'Pilar 1 - Texto', type: 'textarea' },
                        { id: 'exp-p1-badge', label: 'Pilar 1 - Badge', type: 'text' },
                        { id: 'exp-p2-title', label: 'Pilar 2 - Título', type: 'text' },
                        { id: 'exp-p2-text', label: 'Pilar 2 - Texto', type: 'textarea' },
                        { id: 'exp-p2-badge', label: 'Pilar 2 - Badge', type: 'text' },
                        { id: 'exp-p3-title', label: 'Pilar 3 - Título', type: 'text' },
                        { id: 'exp-p3-text', label: 'Pilar 3 - Texto', type: 'textarea' },
                        { id: 'exp-p3-badge', label: 'Pilar 3 - Badge', type: 'text' }
                    ]
                },
                {
                    title: 'Galería de Fotos',
                    icon: 'fa-images',
                    fields: [
                        { id: 'exp-gal1', label: 'Foto Galería 1', type: 'image' },
                        { id: 'exp-gal1-caption', label: 'Caption 1', type: 'text' },
                        { id: 'exp-gal2', label: 'Foto Galería 2', type: 'image' },
                        { id: 'exp-gal2-caption', label: 'Caption 2', type: 'text' },
                        { id: 'exp-gal3', label: 'Foto Galería 3', type: 'image' },
                        { id: 'exp-gal3-caption', label: 'Caption 3', type: 'text' },
                        { id: 'exp-gal4', label: 'Foto Galería 4', type: 'image' },
                        { id: 'exp-gal4-caption', label: 'Caption 4', type: 'text' }
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
                        { id: 'faq-title', label: 'Título', type: 'text' },
                        { id: 'faq-subtitle', label: 'Subtítulo', type: 'textarea' }
                    ]
                },
                {
                    title: 'Lista de Preguntas y Respuestas',
                    icon: 'fa-comments',
                    fields: [
                        { id: 'faq-q1', label: 'Pregunta 1', type: 'text' },
                        { id: 'faq-a1', label: 'Respuesta 1', type: 'textarea' },
                        { id: 'faq-q2', label: 'Pregunta 2', type: 'text' },
                        { id: 'faq-a2', label: 'Respuesta 2', type: 'textarea' },
                        { id: 'faq-q3', label: 'Pregunta 3', type: 'text' },
                        { id: 'faq-a3', label: 'Respuesta 3', type: 'textarea' },
                        { id: 'faq-q4', label: 'Pregunta 4', type: 'text' },
                        { id: 'faq-a4', label: 'Respuesta 4', type: 'textarea' },
                        { id: 'faq-q5', label: 'Pregunta 5', type: 'text' },
                        { id: 'faq-a5', label: 'Respuesta 5', type: 'textarea' }
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

    // ===================== STORAGE & SERVER API =====================
    function loadData() {
        fetch('/api/cms')
            .then(function (res) { return res.json(); })
            .then(function (resData) {
                if (resData && resData.success && resData.data) {
                    cmsData = resData.data;
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
            html += 'value="' + escapeAttr(value && value.text ? value.text : '') + '">';
        } else if (field.type === 'textarea') {
            html += '<textarea class="admin-textarea" data-field-id="' + field.id + '" rows="3" ';
            html += 'placeholder="' + (field.placeholder || '') + '">';
            html += escapeHtml(value && value.text ? value.text : '') + '</textarea>';
        } else if (field.type === 'image') {
            var imgSrc = value && value.img ? value.img : '';
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
            var vidSrc = value && value.video ? value.video : '';
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
                    if (Object.keys(cmsData[id]).length === 0 || (Object.keys(cmsData[id]).length === 1 && cmsData[id].text === '')) {
                        delete cmsData[id];
                    }
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
                delete cmsData[field.id];
            });
        });
        saveData();
        renderEditor(page);
        showToast('Cambios de "' + page.label + '" eliminados', 'info');
    };

    window.adminResetAll = function () {
        if (!confirm('¿Seguro que quieres borrar TODOS los cambios del CMS? Esta acción no se puede deshacer.')) return;
        cmsData = {};
        localStorage.removeItem(STORAGE_KEY);
        renderEditor(PAGES[currentPage]);
        showToast('Todos los cambios han sido eliminados', 'info');
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
            title: '2. Edición Modular por Secciones ✏️',
            icon: 'fa-layer-group',
            text: 'Cada página está dividida en tarjetas/bloques funcionales (Hero, Destinos, Bloques Editoriales, Historias). Puedes modificar textos, descripciones y títulos directamente en tiempo real.'
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
