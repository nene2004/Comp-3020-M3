document.addEventListener('DOMContentLoaded', () => {
    const sortDropdown = document.querySelector('.sort-dropdown');
    const wishlistContainer = document.getElementById('wishlistItems');

    function loadItems(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    }

    function addToWishlist(item) {
        const wishlist = loadItems('wishlist');
        // Assign a unique ID if the item doesn't already have one
        if (!item.id) {
            item.id = new Date().getTime(); // Generates a unique ID based on the current timestamp
        }
        wishlist.push(item);
        saveItems('wishlist', wishlist);
    }

    function saveItems(key, items) {
        localStorage.setItem(key, JSON.stringify(items));
    }

    function formatCurrency(amount) {
        if (typeof amount !== "number") {
            amount = parseFloat(amount.toString().replace(/[^0-9.]/g, "")); // Strip extra characters
        }
        return `$${amount.toFixed(2)}`;  // Format as currency
    }

    if (sortDropdown) {
        sortDropdown.addEventListener('change', (e) => {
            const wishlistItems = loadItems('wishlist');
            const value = e.target.value;

            // Parse prices as numbers for sorting
            const sanitizedItems = wishlistItems.map(item => ({
                ...item,
                price: typeof item.price === 'string'
                    ? parseFloat(item.price.replace(/[^0-9.]/g, "")) // Ensure price is a number
                    : item.price
            }));

            switch (value) {
                case 'nameAZ':
                    sanitizedItems.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'nameZA':
                    sanitizedItems.sort((a, b) => b.name.localeCompare(a.name));
                    break;
                case 'priceLowToHigh':
                    sanitizedItems.sort((a, b) => a.price - b.price);
                    break;
                case 'priceHighToLow':
                    sanitizedItems.sort((a, b) => b.price - a.price);
                    break;
            }

            saveItems('wishlist', sanitizedItems); // Save sorted wishlist
            displayWishlist(); // Re-render wishlist after sorting
        });
    } else {
        console.error('Sort dropdown not found in the DOM');
    }

    function displayWishlist() {
        const wishlistItems = loadItems('wishlist');

        // Check if the wishlist container exists before trying to update its content
        if (!wishlistContainer) {
            console.error('Wishlist container not found in the DOM');
            return;
        }

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
                    <span class="wishlist-item-price">${formatCurrency(item.price)}</span> <!-- Format price here -->
                `;

                // Remove the "Move to Cart" button and related functionality
                const removeButton = document.createElement('span');
                removeButton.classList.add('wishlist-remove');
                removeButton.innerHTML = '❌'; 

                removeButton.addEventListener('click', () => {
                    removeFromWishlist(item); // Remove item from wishlist
                });

                div.appendChild(img);
                div.appendChild(itemDetails);
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

    displayWishlist(); // Initial rendering of wishlist
});
