document.addEventListener("DOMContentLoaded", () => {
  // Variable para simular los puntos del usuario
  let userPoints = 100000;
  const userPointsEl = document.getElementById("userPoints");
  userPointsEl.textContent = userPoints;

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
      const cost = parseInt(btn.getAttribute("data-cost"), 10);

      // Mostrar confirmación para canjear
      const confirmar = confirm(`Vas a canjear "${reward}" por ${cost} puntos. ¿Estás de acuerdo?`);
      if (confirmar) {
        // Verificar si el usuario tiene suficientes puntos
        if (userPoints >= cost) {
          userPoints -= cost;
          userPointsEl.textContent = userPoints;
          alert(`¡Felicidades! Has canjeado "${reward}".`);
        } else {
          alert("No tienes puntos suficientes para canjear este premio.");
        }
      }
    });
  });
});
