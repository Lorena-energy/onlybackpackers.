// Menú hamburguesa
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      menu.classList.toggle("active");

   // Al iniciar sesión
localStorage.setItem("isAuthenticated", true);

// Verificar sesión en cada página
if (!localStorage.getItem("isAuthenticated")) {
  window.location.href = "login-register.html";
}

// Cerrar sesión
document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("isAuthenticated");
  window.location.href = "login-register.html";
});

    });
  }
});
