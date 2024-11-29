document.addEventListener('DOMContentLoaded', () => {
    function loadItems(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    }

    function displayWishlist() {
        const wishlistItems = loadItems('wishlist');
        const wishlistContainer = document.getElementById('wishlistItems');

        wishlistContainer.innerHTML = ''; // Clear container first

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

                // Create the 'X' button instead of the heart
                const removeButton = document.createElement('span');
                removeButton.classList.add('wishlist-remove');
                removeButton.innerHTML = '❌'; // Red X character

                removeButton.addEventListener('click', () => {
                    removeFromWishlist(item);
                });

                div.appendChild(img);
                div.appendChild(itemDetails);
                div.appendChild(moveButton);
                div.appendChild(removeButton); // Append the 'X' button instead of heart

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
        wishlist = wishlist.filter(wishItem => wishItem.name !== item.name); // Remove the item by name
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        displayWishlist(); // Re-display the wishlist after removal
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
                wishlistItems.sort((a, b) => {
                    // Convert price to float for comparison
                    return parseFloat(a.price.replace(/[^\d.-]/g, '')) - parseFloat(b.price.replace(/[^\d.-]/g, ''));
                });
                break;
            case 'priceHighToLow':
                wishlistItems.sort((a, b) => {
                    // Convert price to float for comparison
                    return parseFloat(b.price.replace(/[^\d.-]/g, '')) - parseFloat(a.price.replace(/[^\d.-]/g, ''));
                });
                break;
        }
        localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
        displayWishlist(); // Re-display the sorted wishlist
    });

    displayWishlist();
});
