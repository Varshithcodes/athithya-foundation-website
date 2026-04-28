const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the current directory
app.use(express.static(__dirname));
app.use('/images', express.static(path.join(__dirname, 'images')));

// Ensure directories and data file exist
const imagesDir = path.join(__dirname, 'images');
if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

const dataFile = path.join(__dirname, 'data.json');
if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, JSON.stringify({ contacts: [], csrs: [], gallery: [] }));
}

// Helper to read/write JSON data
const readData = () => {
    try {
        return JSON.parse(fs.readFileSync(dataFile));
    } catch (e) {
        return { contacts: [], csrs: [], gallery: [] };
    }
};
const writeData = (data) => fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

/* --- API ENDPOINTS --- */

// 1. Health Check
app.get('/api/status', (req, res) => res.json({ status: 'online', time: new Date() }));

// 2. Submit Contact Form
app.post('/api/contact', (req, res) => {
  const data = readData();
  data.contacts.unshift({ ...req.body, date: new Date().toISOString() });
  writeData(data);
  res.status(200).json({ success: true, message: 'Contact saved!' });
});

// 3. Submit CSR Form
app.post('/api/csr', (req, res) => {
  const data = readData();
  data.csrs.unshift({ ...req.body, date: new Date().toISOString() });
  writeData(data);
  res.status(200).json({ success: true, message: 'CSR enquiry saved!' });
});

// 4. Get Submissions (Admin)
app.get('/api/submissions', (req, res) => {
  const data = readData();
  res.json({ contacts: data.contacts, csrs: data.csrs });
});

// Configure Multer for local image uploads (Admin Panel use case)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, imagesDir),
  filename: (req, file, cb) => cb(null, `gal_${Date.now()}${path.extname(file.originalname)}`)
});
const upload = multer({ storage });

// 5. Upload Gallery Image
app.post('/api/gallery', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

  const data = readData();
  const newImage = {
    id: 'local_' + Date.now(),
    title: req.body.title || 'New Photo',
    location: req.body.location || '',
    image: '/images/' + req.file.filename,
    date: new Date().toISOString()
  };
  data.gallery.unshift(newImage);
  writeData(data);
  res.status(200).json({ success: true, image: newImage });
});

// 6. Get Gallery
app.get('/api/gallery', (req, res) => {
  const data = readData();
  res.json(data.gallery || []);
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('SERVER ERROR:', err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n🚀 ATHITHYA ADMIN SERVER STARTED`);
  console.log(`----------------------------------`);
  console.log(`📡 API Status: http://localhost:${PORT}/api/status`);
  console.log(`📂 Web Admin:  http://localhost:${PORT}/gallery-admin.html`);
  console.log(`🎨 Main Site:  http://localhost:${PORT}/index.html\n`);
  console.log(`⚠️  Keep this terminal open to allow local image uploads.\n`);
});
