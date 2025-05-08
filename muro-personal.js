document.addEventListener("DOMContentLoaded", () => {
  /************************************************************
   * MENÚ HAMBURGUESA
   ************************************************************/
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  /************************************************************
   * CAMBIAR FOTO DE PORTADA
   ************************************************************/
  const coverUpload = document.getElementById("cover-upload");
  const coverImage = document.getElementById("cover-image");

  coverUpload?.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        coverImage.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  /************************************************************
   * CAMBIAR FOTO DE PERFIL
   ************************************************************/
  const profileUpload = document.getElementById("profile-upload");
  const profilePic = document.getElementById("profile-pic");

  profileUpload?.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        profilePic.src = e.target.result;
        document.querySelectorAll(".profile-thumbnail").forEach((thumb) => {
          thumb.src = e.target.result;
        });
      };
      reader.readAsDataURL(file);
    }
  });

  /************************************************************
   * GUARDAR DETALLES EN LOCALSTORAGE
   ************************************************************/
  document
    .querySelectorAll(".user-details input, .user-details textarea")
    .forEach((el) => {
      el.addEventListener("input", () => {
        localStorage.setItem(el.id, el.value);
      });
      const saved = localStorage.getItem(el.id);
      if (saved) el.value = saved;
    });

  /************************************************************
   * PANEL DE DETALLES DE USUARIO
   ************************************************************/
  const userDetailsPanel = document.querySelector(".user-details");
  const userDetailsToggle = document.querySelector(".user-details-toggle");
  userDetailsToggle?.addEventListener("click", () => {
    userDetailsPanel.classList.toggle("open");
  });

  /************************************************************
   * PUBLICAR POST
   ************************************************************/
  const postForm = document.getElementById("post-form");
  const userPosts = document.getElementById("user-posts");
  const userPoints = document.getElementById("user-points");

  postForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = document.getElementById("post-content").value.trim();
    const files = document.getElementById("post-media").files;
    const community = document.getElementById("post-community").checked;
    if (!content && files.length === 0) return;

    const post = document.createElement("div");
    post.classList.add("post");

    const profileSrc = profilePic?.src || "https://via.placeholder.com/150";

    let mediaHTML = "";
    Array.from(files).forEach((file) => {
      const el = document.createElement(file.type.startsWith("video") ? "video" : "img");
      el.src = URL.createObjectURL(file);
      if (file.type.startsWith("video")) el.controls = true;
      el.classList.add("post-media");
      mediaHTML += el.outerHTML;
    });

    post.innerHTML = `
      <div class="post-header">
        <img src="${profileSrc}" alt="perfil" class="profile-thumbnail"/>
        <div>
          <h3>Tú</h3>
          <span>Hace un momento</span>
        </div>
      </div>
      <div class="post-content">
        <p>${content}</p>
        ${mediaHTML}
      </div>
      <div class="post-actions">
        <button class="like-button">Me gusta <span>0</span></button>
        <button class="comment-button">Comentar</button>
        <button class="emoji-toggle" type="button">😀</button>
      </div>
      <div class="emoji-panel" style="display: none;">
        <span>😀</span><span>😁</span><span>🤣</span><span>❤️</span><span>🥰</span>
      </div>
      <div class="comments">
        <input type="text" class="comment-input" placeholder="Escribe un comentario..." />
      </div>
    `;

    userPosts.prepend(post);
    postForm.reset();

    let points = parseInt(userPoints.textContent) || 0;
    userPoints.textContent = points + 5;
  });

  /************************************************************
   * BOTONES INTERACTIVOS EN PUBLICACIONES
   ************************************************************/
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("like-button")) {
      const span = e.target.querySelector("span");
      span.textContent = parseInt(span.textContent) + 1;
    }

    if (e.target.classList.contains("comment-button")) {
      const input = e.target.closest(".post").querySelector(".comment-input");
      input.focus();
    }

    if (e.target.classList.contains("emoji-toggle")) {
      const panel = e.target.closest(".post").querySelector(".emoji-panel");
      panel.style.display = panel.style.display === "none" ? "flex" : "none";
    }

    if (e.target.closest(".emoji-panel") && e.target.tagName === "SPAN") {
      const emoji = e.target.textContent;
      const input = e.target.closest(".post").querySelector(".comment-input");
      input.value += emoji;
    }
  });

  /************************************************************
   * COPIAR INVITACIÓN
   ************************************************************/
  const copyInvite = document.getElementById("copy-invite-link");
  const inviteCode = document.getElementById("invite-code");
  copyInvite?.addEventListener("click", () => {
    const url = `https://lorena-energy.github.io/onlybackpackers./login-register.html?invite=${inviteCode.textContent}`;
    navigator.clipboard.writeText(url).then(() => {
      alert("¡Enlace de invitación copiado!");
    });
  });

  /************************************************************
   * MODAL PARA IMÁGENES AMPLIADAS
   ************************************************************/
  const imageModal = document.getElementById("image-modal");
  const modalImage = document.getElementById("modal-image");
  const closeModal = document.getElementById("close-modal");

  document.addEventListener("click", (e) => {
    if (
      (e.target.classList.contains("post-media") ||
      e.target.id === "cover-image" ||
      e.target.id === "profile-pic") &&
      e.target.tagName === "IMG"
    ) {
      modalImage.src = e.target.src;
      imageModal.style.display = "flex";
    }
  });

  closeModal?.addEventListener("click", () => {
    imageModal.style.display = "none";
  });

  imageModal?.addEventListener("click", (e) => {
    if (e.target === imageModal) {
      imageModal.style.display = "none";
    }
  });
});
