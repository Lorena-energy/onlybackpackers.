document.addEventListener("DOMContentLoaded", () => {
  console.log("configurador.js cargado correctamente");

  /* ───────── Elementos DOM ───────── */
  const form            = document.getElementById("route-form");
  const itineraryBox    = document.getElementById("itinerary");
  const resultsSection  = document.getElementById("route-results");
  const guardarBtn      = document.getElementById("guardar-ruta");
  const compartirBtn    = document.getElementById("compartir-ruta");
  const chatForm        = document.getElementById("chat-form");
  const userInput       = document.getElementById("user-input");
  const chatBox         = document.getElementById("chat-box");
  const menuToggle      = document.getElementById("menu-toggle");
  const menu            = document.getElementById("menu");

  menuToggle.addEventListener("click", () => menu.classList.toggle("active"));

  let rutaGenerada = "";

  /* ───────── FORM PRINCIPAL ───────── */
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const departureCity = document.getElementById("departure-city").value.trim();
    const tripDuration  = document.getElementById("trip-duration").value.trim();
    const budget        = document.getElementById("trip-budget").value.trim();
    const zones         = document.getElementById("trip-zones").value.trim();
    const preferences   = document.getElementById("preferences").value;
    const dates         = document.getElementById("trip-dates").value.trim();
    const groupSize     = document.getElementById("group-size").value.trim();

    /* ── Detectar destino para crear enlaces afiliados ── */
    const destino = zones || preferences || departureCity || "el destino";
    const destURL = encodeURIComponent(destino.toLowerCase());
    const ORIGEN  = "MAD"; // cámbialo a origen real si lo capturas

    const prompt = `
Hola ob.packersGPT 🧭.
Crea una ruta personalizada de ${tripDuration || "varios"} días desde ${departureCity || "mi ciudad"} a ${destino}.
Tipo de viaje: ${preferences}.
${budget ? `Presupuesto aproximado: ${budget} €. ` : ""} 
${dates  ? `Fechas: ${dates}. ` : ""} 
${groupSize ? `Grupo: ${groupSize} personas. ` : ""}

Incluye actividades, excursiones y hostels CON ENLACES AFILIADOS:
👉 Actividades: https://www.getyourguide.com/?q=${destURL}&partner_id=0PBI9YH&cmp=share_to_earn
👉 Hostels:     https://hostelworld.prf.hn/click/camref:1101l52sgW/destination:${destURL}
✈️ Vuelos:      https://trip.tp.st/PNFLiA2f?origin=${ORIGEN}&destination=${destURL}
✈️ Vuelos alt.: https://trip.tp.st/PNFLiA2f?origin=${ORIGEN}&destination=${destURL}  (Kiwi)
📶 eSIM:        https://airalo.tp.st/11fkPqA8

Usa emojis: ✈️ transporte, 🎯 actividades, 💡 consejos, y títulos de día con ⭐.
Termina con una frase que invite a compartir en OnlyBackpackers.
`;

    try {
      itineraryBox.innerHTML = "⏳ Generando tu ruta con IA...";
      resultsSection.classList.remove("hidden");

      const response = await fetch(
        "https://obpackers-backend.onrender.com/api/obpackers-gpt",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt })
        }
      );

      const data   = await response.json();
      const output = data.choices?.[0]?.message?.content || "No se pudo generar la ruta.";

      rutaGenerada = output;
      localStorage.setItem("rutaParaCompartir", `Ruta generada por ob.packersGPT:\n\n${output}`);

      itineraryBox.innerHTML = `
        <div class="respuestaGPT">${output.replace(/\n/g, "<br>")}</div>
        <div style="text-align:center; margin-top:20px;">
          <a href="worldtrip-a-medida.html" class="cta-button" style="background:#00897B;">👩‍💼 ¿Quieres atención personalizada? Haz clic aquí</a>
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
        <div style="text-align:center; margin-top:15px; font-size:0.9em;">
          🌐 Descúbrelo en <a href="https://onlybackpackers.es" target="_blank">OnlyBackpackers.es</a>
        </div>`;
    } catch (err) {
      console.error("Error generando ruta:", err);
      itineraryBox.innerHTML = "❌ Ocurrió un error al generar la ruta. Inténtalo más tarde.";
    }
  });

  /* ───────── GUARDAR & COMPARTIR ───────── */
  guardarBtn.addEventListener("click", () => {
    localStorage.setItem("rutaPersonalizada", itineraryBox.innerHTML);
    alert("✅ Ruta guardada en tu dispositivo (temporal)");
  });

  compartirBtn.addEventListener("click", () => {
    localStorage.setItem("rutaParaCompartir", itineraryBox.innerHTML);
    alert("🚀 Ruta preparada para compartir. Redirigiendo al muro...");
    window.location.href = "muro.html";
  });

  /* ───────── CHAT RÁPIDO SOBRE LA RUTA ───────── */
  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const question = userInput.value.trim();
    if (!question) return;

    chatBox.innerHTML += `<div><strong>Tú:</strong> ${question}</div>`;
    userInput.value = "";

    const contextPrompt = rutaGenerada
      ? `Basándote en esta ruta: \n${rutaGenerada}\n\n${question}`
      : question;

    try {
      const response = await fetch(
        "https://obpackers-backend.onrender.com/api/obpackers-gpt",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: contextPrompt })
        }
      );
      const data   = await response.json();
      const output = data.choices?.[0]?.message?.content || "No se pudo generar respuesta.";

      chatBox.innerHTML += `<div><strong>ob.packersGPT:</strong> ${output.replace(/\n/g, "<br>")}</div>`;
      chatBox.scrollTop = chatBox.scrollHeight;
    } catch (err) {
      console.error("Error en el chat:", err);
      chatBox.innerHTML += `<div style="color:red;">❌ Error al contactar con ob.packersGPT</div>`;
    }
  });
});

/* ───────── Compartir / Copiar ───────── */
function shareTo(platform) {
  const ruta = localStorage.getItem("rutaParaCompartir") || "¡Mira esta ruta creada con ob.packersGPT!";
  const url  = encodeURIComponent("https://onlybackpackers.es");
  const text = encodeURIComponent(ruta);
  let shareUrl = "";

  switch (platform) {
    case "twitter":   shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`; break;
    case "facebook":  shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`; break;
    case "whatsapp":  shareUrl = `https://wa.me/?text=${text}%20${url}`; break;
    case "telegram":  shareUrl = `https://t.me/share/url?url=${url}&text=${text}`; break;
    case "instagram": alert("📸 Para Instagram, copia la ruta y pégala manualmente en stories o post."); return;
    case "tiktok":    alert("🎵 Para TikTok, graba un vídeo mostrando tu ruta y menciona @onlybackpackers."); return;
  }
  window.open(shareUrl, "_blank");
}

function copyRoute() {
  const ruta = localStorage.getItem("rutaParaCompartir") || "";
  navigator.clipboard.writeText(ruta.replace(/<br>/g, "\n")).then(() =>
    alert("📋 Ruta copiada al portapapeles")
  );
}

  
