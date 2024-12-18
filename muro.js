// Manejo de la publicación
document.getElementById("create-post-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const postContent = document.getElementById("new-post-content").value.trim();
  const postMedia = document.getElementById("post-media").files[0];
  const postContainer = document.getElementById("post-container");

  if (postContent || postMedia) {
    const newPost = document.createElement("div");
    newPost.classList.add("post");

    // Encabezado de la publicación
    const postHeader = document.createElement("div");
    postHeader.classList.add("post-header");
    postHeader.innerHTML = `<h3>Tu nombre</h3><span>Ahora</span>`;

    // Contenido de la publicación
    const postBody = document.createElement("div");
    postBody.classList.add("post-content");

    const postText = document.createElement("p");
    postText.textContent = postContent;
    postBody.appendChild(postText);

    // Si hay un archivo multimedia, lo añadimos
    if (postMedia) {
      const mediaElement = document.createElement(postMedia.type.startsWith("image") ? "img" : "video");
      mediaElement.src = URL.createObjectURL(postMedia);
      mediaElement.classList.add("post-media");
      if (postMedia.type.startsWith("video")) {
        mediaElement.controls = true; // Activa controles para videos
      }
      postBody.appendChild(mediaElement);
    }

    // Interacciones (Me gusta y Comentar)
    const postInteractions = document.createElement("div");
    postInteractions.classList.add("post-interactions");
    postInteractions.innerHTML = `
      <button class="like-button">👍 Me gusta <span class="like-count">0</span></button>
      <button class="comment-button">💬 Comentar</button>
    `;

    // Sección de comentarios
    const postComments = document.createElement("div");
    postComments.classList.add("post-comments");

    // Formulario de comentarios
    const commentForm = document.createElement("form");
    commentForm.classList.add("comment-form");
    commentForm.innerHTML = `
      <input type="text" placeholder="Escribe un comentario..." required>
      <button type="submit">Enviar</button>
    `;

    // Añadir todo al nuevo post
    newPost.appendChild(postHeader);
    newPost.appendChild(postBody);
    newPost.appendChild(postInteractions);
    newPost.appendChild(postComments);
    newPost.appendChild(commentForm);

    postContainer.prepend(newPost);

    // Limpiar el formulario de publicación
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

// Manejo de comentarios
document.addEventListener("submit", (e) => {
  if (e.target.classList.contains("comment-form")) {
    e.preventDefault();

    const commentInput = e.target.querySelector("input");
    const commentText = commentInput.value.trim();
    const postComments = e.target.previousElementSibling;

    if (commentText) {
      // Crear un nuevo comentario
      const newComment = document.createElement("div");
      newComment.classList.add("comment");
      newComment.innerHTML = `<strong>Tú:</strong> ${commentText}`;
      postComments.appendChild(newComment);

      // Limpiar el campo de entrada
      commentInput.value = "";
    }
  }
});
