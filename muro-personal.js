document.addEventListener("DOMContentLoaded", () => {
  const profilePic = document.getElementById("profile-pic");
  const profileUpload = document.getElementById("profile-upload");
  const coverUpload = document.getElementById("cover-upload");
  const coverImage = document.getElementById("cover-image");

  // Cambiar foto de perfil
  profileUpload.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      profilePic.src = URL.createObjectURL(file);
    }
  });

  // Ampliar y reducir foto de perfil
  profilePic.addEventListener("click", () => {
    profilePic.classList.toggle("enlarged");
  });

  // Cambiar foto de portada
  coverUpload.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      coverImage.src = URL.createObjectURL(file);
    }
  });
});
