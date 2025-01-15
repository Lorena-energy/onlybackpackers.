document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  // Menú hamburguesa
  toggleBtn.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  // Barra de búsqueda
  const searchBar = document.getElementById("search-bar");
  const destinations = document.querySelectorAll(".destination");

  searchBar.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    destinations.forEach((dest) => {
      const text = dest.textContent.toLowerCase();
      dest.closest("li").style.display = text.includes(query) ? "" : "none";
    });
  });

  // Chat funcionalidad
  const chatWindow = document.querySelector(".chat-window");
  const chatMessages = document.getElementById("chat-messages");
  const chatInput = document.getElementById("chat-input");
  const chatForm = document.getElementById("chat-form");
  const chatTitle = document.getElementById("chat-destination-title");

  destinations.forEach((button) => {
    button.addEventListener("click", () => {
      chatTitle.textContent = `Chat - ${button.textContent}`;
      chatMessages.innerHTML = ""; // Limpiar mensajes previos
      chatWindow.classList.remove("hidden");
    });
  });

  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = chatInput.value.trim();
    if (message) {
      const newMessage = document.createElement("div");
      newMessage.textContent = message;
      chatMessages.appendChild(newMessage);
      chatInput.value = "";
    }
  });
});
