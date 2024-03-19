import { useState, useEffect } from "react";
import { Database } from "../app/database.types";
import StarRating from "./StarRating";


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
    <div className=" overflow-y-clip h-[30rem]  ease-in duration-300 card  object-top  bg-base-100 shadow-lg shadow-neutral hover:scale-105 hover:shadow-xl hover:border-primary border border-secondary ">
      <figure>{image && <img src={image} alt={recipe.name} className="w-1/2 md:aspect-3/2 object-contain"/>}</figure>
      <div className="card-body">
        <h2 className="card-title line-clamp-4">{recipe.name}</h2>
          <StarRating rating={recipe.avg_rating}  totalStars={5}></StarRating>
        {/* <p className="line-clamp-4">{recipe.description}</p> */}
        <div className="card-actions justify-end">
          {recipe.tags && recipe.tags.slice(0,4).map((tag: string)=>{
            return(
              <div className="badge badge-outline line-clamp-1">#{tag}</div> 
            )
// maybe make a limit of 3 tags or something or at least limit how many get displayed 
          })}
        </div>
        <div className="chat-footer opacity-50 mt-12">
    Cook Time: {recipe.time} mins
  </div>
      </div>
    </div>
  );
};

export default RecipeCard;
