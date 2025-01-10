/************************************************************
 * MENÚ RESPONSIVE
 ************************************************************/
const toggleBtn = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

toggleBtn?.addEventListener("click", () => {
  menu.classList.toggle("active");
});

/************************************************************
 * FOTO DE PORTADA
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
  }
});

/************************************************************
 * FOTO DE PERFIL
 ************************************************************/
const profileUpload = document.getElementById("profile-upload");
const profilePic = document.getElementById("profile-pic");

profileUpload?.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      // Actualiza la foto de perfil
      profilePic.src = e.target.result;
      // Actualiza miniaturas de publicaciones anteriores
      document.querySelectorAll(".profile-thumbnail").forEach((thumb) => {
        thumb.src = e.target.result;
      });
    };
    reader.readAsDataURL(file);
  }
});

/************************************************************
 * CREAR PUBLICACIONES
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

  // Crear la publicación
  const post = document.createElement("div");
  post.classList.add("post");

  const thumbnailSrc = profilePic?.src || "https://via.placeholder.com/150";

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

  post.innerHTML = `
    <div class="post-header">
      <img class="profile-thumbnail" src="${thumbnailSrc}" alt="Foto de perfil"/>
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
      <button class="like-button">Me gusta <span>0</span></button>
      <button class="comment-button">Comentar</button>
      <!-- Botón de emojis para comentarios -->
      <button class="emoji-toggle" type="button">😀</button>
    </div>
    <!-- Panel de emojis para comentarios -->
    <div class="emoji-panel" style="display:none;">
      <span>😀</span><span>😁</span><span>🤣</span><span>❤️</span><span>🥰</span>
    </div>
    <div class="comments">
      <input type="text" class="comment-input" placeholder="Escribe un comentario..." />
    </div>
  `;

  // Añade la publicación a tu muro personal
  userPosts.prepend(post);

  // Publicar también en la comunidad (si lo deseas en otra página)
  if (alsoCommunity) {
    // Podrías guardar en localStorage o enviar al servidor.
    // Por ahora, lo omitimos, ya que dijiste que está en otra página.
    // Ejemplo:
    // localStorage.setItem("communityPost", post.innerHTML);
  }

  // Sumar puntos
  let points = parseInt(userPoints.textContent) || 0;
  points += 5;
  userPoints.textContent = points;

  // Resetear formulario
  postForm.reset();
});

/************************************************************
 * EMOJIS: PUBLICACIÓN Y COMENTARIOS
 ************************************************************/
// Panel de emojis en la publicación
const emojiTogglePost = document.querySelector(".emoji-toggle-post");
const emojiPanelPost = document.querySelector(".emoji-panel-post");

emojiTogglePost?.addEventListener("click", () => {
  emojiPanelPost.style.display =
    emojiPanelPost.style.display === "none" ? "flex" : "none";
});

emojiPanelPost?.addEventListener("click", (e) => {
  if (e.target.tagName === "SPAN") {
    const emoji = e.target.textContent;
    const postContent = document.getElementById("post-content");
    postContent.value += emoji;
  }
});

/************************************************************
 * "ME GUSTA" Y COMENTARIOS EN PUBLICACIONES
 ************************************************************/
document.addEventListener("click", (e) => {
  // Botón "Me gusta"
  if (e.target.classList.contains("like-button")) {
    const span = e.target.querySelector("span");
    span.textContent = parseInt(span.textContent) + 1;
  }

  // Botón "Comentar" => enfocar input
  if (e.target.classList.contains("comment-button")) {
    const post = e.target.closest(".post");
    const commentInput = post.querySelector(".comment-input");
    commentInput.focus();
  }

  // Botón "😀" en la post-actions => panel de emojis para comentarios
  if (e.target.classList.contains("emoji-toggle")) {
    const post = e.target.closest(".post");
    const emojiPanel = post.querySelector(".emoji-panel");
    emojiPanel.style.display = emojiPanel.style.display === "none" ? "flex" : "none";
  }

  // Insertar emoji en el input de comentarios
  if (e.target.closest(".emoji-panel") && e.target.tagName === "SPAN") {
    const emoji = e.target.textContent;
    const post = e.target.closest(".post");
    const commentInput = post.querySelector(".comment-input");
    commentInput.value += emoji;
  }
});

/************************************************************
 * COPIAR ENLACE DE INVITACIÓN
 ************************************************************/
const inviteCode = document.getElementById("invite-code");
const copyInviteLink = document.getElementById("copy-invite-link");

copyInviteLink?.addEventListener("click", () => {
  const link = `https://lorena-energy.github.io/onlybackpackers./login-register.html?invite=${inviteCode.textContent}`;
  navigator.clipboard
    .writeText(link)
    .then(() => alert("¡Enlace de invitación copiado!"))
    .catch(() => alert("No se pudo copiar."));
});

/************************************************************
 * GUARDAR DETALLES DE USUARIO (LOCALSTORAGE)
 ************************************************************/
document
  .querySelectorAll(".user-details input, .user-details textarea")
  .forEach((el) => {
    el.addEventListener("change", () => {
      localStorage.setItem(el.id, el.value);
    });
    const savedValue = localStorage.getItem(el.id);
    if (savedValue) el.value = savedValue;
  });

/************************************************************
 * BOTÓN RESET DE DETALLES (OPCIONAL)
 ************************************************************/
const userDetailsPanel = document.querySelector(".user-details");
const resetButton = document.createElement("button");
resetButton.textContent = "Resetear Detalles";
resetButton.classList.add("cta-button");
resetButton.style.marginTop = "10px";
resetButton.addEventListener("click", () => {
  document
    .querySelectorAll(".user-details input, .user-details textarea")
    .forEach((input) => {
      input.value = "";
      localStorage.removeItem(input.id);
    });
  alert("Detalles reseteados.");
});
userDetailsPanel?.appendChild(resetButton);

/************************************************************
 * PANEL DE USUARIO (TOGGLE)
 ************************************************************/
const userDetailsToggle = document.querySelector(".user-details-toggle");
userDetailsToggle?.addEventListener("click", () => {
  userDetailsPanel?.classList.toggle("open");
});

/************************************************************
 * MOSTRAR NOMBRE EN BOTÓN (SI LO GUARDAS EN LOCALSTORAGE)
 ************************************************************/
const savedName = localStorage.getItem("username");
if (savedName) {
  const userDetailsBtnText = document.getElementById("user-details-btn-text");
  userDetailsBtnText.textContent = savedName;
}

/************************************************************
 * MODAL PARA AMPLIAR FOTOS
 ************************************************************/
const imageModal = document.getElementById("image-modal");
const modalImage = document.getElementById("modal-image");
const closeModalBtn = document.getElementById("close-modal");

// Detectar clic en imágenes con clase .post-media
document.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("post-media") &&
    e.target.tagName === "IMG"
  ) {
    modalImage.src = e.target.src;
    imageModal.style.display = "flex";
  }
});

// Cerrar modal al hacer clic en la X
closeModalBtn.addEventListener("click", () => {
  imageModal.style.display = "none";
});

// Cerrar modal al hacer clic fuera de la imagen
imageModal.addEventListener("click", (event) => {
  if (event.target === imageModal) {
    imageModal.style.display = "none";
  }
});
