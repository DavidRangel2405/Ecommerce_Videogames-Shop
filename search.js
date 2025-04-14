document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const dropdown = document.getElementById("searchDropdown");
  
    let allGames = [];
  
    fetch("data.json")
      .then(res => res.json())
      .then(data => {
        allGames = [...data.recommendedGames, ...data.newReleases];
      });
  
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.trim().toLowerCase();
      dropdown.innerHTML = "";
  
      if (!query) {
        dropdown.classList.add("d-none");
        return;
      }
  
      const filtered = allGames.filter(game =>
        game.title.toLowerCase().includes(query)
      );
  
      if (filtered.length === 0) {
        dropdown.innerHTML = `<span class="dropdown-item text-muted">No se encontraron resultados</span>`;
      } else {
        dropdown.classList.remove("fade-slide-out");
        dropdown.classList.add("fade-slide-in");
  
        filtered.slice(0, 6).forEach(game => {
          const item = document.createElement("a");
          item.className = "dropdown-item";
          item.href = `product.html?id=${game.id}`; // Asegúrate de que el enlace tenga el id correcto
          item.innerHTML = `
            <img src="${game.image}" alt="${game.title}">
            <div>
              <div class="fw-bold text-white">${game.title}</div>
              <div class="text-danger">$${game.price}</div>
            </div>
          `;
          dropdown.appendChild(item);
        });
      }
  
      dropdown.classList.remove("d-none");
    });
  
    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target) && e.target !== searchInput) {
        dropdown.classList.remove("fade-slide-in");
        dropdown.classList.add("fade-slide-out");
  
        setTimeout(() => {
          dropdown.innerHTML = "";
          dropdown.classList.add("d-none");
          dropdown.classList.remove("fade-slide-out");
        }, 200);
      }
    });
  });
  