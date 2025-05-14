document.addEventListener("DOMContentLoaded", () => {

  /* ═ MENÚ ═ */
  document.getElementById("menu-toggle")
          ?.addEventListener("click",
            () => document.getElementById("menu").classList.toggle("active"));

  /* ═ Colapsar/expandir continentes ═ */
  document.querySelectorAll(".continent-header").forEach(h=>{
    h.addEventListener("click",()=>h.nextElementSibling.classList.toggle("hidden"));
  });

  /* ═ Chat refs ═ */
  const panel   = document.getElementById("chat-panel");
  const title   = panel.querySelector(".chat-title");
  const msgs    = document.getElementById("chat-messages");
  const form    = document.getElementById("chat-form");
  const input   = document.getElementById("chat-input");

  /* ═ Abrir chat ciudad ═ */
  document.querySelectorAll(".city").forEach(btn=>{
    btn.classList.add("city-btn");               // por si no la tenías
    btn.addEventListener("click",()=>{
      title.textContent = "Chat – " + btn.dataset.city;
      msgs.innerHTML = "";                       // aquí iría Firebase
      form.classList.remove("hidden");           // muestra caja de texto
      input.focus();
    });
  });

  /* ═ Enviar mensaje local ═ */
  form.addEventListener("submit",e=>{
    e.preventDefault();
    const txt = input.value.trim(); if(!txt) return;
    msgs.insertAdjacentHTML("beforeend",
      `<div class="message">${txt}</div>`);
    input.value="";
    msgs.scrollTop = msgs.scrollHeight;
  });

  /* ═ Botón flotante / formulario ═ */
  const addBtn   = document.getElementById("suggest-city-btn");
  const formBox  = document.getElementById("suggest-form-container");
  const confBox  = document.getElementById("confirmation-message");
  const sugForm  = document.getElementById("suggest-form");

  addBtn.addEventListener("click",()=>formBox.classList.toggle("hidden"));
  document.getElementById("close-suggest-form")
          .addEventListener("click",()=>formBox.classList.add("hidden"));
  document.getElementById("close-confirmation")
          .addEventListener("click",()=>confBox.classList.add("hidden"));

  /* Añadir nueva ciudad */
  sugForm.addEventListener("submit",e=>{
    e.preventDefault();
    const cont   = document.getElementById("continent-select").value;
    const city   = document.getElementById("city-name").value.trim();
    const country= document.getElementById("country-name").value.trim();
    const reason = document.getElementById("reason").value.trim();
    if(!cont||!city||!country||!reason){alert("Completa los campos");return;}

    const ul = document.querySelector(`.city-list[data-continent='${cont}']`);
    if(!ul){alert("Continente no encontrado");return;}

    const li = document.createElement("li");
    li.innerHTML = `<button class="city city-btn"
                     data-city="${city} (${country})">
                     ${city} (${country})</button>`;
    ul.appendChild(li);

    /* reutilizamos el mismo listener para el nuevo botón */
    li.querySelector("button").addEventListener("click",()=>{
      title.textContent = "Chat – " + city + " ("+country+")";
      msgs.innerHTML="";
      form.classList.remove("hidden");
      input.focus();
    });

    sugForm.reset();
    formBox.classList.add("hidden");
    confBox.classList.remove("hidden");
  });
});
