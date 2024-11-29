document.addEventListener('DOMContentLoaded', () => {
    // Load items from localStorage
    function loadItems(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    }

    // Save items to localStorage
    function saveItems(key, items) {
        localStorage.setItem(key, JSON.stringify(items));
    }

    // Render the cart items
    function renderCart() {
        const cartItems = loadItems('cart');
        const cartContainer = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        const checkoutButton = document.getElementById('checkout-button');
        const cartMessage = document.getElementById('cart-message');

        cartContainer.innerHTML = '';
        let total = 0;

        if (cartItems.length > 0) {
            cartItems.forEach((item, index) => {
                const div = document.createElement('div');
                div.classList.add('cart-item');

                div.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-details">
                        <h3>${item.name}</h3>
                        <p>Price: $${item.price}</p>
                        <div class="item-quantity-controls">
                            <button class="quantity-button" data-index="${index}" data-action="decrease">-</button>
                            <input type="text" class="item-quantity" value="${item.quantity}" readonly>
                            <button class="quantity-button" data-index="${index}" data-action="increase">+</button>
                        </div>
                        <div class="cart-buttons">
                            <button class="move-to-wishlist" data-index="${index}">Move to Wishlist</button>
                            <button class="remove-item" data-index="${index}">Remove</button>
                        </div>
                    </div>
                `;

                cartContainer.appendChild(div);
                total += item.price * item.quantity;
            });

            cartMessage.classList.add('hidden');
            checkoutButton.disabled = false;
        } else {
            cartMessage.textContent = 'Your cart is empty.';
            cartMessage.classList.remove('hidden');
            checkoutButton.disabled = true;
        }

        cartTotal.textContent = total.toFixed(2);
    }

    // Update quantity
    function updateQuantity(index, action) {
        const cartItems = loadItems('cart');

        if (action === 'increase') {
            cartItems[index].quantity += 1;
        } else if (action === 'decrease' && cartItems[index].quantity > 1) {
            cartItems[index].quantity -= 1;
        }

        saveItems('cart', cartItems);
        renderCart();
    }

    // Move item to wishlist
    function moveToWishlist(index) {
        const cartItems = loadItems('cart');
        const wishlistItems = loadItems('wishlist');

        wishlistItems.push(cartItems[index]);
        cartItems.splice(index, 1);

        saveItems('cart', cartItems);
        saveItems('wishlist', wishlistItems);
        renderCart();
    }

    // Remove item from cart
    function removeFromCart(index) {
        const cartItems = loadItems('cart');
        cartItems.splice(index, 1);
        saveItems('cart', cartItems);
        renderCart();
    }

    // Event Delegation for Cart Actions
    document.getElementById('cart-items').addEventListener('click', (e) => {
        const target = e.target;
        const index = parseInt(target.getAttribute('data-index'), 10);

        if (target.classList.contains('quantity-button')) {
            const action = target.getAttribute('data-action');
            updateQuantity(index, action);
        } else if (target.classList.contains('move-to-wishlist')) {
            moveToWishlist(index);
        } else if (target.classList.contains('remove-item')) {
            removeFromCart(index);
        }
    });

    // Initial Render
    renderCart();
});
