// JavaScript - Muro Personal

// Menú responsive
document.getElementById("menu-toggle")?.addEventListener("click", () => {
  const menu = document.getElementById("menu");
  if (menu) {
    menu.classList.toggle("active");
  } else {
    console.error("Menu element not found.");
  }
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
  } else {
    alert("No se pudo cargar la imagen de portada.");
  }
});

// Foto de perfil
const profileUpload = document.getElementById("profile-upload");
const profilePic = document.getElementById("profile-pic");
const profileIcon = document.getElementById("profile-icon");

profileUpload?.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      profilePic.src = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    alert("No se pudo cargar la foto de perfil.");
  }
});

profileIcon?.addEventListener("click", () => {
  profileUpload.click();
});

// Publicaciones con soporte para fotos y videos
document.getElementById("post-form")?.addEventListener("submit", (event) => {
  event.preventDefault();

  const content = document.getElementById("post-content").value;
  const mediaFiles = document.getElementById("post-media").files;
  const userPosts = document.getElementById("user-posts");
  const userPoints = document.getElementById("user-points");

  if (!content.trim() && mediaFiles.length === 0) {
    alert("Por favor, escribe algo o sube una imagen/video.");
    return;
  }

  // Publicaciones con soporte para fotos y videos
document.getElementById("post-form")?.addEventListener("submit", (event) => {
  event.preventDefault();

  const content = document.getElementById("post-content").value;
  const mediaFiles = document.getElementById("post-media").files;
  const userPosts = document.getElementById("user-posts");
  const userPoints = document.getElementById("user-points");

  if (!content.trim() && mediaFiles.length === 0) {
    alert("Por favor, escribe algo o sube una imagen/video.");
    return;
  }

  let points = parseInt(userPoints.textContent);

  // Crear una nueva publicación
  const post = document.createElement("div");
  post.classList.add("post");

  // Miniatura de la foto de perfil
  const profileThumbnail = `
    <img class="profile-thumbnail" src="${document.getElementById('profile-pic').src}" alt="Foto de perfil">
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

  // Construcción de la publicación
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

  userPosts.prepend(post);

  // Incrementar los puntos del usuario
  points += 5;
  userPoints.textContent = points;

  // Reiniciar el formulario
  document.getElementById("post-form").reset();
});

  let points = parseInt(userPoints.textContent);

  const post = document.createElement("div");
  post.classList.add("post");

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
      <h3>Tú</h3>
      <span>Hace un momento</span>
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

  userPosts.prepend(post);

  points += 5;
  userPoints.textContent = points;
  document.getElementById("post-form").reset();
});

// Botón para subir fotos/videos en publicaciones
document.getElementById("post-media-button")?.addEventListener("click", () => {
  document.getElementById("post-media").click();
});

// Funcionalidades de "Me gusta" y comentarios
document.getElementById("user-posts")?.addEventListener("click", (event) => {
  if (event.target.classList.contains("like-button")) {
    const likeCount = event.target.querySelector("span");
    likeCount.textContent = parseInt(likeCount.textContent) + 1;
  }

  if (event.target.classList.contains("comment-button")) {
    const commentInput = event.target.closest(".post").querySelector(".comment-input");
    commentInput.focus();

    commentInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && commentInput.value.trim() !== "") {
        const commentText = document.createElement("p");
        commentText.textContent = commentInput.value;
        commentInput.value = "";
        commentInput.parentNode.insertBefore(commentText, commentInput);
      }
    });
  }
});

// Código de invitación
const inviteCode = document.getElementById("invite-code");
document.getElementById("copy-invite-link")?.addEventListener("click", () => {
  const link = `https://lorena-energy.github.io/onlybackpackers./login-register.html?invite=${inviteCode.textContent}`;
  navigator.clipboard.writeText(link).then(() => {
    alert("¡Enlace de invitación copiado!");
  }).catch(() => {
    alert("No se pudo copiar el enlace de invitación.");
  });
});

// Guardar detalles del usuario
document.querySelectorAll(".user-details input").forEach((input) => {
  input.addEventListener("change", () => {
    localStorage.setItem(input.id, input.value);
  });

  const savedValue = localStorage.getItem(input.id);
  if (savedValue) {
    input.value = savedValue;
  }
});

// Botón para limpiar detalles del usuario
const resetDetailsButton = document.createElement("button");
resetDetailsButton.textContent = "Resetear Detalles";
resetDetailsButton.classList.add("cta-button");
resetDetailsButton.addEventListener("click", () => {
  document.querySelectorAll(".user-details input").forEach((input) => {
    input.value = "";
    localStorage.removeItem(input.id);
  });
  alert("Detalles del usuario reseteados.");
});
document.querySelector(".user-details")?.appendChild(resetDetailsButton);

const userDetailsToggle = document.querySelector('.user-details-toggle');
const userDetailsPanel = document.querySelector('.user-details');

if (userDetailsToggle && userDetailsPanel) {
  userDetailsToggle.addEventListener('click', () => {
    userDetailsPanel.classList.toggle('open');
  });
}

const userDetailsToggle = document.querySelector('.user-details-toggle');
const userDetailsPanel = document.querySelector('.user-details');

if (userDetailsToggle && userDetailsPanel) {
  userDetailsToggle.addEventListener('click', () => {
    userDetailsPanel.classList.toggle('open');
  });
}
