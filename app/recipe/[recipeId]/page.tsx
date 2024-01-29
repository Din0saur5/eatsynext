import React from "react";
import { notFound } from "next/navigation";

const Recipe = ({ params }: { params: { recipeId: string } }) => {
  if (params.recipeId.length != 36) {
    notFound();
  }
  return <div>Recipe {params.recipeId}</div>;
};

export default Recipe;
