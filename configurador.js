document.addEventListener("DOMContentLoaded", () => {
  console.log("Eventos.js cargado correctamente");

  /************************************************************
   * MENÚ HAMBURGUESA
   ************************************************************/
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  /************************************************************
   * FILTROS DE EVENTOS (Ejemplo)
   ************************************************************/
  const filterForm = document.getElementById("filter-form");
  const eventCards = document.querySelectorAll(".event-card");

  filterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const locationVal = document.getElementById("filter-destination").value.trim().toLowerCase();
    const dateVal = document.getElementById("filter-date").value;
    const typeVal = document.getElementById("filter-type").value.trim().toLowerCase();

    eventCards.forEach((card) => {
      const cardLoc = card.innerText.toLowerCase(); // simplificado
      const cardDate = card.getAttribute("data-date"); 
      const cardType = card.getAttribute("data-type")?.toLowerCase() || "";
      
      // Comparar
      const matchLoc = (locationVal === "" || cardLoc.includes(locationVal));
      const matchDate = (dateVal === "" || cardDate === dateVal);
      const matchType = (typeVal === "" || cardType.includes(typeVal));

      if (matchLoc && matchDate && matchType) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });

  /************************************************************
   * CREAR EVENTO
   ************************************************************/
  const createEventForm = document.getElementById("create-event-form");
  createEventForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("event-title").value.trim();
    const location = document.getElementById("event-location").value.trim();
    const date = document.getElementById("event-date").value;
    const description = document.getElementById("event-description").value.trim();

    if (!title || !location || !date || !description) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    alert(`¡Evento "${title}" creado exitosamente!`);
    createEventForm.reset();
  });
});
