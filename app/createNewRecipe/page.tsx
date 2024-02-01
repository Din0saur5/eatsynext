import React from "react";
import { Metadata } from "next";
import RecipeForm from "@/components/RecipeForm";

export const metadata: Metadata = {
  title: "Create New Recipe",
  description: "Use this page to upload a recipe of your own!",
};

const CreateNewRecipe = () => {
  return (
    <div>
      <h1>Create New Recipe</h1>
      <RecipeForm />
    </div>
  );
};

export default CreateNewRecipe;
