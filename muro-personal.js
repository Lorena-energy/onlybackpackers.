// Menú hamburguesa
document.getElementById("menu-toggle").addEventListener("click", () => {
  document.getElementById("menu").classList.toggle("show");
});

// Botón "Detalles del usuario"
const userDetailsToggle = document.querySelector(".user-details-toggle");
const userDetailsPanel = document.querySelector(".user-details");

userDetailsToggle.addEventListener("click", () => {
  userDetailsPanel.classList.toggle("open");
});

// Cambiar foto de portada
document.getElementById("cover-upload").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      document.getElementById("cover-image").src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// Cambiar foto de perfil
document.getElementById("profile-upload").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      document.getElementById("profile-pic").src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});
