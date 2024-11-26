document.addEventListener('DOMContentLoaded', () => {
    const basketNameInput = document.getElementById('basket-name');
    const charCounter = document.getElementById('char-counter');
    const basketPreview = document.querySelector('.basket-name-preview');
    const feedback = document.getElementById('feedback');
    const resetButton = document.getElementById('reset-basket');
    // Handle input event for live feedback
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

    // Handle "Enter" key press to show confirmation but NOT redirect
    basketNameInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const name = basketNameInput.value.trim();
            if (name.length >= 3 && name.length <= 25) {
                localStorage.setItem('basketName', name); // Save the basket name
                alert(`Your basket name "${name}" has been saved!`);

                // Clear the input field after submission but keep the name previewed
                basketNameInput.value = ""; // Clear the input field
                basketPreview.textContent = name || "Your Basket Name Here"; // Keep the name in preview
                feedback.textContent = ""; // Reset feedback message
                charCounter.textContent = "25 characters remaining"; // Reset character count
            } else {
                alert('Please enter a valid basket name (3-25 characters).');
            }

            // Prevent the default form submission action
            event.preventDefault();
        }
    });

    // Handle "Proceed to Next Step" button click
    document.querySelector('.proceed-button').addEventListener('click', (event) => {
        const basketName = basketNameInput.value.trim();
        
        // Prevent form submission if it exists
        event.preventDefault();

        if (basketName === "") {
            // If the name is empty, proceed without saving any name
            localStorage.removeItem('basketName');
            window.location.href = 'select_basket.html'; // Redirect to Step 2
        } else if (basketName.length >= 3 && basketName.length <= 25) {
            // If the name is valid, save it and show confirmation
            localStorage.setItem('basketName', basketName); // Save the basket name
            alert(`Your basket name "${basketName}" has been saved!`);
            window.location.href = 'select_basket.html'; // Redirect to Step 2
        } else {
            // If the name is not valid, show an error message
            alert('Please enter a valid basket name (3-25 characters).');
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
    });
    
});
