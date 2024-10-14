// User login data
const username = "user123";
const password = "password123"; // Must be at least 8 characters

let loginAttempts = 0;

// Login validation
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const enteredUsername = document.getElementById("username").value;
    const enteredPassword = document.getElementById("password").value;

    if (enteredUsername === username && enteredPassword === password) {
        window.location.href = "products.html"; // Redirect to products page
    } else {
        loginAttempts++;
        document.getElementById("errorMsg").textContent = "Invalid login. Try again.";

        if (loginAttempts >= 3) {
            window.location.href = "error.html"; // Redirect to error page after 3 attempts
        }
    }
});

// Products data
const products = [
    { id: 1, name: "Iphone 16", price: 799.99 },
    { id: 2, name: "ASUS ROG G16 (2024)", price: 1399.99 },
    { id: 3, name: "Bose QuietComfort Ultra Bluetooth Headphones", price: 429.00 },
    { id: 4, name: "Apple Watch Ultra 2", price: 734.89 },
    { id: 5, name: "Samsung Galaxy Tab S10 Ultra", price: 1599.99 },
    { id: 6, name: "JBL Xtreme 3", price: 329.85 },
    { id: 7, name: "PlayStation®5", price: 499.00 },
    { id: 8, name: "DJI Mini 3 Pro", price: 899.99 },
    { id: 9, name: "SAMSUNG 55-Inch Class Neo QLED", price: 1600.00 }
];

// Function to add product to the cart
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Get the existing cart or create an empty array if null
    const product = products.find(p => p.id === productId);

    if (product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart to localStorage
        alert(`${product.name} added to cart!`);
        console.log("Product added:", product); // Log product for debugging
        console.log("Cart after adding:", cart); // Log the cart after adding
    } else {
        console.error("Product not found:", productId); // Log an error if product not found
    }
}

// Function to handle checkout
function checkout() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        alert("Your cart is empty.");
        console.log("Cart is empty at checkout.");
        return;
    }

    // Redirect to invoice page if cart is not empty
    window.location.href = "invoice.html";
}

// Function to generate the invoice on the invoice page
function generateInvoice() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        document.getElementById("invoiceDetails").innerHTML = "Your cart is empty.";
        return;
    }

    let invoiceDetails = "Invoice Summary:<br>";
    let subtotal = 0;
    let itemCount = {};

    // Count quantities of each product in the cart
    cart.forEach(product => {
        itemCount[product.id] = itemCount[product.id] ? itemCount[product.id] + 1 : 1;
    });

    // Display product details and calculate subtotal
    Object.keys(itemCount).forEach(productId => {
        const product = products.find(p => p.id == productId);
        const quantity = itemCount[productId];
        const totalProductPrice = product.price * quantity;
        invoiceDetails += `${product.name} (x${quantity}): $${totalProductPrice}<br>`;
        subtotal += totalProductPrice;
    });

    const tax = subtotal * 0.15; // 15% tax
    const grandTotal = subtotal + tax;

    // Display totals
    invoiceDetails += `<br>Subtotal: $${subtotal.toFixed(2)}<br>`;
    invoiceDetails += `Tax (15%): $${tax.toFixed(2)}<br>`;
    invoiceDetails += `<strong>Total: $${grandTotal.toFixed(2)}</strong><br>`;

    document.getElementById("invoiceDetails").innerHTML = invoiceDetails;
}

// Check if we are on the invoice page and generate invoice if true
window.onload = function() {
    if (window.location.pathname.includes("invoice.html")) {
        generateInvoice();
    }
};
