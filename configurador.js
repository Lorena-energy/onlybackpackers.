document.getElementById("route-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const duration = document.getElementById("trip-duration").value;
  const regions = Array.from(document.getElementById("regions").selectedOptions).map(option => option.text);
  const preferences = Array.from(document.getElementById("preferences").selectedOptions).map(option => option.text);

  const itinerary = document.getElementById("itinerary");
  itinerary.innerHTML = `
    <p><strong>Duración:</strong> ${duration} días</p>
    <p><strong>Regiones seleccionadas:</strong> ${regions.join(", ")}</p>
    <p><strong>Preferencias:</strong> ${preferences.join(", ")}</p>
    <p><strong>Próxima parada:</strong> <em>Calculando destinos...</em></p>
  `;

  document.getElementById("route-results").classList.remove("hidden");

  // Simular IA
  setTimeout(() => {
    itinerary.innerHTML += `
      <ul>
        <li><strong>Día 1-5:</strong> París - Visita la Torre Eiffel</li>
        <li><strong>Día 6-10:</strong> Roma - Explora el Coliseo</li>
        <li><strong>Día 11-15:</strong> Berlín - Descubre la historia</li>
      </ul>
    `;
  }, 2000);
});

// Seleccionar elementos
const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

// Alternar menú en dispositivos móviles
menuToggle.addEventListener("click", () => {
  menu.classList.toggle("active");
});
