import CardGrid from "../../components/CardGrid";
import { getRecipeImageUrl } from "../fetches";
export const metadata = {
  title: "Recipes",
  description: "Search, filter, and explore our recipes.",
};



const Recipes = () => {
  return (
    <>
      <div>Recipes</div>
      <CardGrid getRecipeImageUrl={getRecipeImageUrl} 
      param={null}
      />
    </>
  );
};

export default Recipes;
