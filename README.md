
GEMSS - Gift Basket Web Application
Overview
GEMSS is a web-based application where users can select and customize gift baskets. It allows users to:


Add items to the basket and cart, shop pre-made gift baskets and individual items.
Review and confirm the basket contents.
Add the basket to the shopping cart for checkout.
This README will guide you through setting up and running the application.

Prerequisites
To run this application on your local machine, you will need:

A modern web browser (e.g., Google Chrome, Mozilla Firefox, Safari).
A text editor or IDE (e.g., Visual Studio Code, Sublime Text) to view or edit files.
No additional software or installation is required to run the web application because it runs directly in a web browser.

Getting Started
Step 1: Download the Project Files
Download the project folder containing all the HTML, CSS, JavaScript, and image files. Download it as a ZIP file.
Extract the ZIP file to a folder on your computer (if you downloaded it as a ZIP).
Step 2: Open the Project
Open the folder where you extracted the files.
Locate the index.html file.
Right-click on the index.html file and select Open with > [Your browser name] (e.g., Google Chrome)
The webpage should open in your browser.

Navigating the Application
Once the application is loaded in your browser:

Homepage (index.html): The user can start browsing baskets and items available for purchase.
Wishlist: Users can save baskets/items to a wishlist (accessible from the "Wishlist" link in the navigation menu).
Cart: Items in the basket can be added to the cart, and the cart summary is displayed at any time. The cart is stored locally in the browser's memory, meaning it persists even if the page is refreshed.
Custom Basket: Users can create custom baskets by adding items and reviewing the contents.
The website is designed to be responsive, meaning it will adjust to different screen sizes (mobile, tablet, desktop).

Key Features
Add to Cart: Users can add selected baskets to their cart.
Wishlist: Users can add baskets to a wishlist for later consideration.
Currency Selector: Users can switch between USD and CAD for the displayed prices.
Basket Summary: On the review page, users can see a summary of the selected basket items, their prices, and the total cost.
How It Works
Local Storage
The application uses localStorage to save data in the browser. This allows the cart and wishlist to persist across page refreshes.

Add Items to Cart: When an item is added to the cart, it is stored in the browser’s localStorage, so users can continue shopping even after refreshing the page.
Wishlist: The wishlist also uses localStorage to save items that users wish to keep for future reference.
How to Add All Items to the Cart:
Select a Basket: Choose a basket and add it to your cart.
Go to the Review Page: After selecting all the items, you will be directed to the "Review Basket" page.
Add All to Cart: Click the "Add All to Cart" button to add all selected items in your basket to the shopping cart.
Testing the Application
You can test the functionality by:

Selecting Items: Navigate through the basket selection page, choose an item, and click "Add to Basket."
Viewing Cart: Go to the cart page to view the selected items.
Refreshing the Page: The cart contents should persist even after a page refresh because the data is stored in localStorage.
Troubleshooting
1. Cart Not Showing Items
If items are not showing in the cart or basket summary, ensure you’ve clicked the "Add to Basket" button to add items to the cart. If issues persist, check the browser's localStorage to verify if data is being stored correctly.

2. Currency Not Switching
Ensure you are clicking the currency option correctly in the currency selector. If the issue persists, try refreshing the page.

3. Missing Images or Styles
Make sure all image files (e.g., logo.png, basket/b4.png) and CSS files are in the correct directories. If images are not displaying, check the image paths in the HTML.

Conclusion
That's it! You now have the GEMSS web application running locally on your computer. You can freely navigate between the different steps to create and customize your gift baskets.

License
This project is for personal or educational use only. You are free to use and modify the project as long as you credit the original author.

Contact
For any questions or issues, feel free to reach out via email at michealnene8@gmail.com.

End of README.
