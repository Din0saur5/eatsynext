import { useState, useEffect } from "react";
import { Database } from "../app/database.types";
import StarRating from "./StarRating";
import { RiDraftLine } from "react-icons/ri";
import LikeButton from "./LikeButton";
import Link from "next/link";
import { faker } from '@faker-js/faker';



const RecipeCard = ({
  recipe,

  user_id = null
}: {
  recipe: Database["public"]["Tables"]["recipes"]["Row"];

  user_id: string | null;
}) => {
  const [image, setImage] = useState(faker.image.urlLoremFlickr({ category: 'food' }));


  return (
    <div className=" overflow-y-clip h-[30rem]  ease-in duration-300 card  object-top  bg-base-100 shadow-lg shadow-neutral hover:scale-105 hover:shadow-xl hover:border-primary border border-secondary ">
    {user_id === recipe.user_id ? (
      <div className="absolute rounded-bl-lg rounded-tl-xxl top-14 -right-1 rotate-90 bg-blue-ribbon text-white py-1 px-4 transform -translate-y-full ribbon-blue ">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4  w-4 inline-block mr-1 text-transparent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
      </svg>
        <button className="  hover:blue-500 hover:bg-blue-700 rounded  p-2 text-white  text-white">
            <RiDraftLine className="rotate-90" />
        </button>
       
    </div>
    ):(user_id && (
      <div className="absolute rounded-bl-lg rounded-tl-xxl top-14 -right-1 rotate-90 bg-ribbon text-white py-1 px-4 transform -translate-y-full ribbon ">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4  w-4 inline-block mr-1 text-transparent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
      </svg>
     
        <LikeButton
          cN={'-rotate-90 bg-transparent'}
            recipe_id={recipe.id}
            user_id={user_id}
            />
           
    </div>
    ))
   
    }
    <Link href={`/recipe/${recipe.id}`}>
      <figure>{image && <img src={image} alt={recipe.name} className="w-2/3 mt-0 mb-0 md:aspect-square object-contain"/>}</figure>
      <div className="card-body">
        <h2 className={`card-title ${recipe.tags && recipe.tags.length>3? 'line-clamp-3':'line-clamp-4'} `}>{recipe.name}</h2>
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
      </Link>
    </div>
  );
};


export default RecipeCard;