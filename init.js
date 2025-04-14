// Este archivo se encarga de inicializar las funciones necesarias para la interfaz y el manejo de datos.
document.addEventListener("DOMContentLoaded", function () {
  // Inicializa la interfaz de usuario y las funciones relacionadas
  initUserInterface();
  loadData();  // Carga los datos desde `loadData.js`
  initAuth();  // Inicializa la autenticación desde `auth.js`
  loadRelatedProducts(allGames, currentProduct);  // Carga productos relacionados (si es necesario)
});

// Esta función maneja la interfaz de usuario en general
function initUserInterface() {
  // Por ejemplo, podrías cargar secciones adicionales, mostrar alertas globales o manejar la navegación.
  // También podrías incluir la lógica de los eventos de la UI si es necesario.
  console.log("Interfaz de usuario inicializada");
}
  