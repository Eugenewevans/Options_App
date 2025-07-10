#!/bin/bash

echo "🚀 Option City Deployment Script"
echo "================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version 16+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate icons
echo "🎨 Generating app icons..."
npm run generate-icons

# Check if icons were generated
if [ ! -d "icons" ]; then
    echo "❌ Icons directory not found. Creating placeholder icons..."
    mkdir -p icons
    # Create a simple placeholder icon
    echo "Creating placeholder icons..."
    for size in 72 96 128 144 152 192 384 512; do
        # Create a simple SVG icon as placeholder
        cat > "icons/icon-${size}x${size}.svg" << EOF
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#1a1a2e"/>
  <text x="50%" y="50%" font-family="Arial" font-size="${size/4}" fill="#3498db" text-anchor="middle" dominant-baseline="middle">OC</text>
  <text x="50%" y="70%" font-family="Arial" font-size="${size/12}" fill="#bdc3c7" text-anchor="middle" dominant-baseline="middle">OPTION CITY</text>
</svg>
EOF
    done
fi

# Test the server locally
echo "🧪 Testing server locally..."
timeout 10s node server.js &
SERVER_PID=$!

sleep 3

# Check if server is running
if curl -s http://localhost:3000/health > /dev/null; then
    echo "✅ Server is running correctly"
    kill $SERVER_PID 2>/dev/null
else
    echo "❌ Server test failed"
    kill $SERVER_PID 2>/dev/null
    exit 1
fi

echo ""
echo "🎉 Setup complete! Your Option City app is ready for deployment."
echo ""
echo "📋 Next steps:"
echo "1. Push your code to GitHub:"
echo "   git init"
echo "   git add ."
echo "   git commit -m 'Initial commit'"
echo "   git remote add origin https://github.com/yourusername/option-city.git"
echo "   git push -u origin main"
echo ""
echo "2. Deploy on Railway:"
echo "   - Go to https://railway.app"
echo "   - Create new project"
echo "   - Connect your GitHub repository"
echo "   - Deploy!"
echo ""
echo "3. After deployment, your app will be available at:"
echo "   https://your-app-name.railway.app"
echo ""
echo "📱 PWA Installation:"
echo "   - Mobile: Add to home screen from browser"
echo "   - Desktop: Install from browser address bar"
echo ""
echo "🔗 Health check: https://your-app-name.railway.app/health" 