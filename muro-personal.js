document.addEventListener("DOMContentLoaded", () => {
  // 📱 MENÚ HAMBURGUESA
  const toggleBtn = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  toggleBtn?.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  // 🌄 CAMBIO DE PORTADA
  const coverUpload = document.getElementById("cover-upload");
  const coverImage = document.getElementById("cover-image");
  coverUpload?.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => (coverImage.src = ev.target.result);
      reader.readAsDataURL(file);
    }
  });

  // 👤 CAMBIO DE FOTO DE PERFIL
  const profileUpload = document.getElementById("profile-upload");
  const profilePic = document.getElementById("profile-pic");
  profileUpload?.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        profilePic.src = ev.target.result;
        document.querySelectorAll(".profile-thumbnail").forEach((thumb) => {
          thumb.src = ev.target.result;
        });
      };
      reader.readAsDataURL(file);
    }
  });

  // 📝 CREAR PUBLICACIONES
  const postForm = document.getElementById("post-form");
  const userPosts = document.getElementById("user-posts");
  const userPoints = document.getElementById("user-points");

  postForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = document.getElementById("post-content").value.trim();
    const mediaFiles = document.getElementById("post-media").files;
    const alsoCommunity = document.getElementById("post-community").checked;

    if (!content && mediaFiles.length === 0) return;

    const post = document.createElement("div");
    post.classList.add("post");

    const thumbnailSrc = profilePic?.src || "https://via.placeholder.com/150";

    let mediaContent = "";
    Array.from(mediaFiles).forEach((file) => {
      const media = document.createElement(file.type.startsWith("video") ? "video" : "img");
      media.src = URL.createObjectURL(file);
      if (file.type.startsWith("video")) media.controls = true;
      media.alt = "Media";
      media.classList.add("post-media");
      mediaContent += media.outerHTML;
    });

    post.innerHTML = `
      <div class="post-header">
        <img class="profile-thumbnail" src="${thumbnailSrc}" alt="Foto de perfil" />
        <div>
          <h3>Tú</h3>
          <span>Hace un momento</span>
        </div>
      </div>
      <div class="post-content">
        <p>${content}</p>
        <div class="media-container">${mediaContent}</div>
      </div>
      <div class="post-actions">
        <button class="like-button">Me gusta <span>0</span></button>
        <button class="comment-button">Comentar</button>
        <button class="emoji-toggle" type="button">😀</button>
      </div>
      <div class="emoji-panel" style="display:none;">
        <span>😀</span><span>😁</span><span>🤣</span><span>❤️</span><span>🥰</span>
      </div>
      <div class="comments">
        <input type="text" class="comment-input" placeholder="Escribe un comentario..." />
      </div>
    `;
    userPosts.prepend(post);

    let points = parseInt(userPoints.textContent) || 0;
    points += 5;
    userPoints.textContent = points;

    postForm.reset();
  });

  // ❤️ Me gusta y comentarios + emojis
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("like-button")) {
      const span = e.target.querySelector("span");
      span.textContent = parseInt(span.textContent) + 1;
    }

    if (e.target.classList.contains("comment-button")) {
      const post = e.target.closest(".post");
      post.querySelector(".comment-input").focus();
    }

    if (e.target.classList.contains("emoji-toggle")) {
      const panel = e.target.closest(".post").querySelector(".emoji-panel");
      panel.style.display = panel.style.display === "none" ? "flex" : "none";
    }

    if (e.target.closest(".emoji-panel") && e.target.tagName === "SPAN") {
      const post = e.target.closest(".post");
      const commentInput = post.querySelector(".comment-input");
      commentInput.value += e.target.textContent;
    }
  });

  // 😀 Emojis en publicación
  const emojiTogglePost = document.querySelector(".emoji-toggle-post");
  const emojiPanelPost = document.querySelector(".emoji-panel-post");
  emojiTogglePost?.addEventListener("click", () => {
    emojiPanelPost.style.display = emojiPanelPost.style.display === "none" ? "flex" : "none";
  });
  emojiPanelPost?.addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN") {
      document.getElementById("post-content").value += e.target.textContent;
    }
  });

  // 📎 Detalles del usuario
  const inviteCode = document.getElementById("invite-code");
  const copyInviteLink = document.getElementById("copy-invite-link");
  copyInviteLink?.addEventListener("click", () => {
    const link = `https://lorena-energy.github.io/onlybackpackers./login-register.html?invite=${inviteCode.textContent}`;
    navigator.clipboard
      .writeText(link)
      .then(() => alert("¡Enlace de invitación copiado!"))
      .catch(() => alert("No se pudo copiar."));
  });

  document
    .querySelectorAll(".user-details input, .user-details textarea")
    .forEach((el) => {
      el.addEventListener("change", () => localStorage.setItem(el.id, el.value));
      const saved = localStorage.getItem(el.id);
      if (saved) el.value = saved;
    });

  const resetBtn = document.createElement("button");
  resetBtn.textContent = "Resetear Detalles";
  resetBtn.classList.add("cta-button");
  resetBtn.style.marginTop = "10px";
  resetBtn.addEventListener("click", () => {
    document
      .querySelectorAll(".user-details input, .user-details textarea")
      .forEach((el) => {
        el.value = "";
        localStorage.removeItem(el.id);
      });
    alert("Detalles reseteados.");
  });
  document.querySelector(".user-details")?.appendChild(resetBtn);

  // 👤 Toggle detalles usuario
  document.querySelector(".user-details-toggle")?.addEventListener("click", () => {
    document.querySelector(".user-details")?.classList.toggle("open");
  });

  // Mostrar nombre si está guardado
  const savedName = localStorage.getItem("username");
  if (savedName) {
    const userDetailsBtnText = document.getElementById("user-details-btn-text");
    if (userDetailsBtnText) userDetailsBtnText.textContent = savedName;
  }

  // Ampliar fotos (perfil, portada, post)
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-image");
  const closeModal = document.getElementById("close-modal");
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("post-media") || e.target.id === "cover-image" || e.target.id === "profile-pic") {
      modalImg.src = e.target.src;
      modal.style.display = "flex";
    }
  });
  closeModal?.addEventListener("click", () => (modal.style.display = "none"));
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
});
