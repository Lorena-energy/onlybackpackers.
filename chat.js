document.addEventListener("DOMContentLoaded", () => {
  // MENÚ HAMBURGUESA
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      menu.classList.toggle("show");
    });
  }

  // Toggle de lista de ciudades por continente
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

  // Funcionalidad del Chat
  const cityButtons = document.querySelectorAll(".city");
  const chatWindow = document.getElementById("chat-window");
  const chatTitle = document.getElementById("chat-destination-title");
  const chatMessages = document.getElementById("chat-messages");
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");

  cityButtons.forEach(button => {
    button.addEventListener("click", () => {
      chatWindow.classList.remove("hidden");
      chatTitle.textContent = `Chat - ${button.dataset.city}`;
      chatMessages.innerHTML = "";
    });
  });

  // Enviar mensaje en el chat
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

  // Funcionalidad para sugerir una nueva ciudad
  const suggestBtn = document.getElementById("suggest-city-btn");
  const suggestFormContainer = document.getElementById("suggest-form-container");
  const suggestForm = document.getElementById("suggest-form");
  const confirmationMessage = document.getElementById("confirmation-message");
  const closeConfirmation = document.getElementById("close-confirmation");
  const closeSuggestForm = document.getElementById("close-suggest-form");

  // Mostrar/ocultar formulario de sugerencia
  suggestBtn.addEventListener("click", () => {
    suggestFormContainer.classList.toggle("hidden");
  });
  if (closeSuggestForm) {
    closeSuggestForm.addEventListener("click", () => {
      suggestFormContainer.classList.add("hidden");
    });
  }

  // Al enviar el formulario de sugerencia de ciudad
  suggestForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const continent = document.getElementById("continent-select").value;
    const cityName = document.getElementById("city-name").value.trim();
    const countryName = document.getElementById("country-name").value.trim();
    const reason = document.getElementById("reason").value.trim();

    if (!continent || !cityName || !countryName || !reason) {
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }

    // Buscar la lista de ciudades del continente seleccionado
    const cityList = document.querySelector(`.city-list[data-continent="${continent}"]`);
    if (!cityList) {
      alert("No se encontró la lista para ese continente.");
      return;
    }

    // Crear el nuevo botón de ciudad
    const li = document.createElement("li");
    const newCityBtn = document.createElement("button");
    newCityBtn.classList.add("city");
    newCityBtn.dataset.city = `${cityName} (${countryName})`;
    newCityBtn.textContent = `${cityName} (${countryName})`;

    // Asignar funcionalidad al nuevo botón
    newCityBtn.addEventListener("click", () => {
      chatWindow.classList.remove("hidden");
      chatTitle.textContent = `Chat - ${newCityBtn.dataset.city}`;
      chatMessages.innerHTML = "";
    });

    li.appendChild(newCityBtn);
    cityList.appendChild(li);

    // Ocultar el formulario y reiniciar sus campos
    suggestFormContainer.classList.add("hidden");
    suggestForm.reset();

    // Mostrar mensaje de confirmación
    confirmationMessage.classList.remove("hidden");
  });

  // Cerrar mensaje de confirmación
  closeConfirmation.addEventListener("click", () => {
    confirmationMessage.classList.add("hidden");
  });
});
