import { loadAssets } from "./assets/loader.js";

// Kaboom is loaded globally from CDN
console.log("Kaboom loaded from CDN");

// Initialize Kaboom with basic settings
kaboom({
  width: 375,
  height: 667,
  background: "#1a1a2e",
  global: true
});

// Global game state
window.gameState = {
  cash: 1000,
  day: 1,
  maxDays: 30,
  portfolio: {
    calls: 0,
    puts: 0
  },
  totalValue: 1000,
  newsEvents: [],
  tutorialCompleted: false
};

// Load assets
loadAssets();

// Simple test scene
scene("simple", () => {
  add([
    text("Option Hustle", { size: 32, color: rgb(255, 255, 255) }),
    pos(center().x, center().y - 50)
  ]);
  
  add([
    text("Simple Test Version", { size: 18, color: rgb(46, 204, 113) }),
    pos(center().x, center().y)
  ]);
  
  add([
    text("Click to start tutorial", { size: 16, color: rgb(200, 200, 200) }),
    pos(center().x, center().y + 50)
  ]);
  
  onClick(() => {
    go("tutorial");
  });
});

// Simple tutorial scene
scene("tutorial", () => {
  add([
    text("Tutorial", { size: 32, color: rgb(255, 255, 255) }),
    pos(center().x, center().y - 50)
  ]);
  
  add([
    text("This is the tutorial screen", { size: 18, color: rgb(46, 204, 113) }),
    pos(center().x, center().y)
  ]);
  
  add([
    text("Click to go to game", { size: 16, color: rgb(200, 200, 200) }),
    pos(center().x, center().y + 50)
  ]);
  
  onClick(() => {
    go("game");
  });
});

// Simple game scene
scene("game", () => {
  add([
    text("Game Screen", { size: 32, color: rgb(255, 255, 255) }),
    pos(center().x, center().y - 50)
  ]);
  
  add([
    text(`Cash: $${window.gameState.cash}`, { size: 18, color: rgb(46, 204, 113) }),
    pos(center().x, center().y)
  ]);
  
  add([
    text("Click to go back", { size: 16, color: rgb(200, 200, 200) }),
    pos(center().x, center().y + 50)
  ]);
  
  onClick(() => {
    go("simple");
  });
});

// Start with simple scene
go("simple"); 