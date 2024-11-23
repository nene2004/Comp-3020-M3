let currentSlideIndex = 0;
const slides = document.querySelectorAll('.background-slideshow .slide');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function changeSlide(step) {
    currentSlideIndex = (currentSlideIndex + step + slides.length) % slides.length;
    showSlide(currentSlideIndex);
}

// Initial setup
showSlide(currentSlideIndex);

// Auto-transition every 5 seconds
setInterval(() => changeSlide(1), 5000);

// Currency change
document.addEventListener('DOMContentLoaded', () => {
    const currencySelector = document.querySelector('.currency-selector');
    
    function toggleCurrencyMenu() {
        currencySelector.classList.toggle('open');
    }

    function changeCurrency(currency, flag) {
        const icon = currencySelector.querySelector('.currency-icon');
        const label = currencySelector.querySelector('.currency-label');
        
        icon.textContent = flag;
        label.textContent = currency;

        label.classList.add('smaller');
        currencySelector.classList.remove('open');
    }

    document.addEventListener('click', (event) => {
        if (!currencySelector.contains(event.target) && !event.target.closest('.currency-selector')) {
            currencySelector.classList.remove('open');
        }
    });

    currencySelector.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    currencySelector.addEventListener('click', toggleCurrencyMenu);

    const currencyMenuItems = currencySelector.querySelectorAll('.currency-menu li');
    currencyMenuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const selectedCurrency = e.target.textContent;
            const selectedFlag = e.target.dataset.flag; 
            changeCurrency(selectedCurrency, selectedFlag);
        });
    });

    // Basket name functionality
    const basketNameInput = document.getElementById('basket-name');
    const charCounter = document.getElementById('char-counter');
    const basketPreview = document.querySelector('.basket-name-preview');
    const feedback = document.getElementById('feedback');

    basketNameInput.addEventListener('input', () => {
        const remainingChars = 25 - basketNameInput.value.length;
        charCounter.textContent = `${remainingChars} characters remaining`;

        // Update the live preview
        const name = basketNameInput.value.trim();
        basketPreview.textContent = name || "Your Basket Name Here";

        // Error handling
        if (remainingChars < 0) {
            charCounter.style.color = "red";
            feedback.textContent = "Character limit exceeded!";
            feedback.style.color = "red";
        } else if (name.length < 3) {
            charCounter.style.color = "";
            feedback.textContent = "Basket name must be at least 3 characters long.";
            feedback.style.color = "orange";
        } else {
            charCounter.style.color = "";
            feedback.textContent = "Name looks good!";
            feedback.style.color = "green";
        }
    });

    // Confirmation handling on submit
    const basketForm = document.querySelector('.basket-form');
    basketForm.addEventListener('submit', (event) => {
        const name = basketNameInput.value.trim();
        if (name.length < 3 || name.length > 25) {
            event.preventDefault();
            alert("Please ensure the basket name is between 3 and 25 characters.");
        } else {
            alert(`Your basket name "${name}" has been saved!`);
        }
    });

    // Remove button functionality
    document.querySelectorAll('.remove-button').forEach(button => {
        button.addEventListener('click', event => {
            const cartItem = event.target.closest('.cart-item');
            cartItem.remove();
            // Add code to recalculate subtotal here
        });
    });
});
