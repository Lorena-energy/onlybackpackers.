document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");
  const loginForm = document.getElementById("login-form");
  const forgotPasswordForm = document.getElementById("forgot-password-form");

  const showRegister = document.getElementById("show-register");
  const showLogin = document.getElementById("show-login");
  const showForgotPassword = document.getElementById("show-forgot-password");

  // Cambiar entre formularios
  showRegister.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.add("hidden");
    forgotPasswordForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
  });

  showLogin.addEventListener("click", (e) => {
    e.preventDefault();
    registerForm.classList.add("hidden");
    forgotPasswordForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
  });

  showForgotPassword.addEventListener("click", (e) => {
    e.preventDefault();
    registerForm.classList.add("hidden");
    loginForm.classList.add("hidden");
    forgotPasswordForm.classList.remove("hidden");
  });

  // Simulación de eventos de envío (puedes conectar con tu backend aquí)
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("¡Registro exitoso!");
  });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("¡Inicio de sesión exitoso!");
  });

  forgotPasswordForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Se ha enviado un correo para recuperar tu contraseña.");
  });
});

