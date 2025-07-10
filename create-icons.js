const fs = require('fs');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

function createSVGIcon(size) {
    const fontSize = Math.floor(size / 3);
    const subtitleSize = Math.floor(size / 12);
    
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1a2e;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#16213e;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#bg)"/>
  <text x="${size/2}" y="${size/2}" font-family="Arial, sans-serif" font-size="${fontSize}" font-weight="bold" fill="#3498db" text-anchor="middle" dominant-baseline="middle">OC</text>
  <text x="${size/2}" y="${size/2 + size/6}" font-family="Arial, sans-serif" font-size="${subtitleSize}" fill="#bdc3c7" text-anchor="middle" dominant-baseline="middle">OPTION CITY</text>
</svg>`;
}

// Create icons directory if it doesn't exist
if (!fs.existsSync('./icons')) {
    fs.mkdirSync('./icons');
}

// Generate all icons
sizes.forEach(size => {
    const svgContent = createSVGIcon(size);
    const filename = `icons/icon-${size}x${size}.svg`;
    fs.writeFileSync(filename, svgContent);
    console.log(`Generated ${filename}`);
});

console.log('All SVG icons generated successfully!'); 