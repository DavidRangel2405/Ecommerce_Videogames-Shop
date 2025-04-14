document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  
    if (isLoggedIn) {
      const name = localStorage.getItem("userName");
      const email = localStorage.getItem("userEmail");
  
      document.getElementById("userName").textContent = name;
      document.getElementById("userEmail").textContent = email;
    } else {
      alert("No has iniciado sesión.");
      window.location.href = "login.html";
    }
  });
  
  function logout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    alert("Has cerrado sesión exitosamente.");
    window.location.href = "login.html";
  }
  