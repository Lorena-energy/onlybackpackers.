document.addEventListener("DOMContentLoaded", () => {
  console.log("Coordinadores.js cargado correctamente");

  // MENÚ HAMBURGUESA
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  // FORMULARIO DE COORDINADOR
  const coordinatorForm = document.getElementById("coordinator-form");
  if (coordinatorForm) {
    coordinatorForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Capturamos los valores
      const fullname = document.getElementById("fullname").value.trim();
      const email = document.getElementById("email").value.trim();
      const whatsapp = document.getElementById("whatsapp").value.trim();
      const destinos = document.getElementById("destinos").value.trim();
      const experiencia = document.getElementById("experiencia").value.trim();
      const idiomas = document.getElementById("idiomas").value.trim();

      if (!fullname || !email || !whatsapp || !destinos || !experiencia || !idiomas) {
        alert("Por favor, completa todos los campos obligatorios.");
        return;
      }

      // Mensaje de confirmación
      alert(`¡Gracias, ${fullname}! Recibimos tu solicitud de Coordinador.\nPronto te daremos más detalles de paga diaria y comisiones.`);
      
      // Resetear formulario
      coordinatorForm.reset();
    });
  }
});
