document.addEventListener("DOMContentLoaded", () => {
  console.log("Worldtrip.js cargado correctamente");

  /************************************************************
   * MENÚ HAMBURGUESA
   ************************************************************/
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  /************************************************************
   * REDIRECCIÓN (Opcional):
   * Si quieres que el click en .worldtrip-card entera
   * lleve al enlace interno, mantenlo aquí
   ************************************************************/
  const categories = document.querySelectorAll(".worldtrip-card");
  categories.forEach((category) => {
    category.addEventListener("click", () => {
      const link = category.querySelector("a");
      if (link) {
        window.location.href = link.href;
      } else {
        console.error("No se encontró un enlace en esta tarjeta.");
      }
    });
  });

  /************************************************************
   * ANIMACIÓN DE BOTONES Y TARJETAS
   ************************************************************/
  const buttons = document.querySelectorAll(".cta-button");
  buttons.forEach((button) => {
    button.addEventListener("mouseover", () => {
      button.style.transform = "scale(1.1)";
      button.style.boxShadow = "0 6px 15px rgba(0, 119, 204, 0.5)";
    });
    button.addEventListener("mouseout", () => {
      button.style.transform = "scale(1)";
      button.style.boxShadow = "none";
    });
  });

  const cards = document.querySelectorAll(".worldtrip-card");
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
});
