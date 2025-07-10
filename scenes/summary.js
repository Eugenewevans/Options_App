import { createFallbackAssets } from "../assets/loader.js";

export function initSummary() {
  scene("summary", () => {
    const fallbacks = createFallbackAssets();
    
    // Background
    add([
      sprite("summary-bg") || fallbacks.background(),
      pos(0, 0),
      "background"
    ]);
    
    // Title
    add([
      text("Game Complete!", { 
        size: 32, 
        font: "game-font" || "arial",
        color: rgb(46, 204, 113)
      }),
      pos(center().x, 60),
      "title"
    ]);
    
    // Results panel
    const resultsPanel = add([
      rect(340, 200),
      color(44, 62, 80, 0.9),
      outline(2, rgb(255, 255, 255)),
      pos(17, 120),
      "results-panel"
    ]);
    
    // Final cash
    const finalCashText = add([
      text(`Final Cash: $${window.gameState.cash}`, { 
        size: 18, 
        color: rgb(46, 204, 113)
      }),
      pos(30, 140),
      "results-panel"
    ]);
    
    // Starting cash
    const startingCashText = add([
      text(`Starting Cash: $1000`, { 
        size: 16, 
        color: rgb(200, 200, 200)
      }),
      pos(30, 165),
      "results-panel"
    ]);
    
    // Total profit/loss
    const profit = window.gameState.cash - 1000;
    const profitText = add([
      text(`Profit/Loss: ${profit >= 0 ? '+' : ''}$${profit}`, { 
        size: 18, 
        color: profit >= 0 ? rgb(46, 204, 113) : rgb(231, 76, 60)
      }),
      pos(30, 190),
      "results-panel"
    ]);
    
    // Performance rating
    let rating = "";
    let ratingColor = rgb(255, 255, 255);
    
    if (profit >= 2000) {
      rating = "🎯 Options Master!";
      ratingColor = rgb(46, 204, 113);
    } else if (profit >= 500) {
      rating = "📈 Smart Trader!";
      ratingColor = rgb(52, 152, 219);
    } else if (profit >= 0) {
      rating = "📊 Learning Investor!";
      ratingColor = rgb(241, 196, 15);
    } else {
      rating = "📚 Keep Learning!";
      ratingColor = rgb(231, 76, 60);
    }
    
    const ratingText = add([
      text(rating, { 
        size: 20, 
        color: ratingColor
      }),
      pos(center().x, 340),
      "rating"
    ]);
    
    // Learning recap panel
    const learningPanel = add([
      rect(340, 150),
      color(52, 73, 94, 0.8),
      outline(2, rgb(255, 255, 255)),
      pos(17, 380),
      "learning-panel"
    ]);
    
    const learningTitle = add([
      text("What You Learned:", { 
        size: 16, 
        color: rgb(52, 152, 219)
      }),
      pos(30, 395),
      "learning-panel"
    ]);
    
    const learningPoints = [
      "• Call options win when stocks go UP",
      "• Put options win when stocks go DOWN", 
      "• Market news affects option prices",
      "• Risk management is key to success!"
    ];
    
    learningPoints.forEach((point, index) => {
      add([
        text(point, { 
          size: 14, 
          color: rgb(255, 255, 255)
        }),
        pos(30, 420 + (index * 20)),
        "learning-panel"
      ]);
    });
    
    // Action buttons
    const buttonStyle = {
      width: 140,
      height: 45,
      color: rgb(52, 152, 219),
      outline: { width: 2, color: rgb(255, 255, 255) }
    };
    
    // Play Again button
    const playAgainBtn = add([
      rect(buttonStyle.width, buttonStyle.height),
      color(buttonStyle.color),
      outline(buttonStyle.outline.width, buttonStyle.outline.color),
      text("Play Again", { size: 16, color: rgb(255, 255, 255) }),
      pos(center().x - 150, 550),
      area(),
      "action-btn"
    ]);
    
    // Tutorial button
    const tutorialBtn = add([
      rect(buttonStyle.width, buttonStyle.height),
      color(buttonStyle.color),
      outline(buttonStyle.outline.width, buttonStyle.outline.color),
      text("Tutorial", { size: 16, color: rgb(255, 255, 255) }),
      pos(center().x + 10, 550),
      area(),
      "action-btn"
    ]);
    
    // Button interactions
    playAgainBtn.onClick(() => {
      // Reset game state
      window.gameState.cash = 1000;
      window.gameState.day = 1;
      window.gameState.portfolio.calls = 0;
      window.gameState.portfolio.puts = 0;
      window.gameState.totalValue = 1000;
      window.gameState.newsEvents = [];
      
      go("game");
    });
    
    tutorialBtn.onClick(() => {
      window.gameState.tutorialCompleted = false;
      go("tutorial");
    });
    
    // Animated celebration for good performance
    if (profit > 0) {
      // Add some celebration particles
      for (let i = 0; i < 10; i++) {
        const particle = add([
          text("💰", { size: 16 }),
          pos(rand(50, 325), rand(150, 300)),
          "celebration"
        ]);
        
        // Animate particle
        tween(
          particle.pos,
          vec2(rand(50, 325), -50),
          2,
          (p) => particle.pos = p,
          easings.easeOutQuad
        );
        
        wait(rand(0, 1), () => {
          destroy(particle);
        });
      }
    }
    
    // Background music
    play("bgm-summary", { loop: true, volume: 0.3 });
  });
} 