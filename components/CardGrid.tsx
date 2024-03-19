"use client";
import RecipeCard from "./RecipeCard";
import { useEffect, useState } from "react";
import { SlArrowUp } from "react-icons/sl";
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
  const [timeFilter, setTimeFilter] = useState(120)
  const [ratingFilter, setRatingFilter] = useState(0)
  const [mealFilter, setMealFilter] = useState('Any')
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

//scroll to top button:
  const returnToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    // Show the button when the user scrolls down
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    // Add scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  
  const cuisineTypes = [
    "american",
    "asian",
    "british",
    "caribbean",
    "central europe",
    "chinese",
    "eastern europe",
    "french",
    "greek",
    "indian",
    "italian",
    "japanese",
    "korean",
    "kosher",
    "mediterranean",
    "mexican",
    "middle eastern",
    "nordic",
    "south american",
    "south east asian",
    "world",
  ];

  const dishTypes = [
    "soup",
    "starter",
    "desserts",
    "main course",
    "drinks",
    "condiments and sauces",
    "bread",
    "salad",
    "biscuits and cookies",
    "sandwiches",
    "cereals",
  ];

  //rating slider
  const handleRatingSlider = (event:any) => {
    setRatingFilter(event.target.value);
  };
  //time slider
  const handleTimeSlider = (event:any) => {
    setTimeFilter(event.target.value);
  };
  //meal select
  const handleMealFilter = (event:any) => {
    setMealFilter(event.target.value)
  }
  

  return (
    <>
   
    <div className="drawer lg:drawer-open  lg:-ml-24">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col items-center justify-center">
   
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden ml-2 mb-12 mt-2">Filters</label>
    <div className="sm:ml-24 grid grid-flow-row grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 min-[1850px]:grid-cols-4 gap-6 justify-items-center">
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
  
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
    <ul className=" shadow-inner dark:shadow-base-100 menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      <li className="text-xl underline">Advanced filters:</li>
      <form>
        <div className="collapse collapse-arrow bg-base-200">
        <input type="checkbox" name="my-accordion-2" /> 
        <div className="collapse-title text-xl font-medium">
          Food Sensitivities and Preferences
        </div>
        <div className="collapse-content flex flex-col"> 
        <label className="label cursor-pointer">
    <span className="label-text">Vegitarian</span> 
    <input type="checkbox" className="checkbox checkbox-primary" />
  </label>
  <label className="label cursor-pointer">
    <span className="label-text">Gluten-Free</span> 
    <input type="checkbox" className="checkbox checkbox-primary" />
  </label>
  <label className="label cursor-pointer">
    <span className="label-text">Low-Sodium</span> 
    <input type="checkbox" className="checkbox checkbox-primary" />
  </label>
  <label className="label cursor-pointer">
    <span className="label-text">Quick-Bite</span> 
    <input type="checkbox" className="checkbox checkbox-primary" />
  </label>

        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-200">
        <input type="checkbox" name="my-accordion-2" /> 
        <div className="collapse-title text-xl font-medium">
          Cuisine Type
        </div>
        <div className="collapse-content flex flex-col"> 
          {cuisineTypes.map((cuisine)=>{
            return(
              <label className="label cursor-pointer">
              <span className="label-text">{cuisine}</span> 
              <input value={cuisine} type="radio" name="radio-10" className="radio radio-primary" />
            </label>
            )
          })}
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-200">
        <input type="checkbox" name="my-accordion-2" /> 
        <div className="collapse-title text-xl font-medium">
          Meal Time
        </div>
        <div className="collapse-content"> 
        <div>
        <select
                className="select select-primary w-full max-w-xs"
                id="meal_type"
                name="meal_type"
                title="Meal Type"
                value={mealFilter}
                onChange={handleMealFilter}
                required
              >
                <option className="text-white hover:text-blue-400">
                  Any
                </option>
                <option>Breakfast</option>
                <option>Lunch/Dinner</option>
                <option>Teatime</option>
                <option>Snack</option>
              </select>
            </div>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-200">
        <input type="checkbox" name="my-accordion-2" /> 
        <div className="collapse-title text-xl font-medium">
          Dish Type
        </div>
        <div className="collapse-content"> 
        {dishTypes.map((dish)=>{
            return(
              <label className="label cursor-pointer">
              <span className="label-text">{dish}</span> 
              <input value={dish} type="radio" name="radio-5" className="radio radio-primary" />
            </label>
            )
          })}
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-200">
        <input type="checkbox" name="my-accordion-2" /> 
        <div className="collapse-title text-xl font-medium">
          Time
        </div>
        <div className="collapse-content"> 
        <input  onChange={handleTimeSlider} type="range" min={0} max="120" value={timeFilter} className="range range-primary" step="20" />
<div className="w-full flex justify-between text-xs px-2">
  <span>&lt;20m</span>
  <span>45m</span>
  <span>1hr</span>
  <span>90m</span>
  <span>Any</span>
</div>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-200">
        <input type="checkbox" name="my-accordion-2" /> 
        <div className="collapse-title text-xl font-medium">
         Average Rating
        </div>
        <div className="collapse-content overflow-x-auto"> 
        <input  onChange={handleRatingSlider} type="range" min={0} max="100" value={ratingFilter} className="range range-primary" step="20" />
<div className="w-full flex justify-between text-xs px-2">
  <span>Any</span>
  <span>1+</span>
  <span>2+</span>
  <span>3+</span>
  <span>4+</span>
  <span>5</span>
</div>
        </div>
      </div>
      <br/>
      <button type="submit" className="btn btn-success">Filter Results</button>
      </form>
    </ul>
  
  </div>
</div>

<div onClick={()=>{returnToTop()}}  className={`sm:hidden fixed bottom-0 right-0 bg-primary text-base-100 rounded-full px-2 py-2 mr-6 mb-[40px] z-50 items-center text-3xl flex gap-2 scrollToTopButton ${isVisible ? 'visible' : ''}`}><SlArrowUp /></div>

    </>
  );
};

export default CardGrid;
