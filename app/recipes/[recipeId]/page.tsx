import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../../database.types";

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Props = {
  params: {
    recipeId: string;
  };
};

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
    title: `Eatsy | ${name}`,
    description: description,
  };
};

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

  const ingredientsResponse = await supabase
    .from("ingredients")
    .select("*")
    .eq("recipe_id", params.recipeId);
  const ingredients = await ingredientsResponse.data;

  if (recipe && ingredients && reviews) {
    return (
      <div>
        <h1>{recipe.name}</h1>
        <p>{recipe.description}</p>
        <h2>Ingredients</h2>
        <ul>
          {ingredients.map(ingredient => (
            <li key={ingredient.id}>{ingredient.text}</li>
          ))}
        </ul>
      </div>
    );
  }
};

export default Recipe;
