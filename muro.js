// Variables globales
const postsContainer = document.getElementById("posts-container");
const postForm = document.getElementById("create-post-form");
const emojiPanel = document.getElementById("emoji-panel");
const emojiButton = document.getElementById("emoji-button");

// Mostrar/Ocultar panel de emojis
emojiButton.addEventListener("click", () => {
  emojiPanel.classList.toggle("hidden");
});

// Insertar emoji en el campo de texto
emojiPanel.addEventListener("click", (e) => {
  if (e.target.tagName === "SPAN") {
    const emoji = e.target.textContent;
    document.getElementById("post-content").value += emoji;
  }
});

// Crear nueva publicación
postForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const postContent = document.getElementById("post-content").value.trim();
  const postMedia = document.getElementById("post-media").files;

  if (postContent || postMedia.length > 0) {
    const post = document.createElement("div");
    post.classList.add("post");

    // Crear contenido de la publicación
    const postText = document.createElement("p");
    postText.textContent = postContent;

    const mediaContainer = document.createElement("div");
    mediaContainer.classList.add("media-container");

    Array.from(postMedia).forEach((file) => {
      const media = document.createElement(file.type.startsWith("image") ? "img" : "video");
      media.src = URL.createObjectURL(file);
      media.classList.add("post-media");
      if (file.type.startsWith("video")) media.controls = true;
      mediaContainer.appendChild(media);

      // Expandir imagen/video al hacer clic
      media.addEventListener("click", () => {
        media.classList.toggle("expanded");
      });
    });

    // Interacciones
    const interactions = document.createElement("div");
    interactions.classList.add("post-interactions");
    interactions.innerHTML = `
      <button class="like-button">👍 Me gusta <span class="like-count">0</span></button>
      <button class="comment-button">💬 Comentar</button>
    `;

    // Comentarios
    const commentSection = document.createElement("div");
    commentSection.classList.add("comment-section");

    const commentForm = document.createElement("form");
    commentForm.classList.add("comment-form");
    commentForm.innerHTML = `
      <input type="text" placeholder="Escribe un comentario..." required>
      <button type="submit">Enviar</button>
    `;

    commentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const commentInput = commentForm.querySelector("input");
      const commentText = commentInput.value.trim();

      if (commentText) {
        const comment = document.createElement("div");
        comment.classList.add("comment");
        comment.innerHTML = `<strong>Tú:</strong> ${commentText}`;
        commentSection.appendChild(comment);
        commentInput.value = "";
      }
    });

    // Añadir todo al contenedor
    post.appendChild(postText);
    post.appendChild(mediaContainer);
    post.appendChild(interactions);
    post.appendChild(commentSection);
    post.appendChild(commentForm);

    postsContainer.prepend(post);

    // Limpiar formulario
    postForm.reset();
  }
});

// Manejo de "Me gusta"
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("like-button")) {
    const likeCount = e.target.querySelector(".like-count");
    likeCount.textContent = parseInt(likeCount.textContent) + 1;
  }
});



