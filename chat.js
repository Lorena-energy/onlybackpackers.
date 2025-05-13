document.addEventListener("DOMContentLoaded", () => {
  // ===== MENÚ HAMBURGUESA =====
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      menu.classList.toggle("show");
    });
  }

  // ===== MOSTRAR/OCULTAR LISTA DE CIUDADES =====
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

  // ===== MOSTRAR CHAT CUANDO SE CLICA UNA CIUDAD =====
  const cityButtons = document.querySelectorAll(".city");
  const chatWindow = document.getElementById("chat-window");
  const chatTitle = document.getElementById("chat-destination-title");
  const chatMessages = document.getElementById("chat-messages");
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");

  cityButtons.forEach(button => {
    button.addEventListener("click", () => {
      const cityName = button.dataset.city;
      chatWindow.classList.remove("hidden");
      chatTitle.textContent = `Chat - ${cityName}`;
      chatMessages.innerHTML = ""; // Podríamos cargar historial aquí si lo tuvieras.
    });
  });

  // ===== ENVIAR MENSAJE EN CHAT =====
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

  // ===== BOTÓN "AÑADIR CIUDAD" =====
  const suggestBtn = document.getElementById("suggest-city-btn");
  const suggestFormContainer = document.getElementById("suggest-form-container");
  const suggestForm = document.getElementById("suggest-form");
  const confirmationMessage = document.getElementById("confirmation-message");
  const closeConfirmation = document.getElementById("close-confirmation");
  const closeSuggestForm = document.getElementById("close-suggest-form");

  // Mostrar formulario
  suggestBtn.addEventListener("click", () => {
    suggestFormContainer.classList.toggle("hidden");
  });

  // Ocultar formulario
  if (closeSuggestForm) {
    closeSuggestForm.addEventListener("click", () => {
      suggestFormContainer.classList.add("hidden");
    });
  }

  // ===== SUGERIR NUEVA CIUDAD =====
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

    const cityList = document.querySelector(`.city-list[data-continent="${continent}"]`);
    if (!cityList) {
      alert("No se encontró la lista para ese continente.");
      return;
    }

    // Crear nuevo botón de ciudad
    const li = document.createElement("li");
    const newCityBtn = document.createElement("button");
    const fullCityName = `${cityName} (${countryName})`;

    newCityBtn.classList.add("city");
    newCityBtn.dataset.city = fullCityName;
    newCityBtn.textContent = fullCityName;

    // Evento para abrir chat
    newCityBtn.addEventListener("click", () => {
      chatWindow.classList.remove("hidden");
      chatTitle.textContent = `Chat - ${fullCityName}`;
      chatMessages.innerHTML = "";
    });

    li.appendChild(newCityBtn);
    cityList.appendChild(li);

    // Reset y mostrar confirmación
    suggestForm.reset();
    suggestFormContainer.classList.add("hidden");
    confirmationMessage.classList.remove("hidden");
  });

  // ===== CERRAR CONFIRMACIÓN =====
  closeConfirmation.addEventListener("click", () => {
    confirmationMessage.classList.add("hidden");
  });
});
