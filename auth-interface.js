document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.querySelector(".register-form");
  const loginForm = document.querySelector(".login-form");
  const registerLink = document.getElementById("register-link");
  const loginLink = document.getElementById("login-link");

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
});
