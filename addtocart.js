// 1. This runs every time the page loads
window.onload = function () {
  // Check the 'Sticky Note' (LocalStorage) for a saved number
  let savedCount = localStorage.getItem("cartCount") || 0;

  // 2. Find the 'cart-count' span in the header
  const countDisplay = document.getElementById("cart-count");

  // 3. If it exists on this page, update it!
  if (countDisplay) {
    countDisplay.innerText = savedCount;
  }
};

function addToCart() {
  // 1. Get current number and add 1
  let count = parseInt(localStorage.getItem("cartCount")) || 0;
  count++;

  // 2. Save the new number back to the 'Sticky Note'
  localStorage.setItem("cartCount", count);

  // 3. Update the number in the Header
  document.getElementById("cart-count").innerText = count;

  // 4. Show your Toast notification
  showToast();
}

function showToast() {
  const toast = document.getElementById("cart-toast");
  toast.classList.add("toast-visible");
  setTimeout(() => {
    toast.classList.remove("toast-visible");
  }, 3000);
}
