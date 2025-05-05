// Menú hamburguesa
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');

  if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
      menu.classList.toggle('active');
    });
  }

  // Carrusel
  const track = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  let currentSlide = 0;
  const slides = document.querySelectorAll('.carousel img');

  function updateCarousel() {
    const slideWidth = slides[0].clientWidth;
    track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
  }

  nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
  });

  prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  window.addEventListener('resize', updateCarousel);
});
