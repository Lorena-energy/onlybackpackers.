// index.js

// Menú hamburguesa
document.getElementById("menu-toggle").addEventListener("click", () => {
  const menu = document.getElementById("menu");
  menu.classList.toggle("active");
});

// Simulación de autenticación
const isAuthenticated = false; // Cambia a true después del inicio de sesión.

if (!isAuthenticated && window.location.pathname !== '/login.html') {
  window.location.href = "login.html"; // Redirige a la página de inicio de sesión si no está autenticado.
}

