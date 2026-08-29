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
const DB_FILE = path.join(DATA_DIR, 'cms_db.json');

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

// Ensure DB file exists
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({}, null, 2), 'utf8');
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

// POST /api/cms — Update database
app.post('/api/cms', (req, res) => {
    try {
        const payload = req.body || {};
        fs.writeFileSync(DB_FILE, JSON.stringify(payload, null, 2), 'utf8');
        res.json({ success: true, message: 'Base de datos actualizada correctamente' });
    } catch (err) {
        console.error('Error writing DB:', err);
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
    try {
        const stat = fs.statSync(DB_FILE);
        dbSize = (stat.size / 1024).toFixed(1); // KB
        const files = fs.readdirSync(UPLOADS_DIR);
        uploadsCount = files.length;
    } catch (e) {}

    res.json({
        status: 'online',
        serverTime: new Date().toISOString(),
        dbSizeKB: dbSize,
        uploadsCount: uploadsCount
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
    console.log(`📁 Static files & API active`);
    console.log(`================================================`);
});
