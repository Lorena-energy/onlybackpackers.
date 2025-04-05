// zona-camper.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("camper-form");
  const listaZonas = document.getElementById("lista-zonas");
  const contadorPuntos = document.getElementById("contador-puntos");
  const filtroUbicacion = document.getElementById("filtro-ubicacion");
  const filtroTipo = document.getElementById("filtro-tipo");

  let puntos = 0;
  let zonas = [];

  function actualizarListaZonas() {
    listaZonas.innerHTML = "";
    const ubicacion = filtroUbicacion.value.toLowerCase();
    const tipo = filtroTipo.value;

    zonas.forEach((zona) => {
      const coincideUbicacion = zona.ubicacion.toLowerCase().includes(ubicacion);
      const coincideTipo = tipo === "" || zona.tipo === tipo;

      if (coincideUbicacion && coincideTipo) {
        const card = document.createElement("div");
        card.classList.add("zona-card");
        card.innerHTML = `
          <h3>${zona.nombre}</h3>
          <p><strong>Ubicación:</strong> ${zona.ubicacion}</p>
          <p><strong>Tipo:</strong> ${zona.tipo}</p>
          <p><strong>Servicios:</strong> ${zona.servicios}</p>
          <p><strong>Comentarios:</strong> ${zona.comentarios}</p>
        `;
        listaZonas.appendChild(card);
      }
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nuevaZona = {
      nombre: document.getElementById("nombre-lugar").value,
      ubicacion: document.getElementById("ubicacion").value,
      tipo: document.getElementById("tipo-zona").value,
      servicios: document.getElementById("servicios").value,
      comentarios: document.getElementById("comentarios").value,
    };

    zonas.push(nuevaZona);
    form.reset();
    puntos += 10;
    contadorPuntos.textContent = puntos;
    actualizarListaZonas();
  });

  filtroUbicacion.addEventListener("input", actualizarListaZonas);
  filtroTipo.addEventListener("change", actualizarListaZonas);

  // Menú hamburguesa
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });
});
