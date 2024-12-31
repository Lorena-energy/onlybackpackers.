document.getElementById("route-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const duration = parseInt(document.getElementById("trip-duration").value);
  const regions = Array.from(document.getElementById("regions").selectedOptions).map(option => option.text);
  const preferences = Array.from(document.querySelectorAll(".preferences input:checked")).map(input => input.value);

  const itinerary = document.getElementById("itinerary");
  itinerary.innerHTML = `
    <p><strong>Duración:</strong> ${duration} días</p>
    <p><strong>Destinos seleccionados:</strong> ${regions.join(", ")}</p>
    <p><strong>Preferencias:</strong> ${preferences.join(", ")}</p>
    <p><strong>Generando itinerario personalizado...</strong></p>
  `;

  document.getElementById("route-results").classList.remove("hidden");

  setTimeout(() => {
    itinerary.innerHTML += `
      <ul>
        ${regions.map((city, index) => `<li><strong>Día ${index + 1}-${index + Math.ceil(duration / regions.length)}:</strong> ${city}</li>`).join("")}
      </ul>
    `;
  }, 2000);
});
