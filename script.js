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

});