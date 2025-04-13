const apiKey = "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";

const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;

  // Mostrar mensaje del usuario
  const userMsg = document.createElement("div");
  userMsg.textContent = "Tú: " + message;
  chatBox.appendChild(userMsg);
  userInput.value = "";

  // Mostrar mensaje de carga
  const loadingMsg = document.createElement("div");
  loadingMsg.textContent = "ob.packersGPT está escribiendo...";
  chatBox.appendChild(loadingMsg);

  // Llamada a OpenAI API
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
            content: "Eres ob.packersGPT, un guía de viajes amigable y experto en crear rutas personalizadas para viajeros de todo tipo. Tu tono es cercano, motivador y práctico."
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
    errorMsg.textContent = "Error al conectar con ob.packersGPT.";
    chatBox.appendChild(errorMsg);
  }
});
