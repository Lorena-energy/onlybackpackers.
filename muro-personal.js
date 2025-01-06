document.addEventListener("DOMContentLoaded", () => {
  const userPoints = document.getElementById("user-points");
  const inviteCode = document.getElementById("invite-code");
  const postForm = document.getElementById("post-form");
  const userPostsContainer = document.getElementById("user-posts");
  const profileUpload = document.getElementById("profile-upload");
  const profilePic = document.getElementById("profile-pic");
  const coverUpload = document.getElementById("cover-upload");
  const coverImage = document.getElementById("cover-image");

  let points = 120;

  // Generar enlace de invitación
  document.getElementById("add-friend").addEventListener("click", () => {
    const link = `${window.location.origin}/register.html?invite=${inviteCode.textContent}`;
    navigator.clipboard.writeText(link).then(() => {
      alert("¡Enlace de invitación copiado!");
    });
  });

  // Subir foto de perfil
  profileUpload.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      profilePic.src = URL.createObjectURL(file);
    }
  });

  // Subir foto de portada
  coverUpload.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      coverImage.src = URL.createObjectURL(file);
    }
  });

  // Crear publicaciones
  postForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = document.getElementById("post-content").value;
    const mediaFiles = document.getElementById("post-media").files;

    const post = document.createElement("div");
    post.classList.add("post");

    let mediaContent = "";
    for (let i = 0; i < mediaFiles.length; i++) {
      const mediaType = mediaFiles[i].type.startsWith("image") ? "img" : "video";
      mediaContent += `<${mediaType} src="${URL.createObjectURL(mediaFiles[i])}" controls></${mediaType}>`;
    }

    post.innerHTML = `
      <div class="post-header">
        <h3>Tú</h3>
        <span>Ahora</span>
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

    userPostsContainer.prepend(post);
    userPoints.textContent = ++points;
    postForm.reset();
  });

  // Función de "Me gusta" y comentarios
  userPostsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("like-button")) {
      const likeCount = e.target.querySelector("span");
      likeCount.textContent = parseInt(likeCount.textContent) + 1;
    }

    if (e.target.classList.contains("comment-button")) {
      const commentInput = e.target.closest(".post").querySelector(".comment-input");
      commentInput.focus();
    }
  });
});
