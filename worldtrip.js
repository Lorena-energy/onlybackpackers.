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
});

