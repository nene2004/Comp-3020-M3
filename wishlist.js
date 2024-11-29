document.addEventListener('DOMContentLoaded', () => {
    function loadItems(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    }

    function saveItems(key, items) {
        localStorage.setItem(key, JSON.stringify(items));
    }

    function displayWishlist() {
        const wishlistItems = loadItems('wishlist');
        const wishlistContainer = document.getElementById('wishlistItems');
        
        wishlistContainer.innerHTML = ''; 

        if (wishlistItems.length > 0) {
            wishlistItems.forEach((item) => {
                const div = document.createElement('div');
                div.classList.add('wishlist-item');

                const img = document.createElement('img');
                img.src = item.image;
                img.alt = item.name;
                img.style.width = '120px';
                img.style.height = '120px';
                img.style.objectFit = 'cover';

                const itemDetails = document.createElement('div');
                itemDetails.classList.add('wishlist-item-details');
                itemDetails.innerHTML = `
                    <span class="wishlist-item-name">${item.name}</span>
                    <span class="wishlist-item-price">${item.price}</span>
                `;

                const moveButton = document.createElement('button');
                moveButton.classList.add('move-btn');
                moveButton.textContent = 'Move to Cart';

                const removeButton = document.createElement('span');
                removeButton.classList.add('wishlist-remove');
                removeButton.innerHTML = '❌'; 

                moveButton.addEventListener('click', () => {
                    moveToCart(item); // Move item to cart
                });

                removeButton.addEventListener('click', () => {
                    removeFromWishlist(item); // Remove item from wishlist
                });

                div.appendChild(img);
                div.appendChild(itemDetails);
                div.appendChild(moveButton);
                div.appendChild(removeButton);

                wishlistContainer.appendChild(div);
            });
        } else {
            const emptyMessage = document.createElement('p');
            emptyMessage.textContent = 'Your wishlist is empty.';
            wishlistContainer.appendChild(emptyMessage);
        }
    }

    function removeFromWishlist(item) {
        let wishlist = loadItems('wishlist');
        wishlist = wishlist.filter(wishItem => wishItem.name !== item.name); // Remove the item from the wishlist
        saveItems('wishlist', wishlist); // Update wishlist in localStorage
        displayWishlist(); // Re-render the wishlist
    }
    function moveToCart(item) {
        let cart = loadItems('cart');

        // Ensure the price is a number or properly formatted
        if (typeof item.price === 'string') {
            item.price = parseFloat(item.price.replace(/[^0-9.]/g, "")); // Clean the price if it's a string
        }
    
        if (isNaN(item.price)) {
            item.price = 0;  // Set to 0 if price is still invalid
        }
    
        const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({...item, quantity: 1});
        }
        saveItems('cart', cart);
        updateCartDisplay();  // Update cart display after adding item
    
        const cartConfirmation = document.getElementById("cartConfirmation");
        if (cartConfirmation) {
            cartConfirmation.textContent = `${item.name} has been moved to your cart!`;
            cartConfirmation.style.display = "block";
            setTimeout(() => {
                cartConfirmation.style.display = "none";
            }, 4000); 
        }
    }
    
    // Sorting functionality
    const sortDropdown = document.querySelector('.sort-dropdown');
    sortDropdown.addEventListener('change', (e) => {
        const wishlistItems = loadItems('wishlist');
        const value = e.target.value;

        switch (value) {
            case 'nameAZ':
                wishlistItems.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'nameZA':
                wishlistItems.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'priceLowToHigh':
                wishlistItems.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
                break;
            case 'priceHighToLow':
                wishlistItems.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
                break;
        }
        saveItems('wishlist', wishlistItems); // Save sorted wishlist
        displayWishlist(); // Re-render wishlist after sorting
    });

    displayWishlist(); // Initial rendering of wishlist
});
