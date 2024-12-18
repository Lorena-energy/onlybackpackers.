let userPoints = 0;

function updatePointsDisplay() {
  document.getElementById("points-count").textContent = userPoints;
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("redeem-button")) {
    const pointsCost = parseInt(e.target.dataset.points, 10);

    if (userPoints >= pointsCost) {
      userPoints -= pointsCost;
      alert("¡Recompensa canjeada! Disfruta de tu beneficio.");
      updatePointsDisplay();
    } else {
      alert("No tienes suficientes puntos para esta recompensa.");
    }
  }
});

// Simulación para ganar puntos
function addPoints(points) {
  userPoints += points;
  updatePointsDisplay();
}

// Inicializar puntos
updatePointsDisplay();
