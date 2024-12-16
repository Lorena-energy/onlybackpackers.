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
document.getElementById("chat-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const messageInput = document.getElementById("chat-message");
  const message = messageInput.value;

  if (message.trim() !== "") {
    const chatBox = document.getElementById("chat-box");

    // Crear un nuevo mensaje
    const newMessage = document.createElement("p");
    newMessage.textContent = `Tú: ${message}`;
    chatBox.appendChild(newMessage);

    // Limpiar el campo de mensaje
    messageInput.value = "";

    // Desplazar el chat hacia abajo
    chatBox.scrollTop = chatBox.scrollHeight;
  }
});
