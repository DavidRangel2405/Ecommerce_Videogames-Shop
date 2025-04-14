document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    renderCart(cart);
    updateCartCount(); // 👈 importante aquí también
  });
  
  function renderCart(cart) {
    const cartItemsContainer = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
  
    cartItemsContainer.innerHTML = "";
    let total = 0;
  
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="text-center text-secondary fs-4 py-5">
          <i class="fas fa-shopping-cart fa-2x mb-3"></i><br>
          Tu carrito está vacío.
        </div>
      `;
      cartTotal.textContent = "$0.00";
      return;
    }
  
    cart.forEach(item => {
        const price = parseFloat(item.price) || 0;
        const quantity = parseInt(item.quantity) || 1;
        total += price * quantity;
      
        const itemCard = document.createElement("div");
        itemCard.className = "col-12 col-md-6 col-lg-4 mb-4";
      
        itemCard.innerHTML = `
          <div class="cart-card text-white h-100 d-flex flex-column justify-content-between">
            <img src="${item.image}" alt="${item.title}" class="w-100">
            <div class="cart-card-body">
              <h4 class="text-white">${item.title}</h4>
              <p class="small">${item.description}</p>
              <h5 class="fw-bold text-white">$${(price * quantity).toFixed(2)}</h5>
            </div>
            <div class="cart-card-footer d-flex justify-content-between align-items-center">
              <span class="text-light">Cantidad: ${quantity}</span>
              <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash-alt"></i> Eliminar
              </button>
            </div>
          </div>
        `;
      
        cartItemsContainer.appendChild(itemCard);
      });      
  
    cartTotal.textContent = `$${total.toFixed(2)}`;
  }

// Función para actualizar el contador del carrito
function updateCartCount() {
    // Obtener el carrito desde el localStorage o un arreglo vacío si no existe
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    // Calcular la cantidad total de productos en el carrito
    const totalItems = cart.reduce((sum, item) => sum + (parseInt(item.quantity) || 1), 0);
  
    // Obtener el elemento del contador
    const cartCount = document.getElementById("cartCount");
  
    // Actualizar el contenido del contador con el número total de productos
    if (cartCount) {
      cartCount.textContent = totalItems;
      // Mostrar el contador solo si hay productos en el carrito
      cartCount.style.display = totalItems > 0 ? "flex" : "none";
    }
  }
  
  // Llamar a la función para actualizar el contador al cargar la página
  updateCartCount();   
  
  function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart(cart);
  }
  
  function proceedToCheckout() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
    window.location.href = "checkout.html";
  }
  