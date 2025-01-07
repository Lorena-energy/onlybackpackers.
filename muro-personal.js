document.addEventListener("DOMContentLoaded", () => {
  const coverUpload = document.getElementById("cover-upload");
  const coverImage = document.getElementById("cover-image");
  const profileUpload = document.getElementById("profile-upload");
  const profilePic = document.getElementById("profile-pic");
  const userPoints = document.getElementById("user-points");
  const postForm = document.getElementById("post-form");
  const userPosts = document.getElementById("user-posts");

  let points = 120;

  // Cambiar foto de portada
  coverUpload.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      coverImage.src = URL.createObjectURL(file);
    }
  });

  // Cambiar foto de perfil desde el círculo
  profileUpload.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      profilePic.src = URL.createObjectURL(file);
    }
  });

  // Ampliar y reducir tamaño de foto de perfil
  profilePic.addEventListener("click", () => {
    profilePic.classList.toggle("enlarged");
  });

  // Crear publicaciones
  postForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = document.getElementById("post-content").value;
    const mediaFiles = document.getElementById("post-media").files;

    const post = document.createElement("div");
    post.classList.add("post");

    let mediaContent = "";
    Array.from(mediaFiles).forEach((file) => {
      mediaContent += `<img src="${URL.createObjectURL(file)}" alt="Media" class="post-media">`;
    });

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

    userPosts.prepend(post);
    points += 5;
    userPoints.textContent = points;
    postForm.reset();
  });

  // "Me gusta" y comentarios
  userPosts.addEventListener("click", (e) => {
    if (e.target.classList.contains("like-button")) {
      const likeCount = e.target.querySelector("span");
      likeCount.textContent = parseInt(likeCount.textContent) + 1;
    }

    if (e.target.classList.contains("comment-button")) {
      const commentInput = e.target.closest(".post").querySelector(".comment-input");
      commentInput.focus();

      commentInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter" && commentInput.value.trim() !== "") {
          const comment = document.createElement("p");
          comment.textContent = commentInput.value;
          e.target.closest(".comments").appendChild(comment);
          commentInput.value = "";
        }
      });
    }
  });

  // Responsive menú hamburguesa
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  menu.addEventListener("click", () => {
    menu.classList.remove("active");
  });
});
