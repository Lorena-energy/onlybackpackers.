let userPoints = 0;
let entriesCount = 0;
const maxEntries = 100;

// Actualizar puntos y entradas en pantalla
function updateDisplay() {
  document.getElementById("points-count").textContent = userPoints;
  document.getElementById("entries-count").textContent = entriesCount;
}

// Manejo de la participación en el sorteo
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("redeem-button")) {
    const pointsCost = parseInt(e.target.dataset.points, 10);

    if (e.target.dataset.sorteo === "gran-viaje") {
      // Participación en el sorteo
      if (userPoints >= pointsCost) {
        if (entriesCount < maxEntries) {
          userPoints -= pointsCost;
          entriesCount++;
          alert("¡Has participado en el sorteo de Gran Viaje!");
          updateDisplay();

          // Si se alcanza el máximo, activar el sorteo
          if (entriesCount === maxEntries) {
            alert("¡Sorteo activado! Anunciaremos al ganador pronto.");
            // Aquí puedes añadir lógica para elegir al ganador
          }
        } else {
          alert("El sorteo ya está completo. ¡Espera el próximo!");
        }
      } else {
        alert("No tienes suficientes puntos para participar.");
      }
    } else {
      // Canje de recompensas directas
      if (userPoints >= pointsCost) {
        userPoints -= pointsCost;
        alert("¡Has canjeado tu recompensa!");
        updateDisplay();
      } else {
        alert("No tienes suficientes puntos para canjear esta recompensa.");
      }
    }
  }
});

// Inicializar pantalla
updateDisplay();
