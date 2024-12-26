document.addEventListener("DOMContentLoaded", () => {
  const userPoints = document.getElementById("user-points");

  // Simulación de puntos acumulados
  let points = 120;

  // Incrementar puntos por interacción (ejemplo)
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("like-button")) {
      points += 10;
      userPoints.textContent = points;
    }
  });

  // Publicaciones dinámicas (puedes añadir lógica de API aquí)
  const userPosts = [
    {
      user: "Tú",
      time: "Hace 1 día",
      content: "¡Viajando por Asia! 🌏",
      media: "https://via.placeholder.com/300",
      likes: 20,
      comments: [
        { user: "Ana", text: "¡Qué envidia! 😍" }
      ]
    }
  ];

  const postsContainer = document.getElementById("user-posts");

  userPosts.forEach((post) => {
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
        ${post.comments
          .map((comment) => `<p><strong>${comment.user}:</strong> ${comment.text}</p>`)
          .join("")}
      </div>
    `;
    postsContainer.appendChild(postElement);
  });
});
