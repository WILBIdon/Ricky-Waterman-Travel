const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { render, claves } = require('./render');

const app = express();
const PORT = process.env.PORT || 3000;

/* ---------------------------------------------------------------------------
   CMS: APAGADO salvo que se configure ADMIN_TOKEN.

   La interfaz del CMS (admin.html) ya no existe y ninguna página del sitio
   llama a /api/. Dejando los endpoints abiertos, cualquiera en internet podía
   sobrescribir la base de contenidos y subir archivos al servidor.

   Ahora la API solo responde si existe la variable de entorno ADMIN_TOKEN, y
   además exige esa misma clave en cada petición. Sin la variable, devuelve 503
   y el sitio funciona igual: es HTML estático.

   Para reactivarlo: definir ADMIN_TOKEN en Railway con una clave larga y
   aleatoria, y enviarla en la cabecera `x-admin-token`.
--------------------------------------------------------------------------- */
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || '';
const CMS_ACTIVO = ADMIN_TOKEN.length >= 20;

app.disable('x-powered-by');
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// Directorios
const DATA_DIR = path.join(__dirname, 'data');
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const BACKUPS_DIR = path.join(DATA_DIR, 'backups');
const DB_FILE = path.join(DATA_DIR, 'cms_db.json');

for (const dir of [DATA_DIR, UPLOADS_DIR, BACKUPS_DIR]) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({}, null, 2), 'utf8');
}

/* ============================ ARCHIVOS PÚBLICOS ============================
   Antes se servía __dirname entero, así que server.js, package.json,
   Dockerfile, data/cms_db.json y las notas internas eran descargables por
   cualquiera. Ahora solo salen a internet las páginas y los assets. */

const EXT_RAIZ_PUBLICA = /\.(html|txt|xml|ico|webmanifest|png|svg|jpg|jpeg|webp)$/i;

app.use((req, res, next) => {
    const ruta = req.path;
    if (ruta === '/') return next();
    if (ruta.startsWith('/api/')) return next();
    if (ruta.startsWith('/assets/') || ruta.startsWith('/uploads/')) return next();
    // En la raíz solo se permiten extensiones públicas; nada de subcarpetas.
    const esRaiz = ruta.lastIndexOf('/') === 0;
    if (esRaiz && EXT_RAIZ_PUBLICA.test(ruta)) return next();
    return res.status(404).type('html').send(render('index'));
});

/* Las páginas se sirven desde plantillas (views/), no desde .html sueltos.
   Mismas URLs que antes: /, /index.html, /destino-roques.html, etc. */
claves.forEach(function (clave) {
    const rutas = clave === 'index' ? ['/', '/index.html'] : ['/' + clave + '.html'];
    app.get(rutas, function (req, res) {
        try {
            res.type('html').send(render(clave));
        } catch (err) {
            console.error('Error renderizando ' + clave + ':', err);
            res.status(500).send('Error al generar la página');
        }
    });
});

app.use('/uploads', express.static(UPLOADS_DIR, { maxAge: '90d', immutable: true }));
app.use('/assets', express.static(path.join(__dirname, 'assets'), { maxAge: '7d' }));
app.use(express.static(__dirname, { maxAge: '0', etag: false, dotfiles: 'deny' }));

/* ================================ LA API ================================= */

// Puerta única: si el CMS está apagado, nada de /api/ responde.
app.use('/api', (req, res, next) => {
    if (!CMS_ACTIVO) {
        return res.status(503).json({
            success: false,
            error: 'El CMS está desactivado. Configure ADMIN_TOKEN para habilitarlo.'
        });
    }
    const enviado = req.get('x-admin-token') || '';
    if (enviado.length !== ADMIN_TOKEN.length) {
        return res.status(401).json({ success: false, error: 'No autorizado' });
    }
    // Comparación en tiempo constante, para no filtrar la clave por tiempos.
    let diferencia = 0;
    for (let i = 0; i < ADMIN_TOKEN.length; i++) {
        diferencia |= ADMIN_TOKEN.charCodeAt(i) ^ enviado.charCodeAt(i);
    }
    if (diferencia !== 0) {
        return res.status(401).json({ success: false, error: 'No autorizado' });
    }
    next();
});

function crearRespaldo(motivo = 'manual') {
    try {
        if (!fs.existsSync(DB_FILE)) return null;
        const marca = new Date().toISOString().replace(/[-:]/g, '').replace('T', '_').split('.')[0];
        const nombre = `backup_${marca}_${motivo}.json`;
        fs.writeFileSync(path.join(BACKUPS_DIR, nombre), fs.readFileSync(DB_FILE, 'utf8'), 'utf8');

        const respaldos = fs.readdirSync(BACKUPS_DIR)
            .filter(f => f.startsWith('backup_') && f.endsWith('.json'))
            .map(f => ({ name: f, time: fs.statSync(path.join(BACKUPS_DIR, f)).mtime.getTime() }))
            .sort((a, b) => b.time - a.time);
        respaldos.slice(2).forEach(b => {
            try { fs.unlinkSync(path.join(BACKUPS_DIR, b.name)); } catch (e) {}
        });
        return nombre;
    } catch (err) {
        console.error('Error creando respaldo:', err);
        return null;
    }
}

/* Subidas: antes se aceptaba cualquier archivo de hasta 500 MB, con la
   extensión que dijera el cliente. Se podía subir un .html y quedaba servido
   desde el mismo dominio, ejecutándose en el navegador de los visitantes. */
const TIPOS_PERMITIDOS = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp',
    'image/gif': '.gif',
    'video/mp4': '.mp4',
    'application/pdf': '.pdf'
};

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, UPLOADS_DIR),
        // La extensión sale del tipo declarado, nunca del nombre que envía el cliente.
        filename: (req, file, cb) => {
            const ext = TIPOS_PERMITIDOS[file.mimetype] || '.bin';
            cb(null, 'up-' + Date.now() + '-' + Math.round(Math.random() * 1e9) + ext);
        }
    }),
    limits: { fileSize: 25 * 1024 * 1024, files: 1 },
    fileFilter: (req, file, cb) => {
        if (!TIPOS_PERMITIDOS[file.mimetype]) {
            return cb(new Error('Tipo de archivo no permitido: ' + file.mimetype));
        }
        cb(null, true);
    }
});

app.get('/api/cms', (req, res) => {
    try {
        res.json({ success: true, data: JSON.parse(fs.readFileSync(DB_FILE, 'utf8') || '{}') });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message, data: {} });
    }
});

app.post('/api/cms', (req, res) => {
    try {
        const respaldo = crearRespaldo('auto_save');
        fs.writeFileSync(DB_FILE, JSON.stringify(req.body || {}, null, 2), 'utf8');
        res.json({ success: true, message: 'Base de datos actualizada', backupCreated: respaldo });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get('/api/backups', (req, res) => {
    try {
        const files = fs.readdirSync(BACKUPS_DIR)
            .filter(f => f.startsWith('backup_') && f.endsWith('.json'))
            .map(f => {
                const st = fs.statSync(path.join(BACKUPS_DIR, f));
                return { filename: f, sizeKB: (st.size / 1024).toFixed(1), mtime: st.mtime.toISOString() };
            })
            .sort((a, b) => new Date(b.mtime) - new Date(a.mtime));
        res.json({ success: true, backups: files });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message, backups: [] });
    }
});

app.post('/api/backups/create', (req, res) => {
    const nombre = crearRespaldo('manual');
    if (!nombre) return res.status(500).json({ success: false, error: 'No se pudo crear la copia' });
    res.json({ success: true, message: 'Copia de seguridad creada', filename: nombre });
});

app.post('/api/backups/restore', (req, res) => {
    try {
        const { filename } = req.body || {};
        if (!filename) return res.status(400).json({ success: false, error: 'Falta el nombre de archivo' });
        const destino = path.join(BACKUPS_DIR, path.basename(filename));
        if (!fs.existsSync(destino)) return res.status(404).json({ success: false, error: 'Copia no encontrada' });

        crearRespaldo('pre_restore');
        const contenido = fs.readFileSync(destino, 'utf8');
        fs.writeFileSync(DB_FILE, contenido, 'utf8');
        res.json({ success: true, message: 'Base restaurada', data: JSON.parse(contenido || '{}') });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post('/api/backups/delete', (req, res) => {
    try {
        const { filename } = req.body || {};
        if (!filename) return res.status(400).json({ success: false, error: 'Falta el nombre de archivo' });
        const destino = path.join(BACKUPS_DIR, path.basename(filename));
        if (fs.existsSync(destino)) fs.unlinkSync(destino);
        res.json({ success: true, message: 'Copia eliminada' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post('/api/upload', (req, res) => {
    upload.single('file')(req, res, (err) => {
        if (err) return res.status(400).json({ success: false, error: err.message });
        if (!req.file) return res.status(400).json({ success: false, error: 'No se envió ningún archivo' });
        res.json({
            success: true,
            url: '/uploads/' + req.file.filename,
            filename: req.file.filename,
            size: req.file.size,
            mimetype: req.file.mimetype
        });
    });
});

app.get('/api/status', (req, res) => {
    let dbSize = 0, uploadsCount = 0, uploadsSizeMB = 0, backupsCount = 0;
    try {
        dbSize = (fs.statSync(DB_FILE).size / 1024).toFixed(1);
        const files = fs.readdirSync(UPLOADS_DIR);
        uploadsCount = files.length;
        let bytes = 0;
        files.forEach(f => { try { bytes += fs.statSync(path.join(UPLOADS_DIR, f)).size; } catch (e) {} });
        uploadsSizeMB = (bytes / 1024 / 1024).toFixed(1);
        backupsCount = fs.readdirSync(BACKUPS_DIR).filter(f => f.endsWith('.json')).length;
    } catch (e) {}
    res.json({ status: 'online', serverTime: new Date().toISOString(), dbSizeKB: dbSize, uploadsCount, uploadsSizeMB, backupsCount });
});

// Cualquier otra ruta devuelve la portada (404 suave para un sitio estático).
app.use((req, res) => {
    res.status(404).type('html').send(render('index'));
});

app.listen(PORT, () => {
    console.log('================================================');
    console.log(`🚀 Waterman Experience en el puerto ${PORT}`);
    console.log(`🔒 CMS: ${CMS_ACTIVO ? 'activo (protegido con ADMIN_TOKEN)' : 'desactivado — defina ADMIN_TOKEN para habilitarlo'}`);
    console.log('================================================');
});
