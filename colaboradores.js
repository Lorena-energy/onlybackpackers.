document.addEventListener("DOMContentLoaded", () => {
  console.log("Colaboradores.js cargado correctamente");

  // Manejar el menú hamburguesa
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  // Validar el formulario de colaborador
  const form = document.getElementById("collaborator-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const nationality = document.getElementById("nationality").value.trim();
    const about = document.getElementById("about").value.trim();

    if (!name || !email || !phone || !nationality || !about) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    alert("¡Gracias por registrarte como colaborador! Nos pondremos en contacto contigo.");
    form.reset();
  });
});

