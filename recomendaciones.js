document.addEventListener("DOMContentLoaded", () => {
  /************************************************************
   * MENÚ HAMBURGUESA
   ************************************************************/
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  /************************************************************
   * LÓGICA DE RECOMENDACIONES
   ************************************************************/
  const userRecommendationForm = document.getElementById("user-recommendation-form");
  const userRecommendationsList = document.getElementById("user-recommendations-list");
  const adminRecommendationForm = document.getElementById("admin-recommendation-form");
  const featuredList = document.getElementById("featured-list");

  // Simulación: si es admin o no
  const isAdmin = true; // Cambia a false para probar sin acceso de admin

  // Mostrar formulario de admin solo si es admin
  if (!isAdmin) {
    document.getElementById("add-featured-recommendations").style.display = "none";
  }

  // Publicar recomendaciones de usuarios
  userRecommendationForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const content = document.getElementById("recommendation-content").value.trim();
    const link = document.getElementById("recommendation-link").value.trim();
    if (!content) return;

    // Crear bloque de recomendación
    const recommendation = document.createElement("div");
    recommendation.classList.add("recommendation");
    recommendation.innerHTML = `
      <strong>Tú:</strong>
      <p>${content}</p>
      ${
        link
          ? `<a href="${link}" target="_blank" style="color: #0077cc">Ver en Google Maps</a>`
          : ""
      }
      <br>
      <button class="like-button">Me gusta <span>0</span></button>
      <button class="comment-button">Comentar</button>
    `;

    userRecommendationsList.prepend(recommendation);

    // Sumar 10 puntos (lógica por implementar en recompensas.js)
    alert("¡Has ganado 10 puntos de recompensa!");

    userRecommendationForm.reset();
  });

  // Publicar recomendaciones destacadas (admin)
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
      <!-- Botón de reserva (afiliado) -->
      <a href="${link}" class="cta-button" target="_blank">Reservar ahora</a>
    `;

    featuredList.prepend(featured);
    adminRecommendationForm.reset();

    // Futuras push notifications a usuarios (en PWA)
    // ...
  });

  // Like y comentarios en las recomendaciones
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("like-button")) {
      const span = e.target.querySelector("span");
      span.textContent = parseInt(span.textContent) + 1;
    }

    if (e.target.classList.contains("comment-button")) {
      const parent = e.target.parentElement;
      // Evitar duplicar un <textarea> si ya existe
      if (!parent.querySelector("textarea")) {
        const commentBox = document.createElement("textarea");
        commentBox.placeholder = "Escribe un comentario...";
        commentBox.style.display = "block";
        commentBox.style.marginTop = "10px";
        parent.appendChild(commentBox);
      }
    }
  });
});
