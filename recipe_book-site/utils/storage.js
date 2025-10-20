// Simple localStorage utility for data persistence
export const storage = {
  getRecipes: () => {
    if (typeof window !== 'undefined') {
      const recipes = localStorage.getItem('recipes');
      return recipes ? JSON.parse(recipes) : [];
    }
    return [];
  },

  saveRecipes: (recipes) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('recipes', JSON.stringify(recipes));
    }
  },

  getRecipe: (id) => {
    const recipes = storage.getRecipes();
    return recipes.find(recipe => recipe.id === id);
  },

  saveRecipe: (recipe) => {
    const recipes = storage.getRecipes();
    if (recipe.id) {
      // Update existing recipe
      const index = recipes.findIndex(r => r.id === recipe.id);
      if (index !== -1) {
        recipes[index] = recipe;
      }
    } else {
      // Add new recipe
      recipe.id = Date.now().toString();
      recipes.push(recipe);
    }
    storage.saveRecipes(recipes);
    return recipe;
  },

  deleteRecipe: (id) => {
    const recipes = storage.getRecipes();
    const filteredRecipes = recipes.filter(recipe => recipe.id !== id);
    storage.saveRecipes(filteredRecipes);
  }
};