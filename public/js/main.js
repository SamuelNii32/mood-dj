document.addEventListener("DOMContentLoaded", () => {
  // ✅ Experience page loading animation
  const loadingScreen = document.getElementById("loadingScreen");
  const experienceContent = document.getElementById("experienceContent");

  if (loadingScreen && experienceContent) {
    setTimeout(() => {
      loadingScreen.style.display = "none";
      experienceContent.style.display = "block";
    }, 2000);
  }

  // ✅ Scenario selection logic (for scenarios.pug)
  const scenarioCards = document.querySelectorAll(".scenario-card");
  const generateBtn = document.getElementById("selectScenarioBtn");
  let selectedScenarioId = null;

  if (scenarioCards.length && generateBtn) {
    scenarioCards.forEach((card) => {
      card.addEventListener("click", () => {
        // Deselect all cards
        scenarioCards.forEach((c) => c.classList.remove("selected"));

        // Select the clicked one
        card.classList.add("selected");
        selectedScenarioId = card.dataset.id;

        // Enable the button
        generateBtn.disabled = false;
      });
    });

    generateBtn.addEventListener("click", () => {
      if (selectedScenarioId) {
        window.location.href = `/experience?scenario=${selectedScenarioId}`;
      }
    });
  }

  // ✅ Back button functionality (for experience.pug)
  const backBtn = document.getElementById("backBtn");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      window.location.href = "/scenarios";
    });
  }
});
