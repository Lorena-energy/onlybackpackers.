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
  const filterForm = document.getElementById("filter-form");
  const eventCards = document.querySelectorAll(".event-card");

  filterForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const destination = document.getElementById("filter-destination").value.toLowerCase();
    const date = document.getElementById("filter-date").value;
    const type = document.getElementById("filter-type").value.toLowerCase();

    eventCards.forEach((card) => {
      const cardDestination = card.getAttribute("data-destination").toLowerCase();
      const cardDate = card.getAttribute("data-date");
      const cardType = card.getAttribute("data-type").toLowerCase();

      if (
        (destination === "" || cardDestination.includes(destination)) &&
        (date === "" || cardDate === date) &&
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
  const cards = document.querySelectorAll(".event-card");

  cards.forEach((card) => {
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
    const date = document.getElementById("event-date").value;
    const location = document.getElementById("event-location").value.trim();
    const description = document.getElementById("event-description").value.trim();

    if (!title || !date || !location || !description) {
      alert("Por favor, completa todos los campos del formulario.");
      return;
    }

    alert("¡Evento creado exitosamente! Está pendiente de aprobación.");
    createEventForm.reset();
  });

  /************************************************************
   * REDIRECCIÓN A SUBPÁGINA DE COLABORADORES
   ************************************************************/
  const collaboratorButton = document.getElementById("collaborator-button");

  collaboratorButton.addEventListener("click", () => {
    window.location.href = "colaboradores.html";
  });
});
