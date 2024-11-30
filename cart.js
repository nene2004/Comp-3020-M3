

// Event listeners for dynamically generated content
document.addEventListener("DOMContentLoaded", () => {

    // Utility to load cart items from local storage
function loadCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Utility to save cart items to local storage
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function formatCurrency(amount) {
    if (typeof amount !== "number") {
        amount = parseFloat(amount.toString().replace(/[^0-9.]/g, "")); // Strip extra characters
    }
    return `$${amount.toFixed(2)}`;  // Format as currency
}

function updateCartDisplay() {
    const cart = loadCart();
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalContainer = document.getElementById("cart-total");
    const cartMessage = document.getElementById("cart-message");

    if (!cartItemsContainer || !cartTotalContainer || !cartMessage) return;

    cartItemsContainer.innerHTML = ""; // Clear current display
    let total = 0;

    if (cart.length === 0) {
        cartMessage.classList.remove("hidden"); // Show the "empty cart" message
        cartTotalContainer.textContent = formatCurrency(0); // No total to display
    } else {
        cartMessage.classList.add("hidden"); // Hide the "empty cart" message

        cart.forEach((item) => {
            // Ensure item structure is valid
            if (!item.id || !item.name || typeof item.price !== "number" || !item.quantity) {
                console.error("Invalid item in cart:", item);
                return;
            }

            const cartItem = document.createElement("div");
            cartItem.className = "cart-item";

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>${formatCurrency(item.price)}</p>  <!-- Ensure price is formatted -->
                    <input type="number" class="item-quantity" value="${item.quantity}" min="1" data-id="${item.id}">
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                </div>
            `;

            cartItemsContainer.appendChild(cartItem);
            total += item.price * item.quantity;
        });

        cartTotalContainer.textContent = formatCurrency(total); // Update the total
    }
}

function addToCart(item) {
    const cart = loadCart();

    // Check if item.price is a string (it may have a dollar sign) or a number
    let price;
    if (typeof item.price === 'string') {
        // Remove non-numeric characters if price is a string (e.g., dollar sign)
        price = parseFloat(item.price.replace(/[^\d.-]/g, ""));
    } else if (typeof item.price === 'number') {
        // If it's already a number, just use it
        price = item.price;
    } else {
        console.error("Invalid price type", item.price);
        return;  // Exit the function if the price is neither string nor number
    }

    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...item, price, quantity: 1 });  // Store price as a number
    }

    saveCart(cart);
    updateCartDisplay(); // Ensure UI is updated after adding item
    showAddToCartConfirmation(item.name);
}



function removeFromCart(itemId) {
    let cart = loadCart();
    cart = cart.filter((item) => item.id !== itemId);

    saveCart(cart);
    console.log("Cart after removing item: ", cart);  // Debugging line
    updateCartDisplay();
}


// Show confirmation message after adding an item to the cart
function showAddToCartConfirmation(itemName) {
    const confirmationMessage = document.getElementById("cartConfirmation");

    if (confirmationMessage) {
        confirmationMessage.textContent = `${itemName} has been added to your cart!`;
        confirmationMessage.style.display = "block";

        setTimeout(() => {
            confirmationMessage.style.display = "none";
        }, 5000);
    }
}

    // Update cart display on load
    updateCartDisplay();

   document.body.addEventListener("click", (event) => {
    // Check if the clicked target is inside an "add-to-cart" element
    const addToCartButton = event.target.closest(".add-to-cart");

    if (!addToCartButton) {
        return;  // Exit if the click isn't on a button inside a cartable item
    }

    // Find the closest product container, which could be either a <li> or another element
    const productElement = addToCartButton.closest("[data-id]");

    if (!productElement) {
        console.error("Add to Cart button does not have a valid product context.");
        return;  // Exit if the product context isn't found
    }

    // Extract product data from the productElement's data attributes
    const item = {
        id: productElement.dataset.id,
        name: productElement.dataset.name,
        price: parseFloat(productElement.dataset.price.replace(/[^0-9.]/g, "")), // Ensures it's numeric
        image: productElement.querySelector("img")?.src || "" // Extract image source
    };

    // Log the item data for debugging
    console.log("Item being added to cart:", item);

    // Call the function to add the item to the cart
    addToCart(item);
});

    // Delegated event listener for cart item interactions
    document.getElementById("cart-items")?.addEventListener("click", (event) => {
        const target = event.target;

        // Handle item removal
        if (target.classList.contains("remove-item")) {
            const confirmRemove = confirm("Are you sure you want to remove this item?");
            if (confirmRemove) {
                const itemId = target.dataset.id;
                removeFromCart(itemId);
            }
        }

        // Handle quantity changes
        if (target.classList.contains("item-quantity")) {
            const cart = loadCart();
            const item = cart.find((cartItem) => cartItem.id === target.dataset.id);

            if (item) {
                const newQuantity = parseInt(target.value, 10) || 1;
                item.quantity = newQuantity < 1 ? 1 : newQuantity;

                saveCart(cart);
                updateCartDisplay();
            }
        }
    });




});
