document.addEventListener("DOMContentLoaded", () => {
  // MENÚ HAMBURGUESA
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("show");
  });
  
// GESTION DE CONTINENTES
const continentButtons = document.querySelectorAll(".continent");
continentButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const continentId = button.dataset.continent;
    const continentCities = document.getElementById(continentId);
    continentCities.classList.toggle("hidden");
  });
});

  // CIUDADES: Al hacer click en una ciudad, abrimos la ventana de chat
  const cityButtons = document.querySelectorAll(".city");
  const chatWindow = document.getElementById("chat-window");
  const chatTitle = document.getElementById("chat-destination-title");
  const chatMessages = document.getElementById("chat-messages");
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");

  cityButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Muestra la ventana de chat
      chatWindow.classList.remove("hidden");
      // Cambia el titulo segun la ciudad
      const cityName = button.dataset.city;
      chatTitle.textContent = `Chat - ${cityName}`;
      // Limpia los mensajes
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

  // BOTÓN FLOTANTE para Sugerir Ciudad
  const suggestBtn = document.getElementById("suggest-city-btn");
  const suggestFormContainer = document.getElementById("suggest-form-container");
  const suggestForm = document.getElementById("suggest-form");
  const confirmationMessage = document.getElementById("confirmation-message");
  const closeConfirmation = document.getElementById("close-confirmation");
  const closeSuggestForm = document.getElementById("close-suggest-form");

  // Mostrar/ocultar formulario
  suggestBtn.addEventListener("click", () => {
    suggestFormContainer.classList.toggle("hidden");
  });
  closeSuggestForm.addEventListener("click", () => {
    suggestFormContainer.classList.add("hidden");
  });

  // Al enviar nueva ciudad
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

    // Buscamos la ul de ese continente
    const ul = document.querySelector(`.city-list[data-continent="${continent}"]`);
    if (!ul) {
      alert("No se encontró la lista para ese continente.");
      return;
    }

    // Creamos un nuevo <li><button></button></li>
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.classList.add("city");
    btn.dataset.city = `${cityName} (${countryName})`;
    btn.textContent = `${cityName} (${countryName})`;

    // Añadimos evento para abrir chat
    btn.addEventListener("click", () => {
      chatWindow.classList.remove("hidden");
      chatTitle.textContent = `Chat - ${btn.dataset.city}`;
      chatMessages.innerHTML = "";
    });

    li.appendChild(btn);
    ul.appendChild(li);

    // Ocultamos formulario
    suggestFormContainer.classList.add("hidden");
    suggestForm.reset();

    // Mostramos mensaje confirmación
    confirmationMessage.classList.remove("hidden");
  });

  // Cerrar mensaje confirmación
  closeConfirmation.addEventListener("click", () => {
    confirmationMessage.classList.add("hidden");
  });
});
  // CIUDADES: Al hacer click en una ciudad, abrimos la ventana de chat
  const cityButtons = document.querySelectorAll(".city");
  const chatWindow = document.getElementById("chat-window");
  const chatTitle = document.getElementById("chat-destination-title");
  const chatMessages = document.getElementById("chat-messages");
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");

  cityButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Muestra la ventana de chat
      chatWindow.classList.remove("hidden");
      // Cambia el titulo segun la ciudad
      const cityName = button.dataset.city;
      chatTitle.textContent = `Chat - ${cityName}`;
      // Limpia los mensajes
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

  // BOTÓN FLOTANTE para Sugerir Ciudad
  const suggestBtn = document.getElementById("suggest-city-btn");
  const suggestFormContainer = document.getElementById("suggest-form-container");
  const suggestForm = document.getElementById("suggest-form");
  const confirmationMessage = document.getElementById("confirmation-message");
  const closeConfirmation = document.getElementById("close-confirmation");
  const closeSuggestForm = document.getElementById("close-suggest-form");

  // Mostrar/ocultar formulario
  suggestBtn.addEventListener("click", () => {
    suggestFormContainer.classList.toggle("hidden");
  });
  closeSuggestForm.addEventListener("click", () => {
    suggestFormContainer.classList.add("hidden");
  });

  // Al enviar nueva ciudad
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

    // Buscamos la ul de ese continente
    const ul = document.querySelector(`.city-list[data-continent="${continent}"]`);
    if (!ul) {
      alert("No se encontró la lista para ese continente.");
      return;
    }

    // Creamos un nuevo <li><button></button></li>
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.classList.add("city");
    btn.dataset.city = `${cityName} (${countryName})`;
    btn.textContent = `${cityName} (${countryName})`;

    // Añadimos evento para abrir chat
    btn.addEventListener("click", () => {
      chatWindow.classList.remove("hidden");
      chatTitle.textContent = `Chat - ${btn.dataset.city}`;
      chatMessages.innerHTML = "";
    });

    li.appendChild(btn);
    ul.appendChild(li);

    // Ocultamos formulario
    suggestFormContainer.classList.add("hidden");
    suggestForm.reset();

    // Mostramos mensaje confirmación
    confirmationMessage.classList.remove("hidden");
  });

  // Cerrar mensaje confirmación
  closeConfirmation.addEventListener("click", () => {
    confirmationMessage.classList.add("hidden");
  });
});
