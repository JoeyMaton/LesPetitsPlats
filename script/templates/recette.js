function recetteTemplate(data) {
    const { name, id, image, serving, ingredients, ingredient, quantity, unit, time, description, appliance, ustansils} = data;
  
    const picture = `assets/image/${image}`;
  
    function getRecetteCardDOM() {
      const article = document.createElement("article");
      const img = document.createElement("img");
      const globalContent = document.createElement("div");
      const recetteTitle = document.createElement("h3");
      const descriptionContent = document.createElement("div");
      const recetteDescription = document.createElement("p");
      const ingredientContent = document.createElement("div");
      const ingredientDescription = document.createElement("p");
  
      img.setAttribute("src", picture);
      img.id = id;
      img.className = "recette_img";

      globalContent.className = "recette_globalContent";

      recetteTitle.className = "recette_title";

      descriptionContent.className = "recette_descriptionContent";

      recetteDescription.className = "recette_description";

      ingredientContent.className = "recette_ingredientContent";

      ingredientDescription.className = "recette_ingredient";
     
  
      article.appendChild(img);
      article.appendChild(globalContent);
      globalContent.appendChild(recetteTitle);
      globalContent.appendChild(descriptionContent);
      globalContent.appendChild(ingredientContent);
      descriptionContent.appendChild(recetteDescription);
      ingredientContent.appendChild(ingredientDescription);
      
      return article;
    }
    return { name, picture, getRecetteCardDOM };
  }