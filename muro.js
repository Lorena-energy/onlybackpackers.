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

  // Manejar la creación de publicaciones
  postForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const postContent = document.getElementById("post-content").value.trim();
    const postMedia = document.getElementById("post-media").files;

    if (!postContent && postMedia.length === 0) return;

    // Crear la publicación
    const newPost = document.createElement("div");
    newPost.classList.add("post");

    // Encabezado
    const postHeader = document.createElement("div");
    postHeader.classList.add("post-header");
    postHeader.innerHTML = `<h3>Usuario</h3><span>Hace un momento</span>`;
    newPost.appendChild(postHeader);

    // Contenido
    const postBody = document.createElement("div");
    postBody.classList.add("post-content");
    postBody.innerHTML = `<p>${postContent}</p>`;

    // Añadir medios (imágenes/videos)
    if (postMedia.length > 0) {
      const mediaContainer = document.createElement("div");
      Array.from(postMedia).forEach(file => {
        const media = document.createElement(file.type.startsWith("image") ? "img" : "video");
        media.src = URL.createObjectURL(file);
        media.classList.add("post-media");
        if (file.type.startsWith("video")) media.controls = true;
        mediaContainer.appendChild(media);
      });
      postBody.appendChild(mediaContainer);
    }
    newPost.appendChild(postBody);

    // Acciones
    const postActions = document.createElement("div");
    postActions.classList.add("post-actions");
    postActions.innerHTML = `
      <button class="like-button">👍 Me gusta <span>0</span></button>
      <button class="comment-button">💬 Comentar</button>
    `;
    newPost.appendChild(postActions);

    // Comentarios
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

    // Agregar publicación al muro
    postList.prepend(newPost);

    // Resetear formulario
    postForm.reset();
  });

  // Manejar interacciones (me gusta y comentarios)
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
      newComment.innerHTML = `<strong>Usuario:</strong> ${commentText}`;
      commentsContainer.appendChild(newComment);

      commentInput.value = "";
    }
  });
});
