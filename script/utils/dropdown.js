// JavaScript to toggle the dropdown
const dropdownButton = document.getElementById('dropdown-button');
const dropdownMenu = document.getElementById('dropdown-menu');
const searchInput = document.getElementById('search-input');
let isOpen = false; // Set to true to open the dropdown by default

// Function to toggle the dropdown state
function toggleDropdown() {
  isOpen = !isOpen;
  dropdownMenu.classList.toggle('hidden', !isOpen);
}

// Set initial state
toggleDropdown();

dropdownButton.addEventListener('click', () => {
  toggleDropdown();
});

// Add event listener to filter items based on input
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const items = dropdownMenu.querySelectorAll('a');

  items.forEach((item) => {
    const text = item.textContent.toLowerCase();
    if (text.includes(searchTerm)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
});