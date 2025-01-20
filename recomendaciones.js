document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  const userRecommendationForm = document.getElementById("user-recommendation-form");
  const userRecommendationsList = document.getElementById("user-recommendations-list");
  const adminRecommendationForm = document.getElementById("admin-recommendation-form");
  const featuredList = document.getElementById("featured-list");

  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  userRecommendationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = document.getElementById("recommendation-content").value.trim();
    const link = document.getElementById("recommendation-link").value.trim();
    const mediaFiles = document.getElementById("recommendation-media").files;

    if (!content) return;

    const recommendation = document.createElement("div");
    recommendation.classList.add("recommendation");

    let mediaHTML = "";
    if (mediaFiles.length > 0) {
      Array.from(mediaFiles).forEach((file) => {
        const fileURL = URL.createObjectURL(file);
        mediaHTML += file.type.startsWith("video")
          ? `<video src="${fileURL}" controls></video>`
          : `<img src="${fileURL}" alt="Media">`;
      });
    }

    recommendation.innerHTML = `
      <p><strong>Tú:</strong> ${content}</p>
      ${link ? `<a href="${link}" target="_blank">Ver en Google Maps</a>` : ""}
      ${mediaHTML}
      <button class="cta-button like-button">Me gusta</button>
      <button class="cta-button comment-button">Comentar</button>
    `;

    userRecommendationsList.prepend(recommendation);
    alert("¡Has ganado 10 puntos de recompensa!");
    userRecommendationForm.reset();
  });

  adminRecommendationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("recommendation-title").value.trim();
    const description = document.getElementById("recommendation-description").value.trim();
    const link = document.getElementById("recommendation-affiliate-link").value.trim();
    const photoFile = document.getElementById("recommendation-photo").files[0];

    if (!title || !description || !link || !photoFile) return;

    const photoURL = URL.createObjectURL(photoFile);

    const featured = document.createElement("div");
    featured.classList.add("recommendation");
    featured.innerHTML = `
      <h3>${title}</h3>
      <img src="${photoURL}" alt="Recomendación destacada">
      <p>${description}</p>
      <a href="${link}" target="_blank" class="cta-button">Reservar ahora</a>
    `;

    featuredList.prepend(featured);
    adminRecommendationForm.reset();
  });
});
