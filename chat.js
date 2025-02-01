document.addEventListener("DOMContentLoaded", () => {
  // MENÚ HAMBURGUESA
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("show");
  });

  // Toggle de lista de ciudades por continente (al hacer clic en el encabezado)
  const continentHeaders = document.querySelectorAll(".continent");
  continentHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const id = header.dataset.continent;
      const lista = document.getElementById(id);
      if (lista) {
        lista.classList.toggle("hidden");
      }
    });
  });

  // Abrir chat al hacer clic en una ciudad
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
    const msg = chatInput.value.trim();
    if (msg) {
      const div = document.createElement("div");
      div.classList.add("message");
      div.textContent = msg;
      chatMessages.appendChild(div);
      chatInput.value = "";
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  });

  // --- Sugerir ciudad ---
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
  if (closeSuggestForm) {
    closeSuggestForm.addEventListener("click", () => {
      suggestFormContainer.classList.add("hidden");
    });
  }

  // Al enviar la sugerencia de nueva ciudad
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

    // Buscamos la lista de ciudades del continente seleccionado
    const ul = document.querySelector(`.city-list[data-continent="${continent}"]`);
    if (!ul) {
      alert("No se encontró la lista para ese continente.");
      return;
    }

    // Creamos un nuevo botón de ciudad
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.classList.add("city");
    btn.dataset.city = `${cityName} (${countryName})`;
    btn.textContent = `${cityName} (${countryName})`;

    // Evento para abrir el chat al hacer clic en la nueva ciudad
    btn.addEventListener("click", () => {
      chatWindow.classList.remove("hidden");
      chatTitle.textContent = `Chat - ${btn.dataset.city}`;
      chatMessages.innerHTML = "";
    });

    li.appendChild(btn);
    ul.appendChild(li);

    // Ocultamos el formulario y reiniciamos sus campos
    suggestFormContainer.classList.add("hidden");
    suggestForm.reset();

    // Mostramos mensaje de confirmación
    confirmationMessage.classList.remove("hidden");
  });

  // Cerrar mensaje de confirmación
  closeConfirmation.addEventListener("click", () => {
    confirmationMessage.classList.add("hidden");
  });
});
