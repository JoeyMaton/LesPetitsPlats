function fillSelect(recettes) {
    const allIngredients = new Set();
    const allAppliances = new Set();
    const allUstensils = new Set();

    recettes.forEach((recette) => {
        recette.ingredients.forEach((ingredient) => {
            allIngredients.add(ingredient.ingredient.toLowerCase());
        });
        const appliances = recette.appliance.split(',');
        appliances.forEach((appliance) => {
            allAppliances.add(appliance.toLowerCase());
        });
        recette.ustensils.forEach((ustensil) => {
         allUstensils.add(ustensil.toLowerCase());
        });
    });

    const dropdownMenu = document.getElementById("dropdown-menu");
    const dropdownMenuAppliance = document.getElementById("dropdown-menu-appliance");
    const dropdownMenuUstensil = document.getElementById("dropdown-menu-ustensil");
    dropdownMenu.innerHTML = '<input id="search-input" class="block w-full px-4 py-2 text-gray-800 border rounded-md  border-gray-300 focus:outline-none" type="text" placeholder="Search items" autocomplete="off">';
    dropdownMenuAppliance.innerHTML = '<input id="search-input" class="block w-full px-4 py-2 text-gray-800 border rounded-md  border-gray-300 focus:outline-none" type="text" placeholder="Search items" autocomplete="off">';
    dropdownMenuUstensil.innerHTML = '<input id="search-input" class="block w-full px-4 py-2 text-gray-800 border rounded-md  border-gray-300 focus:outline-none" type="text" placeholder="Search items" autocomplete="off">';

    
    const allIngredientsArray = Array.from(allIngredients);
    allIngredientsArray.forEach((ingredient) => {
        const anchorElement = document.createElement("a");
        anchorElement.href = "#";
        anchorElement.textContent = ingredient;
        anchorElement.className = "block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md";
        dropdownMenu.appendChild(anchorElement);
     });

    const allAppliancesArray = Array.from(allAppliances);
    allAppliancesArray.forEach((appliance) => {
        const anchorElement = document.createElement("a");
        const searchInput = document.createElement("input");
        searchInput.id = "search-input";
        searchInput.className = "block w-full px-4 py-2 text-gray-800 border rounded-md  border-gray-300 focus:outline-none";
        searchInput.type = "text";
        searchInput.placeholder = "Search items";
        searchInput.autocomplete = "off"
        anchorElement.href = "#";
        anchorElement.textContent = appliance;
        anchorElement.className = "block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md";
        dropdownMenuAppliance.appendChild(anchorElement);    
    });

    const allUstensilsArray = Array.from(allUstensils);
    allUstensilsArray.forEach((ustensil) => {
        const anchorElement = document.createElement("a");
        const searchInput = document.createElement("input");
        searchInput.id = "search-input";
        searchInput.className = "block w-full px-4 py-2 text-gray-800 border rounded-md  border-gray-300 focus:outline-none";
        searchInput.type = "text";
        searchInput.placeholder = "Search items";
        searchInput.autocomplete = "off"
        anchorElement.href = "#";
        anchorElement.textContent = ustensil;
        anchorElement.className = "block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md";
        dropdownMenuUstensil.appendChild(anchorElement);    
    });
}

function filterRecipes(addedTags) {
  console.log("filterRecipes:", addedTags);
  const recetteSection = document.querySelector(".recette_section");
  recetteSection.innerHTML = "";

  const filteredRecipes = recipes.filter((recette) => {
    return addedTags.every((tag) => {
      if (tag.type === "ingredient") {
        return recette.ingredients.some((ing) => ing.ingredient.toLowerCase() === tag.text.toLowerCase());
      }
      if (tag.type === "appliance") {
        return recette.appliance.toLowerCase() === tag.text.toLowerCase();
      }
      if (tag.type === "ustensil") {
        return recette.ustensils.some((ust) => ust.toLowerCase() === tag.text.toLowerCase());
      }
      return false;
    });
  });

  filteredRecipes.forEach((recette) => {
    const recetteModel = recetteTemplate(recette);
    const recetteCardDOM = recetteModel.getRecetteCardDOM();
    recetteSection.appendChild(recetteCardDOM);
  });

  console.log(filteredRecipes);

  fillSelect(filteredRecipes);

  const recetteCount = document.querySelector(".recette_count");
  recetteCount.innerText = filteredRecipes.length + " recettes";
}

let addedTags = [];

// Ajoute un ecoute sur le dropdown menu
dropdownMenu.addEventListener("click", (event) => {
    event.preventDefault();
    if (event.target.tagName === "A") {
      const ingredient = event.target.textContent;
      console.log("Ingredient:", ingredient);
      filterRecipes(addedTags); 
      createTag(ingredient, "ingredient");
      toggleDropdown('dropdown-menu');
    }
  });

  dropdownMenuAppliance.addEventListener("click", (event) => {
    event.preventDefault();
    if (event.target.tagName === "A") {
      const appliance = event.target.textContent;
      console.log("Appliance:", appliance);
      filterRecipes(addedTags);
      createTag(appliance, "appliance");
      toggleDropdown('dropdown-menu-appliance');
    }
  });

  dropdownMenuUstensil.addEventListener("click", (event) => {
    event.preventDefault();
    if (event.target.tagName === "A") {
      const ustensil = event.target.textContent;
      console.log("Ustensil:", ustensil);
      filterRecipes(addedTags);
      createTag(ustensil, "ustensil");
      toggleDropdown('dropdown-menu-ustensil');
    }
  });


function createTag(text, type) {
    const tagContent = document.querySelector(".tag_content");
    const tagContainer = document.createElement("div");
    const tagButton = document.createElement("button");
    const tagButtonContent = document.createElement("i"); 
    const tagElement = document.createElement("span");
    tagContainer.className = "tag_container";
    tagButton.className = "tag_button"
    tagButtonContent.className = "fa-solid fa-xmark";
    tagElement.className = "tag";
    tagElement.textContent = text;
    tagElement.dataset.type = type;
    addedTags.push({ text, type });

    tagButton.addEventListener("click", (event) => {
        event.preventDefault();
        tagContainer.remove();
        addedTags = addedTags.filter((tag) => tag.text !== text);
        filterRecipes(addedTags);
        });
    
        filterRecipes(addedTags);
        console.log(addedTags);

    tagButton.appendChild(tagButtonContent);
    tagContainer.appendChild(tagElement);
    tagContainer.appendChild(tagButton);
    tagContent.appendChild(tagContainer);
}

function researchRecipes(recettes) {
    const searchInput = document.getElementById('research');
    const searchQuery = searchInput.value.toLowerCase();

    const filteredRecipes = recettes.filter((recette) => {
    const recipeName = recette.name.toLowerCase();
    const ingredients = recette.ingredients.map((ingredient) => ingredient.ingredient.toLowerCase());
    const description = recette.description.toLowerCase();

    if (recipeName.includes(searchQuery)) {
      return true;
    }

    if (ingredients.some((ingredient) => ingredient.includes(searchQuery))) {
      return true;
    }

    if (description.includes(searchQuery)) {
      return true;
    }

    return false;
  });

  const recetteSection = document.querySelector(".recette_section");
  recetteSection.innerHTML = '';

  filteredRecipes.forEach((recette) => {
    const recetteModel = recetteTemplate(recette);
    const recetteCardDOM = recetteModel.getRecetteCardDOM();
    recetteSection.appendChild(recetteCardDOM);
  });

  const recetteCount = document.querySelector(".recette_count");
  recetteCount.innerText = filteredRecipes.length + " recettes";
}

// Ajoute un ecoute sur le form
let form = document.querySelector("form");
 
form.addEventListener("submit", (event) => {
  event.preventDefault();
  researchRecipes(recipes);
});

async function displayData(recettes) {
    const recetteSection = document.querySelector(".recette_section");

    recettes.forEach((recette) => {
        const recetteModel = recetteTemplate(recette);
        const recetteCardDOM = recetteModel.getRecetteCardDOM();
        recetteSection.appendChild(recetteCardDOM);
        //console.log(recette);
    })
}

function totalRecettes(recettes) {
    const recetteTotalContent = document.querySelector(".dropdown_content");
    const recetteCount = document.createElement("p");
    recetteCount.className = "recette_count"
    recetteCount.textContent = recipes.length + " recettes";
    recetteTotalContent.appendChild(recetteCount);
}


async function init() {
    totalRecettes(recipes)
    displayData(recipes);
    fillSelect(recipes);
  }
  init();