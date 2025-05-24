document.addEventListener("DOMContentLoaded", () => {

  /* ║ MENÚ HAMBURGUESA ║ */
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  menuToggle.addEventListener("click", () => menu.classList.toggle("active"));

  /* ║ COLAPSAR / EXPANDIR CONTINENTES ║ */
  document.querySelectorAll(".continent-header").forEach(h => {
    h.addEventListener("click", () => {
      const ul = h.nextElementSibling;
      ul.classList.toggle("hidden");
      h.textContent = h.textContent.replace(/▸|▾/,(ul.classList.contains("hidden")?"▸":"▾"));
    });
  });

  /* ║ REFERENCIAS CHAT ║ */
  const chatPanel = document.getElementById("chat-panel");
  const chatTitle = chatPanel.querySelector(".chat-title");
  const chatMsgs  = document.getElementById("chat-messages");
  const chatForm  = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");

  /* ║ ABRIR CHAT CIUDAD ║ */
  document.querySelectorAll(".city-btn").forEach(btn=>{
    btn.addEventListener("click",()=>{
      chatTitle.textContent = "Chat – " + btn.dataset.city;
      chatMsgs.innerHTML = "";                 // (aquí podrías cargar mensajes remotos)
      chatForm.classList.remove("hidden");
      chatInput.focus();
    });
  });

  /* ║ ENVIAR MENSAJE ║ */
  chatForm.addEventListener("submit",e=>{
    e.preventDefault();
    const txt = chatInput.value.trim();
    if(!txt) return;
    const div = document.createElement("div");
    div.className = "message";
    div.textContent = txt;
    chatMsgs.appendChild(div);
    chatInput.value = "";
    chatMsgs.scrollTop = chatMsgs.scrollHeight;
  });

  /* ║ BOTÓN FLOTANTE / FORM SUGERIR ║ */
  const btnAdd = document.getElementById("suggest-city-btn");
  const formWrap = document.getElementById("suggest-form-container");
  const form = document.getElementById("suggest-form");
  const confirmBox = document.getElementById("confirmation-message");

  btnAdd.addEventListener("click",()=>formWrap.classList.toggle("hidden"));
  document.getElementById("close-suggest-form").addEventListener("click",()=>formWrap.classList.add("hidden"));
  document.getElementById("close-confirmation").addEventListener("click",()=>confirmBox.classList.add("hidden"));

  /* ║ AÑADIR CIUDAD NUEVA ║ */
  form.addEventListener("submit",e=>{
    e.preventDefault();
    const cont = document.getElementById("continent-select").value;
    const city = document.getElementById("city-name").value.trim();
    const country = document.getElementById("country-name").value.trim();
    const reason = document.getElementById("reason").value.trim();
    if(!cont||!city||!country||!reason){alert("Completa todos los campos");return;}

    const ul = document.querySelector(`.city-list[data-continent='${cont}']`);
    if(!ul){alert("Continente no encontrado");return;}

    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.className = "city-btn";
    btn.dataset.city = `${city} (${country})`;
    btn.textContent = `${city} (${country})`;
    btn.addEventListener("click",()=>{
      chatTitle.textContent = "Chat – " + btn.dataset.city;
      chatMsgs.innerHTML="";
      chatForm.classList.remove("hidden");
      chatInput.focus();
    });
    li.appendChild(btn); ul.appendChild(li);

    form.reset();
    formWrap.classList.add("hidden");
    confirmBox.classList.remove("hidden");
  });

});
