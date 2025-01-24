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
   * REDIRECCIÓN A SUBPÁGINAS
   ************************************************************/
  const categories = document.querySelectorAll(".category");

  categories.forEach((category) => {
    category.addEventListener("click", () => {
      const categoryId = category.getAttribute("data-category");
      if (categoryId) {
        window.location.href = `${categoryId}.html`;
      } else {
        console.error("A esta categoría no se le ha asignado una subpágina.");
      }
    });
  });

  /************************************************************
   * ANIMACIÓN DE CATEGORÍAS AL HACER CLIC
   ************************************************************/
  categories.forEach((category) => {
    category.addEventListener("mousedown", () => {
      category.classList.add("clicked");
    });

    category.addEventListener("mouseup", () => {
      setTimeout(() => {
        category.classList.remove("clicked");
      }, 150);
    });
  });

  /************************************************************
   * ANIMACIÓN DE BOTONES
   ************************************************************/
  const buttons = document.querySelectorAll(".cta-button");

  buttons.forEach((button) => {
    button.addEventListener("mouseover", () => {
      button.style.transform = "scale(1.1)";
      button.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
    });

    button.addEventListener("mouseout", () => {
      button.style.transform = "scale(1)";
      button.style.boxShadow = "none";
    });
  });
});
