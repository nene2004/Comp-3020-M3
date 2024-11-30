document.addEventListener("DOMContentLoaded", () => {
    // Select all the rating stars by class
    const ratingStars = document.querySelectorAll(".rating-stars .star");
    const submitButton = document.getElementById("submit-rating");
    const userComment = document.getElementById("user-comment");
    const ratingMessage = document.getElementById("rating-message");

    let selectedRating = 0;

    // Handle hover effect on stars
    ratingStars.forEach((star, index) => {
        star.addEventListener("mouseover", () => {
            // Highlight all stars up to the hovered one
            ratingStars.forEach((s, i) => {
                s.classList.toggle("hovered", i <= index);
            });
        });

        star.addEventListener("mouseout", () => {
            // Remove hover effect
            ratingStars.forEach((s) => s.classList.remove("hovered"));
        });
    });

    // Handle click to select rating
    ratingStars.forEach((star, index) => {
        star.addEventListener("click", () => {
            // Set the selected rating
            selectedRating = index + 1;

            // Highlight all stars up to the clicked one
            ratingStars.forEach((s, i) => {
                s.classList.toggle("selected", i < selectedRating);
            });
        });
    });

    // Handle submit button click
    if (submitButton) {
        submitButton.addEventListener("click", () => {
            const comment = userComment.value.trim();

            // Check if rating is selected and comment is provided
            if (selectedRating === 0 || comment === "") {
                alert("Please provide a rating and comment.");
            } else {
                // Optionally, you can log the feedback to the console or send it to a server
                console.log("Rating:", selectedRating);
                console.log("Comment:", comment);

                // Show feedback confirmation message
                ratingMessage.textContent = "Thank you for your feedback!";
                ratingMessage.style.display = "block";

                // Reset form
                userComment.value = "";
                selectedRating = 0;
                ratingStars.forEach((s) => s.classList.remove("selected"));
            }
        });
    }
});
