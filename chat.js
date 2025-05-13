document.addEventListener("DOMContentLoaded", () => {
  // MENÚ HAMBURGUESA
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      menu.classList.toggle("show");
    });
  }

  // Mostrar/ocultar lista de ciudades por continente
  const continentHeaders = document.querySelectorAll(".continent");
  continentHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const id = header.dataset.continent;
      const cityList = document.getElementById(id);
      if (cityList) {
        cityList.classList.toggle("hidden");
      }
    });
  });

  // Ventana de Chat
  const chatWindow = document.getElementById("chat-window");
  const chatTitle = document.getElementById("chat-destination-title");
  const chatMessages = document.getElementById("chat-messages");
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");

  // Funcionalidad al hacer clic en una ciudad
  const cityButtons = document.querySelectorAll(".city");
  cityButtons.forEach(button => {
    button.addEventListener("click", () => {
      const cityName = button.dataset.city;
      chatTitle.textContent = `Chat - ${cityName}`;
      chatWindow.classList.remove("hidden");
      chatMessages.innerHTML = ""; // Aquí puedes cargar mensajes desde Firebase más adelante
    });
  });

  // Enviar mensaje
  if (chatForm) {
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const message = chatInput.value.trim();
      if (message !== "") {
        const msgDiv = document.createElement("div");
        msgDiv.classList.add("message");
        msgDiv.textContent = message;
        chatMessages.appendChild(msgDiv);
        chatInput.value = "";
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    });
  }

  // Formulario sugerir ciudad
  const suggestBtn = document.getElementById("suggest-city-btn");
  const suggestFormContainer = document.getElementById("suggest-form-container");
  const suggestForm = document.getElementById("suggest-form");
  const confirmationMessage = document.getElementById("confirmation-message");
  const closeConfirmation = document.getElementById("close-confirmation");
  const closeSuggestForm = document.getElementById("close-suggest-form");

  suggestBtn.addEventListener("click", () => {
    suggestFormContainer.classList.toggle("hidden");
  });

  closeSuggestForm.addEventListener("click", () => {
    suggestFormContainer.classList.add("hidden");
  });

  suggestForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const continent = document.getElementById("continent-select").value;
    const cityName = document.getElementById("city-name").value.trim();
    const countryName = document.getElementById("country-name").value.trim();
    const reason = document.getElementById("reason").value.trim();

    if (!continent || !cityName || !countryName || !reason) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    const cityList = document.querySelector(`.city-list[data-continent="${continent}"]`);
    if (!cityList) return;

    const li = document.createElement("li");
    const newButton = document.createElement("button");
    newButton.classList.add("city");
    newButton.dataset.city = `${cityName} (${countryName})`;
    newButton.textContent = `${cityName} (${countryName})`;

    newButton.addEventListener("click", () => {
      chatTitle.textContent = `Chat - ${newButton.dataset.city}`;
      chatWindow.classList.remove("hidden");
      chatMessages.innerHTML = "";
    });

    li.appendChild(newButton);
    cityList.appendChild(li);

    suggestForm.reset();
    suggestFormContainer.classList.add("hidden");
    confirmationMessage.classList.remove("hidden");
  });

  closeConfirmation.addEventListener("click", () => {
    confirmationMessage.classList.add("hidden");
  });
});
