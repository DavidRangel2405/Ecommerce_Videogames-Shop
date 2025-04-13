// Este archivo solo se encarga de llamar a las otras funciones necesarias
document.addEventListener("DOMContentLoaded", function () {
    // Inicia la carga de datos y el manejo de la interfaz de usuario.
    initUserInterface();
    loadData(); // Desde `loadData.js`
    initAuth();  // Desde `auth.js`
  });
  
  function initUserInterface() {
    // Aquí podemos manejar la interfaz de usuario en general, como cargar secciones o mostrar alertas globales.
    // Esto puede ser útil si quieres hacer inicializaciones adicionales.
  }
  