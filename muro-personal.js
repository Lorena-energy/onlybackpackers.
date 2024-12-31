document.addEventListener("DOMContentLoaded", () => {
  const userPoints = document.getElementById("user-points");
  const postForm = document.getElementById("post-form");
  const userPostsContainer = document.getElementById("user-posts");

  let points = 120;

  // Función para agregar puntos
  const addPoints = (amount) => {
    points += amount;
    userPoints.textContent = points;
  };

  // Función para agregar una publicación
  postForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = document.getElementById("post-content").value;
    const mediaFiles = document.getElementById("post-media").files;

    const post = document.createElement("div");
    post.classList.add("post");

    const mediaContainer = document.createElement("div");
    if (mediaFiles.length > 0) {
      Array.from(mediaFiles).forEach((file) => {
        const media = document.createElement("img");
        media.src = URL.createObjectURL(file);
        mediaContainer.appendChild(media);
      });
    }

    post.innerHTML = `
      <div class="post-header">
        <h3>Tú</h3>
        <span>Ahora</span>
      </div>
      <div class="post-content">
        <p>${content}</p>
      </div>
      <div class="post-actions">
        <button class="like-button">👍 Me gusta <span>0</span></button>
        <button class="comment-button">💬 Comentar</button>
      </div>
      <div class="comments"></div>
    `;
    post.querySelector(".post-content").appendChild(mediaContainer);
    userPostsContainer.prepend(post);

    addPoints(10); // Agregar puntos por publicar
    postForm.reset();
  });

  // Funcionalidad de Me gusta
  userPostsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("like-button")) {
      const likes = e.target.querySelector("span");
      likes.textContent = parseInt(likes.textContent) + 1;
      addPoints(5); // Agregar puntos por interacción
    }
  });
});
