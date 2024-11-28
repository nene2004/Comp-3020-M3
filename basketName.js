document.addEventListener('DOMContentLoaded', () => {
    const basketNameInput = document.getElementById('basket-name');
    const charCounter = document.getElementById('char-counter');
    const basketPreview = document.querySelector('.basket-name-preview');
    const feedback = document.getElementById('feedback');
    const resetButton = document.getElementById('reset-basket');
    const confirmationMessage = document.getElementById('confirmationMessage');

    // Load the basket name from localStorage on page load
    const savedBasketName = localStorage.getItem('basketName');
    if (savedBasketName) {
        basketNameInput.value = savedBasketName;
        basketPreview.textContent = savedBasketName;
        const remainingChars = 25 - savedBasketName.length;
        charCounter.textContent = `${remainingChars} characters remaining`;
    } else {
        basketPreview.textContent = "Your Basket Name Here";
        charCounter.textContent = "25 characters remaining";
    }

    // Handle input event for live feedback
    basketNameInput.addEventListener('input', () => {
        const name = basketNameInput.value.trim();

        // Check for invalid characters
        if (/[^a-zA-Z\s]/.test(name)) {
            feedback.textContent = "Only letters and spaces are allowed!";
            feedback.style.color = "red";
            basketNameInput.value = name.replace(/[^a-zA-Z\s]/g, ''); // Remove invalid characters
            return;
        }

        const remainingChars = 25 - name.length;
        charCounter.textContent = `${remainingChars} characters remaining`;

        // Update the live preview
        basketPreview.textContent = name || "Your Basket Name Here";

        // Error handling
        if (remainingChars < 0) {
            charCounter.style.color = "red";
            feedback.textContent = "Character limit exceeded!";
            feedback.style.color = "red";
        } else if (name.length < 3 && name.length > 0) {
            charCounter.style.color = "";
            feedback.textContent = "Basket name must be at least 3 characters long.";
            feedback.style.color = "orange";
        } else {
            charCounter.style.color = "";
            feedback.textContent = "Name looks good!";
            feedback.style.color = "green";
        }
    });

    // Handle "Enter" key press to save name
    basketNameInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const name = basketNameInput.value.trim();

            // Prevent submission if invalid
            if (/[^a-zA-Z\s]/.test(name)) {
                feedback.textContent = "Invalid name! Only letters and spaces are allowed.";
                feedback.style.color = "red";
                event.preventDefault();
                return;
            }

            if (name.length >= 3 && name.length <= 25) {
                localStorage.setItem('basketName', name); // Save the basket name
                basketPreview.textContent = name; // Update preview
                feedback.textContent = ""; // Clear feedback message
                charCounter.textContent = "25 characters remaining"; // Reset character count

                // Clear the input field and remove keyboard focus
                basketNameInput.value = "";
                basketNameInput.blur(); // Clear keyboard focus

                // Show confirmation message
                confirmationMessage.textContent = `Your basket name "${name}" has been saved!`;
                confirmationMessage.style.display = 'block';
                setTimeout(() => {
                    confirmationMessage.style.display = 'none';
                }, 4000);
            } else {
                feedback.textContent = "Please enter a valid basket name (3-25 characters).";
                feedback.style.color = "red";
            }

            event.preventDefault();
        }
    });

    // Handle "Proceed to Next Step" button click
    document.querySelector('.proceed-button').addEventListener('click', (event) => {
        const basketName = basketNameInput.value.trim();

        // Prevent form submission
        event.preventDefault();

        // Validate name
        if (/[^a-zA-Z\s]/.test(basketName)) {
            alert('Invalid name! Only letters and spaces are allowed.');
            return;
        }

        if (basketName === "") {
            // If the name is empty, proceed without saving any name
            localStorage.removeItem('basketName');
            window.location.href = 'select_basket.html'; // Redirect to Step 2
        } else if (basketName.length >= 3 && basketName.length <= 25) {
            // If the name is valid, save it and proceed
            localStorage.setItem('basketName', basketName); // Save the basket name
            window.location.href = 'select_basket.html'; // Redirect to Step 2
        }
    });

    // Option to reset the basket name
    resetButton.addEventListener('click', () => {
        // Clear the basket name input and reset the local storage
        basketNameInput.value = "";
        basketPreview.textContent = "Your Basket Name Here"; // Reset preview to default
        feedback.textContent = "";
        charCounter.textContent = "25 characters remaining";
        localStorage.removeItem('basketName'); // Remove the basket name from localStorage
        basketNameInput.blur(); // Clear keyboard focus
    });
});
