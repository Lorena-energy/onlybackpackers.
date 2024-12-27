document.addEventListener("DOMContentLoaded", () => {
  const postForm = document.getElementById("post-form");
  const postList = document.getElementById("post-list");
  const emojiButton = document.getElementById("emoji-button");
  const emojiPanel = document.getElementById("emoji-panel");

  // Abrir/cerrar el panel de emojis
  emojiButton.addEventListener("click", () => {
    emojiPanel.classList.toggle("hidden");
  });

  // Insertar emoji en el contenido de la publicación
  emojiPanel.addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN") {
      const textarea = document.getElementById("post-content");
      textarea.value += e.target.textContent;
    }
  });

  // Crear una nueva publicación
  postForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const postContent = document.getElementById("post-content").value.trim();
    const postMedia = document.getElementById("post-media").files;

    if (!postContent && postMedia.length === 0) return;

    const newPost = document.createElement("div");
    newPost.classList.add("post");

    // Encabezado de la publicación
    const header = document.createElement("div");
    header.classList.add("post-header");
    header.innerHTML = `<h3>Tú</h3><span>Ahora</span>`;
    newPost.appendChild(header);

    // Contenido de la publicación
    const content = document.createElement("div");
    content.classList.add("post-content");
    content.innerHTML = `<p>${postContent}</p>`;

    // Añadir medios (imágenes/videos)
    if (postMedia.length > 0) {
      const mediaContainer = document.createElement("div");
      for (let i = 0; i < postMedia.length; i++) {
        const media = document.createElement(postMedia[i].type.startsWith("image") ? "img" : "video");
        media.src = URL.createObjectURL(postMedia[i]);
        media.controls = true;
        media.classList.add("post-media");
        mediaContainer.appendChild(media);
      }
      content.appendChild(mediaContainer);
    }
    newPost.appendChild(content);

    // Acciones de la publicación
    const actions = document.createElement("div");
    actions.classList.add("post-actions");
    actions.innerHTML = `
      <button class="like-button">👍 Me gusta <span>0</span></button>
      <button class="comment-button">💬 Comentar</button>
    `;
    newPost.appendChild(actions);

    // Contenedor de comentarios
    const commentSection = document.createElement("div");
    commentSection.classList.add("comment-section");
    commentSection.innerHTML = `
      <div class="comments"></div>
      <form class="comment-form">
        <input type="text" placeholder="Escribe un comentario..." required>
        <button type="submit">Enviar</button>
      </form>
    `;
    newPost.appendChild(commentSection);

    // Añadir al muro
    postList.prepend(newPost);
    postForm.reset();
  });

  // Manejar "Me gusta" y comentarios
  postList.addEventListener("click", (e) => {
    if (e.target.classList.contains("like-button")) {
      const likeCount = e.target.querySelector("span");
      likeCount.textContent = parseInt(likeCount.textContent) + 1;
    }
  });

  postList.addEventListener("submit", (e) => {
    if (e.target.classList.contains("comment-form")) {
      e.preventDefault();

      const commentInput = e.target.querySelector("input");
      const commentText = commentInput.value.trim();
      if (!commentText) return;

      const commentsContainer = e.target.previousElementSibling;
      const newComment = document.createElement("div");
      newComment.classList.add("comment");
      newComment.innerHTML = `<strong>Tú:</strong> ${commentText}`;
      commentsContainer.appendChild(newComment);

      commentInput.value = "";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const postForm = document.getElementById("post-form");
  const postList = document.getElementById("post-list");

  // Crear publicación
  postForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = document.getElementById("post-content").value.trim();
    if (content) {
      const post = document.createElement("div");
      post.className = "post";
      post.innerHTML = `
        <div class="post-header">
          <h3>Usuario</h3>
          <span>Justo ahora</span>
        </div>
        <div class="post-content">
          <p>${content}</p>
        </div>
      `;
      postList.prepend(post);
      postForm.reset();
    }
  });
});
