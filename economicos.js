document.addEventListener("DOMContentLoaded", () => {
  console.log("Cargando viajes económicos...");

  const adminPanel = document.getElementById("admin-panel");
  const addTripForm = document.getElementById("add-trip-form");
  const tripsContainer = document.getElementById("trips-container");

  if (localStorage.getItem("isAdmin") === "true") {
    adminPanel.classList.remove("hidden");
  }

  addTripForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("trip-title").value;
    const destination = document.getElementById("trip-destination").value;
    const price = document.getElementById("trip-price").value;
    const description = document.getElementById("trip-description").value;
    const image = document.getElementById("trip-image").value;

    const trip = { title, destination, price, description, image };
    let trips = JSON.parse(localStorage.getItem("trips")) || [];
    trips.push(trip);
    localStorage.setItem("trips", JSON.stringify(trips));

    renderTrips();
    addTripForm.reset();
  });

  function renderTrips() {
    tripsContainer.innerHTML = "";
    let trips = JSON.parse(localStorage.getItem("trips")) || [];
    trips.forEach((trip, index) => {
      const tripCard = document.createElement("div");
      tripCard.classList.add("trip-card");
      tripCard.innerHTML = `
        <img src="${trip.image}" alt="${trip.title}">
        <h3>${trip.title}</h3>
        <p><strong>Destino:</strong> ${trip.destination}</p>
        <p><strong>Precio:</strong> ${trip.price}€</p>
        <p>${trip.description}</p>
        <button class="delete-trip" data-index="${index}">Eliminar</button>
      `;
      tripsContainer.appendChild(tripCard);
    });
  }

  renderTrips();
});
