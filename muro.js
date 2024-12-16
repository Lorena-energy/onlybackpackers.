// Manejo del formulario de publicación
document.getElementById("post-form").addEventListener("submit", (e) => {
  e.preventDefault();

  // Obtener contenido y archivo multimedia del formulario
  const content = document.getElementById("post-content").value;
  const mediaFile = document.getElementById("post-media").files[0];

  // Validar que haya contenido
  if (!content && !mediaFile) {
    alert("Por favor, escribe algo o sube una imagen/video.");
    return;
  }

  // Crear nueva publicación
  const post = document.createElement("div");
  post.classList.add("post");

  // Añadir contenido de texto
  const postContent = document.createElement("p");
  postContent.textContent = content;
  post.appendChild(postContent);

  // Añadir imagen o video si existe
  if (mediaFile) {
    const mediaElement = document.createElement(
      mediaFile.type.startsWith("image/") ? "img" : "video"
    );
    mediaElement.src = URL.createObjectURL(mediaFile);
    mediaElement.classList.add("post-media");
    if (mediaFile.type.startsWith("video/")) mediaElement.controls = true;
    post.appendChild(mediaElement);
  }

  // Añadir botones de interacción
  const interactions = document.createElement("div");
  interactions.classList.add("post-interactions");

  const likeButton = document.createElement("button");
  likeButton.textContent = "👍 Me gusta (0)";
  likeButton.addEventListener("click", () => {
    let likes = parseInt(likeButton.textContent.match(/\d+/)[0]) + 1;
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

  // Agregar la publicación al muro
  document.getElementById("post-list").prepend(post);

  // Limpiar formulario
  document.getElementById("post-form").reset();
});
