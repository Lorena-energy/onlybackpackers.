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
    const link = document.getElementById("recommendation-link").value.trim();

    if (!content) return;

    // Crear la recomendación
    const recommendation = document.createElement("div");
    recommendation.classList.add("user-recommendation");

    recommendation.innerHTML = `
      <strong>Tú:</strong> ${content}
      ${link ? `<br><a href="${link}" target="_blank">Ver en Google Maps</a>` : ''}
    `;

    userRecommendationsList.prepend(recommendation);

    // Mostrar mensaje de puntos ganados
    alert("¡Has ganado 10 puntos de recompensa!");

    // Resetear el formulario
    userRecommendationForm.reset();
  });
});
