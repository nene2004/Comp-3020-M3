// Utility to load cart items from local storage
function loadCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Utility to save cart items to local storage
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Update the cart display
function updateCartDisplay() {
    const cart = loadCart();
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalContainer = document.getElementById("cart-total");

    if (!cartItemsContainer || !cartTotalContainer) return; // Exit if cart elements are not on the page

    cartItemsContainer.innerHTML = ""; // Clear current display
    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h3>${item.name}</h3>
                <p>$${item.price}</p>
                <input type="number" class="item-quantity" value="${item.quantity}" min="1" data-id="${item.id}">
                <button class="remove-item" data-id="${item.id}">Remove</button>
            </div>
        `;

        cartItemsContainer.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    cartTotalContainer.textContent = total.toFixed(2);
}

// Add an item to the cart
function addToCart(item) {
    const cart = loadCart();
    const existingItem = cart.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    saveCart(cart);
    updateCartDisplay();
}

// Remove an item from the cart
function removeFromCart(itemId) {
    let cart = loadCart();
    cart = cart.filter(item => item.id !== itemId);

    saveCart(cart);
    updateCartDisplay();
}

function formatCurrency(amount) {
    return `$${amount.toFixed(2)}`;
}
// Set up event listeners
document.addEventListener("DOMContentLoaded", () => {
    // Initialize cart display
    updateCartDisplay();

    // Delegated event listener for Add to Cart buttons across the site
    document.body.addEventListener("click", event => {
        if (event.target.classList.contains("add-to-cart")) {
            const productElement = event.target.closest("[data-id]");

            if (!productElement) {
                console.error("Add to Cart button does not have a product context.");
                return;
            }

            const item = {
                id: productElement.dataset.id,
                name: productElement.dataset.name,
                price: parseFloat(productElement.dataset.price),
                image: productElement.querySelector("img")?.src || ""
            };

            addToCart(item);
        }
    });

    // Cart item quantity change and remove button events
    document.getElementById("cart-items")?.addEventListener("click", event => {
        const target = event.target;

        if (target.classList.contains("remove-item")) {
            const confirmRemove = confirm("Are you sure you want to remove this item?");
            if (confirmRemove) {
                const itemId = target.dataset.id;
                removeFromCart(itemId);
            }
        }

        if (target.classList.contains("item-quantity")) {
            const cart = loadCart();
            const item = cart.find(cartItem => cartItem.id === target.dataset.id);
            if (item) {
                item.quantity = parseInt(target.value, 10) || 1;
                saveCart(cart);
                updateCartDisplay();
            }
        }
    });
});
