function registerUser(e) {
    e.preventDefault();
  
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value;
    const confirmPassword = document.getElementById("regConfirmPassword").value;
  
    if (!name || !email || !password || !confirmPassword) {
      alert("Por favor, completa todos los campos.");
      return false;
    }
  
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return false;
    }
  
    // Obtener usuarios registrados del localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
  
    // Verificar si el email ya está registrado
    const emailExists = users.some(user => user.email === email);
    if (emailExists) {
      alert("Este correo ya está registrado. Intenta con otro.");
      return false;
    }
  
    // Agregar el nuevo usuario
    const newUser = { name, email, password };
    users.push(newUser);
  
    // Guardar la lista actualizada en localStorage
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedUser", JSON.stringify({ name, email }));
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);
  
    alert("Registro exitoso. ¡Bienvenido!");
    window.location.href = "index.html";
    return true;
  }
  