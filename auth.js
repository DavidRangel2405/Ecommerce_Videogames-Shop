// Control de inicio de sesión y perfil
const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
const perfilNav = document.getElementById('nav-perfil');
const loginNav = document.getElementById('nav-login');

// Mostrar el perfil si el usuario ha iniciado sesión y ocultar el login
if (perfilNav && loginNav) {
  if (isLoggedIn) {
    perfilNav.style.display = 'block';  // Mostrar opción de perfil
    loginNav.style.display = 'none';    // Ocultar opción de login
  } else {
    perfilNav.style.display = 'none';   // Ocultar opción de perfil
    loginNav.style.display = 'block';   // Mostrar opción de login
  }
}

const loginForm = document.getElementById('login-form');

if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Usuario simulado
    const mockUser = {
      email: 'user@gmail.com',
      password: '12345',
      nombre: 'Juan Gamer'
    };

    // Validación simple
    if (email === mockUser.email && password === mockUser.password) {
      // Guardar sesión
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('userName', mockUser.nombre);
      localStorage.setItem('userEmail', mockUser.email);

      alert('Inicio de sesión exitoso');
      window.location.href = 'index.html'; // Redirigir a la página principal
    } else {
      alert('Credenciales incorrectas. Inténtalo de nuevo.');
    }
  });
}
