document.addEventListener("DOMContentLoaded", () => {
  /************************************************************
   * MENÚ HAMBURGUESA
   ************************************************************/
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  /************************************************************
   * VALIDACIÓN DEL FORMULARIO
   ************************************************************/
  const collaboratorForm = document.getElementById("collaborator-form");

  collaboratorForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Obtener valores del formulario
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const nationality = document.getElementById("nationality").value.trim();
    const about = document.getElementById("about").value.trim();

    // Validación básica
    if (!name || !email || !phone || !nationality || !about) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    if (!/^[\w.%+-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      alert("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    if (!/^\+\d{1,4}[\s\d]{7,15}$/.test(phone)) {
      alert("Por favor, ingresa un número de WhatsApp válido (ejemplo: +34 600 123 456).");
      return;
    }

    // Mostrar mensaje de éxito
    alert("¡Gracias por registrarte como colaborador! Nos pondremos en contacto contigo pronto.");
    collaboratorForm.reset();
  });

  /************************************************************
   * BOTÓN DE DESTACADOS (INTERACCIÓN)
   ************************************************************/
  const highlightButton = document.querySelector("#highlight button");

  if (highlightButton) {
    highlightButton.addEventListener("click", () => {
      window.location.href = "#register"; // Redirige a la sección del formulario
    });
  }

  /************************************************************
   * ANIMACIONES (EFECTOS DE HOVER Y SCROLL)
   ************************************************************/
  const hero = document.getElementById("hero");

  // Animación en scroll
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;

    if (scrollPosition > 50) {
      hero.style.opacity = 1 - scrollPosition / 500;
    } else {
      hero.style.opacity = 1;
    }
  });

  // Hover en el formulario (resalta los inputs)
  const formInputs = document.querySelectorAll("#collaborator-form input, #collaborator-form textarea");

  formInputs.forEach((input) => {
    input.addEventListener("focus", () => {
      input.style.borderColor = "#0077cc";
    });

    input.addEventListener("blur", () => {
      input.style.borderColor = "#ddd";
    });
  });
});
