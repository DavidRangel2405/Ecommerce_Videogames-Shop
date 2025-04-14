document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const genre = urlParams.get('genre');
  
    const title = document.getElementById('category-title');
    const resultsContainer = document.getElementById('category-results');
  
    if (!genre) {
      title.textContent = 'Género no especificado';
      return;
    }
  
    title.textContent = `Juegos de ${genre}`;
  
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        const allGames = [...data.recommendedGames, ...data.newReleases];
  
        const filteredGames = allGames.filter(game => {
          if (!game.genre) return false;
  
          // Separamos el string por coma, quitamos espacios y comparamos
          const genresArray = game.genre.split(',').map(g => g.trim().toLowerCase());
          return genresArray.includes(genre.toLowerCase());
        });
  
        if (filteredGames.length === 0) {
          resultsContainer.innerHTML = '<p class="text-muted">No hay juegos disponibles para este género.</p>';
        } else {
          let html = '';
          filteredGames.forEach(game => {
            html += `
              <div class="col-md-4 mb-4">
                <div class="card h-100 bg-dark text-white border-danger">
                  <img src="${game.image}" class="card-img-top" alt="${game.title}">
                  <div class="card-body">
                    <h5 class="card-title">${game.title}</h5>
                    <p class="card-text">${game.description}</p>
                    <p class="card-price fw-bold text-danger">$${game.price}</p>
                    <a href="product.html?id=${game.id}" class="btn btn-outline-danger w-100">Ver más</a>
                  </div>
                </div>
              </div>
            `;
          });
          resultsContainer.innerHTML = html;
        }
      })
      .catch(error => {
        resultsContainer.innerHTML = '<p class="text-danger">Error al cargar los juegos.</p>';
        console.error('Error:', error);
      });
  });
  