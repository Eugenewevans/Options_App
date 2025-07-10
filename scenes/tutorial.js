import { createFallbackAssets } from "../assets/loader.js";

export function initTutorial() {
  scene("tutorial", () => {
    const fallbacks = createFallbackAssets();
    
    // Background
    add([
      sprite("tutorial-bg") || fallbacks.background(),
      pos(0, 0),
      "background"
    ]);
    
    // Title
    add([
      text("Welcome to Option Hustle!", { 
        size: 32, 
        font: "game-font" || "arial",
        color: rgb(255, 255, 255)
      }),
      pos(center().x, 80),
      "title"
    ]);
    
    // Subtitle
    add([
      text("Learn to trade options like a pro!", { 
        size: 18, 
        color: rgb(200, 200, 200)
      }),
      pos(center().x, 120),
      "subtitle"
    ]);
    
    // Tutorial content panels
    const tutorialSteps = [
      {
        title: "📈 Call Options",
        description: "Bet that a stock will go UP. You win when the price rises!",
        icon: "📈"
      },
      {
        title: "📉 Put Options", 
        description: "Bet that a stock will go DOWN. You win when the price falls!",
        icon: "📉"
      },
      {
        title: "💰 Premium",
        description: "The cost to buy an option. Think of it as your bet amount!",
        icon: "💰"
      },
      {
        title: "🎯 Strike Price",
        description: "The target price. Your option wins if the stock hits this price!",
        icon: "🎯"
      }
    ];
    
    let currentStep = 0;
    
    function showTutorialStep(stepIndex) {
      // Clear previous step
      destroyAll("tutorial-step");
      
      const step = tutorialSteps[stepIndex];
      
      // Step icon
      add([
        text(step.icon, { size: 48 }),
        pos(center().x, 200),
        "tutorial-step"
      ]);
      
      // Step title
      add([
        text(step.title, { 
          size: 24, 
          color: rgb(52, 152, 219)
        }),
        pos(center().x, 260),
        "tutorial-step"
      ]);
      
      // Step description
      add([
        text(step.description, { 
          size: 16, 
          color: rgb(255, 255, 255)
        }),
        pos(center().x, 300),
        "tutorial-step"
      ]);
      
      // Progress indicator
      const progressText = `${stepIndex + 1} / ${tutorialSteps.length}`;
      add([
        text(progressText, { 
          size: 14, 
          color: rgb(150, 150, 150)
        }),
        pos(center().x, 380),
        "tutorial-step"
      ]);
    }
    
    // Show first step
    showTutorialStep(0);
    
    // Navigation buttons
    const buttonStyle = {
      width: 120,
      height: 40,
      color: rgb(52, 152, 219),
      outline: { width: 2, color: rgb(255, 255, 255) }
    };
    
    // Previous button
    const prevBtn = add([
      rect(buttonStyle.width, buttonStyle.height),
      color(buttonStyle.color),
      outline(buttonStyle.outline.width, buttonStyle.outline.color),
      text("Previous", { size: 16, color: rgb(255, 255, 255) }),
      pos(center().x - 140, 450),
      area(),
      "tutorial-step"
    ]);
    
    // Next button
    const nextBtn = add([
      rect(buttonStyle.width, buttonStyle.height),
      color(buttonStyle.color),
      outline(buttonStyle.outline.width, buttonStyle.outline.color),
      text("Next", { size: 16, color: rgb(255, 255, 255) }),
      pos(center().x + 20, 450),
      area(),
      "tutorial-step"
    ]);
    
    // Skip button
    const skipBtn = add([
      text("Skip Tutorial", { 
        size: 14, 
        color: rgb(150, 150, 150)
      }),
      pos(center().x, 520),
      area(),
      "tutorial-step"
    ]);
    
    // Button interactions
    prevBtn.onClick(() => {
      if (currentStep > 0) {
        currentStep--;
        showTutorialStep(currentStep);
        play("click");
      }
    });
    
    nextBtn.onClick(() => {
      if (currentStep < tutorialSteps.length - 1) {
        currentStep++;
        showTutorialStep(currentStep);
        play("click");
      } else {
        // Tutorial completed
        window.gameState.tutorialCompleted = true;
        go("game");
      }
    });
    
    skipBtn.onClick(() => {
      window.gameState.tutorialCompleted = true;
      go("game");
    });
    
    // Update button states
    function updateButtons() {
      prevBtn.color = currentStep > 0 ? rgb(52, 152, 219) : rgb(100, 100, 100);
      nextBtn.color = currentStep < tutorialSteps.length - 1 ? rgb(52, 152, 219) : rgb(46, 204, 113);
      nextBtn.text = currentStep < tutorialSteps.length - 1 ? "Next" : "Start Game!";
    }
    
    // Initial button state
    updateButtons();
    
    // Update buttons when step changes
    onUpdate(() => {
      updateButtons();
    });
    
    // Background music
    play("bgm-tutorial", { loop: true, volume: 0.3 });
  });
} 