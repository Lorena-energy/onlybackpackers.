document.addEventListener("DOMContentLoaded", () => {
  const userRecommendationForm = document.getElementById("user-recommendation-form");
  const userRecommendationsList = document.getElementById("user-recommendations-list");
  const pointsCount = document.getElementById("points-count");

  let userPoints = 0;

  // Manejar la publicación de recomendaciones de usuarios
  userRecommendationForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const content = document.getElementById("recommendation-content").value.trim();
    if (!content) return;

    const recommendation = document.createElement("div");
    recommendation.classList.add("user-recommendation");
    recommendation.innerHTML = `<strong>Tú:</strong> ${content}`;
    userRecommendationsList.prepend(recommendation);

    // Incrementar puntos
    userPoints += 10; // Cada recomendación vale 10 puntos
    pointsCount.textContent = userPoints;

    // Limpiar el formulario
    userRecommendationForm.reset();
  });
});
