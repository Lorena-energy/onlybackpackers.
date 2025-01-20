document.addEventListener("DOMContentLoaded", () => {
  console.log("JS Recomendaciones cargado");

  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  const userRecommendationForm = document.getElementById("user-recommendation-form");
  const userRecommendationsList = document.getElementById("user-recommendations-list");

  const adminRecommendationForm = document.getElementById("admin-recommendation-form");
  const featuredList = document.getElementById("featured-list");

  const isAdmin = true;

  if (!isAdmin) {
    document.getElementById("add-featured-recommendations").style.display = "none";
  }

  userRecommendationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = document.getElementById("recommendation-content").value.trim();
    if (!content) return;

    const recommendation = document.createElement("div");
    recommendation.classList.add("recommendation");
    recommendation.innerHTML = `<p>${content}</p>`;
    userRecommendationsList.prepend(recommendation);

    alert("¡Has ganado 10 puntos de recompensa!");
    userRecommendationForm.reset();
  });

  adminRecommendationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("recommendation-title").value.trim();
    const description = document.getElementById("recommendation-description").value.trim();
    const link = document.getElementById("recommendation-affiliate-link").value.trim();

    if (!title || !description || !link) return;

    const featured = document.createElement("div");
    featured.classList.add("recommendation");
    featured.innerHTML = `
      <h3>${title}</h3>
      <p>${description}</p>
      <a href="${link}" class="cta-button" target="_blank">Reservar ahora</a>
    `;
    featuredList.prepend(featured);
    adminRecommendationForm.reset();
  });
});
