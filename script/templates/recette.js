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
      const ingredientDescription = document.createElement("p");

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

      ingredientDescription.className = "recette_ingredient";
      ingredientDescription.textContent = ingredients;
     
  
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
      ingredientContent.appendChild(ingredientDescription);
      
      return article;
    }
    return { name, picture, getRecetteCardDOM };
  }