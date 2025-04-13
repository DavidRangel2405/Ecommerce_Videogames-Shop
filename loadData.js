document.addEventListener("DOMContentLoaded", function () {
    // Cargar datos del archivo JSON
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        loadRecommendedGames(data.recommendedGames);
        loadNewReleases(data.newReleases);
        loadCarousel(data.recommendedGames); // Cargar el carrusel con los juegos recomendados
      })
      .catch(error => console.error('Error al cargar el archivo JSON:', error));
  });
  
  // Función para cargar los juegos recomendados
  function loadRecommendedGames(recommendedGames) {
    const recommendedContainer = document.getElementById('recommended-games');
    let gameCards = '';
    recommendedGames.forEach(game => {
      gameCards += `
        <div class="col-md-4 mb-4">
          <div class="card h-100 bg-dark text-white">
            <img src="${game.image}" class="card-img-top" alt="${game.title}">
            <div class="card-body">
              <h5 class="card-title">${game.title}</h5>
              <p class="card-text">${game.description}</p>
              <p class="card-price">${game.price}</p>
              <a href="${game.link}" class="btn btn-danger w-100">Ver más</a>
            </div>
          </div>
        </div>
      `;
    });
    recommendedContainer.innerHTML = gameCards;
  }
  
  // Función para cargar los nuevos lanzamientos
  function loadNewReleases(newReleases) {
    const newReleasesContainer = document.getElementById('new-releases');
    newReleases.forEach(game => {
      const gameCard = `
        <div class="col-md-4 mb-4">
          <div class="card h-100 bg-dark text-white">
            <img src="${game.image}" class="card-img-top" alt="${game.title}">
            <div class="card-body">
              <h5 class="card-title">${game.title}</h5>
              <p class="card-text">${game.description}</p>
              <p class="card-price">${game.price}</p>
              <a href="${game.link}" class="btn btn-danger w-100">Ver más</a>
            </div>
          </div>
        </div>
      `;
      newReleasesContainer.innerHTML += gameCard;
    });
  }
  
  // Función para cargar el carrusel con los juegos recomendados
  function loadCarousel(recommendedGames) {
    const carouselItems = document.querySelector('.carousel-inner');
    recommendedGames.forEach((game, index) => {
      const activeClass = index === 0 ? 'active' : ''; // Establecer la primera imagen como activa
      const carouselItem = `
        <div class="carousel-item ${activeClass}">
          <img src="${game.image}" class="d-block w-100" alt="${game.title}">
        </div>
      `;
      carouselItems.innerHTML += carouselItem;
    });
  }
  