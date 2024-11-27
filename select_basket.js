document.addEventListener('DOMContentLoaded', () => {
    
    function loadItems(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    }

    function saveItems(key, items) {
        localStorage.setItem(key, JSON.stringify(items));
    }

    function addToWishlist(event) {
        const productBox = event.target.closest('.image-box');
        const wishlistHeart = productBox.querySelector('.wishlist-heart');
        const item = {
            name: productBox.querySelector('.basket-name').textContent,
            price: productBox.querySelector('.basket-price').textContent,
            image: productBox.querySelector('img').src,
        };

        let wishlist = loadItems('wishlist');

        // Check if item is already in the wishlist
        const existingItemIndex = wishlist.findIndex((i) => i.name === item.name);

        if (existingItemIndex !== -1) {
            // Remove item from wishlist if already exists (toggle effect)
            wishlist.splice(existingItemIndex, 1);
            wishlistHeart.classList.remove('active');
            console.log(`${item.name} removed from wishlist.`);
        } else {
            // Add item to wishlist if not exists
            wishlist.push(item);
            wishlistHeart.classList.add('active');
            console.log(`${item.name} added to wishlist.`);
        }

        // Save updated wishlist to localStorage
        saveItems('wishlist', wishlist);

        // Show confirmation message
        const confirmationMessage = document.getElementById('wishlistConfirmation');
        if (confirmationMessage) {
            confirmationMessage.textContent = wishlistHeart.classList.contains('active')
                ? `${item.name} has been added to your wishlist!`
                : `${item.name} has been removed from your wishlist.`;

            confirmationMessage.style.display = 'block';
            setTimeout(() => (confirmationMessage.style.display = 'none'), 4000);
        }
    }

    function initializeWishlistState() {
        const wishlist = loadItems('wishlist');
        document.querySelectorAll('.wishlist-heart').forEach((heart) => {
            const productName = heart.closest('.image-box').querySelector('.basket-name').textContent;
            if (wishlist.some(item => item.name === productName)) {
                heart.classList.add('active');
            }
        });
    }

    // Initialize wishlist state on page load
    initializeWishlistState();

    // Add event listeners for wishlist icons
    document.querySelectorAll('.wishlist-heart').forEach((heart) => {
        heart.addEventListener('click', addToWishlist);
    });

    function calculateTotal(items) {
        return items
            .reduce((total, item) => {
                const price = parseFloat(item.price.replace(/[^0-9.]/g, '')); // Remove $ or any non-numeric characters
                return total + item.quantity * price;
            }, 0)
            .toFixed(2); // Ensure the result is formatted as a decimal number
    }

    function updateBasketSidebar() {
        const basketItems = loadItems('basket');
        const basketItemsList = document.getElementById('basketItems');
        const totalBalanceElement = document.getElementById('totalBalance');

        basketItemsList.innerHTML = '';

        if (basketItems.length > 0) {
            basketItems.forEach((item, index) => {
                const li = document.createElement('li');
                li.classList.add('basket-item');
                li.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="basket-item-image">
                    <div class="basket-item-details">
                        <span class="basket-item-name">${item.name}</span>
                        <span class="basket-item-price">${item.price}</span>
                        <div class="basket-item-quantity">
                            <button class="quantity-decrease" data-index="${index}">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-increase" data-index="${index}">+</button>
                        </div>
                    </div>
                    <button class="basket-item-remove" data-index="${index}">✖</button>
                `;
                basketItemsList.appendChild(li);
            });

            totalBalanceElement.textContent = `${calculateTotal(basketItems)}`;
        } else {
            const emptyMessage = document.createElement('li');
            emptyMessage.textContent = 'Your basket is empty.';
            basketItemsList.appendChild(emptyMessage);
            totalBalanceElement.textContent = '0.00';
        }
    }

    function addToBasket(button) {
        const productBox = button.closest('.image-box');
        const item = {
            name: productBox.querySelector('.basket-name').textContent,
            price: productBox.querySelector('.basket-price').textContent,
            image: productBox.querySelector('img').src,
            quantity: 1,
        };

        const basket = loadItems('basket');
        const existingItem = basket.find((b) => b.name === item.name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            basket.push(item);
        }

        saveItems('basket', basket);
        updateBasketSidebar();
          // Show confirmation message
    const confirmationMessage = document.getElementById('basketConfirmation');
    if (confirmationMessage) {
        confirmationMessage.textContent = `${item.name} has been added to your Basket!`;
        confirmationMessage.style.display = 'block';
        setTimeout(() => {
            confirmationMessage.style.display = 'none';
        }, 4000);
    }
    }

    function modifyBasketQuantity(index, action) {
        const basket = loadItems('basket');

        if (action === 'increase') {
            basket[index].quantity += 1;
        } else if (action === 'decrease' && basket[index].quantity > 1) {
            basket[index].quantity -= 1;
        } else if (action === 'decrease' && basket[index].quantity === 1) {
            basket.splice(index, 1);
        }

        saveItems('basket', basket);
        updateBasketSidebar();
    }
    function removeBasketItem(index) {
        const basket = loadItems('basket');
        if (index >= 0 && index < basket.length) {
            const item = basket[index]; // Get the item being removed
    
            // Remove the item from the basket
            basket.splice(index, 1);
            saveItems('basket', basket);
            updateBasketSidebar();
    
            // Show confirmation message with undo option
            const confirmationMessage = document.getElementById('basketConfirmation');
            if (confirmationMessage) {
                confirmationMessage.innerHTML = `
                    ${item.name} has been removed from your Basket!
                    <button id="undoButton" class="show">
                        <i class="fas fa-undo"></i> Undo
                    </button>
                `;
                confirmationMessage.style.display = 'flex';
                confirmationMessage.style.justifyContent = 'space-between';
    
                // Show the undo button with a delay
                const undoButton = document.getElementById('undoButton');
                setTimeout(() => {
                    undoButton.classList.add('show');
                }, 100);
    
                // Add undo functionality
                undoButton.addEventListener('click', () => {
                    // Undo the removal: add the item back to the basket
                    basket.splice(index, 0, item);
                    saveItems('basket', basket);
                    updateBasketSidebar();
    
                    // Hide the confirmation message
                    confirmationMessage.style.display = 'none';
                });
    
                // Hide the confirmation message after 10 seconds
                setTimeout(() => {
                    confirmationMessage.style.display = 'none';
                }, 10000);
            }
        } else {
            console.error('Invalid index provided for removal.');
        }
    }
    
    

    // Event listeners for basket actions
    const basketButton = document.getElementById('basketButton');
    const basketSummary = document.getElementById('basketSummary');

    basketButton.addEventListener('click', () => {
        basketSummary.classList.toggle('open');
    });

    document.querySelectorAll('.add-to-basket button').forEach((button) => {
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            addToBasket(button);
        });
    });

    document.getElementById('basketItems').addEventListener('click', (event) => {
        event.stopPropagation();
        const index = parseInt(event.target.dataset.index, 10);

        if (event.target.classList.contains('quantity-increase')) {
            modifyBasketQuantity(index, 'increase');
        } else if (event.target.classList.contains('quantity-decrease')) {
            modifyBasketQuantity(index, 'decrease');
        } else if (event.target.classList.contains('basket-item-remove')) {
            removeBasketItem(index);
        }
    });

    updateBasketSidebar();
});
