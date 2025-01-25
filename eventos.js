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
   * FILTROS DE EVENTOS
   ************************************************************/
  const filterForm = document.getElementById("event-filters");
  const eventCards = document.querySelectorAll(".event-card");

  filterForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const location = document.getElementById("filter-location").value.toLowerCase();
    const date = document.getElementById("filter-date").value;
    const type = document.getElementById("filter-type").value.toLowerCase();

    eventCards.forEach((card) => {
      const cardLocation = card.querySelector("p:nth-of-type(1)").textContent.toLowerCase();
      const cardDate = card.querySelector("p:nth-of-type(2)").textContent;
      const cardType = card.getAttribute("data-type")?.toLowerCase() || "";

      if (
        (location === "" || cardLocation.includes(location)) &&
        (date === "" || cardDate.includes(date)) &&
        (type === "" || cardType.includes(type))
      ) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });

  /************************************************************
   * ANIMACIÓN DE TARJETAS
   ************************************************************/
  eventCards.forEach((card) => {
    card.addEventListener("mouseover", () => {
      card.style.transform = "translateY(-5px)";
      card.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.3)";
    });

    card.addEventListener("mouseout", () => {
      card.style.transform = "translateY(0)";
      card.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";
    });
  });

  /************************************************************
   * FORMULARIO DE CREACIÓN DE EVENTOS
   ************************************************************/
  const createEventForm = document.getElementById("create-event-form");

  createEventForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("event-title").value.trim();
    const location = document.getElementById("event-location").value.trim();
    const date = document.getElementById("event-date").value;
    const description = document.getElementById("event-description").value.trim();

    if (!title || !location || !date || !description) {
      alert("Por favor, completa todos los campos del formulario.");
      return;
    }

    alert(`¡Evento "${title}" creado exitosamente! Está pendiente de aprobación.`);
    createEventForm.reset();
  });

  /************************************************************
   * REDIRECCIÓN A SUBPÁGINA DE COLABORADORES
   ************************************************************/
  const collaboratorButton = document.querySelector("#collaborators .cta-button");

  if (collaboratorButton) {
    collaboratorButton.addEventListener("click", () => {
      window.location.href = "collaborators.html";
    });
  }
});
