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

// Ensure data existence
const dataFile = path.join(__dirname, 'data.json');
if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, JSON.stringify({ contacts: [], csrs: [], gallery: [] }));
}

// Helper to read/write JSON data
const readData = () => JSON.parse(fs.readFileSync(dataFile));
const writeData = (data) => fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

/* --- API ENDPOINTS --- */

// 1. Submit Contact Form
app.post('/api/contact', (req, res) => {
  const data = readData();
  data.contacts.push({ ...req.body, date: new Date().toISOString() });
  writeData(data);
  res.status(200).json({ success: true, message: 'Contact saved!' });
});

// 2. Submit CSR Form
app.post('/api/csr', (req, res) => {
  const data = readData();
  data.csrs.push({ ...req.body, date: new Date().toISOString() });
  writeData(data);
  res.status(200).json({ success: true, message: 'CSR enquiry saved!' });
});

// 3. Get Submissions (Admin)
app.get('/api/submissions', (req, res) => {
  const data = readData();
  res.json({ contacts: data.contacts, csrs: data.csrs });
});

// Configure Multer for local image uploads (Admin Panel use case)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, 'images')),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// 4. Upload Gallery Image
app.post('/api/gallery', upload.single('image'), (req, res) => {
  const data = readData();
  const newImage = {
    title: req.body.title || 'New Photo',
    location: req.body.location || '',
    image: '/images/' + req.file.filename,
    date: new Date().toISOString()
  };
  data.gallery.push(newImage);
  writeData(data);
  res.status(200).json({ success: true, image: newImage });
});

// 5. Get Gallery
app.get('/api/gallery', (req, res) => {
  const data = readData();
  res.json(data.gallery);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log(`To view the site: http://localhost:${PORT}/index.html`);
  console.log(`To view the admin panel: http://localhost:${PORT}/gallery-admin.html`);
});
