document.addEventListener("DOMContentLoaded", () => {
  console.log("recomendaciones.js: usando '.show' en lugar de '.active' para la hamburguesa.");

  // Menú hamburguesa
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  menuToggle.addEventListener("click", () => {
    // Igual que en tu chats page => .show
    menu.classList.toggle("show");
  });

  // isAdmin
  const isAdmin = true; // cámbialo a false si NO eres admin
  if (!isAdmin) {
    document.getElementById("admin-recommendation-form").style.display = "none";
  }

  // Recomendaciones de Usuarios
  const userRecommendationForm = document.getElementById("user-recommendation-form");
  const userRecommendationsList = document.getElementById("user-recommendations-list");

  userRecommendationForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const content = document.getElementById("recommendation-content").value.trim();
    const mediaFiles = document.getElementById("recommendation-media").files;
    const link = document.getElementById("recommendation-link").value.trim();
    const alsoCommunity = document.getElementById("also-community").checked;

    if (!content) return;

    // Puntos
    let points = 10;
    if (alsoCommunity) points += 5;

    // Bloque recomendación
    const recDiv = document.createElement("div");
    recDiv.classList.add("recommendation");

    let mediaHTML = "";
    if (mediaFiles && mediaFiles.length > 0) {
      mediaHTML += '<div class="media-container">';
      Array.from(mediaFiles).forEach((file) => {
        const fileURL = URL.createObjectURL(file);
        if (file.type.startsWith("video")) {
          mediaHTML += `<video src="${fileURL}" controls></video>`;
        } else {
          mediaHTML += `<img src="${fileURL}" alt="Media"/>`;
        }
      });
      mediaHTML += "</div>";
    }

    let finalHTML = `
      <p><strong>Tú:</strong> ${content}</p>
      ${link ? `<p><a href="${link}" target="_blank" style="color:#0077cc;">Ver en Google Maps</a></p>` : ""}
      ${mediaHTML}
      <p>¡Has ganado ${points} puntos!</p>
    `;

    recDiv.innerHTML = finalHTML;
    userRecommendationsList.prepend(recDiv);

    alert(`¡Has ganado ${points} puntos de recompensa!`);
    userRecommendationForm.reset();
  });

  // Recomendaciones Destacadas
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
      <img src="${photoURL}" alt="Destacada" style="max-width:100%; border-radius:5px; margin-top:10px;"/>
      <p>${description}</p>
      <a href="${link}" target="_blank" class="cta-button" style="margin-top:10px; display:inline-block;">
        Reservar ahora
      </a>
    `;

    featuredList.prepend(featDiv);
    adminRecommendationForm.reset();
  });
});
