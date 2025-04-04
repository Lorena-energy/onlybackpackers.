document.addEventListener("DOMContentLoaded", () => {
  const camperData = [
    {
      title: "📍 Playa de los Genoveses, Almería",
      description: "Ideal para campers que buscan tranquilidad y naturaleza. Acceso sencillo y vistas increíbles.",
      tag: "Costa"
    },
    {
      title: "🌄 Lago de Sanabria, Zamora",
      description: "Área habilitada para autocaravanas, rodeada de naturaleza pura. Perfecta para desconectar.",
      tag: "Naturaleza"
    },
    {
      title: "🔧 Consejo Viajero",
      description: "Antes de salir, revisa siempre los niveles del vehículo y lleva un bidón extra de agua. ¡Nunca falla!",
      tag: "Consejo"
    }
  ];

  const grid = document.querySelector(".card-grid");

  camperData.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    const h3 = document.createElement("h3");
    h3.textContent = item.title;

    const p = document.createElement("p");
    p.textContent = item.description;

    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = item.tag;

    card.appendChild(h3);
    card.appendChild(p);
    card.appendChild(span);
    grid.appendChild(card);
  });
});
