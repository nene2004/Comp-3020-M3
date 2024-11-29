document.addEventListener('DOMContentLoaded', function () {
    // Sample basket data (for testing purposes)
    let selectedBasket = {
        name: 'Deluxe Basket',
        items: [
            { name: 'Chocolate Truffles', price: 15.99, quantity: 2 },
            { name: 'Assorted Tea Set', price: 20.00, quantity: 1 },
            { name: 'Wine Glasses', price: 25.50, quantity: 1 },
        ]
    };

    // Function to render basket summary on the review page and sidebar
    function renderBasketSummary(basket) {
        let basketSummary = document.getElementById('basket-summary');
        let basketItemsList = document.getElementById('basketItems');
        let totalBalance = document.getElementById('totalBalance');
        let totalAmount = 0;

        // Clear previous content
        basketSummary.innerHTML = '';
        basketItemsList.innerHTML = '';

        // Display basket name
        let basketTitle = document.createElement('h4');
        basketTitle.textContent = basket.name;
        basketSummary.appendChild(basketTitle);

        // Loop through items and display them
        basket.items.forEach(item => {
            // Add to the review page
            let itemDiv = document.createElement('div');
            itemDiv.classList.add('basket-item');
            itemDiv.innerHTML = `
                <p><strong>${item.name}</strong></p>
                <p>Price: $${item.price.toFixed(2)}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
            `;
            basketSummary.appendChild(itemDiv);

            // Add to the sidebar
            let itemSidebarDiv = document.createElement('div');
            itemSidebarDiv.classList.add('sidebar-item');
            itemSidebarDiv.innerHTML = `
                <p><strong>${item.name}</strong></p>
                <p>Quantity: ${item.quantity}</p>
                <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
            `;
            basketItemsList.appendChild(itemSidebarDiv);

            // Update total amount
            totalAmount += item.price * item.quantity;
        });

        // Update the total balance
        totalBalance.textContent = totalAmount.toFixed(2);
    }

    // Call function to render basket summary
    renderBasketSummary(selectedBasket);

    // Add to Cart functionality
    document.getElementById('add-to-cart-button').addEventListener('click', function () {
        // Add selected basket to local storage or cart data
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(selectedBasket);

        // Save to local storage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Show a confirmation and optionally redirect
        alert('Basket added to cart!');
        window.location.href = 'cart.html'; // Redirect to cart page
    });
});
