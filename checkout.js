document.addEventListener('DOMContentLoaded', function () {
    const nameInput = document.getElementById("name");
    const addressInput = document.getElementById("address");
    const zipInput = document.getElementById("zip");  // Separate zip code input field
    const cardNumberInput = document.getElementById("card-number");
    const cvvInput = document.getElementById("cvv");

    const namePreview = document.getElementById("name-preview");
    const addressPreview = document.getElementById("address-preview");
    const zipPreview = document.getElementById("zip-preview");  // Zip code preview
    const cardNumberPreview = document.getElementById("card-number-preview");
    const cvvPreview = document.getElementById("cvv-preview");
    const cardNumberError = document.getElementById("card-number-error");
    
    // Name Validation: Only letters and apostrophes allowed
    nameInput.addEventListener("input", function () {
        const validName = nameInput.value.replace(/[^a-zA-Z\s']/g, ''); // Allow letters, spaces, and apostrophes
        nameInput.value = validName;  // Update the input field
        namePreview.textContent = `Name Preview: ${validName}`;  // Update preview
    });

    // Address Validation (Street Address): Allow alphanumeric, spaces, commas, and basic punctuation
    addressInput.addEventListener("input", function () {
        let formattedAddress = addressInput.value.replace(/[^a-zA-Z0-9\s,.'-]/g, '');  // Allow letters, numbers, spaces, commas, periods, apostrophes, and hyphens
        addressInput.value = formattedAddress;  // Update the input field
        addressPreview.textContent = `Address Preview: ${formattedAddress}`;  // Update preview
    });

    // Zip Code / Postal Code Validation (Postal Code for Canada, Zip Code for US)
    zipInput.addEventListener("input", function () {
        const country = document.getElementById("country").value;
        let formattedZip = zipInput.value.toUpperCase();

        if (country === 'CA') { // Canada: Postal Code Format (A1A 1A1)
            formattedZip = formattedZip.replace(/[^A-Z0-9]/g, '').slice(0, 6); // Remove non-alphanumeric characters
            if (formattedZip.length >= 3) {
                formattedZip = formattedZip.slice(0, 3) + ' ' + formattedZip.slice(3, 6); // Format it correctly
            }
        } else if (country === 'US') { // United States: Zip Code Format (12345)
            formattedZip = formattedZip.replace(/[^0-9]/g, '').slice(0, 5); // Only digits allowed for zip code
        }

        zipInput.value = formattedZip;  // Update the input field
        zipPreview.textContent = `Zip/Postal Code Preview: ${formattedZip}`;  // Update preview
    });

    // CVV Validation: Only 3 digits allowed
    cvvInput.addEventListener("input", function () {
        const validCVV = cvvInput.value.replace(/[^0-9]/g, '');  // Only digits allowed
        if (validCVV.length > 3) {
            cvvInput.value = validCVV.slice(0, 3);  // Restrict to 3 digits
        } else {
            cvvInput.value = validCVV;  // Update the input field
        }
        cvvPreview.textContent = `CVV Preview: ${validCVV}`;  // Update preview
    });
// Card Number Validation: Only 16 digits allowed
 // Card Number Validation: Only 16 digits allowed
 cardNumberInput.addEventListener("input", function () {
    let validCardNumber = cardNumberInput.value.replace(/[^0-9]/g, ''); // Only digits allowed

    // If the length exceeds 16, slice it to the first 16 digits
    if (validCardNumber.length > 16) {
        validCardNumber = validCardNumber.slice(0, 16);
    }

    // Set the input field value to the valid card number
    cardNumberInput.value = validCardNumber;

    // Update the card number preview
    cardNumberPreview.textContent = `Card Number Preview: ${validCardNumber}`;

    // Show error message if the card number is not exactly 16 digits
    if (validCardNumber.length !== 16) {
        cardNumberError.style.display = 'block';  // Show error message
        submitButton.disabled = true;  // Disable submit button
    } else {
        cardNumberError.style.display = 'none';  // Hide error message
        submitButton.disabled = false;  // Enable submit button
    }
});

    // Handle form submission
    const checkoutForm = document.getElementById('checkout-form');
    checkoutForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent form submission

        // Show the Thank You message
        document.getElementById('checkout-container').style.display = 'none';
        document.getElementById('thank-you-container').style.display = 'block';

        // Optionally: Clear cart data from localStorage after checkout
        localStorage.removeItem('cart');
        localStorage.removeItem('cartTotal');
    });

    // Retrieve cart data from localStorage for order summary (your existing code)
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartTotal = 0;

    const orderItemsContainer = document.getElementById('order-items');
    const orderTotalElement = document.getElementById('order-total');

    if (cart.length === 0) {
        orderItemsContainer.innerHTML = '<p>Your cart is empty!</p>';
        orderTotalElement.textContent = '0.00';
    } else {
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('order-item');
            
            // Image section for preview
            itemElement.innerHTML = `
                <div class="order-item-image">
                    <img src="${item.image}" alt="${item.name}" width="100" height="100"> <!-- Image of the item -->
                </div>
                <p>${item.name} x ${item.quantity}</p>
                <p>$${(item.price * item.quantity).toFixed(2)}</p>
            `;
            orderItemsContainer.appendChild(itemElement);
            cartTotal += item.price * item.quantity;
        });

        orderTotalElement.textContent = `$${cartTotal.toFixed(2)}`;
    }
});
