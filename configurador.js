// Manejar el formulario del configurador
document.getElementById("route-form").addEventListener("submit", (e) => {
  e.preventDefault();

  // Obtener datos del formulario
  const duration = document.getElementById("trip-duration").value;
  const regions = Array.from(document.getElementById("regions").selectedOptions).map(option => option.text);
  const preferences = Array.from(document.getElementById("preferences").selectedOptions).map(option => option.text);

  // Mostrar resultados iniciales
  const itinerary = document.getElementById("itinerary");
  itinerary.innerHTML = `
    <p><strong>Duración:</strong> ${duration} días</p>
    <p><strong>Regiones seleccionadas:</strong> ${regions.join(", ")}</p>
    <p><strong>Preferencias:</strong> ${preferences.join(", ")}</p>
    <p><strong>Próxima parada:</strong> <em>Calculando destinos...</em></p>
  `;

  // Mostrar la sección de resultados
  document.getElementById("route-results").classList.remove("hidden");

  // Simular la generación de un itinerario con IA (simulación con timeout)
  setTimeout(() => {
    itinerary.innerHTML += `
      <ul>
        <li><strong>Día 1-5:</strong> París - Visita la Torre Eiffel y el Museo del Louvre.</li>
        <li><strong>Día 6-10:</strong> Roma - Explora el Coliseo, la Fontana di Trevi y el Vaticano.</li>
        <li><strong>Día 11-15:</strong> Berlín - Descubre la Puerta de Brandeburgo y el Muro de Berlín.</li>
        <li><strong>Día 16-20:</strong> Ámsterdam - Recorre los canales y el Museo Van Gogh.</li>
      </ul>
    `;
  }, 2000);
});

// Manejar el menú en dispositivos móviles
const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

// Alternar visibilidad del menú
menuToggle.addEventListener("click", () => {
  menu.classList.toggle("active");
});
