// Manejo del formulario de publicación
const postForm = document.getElementById("post-form");
const postList = document.getElementById("post-list");

postForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Obtener contenido de la publicación
  const content = document.getElementById("post-content").value;
  const media = document.getElementById("post-media").files[0];

  // Crear elemento de publicación
  const post = document.createElement("div");
  post.classList.add("post");

  // Contenido de texto
  const postContent = document.createElement("p");
  postContent.textContent = content;
  post.appendChild(postContent);

  // Contenido de medios (imagen/video)
  if (media) {
    const mediaElement = document.createElement(
      media.type.startsWith("image/") ? "img" : "video"
    );
    mediaElement.src = URL.createObjectURL(media);
    mediaElement.classList.add("post-media");
    if (media.type.startsWith("video/")) mediaElement.controls = true;
    post.appendChild(mediaElement);
  }

  // Interacciones: Me gusta y Comentarios
  const interactions = document.createElement("div");
  interactions.classList.add("post-interactions");

  const likeButton = document.createElement("button");
  likeButton.textContent = "👍 Me gusta (0)";
  likeButton.addEventListener("click", () => {
    const likes = parseInt(likeButton.textContent.match(/\d+/)[0], 10) + 1;
    likeButton.textContent = `👍 Me gusta (${likes})`;
  });

  const commentButton = document.createElement("button");
  commentButton.textContent = "💬 Comentar";
  commentButton.addEventListener("click", () => {
    const comment = prompt("Escribe tu comentario:");
    if (comment) {
      const commentElement = document.createElement("p");
      commentElement.textContent = `💬 ${comment}`;
      post.appendChild(commentElement);
    }
  });

  interactions.appendChild(likeButton);
  interactions.appendChild(commentButton);
  post.appendChild(interactions);

  // Añadir publicación al muro
  postList.prepend(post);

  // Limpiar formulario
  postForm.reset();
});
