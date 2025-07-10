// Asset loader for Option Hustle
export function loadAssets() {
  console.log("Loading assets...");
  
  // For now, we'll skip loading external assets and use fallbacks
  // This prevents 404 errors while we develop
  console.log("Using fallback assets for development");
  
  // We'll load assets later when they're available
  // For now, the game will use the fallback assets defined in createFallbackAssets()
}

// Fallback assets for development (simple colored rectangles)
export function createFallbackAssets() {
  // Create simple colored rectangles as fallbacks
  const fallbacks = {
    "background": () => add([rect(375, 667), color(26, 26, 46)]),
    "button": () => add([rect(120, 40), color(52, 152, 219), outline(2, rgb(255, 255, 255))]),
    "panel": () => add([rect(300, 200), color(44, 62, 80), outline(2, rgb(255, 255, 255))]),
    "icon-cash": () => add([text("💰", { size: 24 })]),
    "icon-call": () => add([text("📈", { size: 24 })]),
    "icon-put": () => add([text("📉", { size: 24 })]),
    "character": () => add([text("👤", { size: 32 })])
  };
  
  return fallbacks;
} 