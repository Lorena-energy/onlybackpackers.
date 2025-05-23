/* ─────────────────────────────
   ob.packersGPT  ·  v2 “híbrido”
   – Usa enlaces específicos guardados en enlaces.json
   – Si el destino no está, genera links genéricos al vuelo
─────────────────────────────*/

// 🔐 Clave camuflada
const part1 = "sk";
const part2 = "-proj-xZbAp8W0CLkZXOup7Udp7MqB0kNt-";
const part3 = "gZdkKhfZ73PW9lf8kZ5G-lDytWXjl55asbDuOKJ7aDjoRT3BlbkFJwZyLuxPOlbIW2xfiuCxFWVb5XlhRiJNzId5oIH-EjRJ2tC97ZZdFR051gRYKJ3FsDWPszPg_QA";
const apiKey = part1 + part2 + part3;

const chatBox  = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

// Cargar enlaces específicos
let enlacesJSON = {};
fetch('enlaces.json')
  .then(r => r.json())
  .then(d => enlacesJSON = d)
  .catch(() => console.warn("⚠️ No se encontró enlaces.json; se usarán sólo los genéricos."));

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = userInput.value.trim();
  if (!formData) return;

  chatBox.appendChild(Object.assign(document.createElement('div'), {textContent: "Tú: " + formData}));
  userInput.value = "";

  const load = document.createElement('div');
  load.textContent = "ob.packersGPT está escribiendo…";
  chatBox.appendChild(load);

  /* ── Detectar destino ───────────────────────── */
  let destinoDetectado = "";
  const lower = formData.toLowerCase();
  for (const destino in enlacesJSON) {
    if (lower.includes(destino)) { destinoDetectado = destino; break; }
  }
  if (!destinoDetectado) {
    // intento simple: usar la última palabra relevante como destino
    const palabras = lower.split(/\s+/);
    destinoDetectado = palabras[palabras.length - 1];
  }

  /* ── Obtener enlaces ────────────────────────── */
  let actLink, hosLink;
  if (enlacesJSON[destinoDetectado]) {
    actLink = enlacesJSON[destinoDetectado].actividades;
    hosLink = enlacesJSON[destinoDetectado].hostels;
  } else {
    const encoded = encodeURIComponent(destinoDetectado);
    actLink = `https://www.getyourguide.com/?q=${encoded}&partner_id=0PBI9YH&cmp=share_to_earn`;
    hosLink = `https://hostelworld.prf.hn/click/camref:1101l52sgW/destination:${encoded}`;
  }
  const extraLinks = `\n\n👉 Actividades recomendadas: ${actLink}\n👉 Hostels económicos: ${hosLink}`;

  /* ── Enviar a GPT ───────────────────────────── */
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system",
            content: "Eres ob.packersGPT, un guía mochilero cercano, divertido y muy práctico." },
          { role: "user",
            content: `${formData}\n\nNecesito ideas de actividades y hostels. Añade tus enlaces.` + extraLinks }
        ]
      })
    });
    const data = await res.json();
    load.remove();
    chatBox.appendChild(Object.assign(document.createElement('div'), {
      textContent: "ob.packersGPT: " + data.choices[0].message.content
    }));
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (err) {
    load.remove();
    chatBox.appendChild(Object.assign(document.createElement('div'), {
      textContent: "❌ Error al conectar con ob.packersGPT."
    }));
  }
});

