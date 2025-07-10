#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Option Hustle - Mobile Export Script');
console.log('==========================================');

// Check if dist folder exists
if (!fs.existsSync('dist')) {
  console.error('❌ dist folder not found. Run "npm run build" first.');
  process.exit(1);
}

// Create mobile export directory
const mobileDir = 'mobile-export';
if (!fs.existsSync(mobileDir)) {
  fs.mkdirSync(mobileDir);
}

console.log('📱 Preparing mobile export...');

// Copy built files to mobile directory
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const files = fs.readdirSync(src);
  files.forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    
    if (fs.statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

try {
  copyDir('dist', path.join(mobileDir, 'www'));
  console.log('✅ Built files copied to mobile-export/www/');
} catch (error) {
  console.error('❌ Error copying files:', error.message);
  process.exit(1);
}

// Create Capacitor configuration
const capacitorConfig = {
  appId: "com.optionhustle.game",
  appName: "Option Hustle",
  webDir: "www",
  bundledWebRuntime: false,
  server: {
    androidScheme: "https"
  }
};

fs.writeFileSync(
  path.join(mobileDir, 'capacitor.config.json'),
  JSON.stringify(capacitorConfig, null, 2)
);

// Create package.json for mobile
const mobilePackageJson = {
  name: "option-hustle-mobile",
  version: "1.0.0",
  description: "Option Hustle Mobile App",
  main: "index.js",
  scripts: {
    "build": "npm run build:web && npm run build:android && npm run build:ios",
    "build:web": "echo 'Web build completed'",
    "build:android": "npx cap add android && npx cap sync android && npx cap build android",
    "build:ios": "npx cap add ios && npx cap sync ios && npx cap build ios",
    "open:android": "npx cap open android",
    "open:ios": "npx cap open ios",
    "sync": "npx cap sync"
  },
  dependencies: {
    "@capacitor/core": "^5.0.0",
    "@capacitor/android": "^5.0.0",
    "@capacitor/ios": "^5.0.0"
  },
  devDependencies: {
    "@capacitor/cli": "^5.0.0"
  }
};

fs.writeFileSync(
  path.join(mobileDir, 'package.json'),
  JSON.stringify(mobilePackageJson, null, 2)
);

// Create Android-specific files
const androidDir = path.join(mobileDir, 'android');
if (!fs.existsSync(androidDir)) {
  fs.mkdirSync(androidDir, { recursive: true });
}

// Android manifest template
const androidManifest = `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.optionhustle.game">

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <activity
            android:name="com.optionhustle.game.MainActivity"
            android:exported="true"
            android:launchMode="singleTask"
            android:screenOrientation="portrait"
            android:theme="@style/AppTheme.NoActionBarLaunch">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
</manifest>`;

fs.writeFileSync(
  path.join(androidDir, 'AndroidManifest.xml'),
  androidManifest
);

// Create iOS-specific files
const iosDir = path.join(mobileDir, 'ios');
if (!fs.existsSync(iosDir)) {
  fs.mkdirSync(iosDir, { recursive: true });
}

// iOS Info.plist template
const iosInfoPlist = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleDevelopmentRegion</key>
    <string>$(DEVELOPMENT_LANGUAGE)</string>
    <key>CFBundleDisplayName</key>
    <string>Option Hustle</string>
    <key>CFBundleExecutable</key>
    <string>$(EXECUTABLE_NAME)</string>
    <key>CFBundleIdentifier</key>
    <string>$(PRODUCT_BUNDLE_IDENTIFIER)</string>
    <key>CFBundleInfoDictionaryVersion</key>
    <string>6.0</string>
    <key>CFBundleName</key>
    <string>$(PRODUCT_NAME)</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>CFBundleShortVersionString</key>
    <string>1.0</string>
    <key>CFBundleVersion</key>
    <string>1</string>
    <key>LSRequiresIPhoneOS</key>
    <true/>
    <key>UIRequiresFullScreen</key>
    <true/>
    <key>UISupportedInterfaceOrientations</key>
    <array>
        <string>UIInterfaceOrientationPortrait</string>
    </array>
    <key>UISupportedInterfaceOrientations~ipad</key>
    <array>
        <string>UIInterfaceOrientationPortrait</string>
        <string>UIInterfaceOrientationPortraitUpsideDown</string>
        <string>UIInterfaceOrientationLandscapeLeft</string>
        <string>UIInterfaceOrientationLandscapeRight</string>
    </array>
</dict>
</plist>`;

fs.writeFileSync(
  path.join(iosDir, 'Info.plist'),
  iosInfoPlist
);

// Create build instructions
const buildInstructions = `# Option Hustle - Mobile Build Instructions

## Prerequisites
- Node.js 16+
- Android Studio (for Android builds)
- Xcode (for iOS builds, macOS only)
- Capacitor CLI: npm install -g @capacitor/cli

## Android Build
1. Navigate to mobile-export directory
2. Install dependencies: npm install
3. Add Android platform: npx cap add android
4. Sync project: npx cap sync android
5. Open in Android Studio: npx cap open android
6. Build APK in Android Studio

## iOS Build
1. Navigate to mobile-export directory
2. Install dependencies: npm install
3. Add iOS platform: npx cap add ios
4. Sync project: npx cap sync ios
5. Open in Xcode: npx cap open ios
6. Build and archive in Xcode

## App Store Submission
- Android: Upload APK to Google Play Console
- iOS: Archive and upload to App Store Connect

## Configuration
- App ID: com.optionhustle.game
- App Name: Option Hustle
- Orientation: Portrait only
- Target: Android 5.0+, iOS 12.0+
`;

fs.writeFileSync(
  path.join(mobileDir, 'BUILD_INSTRUCTIONS.md'),
  buildInstructions
);

console.log('✅ Mobile export prepared successfully!');
console.log('');
console.log('📁 Mobile files created in: mobile-export/');
console.log('');
console.log('🚀 Next steps:');
console.log('1. cd mobile-export');
console.log('2. npm install');
console.log('3. npx cap add android');
console.log('4. npx cap add ios');
console.log('5. npx cap sync');
console.log('6. npx cap open android  # or npx cap open ios');
console.log('');
console.log('📱 Build instructions saved to: mobile-export/BUILD_INSTRUCTIONS.md');
console.log('');
console.log('🎯 Ready for App Store submission!'); 