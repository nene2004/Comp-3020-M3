document.addEventListener('DOMContentLoaded', () => {
    function loadItems(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    }

    function displayWishlist() {
        const wishlistItems = loadItems('wishlist');
        const wishlistContainer = document.getElementById('wishlistItems');

        wishlistContainer.innerHTML = '';

        if (wishlistItems.length > 0) {
            wishlistItems.forEach((item) => {
                const div = document.createElement('div');
                div.classList.add('wishlist-item');
                div.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="wishlist-item-image">
                    <div class="wishlist-item-details">
                        <span class="wishlist-item-name">${item.name}</span>
                        <span class="wishlist-item-price">${item.price}</span>
                    </div>
                `;
                wishlistContainer.appendChild(div);
            });
        } else {
            const emptyMessage = document.createElement('p');
            emptyMessage.textContent = 'Your wishlist is empty.';
            wishlistContainer.appendChild(emptyMessage);
        }
    }

    displayWishlist();
});
