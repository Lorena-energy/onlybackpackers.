document.addEventListener("DOMContentLoaded", () => {
  console.log("recomendaciones.js cargado");

  // Menú hamburguesa
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("show");
  });

  // Simulación: variable isAdmin para controlar la visibilidad del formulario admin
  const isAdmin = true; // Cambia a false para ocultar la sección de admin
  if (!isAdmin) {
    const adminSection = document.getElementById("admin-recommendations");
    if (adminSection) adminSection.style.display = "none";
  }

  // Muro de Recomendaciones de Usuarios
  const userRecommendationForm = document.getElementById("user-recommendation-form");
  const userRecommendationsList = document.getElementById("user-recommendations-list");

  userRecommendationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = document.getElementById("recommendation-content").value.trim();
    const mediaFiles = document.getElementById("recommendation-media").files;
    const link = document.getElementById("recommendation-link").value.trim();
    const alsoCommunity = document.getElementById("also-community").checked;

    if (!content) return;

    // (Opcional) Lógica de puntos
    let points = 10;
    if (alsoCommunity) points += 5;

    // Crear el bloque de recomendación
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
          mediaHTML += `<img src="${fileURL}" alt="Media">`;
        }
      });
      mediaHTML += "</div>";
    }

    let finalHTML = `
      <p><strong>Usuario:</strong> ${content}</p>
      ${link ? `<p><a href="${link}" target="_blank" style="color:#0077cc;">Ver en Google Maps</a></p>` : ""}
      ${mediaHTML}
      <p><em>Has ganado ${points} puntos.</em></p>
    `;
    recDiv.innerHTML = finalHTML;
    userRecommendationsList.prepend(recDiv);
    alert(`¡Tu recomendación ha sido publicada y has ganado ${points} puntos!`);
    userRecommendationForm.reset();
  });

  // Recomendaciones Destacadas (Admin)
  const adminRecommendationForm = document.getElementById("admin-recommendation-form");
  const featuredList = document.getElementById("featured-list");

  if (adminRecommendationForm) {
    adminRecommendationForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("recommendation-title").value.trim();
      const description = document.getElementById("recommendation-description").value.trim();
      const affiliateLink = document.getElementById("recommendation-affiliate-link").value.trim();
      const photoFile = document.getElementById("recommendation-photo").files[0];

      if (!title || !description || !affiliateLink || !photoFile) return;

      const photoURL = URL.createObjectURL(photoFile);
      const featDiv = document.createElement("div");
      featDiv.classList.add("recommendation");
      featDiv.innerHTML = `
        <h3>${title}</h3>
        <img src="${photoURL}" alt="Recomendación Destacada">
        <p>${description}</p>
        <p><a href="${affiliateLink}" target="_blank" class="cta-button" style="color:#0077cc;">Reservar ahora</a></p>
      `;
      featuredList.prepend(featDiv);
      alert("Recomendación destacada publicada.");
      adminRecommendationForm.reset();
    });
  }
});

