import { useState, useEffect } from "react";
import { Database } from "../database.types";

const RecipeCard = ({
  recipe,
  getRecipeImageUrl,
}: {
  recipe: Database["public"]["Tables"]["recipes"]["Row"];
  getRecipeImageUrl: (id: string) => Promise<string | undefined>;
}) => {
  const [image, setImage] = useState<string | undefined | null>(null);
  useEffect(() => {
    getRecipeImageUrl(recipe.id).then(url => setImage(url));
  }, []);
  return (
    <div>
      <h4>{recipe.name}</h4>
      <p>{recipe.description}</p>
      {image && <img src={image} alt={recipe.name} />}
    </div>
  );
};

export default RecipeCard;
