document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  const userRecommendationForm = document.getElementById("user-recommendation-form");
  const userRecommendationsList = document.getElementById("user-recommendations-list");
  const featuredList = document.getElementById("featured-list");

  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  userRecommendationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = document.getElementById("recommendation-content").value.trim();
    const link = document.getElementById("recommendation-link").value.trim();
    const mediaFiles = document.getElementById("recommendation-media").files;
    const publishCommunity = document.getElementById("publish-community").checked;

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

    // Sumar puntos
    const points = publishCommunity ? 15 : 10;
    alert(`¡Has ganado ${points} puntos de recompensa!`);

    userRecommendationForm.reset();
  });
});
