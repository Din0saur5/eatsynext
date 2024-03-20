import { useEffect } from "react";
import CardGrid from "../../components/CardGrid";
import { getRecipeImageUrl, getUserIdFromToken } from "../fetches";
export const metadata = {
  title: "Recipes",
  description: "Search, filter, and explore our recipes.",
};



const Recipes = async () => {
  const user_id = await getUserIdFromToken()

  return (
    <>
      <div>Recipes</div>
      <CardGrid getRecipeImageUrl={getRecipeImageUrl} 
      param={null} user_id={user_id}
      />
    </>
  );
};

export default Recipes;
