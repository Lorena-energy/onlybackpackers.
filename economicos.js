document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  const adminPanel = document.getElementById("admin-panel");
  const addTripForm = document.getElementById("add-trip-form");
  const tripsContainer = document.getElementById("trips-container");

  // Muestra el formulario de admin si es admin
  if (localStorage.getItem("isAdmin") === "true") {
    adminPanel.classList.remove("hidden");
  }

  // Datos de ejemplo predefinidos
  const exampleTrips = [
    {
      title: "Ruta Mochilera por Tailandia",
      destination: "Bangkok - Chiang Mai - Krabi",
      price: "499",
      description: "Explora los templos de Bangkok, la cultura de Chiang Mai y las playas de Krabi.",
      image: "https://via.placeholder.com/300x180"
    },
    {
      title: "Aventura en Perú",
      destination: "Lima - Cusco - Machu Picchu",
      price: "650",
      description: "Un recorrido inolvidable por la historia y naturaleza de Perú.",
      image: "https://via.placeholder.com/300x180"
    }
  ];

  // Cargar viajes desde localStorage o ejemplos
  function renderTrips() {
    tripsContainer.innerHTML = "";
    let trips = JSON.parse(localStorage.getItem("trips")) || exampleTrips;
    trips.forEach((trip) => {
      const tripCard = document.createElement("div");
      tripCard.classList.add("trip-card");
      tripCard.innerHTML = `
        <img src="${trip.image}" alt="${trip.title}">
        <h3>${trip.title}</h3>
        <p><strong>Destino:</strong> ${trip.destination}</p>
        <p><strong>Precio:</strong> ${trip.price}€</p>
        <p>${trip.description}</p>
      `;
      tripsContainer.appendChild(tripCard);
    });
  }

  renderTrips();
});
