import React from "react";
import { Metadata } from "next";
import RecipeForm from "@/components/RecipeForm";
import { getUserIdFromToken, postRecipe } from "../fetches";


export const metadata: Metadata = {
  title: "Create New Recipe",
  description: "Use this page to upload a recipe of your own!",
};

const CreateNewRecipe = async () => {

  const user_id = await getUserIdFromToken()

  return (
    <div>
      <h1 className="text-3xl mb-2">Create New Recipe!</h1>
      <RecipeForm user_id={user_id} postRecipe={postRecipe} />
    </div>
  );
};

export default CreateNewRecipe;
