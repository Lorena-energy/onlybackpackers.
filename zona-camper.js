// zona-camper.js

// Datos simulados para pruebas (esto puede ir luego a Firebase)
const zonas = [
  {
    nombre: "Mirador del Silencio",
    ubicacion: "Asturias",
    tipo: "salvaje",
    servicios: "Agua, duchas, luz solar",
    comentarios: "Vistas espectaculares al mar, muy tranquilo."
  },
  {
    nombre: "Parking Playa San Juan",
    ubicacion: "Alicante",
    tipo: "parking",
    servicios: "Baños públicos, cafetería cerca",
    comentarios: "Ideal para dormir cerca del mar."
  },
  {
    nombre: "Camping Sierra Verde",
    ubicacion: "Granada",
    tipo: "camping",
    servicios: "Electricidad, piscina, bar",
    comentarios: "Perfecto para familias."
  }
];

// Mostrar zonas al cargar
document.addEventListener("DOMContentLoaded", () => {
  mostrarZonas(zonas);

  // Filtros
  document.getElementById("filtro-ubicacion").addEventListener("input", aplicarFiltros);
  document.getElementById("filtro-tipo").addEventListener("change", aplicarFiltros);

  // Envío del formulario
  document.getElementById("camper-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const nuevaZona = {
      nombre: document.getElementById("nombre-lugar").value,
      ubicacion: document.getElementById("ubicacion").value,
      tipo: document.getElementById("tipo-zona").value,
      servicios: document.getElementById("servicios").value,
      comentarios: document.getElementById("comentarios").value,
    };
    zonas.unshift(nuevaZona); // Añadir al inicio del array
    mostrarZonas(zonas);
    e.target.reset();
  });
});

function mostrarZonas(lista) {
  const contenedor = document.getElementById("lista-zonas");
  contenedor.innerHTML = "";

  if (lista.length === 0) {
    contenedor.innerHTML = "<p>No se encontraron zonas.</p>";
    return;
  }

  lista.forEach(zona => {
    const div = document.createElement("div");
    div.classList.add("zona");
    div.innerHTML = `
      <h3>${zona.nombre}</h3>
      <p><strong>Ubicación:</strong> ${zona.ubicacion}</p>
      <p><strong>Tipo:</strong> ${zona.tipo}</p>
      <p><strong>Servicios:</strong> ${zona.servicios}</p>
      <p><strong>Comentarios:</strong> ${zona.comentarios}</p>
    `;
    contenedor.appendChild(div);
  });
}

function aplicarFiltros() {
  const ubicacionFiltro = document.getElementById("filtro-ubicacion").value.toLowerCase();
  const tipoFiltro = document.getElementById("filtro-tipo").value;

  const zonasFiltradas = zonas.filter(zona => {
    const coincideUbicacion = zona.ubicacion.toLowerCase().includes(ubicacionFiltro);
    const coincideTipo = tipoFiltro === "" || zona.tipo === tipoFiltro;
    return coincideUbicacion && coincideTipo;
  });

  mostrarZonas(zonasFiltradas);
}
