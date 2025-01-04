document.addEventListener("DOMContentLoaded", () => {
  const userPoints = document.getElementById("user-points");
  const inviteCode = document.getElementById("invite-code");
  const inviteLinkButton = document.getElementById("invite-link");
  const postForm = document.getElementById("post-form");
  const userPostsContainer = document.getElementById("user-posts");

  let points = 120;

  // Generar enlace de invitación
  inviteLinkButton.addEventListener("click", () => {
    const link = `${window.location.origin}/register.html?invite=${inviteCode.textContent}`;
    navigator.clipboard.writeText(link).then(() => {
      alert("¡Enlace de invitación copiado!");
    });
  });

  // Agregar puntos
  const addPoints = (amount) => {
    points += amount;
    userPoints.textContent = points;
  };

  // Crear publicaciones
  postForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = document.getElementById("post-content").value;

    const post = document.createElement("div");
    post.classList.add("post");
    post.innerHTML = `
      <div class="post-header">
        <h3>Tú</h3>
        <span>Ahora</span>
      </div>
      <div class="post-content"><p>${content}</p></div>
    `;

    userPostsContainer.prepend(post);
    addPoints(10);
    postForm.reset();
  });
});
