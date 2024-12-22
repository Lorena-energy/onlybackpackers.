document.addEventListener("DOMContentLoaded", () => {
  const postForm = document.getElementById("create-post-form");
  const postContent = document.getElementById("post-content");
  const postMedia = document.getElementById("post-media");
  const postsContainer = document.getElementById("posts-container");

  const emojiButton = document.getElementById("emoji-button");
  const emojiPanel = document.getElementById("emoji-panel");

  // Manejo del selector de emojis
  emojiButton.addEventListener("click", () => {
    emojiPanel.classList.toggle("hidden");
  });

  emojiPanel.addEventListener("click", (event) => {
    if (event.target.tagName === "SPAN") {
      postContent.value += event.target.textContent;
    }
  });

  // Publicar contenido
  postForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const content = postContent.value.trim();
    const files = postMedia.files;

    if (!content && files.length === 0) {
      alert("Por favor, escribe algo o sube un archivo.");
      return;
    }

    const post = document.createElement("div");
    post.classList.add("post");

    const postText = document.createElement("p");
    postText.textContent = content;

    post.appendChild(postText);

    if (files.length > 0) {
      const mediaContainer = document.createElement("div");
      mediaContainer.classList.add("post-media-container");

      Array.from(files).forEach((file) => {
        const mediaElement = file.type.startsWith("image")
          ? document.createElement("img")
          : document.createElement("video");

        mediaElement.src = URL.createObjectURL(file);
        mediaElement.classList.add("post-media");
        if (file.type.startsWith("video")) mediaElement.controls = true;

        mediaContainer.appendChild(mediaElement);
      });

      post.appendChild(mediaContainer);
    }

    const interactions = document.createElement("div");
    interactions.classList.add("post-interactions");
    interactions.innerHTML = `
      <button class="like-button">👍 Me gusta <span class="like-count">0</span></button>
      <button class="comment-button">💬 Comentar</button>
    `;

    const commentsContainer = document.createElement("div");
    commentsContainer.classList.add("comments-container");

    const commentForm = document.createElement("form");
    commentForm.classList.add("comment-form");
    commentForm.innerHTML = `
      <input type="text" placeholder="Escribe un comentario..." required>
      <button type="submit">Enviar</button>
    `;

    post.appendChild(interactions);
    post.appendChild(commentsContainer);
    post.appendChild(commentForm);

    postsContainer.prepend(post);

    postContent.value = "";
    postMedia.value = "";

    // Manejo de likes
    interactions.querySelector(".like-button").addEventListener("click", (e) => {
      const likeCount = e.target.querySelector(".like-count");
      likeCount.textContent = parseInt(likeCount.textContent) + 1;
    });

    // Manejo de comentarios
    commentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const commentInput = commentForm.querySelector("input");
      const commentText = commentInput.value.trim();
      if (commentText) {
        const comment = document.createElement("p");
        comment.classList.add("comment");
        comment.textContent = commentText;
        commentsContainer.appendChild(comment);
        commentInput.value = "";
      }
    });
  });
});
