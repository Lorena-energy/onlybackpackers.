/* chat.js — OnlyBackpackers (versión revisada) */
document.addEventListener("DOMContentLoaded", () => {

  /* ╔══════════ MENÚ HAMBURGUESA ═════════════╗ */
  const menuToggle = document.getElementById("menu-toggle");
  const menu       = document.getElementById("menu");
  menuToggle?.addEventListener("click", () => menu.classList.toggle("show"));   // «show» = clase en tu CSS



  /* ╔══════ COLAPSAR / EXPANDIR CONTINENTES ═══╗ */
  /*  ▼▼  selector corregido:  .continent  ▼▼   */
  document.querySelectorAll(".continent").forEach(header => {
    header.addEventListener("click", () => {
      const list = header.nextElementSibling;          // el UL sigue justo después
      list?.classList.toggle("hidden");
    });
  });



  /* ╔════════════ REFERENCIAS DE CHAT ═════════╗ */
  const chatPanel = document.getElementById("chat-window");   // panel derecho
  const chatTitle = document.getElementById("chat-destination-title");
  const chatMsgs  = document.getElementById("chat-messages");
  const chatForm  = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");



  /* ╔══════════ ABRIR CHAT DE CIUDAD ══════════╗ */
  /*  ▼▼  selector corregido:  .city  ▼▼        */
  document.querySelectorAll(".city").forEach(btn => {
    btn.addEventListener("click", () => {
      chatTitle.textContent = "Chat - " + btn.dataset.city;
      chatMsgs.innerHTML = "";            // ← aquí podrás cargar mensajes remotos
      chatPanel.classList.remove("hidden");
      chatInput.focus();
    });
  });



  /* ╔═════════ ENVIAR MENSAJE (local) ═════════╗ */
  chatForm?.addEventListener("submit", e => {
    e.preventDefault();
    const txt = chatInput.value.trim();
    if (!txt) return;

    const div = document.createElement("div");
    div.className = "message";
    div.textContent = txt;
    chatMsgs.appendChild(div);

    chatInput.value = "";
    chatMsgs.scrollTop = chatMsgs.scrollHeight;   // auto-scroll al final
  });



  /* ╔════ BOTÓN FLOTANTE “AÑADE CIUDAD” ═══════╗ */
  const btnAdd     = document.getElementById("suggest-city-btn");
  const formWrap   = document.getElementById("suggest-form-container");
  const form       = document.getElementById("suggest-form");
  const confirmBox = document.getElementById("confirmation-message");

  btnAdd?.addEventListener("click", () =>
    formWrap.classList.toggle("hidden")
  );

  document.getElementById("close-suggest-form")
           ?.addEventListener("click", () =>
             formWrap.classList.add("hidden")
           );

  document.getElementById("close-confirmation")
           ?.addEventListener("click", () =>
             confirmBox.classList.add("hidden")
           );



  /* ╔══════ AÑADIR NUEVA CIUDAD (dinámico) ════╗ */
  form?.addEventListener("submit", e => {
    e.preventDefault();

    const cont     = document.getElementById("continent-select").value;
    const city     = document.getElementById("city-name").value.trim();
    const country  = document.getElementById("country-name").value.trim();
    const reason   = document.getElementById("reason").value.trim();

    if (!cont || !city || !country || !reason) {
      alert("Rellena todos los campos obligatorios.");
      return;
    }

    const ul = document.querySelector(`.city-list[data-continent='${cont}']`);
    if (!ul) { alert("Continente no encontrado."); return; }

    // crea nuevo botón de ciudad
    const li  = document.createElement("li");
    const btn = document.createElement("button");
    btn.className   = "city";
    btn.dataset.city = `${city} (${country})`;
    btn.textContent = `${city} (${country})`;

    btn.addEventListener("click", () => {
      chatTitle.textContent = "Chat - " + btn.dataset.city;
      chatMsgs.innerHTML = "";
      chatPanel.classList.remove("hidden");
      chatInput.focus();
    });

    li.appendChild(btn);
    ul.appendChild(li);

    form.reset();
    formWrap.classList.add("hidden");
    confirmBox.classList.remove("hidden");
  });

});
