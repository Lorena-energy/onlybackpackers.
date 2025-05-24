document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  // Validación de inicio de sesión
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (!email || !password) {
      alert("Por favor, completa todos los campos.");
    } else {
      alert("Inicio de sesión exitoso.");
      // Aquí puedes agregar la lógica para autenticar al usuario.
    }
  });

  // Validación de registro
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("register-name").value.trim();
    const email = document.getElementById("register-email").value.trim();
    const password = document.getElementById("register-password").value.trim();

    if (!name || !email || !password) {
      alert("Por favor, completa todos los campos.");
    } else {
      alert("Registro exitoso. ¡Bienvenido!");
      // Aquí puedes agregar la lógica para registrar al usuario.
    }
  });
});
