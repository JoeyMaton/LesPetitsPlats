async function displayData(recettes) {
    const recetteSection = document.querySelector(".recette_section");

    recettes.forEach((recette) => {
        const recetteModel = recetteTemplate(recette);
        const recetteCardDOM = recetteModel.getRecetteCardDOM();
        recetteSection.appendChild(recetteCardDOM);
        console.log(recette);
    })
}

async function init() {
    // Récupère les datas des recettes
    displayData(recipes);
  }
  init();