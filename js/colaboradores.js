document.addEventListener("DOMContentLoaded", () => {
  console.log("Colaboradores.js cargado correctamente");

  // MENÚ HAMBURGUESA
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  // FORMULARIO DE REGISTRO
  const collaboratorForm = document.getElementById("collaborator-form");
  collaboratorForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const whatsapp = document.getElementById("whatsapp").value.trim();
    const nationality = document.getElementById("nationality").value.trim();
    const languages = document.getElementById("languages").value.trim();
    const aboutYou = document.getElementById("about-you").value.trim();
    const events = document.getElementById("events").value.trim();

    if (!name || !email || !whatsapp || !nationality || !languages || !aboutYou || !events) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    // Ejemplo de aviso
    alert(`¡Genial, ${name}! Gracias por unirte como Colaborador.\nPronto te contactaremos en ${email}.`);

    collaboratorForm.reset();
  });
});
