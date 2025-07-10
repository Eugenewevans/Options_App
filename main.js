import { loadAssets } from "./assets/loader.js";
import { initTutorial } from "./scenes/tutorial.js";
import { initGame } from "./scenes/game.js";
import { initSummary } from "./scenes/summary.js";

// Kaboom is now loaded globally from CDN
console.log("Kaboom loaded from CDN");

// Initialize Kaboom with mobile-optimized settings
kaboom({
  width: 375,
  height: 667,
  scale: "fit",
  background: "#1a1a2e",
  fullscreen: true,
  crisp: true,
  touchToMouse: true,
  mouseToTouch: true,
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

// Load all game assets
loadAssets();

// Initialize scenes
initTutorial();
initGame();
initSummary();

// Add a simple test scene to verify Kaboom is working
scene("test", () => {
  add([
    text("Option Hustle is Loading...", { size: 32, color: rgb(255, 255, 255) }),
    pos(center().x, center().y)
  ]);
  
  wait(2, () => {
    go("tutorial");
  });
});

// Start with test scene first
go("test");

// Debug info for development
// Removed for now to avoid conflicts 