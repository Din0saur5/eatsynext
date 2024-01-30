import React from "react";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Eatsy | Recipes",
  description: "Search, filter, and explore our recipes.",
};

const Recipe = ({ params }: { params: { recipeId: string } }) => {
  if (params.recipeId.length != 36) {
    notFound();
  }
  return <div>Recipe {params.recipeId}</div>;
};

export default Recipe;
