document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");
  const loginForm = document.getElementById("login-form");
  const showLoginLink = document.getElementById("show-login");
  const showRegisterLink = document.getElementById("show-register");

  // Mostrar el formulario de inicio de sesión
  showLoginLink.addEventListener("click", (e) => {
    e.preventDefault();
    registerForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
  });

  // Mostrar el formulario de registro
  showRegisterLink.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
  });
});
