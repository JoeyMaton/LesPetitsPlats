let addedTags = [];

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

    const selectedTags = addedTags.map((tag) => tag.text.toLowerCase());

    const dropdownMenu = document.getElementById("dropdown-menu");
    const dropdownMenuAppliance = document.getElementById("dropdown-menu-appliance");
    const dropdownMenuUstensil = document.getElementById("dropdown-menu-ustensil");
    dropdownMenu.innerHTML = '<input id="search-input-ingredient" class="input-dropdown block w-full px-4 py-2 text-gray-800 border rounded-md  border-gray-300 focus:outline-none" type="text" placeholder="Rechercher un ingrédient" autocomplete="off"> <span class="input_button" id="clear-input-ingredient"><i class="fa-solid fa-xmark"></i></span>';
    dropdownMenuAppliance.innerHTML = '<input id="search-input-appliance" class="input-dropdown block w-full px-4 py-2 text-gray-800 border rounded-md  border-gray-300 focus:outline-none" type="text" placeholder="Rechercher un appareil" autocomplete="off"> <span class="input_button" id="clear-input-appliance"><i class="fa-solid fa-xmark"></i></span>';
    dropdownMenuUstensil.innerHTML = '<input id="search-input-ustensil" class="input-dropdown block w-full px-4 py-2 text-gray-800 border rounded-md  border-gray-300 focus:outline-none" type="text" placeholder="Rechercher un ustensil" autocomplete="off"> <span class="input_button" id="clear-input-ustensil"><i class="fa-solid fa-xmark"></i></span>';

    
    const allIngredientsArray = Array.from(allIngredients);
    allIngredientsArray.forEach((ingredient) => {
      if (!selectedTags.includes(ingredient)) {
        const anchorElement = document.createElement("a");
        anchorElement.href = "#";
        anchorElement.textContent = ingredient;
        anchorElement.className = "block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md";
        dropdownMenu.appendChild(anchorElement);
       } 
     });
    

    const allAppliancesArray = Array.from(allAppliances);
    allAppliancesArray.forEach((appliance) => {
      if (!selectedTags.includes(appliance)) {
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
      }   
    });

    const allUstensilsArray = Array.from(allUstensils);
    allUstensilsArray.forEach((ustensil) => {
      if (!selectedTags.includes(ustensil)) {
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
      }  
    });
}

function filterRecipesByTags(tags, recettes) {
  console.log("filterRecipes:", tags);
  const recetteSection = document.querySelector(".recette_section");
  recetteSection.innerHTML = "";

  const filteredRecipes = recettes.filter((recette) => {
    return tags.every((tag) => {
      if (tag && tag.type === "ingredient") {
        return recette.ingredients.some((ing) => ing.ingredient.toLowerCase() === tag.text.toLowerCase());
      }
      if (tag && tag.type === "appliance") {
        return recette.appliance.toLowerCase() === tag.text.toLowerCase();
      }
      if (tag && tag.type === "ustensil") {
        return recette.ustensils.some((ust) => ust.toLowerCase() === tag.text.toLowerCase());
      }
      return false;
    });
  });


  return filteredRecipes;
}



// Ajoute un ecoute sur le dropdown menu
dropdownMenu.addEventListener("click", (event) => {
  const searchInput = document.getElementById('research');
  const searchQuery = searchInput.value.toLowerCase(); 
  event.preventDefault();
    if (event.target.tagName === "A") {
      const ingredient = event.target.textContent;
      console.log("Ingredient:", ingredient);
      search(addedTags, searchQuery);
      createTag(ingredient, "ingredient");
      toggleDropdown('dropdown-menu');
    }
  });

  dropdownMenuAppliance.addEventListener("click", (event) => {
    const searchInput = document.getElementById('research');
    const searchQuery = searchInput.value.toLowerCase();
    event.preventDefault();
    if (event.target.tagName === "A") {
      const appliance = event.target.textContent;
      console.log("Appliance:", appliance);
      search(addedTags, searchQuery);
      createTag(appliance, "appliance");
      toggleDropdown('dropdown-menu-appliance');
    }
  });

  dropdownMenuUstensil.addEventListener("click", (event) => {
    const searchInput = document.getElementById('research');
    const searchQuery = searchInput.value.toLowerCase();
    event.preventDefault();
    if (event.target.tagName === "A") {
      const ustensil = event.target.textContent;
      console.log("Ustensil:", ustensil);
      search(addedTags, searchQuery);
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

    
    const selectedTagElement = document.createElement("a");
    selectedTagElement.href = "#";
    selectedTagElement.textContent = text;
    selectedTagElement.className = "block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md";

    tagButton.addEventListener("click", (event) => {
        const searchInput = document.getElementById("research");
        const searchQuery = searchInput.value.toLowerCase();
        event.preventDefault();
        tagContainer.remove();
        addedTags = addedTags.filter((tag) => tag.text !== text);
        search(addedTags, searchQuery);
        });
    
        const searchInput = document.getElementById("research");
        const searchQuery = searchInput.value.toLowerCase();
        search(addedTags, searchQuery);
        //console.log(addedTags);
       

    tagButton.appendChild(tagButtonContent);
    tagContainer.appendChild(tagElement);
    tagContainer.appendChild(tagButton);
    tagContent.appendChild(tagContainer);
}

function researchRecipesByText(recettes) {
    const searchInput = document.getElementById('research');
    const searchQuery = searchInput.value.toLowerCase();

    if (searchQuery.length < 3) {
      return recettes
    }

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


  fillSelect(filteredRecipes);


  return filteredRecipes;
}

function search(tags, query) {
  let filteredRecipes = recipes;

  if (query) {
    // Recherche par texte
    filteredRecipes = researchRecipesByText(filteredRecipes, query);
  }

  // Recherche par tag
  filteredRecipes = filterRecipesByTags(tags, filteredRecipes);
  
  const recetteSection = document.querySelector(".recette_section");
  recetteSection.innerHTML = '';

  filteredRecipes.forEach((recette) => {
    const recetteModel = recetteTemplate(recette);
    const recetteCardDOM = recetteModel.getRecetteCardDOM();
    recetteSection.appendChild(recetteCardDOM);
  });
  
  fillSelect(filteredRecipes);

  const recetteCount = document.querySelector(".recette_count");
  recetteCount.innerText = filteredRecipes.length + " recettes";

  return filteredRecipes;
}

// Ajoute un ecoute sur le form
let form = document.querySelector("form");
 
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const tags = addedTags;
  const query = document.getElementById("research").value;
  search(tags, query);
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

function totalRecettes() {
    const recetteTotalContent = document.querySelector(".dropdown_content");
    const recetteCount = document.createElement("p");
    recetteCount.className = "recette_count"
    recetteCount.textContent = recipes.length + " recettes";
    recetteTotalContent.appendChild(recetteCount);
}


async function init() {
    totalRecettes()
    displayData(recipes);
    fillSelect(recipes);
  }
  init();