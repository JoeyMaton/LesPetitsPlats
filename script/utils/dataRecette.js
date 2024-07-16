async function getRecettes() {
    const response = await fetch(
      "../../data/recipes.js"
    );
    if (!response.ok) {
      throw new Error("Echec de la récupération des données.");
    }
    const data = await response.json();
    return data;
  }
  