function recetteTemplate(data) {
    const { name, id, image, serving, ingredients, ingredient, quantity, unit, time, description, appliance, ustansils} = data;
  
    const picture = `assets/image/${image}`;
  
    function getRecetteCardDOM() {
      const article = document.createElement("article");
      const imgContent = document.createElement("div");
      const img = document.createElement("img");
      const recette_timer = document.createElement("div");
      const timer = document.createElement("p");
      const globalContent = document.createElement("div");
      const recetteTitle = document.createElement("h3");
      const descriptionContent = document.createElement("div");
      const recetteNameDescription = document.createElement("h4");
      const recetteDescription = document.createElement("p");
      const ingredientContent = document.createElement("div");
      const ingredientNameDescription = document.createElement("h4");
      const ingredientGlobalGroup = document.createElement("div");
      

      imgContent.className = "recette_imgContent";
  
      img.setAttribute("src", picture);
      img.id = id;
      img.className = "recette_img";

      recette_timer.className = "recette_timer"
      timer.textContent = time +"min"

      globalContent.className = "recette_globalContent";

      recetteTitle.className = "recette_title";
      recetteTitle.textContent = name;

      descriptionContent.className = "recette_descriptionContent";

      recetteNameDescription.textContent = "RECETTE";
      recetteNameDescription.className = "recette_nameDescription";

      recetteDescription.className = "recette_description";
      recetteDescription.textContent = description;

      ingredientContent.className = "recette_ingredientContent";
      
      ingredientNameDescription.textContent = "INGRÉDIENTS"
      ingredientNameDescription.className = "recette_nameDescription";

      ingredientGlobalGroup.className ="recette_ingredientGlobalGroup"

  
      article.appendChild(imgContent);
      article.appendChild(globalContent);
      imgContent.appendChild(img);
      imgContent.appendChild(recette_timer);
      recette_timer.appendChild(timer);
      globalContent.appendChild(recetteTitle);
      globalContent.appendChild(descriptionContent);
      globalContent.appendChild(ingredientContent);
      descriptionContent.appendChild(recetteNameDescription);
      descriptionContent.appendChild(recetteDescription);
      ingredientContent.appendChild(ingredientNameDescription);
      ingredientContent.appendChild(ingredientGlobalGroup);

      ingredients.forEach((ingredient) => {
        const ingredientDescriptionGroup = document.createElement("div");
        const ingredientDescription1 = document.createElement("p");
        const ingredientDescription2 = document.createElement("p");

        ingredientDescriptionGroup.className ="recette_ingredientDescriptionGroup";

        ingredientDescription1.className = "recette_ingredient";
        ingredientDescription1.textContent = ingredient.ingredient;

        ingredientDescription2.className = "recette_ingredientQuantity";

          // Vérifier si la quantité ou l'unité est vide
          if (ingredient.quantity !== undefined && ingredient.unit !== undefined) {
            // Si les deux propriétés ne sont pas vides, afficher la quantité et l'unité
            ingredientDescription2.textContent = ingredient.quantity + " " + ingredient.unit;
          } 
          else if (ingredient.quantity !== undefined && ingredient.unit === undefined) {
            // Si la quantité n'est pas vides mais que l'unité est vide, afficher seulement la quantité
            ingredientDescription2.textContent = ingredient.quantity;
          } else if (ingredient.quantity === undefined && ingredient.unit === undefined){
            // Sinon, ne rien afficher
            ingredientDescription2.textContent = "-";
          }
        
        
        
        ingredientGlobalGroup.appendChild(ingredientDescriptionGroup)
        ingredientDescriptionGroup.appendChild(ingredientDescription1);
        ingredientDescriptionGroup.appendChild(ingredientDescription2);
      })
     
      
      
      return article;
    }
    return { name, picture, getRecetteCardDOM };
  }