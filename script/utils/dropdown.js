// JavaScript to toggle the dropdown
const dropdownButton = document.getElementById('dropdown-button');
const dropdownButtonAppliance = document.getElementById('dropdown-button-appliance');
const dropdownButtonUstensil = document.getElementById('dropdown-button-ustensil');
const dropdownMenu = document.getElementById('dropdown-menu');
const dropdownMenuAppliance = document.getElementById('dropdown-menu-appliance');
const dropdownMenuUstensil = document.getElementById('dropdown-menu-ustensil');
var searchInputIngredient = document.getElementById("search-input-ingredient");
var searchInputAppliance = document.getElementById("search-input-appliance");
var searchInputUstensil = document.getElementById("search-input-ustensil");

// Function to toggle the dropdown state
function toggleDropdown(menuId) {
  const menu = document.getElementById(menuId);
  menu.classList.toggle('hidden');
}

dropdownButton.addEventListener('click', () => {
  toggleDropdown('dropdown-menu');
  searchInputIngredient = document.getElementById("search-input-ingredient");
  searchInputIngredient.addEventListener("input", () => {
    filterMenuItems(dropdownMenu, searchInputIngredient);
  });
});

dropdownButtonAppliance.addEventListener('click', () => {
  toggleDropdown('dropdown-menu-appliance');
  searchInputAppliance = document.getElementById("search-input-appliance");
  searchInputAppliance.addEventListener("input", () => {
    filterMenuItems(dropdownMenuAppliance, searchInputAppliance);
  });
});

dropdownButtonUstensil.addEventListener('click', () => {
  toggleDropdown('dropdown-menu-ustensil');
  searchInputUstensil = document.getElementById("search-input-ustensil");
  searchInputUstensil.addEventListener("input", () => {
    filterMenuItems(dropdownMenuUstensil, searchInputUstensil);
  });
});


// Ajouter un écouteur d'événements pour filtrer les éléments en fonction de l'entrée
function filterMenuItems(menu, searchInput) {
  const searchTerm = searchInput.value.toLowerCase();
  const items = menu.querySelectorAll('a');
  console.log(searchTerm);
  console.log("Test");

  items.forEach((item) => {
    const text = item.textContent.toLowerCase();
    if (text.includes(searchTerm)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}


