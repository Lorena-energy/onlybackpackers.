document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  const userRecommendationForm = document.getElementById("user-recommendation-form");
  userRecommendationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("¡Recomendación publicada!");
  });
});
