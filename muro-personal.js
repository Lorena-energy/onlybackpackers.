/************************************************************
 * MENÚ RESPONSIVE
 ************************************************************/
const toggleBtn = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

toggleBtn?.addEventListener("click", () => {
  // Clase .show en el CSS
  menu.classList.toggle("show");
});

/************************************************************
 * FOTO DE PORTADA
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
 * FOTO DE PERFIL
 ************************************************************/
const profileUpload = document.getElementById("profile-upload");
const profilePic = document.getElementById("profile-pic");

profileUpload?.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      // Cambia la foto de perfil
      profilePic.src = e.target.result;
      // Actualiza miniaturas si las hubiera
      document.querySelectorAll(".profile-thumbnail").forEach((thumb) => {
        thumb.src = e.target.result;
      });
    };
    reader.readAsDataURL(file);
  }
});

/************************************************************
 * CREAR PUBLICACIONES
 ************************************************************/
const postForm = document.getElementById("post-form");
const userPosts = document.getElementById("user-posts");
const userPoints = document.getElementById("user-points");

postForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const content = document.getElementById("post-content")?.value.trim();
  const mediaFiles = document.getElementById("post-media")?.files;
  if (!content && (!mediaFiles || mediaFiles.length === 0)) {
    alert("Por favor, escribe algo o sube una imagen/video.");
    return;
  }

  const post = document.createElement("div");
  post.classList.add("post");

  const thumbSrc = profilePic?.src || "https://via.placeholder.com/150";
  let mediaContent = "";
  if (mediaFiles) {
    Array.from(mediaFiles).forEach((file) => {
      const media = document.createElement(file.type.startsWith("video") ? "video" : "img");
      media.src = URL.createObjectURL(file);
      media.controls = file.type.startsWith("video");
      media.alt = "Media";
      media.classList.add("post-media");
      mediaContent += media.outerHTML;
    });
  }

  post.innerHTML = `
    <div class="post-header">
      <img class="profile-thumbnail" src="${thumbSrc}" alt="Foto de perfil" />
      <div>
        <h3>Tú</h3>
        <span>Hace un momento</span>
      </div>
    </div>
    <div class="post-content">
      <p>${content || ""}</p>
      <div class="media-container">${mediaContent}</div>
    </div>
  `;

  userPosts.prepend(post);

  // Sumar puntos
  if (userPoints) {
    let pts = parseInt(userPoints.textContent) || 0;
    pts += 5;
    userPoints.textContent = pts;
  }

  postForm.reset();
});

/************************************************************
 * MODAL PARA FOTOS (Portada, Perfil, .post-media)
 ************************************************************/
const imageModal = document.getElementById("image-modal");
const modalImage = document.getElementById("modal-image");
const closeModalBtn = document.getElementById("close-modal");

document.addEventListener("click", (e) => {
  if (e.target.id === "cover-image") {
    // Portada
    modalImage.src = e.target.src;
    imageModal.style.display = "flex";
  }
  if (e.target.id === "profile-pic") {
    // Perfil
    modalImage.src = e.target.src;
    imageModal.style.display = "flex";
  }
  if (e.target.classList.contains("post-media") && e.target.tagName === "IMG") {
    // Fotos de publicaciones
    modalImage.src = e.target.src;
    imageModal.style.display = "flex";
  }
});

closeModalBtn.addEventListener("click", () => {
  imageModal.style.display = "none";
});
imageModal.addEventListener("click", (ev) => {
  if (ev.target === imageModal) {
    imageModal.style.display = "none";
  }
});

/************************************************************
 * PANEL DEL USUARIO (TOGGLE)
 ************************************************************/
const userDetailsToggle = document.querySelector(".user-details-toggle");
const userDetailsPanel = document.querySelector(".user-details");

userDetailsToggle?.addEventListener("click", () => {
  userDetailsPanel?.classList.toggle("open");
});

/************************************************************
 * GUARDAR DETALLES EN LOCALSTORAGE (OPCIONAL)
 ************************************************************/
document
  .querySelectorAll(".user-details input, .user-details textarea")
  .forEach((el) => {
    el.addEventListener("change", () => {
      localStorage.setItem(el.id, el.value);
    });
    const savedVal = localStorage.getItem(el.id);
    if (savedVal) el.value = savedVal;
  });

// Botón reset
const resetButton = document.createElement("button");
resetButton.textContent = "Resetear Detalles";
resetButton.classList.add("cta-button");
resetButton.style.marginTop = "10px";
resetButton.addEventListener("click", () => {
  document
    .querySelectorAll(".user-details input, .user-details textarea")
    .forEach((input) => {
      input.value = "";
      localStorage.removeItem(input.id);
    });
  alert("Detalles reseteados.");
});
userDetailsPanel?.appendChild(resetButton);

/************************************************************
 * MOSTRAR NOMBRE EN EL BOTÓN
 ************************************************************/
const savedName = localStorage.getItem("username");
if (savedName) {
  const userDetailsBtnText = document.getElementById("user-details-btn-text");
  if (userDetailsBtnText) userDetailsBtnText.textContent = savedName;
}
