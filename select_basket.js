document.addEventListener('DOMContentLoaded', () => {

    // Load and save items from localStorage
    function loadItems(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    }

    function saveItems(key, items) {
        localStorage.setItem(key, JSON.stringify(items));
    }
 // Toggle visibility of filter/sort panel
 function toggleFilterSort() {
    const panel = document.getElementById("filterSortPanel");
    if (panel) {
        panel.style.display = panel.style.display === "none" || panel.style.display === "" ? "block" : "none";
    }
}

// Toggle categories visibility
function toggleCategories(header) {
    const categoriesContent = header.nextElementSibling; // Get the next sibling
    const arrow = header.querySelector(".arrow");

    if (categoriesContent.style.display === "none" || categoriesContent.style.display === "") {
        categoriesContent.style.display = "block";
        arrow.textContent = "▲"; // Arrow up
    } else {
        categoriesContent.style.display = "none";
        arrow.textContent = "▼"; // Arrow down
    }
}

// Toggle subcategories visibility
function toggleSubCategories(categoryId, header) {
    console.log(`Toggling Subcategory for: ${categoryId}`); // Debugging line
    const subcategories = document.getElementById(categoryId);
    const arrow = header.querySelector(".arrow");

    if (subcategories.style.display === "none" || subcategories.style.display === "") {
        subcategories.style.display = "block";
        arrow.textContent = "▲";
    } else {
        subcategories.style.display = "none";
        arrow.textContent = "▼";
    }
}

// Attach event listener for toggling main categories
const categoriesHeader = document.querySelector('.categories-container .section-header');
if (categoriesHeader) {
    categoriesHeader.addEventListener('click', toggleCategories);
}

// Attach event listeners for subcategories
const subcategoryHeaders = document.querySelectorAll(".subcategory-header");
subcategoryHeaders.forEach(header => {
    const categoryId = header.nextElementSibling?.id; // Get corresponding subcategory ID
    if (categoryId) {
        header.addEventListener("click", () => {
            toggleSubCategories(categoryId, header);
        });
    }
});

function filterBaskets() {
    console.log("Filter function triggered");
    // Collect selected filters from each category
    const occasionFilters = Array.from(document.querySelectorAll('#occasion input:checked')).map(input => input.value);
    const recipientFilters = Array.from(document.querySelectorAll('#recipient input:checked')).map(input => input.value);
    const themeFilters = Array.from(document.querySelectorAll('#theme input:checked')).map(input => input.value);

    // Get all items to filter (e.g., baskets)
    const baskets = document.querySelectorAll('.image-box');

    // Iterate through each item
    baskets.forEach(basket => {
        // Get item attributes
        const occasion = basket.getAttribute('data-occasion') || "";
        const recipient = basket.getAttribute('data-recipient') || "";
        const theme = basket.getAttribute('data-theme') || "";

        // Convert attributes to arrays
        const occasionArray = occasion.split(',').map(item => item.trim());
        const recipientArray = recipient.split(',').map(item => item.trim());
        const themeArray = theme.split(',').map(item => item.trim());

        // Check if the item matches any selected filters
        const matchesOccasion = occasionFilters.length === 0 || occasionFilters.some(filter => occasionArray.includes(filter));
        const matchesRecipient = recipientFilters.length === 0 || recipientFilters.some(filter => recipientArray.includes(filter));
        const matchesTheme = themeFilters.length === 0 || themeFilters.some(filter => themeArray.includes(filter));

        // Display item if it matches all selected filters, otherwise hide it
        if (matchesOccasion && matchesRecipient && matchesTheme) {
            basket.style.display = 'block'; // Show
        } else {
            basket.style.display = 'none'; // Hide
        }
    });
}

const inputs = document.querySelectorAll('#recipient input[type="checkbox"]');
inputs.forEach(input => {
    input.addEventListener('change', filterBaskets);
});

// Clear all filters and show all baskets
function clearFilters() {
    // Uncheck all checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);

    // Show all baskets (no filters applied)
    document.querySelectorAll('.image-box').forEach(basket => basket.style.display = 'block');
}

// Attach event listeners for filter inputs
const filterInputs = document.querySelectorAll('.filter-section input[type="checkbox"]');
filterInputs.forEach(input => {
    input.addEventListener('change', filterBaskets);
});

// Attach clear filters button event
const clearFiltersButton = document.getElementById('clearFiltersButton');
if (clearFiltersButton) {
    clearFiltersButton.addEventListener('click', clearFilters);
}
console.log("Script loaded and ready.");

// Toggle collapsible sections
function toggleCollapse(header) {
    const content = header.nextElementSibling;
    const arrow = header.querySelector(".arrow");
    if (content) {
        content.style.display = content.style.display === "none" || content.style.display === "" ? "block" : "none";
        arrow.textContent = content.style.display === "block" ? "▲" : "▼";
    }
}

// Sorting functionality (placeholder for custom logic)
function sortBaskets() {
    const sortOption = document.querySelector(".sort-section input:checked")?.value;
    if (sortOption) {
        console.log("Applied Sort:", sortOption);
        // Add your sorting logic here
    }
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
        }, 6000);
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
            const undoButtonContainer = document.getElementById('undoContainer');
            const undoButton = document.getElementById('undoButton');
            
            if (confirmationMessage) {
                confirmationMessage.innerHTML = `
                    ${item.name} has been removed from your Basket!
                `;
                confirmationMessage.style.display = 'flex';
                confirmationMessage.style.justifyContent = 'space-between';
    
                // Show the undo button inside the sidebar
                undoButtonContainer.style.display = 'block'; // Show the undo button container
    
                // Add undo functionality directly
                undoButton.addEventListener('click', () => {
                    // Undo the removal: add the item back to the basket
                    basket.splice(index, 0, item);
                    saveItems('basket', basket);
                    updateBasketSidebar();
    
                    // Hide the confirmation message and the undo button
                    confirmationMessage.style.display = 'none';
                    undoButtonContainer.style.display = 'none'; // Hide undo button
                });
    
                // Hide the confirmation message and the undo button after 10 seconds
                setTimeout(() => {
                    confirmationMessage.style.display = 'none';
                    undoButtonContainer.style.display = 'none'; // Hide undo button after timeout
                }, 8000);
            }
        } else {
            console.error('Invalid index provided for removal.');
        }
    }
    
    
    
    // Attach Event Listeners
    document.querySelector(".filter-toggle")?.addEventListener("click", toggleFilterSort);

    document.querySelectorAll(".section-header").forEach(header => {
        header.addEventListener("click", () => toggleCollapse(header));
    });

    document.querySelectorAll(".filter-section input, #min-price, #max-price").forEach(input => {
        input.addEventListener("change", filterBaskets);
    });

    document.querySelectorAll(".sort-section input").forEach(input => {
        input.addEventListener("change", sortBaskets);
    });

    document.querySelector(".clear-filters")?.addEventListener("click", clearFilters);

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
