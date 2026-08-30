const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS & JSON parsing
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Directories
const DATA_DIR = path.join(__dirname, 'data');
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const BACKUPS_DIR = path.join(DATA_DIR, 'backups');
const DB_FILE = path.join(DATA_DIR, 'cms_db.json');

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
if (!fs.existsSync(BACKUPS_DIR)) fs.mkdirSync(BACKUPS_DIR, { recursive: true });

// Ensure DB file exists
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({}, null, 2), 'utf8');
}

// Backup Helper Function
function createBackupSnapshot(reason = 'manual') {
    try {
        if (!fs.existsSync(DB_FILE)) return null;
        const now = new Date();
        const timestamp = now.toISOString().replace(/[-:]/g, '').replace('T', '_').split('.')[0];
        const backupFileName = `backup_${timestamp}_${reason}.json`;
        const backupPath = path.join(BACKUPS_DIR, backupFileName);

        const currentContent = fs.readFileSync(DB_FILE, 'utf8');
        fs.writeFileSync(backupPath, currentContent, 'utf8');

        // Clean up old backups (keep latest 2 maximum as requested)
        const backups = fs.readdirSync(BACKUPS_DIR)
            .filter(f => f.startsWith('backup_') && f.endsWith('.json'))
            .map(f => ({ name: f, time: fs.statSync(path.join(BACKUPS_DIR, f)).mtime.getTime() }))
            .sort((a, b) => b.time - a.time);

        if (backups.length > 2) {
            backups.slice(2).forEach(b => {
                try { fs.unlinkSync(path.join(BACKUPS_DIR, b.name)); } catch (e) {}
            });
        }

        return backupFileName;
    } catch (err) {
        console.error('Error creating backup snapshot:', err);
        return null;
    }
}

// Multer Storage for Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_DIR);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
        cb(null, 'up-' + uniqueSuffix + ext);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 500 * 1024 * 1024 } // 500MB max file size
});

// Serve uploaded files statically
app.use('/uploads', express.static(UPLOADS_DIR, {
    maxAge: '90d',
    immutable: true
}));

// Serve main static site files
app.use(express.static(__dirname, {
    maxAge: '1h'
}));

// ================= API ENDPOINTS =================

// GET /api/cms — Read database
app.get('/api/cms', (req, res) => {
    try {
        const raw = fs.readFileSync(DB_FILE, 'utf8');
        const data = JSON.parse(raw || '{}');
        res.json({ success: true, data: data });
    } catch (err) {
        console.error('Error reading DB:', err);
        res.status(500).json({ success: false, error: err.message, data: {} });
    }
});

// POST /api/cms — Update database (creates auto-backup first)
app.post('/api/cms', (req, res) => {
    try {
        // Create backup of current state before overwriting
        const backupName = createBackupSnapshot('auto_save');
        const payload = req.body || {};
        fs.writeFileSync(DB_FILE, JSON.stringify(payload, null, 2), 'utf8');
        res.json({
            success: true,
            message: 'Base de datos actualizada correctamente',
            backupCreated: backupName
        });
    } catch (err) {
        console.error('Error writing DB:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// GET /api/backups — List all server backups
app.get('/api/backups', (req, res) => {
    try {
        const files = fs.readdirSync(BACKUPS_DIR)
            .filter(f => f.startsWith('backup_') && f.endsWith('.json'))
            .map(f => {
                const filePath = path.join(BACKUPS_DIR, f);
                const stat = fs.statSync(filePath);
                return {
                    filename: f,
                    sizeKB: (stat.size / 1024).toFixed(1),
                    mtime: stat.mtime.toISOString()
                };
            })
            .sort((a, b) => new Date(b.mtime) - new Date(a.mtime));

        res.json({ success: true, backups: files });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message, backups: [] });
    }
});

// POST /api/backups/create — Manually create a backup snapshot
app.post('/api/backups/create', (req, res) => {
    try {
        const backupName = createBackupSnapshot('manual');
        if (backupName) {
            res.json({ success: true, message: 'Copia de seguridad creada', filename: backupName });
        } else {
            res.status(500).json({ success: false, error: 'No se pudo crear la copia de seguridad' });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// POST /api/backups/restore — Restore a server backup snapshot
app.post('/api/backups/restore', (req, res) => {
    try {
        const { filename } = req.body || {};
        if (!filename) {
            return res.status(400).json({ success: false, error: 'Nombre de archivo no especificado' });
        }
        const targetPath = path.join(BACKUPS_DIR, path.basename(filename));
        if (!fs.existsSync(targetPath)) {
            return res.status(404).json({ success: false, error: 'Archivo de backup no encontrado' });
        }

        // Backup current before restoring
        createBackupSnapshot('pre_restore');

        const backupContent = fs.readFileSync(targetPath, 'utf8');
        fs.writeFileSync(DB_FILE, backupContent, 'utf8');

        const data = JSON.parse(backupContent || '{}');
        res.json({ success: true, message: 'Base de datos restaurada con éxito', data: data });
    } catch (err) {
        console.error('Error restoring DB:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// POST /api/backups/delete — Delete a specific backup snapshot
app.post('/api/backups/delete', (req, res) => {
    try {
        const { filename } = req.body || {};
        if (!filename) {
            return res.status(400).json({ success: false, error: 'Nombre de archivo no especificado' });
        }
        const targetPath = path.join(BACKUPS_DIR, path.basename(filename));
        if (fs.existsSync(targetPath)) {
            fs.unlinkSync(targetPath);
        }
        res.json({ success: true, message: 'Copia de seguridad eliminada con éxito' });
    } catch (err) {
        console.error('Error deleting backup:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// POST /api/upload — Upload image/video file
app.post('/api/upload', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: 'No se envió ningún archivo' });
        }
        const fileUrl = '/uploads/' + req.file.filename;
        res.json({
            success: true,
            url: fileUrl,
            filename: req.file.filename,
            size: req.file.size,
            mimetype: req.file.mimetype
        });
    } catch (err) {
        console.error('Error uploading file:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Server status endpoint
app.get('/api/status', (req, res) => {
    let dbSize = 0;
    let uploadsCount = 0;
    let uploadsSizeMB = 0;
    let backupsCount = 0;
    try {
        const stat = fs.statSync(DB_FILE);
        dbSize = (stat.size / 1024).toFixed(1); // KB

        const files = fs.readdirSync(UPLOADS_DIR);
        uploadsCount = files.length;

        let totalBytes = 0;
        files.forEach(f => {
            try {
                totalBytes += fs.statSync(path.join(UPLOADS_DIR, f)).size;
            } catch (e) {}
        });
        uploadsSizeMB = (totalBytes / 1024 / 1024).toFixed(1);

        const backupFiles = fs.readdirSync(BACKUPS_DIR).filter(f => f.endsWith('.json'));
        backupsCount = backupFiles.length;
    } catch (e) {}

    res.json({
        status: 'online',
        serverTime: new Date().toISOString(),
        dbSizeKB: dbSize,
        uploadsCount: uploadsCount,
        uploadsSizeMB: uploadsSizeMB,
        backupsCount: backupsCount
    });
});

// Fallback to index.html for SPA routes
app.get('*', (req, res) => {
    const requestedPath = path.join(__dirname, req.path);
    if (fs.existsSync(requestedPath) && fs.statSync(requestedPath).isFile()) {
        res.sendFile(requestedPath);
    } else {
        res.sendFile(path.join(__dirname, 'index.html'));
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`================================================`);
    console.log(`🚀 Waterman Experience Server running on port ${PORT}`);
    console.log(`📁 Static files, API & Server Backups active`);
    console.log(`================================================`);
});
