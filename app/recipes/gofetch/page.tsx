import React from 'react'
import {fetchTwentyRecipesFromEdamam, getRecipeImageUrl} from '../../fetches'
import { Database } from '@/app/database.types'
import { randomUUID } from 'crypto'
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
const GoFetch = async () => {
    const searchTerm = 'chicken'
    const mealType = 'Breakfast'
    const newRecipes: Database["public"]["Tables"]["recipes"]["Row"][]=[]
    const recipes: EdamamResp = await fetchTwentyRecipesFromEdamam(searchTerm, mealType)
    recipes.hits.forEach((recipe:any) => {
        if (recipe.recipe){
            recipe = recipe.recipe as EdamamRecipe
            newRecipes.push({
                id: randomUUID(),
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
                steps: recipe.instructionLines
            })
        }
    })
  return(newRecipes.map(recipe=>recipe.name+", "))
    //return(<div>{newRecipes.map(recipe=><RecipeCard recipe={recipe} getRecipeImageUrl={getRecipeImageUrl} key={recipe.id}/>)}</div>)
}

export default GoFetch
