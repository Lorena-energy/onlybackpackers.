document.addEventListener("DOMContentLoaded", () => {
  const profilePic = document.getElementById("profile-pic");
  const photoModal = document.getElementById("photo-modal");
  const modalPhoto = document.getElementById("modal-photo");
  const closePhotoModal = document.getElementById("close-photo-modal");
  const coverUpload = document.getElementById("cover-upload");
  const coverPhoto = document.getElementById("cover-photo");

  // Mostrar foto de perfil ampliada
  profilePic.addEventListener("click", () => {
    modalPhoto.src = profilePic.src;
    photoModal.classList.remove("hidden");
  });

  closePhotoModal.addEventListener("click", () => {
    photoModal.classList.add("hidden");
  });

  // Subir foto de portada
  coverUpload.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      coverPhoto.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    }
  });
});
