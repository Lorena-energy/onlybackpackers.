// Menú responsive
const toggleBtn = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

toggleBtn?.addEventListener("click", () => {
  menu.classList.toggle("active");
});

// Foto de portada
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

// Foto de perfil
const profileUpload = document.getElementById("profile-upload");
const profilePic = document.getElementById("profile-pic");

profileUpload?.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      // Actualizamos la foto de perfil
      profilePic.src = e.target.result;

      // Actualizar miniaturas anteriores
      document.querySelectorAll(".profile-thumbnail").forEach((thumb) => {
        thumb.src = e.target.result;
      });
    };
    reader.readAsDataURL(file);
  }
});

// Crear Publicaciones
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
    <!-- Acciones y botón de emojis -->
    <div class="post-actions">
      <button class="like-button">Me gusta <span>0</span></button>
      <button class="comment-button">Comentar</button>
      <button class="emoji-toggle" type="button">😀</button>
    </div>
    <!-- Panel de emojis para comentarios -->
    <div class="emoji-panel" style="display:none;">
      <span>😀</span><span>😁</span><span>🤣</span><span>❤️</span><span>🥰</span>
    </div>
    <div class="comments">
      <input type="text" class="comment-input" placeholder="Escribe un comentario..."/>
    </div>
  `;

  // Insertar en tu muro personal
  userPosts.prepend(post);

  // Publicar en la comunidad si se marca la casilla
  if (alsoCommunity) {
    const communitySection = document.getElementById("community-posts");
    if (communitySection) {
      const clonePost = post.cloneNode(true);
      communitySection.prepend(clonePost);
    }
  }

  // Suma puntos
  let points = parseInt(userPoints.textContent) || 0;
  points += 5;
  userPoints.textContent = points;

  // Reset formulario
  postForm.reset();
});

// "Me gusta" y comentarios
document.addEventListener("click", (e) => {
  // Botón "Me gusta"
  if (e.target.classList.contains("like-button")) {
    const span = e.target.querySelector("span");
    span.textContent = parseInt(span.textContent) + 1;
  }

  // Botón "Comentar" => enfocar input
  if (e.target.classList.contains("comment-button")) {
    const post = e.target.closest(".post");
    if (!post) return;
    const commentInput = post.querySelector(".comment-input");
    commentInput?.focus();
  }

  // Botón "😀" (emoji-toggle) en cada publicación => mostrar panel .emoji-panel
  if (e.target.classList.contains("emoji-toggle")) {
    const post = e.target.closest(".post");
    if (!post) return;
    const emojiPanel = post.querySelector(".emoji-panel");
    if (emojiPanel.style.display === "none") {
      emojiPanel.style.display = "flex";
    } else {
      emojiPanel.style.display = "none";
    }
  }

  // Clic en un <span> dentro del .emoji-panel => insertar emoji en .comment-input
  if (e.target.closest(".emoji-panel") && e.target.tagName === "SPAN") {
    const emoji = e.target.textContent;
    const post = e.target.closest(".post");
    if (!post) return;
    const commentInput = post.querySelector(".comment-input");
    // Insertar el emoji al final
    commentInput.value += emoji;
    // Puedes cerrar el panel si lo prefieres:
    // e.target.closest(".emoji-panel").style.display = "none";
  }
});

// Copiar enlace de invitación
const inviteCode = document.getElementById("invite-code");
const copyInviteLink = document.getElementById("copy-invite-link");
copyInviteLink?.addEventListener("click", () => {
  const link = `https://lorena-energy.github.io/onlybackpackers./login-register.html?invite=${inviteCode.textContent}`;
  navigator.clipboard
    .writeText(link)
    .then(() => alert("¡Enlace copiado!"))
    .catch(() => alert("No se pudo copiar."));
});

// Guardar detalles del usuario (localStorage)
document
  .querySelectorAll(".user-details input, .user-details textarea")
  .forEach((el) => {
    el.addEventListener("change", () => {
      localStorage.setItem(el.id, el.value);
    });
    const savedValue = localStorage.getItem(el.id);
    if (savedValue) el.value = savedValue;
  });

// Añadir botón de reseteo de detalles (opcional)
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

// Toggle panel usuario
const userDetailsToggle = document.querySelector(".user-details-toggle");
userDetailsToggle?.addEventListener("click", () => {
  userDetailsPanel?.classList.toggle("open");
});

// Mostrar nombre guardado en el botón oval (si existe)
const savedName = localStorage.getItem("username");
if (savedName) {
  const userDetailsBtnText = document.getElementById("user-details-btn-text");
  userDetailsBtnText.textContent = savedName;
}
