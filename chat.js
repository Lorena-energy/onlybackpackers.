document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  // Menú hamburguesa
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  // Chats por destino
  const destinationButtons = document.querySelectorAll(".destination");
  const chatWindow = document.querySelector(".chat-window");
  const chatMessages = document.getElementById("chat-messages");
  const chatInput = document.getElementById("chat-input");
  const chatForm = document.getElementById("chat-form");
  const chatTitle = document.getElementById("chat-destination-title");

  destinationButtons.forEach((button) => {
    button.addEventListener("click", () => {
      chatTitle.textContent = `Chat - ${button.textContent}`;
      chatMessages.innerHTML = "";
      chatWindow.classList.remove("hidden");
    });
  });

  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const message = chatInput.value.trim();
    if (message) {
      const newMessage = document.createElement("div");
      newMessage.classList.add("message", "sent");
      newMessage.textContent = message;
      chatMessages.appendChild(newMessage);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      chatInput.value = "";
    }
  });
});
