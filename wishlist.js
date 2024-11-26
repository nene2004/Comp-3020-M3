// Sample Data for Wishlist
const baskets = [
    { id: 1, name: 'Small Basket', category: 'gift', price: 20, img: 'b2.png' },
    { id: 2, name: 'Holiday Basket', category: 'holiday', price: 25, img: 'b3.png' },
    { id: 3, name: 'Custom Basket', category: 'custom', price: 30, img: 'b4.png' },
    { id: 4, name: 'Large Basket', category: 'gift', price: 50, img: 'b2.png' },
];

// Wishlist data (to store items that the user has added to their wishlist)
let wishlist = [];

// Function to display items in the wishlist
function displayWishlist() {
    const container = document.getElementById('wishlist-container');
    container.innerHTML = ''; // Clear existing items

    wishlist.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('wishlist-item');

        itemElement.innerHTML = `
            <div class="wishlist-heart" onclick="toggleWishlist(${item.id})">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="none" stroke="black" stroke-width="2"/>
                </svg>
            </div>
            <img src="${item.img}" alt="${item.name}">
            <p>${item.name}</p>
            <p>Price: $${item.price} CAD</p>
            <button class="add-to-cart" onclick="addToCart(${item.id})">Add to Cart</button>
        `;
        
        container.appendChild(itemElement);
    });
}

// Toggle Wishlist item (Add/Remove)
function toggleWishlist(id) {
    const index = wishlist.findIndex(item => item.id === id);
    if (index === -1) {
        const basketItem = baskets.find(item => item.id === id);
        wishlist.push(basketItem);
    } else {
        wishlist.splice(index, 1);
    }

    displayWishlist();
}

// Add item to Cart (Placeholder function)
function addToCart(id) {
    console.log(`Item ${id} added to cart.`);
}

// Filter Wishlist by Category
function filterWishlist() {
    const filterValue = document.getElementById('filter-options').value;
    const filteredBaskets = baskets.filter(item => filterValue === 'all' || item.category === filterValue);
    wishlist = wishlist.filter(item => filteredBaskets.includes(item));
    displayWishlist();
}

// Sort Wishlist Items
function sortWishlist() {
    const sortValue = document.getElementById('sort-options').value;
    if (sortValue === 'price-asc') {
        wishlist.sort((a, b) => a.price - b.price);
    } else if (sortValue === 'price-desc') {
        wishlist.sort((a, b) => b.price - a.price);
    } else if (sortValue === 'name') {
        wishlist.sort((a, b) => a.name.localeCompare(b.name));
    }

    displayWishlist();
}

// Toggle Layout between grid and list
function toggleLayout() {
    const container = document.getElementById('wishlist-container');
    container.classList.toggle('list-layout');
}

// Initialize the page by displaying wishlist
displayWishlist();
