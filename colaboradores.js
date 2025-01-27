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
   * VALIDACIONES DEL FORMULARIO DE REGISTRO
   ************************************************************/
  const registerForm = document.getElementById("register-form");

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const fullName = document.getElementById("full-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const whatsapp = document.getElementById("whatsapp").value.trim();
    const nationality = document.getElementById("nationality").value.trim();
    const aboutYou = document.getElementById("about-you").value.trim();

    // Validaciones básicas
    if (!fullName || !email || !whatsapp || !nationality || !aboutYou) {
      alert("Por favor, completa todos los campos del formulario.");
      return;
    }

    if (!validateEmail(email)) {
      alert("Por favor, introduce un correo electrónico válido.");
      return;
    }

    if (!validatePhoneNumber(whatsapp)) {
      alert("Por favor, introduce un número de WhatsApp válido.");
      return;
    }

    alert("¡Registro enviado con éxito! Nos pondremos en contacto contigo pronto.");
    registerForm.reset();
  });

  // Validación de correo electrónico
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Validación de número de WhatsApp
  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^\+?[0-9]{10,15}$/; // Permite números internacionales con o sin "+"
    return regex.test(phoneNumber);
  };

  /************************************************************
   * ANIMACIONES Y MEJORAS UX
   ************************************************************/
  // Botones con efecto hover
  const buttons = document.querySelectorAll("button, .cta-button");

  buttons.forEach((button) => {
    button.addEventListener("mouseover", () => {
      button.style.transform = "scale(1.05)";
      button.style.boxShadow = "0 6px 14px rgba(0, 119, 204, 0.5)";
    });

    button.addEventListener("mouseout", () => {
      button.style.transform = "scale(1)";
      button.style.boxShadow = "none";
    });
  });

  /************************************************************
   * ACCIÓN EN EL FORMULARIO PARA HACERLO MÁS INTERACTIVO
   ************************************************************/
  const aboutYouField = document.getElementById("about-you");

  aboutYouField.addEventListener("focus", () => {
    aboutYouField.placeholder = "Comparte tu experiencia organizando eventos, destinos favoritos, etc.";
  });

  aboutYouField.addEventListener("blur", () => {
    aboutYouField.placeholder = "Ejemplo: Experiencia organizando eventos...";
  });
});
