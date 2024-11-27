document.addEventListener('DOMContentLoaded', () => {
    function loadItems(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    }

    function saveItems(key, items) {
        localStorage.setItem(key, JSON.stringify(items));
    }
    function addToWishlist(event) {
        const productBox = event.target.closest('.image-box'); // Get the specific product box
        const wishlistHeart = productBox.querySelector('.wishlist-heart');
        const item = {
            name: productBox.querySelector('.basket-name').textContent,
            price: productBox.querySelector('.basket-price').textContent,
            image: productBox.querySelector('img').src,
        };

        // Toggle 'active' class
        if (wishlistHeart.classList.contains('active')) {
            wishlistHeart.classList.remove('active');
            console.log(`${item.name} removed from wishlist.`);
        } else {
            wishlistHeart.classList.add('active');
            console.log(`${item.name} added to wishlist.`);
        }

        const confirmationMessage = document.getElementById('wishlistConfirmation');
        if (confirmationMessage) {
            confirmationMessage.textContent = wishlistHeart.classList.contains('active')
                ? `${item.name} has been added to your wishlist!`
                : `${item.name} has been removed from your wishlist.`;

            confirmationMessage.style.display = 'block';
            setTimeout(() => (confirmationMessage.style.display = 'none'), 4000);
        }
    }

    
    // Function to initialize the state when the page loads
    function initializeWishlistState() {
        const productBox = document.querySelector('.image-box');
        const wishlistHeart = productBox.querySelector('.wishlist-heart');
    
        // Retrieve the state from localStorage and set the 'active' class if needed
        const isActive = localStorage.getItem('wishlistActive') === 'true';
    
        if (wishlistHeart && isActive) {
            wishlistHeart.classList.add('active');
            console.log("Wishlist icon is set to active on page load.");
        }
    }
    
    // Initialize state on page load
    initializeWishlistState();
    
    // Initial event listener setup for the wishlist icon
    const wishlistIcon = document.getElementById('wishlistIcon');
    if (wishlistIcon) {
        wishlistIcon.addEventListener('click', addToWishlist);
    }
    
    
    function calculateTotal(items) {
        return items
            .reduce((total, item) => {
                const price = parseFloat(item.price.replace(/[^0-9.]/g, '')); // Remove $ or any non-numeric characters
                return total + item.quantity * price;
            }, 0)
            .toFixed(2); // Ensure the result is formatted as a decimal number
    }
    
// Attach event listeners to wishlist hearts
document.querySelectorAll('.wishlist-heart').forEach((heart) => {
    heart.addEventListener('click', addToWishlist);
});
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

            totalBalanceElement.textContent = `$${calculateTotal(basketItems)}`;
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
            existingItem.quantity += 1; // Increment quantity if the item is already in the basket
        } else {
            basket.push(item);
        }

        saveItems('basket', basket);
        updateBasketSidebar();
        alert(`${item.name} has been added to your basket!`);
        
    }

    function modifyBasketQuantity(index, action) {
        const basket = loadItems('basket');

        if (action === 'increase') {
            basket[index].quantity += 1;
        } else if (action === 'decrease' && basket[index].quantity > 1) {
            basket[index].quantity -= 1;
        } else if (action === 'decrease' && basket[index].quantity === 1) {
            basket.splice(index, 1); // Remove the item if quantity reaches 0
        }

        saveItems('basket', basket);
        updateBasketSidebar();
    }

    function removeBasketItem(index) {
        const basket = loadItems('basket');
        basket.splice(index, 1); // Remove the selected item
        saveItems('basket', basket);
        updateBasketSidebar();
    }

// Utility to load the current basket items from the collapsible sidebar
function gatherBasketItems() {
    const basketItems = document.querySelectorAll("#basketSummary #basketItems .basket-item");
    const mergedItem = {
        id: "merged-basket", // Use a unique ID for the merged item
        name: "Luxury Gift Basket (Combined)",
        price: 0,
        quantity: 0,
        image: "", // Use a representative image or first item image
        description: ""
    };

    basketItems.forEach(item => {
        // Assuming each item has data attributes and price as text content
        mergedItem.price += parseFloat(item.dataset.price) || 0;
        mergedItem.quantity += 1; // Adjust based on your basket structure

        // Optionally update the description or pick one
        mergedItem.description += (item.querySelector(".basket-description")?.textContent || "") + " ";
        
        if (!mergedItem.image && item.querySelector("img")) {
            mergedItem.image = item.querySelector("img").src; // Use the first item's image
        }
    });

    return mergedItem;
}

// Function to add the merged item to the cart
function addMergedBasketToCart() {
    const mergedItem = gatherBasketItems();
    if (mergedItem.quantity > 0) {
        addToCart(mergedItem);
        showConfirmationMessage();
    } else {
        console.error("No items found to add to cart.");
    }
}

// Function to show a confirmation message
function showConfirmationMessage() {
    const confirmationMessage = document.getElementById("confirmationMessage");
    if (confirmationMessage) {
        confirmationMessage.classList.remove("hidden");
        setTimeout(() => confirmationMessage.classList.add("hidden"), 3000); // Hide after 3 seconds
    }
}

    // Initial event listeners setup
    const basketButton = document.getElementById('basketButton');
    const basketSummary = document.getElementById('basketSummary');

    basketButton.addEventListener('click', () => {
        basketSummary.classList.toggle('open');
    });

    document.querySelectorAll('.add-to-basket button').forEach((button) => {
        button.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent event bubbling
            addToBasket(button);
        });
    });

    // Add event listener for the basket items once when the page loads
    document.getElementById('basketItems').addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent event bubbling

        const index = parseInt(event.target.dataset.index, 10);

        if (event.target.classList.contains('quantity-increase')) {
            modifyBasketQuantity(index, 'increase');
        } else if (event.target.classList.contains('quantity-decrease')) {
            modifyBasketQuantity(index, 'decrease');
        } else if (event.target.classList.contains('basket-item-remove')) {
            removeBasketItem(index);
        }
    });
  // Add an event listener for the "Add to cart" button in the sidebar
document.addEventListener("DOMContentLoaded", () => {
    const addToCartButton = document.querySelector("#basketSummary .add-to-cart button");
    if (addToCartButton) {
        addToCartButton.addEventListener("click", addMergedBasketToCart);
    }
});
    updateBasketSidebar();
});
