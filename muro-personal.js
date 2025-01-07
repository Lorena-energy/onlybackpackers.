// JavaScript - Muro Personal

// Menú responsive
document.getElementById("menu-toggle").addEventListener("click", () => {
  const menu = document.getElementById("menu");
  menu.classList.toggle("active");
});

// Foto de portada
const coverUpload = document.getElementById("cover-upload");
const coverImage = document.getElementById("cover-image");
coverUpload.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    coverImage.src = URL.createObjectURL(file);
  }
});

// Foto de perfil
const profileUpload = document.getElementById("profile-upload");
const profilePic = document.getElementById("profile-pic");
profileUpload.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    profilePic.src = URL.createObjectURL(file);
  }
});

profilePic.addEventListener("click", () => {
  if (profilePic.classList.contains("enlarged")) {
    profilePic.classList.remove("enlarged");
  } else {
    profilePic.classList.add("enlarged");
  }
});

// Código de invitación
const inviteCode = document.getElementById("invite-code");
const inviteLinkButton = document.getElementById("invite-link");
if (inviteLinkButton) {
  inviteLinkButton.addEventListener("click", () => {
    const link = `${window.location.origin}/register.html?invite=${inviteCode.textContent}`;
    navigator.clipboard.writeText(link).then(() => {
      alert("¡Enlace de invitación copiado!");
    });
  });
}

// Incrementar puntos al registrar un usuario nuevo
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const inviteParam = urlParams.get("invite");

  if (inviteParam) {
    // Simular la adición de puntos (en un entorno real, esto sería manejado por el servidor)
    const userPoints = document.getElementById("user-points");
    let points = parseInt(userPoints.textContent) || 0;

    points += 100; // Sumar puntos por registro usando el código de invitación
    userPoints.textContent = points;

    // Notificar al usuario que los puntos han sido actualizados
    alert("¡Registro exitoso! Se han sumado 100 puntos.");
  }
});

// Publicaciones
document.getElementById("post-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const content = document.getElementById("post-content").value;
  const mediaFiles = document.getElementById("post-media").files;
  const userPosts = document.getElementById("user-posts");
  const userPoints = document.getElementById("user-points");

  let points = parseInt(userPoints.textContent);

  const post = document.createElement("div");
  post.classList.add("post");

  let mediaContent = "";
  Array.from(mediaFiles).forEach((file) => {
    const media = document.createElement("img");
    media.src = URL.createObjectURL(file);
    media.alt = "Media";
    mediaContent += media.outerHTML;
  });

  post.innerHTML = `
    <div class="post-header">
      <h3>Tú</h3>
      <span>Hace un momento</span>
    </div>
    <div class="post-content">
      <p>${content}</p>
      ${mediaContent}
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

// Función de "Me gusta" y comentarios
document.getElementById("user-posts").addEventListener("click", (event) => {
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
const inviteLinkButton = document.getElementById("invite-link");
if (inviteLinkButton) {
  inviteLinkButton.addEventListener("click", () => {
    const link = `${window.location.origin}/register.html?invite=${inviteCode.textContent}`;
    navigator.clipboard.writeText(link).then(() => {
      alert("¡Enlace de invitación copiado!");
    });
  });
}

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
