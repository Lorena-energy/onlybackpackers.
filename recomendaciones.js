document.addEventListener("DOMContentLoaded", () => {
  // Menú hamburguesa
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  // Publicar recomendaciones de usuarios
  const userRecommendationForm = document.getElementById("user-recommendation-form");
  const userRecommendationsList = document.getElementById("user-recommendations-list");

  userRecommendationForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const content = document.getElementById("recommendation-content").value.trim();
    if (!content) return;

    const recommendationDiv = document.createElement("div");
    recommendationDiv.classList.add("recommendation");
    recommendationDiv.innerHTML = `<p>${content}</p>`;

    userRecommendationsList.appendChild(recommendationDiv);
    userRecommendationForm.reset();
  });

  // Publicar recomendaciones destacadas
  const adminRecommendationForm = document.getElementById("admin-recommendation-form");
  const featuredList = document.getElementById("featured-list");

  adminRecommendationForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("recommendation-title").value.trim();
    const description = document.getElementById("recommendation-description").value.trim();
    if (!title || !description) return;

    const featuredDiv = document.createElement("div");
    featuredDiv.classList.add("recommendation");
    featuredDiv.innerHTML = `<h3>${title}</h3><p>${description}</p>`;

    featuredList.appendChild(featuredDiv);
    adminRecommendationForm.reset();
  });
});
