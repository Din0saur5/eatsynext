"use client";
import RecipeCard from "./RecipeCard";
import { useEffect, useState } from "react";

import { searchRecipes } from "../fetches";
import { Database } from "../database.types";
import { isJsxElement } from "typescript";

const CardGrid = ({
  getRecipeImageUrl,
}: {
  getRecipeImageUrl: (id: string) => Promise<string | undefined>;
}) => {
  const [items, setItems] = useState(
    [] as Database["public"]["Tables"]["recipes"]["Row"][]
  ); // Items to display
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [page, setPage] = useState(1); // Current page
  const [hasMore, setHasMore] = useState(true); // If there are more items to load
  const [filters, setFilters] = useState({
    searchTerm: null,
    tags: null,
    meal_type: null,
    cuisine: null,
    dish_type: null,
    user_id: null,
  });
  async function fetchData() {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    try {
      const data = await searchRecipes(page, filters);
      setHasMore(data.length > 0);
      setItems(prev => [...prev, ...data]);
      setPage(prev => prev + 1);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          fetchData();
        }
      },
      {
        rootMargin: "100px",
      }
    );

    const sentinel = document.getElementById("scroll-sentinel");
    if (sentinel) observer.observe(sentinel);

    return () => observer.disconnect();
  }, [hasMore]);
  return (
    <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 justify-items-center">
      {items.map(recipe => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          getRecipeImageUrl={getRecipeImageUrl}
        />
      ))}
      {isLoading && <div>Loading...</div>}
      <div id="scroll-sentinel" />
    </div>
  );
};

export default CardGrid;
