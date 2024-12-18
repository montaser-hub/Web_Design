// DOM Elements
const title = document.getElementById("title");
const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");
const total = document.getElementById("total");
const count = document.getElementById("count");
const category = document.getElementById("category");
const submit = document.getElementById("submit");
const tbody = document.getElementById("tbody");
const deleteAllBtn = document.getElementById("deleteAll");
const search = document.getElementById("search");

// Application State Variables
let formMode = "create"; // 'create' for adding new product, 'update' for editing an existing one
let editIndex; // Holds the index of the product being edited
let products = JSON.parse(localStorage.getItem("product")) || []; // Load products from localStorage or an empty array
let searchMode = "title"; // Default search mode (search by title)

// Function to calculate and display the total price
function getTotal() {
  if (price.value && taxes.value && ads.value) {
    const result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040"; // Green background for valid total
  } else {
    total.innerHTML = "Total: 0";
    total.style.background = "#a00d02"; // Red background if any required input is missing
  }
}

// Function to clear all input fields after submission
function clearInputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "Total: 0";
  count.value = "";
  category.value = "";
}

// Function to save the products list to localStorage
function saveProducts() {
  localStorage.setItem("product", JSON.stringify(products));
}

// Function to display the product table
function displayProducts() {
  tbody.innerHTML = products
    .map((product, i) => generateTableRow(product, i))
    .join("");

  // Display the "Delete All" button if there are products
  deleteAllBtn.innerHTML = products.length
    ? `<button onclick="deleteAllProducts()">Delete All (${products.length})</button>`
    : "";
}

// Helper function to generate table rows for products
function generateTableRow(product, index) {
  return `
    <tr>
      <td>${index + 1}</td>
      <td>${product.title || "No Title"}</td>
      <td>${product.price || "N/A"}</td>
      <td>${product.taxes || "N/A"}</td>
      <td>${product.ads || "N/A"}</td>
      <td>${product.discount || "N/A"}</td>
      <td>${product.total || "N/A"}</td>
      <td>${product.category || "No Category"}</td>
      <td><button onclick="editProduct(${index})">Edit</button></td>
      <td><button onclick="deleteProduct(${index})">Delete</button></td>
    </tr>
  `;
}

// Event listener for the submit button to add or update a product
submit.addEventListener("click", (e) => {
  e.preventDefault();

  const newProduct = {
    title: title.value.trim().toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.trim().toLowerCase(),
  };

  if (title.value && price.value && category.value) {
    if (formMode === "create") {
      for (let i = 0; i < (newProduct.count || 1); i++) {
        products.push(newProduct);
      }
    } else {
      products[editIndex] = newProduct;
      formMode = "create"; // Reset mode back to 'create'
      submit.innerHTML = "Create"; // Reset button text to 'Create'
      count.style.display = "block"; // Show 'count' input again for new products
      countLabel.style.display = "block"; // Show 'count' input again for new products
    }

    clearInputs();
    saveProducts();
    displayProducts();
  }
});

// Function to edit a product
function editProduct(index) {
  const product = products[index];
  title.value = product.title;
  price.value = product.price;
  taxes.value = product.taxes;
  ads.value = product.ads;
  discount.value = product.discount;
  category.value = product.category;

  getTotal(); // Recalculate and display the total price

  // Hide the 'count' input field when editing an existing product
  count.style.display = "none"; // This hides the count field
  countLabel.style.display = "none"; // This hides the count field
  submit.innerHTML = "Update"; // Change the submit button to 'Update'
  formMode = "update"; // Set mode to 'update'
  editIndex = index; // Save the index of the product being edited
  window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top of page for better UX
}

// Function to delete a product
function deleteProduct(index) {
  products.splice(index, 1); // Remove the product from the array
  saveProducts(); // Save the updated products list to localStorage
  displayProducts(); // Re-render the product list
}

// Function to delete all products
function deleteAllProducts() {
  products = []; // Clear the products array
  saveProducts(); // Save the empty array to localStorage
  displayProducts(); // Re-render the empty product list
}

// Search products with a debounce for performance optimization
let debounceTimer;

function searchProducts(query) {
  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    if (query.trim() === "") {
      return displayProducts(); // If the search query is empty, show all products
    }

    const filteredProducts = products.filter((product) => {
      const searchQuery = query.toLowerCase();
      return searchMode === "title"
        ? product.title.includes(searchQuery)
        : product.category.includes(searchQuery);
    });

    tbody.innerHTML = filteredProducts
      .map((product, i) => generateTableRow(product, i))
      .join(""); // Display the filtered list of products
  }, 300); // Wait for user to stop typing for 300ms before triggering the search
}

// Function to toggle search mode between 'title' and 'category'
function setSearchMode(mode) {
  searchMode = mode;
  search.value = ""; // Clear the search input when switching modes
  searchProducts(""); // Reset the search results
}

// Initialize products display on page load
window.onload = displayProducts; // Display all products when the page loads
