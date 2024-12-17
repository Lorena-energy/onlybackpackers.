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

  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const messageInput = document.getElementById("chat-message");
    const message = messageInput.value.trim();

    if (message) {
      // Crear y añadir el mensaje
      const newMessage = document.createElement("p");
      newMessage.textContent = `Tú: ${message}`;
      chatBox.appendChild(newMessage);

      // Limpiar el campo y hacer scroll hacia abajo
      messageInput.value = "";
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  });
});
