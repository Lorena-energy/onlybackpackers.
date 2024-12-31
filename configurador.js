document.getElementById("route-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const departureCity = document.getElementById("departure-city").value;
  const duration = document.getElementById("trip-duration").value;
  const regions = Array.from(document.getElementById("regions").selectedOptions).map(option => option.text);
  const preferences = Array.from(document.querySelectorAll("input[type=checkbox]:checked")).map(input => input.parentElement.textContent.trim());

  const itinerary = document.getElementById("itinerary");
  itinerary.innerHTML = `
    <p><strong>Ciudad de Partida:</strong> ${departureCity}</p>
    <p><strong>Duración:</strong> ${duration} días</p>
    <p><strong>Destinos seleccionados:</strong> ${regions.join(", ")}</p>
    <p><strong>Preferencias:</strong> ${preferences.join(", ")}</p>
    <p><strong>Próxima parada:</strong> <em>Calculando destinos...</em></p>
  `;

  document.getElementById("route-results").classList.remove("hidden");

  // Simular IA para generar una ruta
  setTimeout(() => {
    const suggestedRoute = regions.map((region, index) => `<li><strong>Día ${index * 3 + 1}-${(index + 1) * 3}:</strong> ${region} - Disfruta tus preferencias</li>`).join("");
    itinerary.innerHTML += `<ul>${suggestedRoute}</ul>`;
  }, 2000);
});
