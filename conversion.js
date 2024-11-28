function changeCurrency(currency, flag) {
    // Update the displayed flag and currency label
    const currencyIcon = document.querySelector('.currency-icon');
    const currencyLabel = document.querySelector('.currency-label');

    currencyIcon.textContent = flag;  // Change the flag icon
    currencyLabel.textContent = currency;  // Change the currency label

    // Save the selected currency to localStorage
    saveCurrency(currency);

    // Update the prices on the page based on the selected currency
    updatePrices(currency);
}

function toggleCurrencyMenu() {
    const menu = document.querySelector('.currency-menu');
    menu.classList.toggle('open');  // Toggle the visibility of the currency menu
}

// Example conversion rates (for simplicity, you can get real rates from an API)
const conversionRates = {
    USD: 1,
    CAD: 1.41
};

// Update all prices based on the selected currency
function updatePrices(currency) {
    const allItems = document.querySelectorAll('.image-box');  // Select all product items

    allItems.forEach(item => {
        const priceInUSD = parseFloat(item.getAttribute('data-price'));  // Price in USD

        let convertedPrice = 0;

        if (currency === 'USD') {
            convertedPrice = priceInUSD;  // Use the USD price
        } else if (currency === 'CAD') {
            convertedPrice = priceInUSD * conversionRates.CAD;  // Use the CAD price, multiply by the conversion rate
        }

        // Format the price to two decimal places
        const formattedPrice = convertedPrice.toFixed(2);  // Now it's a string with two decimals

        // Update the displayed price on the page
        const priceElement = item.querySelector('.basket-price');
        priceElement.textContent = `${currency === 'USD' ? '$' : '$'}${formattedPrice}`;  // Correct symbol for CAD and USD
    });
}


// Save the selected currency to localStorage
function saveCurrency(currency) {
    localStorage.setItem('selectedCurrency', currency);
}

// Load the selected currency from localStorage on page load
function loadCurrency() {
    const savedCurrency = localStorage.getItem('selectedCurrency') || 'USD';  // Default to USD if no currency is saved
    updatePrices(savedCurrency);  // Update prices based on the saved currency
    changeCurrency(savedCurrency, savedCurrency === 'USD' ? '🇺🇸' : '🇨🇦');  // Update the UI with the saved currency
}

// Call loadCurrency when the page loads to initialize the currency and prices
window.onload = loadCurrency;
