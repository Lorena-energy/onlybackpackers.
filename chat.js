document.addEventListener("DOMContentLoaded", () => {

  /* ╔═ MENÚ HAMBURGUESA ════════════════════════ */
  const menuToggle = document.getElementById("menu-toggle");
  const menu       = document.getElementById("menu");
  menuToggle?.addEventListener("click", () => menu.classList.toggle("active"));

  /* ╔═ COLAPSAR / EXPANDIR CONTINENTES ═════════ */
  document.querySelectorAll(".continent").forEach(header=>{
    header.addEventListener("click",()=>{
      const ul = header.nextElementSibling;          // la <ul> justo debajo
      ul?.classList.toggle("hidden");
    });
  });

  /* ╔═ REFERENCIAS DE CHAT ═════════════════════ */
  const chatWindow = document.getElementById("chat-window"); // ← sección real
  const chatTitle  = document.getElementById("chat-destination-title");
  const chatMsgs   = document.getElementById("chat-messages");
  const chatForm   = document.getElementById("chat-form");
  const chatInput  = document.getElementById("chat-input");

  /* ╔═ ABRIR CHAT DE UNA CIUDAD ═════════════════ */
  document.querySelectorAll(".city").forEach(btn=>{
    btn.addEventListener("click",()=>{
      chatTitle.textContent = "Chat - " + btn.dataset.city;
      chatMsgs.innerHTML = "";                 // aquí irían mensajes remotos
      chatWindow.classList.remove("hidden");   // mostrar panel
      chatInput.focus();
    });
  });

  /* ╔═ ENVIAR MENSAJE LOCAL ════════════════════ */
  chatForm?.addEventListener("submit",e=>{
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

  /* ╔═ BOTÓN FLOTANTE “AÑADE CIUDAD” ═══════════ */
  const btnAdd     = document.getElementById("suggest-city-btn");
  const formWrap   = document.getElementById("suggest-form-container");
  const form       = document.getElementById("suggest-form");
  const confirmBox = document.getElementById("confirmation-message");

  btnAdd?.addEventListener("click",()=>formWrap.classList.toggle("hidden"));
  document.getElementById("close-suggest-form")
           ?.addEventListener("click",()=>formWrap.classList.add("hidden"));
  document.getElementById("close-confirmation")
           ?.addEventListener("click",()=>confirmBox.classList.add("hidden"));

  /* ╔═ AÑADIR CIUDAD DINÁMICAMENTE ═════════════ */
  form?.addEventListener("submit",e=>{
    e.preventDefault();

    const cont    = document.getElementById("continent-select").value;
    const city    = document.getElementById("city-name").value.trim();
    const country = document.getElementById("country-name").value.trim();
    const reason  = document.getElementById("reason").value.trim();

    if(!cont||!city||!country||!reason){
      alert("Rellena todos los campos obligatorios"); return;
    }

    const ul = document.querySelector(`.city-list[data-continent='${cont}']`);
    if(!ul){alert("Continente no encontrado"); return;}

    const li  = document.createElement("li");
    const btn = document.createElement("button");
    btn.className   = "city";
    btn.dataset.city= `${city} (${country})`;
    btn.textContent = `${city} (${country})`;
    btn.addEventListener("click",()=>{
      chatTitle.textContent = "Chat - " + btn.dataset.city;
      chatMsgs.innerHTML="";
      chatWindow.classList.remove("hidden");
      chatInput.focus();
    });

    li.appendChild(btn);
    ul.appendChild(li);

    form.reset();
    formWrap.classList.add("hidden");
    confirmBox.classList.remove("hidden");
  });
});
