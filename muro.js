// Manejo de publicación de contenido
document.getElementById("create-post-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const postContent = document.getElementById("new-post-content").value.trim();
  const postMedia = document.getElementById("post-media").files[0];
  const postContainer = document.getElementById("post-container");

  if (postContent || postMedia) {
    const newPost = document.createElement("div");
    newPost.classList.add("post");

    // Encabezado
    const postHeader = document.createElement("div");
    postHeader.classList.add("post-header");
    postHeader.innerHTML = `<h3>Usuario</h3><span>Hace un momento</span>`;

    // Contenido
    const postBody = document.createElement("div");
    postBody.classList.add("post-content");

    if (postContent) {
      const postText = document.createElement("p");
      postText.textContent = postContent;
      postBody.appendChild(postText);
    }

    if (postMedia) {
      const mediaElement = document.createElement(postMedia.type.startsWith("image") ? "img" : "video");
      mediaElement.src = URL.createObjectURL(postMedia);
      mediaElement.classList.add("post-media");
      if (postMedia.type.startsWith("video")) mediaElement.controls = true;
      postBody.appendChild(mediaElement);
    }

    // Interacciones
    const postInteractions = document.createElement("div");
    postInteractions.classList.add("post-interactions");
    postInteractions.innerHTML = `
      <button class="like-button">👍 Me gusta <span class="like-count">0</span></button>
      <button class="comment-button">💬 Comentar</button>
    `;

    // Comentarios
    const postComments = document.createElement("div");
    postComments.classList.add("post-comments");

    // Formulario de comentarios
    const commentForm = document.createElement("form");
    commentForm.classList.add("comment-form");
    commentForm.innerHTML = `
      <input type="text" placeholder="Escribe un comentario..." required>
      <button type="submit">Enviar</button>
    `;

    commentForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const commentInput = e.target.querySelector("input");
      const commentText = commentInput.value.trim();

      if (commentText) {
        const newComment = document.createElement("div");
        newComment.classList.add("comment");
        newComment.innerHTML = `<strong>Tú:</strong> ${commentText}`;
        postComments.appendChild(newComment);
        commentInput.value = "";
      }
    });

    // Añadir al contenedor de la publicación
    newPost.appendChild(postHeader);
    newPost.appendChild(postBody);
    newPost.appendChild(postInteractions);
    newPost.appendChild(postComments);
    newPost.appendChild(commentForm);

    postContainer.prepend(newPost);

    // Limpiar formulario
    document.getElementById("new-post-content").value = "";
    document.getElementById("post-media").value = "";
  }
});

// Manejo de "Me gusta"
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("like-button")) {
    const likeCount = e.target.querySelector(".like-count");
    likeCount.textContent = parseInt(likeCount.textContent) + 1;
  }
});

// Manejo de selector de emojis
document.addEventListener("click", (e) => {
  if (e.target.id === "emoji-button") {
    const emojiPanel = document.getElementById("emoji-panel");
    emojiPanel.classList.toggle("hidden");
  }

  if (e.target.closest("#emoji-panel") && e.target.tagName === "SPAN") {
    const emoji = e.target.textContent.trim();
    const postContent = document.getElementById("new-post-content");
    postContent.value += emoji; // Añadir emoji al contenido
  }
});

