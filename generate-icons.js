const fs = require('fs');
const { createCanvas } = require('canvas');

// Create icons directory if it doesn't exist
if (!fs.existsSync('./icons')) {
    fs.mkdirSync('./icons');
}

// Icon sizes for PWA
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

function generateIcon(size) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#16213e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    
    // Add grid pattern
    ctx.strokeStyle = 'rgba(52, 152, 219, 0.1)';
    ctx.lineWidth = size / 100;
    const gridSize = size / 8;
    
    for (let i = 0; i <= 8; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, size);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(0, i * gridSize);
        ctx.lineTo(size, i * gridSize);
        ctx.stroke();
    }
    
    // Main text
    ctx.fillStyle = '#3498db';
    ctx.font = `bold ${size / 4}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('OC', size / 2, size / 2);
    
    // Subtitle
    ctx.fillStyle = '#bdc3c7';
    ctx.font = `${size / 12}px Arial`;
    ctx.fillText('OPTION CITY', size / 2, size / 2 + size / 6);
    
    // Add some decorative elements
    ctx.strokeStyle = '#3498db';
    ctx.lineWidth = size / 50;
    
    // Corner accents
    const accentSize = size / 8;
    ctx.beginPath();
    ctx.moveTo(0, accentSize);
    ctx.lineTo(accentSize, 0);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(size - accentSize, 0);
    ctx.lineTo(size, accentSize);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(0, size - accentSize);
    ctx.lineTo(accentSize, size);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(size - accentSize, size);
    ctx.lineTo(size, size - accentSize);
    ctx.stroke();
    
    return canvas.toBuffer('image/png');
}

// Generate all icons
sizes.forEach(size => {
    const iconBuffer = generateIcon(size);
    const filename = `icons/icon-${size}x${size}.png`;
    fs.writeFileSync(filename, iconBuffer);
    console.log(`Generated ${filename}`);
});

console.log('All icons generated successfully!'); 