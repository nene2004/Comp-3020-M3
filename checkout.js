document.addEventListener('DOMContentLoaded', function () {
    // Retrieve cart data from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartTotal = parseFloat(localStorage.getItem('cartTotal')) || 0;

    // Get the order-items and order-total elements
    const orderItemsContainer = document.getElementById('order-items');
    const orderTotalElement = document.getElementById('order-total');

    // If the cart is empty, show a message
    if (cart.length === 0) {
        orderItemsContainer.innerHTML = '<p>Your cart is empty!</p>';
        orderTotalElement.textContent = '0.00';
        return;
    }

    // Loop through the cart items and display them
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('order-item');
        
        // Create the image element with desired size and styling
        const img = document.createElement('img');
        img.src = item.image; // Image URL from the cart item
        img.alt = item.name; // Alt text for accessibility
        img.style.width = '120px'; // Image size 120px by 120px
        img.style.height = '120px';
        img.style.objectFit = 'cover'; // Ensures the image fits the box without distortion

        // Create the details div for the order item
        const itemDetailsDiv = document.createElement('div');
        itemDetailsDiv.classList.add('order-item-details');

        // Populate the item details with item info
        itemDetailsDiv.innerHTML = `
            <p><strong>${item.name}</strong></p>
            <p>Price: $${item.price.toFixed(2)}</p>
            <p>Quantity: ${item.quantity}</p>
            <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
        `;

        // Append the image and details div to the itemDiv
        itemDiv.appendChild(img); // Append image first
        itemDiv.appendChild(itemDetailsDiv); // Append item details second
        
        // Append the itemDiv to the order items container
        orderItemsContainer.appendChild(itemDiv);
    });
    // Update the total price
    orderTotalElement.textContent = cartTotal.toFixed(2);

    // Handle form validation
    const checkoutForm = document.getElementById('checkout-form');

    checkoutForm.addEventListener('submit', function (e) {
        // Validate Card Number (16 digits)
        const cardNumber = document.getElementById('card-number').value;
        if (!/^\d{16}$/.test(cardNumber)) {
            alert('Please enter a valid 16-digit card number.');
            e.preventDefault();
            return;
        }

        // Validate ZIP Code (5 digits)
        const zipCode = document.getElementById('zip').value;
        if (!/^\d{5}$/.test(zipCode)) {
            alert('Please enter a valid 5-digit ZIP code.');
            e.preventDefault();
            return;
        }

        // Validate Cardholder Name
        const cardholderName = document.getElementById('name').value.trim();
        if (cardholderName === '') {
            alert('Please enter the cardholder name.');
            e.preventDefault();
            return;
        }
    });
    checkoutForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent form submission

        // Show the Thank You message
        document.getElementById('checkout-container').style.display = 'none';
        document.getElementById('thank-you-container').style.display = 'block';

        // Clear cart data from localStorage (optional)
        localStorage.removeItem('cart');
        localStorage.removeItem('cartTotal');
    });
    
});
