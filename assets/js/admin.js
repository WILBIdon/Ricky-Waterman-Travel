/* ==========================================================================
   WATERMAN ADMIN — Panel Logic
   ========================================================================== */
(function () {
    'use strict';

    const STORAGE_KEY = 'waterman_cms_data';
    const ADMIN_PASS = 'waterman2026';

    // ===================== DATA SCHEMA =====================
    // Define editable fields per page
    const PAGES = {
        index: {
            label: 'Inicio',
            icon: 'fa-house',
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
                }
            ]
        },
        deportes: {
            label: 'Deportes & Safaris',
            icon: 'fa-wind',
            sections: [
                {
                    title: 'Encabezado',
                    icon: 'fa-heading',
                    fields: [
                        { id: 'dep-title', label: 'Título Principal', type: 'text', placeholder: 'Elige Tu Deporte & Tu Nivel' },
                        { id: 'dep-subtitle', label: 'Subtítulo', type: 'textarea' }
                    ]
                },
                {
                    title: 'Kitesurf',
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
                    title: 'Windsurf',
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
                    title: 'Wingfoil',
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
                    title: 'Buceo (PADI)',
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
        nosotros: {
            label: 'Nosotros',
            icon: 'fa-users',
            sections: [
                {
                    title: 'Encabezado',
                    icon: 'fa-heading',
                    fields: [
                        { id: 'nos-title', label: 'Título', type: 'text', placeholder: 'Conoce a Tu Tripulación' },
                        { id: 'nos-subtitle', label: 'Subtítulo', type: 'textarea' }
                    ]
                },
                {
                    title: 'Perfil del Fundador',
                    icon: 'fa-user-tie',
                    fields: [
                        { id: 'nos-founder-img', label: 'Foto Fundador', type: 'image' },
                        { id: 'nos-founder-name', label: 'Nombre', type: 'text', placeholder: 'Ricardo "Ricky"' },
                        { id: 'nos-founder-role', label: 'Cargo', type: 'text', placeholder: 'Fundador & Head Coach' },
                        { id: 'nos-bio1', label: 'Bio Párrafo 1', type: 'textarea' },
                        { id: 'nos-bio2', label: 'Bio Párrafo 2', type: 'textarea' }
                    ]
                }
            ]
        },
        paquetes: {
            label: 'Paquetes',
            icon: 'fa-suitcase',
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
                    title: 'Showcase',
                    icon: 'fa-image',
                    fields: [
                        { id: 'paq-showcase-img', label: 'Foto Principal', type: 'image' },
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
            label: 'Contacto',
            icon: 'fa-envelope',
            sections: [
                {
                    title: 'Encabezado',
                    icon: 'fa-heading',
                    fields: [
                        { id: 'con-title', label: 'Título', type: 'text' },
                        { id: 'con-subtitle', label: 'Subtítulo', type: 'textarea' }
                    ]
                },
                {
                    title: 'Datos de Contacto',
                    icon: 'fa-address-card',
                    fields: [
                        { id: 'con-whatsapp', label: 'Número WhatsApp', type: 'text', placeholder: '+58 412 000 0000' },
                        { id: 'con-email', label: 'Email', type: 'text', placeholder: 'info@rickywaterman.com' },
                        { id: 'con-instagram', label: 'Instagram', type: 'text', placeholder: '@rickywaterman' }
                    ]
                }
            ]
        },
        experiencia: {
            label: 'La Experiencia',
            icon: 'fa-star',
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
                    title: '3 Pilares',
                    icon: 'fa-layer-group',
                    fields: [
                        { id: 'exp-p1-title', label: 'Pilar 1 - Título', type: 'text' },
                        { id: 'exp-p1-text', label: 'Pilar 1 - Texto', type: 'textarea' },
                        { id: 'exp-p2-title', label: 'Pilar 2 - Título', type: 'text' },
                        { id: 'exp-p2-text', label: 'Pilar 2 - Texto', type: 'textarea' },
                        { id: 'exp-p3-title', label: 'Pilar 3 - Título', type: 'text' },
                        { id: 'exp-p3-text', label: 'Pilar 3 - Texto', type: 'textarea' }
                    ]
                },
                {
                    title: 'Galería',
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
                    title: 'Preguntas',
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
    }

    // ===================== STORAGE =====================
    function loadData() {
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
            showToast('Cambios guardados correctamente', 'success');
        } catch (e) {
            if (e.name === 'QuotaExceededError') {
                showToast('Error: almacenamiento lleno. Reduce el tamaño de las imágenes.', 'error');
            } else {
                showToast('Error al guardar: ' + e.message, 'error');
            }
        }
    }

    // ===================== LOGIN =====================
    function setupLogin() {
        const overlay = document.getElementById('login-overlay');
        const form = document.getElementById('login-form');
        const errorEl = document.getElementById('login-error');

        // Check if already logged in
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

        // Click handlers
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

        // Update active nav
        document.querySelectorAll('.admin-nav-item').forEach(function (btn) {
            btn.classList.toggle('active', btn.getAttribute('data-page') === pageKey);
        });

        // Update topbar
        document.getElementById('topbar-title').textContent = page.label;

        // Render editor
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

            // Check if this section has image fields — use grid
            var hasImages = section.fields.some(function (f) { return f.type === 'image'; });

            section.fields.forEach(function (field) {
                html += renderField(field);
            });

            html += '</div>';
        });

        container.innerHTML = html;

        // Bind events
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
        // Text inputs and textareas — save on change
        document.querySelectorAll('.admin-input[data-field-id], .admin-textarea[data-field-id]').forEach(function (el) {
            el.addEventListener('input', function () {
                var id = this.getAttribute('data-field-id');
                if (!cmsData[id]) cmsData[id] = {};
                cmsData[id].text = this.value;
            });
        });

        // File inputs — image/video
        document.querySelectorAll('.img-upload-area input[type="file"]').forEach(function (input) {
            input.addEventListener('change', function () {
                var file = this.files[0];
                if (!file) return;
                var id = this.getAttribute('data-field-id');

                if (file.type.startsWith('video/')) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        if (!cmsData[id]) cmsData[id] = {};
                        cmsData[id].video = e.target.result;
                        renderEditor(PAGES[currentPage]);
                    };
                    reader.readAsDataURL(file);
                } else {
                    // Compress image via Canvas to lightweight JPEG (max 1200px, 0.75 quality)
                    compressImageFile(file, function (compressedUrl) {
                        if (!cmsData[id]) cmsData[id] = {};
                        cmsData[id].img = compressedUrl;
                        renderEditor(PAGES[currentPage]);
                        showToast('Imagen comprimida y optimizada', 'info');
                    });
                }
            });
        });

        // Remove image buttons
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
        if (hamburger) {
            hamburger.addEventListener('click', toggleSidebarMobile);
        }
        var overlay = document.getElementById('sidebar-overlay');
        if (overlay) {
            overlay.addEventListener('click', closeSidebarMobile);
        }
    }

    function toggleSidebarMobile() {
        document.getElementById('admin-sidebar').classList.toggle('open');
        document.getElementById('sidebar-overlay').classList.toggle('open');
    }

    function closeSidebarMobile() {
        document.getElementById('admin-sidebar').classList.remove('open');
        document.getElementById('sidebar-overlay').classList.remove('open');
    }

    // ===================== GLOBAL ACTIONS =====================
    window.adminSave = function () {
        saveData();
    };

    window.adminPreview = function () {
        var pageMap = {
            index: 'index.html',
            deportes: 'deportes.html',
            nosotros: 'nosotros.html',
            paquetes: 'paquetes.html',
            contacto: 'contacto.html',
            experiencia: 'experiencia.html',
            faq: 'prepara-tu-viaje.html'
        };
        window.open(pageMap[currentPage] || 'index.html', '_blank');
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
