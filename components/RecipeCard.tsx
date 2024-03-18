import { useState, useEffect } from "react";
import { Database } from "../app/database.types";

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
    <div className="card max-w-96 bg-base-100 shadow-xl">
      <figure>{image && <img src={image} alt={recipe.name} className="w-1/2 md:aspect-3/2 object-contain"/>}</figure>
      <div className="card-body">
        <h2 className="card-title">{recipe.name}</h2>
        <p className="line-clamp-4">{recipe.description}</p>
        <div className="card-actions justify-end">
          {recipe.tags && recipe.tags.slice(0,4).map((tag: string)=>{
            return(
              <div className="badge badge-outline">#{tag}</div> 
            )
// maybe make a limit of 3 tags or something or at least limit how many get displayed 
          })}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
