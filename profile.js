document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  if (isLoggedIn) {
    const name = localStorage.getItem("userName");
    const email = localStorage.getItem("userEmail");
    const password = localStorage.getItem("userPassword");

    // Cargar nombre y correo en el perfil
    document.getElementById("userName").textContent = name;
    document.getElementById("userEmail").textContent = email;
    document.getElementById("userPassword").value = password;

    // Mostrar la imagen de perfil (puede ser dinámica más adelante)
    document.getElementById("profileImage").src = localStorage.getItem("profileImage") || "https://via.placeholder.com/150";

    // Mostrar el enlace para cerrar sesión
    document.getElementById("logoutLink").addEventListener("click", logout);

    // Mostrar el botón de edición de perfil
    document.getElementById("editButton").addEventListener("click", showEditForm);

    document.getElementById("cancelButton").addEventListener("click", cancelEdit);

    // Guardar los cambios de perfil
    document.getElementById("saveButton").addEventListener("click", saveProfileChanges);

      // Mostrar/ocultar contraseña
      const togglePassword = document.getElementById("togglePassword");
      const passwordInput = document.getElementById("userPassword");
  
      togglePassword.addEventListener("click", () => {
        const isHidden = passwordInput.type === "password";
        passwordInput.type = isHidden ? "text" : "password";
        togglePassword.classList.toggle("fa-eye");
        togglePassword.classList.toggle("fa-eye-slash");
      });
    } else {
      alert("No has iniciado sesión.");
      window.location.href = "login.html";
    }
});

function logout() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userPassword");
  localStorage.removeItem("profileImage");
  alert("Has cerrado sesión exitosamente.");
  window.location.href = "login.html";
}

function showEditForm() {
  // Mostrar formulario de edición
  document.getElementById("editForm").classList.remove("d-none");
  document.getElementById("editName").value = localStorage.getItem("userName");
  document.getElementById("editEmail").value = localStorage.getItem("userEmail");
  document.getElementById("editPassword").value = localStorage.getItem("userPassword");

  // Ocultar el botón de editar y el enlace para cerrar sesión
  document.getElementById("editButton").classList.add("d-none");
  document.getElementById("logoutLink").classList.add("d-none");
}

function cancelEdit() {
  // Ocultar el formulario de edición
  document.getElementById("editForm").classList.add("d-none");

  // Mostrar el botón de edición y el enlace de cierre de sesión
  document.getElementById("editButton").classList.remove("d-none");
  document.getElementById("logoutLink").classList.remove("d-none");
}

function saveProfileChanges() {
  const newName = document.getElementById("editName").value.trim();
  const newEmail = document.getElementById("editEmail").value.trim();
  const newPassword = document.getElementById("editPassword").value.trim();

  // Obtener el usuario actual
  let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Actualizar los datos del usuario actual
  if (loggedUser) {
    // Buscar el índice del usuario en el array completo
    const index = users.findIndex(user => user.email === loggedUser.email);

    if (index !== -1) {
      // Actualizar el usuario en el array de usuarios
      users[index].name = newName;
      users[index].email = newEmail;
      users[index].password = newPassword;
      
      // Guardar cambios en localStorage
      localStorage.setItem("users", JSON.stringify(users));
      
      // Actualizar el usuario logueado
      loggedUser.name = newName;
      loggedUser.email = newEmail;
      loggedUser.password = newPassword;
      localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
    }
  }

  // También actualizar nombre y correo visibles
  localStorage.setItem("userName", newName);
  localStorage.setItem("userEmail", newEmail);
  localStorage.setItem("userPassword", newPassword);
  document.getElementById("userName").textContent = newName;
  document.getElementById("userEmail").textContent = newEmail;
  document.getElementById("userPassword").value = newPassword;

  // Restaurar vista
  document.getElementById("editForm").classList.add("d-none");
  document.getElementById("editButton").classList.remove("d-none");
  document.getElementById("logoutLink").classList.remove("d-none");
}