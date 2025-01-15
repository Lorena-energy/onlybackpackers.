// Menú hamburguesa para móviles
document.querySelector('.menu-toggle').addEventListener('click', () => {
  document.querySelector('.menu').classList.toggle('show');
});

// Función para manejar el despliegue de destinos por continente
const continentButtons = document.querySelectorAll('.continent-button');
continentButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const continent = button.dataset.continent;
    const list = document.getElementById(`${continent}-list`);

    // Ocultar todas las listas excepto la seleccionada
    document.querySelectorAll('.destination-list').forEach((list) => {
      if (list !== list) {
        list.style.display = 'none';
      }
    });

    // Alternar la visibilidad de la lista seleccionada
    if (list) {
      list.style.display = list.style.display === 'block' ? 'none' : 'block';
    }
  });
});

// Opcional: Animación de scroll al abrir listas largas
document.querySelectorAll('.destination-list button').forEach((destination) => {
  destination.addEventListener('click', () => {
    window.scrollTo({ top: destination.offsetTop - 50, behavior: 'smooth' });
  });
});
