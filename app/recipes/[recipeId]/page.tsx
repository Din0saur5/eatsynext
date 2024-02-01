import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../../database.types";

// Create a supabase client for interacting with the db, use Database to define the types
const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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
  const { data } = await supabase
    .from("recipes")
    .select("name,description")
    .eq("id", params.recipeId);
  const name = data?.[0].name;
  const description = data?.[0].description;
  return {
    title: name,
    description: description,
  };
};

//Generate page
const Recipe = async ({ params }: { params: { recipeId: string } }) => {
  const recipeResponse = await supabase
    .from("recipes")
    .select("*")
    .eq("id", params.recipeId);
  const recipe = await recipeResponse.data?.[0];

  const reviewsResponse = await supabase
    .from("reviews")
    .select("*")
    .eq("recipe_id", params.recipeId);
  const reviews = await reviewsResponse.data;

  const ingredients = recipe?.ingredient_list;

  if (params.recipeId.length !== 36) {
    notFound();
  }
  if (!recipeResponse.error) {
    return (
      <div>
        <h1>{recipe ? recipe.name : "Loading..."}</h1>
        <p>{recipe ? recipe.description : "Loading..."}</p>
        <h2>Ingredients</h2>
        <ul className="list-disc">
          {ingredients
            ? ingredients.map(ingredient => (
                <li key={ingredient.food}>
                  {ingredient.text
                    ? ingredient.text
                    : `${ingredient.quantity} ${ingredient.unit} ${ingredient.food}`}
                </li>
              ))
            : ""}
        </ul>
        {recipe?.steps ? (
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
        ) : (
          ""
        )}
      </div>
    );
  } else {
    return <div>Recipe not found</div>;
  }
};

export default Recipe;
