import React from "react";
import { Database } from "../database.types";

const RecipeCard = ({
  recipe,
}: {
  recipe: Database["public"]["Tables"]["recipes"]["Row"];
}) => {
  return (
    <div>
      <h4>{recipe.name}</h4>
      <p>{recipe.description}</p>
      {recipe.image && <img src={recipe.image} />}
    </div>
  );
};

export default RecipeCard;
