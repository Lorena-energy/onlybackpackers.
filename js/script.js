// Simulación de autenticación
const isAuthenticated = localStorage.getItem("loggedIn") === "true";

if (!isAuthenticated && window.location.pathname.includes("muro.html")) {
  alert("Debes iniciar sesión para acceder al muro.");
  window.location.href = "index.html";
}

document.getElementById("login-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  localStorage.setItem("loggedIn", "true");
  window.location.href = "muro.html";
});
