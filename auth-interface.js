document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");
  const loginForm = document.getElementById("login-form");
  const registerLink = document.getElementById("show-register");
  const loginLink = document.getElementById("show-login");

  // Alternar entre formularios
  registerLink.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
  });

  loginLink.addEventListener("click", (e) => {
    e.preventDefault();
    registerForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
  });

  // Simulación de autenticación
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Registro exitoso");
    window.location.href = "index.html"; // Redirige al inicio
  });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Inicio de sesión exitoso");
    window.location.href = "index.html"; // Redirige al inicio
  });
});

