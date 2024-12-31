document.addEventListener("DOMContentLoaded", () => {
  const userPoints = document.getElementById("user-points");
  const postForm = document.getElementById("post-form");
  const userPostsContainer = document.getElementById("user-posts");
  const imageModal = document.getElementById("image-modal");
  const modalImage = document.getElementById("modal-image");
  const closeModal = document.getElementById("close-modal");

  let points = 120;

  // Añadir puntos
  const addPoints = (amount) => {
    points += amount;
    userPoints.textContent = points;
  };

  // Crear publicaciones de ejemplo
  const examplePosts = [
    {
      user: "Laura",
      time: "Hace 1 hora",
      content: "¡Increíble viaje por Bali! 🌴",
      media: "https://via.placeholder.com/200",
      likes: 10,
      comments: [{ user: "Juan", text: "¡Qué maravilla!" }],
    },
    {
      user: "Carlos",
      time: "Hace 2 días",
      content: "Descubriendo Roma 🍕",
      media: "https://via.placeholder.com/200",
      likes: 15,
      comments: [{ user: "Ana", text: "¡Roma es lo mejor!" }],
    },
  ];

  // Renderizar publicaciones
  const renderPosts = () => {
    userPostsContainer.innerHTML = "";
    examplePosts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.classList.add("post");
      postElement.innerHTML = `
        <div class="post-header">
          <h3>${post.user}</h3>
          <span>${post.time}</span>
        </div>
        <div class="post-content">
          <p>${post.content}</p>
          <img src="${post.media}" alt="Media" class="post-media">
        </div>
        <div class="post-actions">
          <button class="like-button">👍 Me gusta <span>${post.likes}</span></button>
          <button class="comment-button">💬 Comentar</button>
        </div>
        <div class="comments">
          ${post.comments.map((c) => `<p><strong>${c.user}:</strong> ${c.text}</p>`).join("")}
        </div>
      `;
      userPostsContainer.appendChild(postElement);
    });
  };

  renderPosts();

  // Añadir nueva publicación
  postForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = document.getElementById("post-content").value;
    const mediaFiles = document.getElementById("post-media").files;

    const post = {
      user: "Tú",
      time: "Ahora",
      content,
      media: mediaFiles[0] ? URL.createObjectURL(mediaFiles[0]) : "",
      likes: 0,
      comments: [],
    };

    examplePosts.unshift(post);
    renderPosts();
    addPoints(10);
    postForm.reset();
  });

  // Ampliar imágenes
  userPostsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("post-media")) {
      modalImage.src = e.target.src;
      imageModal.classList.add("visible");
    }
  });

  closeModal.addEventListener("click", () => {
    imageModal.classList.remove("visible");
  });

  // Me gusta
  userPostsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("like-button")) {
      const likes = e.target.querySelector("span");
      likes.textContent = parseInt(likes.textContent) + 1;
      addPoints(5);
    }
  });
});
