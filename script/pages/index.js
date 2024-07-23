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
        anchorElement.href = "#";
        anchorElement.textContent = appliance;
        anchorElement.className = "block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md";
        dropdownMenuAppliance.appendChild(anchorElement);    
    });

    const allUstensilsArray = Array.from(allUstensils);
    allUstensilsArray.forEach((ustensil) => {
        const anchorElement = document.createElement("a");
        anchorElement.href = "#";
        anchorElement.textContent = ustensil;
        anchorElement.className = "block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md";
        dropdownMenuUstensil.appendChild(anchorElement);    
    });
}

function filterRecipes(ingredient, appliance, ustensil) {
    console.log("filterRecipes:", ingredient, appliance, ustensil);
    const recetteSection = document.querySelector(".recette_section");
    recetteSection.innerHTML = "";

    const filteredRecipes = recipes.filter((recette) => {
        if (ingredient && recette.ingredients.some((ing) => ing.ingredient.toLowerCase() === ingredient)) {
            return true;
        }
        if (appliance && recette.appliance.toLowerCase().split(',').some((appliance) => appliance.trim() === appliance)) {
            return true;
        }
        if (ustensil && recette.ustensils.some((ustensil) => ustensil.toLowerCase() === ustensil)) {
            return true;
        }
        return false;
    });

    
    filteredRecipes.forEach((recette) => {
        const recetteModel = recetteTemplate(recette);
        const recetteCardDOM = recetteModel.getRecetteCardDOM();
        recetteSection.appendChild(recetteCardDOM);
    });

    console.log(filteredRecipes);
    
    const recetteCount = document.querySelector(".recette_count");
    recetteCount.innerText = filteredRecipes.length + " recettes";
}

// Ajoute un ecoute sur le dropdown menu
dropdownMenu.addEventListener("click", (event) => {
    event.preventDefault();
    if (event.target.tagName === "A") {
      const ingredient = event.target.textContent;
      console.log("Ingredient:", ingredient);
      filterRecipes(ingredient, null, null); 
    }
  });

  dropdownMenuAppliance.addEventListener("click", (event) => {
    event.preventDefault();
    if (event.target.tagName === "A") {
      const appliance = event.target.textContent;
      console.log("Appliance:", appliance);
      filterRecipes(null, appliance, null);
    }
  });

  dropdownMenuUstensil.addEventListener("click", (event) => {
    event.preventDefault();
    if (event.target.tagName === "A") {
      const ustensil = event.target.textContent;
      filterRecipes(null, null, ustensil);
    }
  });

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