// ITERATION 1
function updateSubtotal(product) {
  console.log('Calculating subtotal, yey!');
  const price = parseFloat(product.querySelector('.price span').innerText);
  const quantity = product.querySelector('.quantity input').value;
  const subtotal = price * quantity;
  
  const subtotalElement = product.querySelector('.subtotal span');
  subtotalElement.innerText = subtotal.toFixed(2); // Ensuring two decimal places

  return subtotal;
}

function calculateAll() {
  // Clear the total before recalculating
  let total = 0;
  
  // Get all products and update their subtotals
  const products = document.getElementsByClassName('product');
  for (let product of products) {
    total += updateSubtotal(product);
  }

  // Update the total in the DOM
  document.querySelector('#total-value span').innerText = total.toFixed(2);
}

// ITERATION 4
function removeProduct(event) {
  const target = event.currentTarget;
  console.log('The target in remove is:', target);
  // Get the parent row (product) and remove it from the DOM
  const productRow = target.closest('.product');
  productRow.parentNode.removeChild(productRow);

  // Recalculate the total after removing the product
  calculateAll();
}

// ITERATION 5
function createProduct() {
  // Get the input fields for product name and price
  const nameInput = document.querySelector('tfoot input[type="text"]');
  const priceInput = document.querySelector('tfoot input[type="number"]');

  // Extract values
  const productName = nameInput.value;
  const productPrice = parseFloat(priceInput.value);

  // Check if product name and price are valid
  if (productName === '' || isNaN(productPrice) || productPrice <= 0) {
    alert("Please enter valid product name and price.");
    return;
  }

  // Create a new product row
  const cart = document.getElementById('cart').querySelector('tbody');
  const newRow = document.createElement('tr');
  newRow.className = 'product';
  newRow.innerHTML = `
    <td class="name"><span>${productName}</span></td>
    <td class="price">$<span>${productPrice.toFixed(2)}</span></td>
    <td class="quantity"><input type="number" value="0" min="0" placeholder="Quantity" /></td>
    <td class="subtotal">$<span>0</span></td>
    <td class="action"><button class="btn btn-remove">Remove</button></td>
  `;

  // Append the new row to the cart
  cart.appendChild(newRow);

  // Clear the input fields
  nameInput.value = '';
  priceInput.value = 0;

  // Add event listener for the "Remove" button
  const removeButton = newRow.querySelector('.btn-remove');
  removeButton.addEventListener('click', removeProduct);
}

window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);

  // Add event listener to the "Create Product" button
  const createProductBtn = document.getElementById('create');
  createProductBtn.addEventListener('click', createProduct);

  // Add event listeners to existing "Remove" buttons
  const existingRemoveButtons = document.querySelectorAll('.btn-remove');
  existingRemoveButtons.forEach(button => {
    button.addEventListener('click', removeProduct);
  });
});
