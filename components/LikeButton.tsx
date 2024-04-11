import { favoriteRecipe, checkForFavs } from '@/app/fetches';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import React, { useEffect, useState } from 'react'

const LikeButton = ({ user_id, recipe_id,  cN='' }:{user_id: string ; recipe_id: string; cN: string;}) => {
    
    const [favorite, setFavorited] = useState(false);
    

    
    useEffect(() => {
        // Define the async function inside the effect
        const fetchFavorited = async () => {
            const favorited = await checkForFavs(user_id, recipe_id);
            setFavorited(!!favorited);
        };

        // Call the async function
        fetchFavorited();
    }, [user_id, recipe_id]);
    
    const handleFavorite = () => {
        favoriteRecipe(recipe_id,user_id)
        setFavorited(prev=>!prev)
    }
     

    return (
    <button 
    onClick={()=>handleFavorite()} 
    className={`z-3 p-2 text-white bg-green-500 hover:bg-green-700 rounded ${cN} `} >
      {favorite ? <FaHeart /> : <FaRegHeart />}
    </button>
  )
}

export default LikeButton
