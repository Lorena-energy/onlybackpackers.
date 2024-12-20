// Función para abrir el chat de un destino
function openChat(destination) {
  const chatContainer = document.getElementById("chat-container");
  const chatTitle = document.getElementById("chat-title");
  const chatBox = document.getElementById("chat-box");

  // Mostrar el contenedor del chat y actualizar el título
  chatContainer.classList.remove("hidden");
  chatTitle.textContent = `Chat - ${destination}`;

  // Limpiar el chat anterior
  chatBox.innerHTML = "";
}

// Manejar el envío de mensajes
document.addEventListener("DOMContentLoaded", () => {
  const chatForm = document.getElementById("chat-form");
  const chatBox = document.getElementById("chat-box");
  const messageInput = document.getElementById("chat-message");

  // Escuchar el envío del formulario
  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const message = messageInput.value.trim();

    if (message) {
      // Crear el contenedor del mensaje
      const newMessage = document.createElement("div");
      newMessage.classList.add("message", "sent-message");

      // Añadir el texto del mensaje
      const messageText = document.createElement("p");
      messageText.textContent = message;
      newMessage.appendChild(messageText);

      // Añadir el mensaje al chat
      chatBox.appendChild(newMessage);

      // Limpiar el campo de entrada y hacer scroll hacia abajo
      messageInput.value = "";
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  });

  // Opción para presionar "Enter" para enviar mensajes
  messageInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      chatForm.dispatchEvent(new Event("submit"));
    }
  });
});
