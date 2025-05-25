document.addEventListener("DOMContentLoaded", () => {
  // Variable para simular los puntos del usuario (inicialmente 100,000)
  let userPoints = 100000;
  const userPointsEl = document.getElementById("userPoints");
  userPointsEl.textContent = userPoints;

  // Menú hamburguesa
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  // Determinar si el dispositivo es táctil
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Función para alternar el despliegue de la tarjeta
  const toggleCardHandler = (e) => {
    // Evitar que el clic/tap en el botón "Canjear" active la tarjeta
    if (e.target.classList.contains("redeem-btn")) return;
    e.currentTarget.classList.toggle("active");
  };

  // Asignar el evento adecuado (touchend para móviles, click para desktop)
  const rewardCards = document.querySelectorAll(".reward-card");
  rewardCards.forEach((card) => {
    if (isTouchDevice) {
      card.addEventListener("touchend", toggleCardHandler);
    } else {
      card.addEventListener("click", toggleCardHandler);
    }
  });

  // Eventos para los botones "Canjear"
  const redeemButtons = document.querySelectorAll(".redeem-btn");
  redeemButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // Evita que se active la tarjeta
      const reward = btn.dataset.reward;
      const cost = parseInt(btn.dataset.cost, 10);

      console.log(`Intentando canjear "${reward}" por ${cost} puntos. Puntos actuales: ${userPoints}`);

      // Mostrar confirmación para el canje
      const confirmar = confirm(`Vas a canjear "${reward}" por ${cost} puntos. ¿Estás de acuerdo?`);
      if (confirmar) {
        if (userPoints >= cost) {
          userPoints -= cost;
          userPointsEl.textContent = userPoints;
          alert(`¡Felicidades! Has canjeado "${reward}".`);
          console.log(`Canje exitoso. Puntos restantes: ${userPoints}`);
        } else {
          alert("No tienes puntos suficientes para canjear este premio.");
          console.log("Canje fallido: puntos insuficientes.");
        }
      } else {
        console.log("El canje fue cancelado por el usuario.");
      }
    });
  });
});
