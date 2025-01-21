document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  const userRecommendationForm = document.getElementById("user-recommendation-form");
  const userRecommendationsList = document.getElementById("user-recommendations-list");

  userRecommendationForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const content = document.getElementById("recommendation-content").value.trim();
    const link = document.getElementById("recommendation-link").value.trim();
    const mediaFiles = document.getElementById("recommendation-media").files;
    const alsoCommunity = document.getElementById("also-community").checked;

    if (!content) return;

    const recommendationDiv = document.createElement("div");
    recommendationDiv.classList.add("recommendation");

    let mediaHTML = "";
    Array.from(mediaFiles).forEach((file) => {
      const fileURL = URL.createObjectURL(file);
      mediaHTML += file.type.startsWith("video")
        ? `<video src="${fileURL}" controls></video>`
        : `<img src="${fileURL}" alt="Media">`;
    });

    recommendationDiv.innerHTML = `
      <p><strong>Tú:</strong> ${content}</p>
      ${link ? `<a href="${link}" target="_blank" style="color:#0077cc;">Ver en Google Maps</a>` : ""}
      ${mediaHTML}
      <p>¡Has ganado ${alsoCommunity ? 15 : 10} puntos!</p>
    `;

    userRecommendationsList.prepend(recommendationDiv);
    alert(`¡Has ganado ${alsoCommunity ? 15 : 10} puntos de recompensa!`);
    userRecommendationForm.reset();
  });
});
