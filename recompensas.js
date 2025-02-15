document.addEventListener("DOMContentLoaded", () => {
  // Menú hamburguesa
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });
  
  // Para cada tarjeta, al hacer clic se alterna la clase "active"
  const rewardCards = document.querySelectorAll('.reward-card');
  rewardCards.forEach(card => {
    card.addEventListener('click', function(e) {
      // Si se hace clic en el botón "Canjear", no se despliega la tarjeta
      if(e.target.classList.contains('redeem-btn')){
          return;
      }
      this.classList.toggle('active');
    });
  });
});
