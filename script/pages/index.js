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
    const recetteSection = document.querySelector(".recette_section");
    recetteSection.innerHTML = "";

    recipes.forEach((recette) => {
        if (ingredient && recette.ingredients.some((ing) => ing.ingredient.toLowerCase() === ingredient)) {
            const recetteModel = recetteTemplate(recette);
            const recetteCardDOM = recetteModel.getRecetteCardDOM();
            recetteSection.appendChild(recetteCardDOM);
        } else if (appliance && recette.appliance.toLowerCase().split(',').some((appliance) => appliance.trim() === appliance)) {
            const recetteModel = recetteTemplate(recette);
            const recetteCardDOM = recetteModel.getRecetteCardDOM();
            recetteSection.appendChild(recetteCardDOM);
        } else if (ustensil && recette.ustensils.some((ustensil) => ustensil.toLowerCase() === ustensil)) {
            const recetteModel = recetteTemplate(recette);
            const recetteCardDOM = recetteModel.getRecetteCardDOM();
            recetteSection.appendChild(recetteCardDOM);
        }
    });
}


async function displayData(recettes) {
    const recetteSection = document.querySelector(".recette_section");

    recettes.forEach((recette) => {
        const recetteModel = recetteTemplate(recette);
        const recetteCardDOM = recetteModel.getRecetteCardDOM();
        recetteSection.appendChild(recetteCardDOM);
        //console.log(recette);
    })
}

async function init() {
    // Récupère les datas des recettes
    displayData(recipes);
    fillSelect(recipes);
  }
  init();