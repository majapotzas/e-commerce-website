// This runs every time the page loads
window.onload = function () {
  updateHeader();
  if (document.getElementById("cart-items-list")) {
    displayCart();
  }
};

//add to cart
function addToCart(name, price) {
  //get existing list form an empty array if none
  let cart = JSON.parse(localStorage.getItem("groceryList")) || [];
  cart.push({ name: name, price: price });
  localStorage.setItem("groceryList", JSON.stringify(cart));
  updateHeader();
  showToast(); //"added to your grcoery list pop up w/ help from Gemini"
  console.log("Current Cart:", JSON.parse(localStorage.getItem("groceryList")));
}

//remove form cart
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("groceryList")) || [];
  //remove seicific item using its postion
  cart.splice(index, 1);
  //saves the new list and refresh page content
  localStorage.setItem("groceryList", JSON.stringify(cart));
  updateHeader();
  displayCart();
}

function clearCart() {
  localStorage.removeItem("groceryList");
  updateHeader();
  displayCart();
}

// Label: SHARED UI UPDATES, little number in nav bar and sets it to match the number of items in the "notebook"
function updateHeader() {
  let cart = JSON.parse(localStorage.getItem("groceryList")) || [];
  const countDisplay = document.getElementById("cart-count");
  if (countDisplay) {
    countDisplay.innerText = cart.length; // The number is now based on the list size
  }
}

function displayCart() {
  const cart = JSON.parse(localStorage.getItem("groceryList")) || [];
  const container = document.getElementById("cart-items-list");
  const totalDisplay = document.getElementById("cart-total-price");

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = "<p>Your grocery list is empty!</p>";
    if (totalDisplay) totalDisplay.innerText = "0.00SEK";
    return;
  }

  let total = 0;
  container.innerHTML = cart
    .map((item, index) => {
      total += parseFloat(item.price);
      return `
      <div class="cart-item">
        <h4 class="display-font">${item.name}</h4>
        <p>SEK${parseFloat(item.price).toFixed(2)}</p>
        <button class="remove-btn" onclick="removeItem(${index})">REMOVE</button>
      </div>
    `;
    })
    .join("");

  if (totalDisplay) {
    totalDisplay.innerText = `${total} SEK`;
  }
}

function showToast() {
  const toast = document.getElementById("cart-toast");
  if (toast) {
    toast.classList.add("toast-visible");
    setTimeout(() => {
      toast.classList.remove("toast-visible");
    }, 3000);
  }
}
