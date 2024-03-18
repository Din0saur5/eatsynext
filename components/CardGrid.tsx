"use client";
import RecipeCard from "./RecipeCard";
import { useEffect, useState } from "react";

import { searchRecipes } from "../app/fetches";
import { Database } from "../app/database.types";
import { isJsxElement } from "typescript";
import Link from "next/link";

type filterProps = {
  searchTerm: string | null,
  tags: string[] | null,
  cautions: string [] | null,
  meal_type: string | null,
  cuisine: string | null,
  dish_type: string | null,
  user_id: string | null,
}

type gridType = {
  name : string, 
  value  : string}
   | null




const CardGrid = ({
  getRecipeImageUrl, param
}: {
  getRecipeImageUrl: (id: string) => Promise<string | undefined>; param: gridType
}) => {

  const filterProps : filterProps = {
    searchTerm: (param && param.name == 'searchTerm')? param.value : null,
    tags: null,
    cautions: null,
    meal_type: null,
    cuisine: null,
    dish_type: null,
    user_id: (param && param.name == 'user_id')? param.value : null }

    console.log(filterProps)
  

  const [items, setItems] = useState(
    [] as Database["public"]["Tables"]["recipes"]["Row"][]
  ); // Items to display
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [page, setPage] = useState(1); // Current page
  const [hasMore, setHasMore] = useState(true); // If there are more items to load
  const [filters, setFilters] = useState(filterProps);
  async function fetchData() {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    try {
      console.log(page)
      
      const data = await searchRecipes(page, filters);
      if(data.length>0){
      setItems(prev => [...prev, ...data]);
      setPage(prev => prev+=1);
      }
      else{
        setHasMore(false)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        fetchData();
      }
    }, { rootMargin: "100px" });

    const sentinel = document.getElementById("scroll-sentinel");
    if (sentinel) observer.observe(sentinel);

    return () => observer.disconnect();
  }, [hasMore, page]);
  
  return (
    <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 justify-items-center">
      {items.map(recipe => (
        <Link key={recipe.id} href={`/recipe/${recipe.id}`}>
          <RecipeCard
            
            recipe={recipe}
            getRecipeImageUrl={getRecipeImageUrl}
          />
        </Link>
      ))}
      {!hasMore && <h1>End of results</h1>}
      {isLoading && <div>Loading...</div>}
      <div id="scroll-sentinel" />
    </div>
  );
};

export default CardGrid;
