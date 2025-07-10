import { createFallbackAssets } from "../assets/loader.js";

// Market events that influence option prices
const MARKET_EVENTS = [
  {
    title: "Tech Boom! 📈",
    description: "Tech companies are soaring! TechCo stock is rising fast.",
    effect: "bullish",
    probability: 0.3
  },
  {
    title: "Tech Crash! 📉", 
    description: "Tech stocks are falling! TechCo is dropping.",
    effect: "bearish",
    probability: 0.3
  },
  {
    title: "Retail Surge! 📈",
    description: "Retail stores are booming! RetailX stock is up.",
    effect: "bullish",
    probability: 0.2
  },
  {
    title: "Retail Slump! 📉",
    description: "Retail sales are down! RetailX stock is falling.",
    effect: "bearish", 
    probability: 0.2
  }
];

export function initGame() {
  scene("game", () => {
    const fallbacks = createFallbackAssets();
    
    // Background
    add([
      sprite("background") || fallbacks.background(),
      pos(0, 0),
      "background"
    ]);
    
    // Game HUD
    const hud = add([
      rect(375, 80),
      color(44, 62, 80, 0.9),
      pos(0, 0),
      "hud"
    ]);
    
    // Cash display
    const cashText = add([
      text(`Cash: $${window.gameState.cash}`, { 
        size: 18, 
        color: rgb(46, 204, 113)
      }),
      pos(20, 20),
      "hud"
    ]);
    
    // Day counter
    const dayText = add([
      text(`Day ${window.gameState.day}/${window.gameState.maxDays}`, { 
        size: 16, 
        color: rgb(255, 255, 255)
      }),
      pos(20, 45),
      "hud"
    ]);
    
    // Portfolio value
    const portfolioText = add([
      text(`Portfolio: $${window.gameState.totalValue}`, { 
        size: 16, 
        color: rgb(241, 196, 15)
      }),
      pos(200, 20),
      "hud"
    ]);
    
    // Current news event
    let currentEvent = null;
    const newsPanel = add([
      rect(340, 100),
      color(52, 73, 94, 0.9),
      outline(2, rgb(255, 255, 255)),
      pos(17, 90),
      "news-panel"
    ]);
    
    const newsTitle = add([
      text("Market News", { 
        size: 18, 
        color: rgb(52, 152, 219)
      }),
      pos(30, 100),
      "news-panel"
    ]);
    
    const newsDescription = add([
      text("Click 'Next Day' to see market news!", { 
        size: 14, 
        color: rgb(255, 255, 255)
      }),
      pos(30, 125),
      "news-panel"
    ]);
    
    // Trading buttons
    const buttonStyle = {
      width: 150,
      height: 60,
      color: rgb(52, 152, 219),
      outline: { width: 2, color: rgb(255, 255, 255) }
    };
    
    // Buy Call Option button
    const buyCallBtn = add([
      rect(buttonStyle.width, buttonStyle.height),
      color(buttonStyle.color),
      outline(buttonStyle.outline.width, buttonStyle.outline.color),
      text("Buy Call Option", { size: 14, color: rgb(255, 255, 255) }),
      pos(30, 220),
      area(),
      "trading-btn"
    ]);
    
    // Buy Put Option button  
    const buyPutBtn = add([
      rect(buttonStyle.width, buttonStyle.height),
      color(buttonStyle.color),
      outline(buttonStyle.outline.width, buttonStyle.outline.color),
      text("Buy Put Option", { size: 14, color: rgb(255, 255, 255) }),
      pos(195, 220),
      area(),
      "trading-btn"
    ]);
    
    // Next Day button
    const nextDayBtn = add([
      rect(315, 50),
      color(rgb(46, 204, 113)),
      outline(2, rgb(255, 255, 255)),
      text("Next Day", { size: 18, color: rgb(255, 255, 255) }),
      pos(30, 300),
      area(),
      "next-day-btn"
    ]);
    
    // Portfolio display
    const portfolioPanel = add([
      rect(315, 120),
      color(44, 62, 80, 0.8),
      outline(2, rgb(255, 255, 255)),
      pos(30, 370),
      "portfolio-panel"
    ]);
    
    const portfolioTitle = add([
      text("Your Portfolio", { 
        size: 16, 
        color: rgb(52, 152, 219)
      }),
      pos(45, 385),
      "portfolio-panel"
    ]);
    
    const callOptionsText = add([
      text(`Call Options: ${window.gameState.portfolio.calls}`, { 
        size: 14, 
        color: rgb(46, 204, 113)
      }),
      pos(45, 410),
      "portfolio-panel"
    ]);
    
    const putOptionsText = add([
      text(`Put Options: ${window.gameState.portfolio.puts}`, { 
        size: 14, 
        color: rgb(231, 76, 60)
      }),
      pos(45, 430),
      "portfolio-panel"
    ]);
    
    // Trading logic
    function buyOption(type) {
      const cost = 200; // Premium cost
      
      if (window.gameState.cash >= cost) {
        window.gameState.cash -= cost;
        window.gameState.portfolio[type] += 1;
        updateDisplay();
        play("cash");
        
        // Show feedback
        const feedback = add([
          text(type === "calls" ? "Call Option Purchased!" : "Put Option Purchased!", {
            size: 16,
            color: rgb(46, 204, 113)
          }),
          pos(center().x, 280),
          "feedback"
        ]);
        
        wait(1.5, () => {
          destroy(feedback);
        });
      } else {
        // Not enough cash
        const feedback = add([
          text("Not enough cash!", {
            size: 16,
            color: rgb(231, 76, 60)
          }),
          pos(center().x, 280),
          "feedback"
        ]);
        
        wait(1.5, () => {
          destroy(feedback);
        });
      }
    }
    
    // Market event generation
    function generateMarketEvent() {
      const random = Math.random();
      let cumulative = 0;
      
      for (const event of MARKET_EVENTS) {
        cumulative += event.probability;
        if (random <= cumulative) {
          return event;
        }
      }
      
      // Default to neutral event
      return {
        title: "Market Stable 📊",
        description: "Market is moving sideways today. No major changes.",
        effect: "neutral"
      };
    }
    
    // Process day results
    function processDayResults() {
      if (!currentEvent) return;
      
      let winnings = 0;
      const winAmount = 800; // Amount per winning option
      
      if (currentEvent.effect === "bullish") {
        // Call options win, put options lose
        winnings = window.gameState.portfolio.calls * winAmount;
        window.gameState.portfolio.calls = 0; // Reset after processing
      } else if (currentEvent.effect === "bearish") {
        // Put options win, call options lose  
        winnings = window.gameState.portfolio.puts * winAmount;
        window.gameState.portfolio.puts = 0; // Reset after processing
      }
      
      window.gameState.cash += winnings;
      
      // Show results
      if (winnings > 0) {
        const resultText = add([
          text(`You won $${winnings}!`, {
            size: 20,
            color: rgb(46, 204, 113)
          }),
          pos(center().x, 350),
          "result"
        ]);
        
        play("success");
        
        wait(2, () => {
          destroy(resultText);
        });
      } else if (window.gameState.portfolio.calls > 0 || window.gameState.portfolio.puts > 0) {
        const resultText = add([
          text("No winnings this day.", {
            size: 18,
            color: rgb(231, 76, 60)
          }),
          pos(center().x, 350),
          "result"
        ]);
        
        play("failure");
        
        wait(2, () => {
          destroy(resultText);
        });
      }
    }
    
    // Update display
    function updateDisplay() {
      cashText.text = `Cash: $${window.gameState.cash}`;
      dayText.text = `Day ${window.gameState.day}/${window.gameState.maxDays}`;
      window.gameState.totalValue = window.gameState.cash + 
        (window.gameState.portfolio.calls * 200) + 
        (window.gameState.portfolio.puts * 200);
      portfolioText.text = `Portfolio: $${window.gameState.totalValue}`;
      callOptionsText.text = `Call Options: ${window.gameState.portfolio.calls}`;
      putOptionsText.text = `Put Options: ${window.gameState.portfolio.puts}`;
    }
    
    // Button interactions
    buyCallBtn.onClick(() => {
      buyOption("calls");
    });
    
    buyPutBtn.onClick(() => {
      buyOption("puts");
    });
    
    nextDayBtn.onClick(() => {
      // Process current day results
      processDayResults();
      
      // Generate new market event
      currentEvent = generateMarketEvent();
      newsTitle.text = currentEvent.title;
      newsDescription.text = currentEvent.description;
      
      // Advance day
      window.gameState.day++;
      
      // Check if game is over
      if (window.gameState.day > window.gameState.maxDays) {
        go("summary");
        return;
      }
      
      updateDisplay();
      play("news");
    });
    
    // Initialize display
    updateDisplay();
    
    // Background music
    play("bgm-game", { loop: true, volume: 0.3 });
  });
} 