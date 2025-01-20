/***************************************************
 * RECOMENDACIONES.JS 
 * con humor, por Sheldon ;)
 ***************************************************/
document.addEventListener("DOMContentLoaded", () => {
  console.log("Hola, Lorena. Sheldon con humor: Si no sale la hamburguesa, ¡llamamos a los Cazafantasmas CSS!");

  // ================== MENÚ HAMBURGUESA ==================
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  // ================== LÓGICA DE USUARIOS ==================
  const userRecommendationForm = document.getElementById("user-recommendation-form");
  const userRecommendationsList = document.getElementById("user-recommendations-list");

  userRecommendationForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const content = document.getElementById("recommendation-content").value.trim();
    const mediaFiles = document.getElementById("recommendation-media").files;
    const link = document.getElementById("recommendation-link").value.trim();
    const alsoCommunity = document.getElementById("also-community").checked;

    if (!content) return;

    // Creamos el contenedor
    const recommendationDiv = document.createElement("div");
    recommendationDiv.classList.add("recommendation");

    // Manejar archivos
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

    // Cálculo de puntos
    let basePoints = 10;
    if (alsoCommunity) basePoints += 5;

    // HTML final
    let htmlContent = `
      <p><strong>Tú:</strong> ${content}</p>
      ${link ? `<p><a href="${link}" target="_blank" style="color:#0077cc;">Ver en Google Maps</a></p>` : ""}
      ${mediaHTML}
      <p>¡Has ganado ${basePoints} puntos!</p>
      <button class="cta-button like-button" data-likes="0">Me gusta (0)</button>
      <button class="cta-button comment-button">Comentar</button>
    `;

    recommendationDiv.innerHTML = htmlContent;
    userRecommendationsList.prepend(recommendationDiv);

    alert(`¡Has ganado ${basePoints} puntos de recompensa!`);
    userRecommendationForm.reset();
  });

  // ================== LÓGICA DE DESTACADAS (ADMIN) ==================
  const isAdmin = true; // Cambiar a false si quieres ocultar el form
  const adminRecommendationForm = document.getElementById("admin-recommendation-form");
  const featuredList = document.getElementById("featured-list");

  if (!isAdmin) {
    document.getElementById("add-featured-recommendations").style.display = "none";
  }

  adminRecommendationForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("recommendation-title").value.trim();
    const description = document.getElementById("recommendation-description").value.trim();
    const link = document.getElementById("recommendation-affiliate-link").value.trim();
    const photoFile = document.getElementById("recommendation-photo").files[0];

    if (!title || !description || !link || !photoFile) return;

    const photoURL = URL.createObjectURL(photoFile);

    const featuredDiv = document.createElement("div");
    featuredDiv.classList.add("recommendation");
    featuredDiv.innerHTML = `
      <h3>${title}</h3>
      <img src="${photoURL}" alt="Recomendación destacada" style="max-width:100%; border-radius:5px; margin-top:10px;" />
      <p>${description}</p>
      <a href="${link}" target="_blank" class="cta-button" style="margin-top:10px; display:inline-block;">Reservar ahora</a>
    `;

    featuredList.prepend(featuredDiv);
    adminRecommendationForm.reset();
  });

  // ================== CONTADOR DE "ME GUSTA" Y COMENTARIOS ==================
  document.addEventListener("click", (e) => {
    // Contador real de "Me gusta"
    if (e.target.classList.contains("like-button")) {
      let currentLikes = parseInt(e.target.getAttribute("data-likes")) || 0;
      currentLikes++;
      e.target.setAttribute("data-likes", currentLikes);
      e.target.textContent = `Me gusta (${currentLikes})`;
    }

    // Comentarios
    if (e.target.classList.contains("comment-button")) {
      const parent = e.target.parentElement;
      if (!parent.querySelector("textarea")) {
        const commentBox = document.createElement("textarea");
        commentBox.placeholder = "Escribe un comentario...";
        commentBox.style.display = "block";
        commentBox.style.marginTop = "10px";
        parent.appendChild(commentBox);
      }
    }
  });
})();
