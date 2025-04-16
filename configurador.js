// configurador.js

document.addEventListener("DOMContentLoaded", () => {
  console.log("configurador.js cargado correctamente");

  const form = document.getElementById("route-form");
  const itineraryBox = document.getElementById("itinerary");
  const resultsSection = document.getElementById("route-results");
  const guardarBtn = document.getElementById("guardar-ruta");
  const compartirBtn = document.getElementById("compartir-ruta");
  const chatForm = document.getElementById("chat-form");
  const userInput = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const departureCity = document.getElementById("departure-city").value.trim();
    const tripDuration = document.getElementById("trip-duration").value.trim();
    const budget = document.getElementById("trip-budget").value.trim();
    const zones = document.getElementById("trip-zones").value.trim();
    const preferences = document.getElementById("preferences").value;
    const dates = document.getElementById("trip-dates").value.trim();
    const groupSize = document.getElementById("group-size").value.trim();

    const prompt = `Hola ob.packersGPT. Necesito que crees una ruta personalizada para un viaje desde ${departureCity} de ${tripDuration} días, centrado en un viaje de tipo ${preferences}. ` +
                   `${budget ? `El presupuesto aproximado es ${budget}. ` : ""}` +
                   `${zones ? `La zona que me gustaría visitar es: ${zones}. ` : ""}` +
                   `${dates ? `Las fechas del viaje son: ${dates}. ` : ""}` +
                   `${groupSize ? `Viajamos ${groupSize} personas. ` : ""}` +
                   `Por favor, detalla los días o lugares a visitar, actividades recomendadas, transportes y consejos. ` +
                   `Se claro, ordenado y separa los días con títulos si es posible.`;

    try {
      itineraryBox.innerHTML = "⏳ Generando tu ruta con IA...";
      resultsSection.classList.remove("hidden");

      const response = await fetch("https://obpackers-backend.onrender.com/api/obpackers-gpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt })
      });

      const data = await response.json();
      const output = data.choices?.[0]?.message?.content || "No se pudo generar la ruta.";

      const mensaje = `Ruta generada por ob.packersGPT:\n\n${output}`;
      localStorage.setItem("rutaParaCompartir", mensaje);

      itineraryBox.innerHTML = `
        <div class="respuestaGPT">${output.replace(/\n/g, '<br>')}</div>
        <div style="text-align:center; margin-top:20px;">
          <a href="worldtrip.html#viajes-a-medida" class="cta-button" style="background:#00897B;">👩‍💼 ¿Quieres atención personalizada? Haz clic aquí</a>
        </div>
        <div class="social-share" style="margin-top:20px;">
          <p style="text-align:center; font-weight:600;">Comparte esta ruta en:</p>
          <div style="text-align:center; display:flex; flex-wrap:wrap; justify-content:center; gap:10px;">
            <button onclick="shareTo('twitter')">🐦 Twitter</button>
            <button onclick="shareTo('facebook')">📘 Facebook</button>
            <button onclick="shareTo('whatsapp')">💬 WhatsApp</button>
            <button onclick="shareTo('telegram')">📲 Telegram</button>
            <button onclick="shareTo('instagram')">📸 Instagram</button>
            <button onclick="shareTo('tiktok')">🎵 TikTok</button>
            <button onclick="copyRoute()">📋 Copiar Ruta</button>
          </div>
        </div>
      `;
    } catch (err) {
      console.error("Error generando ruta:", err);
      itineraryBox.innerHTML = "❌ Ocurrió un error al generar la ruta. Intenta de nuevo más tarde.";
    }
  });

  guardarBtn.addEventListener("click", () => {
    const contenido = itineraryBox.innerText;
    localStorage.setItem("rutaPersonalizada", contenido);
    alert("✅ Ruta guardada en tu dispositivo (temporal)");
  });

  compartirBtn.addEventListener("click", () => {
    const ruta = itineraryBox.innerText;
    const mensaje = `Ruta generada por ob.packersGPT:\n\n${ruta}`;
    localStorage.setItem("rutaParaCompartir", mensaje);
    alert("🚀 Ruta preparada para compartir. Redirigiendo al muro...");
    window.location.href = "muro.html";
  });

  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const question = userInput.value.trim();
    if (!question) return;

    chatBox.innerHTML += `<div><strong>Tú:</strong> ${question}</div>`;
    userInput.value = "";

    try {
      const response = await fetch("https://obpackers-backend.onrender.com/api/obpackers-gpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt: question })
      });

      const data = await response.json();
      const output = data.choices?.[0]?.message?.content || "No se pudo generar respuesta.";

      chatBox.innerHTML += `<div><strong>ob.packersGPT:</strong> ${output.replace(/\n/g, "<br>")}</div>`;
      chatBox.scrollTop = chatBox.scrollHeight;
    } catch (err) {
      console.error("Error en el chat:", err);
      chatBox.innerHTML += `<div style="color:red;">❌ Hubo un error al contactar con ob.packersGPT</div>`;
    }
  });
});

function shareTo(platform) {
  const ruta = localStorage.getItem("rutaParaCompartir") || "¡Mira esta ruta viajera creada con ob.packersGPT!";
  const url = encodeURIComponent("https://onlybackpackers.es");
  const text = encodeURIComponent(ruta);
  let shareUrl = "";

  switch (platform) {
    case "twitter":
      shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
      break;
    case "facebook":
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`;
      break;
    case "whatsapp":
      shareUrl = `https://wa.me/?text=${text}%20${url}`;
      break;
    case "telegram":
      shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;
      break;
    case "instagram":
      alert("📸 Para compartir en Instagram, copia la ruta y pégala manualmente en tus stories o publicaciones. Puedes subir capturas desde ob.packersGPT ✨");
      return;
    case "tiktok":
      alert("🎵 Para compartir en TikTok, graba un vídeo mostrando tu ruta y menciona @onlybackpackers o añade el link en tu bio ✈️");
      return;
  }

  window.open(shareUrl, "_blank");
}

function copyRoute() {
  const ruta = localStorage.getItem("rutaParaCompartir");
  navigator.clipboard.writeText(ruta || "").then(() => {
    alert("📋 Ruta copiada al portapapeles");
  });
}
