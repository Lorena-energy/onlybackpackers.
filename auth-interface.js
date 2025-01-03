document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form"); // Formulario de registro
  const loginForm = document.getElementById("login-form"); // Formulario de inicio de sesión
  const registerLink = document.getElementById("show-register"); // Enlace para mostrar registro
  const loginLink = document.getElementById("show-login"); // Enlace para mostrar login

  // Mostrar formulario de registro
  registerLink.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
  });

  // Mostrar formulario de inicio de sesión
  loginLink.addEventListener("click", (e) => {
    e.preventDefault();
    registerForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
  });
});

