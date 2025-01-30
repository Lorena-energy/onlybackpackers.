document.addEventListener("DOMContentLoaded", () => {
  console.log("Chat.js cargado correctamente");

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
      chatTitle.textContent = `Chat - ${cityName}`;
      chatMessages.innerHTML = ""; // Limpiar mensajes previos
      chatWindow.classList.remove("hidden");
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

  // Agregar nueva ciudad sugerida dinámicamente
  const suggestForm = document.getElementById("suggest-city-form");

  suggestForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newCity = document.getElementById("new-city").value.trim();
    const continent = document.getElementById("continent").value;

    if (newCity && continent) {
      const continentList = document.getElementById(continent.toLowerCase());

      if (continentList) {
        const cityItem = document.createElement("li");
        const cityButton = document.createElement("button");
        cityButton.textContent = newCity;
        cityButton.classList.add("city");
        cityItem.appendChild(cityButton);
        continentList.appendChild(cityItem);

        // Agregar funcionalidad al nuevo botón de ciudad
        cityButton.addEventListener("click", () => {
          chatTitle.textContent = `Chat - ${newCity}`;
          chatMessages.innerHTML = ""; // Limpiar mensajes previos
          chatWindow.classList.remove("hidden");
        });

        alert(`Ciudad "${newCity}" agregada exitosamente en ${continent}.`);
      } else {
        alert("Error: No se pudo encontrar la lista del continente.");
      }

      // Limpiar formulario después de agregar la ciudad
      suggestForm.reset();
    }
  });
});
