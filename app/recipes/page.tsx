import { useEffect } from "react";
import CardGrid from "../../components/CardGrid";
import { getUserIdFromToken } from "../fetches";
export const metadata = {
  title: "Recipes",
  description: "Search, filter, and explore our recipes.",
};



const Recipes = async () => {
  const user_id = await getUserIdFromToken()

  return (
    <>
      <div>Recipes</div>
      <CardGrid 
      param={null} user_id={user_id}
      />
    </>
  );
};

export default Recipes;
