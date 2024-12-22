// Manejo de publicación de contenido
document.getElementById("create-post-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const postContent = document.getElementById("new-post-content").value.trim();
  const postMedia = document.getElementById("post-media").files[0];
  const postContainer = document.getElementById("post-container");

  if (postContent || postMedia) {
    const newPost = document.createElement("div");
    newPost.classList.add("post");

    // Crear encabezado
    const postHeader = document.createElement("div");
    postHeader.classList.add("post-header");
    postHeader.innerHTML = `<h3>Usuario</h3><span>Hace un momento</span>`;

    // Crear cuerpo de la publicación
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
      if (postMedia.type.startsWith("video")) mediaElement.controls = true; // Control para videos
      postBody.appendChild(mediaElement);
    }

    // Crear interacciones
    const postInteractions = document.createElement("div");
    postInteractions.classList.add("post-interactions");
    postInteractions.innerHTML = `
      <button class="like-button">👍 Me gusta <span class="like-count">0</span></button>
      <button class="comment-button">💬 Comentar</button>
    `;

    // Crear sección de comentarios
    const postComments = document.createElement("div");
    postComments.classList.add("post-comments");

    // Crear formulario de comentarios
    const commentForm = document.createElement("form");
    commentForm.classList.add("comment-form");
    commentForm.innerHTML = `
      <input type="text" placeholder="Escribe un comentario..." required>
      <button type="submit">Enviar</button>
    `;

   
