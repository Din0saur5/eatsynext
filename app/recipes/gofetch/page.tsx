import { fetchTwentyRecipesFromEdamam, batchPostRecipes } from "../../fetches";
import { Database } from "@/app/database.types";

type EdamamResp = {
  from: number;
  to: number;
  count: number;
  _links: {
    next: {
      href: string;
      title: string;
    };
  };
  hits: {
    recipe: EdamamRecipe;
  }[];
};
type EdamamRecipe = {
  label: string;
  summary: string;
  instructions: string[];
  uri: string;
  url: string;
  image: string;
  ingredients: {
    text: string;
    quantity: number;
    measure: string;
    food: string;
  }[];
  cuisine: string;
  mealType: string;
  dishType: string;
  tags: string[];
  cautions: string[];
  healthLabels: string[];
  dietLabels: string[];
  totalTime: number;
};

const GoFetch = () => {
  const mealType = "";
  const newRecipes: Database["public"]["Tables"]["recipes"]["Insert"][] = [];
  let nextLink = "";
  async function fetchRecipes() {
    newRecipes.splice(0, newRecipes.length);
    const recipes: EdamamResp = await fetchTwentyRecipesFromEdamam(
      mealType,
      nextLink
    );
    if (recipes._links.next) {
      nextLink = recipes._links.next.href;
    }
    recipes.hits.forEach(hit => {
      const recipe = hit.recipe;
      if (recipe) {
        if (
          !newRecipes.find(r => r.URI == recipe.uri) &&
          recipe.instructions &&
          recipe.instructions.length > 0
        ) {
          newRecipes.push({
            name: recipe.label,
            source: recipe.url,
            image: recipe.image,
            ingredient_list: recipe.ingredients,
            cuisine: recipe.cuisine,
            meal_type: recipe.mealType,
            dish_type: recipe.dishType,
            tags: [
              ...recipe.tags,
              ...recipe.healthLabels,
              ...recipe.dietLabels,
            ],
            time: recipe.totalTime,
            cautions: recipe.cautions,
            URI: recipe.uri,
            avg_rating: null,
            created: new Date().toUTCString(),
            description: recipe.summary,
            is_draft: false,
            user_id: null,
            steps: recipe.instructions,
          });
        }
      }
    });
  }
  return (
    <div>
      <div>{newRecipes.map(recipe => recipe.name + ", ")}</div>
      <button className="btn btn-primary" onClick={fetchRecipes}>
        fetch more
      </button>
      <button
        className="btn btn-secondary"
        onClick={() => batchPostRecipes(newRecipes)}
      >
        post new recipes
      </button>
    </div>
  );
};

export default GoFetch;
