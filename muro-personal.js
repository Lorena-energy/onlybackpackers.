// Menú responsive
const toggleBtn = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

toggleBtn?.addEventListener("click", () => {
  menu.classList.toggle("active");
});

// Foto de portada
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

// Foto de perfil
const profileUpload = document.getElementById("profile-upload");
const profilePic = document.getElementById("profile-pic");

profileUpload?.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      profilePic.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// Modal para fotos ampliadas
const imageModal = document.getElementById("image-modal");
const modalImage = document.getElementById("modal-image");
const closeModalBtn = document.getElementById("close-modal");

// Abrir modal al hacer click en la portada, perfil, o cualquier foto .post-media
document.addEventListener("click", (e) => {
  // Portada
  if (e.target.id === "cover-image") {
    modalImage.src = e.target.src;
    imageModal.style.display = "flex";
  }
  // Foto de perfil
  if (e.target.id === "profile-pic") {
    modalImage.src = e.target.src;
    imageModal.style.display = "flex";
  }
  // ... si tienes .post-media para imágenes de publicaciones, etc.
});

// Cerrar modal
closeModalBtn.addEventListener("click", () => {
  imageModal.style.display = "none";
});

// Cerrar al hacer click fuera de la imagen
imageModal.addEventListener("click", (event) => {
  if (event.target === imageModal) {
    imageModal.style.display = "none";
  }
});

// Detalles del usuario (toggle panel)
const userDetailsToggle = document.querySelector(".user-details-toggle");
const userDetailsPanel = document.querySelector(".user-details");

userDetailsToggle?.addEventListener("click", () => {
  userDetailsPanel.classList.toggle("open");
});

// Resto de lógica (puntaje, publicaciones, etc.) ...
