document.addEventListener("DOMContentLoaded", () => {
  const userPoints = document.getElementById("user-points");
  const inviteCode = document.getElementById("invite-code");
  const inviteLinkButton = document.getElementById("invite-link");
  const postForm = document.getElementById("post-form");
  const userPostsContainer = document.getElementById("user-posts");
  const profileUpload = document.getElementById("profile-upload");
  const profilePic = document.getElementById("profile-pic");
  const coverUpload = document.getElementById("cover-upload");

  let points = 120;

  // Generar enlace de invitación
  inviteLinkButton.addEventListener("click", () => {
    const link = `${window.location.origin}/register.html?invite=${inviteCode.textContent}`;
    navigator.clipboard.writeText(link).then(() => {
      alert("¡Enlace de invitación copiado!");
    });
  });

  // Subir foto de perfil
  profileUpload.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      profilePic.src = URL.createObjectURL(file);
    }
  });

  // Subir foto de portada
  coverUpload.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      document.querySelector(".cover-photo").style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    }
  });

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
    userPoints.textContent = (points += 1);
    postForm.reset();
  });
});
