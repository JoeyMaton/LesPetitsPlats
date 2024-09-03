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
    dropdownMenu.innerHTML = '<input id="search-input-ingredient" class="block w-full px-4 py-2 text-gray-800 border rounded-md  border-gray-300 focus:outline-none" type="text" placeholder="Rechercher un ingredient" autocomplete="off">';
    dropdownMenuAppliance.innerHTML = '<input id="search-input-appliance" class="block w-full px-4 py-2 text-gray-800 border rounded-md  border-gray-300 focus:outline-none" type="text" placeholder="Rechercher un appareil" autocomplete="off">';
    dropdownMenuUstensil.innerHTML = '<input id="search-input-ustensils" class="block w-full px-4 py-2 text-gray-800 border rounded-md  border-gray-300 focus:outline-none" type="text" placeholder="Rechercher un ustensil" autocomplete="off">';

    
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

  const filteredRecipes = [];

  for (let i = 0; i < recettes.length; i++) {
    const recette = recettes[i];
    let isValid = true;

    for (let j = 0; j < tags.length; j++) {
      const tag = tags[j];
      if (tag.type === "ingredient") {
        let found = false;
        for (let k = 0; k < recette.ingredients.length; k++) {
          if (recette.ingredients[k].ingredient.toLowerCase() === tag.text.toLowerCase()) {
            found = true;
            break;
          }
        }
        if (!found) {
          isValid = false;
          break;
        }
      } else if (tag.type === "appliance") {
        if (recette.appliance.toLowerCase() !== tag.text.toLowerCase()) {
          isValid = false;
          break;
        }
      } else if (tag.type === "ustensil") {
        let found = false;
        for (let k = 0; k < recette.ustensils.length; k++) {
          if (recette.ustensils[k].toLowerCase() === tag.text.toLowerCase()) {
            found = true;
            break;
          }
        }
        if (!found) {
          isValid = false;
          break;
        }
      }
    }

    if (isValid) {
      filteredRecipes.push(recette);
    }
  }



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

    let filteredRecipes = [];

    for (let i = 0; i < recettes.length; i++) {
      const recette = recettes[i];
      const recipeName = recette.name.toLowerCase();
      const ingredients = recette.ingredients;
      const description = recette.description.toLowerCase();
  
      if (recipeName.includes(searchQuery)) {
        filteredRecipes.push(recette);
        continue;
      }
  
      let ingredientFound = false;
      for (let j = 0; j < ingredients.length; j++) {
        const ingredient = ingredients[j].ingredient.toLowerCase();
        if (ingredient.includes(searchQuery)) {
          ingredientFound = true;
          break;
        }
      }
      if (ingredientFound) {
        filteredRecipes.push(recette);
        continue;
      }
  
      if (description.includes(searchQuery)) {
        filteredRecipes.push(recette);
        continue;
      }
    }


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