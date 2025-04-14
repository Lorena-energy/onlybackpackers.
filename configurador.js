// configurador.js

document.addEventListener("DOMContentLoaded", () => {
  console.log("configurador.js cargado correctamente");

  const form = document.getElementById("route-form");
  const itineraryBox = document.getElementById("itinerary");
  const resultsSection = document.getElementById("route-results");
  const guardarBtn = document.getElementById("guardar-ruta");
  const compartirBtn = document.getElementById("compartir-ruta");

  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const departureCity = document.getElementById("departure-city").value.trim();
    const tripDuration = document.getElementById("trip-duration").value.trim();
    const budget = document.getElementById("trip-budget").value.trim();
    const zones = document.getElementById("trip-zones").value.trim();
    const preferences = document.getElementById("preferences").value;
    const dates = document.getElementById("trip-dates").value.trim();

    const prompt = `Hola ob.packersGPT. Necesito que crees una ruta personalizada para un viaje desde ${departureCity} de ${tripDuration} días, centrado en un viaje de tipo ${preferences}. ` +
                   `${budget ? `El presupuesto aproximado es ${budget}. ` : ""}` +
                   `${zones ? `La zona que me gustaría visitar es: ${zones}. ` : ""}` +
                   `${dates ? `Las fechas del viaje son: ${dates}. ` : ""}` +
                   `Por favor, detalla los días o lugares a visitar, actividades recomendadas, transportes y consejos. ` +
                   `Se claro, ordenado y separa los días con títulos si es posible.`;

    try {
      itineraryBox.innerHTML = "⏳ Generando tu ruta con IA...";
      resultsSection.classList.remove("hidden");

      const safeKey = atob("c2stcHJvai1PMzFLSFg3X0pVd2NDSVN5aVIxQTRzeERZTzc5TjZxcG1TMzF3S2UtWnFEZGFCanQyeXpjcTU5TExDZFRpZFBaMzRrLXdHZjc0N1QzQmxia0ZKUElsQkdHWVVGRmhCR21FOGswWmRybERvYzJia2Zrc3d1dlhMUW83RWE3WGl0RE9BcEhtRGhEUFJXTTFOclVfWmRTNUZSU054TUE=");

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${safeKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7
        })
      });

      const data = await response.json();
      const output = data.choices?.[0]?.message?.content || "No se pudo generar la ruta.";

      itineraryBox.innerHTML = `
        <div class="respuestaGPT">${output.replace(/\n/g, '<br>')}</div>
        <div style="text-align:center; margin-top:20px;">
          <a href="worldtrip.html#viajes-a-medida" class="cta-button" style="background:#00897B;">👩‍💼 ¿Quieres atención personalizada? Haz clic aquí</a>
        </div>
      `;
    } catch (err) {
      console.error("Error generando ruta:", err);
      itineraryBox.innerHTML = "❌ Ocurrió un error al generar la ruta. Intenta de nuevo más tarde.";
    }
  });
});

