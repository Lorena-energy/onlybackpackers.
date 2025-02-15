document.addEventListener("DOMContentLoaded", () => {
  // Menú hamburguesa
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  // Función para desplegar/ocultar el contenido de la tarjeta
  window.toggleReward = function(card) {
    card.classList.toggle("active");
  }
});
