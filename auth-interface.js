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

  // Simulación de envío de formularios
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Aquí conectarías con tu backend para registrar al usuario
    alert("¡Registro exitoso!");
    window.location.href = "muro-personal.html"; // Redirige al muro personal
  });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Aquí conectarías con tu backend para verificar credenciales
    alert("¡Inicio de sesión exitoso!");
    window.location.href = "muro-personal.html"; // Redirige al muro personal
  });

  forgotPasswordForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Aquí enviarías el correo de recuperación
    alert("Se ha enviado un correo para recuperar tu contraseña.");
  });
});
