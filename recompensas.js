document.addEventListener("DOMContentLoaded", () => {
    let userPoints = 50000; // Simulación de puntos del usuario (esto luego se integrará con una base de datos)

    function updatePointsDisplay() {
        document.getElementById("user-points").textContent = userPoints;
    }

    function redeemReward(cost, rewardName) {
        if (userPoints >= cost) {
            userPoints -= cost;
            updatePointsDisplay();
            alert(`🎉 ¡Felicidades! Has canjeado ${rewardName}. Te quedan ${userPoints} puntos.`);
        } else {
            alert("❌ No tienes suficientes puntos para canjear esta recompensa.");
        }
    }

    document.querySelectorAll(".redeem-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            const cost = parseInt(e.target.getAttribute("data-cost"));
            const rewardName = e.target.getAttribute("data-reward");
            redeemReward(cost, rewardName);
        });
    });

    updatePointsDisplay();
});
