'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import {fetchTwentyRecipesFromEdamam, batchPostRecipes} from '../../fetches'
import { Database } from '@/app/database.types'
import RecipeCard from '../RecipeCard'

type EdamamResp = {
    from:number,
    to:number,
    count:number,
    _links:{
        next:{
            href:string,
            title:string
        }
    }
    hits:{
        recipe:EdamamRecipe
    }[]
}
type EdamamRecipe = {
    label:string,
    summary:string,
    instructionLines:string[],
    uri:string,
    url:string,
    image:string,
    ingredients:{
        text:string,
        quantity:number,
        measure:string,
        food:string
    }[],
    cuisine:string,
    mealType:string,
    dishType:string,
    tags:string[],
    cautions:string[],
    healthLabels:string[],
    dietLabels:string[],
    totalTime:number
}

const GoFetch = () => {
    const [searchTerm, setSearchTerm] = useState('chicken')
    const [mealType, setMealType] = useState('Breakfast')
    const [newRecipes, setNewRecipes] = useState<Database["public"]["Tables"]["recipes"]["Insert"][]>([]);
    const [nextLink, setNextLink] = useState<string | null>(null)
    useEffect(() => {
        fetchRecipes()
    }, [])
    async function fetchRecipes(){
        const recipes: EdamamResp = await fetchTwentyRecipesFromEdamam(searchTerm, mealType, nextLink)
        if(recipes._links.next){
            setNextLink(recipes._links.next.href)
        }
        recipes.hits.forEach((recipe:any) => {
        if (recipe.recipe){
            recipe = recipe.recipe as EdamamRecipe
            setNewRecipes(prevRecipes => [...prevRecipes, {
                name: recipe.label,
                source: recipe.url,
                image: recipe.image,
                ingredient_list: recipe.ingredients,
                cuisine: recipe.cuisine,
                meal_type: recipe.mealType,
                dish_type: recipe.dishType,
                tags: [].concat(recipe.tags, recipe.healthLabels, recipe.dietLabels),
                time: recipe.totalTime,
                cautions: recipe.cautions,
                URI: recipe.uri,
                avg_rating: null,
                created: null,
                description: recipe.summary,
                is_draft: false,
                search_index: null,
                user_id: null,
                steps: recipe.instructionLines,
            }]);
        }
    })}
  return(<div>
    <div>
      {newRecipes.map(recipe=>recipe.name+", ")}
    </div>
    <button className='btn btn-primary' onClick={fetchRecipes}>fetch more</button>
    <button className='btn btn-secondary' onClick={() => batchPostRecipes(newRecipes)}>post new recipes</button>
    </div>
    )
    //return(<div>{newRecipes.map(recipe=><RecipeCard recipe={recipe} getRecipeImageUrl={getRecipeImageUrl} key={recipe.id}/>)}</div>)
}

export default GoFetch
