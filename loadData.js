let currentProduct;

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));

  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      const allGames = [...data.recommendedGames, ...data.newReleases];
      currentProduct = allGames.find(game => game.id === productId);
      loadProductDetails(allGames, productId);
      loadRecommendedGames(data.recommendedGames);
      loadNewReleases(data.newReleases);
      loadCarousel(allGames);
      loadRelatedProducts(allGames, currentProduct);
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));
});

function loadProductDetails(games, productId) {
  const product = games.find(game => game.id === productId);
  if (product) {
    const productSection = document.getElementById('product-section');
    productSection.innerHTML = `
      <div class="row">
        <div class="col-md-6">
          <div id="product-carousel" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="${product.image}" class="d-block w-100" alt="${product.title}">
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <h2>${product.title}</h2>
          <p>${product.description} <a href="#" id="more-description" class="text-danger">Leer más</a></p>
          <div id="extended-description" style="display: none;">
            <p><strong>Plataforma:</strong> ${product.platform}</p>
            <p><strong>Genero:</strong> ${product.genre}</p>
            <p><strong>Requisitos mínimos:</strong> ${product.minRequirements}</p>
            <p><strong>Disponibilidad:</strong> ${product.availability}</p>
          </div>
          <p><strong>$${product.price}</strong></p>
          <div class="mb-3">
            <span class="text-warning">
              ${generateStars(product.reviews.rating)}
            </span>
            <span>${product.reviews.rating} (${product.reviews.totalReviews} valoraciones)</span>
          </div>
          <button id="add-to-cart-btn" class="btn btn-danger w-100">Agregar al carrito</button>
          <div class="mt-3">
            <p>Comparte este producto:</p>
            <a href="https://www.facebook.com" class="btn btn-outline-danger me-2"><i class="fab fa-facebook-f"></i> Facebook</a>
            <a href="https://x.com" class="btn btn-outline-danger me-2"><i class="fab fa-twitter"></i> Twitter</a>
            <a href="https://www.whatsapp.com" class="btn btn-outline-danger"><i class="fab fa-whatsapp"></i> WhatsApp</a>
          </div>
        </div>
      </div>
    `;

    // Manejar la acción de Leer más / Leer menos
    document.getElementById("more-description").addEventListener("click", function (event) {
      event.preventDefault();
      const description = document.getElementById("extended-description");
      const link = event.target;
      
      if (description.style.display === "none" || description.style.display === "") {
        description.style.display = "block";
        link.textContent = "Leer menos";
      } else {
        description.style.display = "none";
        link.textContent = "Leer más";
      }
    });

    // Lógica para agregar al carrito
    document.getElementById("add-to-cart-btn").addEventListener("click", function () {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingItem = cart.find(item => item.id === currentProduct.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ ...currentProduct, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Producto agregado al carrito");
    });
  }
}

function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  let stars = '';
  
  // Generar estrellas llenas
  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fas fa-star"></i>';
  }

  // Generar media estrella
  if (halfStar) stars += '<i class="fas fa-star-half-alt"></i>';

  // Completar con estrellas vacías
  while (stars.split('<i').length - 1 < 5) {
    stars += '<i class="far fa-star"></i>';
  }

  return stars;
}

function loadRecommendedGames(games) {
  const recommendedContainer = document.getElementById('recommended-games');
  let gameCards = '';
  games.forEach(game => {
    gameCards += createGameCard(game);
  });
  recommendedContainer.innerHTML = gameCards;
}

function loadNewReleases(games) {
  const newReleasesContainer = document.getElementById('new-releases');
  let gameCards = '';
  games.forEach(game => {
    gameCards += createGameCard(game);
  });
  newReleasesContainer.innerHTML = gameCards;
}

function createGameCard(game) {
  return `
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
}

function loadCarousel(data) {
  const carouselItems = document.querySelector('.carousel-inner');
  carouselItems.innerHTML = '';

  // Filtrar y mezclar productos aleatorios
  const shuffledProducts = data.sort(() => 0.5 - Math.random());
  const randomProducts = shuffledProducts.slice(0, 5); // Mostrar 5 productos aleatorios en el carrusel

  randomProducts.forEach((product, index) => {
    const activeClass = index === 0 ? 'active' : '';
    carouselItems.innerHTML += `
      <div class="carousel-item ${activeClass}">
        <a href="product.html?id=${product.id}">
          <img src="${product.image}" class="d-block w-100" alt="${product.title}">
        </a>
        <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
          <h5>${product.title}</h5>
          <p>${product.description}</p>
        </div>
      </div>
    `;
  });
}

function loadRelatedProducts(allGames, currentProduct) {
  const relatedContainer = document.getElementById('related-products');
  const relatedGames = allGames
    .filter(game => game.id !== currentProduct.id && game.genre === currentProduct.genre)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  if (relatedGames.length === 0) {
    relatedContainer.innerHTML = `<p class="text-center text-muted">No se encontraron productos relacionados.</p>`;
    return;
  }

  let relatedCards = '';
  relatedGames.forEach(game => {
    relatedCards += createGameCard(game);
  });

  relatedContainer.innerHTML = relatedCards;
}