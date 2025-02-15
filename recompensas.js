document.addEventListener("DOMContentLoaded", () => {
  // Menú hamburguesa
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  // Para cada tarjeta, al hacer clic se alterna la clase "active"
  const rewardCards = document.querySelectorAll(".reward-card");
  rewardCards.forEach((card) => {
    card.addEventListener("click", function (e) {
      // Evita que el clic en el botón "Canjear" active el desplegable
      if (e.target.classList.contains("redeem-btn")) {
        return;
      }
      this.classList.toggle("active");
    });
  });

  // Evento para los botones "Canjear"
  const redeemButtons = document.querySelectorAll(".redeem-btn");
  redeemButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // Evita que se propague el evento al contenedor de la tarjeta
      const reward = btn.getAttribute("data-reward");
      const cost = btn.getAttribute("data-cost");
      // Aquí puedes agregar la lógica de canje. Por ahora, muestra un mensaje.
      alert(`Has canjeado "${reward}" por ${cost} puntos.`);
    });
  });
});
