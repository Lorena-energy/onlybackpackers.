document.addEventListener("DOMContentLoaded", () => {
  // Simulación de puntos del usuario
  let userPoints = 100000;
  const userPointsEl = document.getElementById("userPoints");
  userPointsEl.textContent = userPoints;

  // Menú hamburguesa
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  // Detectar si es dispositivo táctil
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Alternar visualización del contenido de la tarjeta
  const toggleCardHandler = (e) => {
    if (e.target.classList.contains("redeem-btn")) return;
    e.currentTarget.classList.toggle("active");
  };

  // Asignar evento a cada tarjeta
  const rewardCards = document.querySelectorAll(".reward-card");
  rewardCards.forEach((card) => {
    if (isTouchDevice) {
      card.addEventListener("touchend", toggleCardHandler);
    } else {
      card.addEventListener("click", toggleCardHandler);
    }
  });

  // Lógica de canjeo de recompensas
  const redeemButtons = document.querySelectorAll(".redeem-btn");
  redeemButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // No activar el toggle de tarjeta
      const reward = btn.dataset.reward;
      const cost = parseInt(btn.dataset.cost, 10);

      const confirmar = confirm(`¿Seguro que deseas canjear "${reward}" por ${cost} puntos?`);
      if (confirmar) {
        if (userPoints >= cost) {
          userPoints -= cost;
          userPointsEl.textContent = userPoints;
          alert(`¡Canje realizado! Has obtenido "${reward}".`);
        } else {
          alert("No tienes suficientes puntos para canjear esta recompensa.");
        }
      }
    });
  });
});
