// zona-camper.js funcional

const form = document.getElementById("camper-form");
const listaZonas = document.getElementById("lista-zonas");
const filtroUbicacion = document.getElementById("filtro-ubicacion");
const filtroTipo = document.getElementById("filtro-tipo");
const puntosDiv = document.getElementById("contador-puntos");

let zonas = [];
let puntos = 0;

function actualizarPuntos(valor) {
  puntos += valor;
  puntosDiv.textContent = `Llevas acumulados ${puntos} puntos por compartir tus zonas camper favoritas 🚐`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre-lugar").value;
  const ubicacion = document.getElementById("ubicacion").value;
  const tipo = document.getElementById("tipo-zona").value;
  const servicios = document.getElementById("servicios").value;
  const comentarios = document.getElementById("comentarios").value;
  const mediaInput = document.getElementById("media-zona");
  const mediaFile = mediaInput.files[0];

  const nuevaZona = {
    nombre,
    ubicacion,
    tipo,
    servicios,
    comentarios,
    mediaURL: mediaFile ? URL.createObjectURL(mediaFile) : null,
    mediaType: mediaFile && mediaFile.type.includes("video") ? "video" : "img"
  };

  zonas.unshift(nuevaZona);
  mostrarZonas();
  form.reset();
  actualizarPuntos(10);
});

function mostrarZonas() {
  listaZonas.innerHTML = "";
  const ubicacionFiltro = filtroUbicacion.value.toLowerCase();
  const tipoFiltro = filtroTipo.value;

  zonas.forEach((zona) => {
    if (
      (ubicacionFiltro === "" || zona.ubicacion.toLowerCase().includes(ubicacionFiltro)) &&
      (tipoFiltro === "" || zona.tipo === tipoFiltro)
    ) {
      const card = document.createElement("div");
      card.className = "zona-card";

      if (zona.mediaURL) {
        if (zona.mediaType === "video") {
          card.innerHTML += `<video src="${zona.mediaURL}" controls></video>`;
        } else {
          card.innerHTML += `<img src="${zona.mediaURL}" alt="Zona camper">`;
        }
      }

      card.innerHTML += `
        <h3>${zona.nombre}</h3>
        <p><strong>Ubicación:</strong> ${zona.ubicacion}</p>
        <p><strong>Tipo:</strong> ${zona.tipo}</p>
        <p><strong>Servicios:</strong> ${zona.servicios}</p>
        <p>${zona.comentarios}</p>
        <button onclick="window.open('https://www.google.com/maps/search/${encodeURIComponent(zona.ubicacion)}','_blank')">
          Ver en Google Maps
        </button>
      `;
      listaZonas.appendChild(card);
    }
  });
}

filtroUbicacion.addEventListener("input", mostrarZonas);
filtroTipo.addEventListener("change", mostrarZonas);

// Menú hamburguesa
const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");
if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });
}
