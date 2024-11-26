document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the saved basket name from localStorage
    const savedBasketName = localStorage.getItem('basketName') || "🛒 Basket"; // Default if no name is saved

    // Update the sidebar toggle button with the saved name
    const basketButton = document.getElementById('basketButton');
    basketButton.textContent = savedBasketName; // Update button text with the saved name

    // Update the Basket Summary section
    const basketSummary = document.getElementById('basketSummary');
    if (basketSummary) {
        basketSummary.textContent = savedBasketName; // Update summary with the saved name
    }

    // Set initial layout class (if none is set yet)
    const grid = document.getElementById('basketGrid');
    if (!grid.classList.contains('horizontal-layout') && !grid.classList.contains('vertical-layout')) {
        grid.classList.add('vertical-layout'); // Default layout
    }
});
function toggleSidebar() {
    const sidebar = document.getElementById('basketSidebar');
    sidebar.classList.toggle('open');
}



function toggleLayout() {
    const grid = document.getElementById('basketGrid');
    
    // Toggle between horizontal and vertical layout classes
    if (grid.classList.contains('horizontal-layout')) {
        grid.classList.remove('horizontal-layout');
        grid.classList.add('vertical-layout');
    } else {
        grid.classList.remove('vertical-layout');
        grid.classList.add('horizontal-layout');
    }
}

function filterBaskets() {
    const filter = document.getElementById('basket-filter').value;
    const baskets = document.querySelectorAll('.image-box');

    baskets.forEach(basket => {
        if (filter === 'all' || basket.classList.contains(filter)) {
            basket.style.display = 'block';
        } else {
            basket.style.display = 'none';
        }
    });
}

function sortBaskets() {
    const sortOption = document.getElementById('sort-options').value;
    const grid = document.getElementById('basketGrid');
    const baskets = Array.from(grid.children);

    baskets.sort((a, b) => {
        const priceA = parseFloat(a.querySelector('.basket-price').textContent.replace(/[^0-9.-]+/g, ''));
        const priceB = parseFloat(b.querySelector('.basket-price').textContent.replace(/[^0-9.-]+/g, ''));
        const nameA = a.querySelector('.basket-name').textContent;
        const nameB = b.querySelector('.basket-name').textContent;

        if (sortOption === 'price-asc') return priceA - priceB;
        if (sortOption === 'price-desc') return priceB - priceA;
        if (sortOption === 'name') return nameA.localeCompare(nameB);
    });

    baskets.forEach(basket => grid.appendChild(basket));
}

function clearFilters() {
    document.getElementById('basket-filter').value = 'all';
    document.getElementById('sort-options').value = 'price-asc';
    filterBaskets();
}
function toggleWishlist(icon) {
    // Toggle the 'active' class to change the heart's color
    icon.classList.toggle('active');

    // Optionally, here you can add logic to handle the wishlist functionality
    if (icon.classList.contains('active')) {
        // Add the item to the wishlist
        console.log('Item added to wishlist');
        // Example: You can store the item ID in localStorage or update the UI with the wishlist count.
    } else {
        // Remove the item from the wishlist
        console.log('Item removed from wishlist');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the saved basket name from localStorage
    const savedBasketName = localStorage.getItem('basketName') || "🛒 Basket"; // Default if no name is saved

    // Update the sidebar toggle button with the saved name
    const basketButton = document.getElementById('basketButton');
    basketButton.textContent = savedBasketName; // Update button text with the saved name

    // Update the Basket Summary section
    const basketSummary = document.getElementById('basketSummary');
    if (basketSummary) {
        basketSummary.textContent = savedBasketName; // Update summary with the saved name
    }

    // Set initial layout class (if none is set yet)
    const grid = document.getElementById('basketGrid');
    if (!grid.classList.contains('horizontal-layout') && !grid.classList.contains('vertical-layout')) {
        grid.classList.add('vertical-layout'); // Default layout
    }
});

function toggleLayout() {
    // Switch between grid and list view
    const basketGrid = document.getElementById('basketGrid');
    basketGrid.classList.toggle('list-view');
}

function addToWishlist(icon) {
    // Toggle heart color when clicked
    icon.classList.toggle('active');
    
    // Show confirmation message
    const confirmationMessage = icon.parentElement.querySelector('.wishlist-confirmation');
    confirmationMessage.style.display = 'block';

    // After 3 seconds, hide the confirmation
    setTimeout(() => {
        confirmationMessage.style.display = 'none';
    }, 3000);

    // Example of adding item to wishlist.html
    const item = {
        name: icon.parentElement.querySelector('.basket-name').innerText,
        price: icon.parentElement.querySelector('.basket-price').innerText,
        image: icon.parentElement.querySelector('img').src,
    };

    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist.push(item);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function filterBaskets() {
    const filterValue = document.getElementById('basket-filter').value;
    // Implement your filtering logic here based on the selected category
}

function sortBaskets() {
    const sortValue = document.getElementById('sort-options').value;
    // Implement your sorting logic here based on the selected option
}

function clearFilters() {
    document.getElementById('basket-filter').value = 'all';
    document.getElementById('sort-options').value = 'price-asc';
    // Reset baskets here to their original state
}
