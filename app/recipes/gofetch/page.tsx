import { batchPostRecipes } from "../../fetches";
import { Database } from "@/app/database.types";
import { spoonacularRecipe, spoonacularResponse } from "@/app/types";

type Ingredient = {
  id: string;
  food: string;
  text: string;
  unit: string;
  quantity: number;
};

const GoFetch = () => {
  const newRecipes: Database["public"]["Tables"]["recipes"]["Insert"][] = [];
  let offset = 0;
  const formatIngredients = (
    ingredients: spoonacularRecipe["extendedIngredients"]
  ): Ingredient[] => {
    return ingredients.map(ingredient => {
      return {
        id: `${ingredient.id}`,
        food: ingredient.originalName,
        quantity: ingredient.amount,
        unit: ingredient.unit,
        text: ingredient.original,
      };
    });
  };
  const formatTypes = (allTypes: string[]) => {
    let meal_type: string[] = [];
    let dish_type: string[] = [];
    allTypes.forEach(type => {
      if (type === "breakfast") meal_type.push("Breakfast");
      else if (
        type === "lunch" ||
        (type === "dinner" && !dish_type.includes("Lunch/Dinner"))
      )
        dish_type.push("Lunch/Dinner");
      else if (type.includes("tea")) dish_type.push("Teatime");
      else if (type.includes("snack")) meal_type.push("Snack");
      else dish_type.push(type);
    });
    return [meal_type.join(", "), dish_type.join(", ")];
  };
  async function fetchRecipes(params: string) {
    const resp = await fetch(
      "https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=c9f9e0c22cba4d7c8da7eaff09638c4b&instructionsRequired=true&addRecipeInformation=true&fillIngredients=true&limitLicense=true" +
        `&${params}`
    );
    const recipes: spoonacularResponse = await resp.json();
    if (recipes.offset + recipes.number < recipes.totalResults) {
      offset = recipes.offset + recipes.number;
    }
    recipes.results.forEach((recipe: spoonacularRecipe) => {
      if (recipe) {
        const [meal_type, dish_type] = formatTypes(recipe.dishTypes);
        newRecipes.push({
          name: recipe.title,
          source: recipe.sourceUrl,
          image: recipe.image,
          ingredient_list: formatIngredients(recipe.extendedIngredients),
          //to be changed to array of strings
          cuisine: recipe.cuisines.map(cuisine => cuisine).join(", "),
          meal_type: meal_type,
          dish_type: dish_type,
          tags: [...recipe.diets, ...recipe.occasions],
          time: recipe.readyInMinutes,
          //to be removed
          cautions: [],
          URI: `${recipe.id}`,
          avg_rating: null,
          created: new Date().toUTCString(),
          description: recipe.summary,
          is_draft: false,
          user_id: null,
          steps: recipe.analyzedInstructions[0]?.steps.map(step => {
            return step.step;
          }),
        });
      }
    });
  }
  return (
    <div>
      <div>{newRecipes.map(recipe => recipe.name + ", ")}</div>
    </div>
  );
};

export default GoFetch;
