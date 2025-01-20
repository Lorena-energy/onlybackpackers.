document.addEventListener("DOMContentLoaded", () => {
  console.log("JS cargado - Recomendaciones");

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

    const contentField = document.getElementById("recommendation-content");
    const linkField = document.getElementById("recommendation-link");
    const mediaField = document.getElementById("recommendation-media");

    const content = contentField.value.trim();
    const link = linkField.value.trim();
    const mediaFiles = mediaField.files;

    if (!content) return;

    // Crear bloque de recomendación
    const recommendation = document.createElement("div");
    recommendation.classList.add("recommendation");

    // Media (fotos o videos)
    let mediaHTML = "";
    if (mediaFiles && mediaFiles.length > 0) {
      mediaHTML += '<div class="media-container">';
      Array.from(mediaFiles).forEach((file) => {
        const fileURL = URL.createObjectURL(file);
        if (file.type.startsWith("video")) {
          mediaHTML += `<video src="${fileURL}" controls></video>`;
        } else {
          mediaHTML += `<img src="${fileURL}" alt="Media" />`;
        }
      });
      mediaHTML += "</div>";
    }

    recommendation.innerHTML = `
      <strong>Tú:</strong>
      <p>${content}</p>
      ${link ? `<a href="${link}" target="_blank" style="color: #0077cc">Ver en Google Maps</a>` : ""}
      <br>
      ${mediaHTML}
      <button class="like-button">Me gusta <span>0</span></button>
      <button class="comment-button">Comentar</button>
    `;

    userRecommendationsList.prepend(recommendation);

    // Sumar 10 puntos (lógica real se hará más adelante)
    alert("¡Has ganado 10 puntos de recompensa!");

    // Resetear form
    userRecommendationForm.reset();
  });

  // Publicar recomendaciones destacadas (admin)
  adminRecommendationForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const titleField = document.getElementById("recommendation-title");
    const descField = document.getElementById("recommendation-description");
    const linkField = document.getElementById("recommendation-affiliate-link");

    const title = titleField.value.trim();
    const description = descField.value.trim();
    const link = linkField.value.trim();
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

    // Futuras push notifications a usuarios (en PWA)...
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
