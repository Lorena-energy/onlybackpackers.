document.addEventListener("DOMContentLoaded", () => {
  // Menú hamburguesa
  const toggleBtn = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  toggleBtn?.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  // Chats por destino
  const destinationButtons = document.querySelectorAll(".destination");
  const chatWindow = document.querySelector(".chat-window");
  const chatMessages = document.getElementById("chat-messages");
  const chatInput = document.getElementById("chat-input");
  const chatForm = document.getElementById("chat-form");
  const chatTitle = document.getElementById("chat-destination-title");

  // Abrir chat para un destino
  destinationButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const destination = button.dataset.destination;
      chatTitle.textContent = `Chat - ${button.textContent}`;
      chatMessages.innerHTML = ""; // Limpiar mensajes previos
      chatWindow.classList.remove("hidden");
    });
  });

  // Enviar mensaje
  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const message = chatInput.value.trim();
    if (message) {
      const newMessage = document.createElement("div");
      newMessage.classList.add("message", "sent");
      newMessage.textContent = message;

      chatMessages.appendChild(newMessage);
      chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll automático
      chatInput.value = ""; // Limpiar input
    }
  });
});

