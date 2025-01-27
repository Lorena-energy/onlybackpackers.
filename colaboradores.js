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

    if (!name || !email) {
      alert("Completa los datos");
    }
  });
});


