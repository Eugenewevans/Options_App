const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'", "https:"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
}));

// Compression middleware
app.use(compression());

// Serve static files
app.use(express.static(path.join(__dirname, '.')));

// Serve manifest.json with correct MIME type
app.get('/manifest.json', (req, res) => {
  res.setHeader('Content-Type', 'application/manifest+json');
  res.sendFile(path.join(__dirname, 'manifest.json'));
});

// Serve service worker with correct MIME type
app.get('/sw.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, 'sw.js'));
});

// Serve icons
app.get('/icons/:icon', (req, res) => {
  const iconPath = path.join(__dirname, 'icons', req.params.icon);
  if (req.params.icon.endsWith('.svg')) {
    res.setHeader('Content-Type', 'image/svg+xml');
  }
  res.sendFile(iconPath);
});

// Main route - serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Game route - serve stock-options.html
app.get('/game', (req, res) => {
  res.sendFile(path.join(__dirname, 'stock-options.html'));
});

// Health check for Railway
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Option City is running',
    timestamp: new Date().toISOString()
  });
});

// Handle 404s
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Option City server running on port ${PORT}`);
  console.log(`📱 PWA ready for installation`);
  console.log(`🌐 Visit: http://localhost:${PORT}`);
});

module.exports = app; 