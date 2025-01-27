document.addEventListener("DOMContentLoaded", () => {
  console.log("Colaboradores.js cargado correctamente");

  /************************************************************
   * MENÚ HAMBURGUESA
   ************************************************************/
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  /************************************************************
   * ENVÍO DEL FORMULARIO DE COLABORADORES
   ************************************************************/
  const collaboratorForm = document.getElementById("collaborator-form");

  collaboratorForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const whatsapp = document.getElementById("whatsapp").value.trim();
    const nationality = document.getElementById("nationality").value.trim();
    const about = document.getElementById("about").value.trim();
    const events = document.getElementById("events").value.trim();

    if (!name || !email || !whatsapp || !nationality || !about || !events) {
      alert("Por favor, completa todos los campos del formulario.");
      return;
    }

    alert("¡Gracias por registrarte como colaborador! Revisaremos tu información y nos pondremos en contacto contigo.");
    collaboratorForm.reset();
  });

  /************************************************************
   * ANIMACIONES EN LAS TARJETAS DE EJEMPLOS
   ************************************************************/
  const ideaCards = document.querySelectorAll(".example-card");

  ideaCards.forEach((card) => {
    card.addEventListener("mouseover", () => {
      card.style.transform = "translateY(-5px)";
      card.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.3)";
    });

    card.addEventListener("mouseout", () => {
      card.style.transform = "translateY(0)";
      card.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
    });
  });
});
