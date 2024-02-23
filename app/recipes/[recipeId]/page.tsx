import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";

import Review from "./Review";
import { fetchRecipeWithReviews, fetchRecipeById } from "@/app/fetches";

type Ingredient = {
  id: string;
  food: string;
  text: string;
  unit: string;
  quantity: number;
};

//Get recipe_id from url param
type Props = {
  params: {
    recipeId: string;
  };
};

//Generate page metadata
export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const recipe = await fetchRecipeById(params.recipeId);
  return {
    title: recipe?.name,
    description: recipe?.description,
  };
};

//Generate page
const Recipe = async ({ params }: { params: { recipeId: string } }) => {
  const recipe = await fetchRecipeWithReviews(params.recipeId);
  const ingredients = recipe?.ingredient_list as Ingredient[];

  if (params.recipeId.length !== 36) {
    notFound();
  }
  if (recipe) {
    return (
      <div>
        <h1>{recipe ? recipe.name : "Loading..."}</h1>
        <p>{recipe ? recipe.description : "Loading..."}</p>
        <h2>Ingredients</h2>
        <ul className="list-disc">
          {ingredients &&
            ingredients.map(ingredient => (
              <li key={ingredient.food}>
                {ingredient.text
                  ? ingredient.text
                  : `${ingredient.quantity} ${ingredient.unit} ${ingredient.food}`}
              </li>
            ))}
        </ul>
        {recipe?.steps && (
          <div>
            <h2>Steps</h2>
            <ol className="list-decimal">
              {/* ALERT: Using list index for key. If implementing a feature in which 
          the order could change during the lifetime of the component, this should be changed. */}
              {recipe.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        )}
        <div>
          <h2>Reviews</h2>
          {recipe.reviews?.length ? (
            recipe.reviews.map(review => (
              <div key={review.id}>
                <Review
                  title={review.title!}
                  comment={review.comment}
                  rating={review.rating!}
                  created={review.created!}
                  user_id={review.user_id!}
                />
              </div>
            ))
          ) : (
            <p className="italic">None yet!</p>
          )}
        </div>
      </div>
    );
  } else {
    return <div>Recipe not found</div>;
  }
};

export default Recipe;
