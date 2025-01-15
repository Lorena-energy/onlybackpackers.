document.addEventListener("DOMContentLoaded", () => {
  // Menú hamburguesa
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("show");
  });

  // Gestionar desplegables de continentes
  const continentButtons = document.querySelectorAll(".continent");
  continentButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const continentId = button.dataset.continent;
      const continentCities = document.getElementById(continentId);
      continentCities.classList.toggle("hidden");
    });
  });

  // Chat funcional
  const cityButtons = document.querySelectorAll(".city");
  const chatWindow = document.querySelector(".chat-window");
  const chatMessages = document.getElementById("chat-messages");
  const chatInput = document.getElementById("chat-input");
  const chatForm = document.getElementById("chat-form");
  const chatTitle = document.getElementById("chat-destination-title");

  cityButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const cityName = button.textContent;
      if (chatTitle) {
        chatTitle.textContent = `Chat - ${cityName}`;
      }
      if (chatMessages) {
        chatMessages.innerHTML = ""; // limpiar chat
      }
      if (chatWindow) {
        chatWindow.classList.remove("hidden");
      }
    });
  });

  // Enviar mensaje
  if (chatForm) {
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const message = chatInput.value.trim();
      if (message) {
        const newMessage = document.createElement("div");
        newMessage.textContent = message;
        newMessage.classList.add("sent-message");
        chatMessages.appendChild(newMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        chatInput.value = "";
      }
    });
  }
});
