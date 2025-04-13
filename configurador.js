const part1 = "sk";
const part2 = "-proj-xZbAp8W0CLkZXOup7Udp7MqB0kNt-";
const part3 = "gZdkKhfZ73PW9lf8kZ5G-lDytWXjl55asbDuOKJ7aDjoRT3BlbkFJwZyLuxPOlbIW2xfiuCxFWVb5XlhRiJNzId5oIH-EjRJ2tC97ZZdFR051gRYKJ3FsDWPszPg_QA";
const apiKey = part1 + part2 + part3;

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
