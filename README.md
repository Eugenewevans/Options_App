# Option City - Professional Options Trading Platform

A Progressive Web App (PWA) that teaches options trading through realistic market simulation. Perfect for learning the fundamentals of call and put options with dynamic pricing, Greeks, and market news.

## 🌟 Features

- **Progressive Web App**: Install on Android, iOS, and desktop
- **Realistic Market Simulation**: Dynamic pricing based on Greeks and market conditions
- **Educational Content**: Comprehensive Options Trading Academy
- **Professional UI**: Wall Street aesthetic with modern design
- **Offline Support**: Works without internet connection
- **Mobile Optimized**: Touch-friendly interface for mobile devices

## 📱 Installation

### Mobile (Android/iOS)
1. Open the app in Chrome/Safari
2. Tap the "Add to Home Screen" option
3. The app will install like a native app
4. Launch from your home screen

### Desktop
1. Open the app in Chrome/Edge
2. Click the install icon in the address bar
3. The app will install as a desktop application

## 🚀 Railway Deployment

### Prerequisites
- Railway account
- Git repository

### Deployment Steps

1. **Push to Git Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/option-city.git
   git push -u origin main
   ```

2. **Deploy on Railway**
   - Go to [Railway Dashboard](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Railway will automatically detect the Node.js app
   - Deploy!

3. **Environment Variables** (Optional)
   - `NODE_ENV`: Set to `production` for production
   - `PORT`: Railway will set this automatically

### Railway Configuration
The app includes:
- `railway.json`: Deployment configuration
- `package.json`: Dependencies and scripts
- `server.js`: Express server with PWA support

## 🛠️ Local Development

### Prerequisites
- Node.js 16+ 
- npm

### Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Visit http://localhost:3000
```

## 📁 Project Structure

```
option-city/
├── index.html              # Main entry point with loading screen
├── stock-options.html      # Main game interface
├── manifest.json           # PWA manifest
├── sw.js                  # Service worker for offline support
├── server.js              # Express server for Railway
├── package.json           # Dependencies and scripts
├── railway.json           # Railway deployment config
├── README.md              # This file
└── icons/                 # App icons (to be created)
    ├── icon-72x72.png
    ├── icon-96x96.png
    ├── icon-128x128.png
    ├── icon-144x144.png
    ├── icon-152x152.png
    ├── icon-192x192.png
    ├── icon-384x384.png
    └── icon-512x512.png
```

## 🎮 Game Features

### Trading Mechanics
- Buy/sell call and put options
- Dynamic pricing based on Greeks (Delta, Gamma, Theta, Vega)
- Expiration dates (1-5 days)
- Market news affecting specific stocks
- Portfolio management with profit/loss tracking

### Educational Content
- **Basics**: Call vs Put options, strike prices, premiums
- **Strategies**: Bullish/Bearish plays, risk management
- **Terms**: Options terminology and concepts
- **Game Tips**: How to succeed in the simulation

### Market Simulation
- Realistic stock options (AAPL, TSLA, NVDA, etc.)
- Sector-specific market news
- Market trends panel
- Time decay and volatility effects

## 🔧 Technical Details

### PWA Features
- **Service Worker**: Offline caching and background sync
- **Manifest**: App installation and home screen integration
- **Responsive Design**: Works on all screen sizes
- **Touch Optimized**: Mobile-friendly interface

### Security
- HTTPS required for PWA features
- Content Security Policy headers
- Helmet.js security middleware

### Performance
- Gzip compression
- Static file caching
- Optimized for mobile networks

## 📊 Monitoring

### Health Check
- Endpoint: `/health`
- Returns app status and timestamp
- Used by Railway for monitoring

### Logs
- Railway provides built-in logging
- Access via Railway dashboard

## 🚨 Troubleshooting

### Common Issues

1. **PWA not installing**
   - Ensure HTTPS is enabled
   - Check manifest.json is valid
   - Verify service worker is registered

2. **Railway deployment fails**
   - Check Node.js version (16+)
   - Verify package.json is correct
   - Check Railway logs for errors

3. **App not loading**
   - Check `/health` endpoint
   - Verify all files are in repository
   - Check Railway environment variables

### Support
- Check Railway logs for deployment issues
- Verify PWA installation in browser dev tools
- Test locally before deploying

## 📈 Future Enhancements

- [ ] Push notifications for market updates
- [ ] Multiplayer trading competitions
- [ ] Advanced options strategies
- [ ] Real-time market data integration
- [ ] Social features and leaderboards

## 📄 License

MIT License - See LICENSE file for details

---

**Option City** - Making options trading education accessible and engaging! 🚀 