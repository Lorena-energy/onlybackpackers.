document.getElementById("post-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const postContent = document.getElementById("post-content").value;
  const postMedia = document.getElementById("post-media").files;
  const postList = document.getElementById("post-list");

  // Crear una nueva publicación
  const newPost = document.createElement("div");
  newPost.classList.add("post");

  // Encabezado
  const header = document.createElement("div");
  header.classList.add("post-header");
  header.innerHTML = `<h3>Tú</h3><span>Ahora</span>`;

  // Contenido
  const content = document.createElement("div");
  content.classList.add("post-content");
  content.innerHTML = `<p>${postContent}</p>`;

  // Adjuntar imágenes o videos
  if (postMedia.length > 0) {
    const mediaContainer = document.createElement("div");
    for (let i = 0; i < postMedia.length; i++) {
      const media = document.createElement("img");
      media.src = URL.createObjectURL(postMedia[i]);
      media.classList.add("post-media");
      mediaContainer.appendChild(media);
    }
    content.appendChild(mediaContainer);
  }

  // Acciones
  const actions = document.createElement("div");
  actions.classList.add("post-actions");
  actions.innerHTML = `
    <button class="like-button">👍 Me gusta <span>0</span></button>
    <button class="comment-button">💬 Comentar</button>
  `;

  // Añadir al contenedor de publicaciones
  newPost.appendChild(header);
  newPost.appendChild(content);
  newPost.appendChild(actions);
  postList.prepend(newPost);

  // Limpiar formulario
  document.getElementById("post-form").reset();
});
