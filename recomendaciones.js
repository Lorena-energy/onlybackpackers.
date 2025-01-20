/**************************************************************
 * RECOMENDACIONES.JS
 * Sheldon con humor para Lorena :)
 **************************************************************/
document.addEventListener("DOMContentLoaded", () => {
  console.log("Recomendaciones.js cargado con humor. ¡Ánimo Lorena!");

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

    // Recogemos datos
    const contentField = document.getElementById("recommendation-content");
    const mediaField = document.getElementById("recommendation-media");
    const linkField = document.getElementById("recommendation-link");
    const alsoCommunity = document.getElementById("also-community").checked;

    const content = contentField.value.trim();
    const mediaFiles = mediaField.files;
    const link = linkField.value.trim();

    if (!content) return; // no se publica si está vacío

    // Creamos bloque de recomendación
    const recDiv = document.createElement("div");
    recDiv.classList.add("recommendation");

    // Generar HTML de media
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

    // Puntos base = 10, +5 si publica en comunidad
    let points = 10;
    if (alsoCommunity) points += 5;

    // Montamos HTML final
    let finalHTML = `
      <p><strong>Tú:</strong> ${content}</p>
      ${link ? `<p><a href="${link}" target="_blank" style="color:#0077cc;">Ver en Google Maps</a></p>` : ""}
      ${mediaHTML}
      <p>¡Has ganado ${points} puntos!</p>
      <button class="cta-button like-button" data-likes="0">Me gusta (0)</button>
      <button class="cta-button comment-button">Comentar</button>
    `;

    recDiv.innerHTML = finalHTML;
    userRecommendationsList.prepend(recDiv);

    alert(`¡Has ganado ${points} puntos de recompensa!`);
    userRecommendationForm.reset();
  });

  // ================== LÓGICA DE DESTACADAS (ADMIN) ==================
  const isAdmin = true; // cámbialo a false para ocultar
  if (!isAdmin) {
    document.getElementById("add-featured-recommendations").style.display = "none";
  }

  const adminRecommendationForm = document.getElementById("admin-recommendation-form");
  const featuredList = document.getElementById("featured-list");

  adminRecommendationForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("recommendation-title").value.trim();
    const description = document.getElementById("recommendation-description").value.trim();
    const link = document.getElementById("recommendation-affiliate-link").value.trim();
    const photoFile = document.getElementById("recommendation-photo").files[0];

    if (!title || !description || !link || !photoFile) return;

    const photoURL = URL.createObjectURL(photoFile);

    const featDiv = document.createElement("div");
    featDiv.classList.add("recommendation");
    featDiv.innerHTML = `
      <h3>${title}</h3>
      <img src="${photoURL}" alt="Recomendación destacada" style="max-width:100%; border-radius:5px; margin-top:10px;" />
      <p>${description}</p>
      <a href="${link}" target="_blank" class="cta-button" style="margin-top:10px; display:inline-block;">Reservar ahora</a>
    `;

    featuredList.prepend(featDiv);
    adminRecommendationForm.reset();
  });

  // ================== CONTADOR DE "ME GUSTA" Y COMENTARIOS ==================
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("like-button")) {
      let likes = parseInt(e.target.getAttribute("data-likes")) || 0;
      likes++;
      e.target.setAttribute("data-likes", likes);
      e.target.textContent = `Me gusta (${likes})`;
    }

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
});
