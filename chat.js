document.addEventListener("DOMContentLoaded", () => {
  // MENÚ HAMBURGUESA
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("show");
  });

  // GESTIÓN DE CONTINENTES: al hacer clic en el encabezado se muestra/oculta la lista de ciudades
  const continentHeaders = document.querySelectorAll(".continent");
  continentHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const continentId = header.dataset.continent;
      const continentCities = document.getElementById(continentId);
      if (continentCities) {
        continentCities.classList.toggle("hidden");
      }
    });
  });

  // CIUDADES: al hacer clic en una ciudad se abre la ventana de chat
  const cityButtons = document.querySelectorAll(".city");
  const chatWindow = document.getElementById("chat-window");
  const chatTitle = document.getElementById("chat-destination-title");
  const chatMessages = document.getElementById("chat-messages");
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");

  cityButtons.forEach(button => {
    button.addEventListener("click", () => {
      chatWindow.classList.remove("hidden");
      const cityName = button.dataset.city;
      chatTitle.textContent = `Chat - ${cityName}`;
      chatMessages.innerHTML = "";
    });
  });

  // Enviar mensaje en el chat
  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = chatInput.value.trim();
    if (message) {
      const newMsg = document.createElement("div");
      newMsg.classList.add("message");
      newMsg.textContent = message;
      chatMessages.appendChild(newMsg);
      chatInput.value = "";
      // Auto-scroll al final
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  });

  // BOTÓN FLOTANTE para Sugerir Ciudad y formulario
  const suggestBtn = document.getElementById("suggest-city-btn");
  const suggestFormContainer = document.getElementById("suggest-form-container");
  const suggestForm = document.getElementById("suggest-form");
  const confirmationMessage = document.getElementById("confirmation-message");
  const closeConfirmation = document.getElementById("close-confirmation");
  const closeSuggestForm = document.getElementById("close-suggest-form");

  // Mostrar/ocultar formulario al hacer clic en el botón flotante o en "Cerrar"
  suggestBtn.addEventListener("click", () => {
    suggestFormContainer.classList.toggle("hidden");
  });
  closeSuggestForm.addEventListener("click", () => {
    suggestFormContainer.classList.add("hidden");
  });

  // Al enviar nueva ciudad sugerida
  suggestForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const continent = document.getElementById("continent-select").value;
    const cityName = document.getElementById("city-name").value.trim();
    const countryName = document.getElementById("country-name").value.trim();
    const reason = document.getElementById("reason").value.trim();
    // const comments = document.getElementById("comments").value; // OPCIONAL

    if (!continent || !cityName || !countryName || !reason) {
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }

    // Buscamos la lista de ciudades del continente seleccionado
    const ul = document.querySelector(`.city-list[data-continent="${continent}"]`);
    if (!ul) {
      alert("No se encontró la lista para ese continente.");
      return;
    }

    // Creamos un nuevo elemento de ciudad
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.classList.add("city");
    btn.dataset.city = `${cityName} (${countryName})`;
    btn.textContent = `${cityName} (${countryName})`;

    // Al hacer clic en la nueva ciudad se abre el chat
    btn.addEventListener("click", () => {
      chatWindow.classList.remove("hidden");
      chatTitle.textContent = `Chat - ${btn.dataset.city}`;
      chatMessages.innerHTML = "";
    });

    li.appendChild(btn);
    ul.appendChild(li);

    // Ocultamos el formulario y lo reiniciamos
    suggestFormContainer.classList.add("hidden");
    suggestForm.reset();

    // Mostramos el mensaje de confirmación
    confirmationMessage.classList.remove("hidden");
  });

  // Cerrar mensaje de confirmación
  closeConfirmation.addEventListener("click", () => {
    confirmationMessage.classList.add("hidden");
  });
});
