// JavaScript to toggle the dropdown
const dropdownButton = document.getElementById('dropdown-button');
const dropdownButtonAppliance = document.getElementById('dropdown-button-appliance');
const dropdownButtonUstensil = document.getElementById('dropdown-button-ustensil');
const dropdownMenu = document.getElementById('dropdown-menu');
const dropdownMenuAppliance = document.getElementById('dropdown-menu-appliance');
const dropdownMenuUstensil = document.getElementById('dropdown-menu-ustensil');
const searchInput = document.getElementById('search-input');
let isOpen = false; // Set to true to open the dropdown by default

// Function to toggle the dropdown state
function toggleDropdown(menuId) {
  const menu = document.getElementById(menuId);
  menu.classList.toggle('hidden');
}

dropdownButton.addEventListener('click', () => {
  toggleDropdown('dropdown-menu');
});

dropdownButtonAppliance.addEventListener('click', () => {
  toggleDropdown('dropdown-menu-appliance');
});

dropdownButtonUstensil.addEventListener('click', () => {
  toggleDropdown('dropdown-menu-ustensil');
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

// Ajoute un ecoute sur le dropdown menu
  dropdownMenu.addEventListener("click", (event) => {
    event.preventDefault();
    if (event.target.tagName === "A") {
      const ingredient = event.target.textContent;
      filterRecipes(ingredient);
    }
  });

  dropdownMenuAppliance.addEventListener("click", (event) => {
    event.preventDefault();
    if (event.target.tagName === "A") {
      const appliance = event.target.textContent;
      filterRecipes(appliance);
    }
  });

  dropdownMenuUstensil.addEventListener("click", (event) => {
    event.preventDefault();
    if (event.target.tagName === "A") {
      const ustensil = event.target.textContent;
      filterRecipes(ustensil);
    }
  });