export type ThemeType = "forest" | "light";

export type spoonacularResponse = {
  results: spoonacularRecipe[];
  offset: number;
  number: number;
  totalResults: number;
};

export type spoonacularRecipe = {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  cheap: boolean;
  veryPopular: boolean;
  sustainable: boolean;
  lowFodmap: boolean;
  weightWatcherSmartPoints: number;
  gaps: string;
  preparationMinutes: number;
  cookingMinutes: number;
  aggregateLikes: number;
  healthScore: number;
  creditsText: string;
  sourceName: string;
  pricePerServing: number;
  extendedIngredients: {
    id: number;
    aisle: string;
    image: string;
    consistency: string;
    name: string;
    nameClean: string;
    original: string;
    originalName: string;
    amount: number;
    unit: string;
    meta: string[];
    measures: {
      us: {
        amount: number;
        unitShort: string;
        unitLong: string;
      };
      metric: {
        amount: number;
        unitShort: string;
        unitLong: string;
      };
    };
  }[];
  id: number;
  title: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  image: string;
  imageType: string;
  summary: string;
  cuisines: string[];
  dishTypes: string[];
  diets: string[];
  occasions: string[];
  analyzedInstructions: {
    name: string;
    steps: {
      number: number;
      step: string;
      ingredients: {
        id: number;
        name: string;
        localizedName: string;
        image: string;
      }[];
      equipment: {
        id: number;
        name: string;
        localizedName: string;
        image: string;
      }[];
      length: {
        number: number;
        unit: string;
      };
    }[];
  }[];
  spoonacularScore: number;
  spoonacularSourceUrl: string;
  usedIngredientCount: number;
  missedIngredientCount: number;
  missedIngredients: {
    id: number;
    aisle: string;
    image: string;
    consistency: string;
    name: string;
    nameClean: string;
    original: string;
    originalName: string;
    amount: number;
    unit: string;
    meta: string[];
    measures: {
      us: {
        amount: number;
        unitShort: string;
        unitLong: string;
      };
      metric: {
        amount: number;
        unitShort: string;
        unitLong: string;
      };
    };
  }[];
  likes: number;
  usedIngredients: {
    id: number;
    aisle: string;
    image: string;
    consistency: string;
    name: string;
    nameClean: string;
    original: string;
    originalName: string;
    amount: number;
    unit: string;
    meta: string[];
    measures: {
      us: {
        amount: number;
        unitShort: string;
        unitLong: string;
      };
      metric: {
        amount: number;
        unitShort: string;
        unitLong: string;
      };
    };
  }[];
  unusedIngredients: {
    id: number;
    aisle: string;
    image: string;
    consistency: string;
    name: string;
    nameClean: string;
    original: string;
    originalName: string;
    amount: number;
    unit: string;
    meta: string[];
    measures: {
      us: {
        amount: number;
        unitShort: string;
        unitLong: string;
      };
      metric: {
        amount: number;
        unitShort: string;
        unitLong: string;
      };
    };
  }[];
};

/******************************************************
 *   Edamam API - https://developer.edamam.com/edamam-docs
 * const GoFetch = () => {
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
            is_draft: boolean,
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
 */
