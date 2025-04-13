document.addEventListener("DOMContentLoaded", () => {
  console.log("configurador.js cargado correctamente");

  // Mostrar el menú hamburguesa si lo estás usando
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      menu.classList.toggle("active");
    });
  }

  // Ruta personalizada generada
  const routeForm = document.getElementById("route-form");
  const routeResults = document.getElementById("route-results");
  const itineraryDiv = document.getElementById("itinerary");

  // Botones de acción
  let guardarBtn, compartirBtn;

  routeForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const ciudad = document.getElementById("departure-city").value;
    const duracion = document.getElementById("trip-duration").value;
    const tipo = document.getElementById("preferences").value;

    const rutaGenerada = `🧭 ¡Aquí tienes tu ruta! Salida desde ${ciudad}, durante ${duracion} días, centrado en un viaje ${tipo}. ¡Prepárate para la aventura!`;

    // Mostrar la ruta
    itineraryDiv.innerText = rutaGenerada;
    routeResults.classList.remove("hidden");

    // Crear botones si no existen
    if (!guardarBtn && !compartirBtn) {
      guardarBtn = document.createElement("button");
      guardarBtn.innerText = "💾 Guardar Ruta";
      guardarBtn.className = "cta-button";
      guardarBtn.addEventListener("click", () => guardarRuta(rutaGenerada));

      compartirBtn = document.createElement("button");
      compartirBtn.innerText = "📣 Compartir en la Comunidad";
      compartirBtn.className = "cta-button";
      compartirBtn.style.marginLeft = "10px";
      compartirBtn.addEventListener("click", () => compartirRuta(rutaGenerada));

      itineraryDiv.after(guardarBtn, compartirBtn);
    }
  });

  // Guardar ruta localmente
  function guardarRuta(ruta) {
    let rutas = JSON.parse(localStorage.getItem("rutasGuardadas")) || [];
    rutas.push({ ruta, fecha: new Date().toISOString() });
    localStorage.setItem("rutasGuardadas", JSON.stringify(rutas));
    alert("✅ Ruta guardada correctamente en tu perfil.");
  }

  // Compartir ruta y dar puntos (simulación MVP)
  function compartirRuta(ruta) {
    // Aquí en la versión final lo mandamos a Firebase
    alert("🎉 ¡Ruta compartida en la comunidad!\n+3 puntos de recompensa 🎁");
    // Simulación: guardamos también como compartida
    let compartidas = JSON.parse(localStorage.getItem("rutasCompartidas")) || [];
    compartidas.push({ ruta, puntos: 3, fecha: new Date().toISOString() });
    localStorage.setItem("rutasCompartidas", JSON.stringify(compartidas));
  }
});
