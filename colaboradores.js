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

    alert(
      `¡Gracias por registrarte, ${name}! Revisaremos tu información y nos pondremos en contacto contigo pronto.`
    );
    collaboratorForm.reset();
  });

  /************************************************************
   * ANIMACIONES EN LAS TARJETAS DE EJEMPLOS
   ************************************************************/
  const exampleCards = document.querySelectorAll(".example-card");

  exampleCards.forEach((card) => {
    card.addEventListener("mouseover", () => {
      card.style.transform = "translateY(-5px)";
      card.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.3)";
    });

    card.addEventListener("mouseout", () => {
      card.style.transform = "translateY(0)";
      card.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
    });
  });

  /************************************************************
   * BOTÓN PARA VOLVER AL INICIO
   ************************************************************/
  const backToTopButton = document.createElement("button");
  backToTopButton.id = "back-to-top";
  backToTopButton.textContent = "↑ Volver al Inicio";
  backToTopButton.style.position = "fixed";
  backToTopButton.style.bottom = "20px";
  backToTopButton.style.right = "20px";
  backToTopButton.style.padding = "10px 20px";
  backToTopButton.style.border = "none";
  backToTopButton.style.borderRadius = "5px";
  backToTopButton.style.background = "#0077cc";
  backToTopButton.style.color = "white";
  backToTopButton.style.cursor = "pointer";
  backToTopButton.style.display = "none";

  document.body.appendChild(backToTopButton);

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopButton.style.display = "block";
    } else {
      backToTopButton.style.display = "none";
    }
  });
});
