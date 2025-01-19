document.addEventListener("DOMContentLoaded", () => {
  const userRecommendationForm = document.getElementById("user-recommendation-form");
  const userRecommendationsList = document.getElementById("user-recommendations-list");
  const adminRecommendationForm = document.getElementById("admin-recommendation-form");
  const featuredList = document.getElementById("featured-list");

  const isAdmin = true; // Cambiar a false para ocultar el formulario de administradora

  // Mostrar formulario de administradora solo si es admin
  if (!isAdmin) {
    document.getElementById("add-featured-recommendations").style.display = "none";
  }

  // Manejar publicaciones de usuarios
  userRecommendationForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const content = document.getElementById("recommendation-content").value.trim();
    const link = document.getElementById("recommendation-link").value.trim();
    if (!content) return;

    const recommendation = document.createElement("div");
    recommendation.classList.add("recommendation");
    recommendation.innerHTML = `
      <strong>Tú:</strong>
      <p>${content}</p>
      ${link ? `<a href="${link}" target="_blank">Ver en Google Maps</a>` : ""}
      <button class="like-button">Me gusta <span>0</span></button>
      <button class="comment-button">Comentar</button>
    `;
    userRecommendationsList.prepend(recommendation);

    // Mostrar mensaje de puntos
    alert("¡Has ganado 10 puntos de recompensa!");

    userRecommendationForm.reset();
  });

  // Manejar recomendaciones destacadas
  adminRecommendationForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("recommendation-title").value.trim();
    const description = document.getElementById("recommendation-description").value.trim();
    const link = document.getElementById("recommendation-link").value.trim();
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

  // Menú hamburguesa
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });
});
