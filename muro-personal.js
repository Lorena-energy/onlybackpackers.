// JavaScript - Muro Personal

/************************************************************
 * Menú responsive
 ************************************************************/
const toggleBtn = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

toggleBtn?.addEventListener("click", () => {
  menu.classList.toggle("active");
});

/************************************************************
 * Foto de portada
 ************************************************************/
const coverUpload = document.getElementById("cover-upload");
const coverImage = document.getElementById("cover-image");

coverUpload?.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      coverImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    alert("No se pudo cargar la imagen de portada.");
  }
});

/************************************************************
 * Foto de perfil
 ************************************************************/
const profileUpload = document.getElementById("profile-upload");
const profilePic = document.getElementById("profile-pic");
const profileIcon = document.getElementById("profile-icon");

profileUpload?.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      // Cambiar la foto de perfil
      profilePic.src = e.target.result;

      // Actualizar TODAS las miniaturas de publicaciones anteriores
      const thumbnails = document.querySelectorAll(".profile-thumbnail");
      thumbnails.forEach((thumb) => {
        thumb.src = e.target.result;
      });
    };
    reader.readAsDataURL(file);
  } else {
    alert("No se pudo cargar la foto de perfil.");
  }
});

profileIcon?.addEventListener("click", () => {
  profileUpload.click();
});

/************************************************************
 * Crear Publicaciones
 ************************************************************/
const postForm = document.getElementById("post-form");
const userPosts = document.getElementById("user-posts");
const userPoints = document.getElementById("user-points");

postForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const content = document.getElementById("post-content").value.trim();
  const mediaFiles = document.getElementById("post-media").files;
  const alsoCommunity = document.getElementById("post-community").checked;

  if (!content && mediaFiles.length === 0) {
    alert("Por favor, escribe algo o sube una imagen/video.");
    return;
  }

  // Crear una nueva publicación
  const post = document.createElement("div");
  post.classList.add("post");

  // Miniatura de la foto de perfil actual
  const profileThumbnail = `
    <img class="profile-thumbnail" 
         src="${profilePic?.src || "https://via.placeholder.com/150"}" 
         alt="Foto de perfil">
  `;

  // Contenido multimedia
  let mediaContent = "";
  Array.from(mediaFiles).forEach((file) => {
    const media = document.createElement(file.type.startsWith("video") ? "video" : "img");
    media.src = URL.createObjectURL(file);
    media.controls = file.type.startsWith("video");
    media.alt = "Media";
    media.classList.add("post-media");
    mediaContent += media.outerHTML;
  });

  // Estructura de la publicación
  post.innerHTML = `
    <div class="post-header">
      ${profileThumbnail}
      <div>
        <h3>Tú</h3>
        <span>Hace un momento</span>
      </div>
    </div>
    <div class="post-content">
      <p>${content}</p>
      <div class="media-container">${mediaContent}</div>
    </div>
    <div class="post-actions">
      <button class="like-button">👍 Me gusta <span>0</span></button>
      <button class="comment-button">💬 Comentar</button>
    </div>
    <div class="comments">
      <input type="text" class="comment-input" placeholder="Escribe un comentario...">
    </div>
  `;

  // Agregar la publicación a "Mi Muro"
  userPosts.prepend(post);

  // Si está marcado el checkbox, la copiamos al Muro-Comunidad
  if (alsoCommunity) {
    const communitySection = document.getElementById("community-posts");
    if (communitySection) {
      const clonePost = post.cloneNode(true);
      communitySection.prepend(clonePost);
    }
  }

  // Incrementar los puntos del usuario
  let points = parseInt(userPoints.textContent) || 0;
  points += 5;
  userPoints.textContent = points;

  // Limpiar el formulario
  postForm.reset();
});

/************************************************************
 * Funcionalidades de "Me gusta" y comentarios
 ************************************************************/
userPosts?.addEventListener("click", (event) => {
  // "Me gusta"
  if (event.target.classList.contains("like-button")) {
    const likeCount = event.target.querySelector("span");
    likeCount.textContent = parseInt(likeCount.textContent) + 1;
  }

  // Comentar
  if (event.target.classList.contains("comment-button")) {
    const post = event.target.closest(".post");
    const commentInput = post.querySelector(".comment-input");
    commentInput.focus();

    // Para no registrar infinitos "keypress",
    // se puede usar { once: true } o algo más complejo.
    commentInput.addEventListener("keypress", function handleEnter(e) {
      if (e.key === "Enter" && commentInput.value.trim() !== "") {
        const commentText = document.createElement("p");
        commentText.textContent = commentInput.value;
        commentInput.value = "";
        commentInput.parentNode.insertBefore(commentText, commentInput);

        // Solo disparar una vez
        commentInput.removeEventListener("keypress", handleEnter);
      }
    });
  }
});

/************************************************************
 * Copiar enlace de invitación
 ************************************************************/
const inviteCode = document.getElementById("invite-code");
const copyInviteLink = document.getElementById("copy-invite-link");

copyInviteLink?.addEventListener("click", () => {
  const link = `https://lorena-energy.github.io/onlybackpackers./login-register.html?invite=${inviteCode.textContent}`;
  navigator.clipboard
    .writeText(link)
    .then(() => {
      alert("¡Enlace de invitación copiado!");
    })
    .catch(() => {
      alert("No se pudo copiar el enlace de invitación.");
    });
});

/************************************************************
 * Guardar y cargar detalles del usuario en localStorage
 ************************************************************/
document
  .querySelectorAll(".user-details input, .user-details textarea")
  .forEach((el) => {
    // Al cambiar un campo, lo guardamos
    el.addEventListener("change", () => {
      localStorage.setItem(el.id, el.value);
    });

    // Al cargar la página, restauramos los valores si existen
    const savedValue = localStorage.getItem(el.id);
    if (savedValue) {
      el.value = savedValue;
    }
  });

/************************************************************
 * Botón para limpiar detalles del usuario
 ************************************************************/
const resetDetailsButton = document.createElement("button");
resetDetailsButton.textContent = "Resetear Detalles";
resetDetailsButton.classList.add("cta-button");
resetDetailsButton.style.marginTop = "10px";
resetDetailsButton.addEventListener("click", () => {
  document
    .querySelectorAll(".user-details input, .user-details textarea")
    .forEach((input) => {
      input.value = "";
      localStorage.removeItem(input.id);
    });
  alert("Detalles del usuario reseteados.");
});
document.querySelector(".user-details")?.appendChild(resetDetailsButton);

/************************************************************
 * Botón flotante para mostrar/ocultar el panel de usuario
 ************************************************************/
const userDetailsToggle = document.querySelector(".user-details-toggle");
const userDetailsPanel = document.querySelector(".user-details");

userDetailsToggle?.addEventListener("click", () => {
  userDetailsPanel?.classList.toggle("open");
});

/************************************************************
 * Mostrar nombre de usuario en el botón flotante (opcional)
 ************************************************************/
// Imaginemos que guardas el nombre del usuario en localStorage con key "username"
const savedName = localStorage.getItem("username");
if (savedName) {
  const userDetailsBtnText = document.getElementById("user-details-btn-text");
  if (userDetailsBtnText) {
    userDetailsBtnText.textContent = savedName;
  }
}
