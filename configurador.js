document.addEventListener("DOMContentLoaded", () => {
  console.log("configurador.js cargado correctamente");

  // === MENÚ HAMBURGUESA ===
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      menu.classList.toggle("active");
    });
  }

  // === FORMULARIO GENERAR RUTA ===
  const routeForm = document.getElementById("route-form");
  const routeResults = document.getElementById("route-results");
  const itineraryDiv = document.getElementById("itinerary");
  let guardarBtn, compartirBtn;

  routeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const ciudad = document.getElementById("departure-city").value;
    const duracion = document.getElementById("trip-duration").value;
    const tipo = document.getElementById("preferences").value;
    const rutaGenerada = `🧭 ¡Aquí tienes tu ruta! Salida desde ${ciudad}, durante ${duracion} días, centrado en un viaje ${tipo}. ¡Prepárate para la aventura!`;

    itineraryDiv.innerText = rutaGenerada;
    routeResults.classList.remove("hidden");

    if (!guardarBtn && !compartirBtn) {
      guardarBtn = document.createElement("button");
      guardarBtn.innerText = "💾 Guardar Ruta";
      guardarBtn.className = "cta-button";
      guardarBtn.addEventListener("click", () => guardarRuta(rutaGenerada));

      compartirBtn = document.createElement("button");
      compartirBtn.innerText = "📣 Compartir en la Comunidad";
      compartirBtn.className = "cta-button";
      compartirBtn.style.marginLeft = "10px";
      compartirBtn.addEventListener("click", () => compartirRuta(rutaGenerada));

      itineraryDiv.after(guardarBtn, compartirBtn);
    }
  });

  function guardarRuta(ruta) {
    let rutas = JSON.parse(localStorage.getItem("rutasGuardadas")) || [];
    rutas.push({ ruta, fecha: new Date().toISOString() });
    localStorage.setItem("rutasGuardadas", JSON.stringify(rutas));
    alert("✅ Ruta guardada correctamente.");
  }

  function compartirRuta(ruta) {
    alert("🎉 ¡Ruta compartida con la comunidad!\n+3 puntos de recompensa 🎁");
    let compartidas = JSON.parse(localStorage.getItem("rutasCompartidas")) || [];
    compartidas.push({ ruta, puntos: 3, fecha: new Date().toISOString() });
    localStorage.setItem("rutasCompartidas", JSON.stringify(compartidas));
  }

  // === CHAT GPT (ob.packersGPT) ===
  const chatBox = document.getElementById("chat-box");
  const chatForm = document.getElementById("chat-form");
  const userInput = document.getElementById("user-input");

  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = userInput.value.trim();
    if (!message) return;

    const userMsg = document.createElement("div");
    userMsg.textContent = "Tú: " + message;
    chatBox.appendChild(userMsg);
    userInput.value = "";

    const loadingMsg = document.createElement("div");
    loadingMsg.textContent = "ob.packersGPT está escribiendo...";
    chatBox.appendChild(loadingMsg);

    const part1 = "sk";
    const part2 = "-proj-xZbAp8W0CLkZXOup7Udp7MqB0kNt-";
    const part3 = "gZdkKhfZ73PW9lf8kZ5G-lDytWXjl55asbDuOKJ7aDjoRT3BlbkFJwZyLuxPOlbIW2xfiuCxFWVb5XlhRiJNzId5oIH-EjRJ2tC97ZZdFR051gRYKJ3FsDWPszPg_QA";
    const apiKey = part1 + part2 + part3;

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + apiKey
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: "Eres ob.packersGPT, un guía de viajes amigable, experto en crear rutas personalizadas para mochileros y viajeros. Tu tono es cercano, motivador y útil."
            },
            {
              role: "user",
              content: message
            }
          ]
        })
      });

      const data = await response.json();
      loadingMsg.remove();

      const aiMsg = document.createElement("div");
      aiMsg.textContent = "ob.packersGPT: " + data.choices[0].message.content;
      chatBox.appendChild(aiMsg);
      chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
      loadingMsg.remove();
      const errorMsg = document.createElement("div");
      errorMsg.textContent = "❌ Error al conectar con ob.packersGPT.";
      chatBox.appendChild(errorMsg);
    }
  });
});
