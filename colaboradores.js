document.addEventListener("DOMContentLoaded", () => {
  console.log("colaboradores.js cargado correctamente");

  /************************************************************
   * MENÚ HAMBURGUESA
   ************************************************************/
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  /************************************************************
   * FORMULARIO DE REGISTRO
   ************************************************************/
  const form = document.getElementById("collaborator-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Obtener los valores del formulario
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const whatsapp = document.getElementById("whatsapp").value.trim();
    const nationality = document.getElementById("nationality").value.trim();
    const about = document.getElementById("about").value.trim();

    // Validar campos obligatorios
    if (!name || !email || !whatsapp || !nationality || !about) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    // Mostrar mensaje de éxito
    alert(`¡Gracias por registrarte, ${name}! Revisa tu correo (${email}) para más información.`);
    
    // Resetear formulario
    form.reset();
  });

  /************************************************************
   * SECCIÓN DE EJEMPLOS DE GANANCIAS
   ************************************************************/
  const exampleToggle = document.getElementById("example-toggle");
  const exampleDetails = document.getElementById("example-details");

  exampleToggle.addEventListener("click", () => {
    if (exampleDetails.style.display === "none" || !exampleDetails.style.display) {
      exampleDetails.style.display = "block";
      exampleToggle.textContent = "Ocultar Ejemplo";
    } else {
      exampleDetails.style.display = "none";
      exampleToggle.textContent = "Ver Ejemplo de Ganancias";
    }
  });

  /************************************************************
   * ANIMACIÓN DE SECCIONES
   ************************************************************/
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    section.addEventListener("mouseover", () => {
      section.style.transform = "translateY(-5px)";
      section.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.2)";
    });

    section.addEventListener("mouseout", () => {
      section.style.transform = "translateY(0)";
      section.style.boxShadow = "none";
    });
  });
});
