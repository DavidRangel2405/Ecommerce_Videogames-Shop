// Control de inicio de sesión y perfil
const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
const perfilNav = document.getElementById('nav-perfil');
const loginNav = document.getElementById('nav-login');

// Mostrar/ocultar elementos de navegación según el estado de sesión
if (perfilNav && loginNav) {
  perfilNav.style.display = isLoggedIn ? 'block' : 'none';
  loginNav.style.display = isLoggedIn ? 'none' : 'block';
}

const loginForm = document.getElementById('login-form');

if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Buscar el usuario que coincida con el email y password
    const matchedUser = users.find(user => user.email === email && user.password === password);

    if (matchedUser) {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("userName", matchedUser.name);
      localStorage.setItem("userEmail", matchedUser.email);
      localStorage.setItem("loggedUser", JSON.stringify(matchedUser));

      alert("Inicio de sesión exitoso");
      window.location.href = "index.html";
    } else {
      alert("Credenciales incorrectas. Inténtalo de nuevo.");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  const user = JSON.parse(localStorage.getItem("loggedUser"));

  const userDisplay = document.getElementById("userNameDisplay");
  const navUser = document.getElementById("nav-user");
  const navLogin = document.getElementById("nav-login");

  if (isLoggedIn && user) {
    if (userDisplay) userDisplay.textContent = user.name;
    if (navUser) navUser.style.display = "block";
    if (navLogin) navLogin.style.display = "none";
  } else {
    if (navUser) navUser.style.display = "none";
    if (navLogin) navLogin.style.display = "block";
  }
});