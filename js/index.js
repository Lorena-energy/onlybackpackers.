document.addEventListener("DOMContentLoaded", () => {
  // Menú hamburguesa
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("active");
    });
  }

  // === Carrusel ===
  const track = document.querySelector(".carousel-track");
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");
  let index = 0;

  function updateCarousel() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  if (track && prev && next) {
    next.addEventListener("click", () => {
      index = (index + 1) % track.children.length;
      updateCarousel();
    });

    prev.addEventListener("click", () => {
      index = (index - 1 + track.children.length) % track.children.length;
      updateCarousel();
    });

    // Rotación automática cada 5 segundos
    setInterval(() => {
      index = (index + 1) % track.children.length;
      updateCarousel();
    }, 5000);
  }
});
