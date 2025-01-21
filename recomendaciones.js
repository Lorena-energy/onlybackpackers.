document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  const userRecommendationForm = document.getElementById("user-recommendation-form");
  const userRecommendationsList = document.getElementById("user-recommendations-list");

  userRecommendationForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const content = document.getElementById("recommendation-content").value.trim();
    if (!content) return;

    const recommendation = document.createElement("div");
    recommendation.classList.add("recommendation");
    recommendation.innerHTML = `<p>${content}</p>`;

    userRecommendationsList.appendChild(recommendation);
    userRecommendationForm.reset();
  });
});
