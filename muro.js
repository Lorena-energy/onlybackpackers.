// Manejo de la publicación
document.getElementById("create-post-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const postContent = document.getElementById("new-post-content").value.trim();
  const postMedia = document.getElementById("post-media").files[0];
  const postContainer = document.getElementById("post-container");

  if (postContent || postMedia) {
    const newPost = document.createElement("div");
    newPost.classList.add("post");

    // Añadir el contenido de la publicación
    const postHeader = document.createElement("div");
    postHeader.classList.add("post-header");
    postHeader.innerHTML = `<h3>Tu nombre</h3><span>Ahora</span>`;

    const postBody = document.createElement("div");
    postBody.classList.add("post-content");

    const postText = document.createElement("p");
    postText.textContent = postContent;
    postBody.appendChild(postText);

    if (postMedia) {
      const mediaElement = document.createElement(postMedia.type.startsWith("image") ? "img" : "video");
      mediaElement.src = URL.createObjectURL(postMedia);
      mediaElement.classList.add("post-media");
      mediaElement.controls = true; // Habilita controles si es video
      postBody.appendChild(mediaElement);
    }

    const postInteractions = document.createElement("div");
    postInteractions.classList.add("post-interactions");
    postInteractions.innerHTML = `<button class="like-button">👍 Me gusta</button><button class="comment-button">💬 Comentar</button>`;

    newPost.appendChild(postHeader);
    newPost.appendChild(postBody);
    newPost.appendChild(postInteractions);

    postContainer.prepend(newPost);

    // Limpiar el formulario
    document.getElementById("new-post-content").value = "";
    document.getElementById("post-media").value = "";
  }
});
