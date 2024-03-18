"use server";
import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";
import { cookies } from 'next/headers'



if (
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
) {
  throw new Error(
    "Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables"
  );
}

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);


//get the auth user table data from currently logged in user:
export const getLoggedInUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.log("Error fetching user:", error.message);
  } else {
    return data;
  }
};

//change user email
export const changeUserEmail = async (newEmail: string) => {
  const { data, error } = await supabase.auth.updateUser({ email: newEmail });
  if (error) {
    console.log("Error changing email:", error.message);
  } else {
    return data;
  }
};

//change user password
export const changeUserPass = async (newPass: string) => {
  const { data, error } = await supabase.auth.updateUser({ password: newPass });
  if (error) {
    console.log("Error changing password:", error.message);
  } else {
    return data;
  }
};
// //forgot password email and on return to app
// /**
//  * Step 1: Send the user an email to get a password reset token.
//  * This email contains a link which sends the user back to your application.
//  */
// const { data, error } = await supabase.auth
//   .resetPasswordForEmail('user@email.com')

// /**
//  * Step 2: Once the user is redirected back to your application,
//  * ask the user to reset their password.
//  */
//  useEffect(() => {
//    supabase.auth.onAuthStateChange(async (event, session) => {
//      if (event == "PASSWORD_RECOVERY") {
//        const newPassword = prompt("What would you like your new password to be?");
//        const { data, error } = await supabase.auth
//          .updateUser({ password: newPassword })

//        if (data) alert("Password updated successfully!")
//        if (error) alert("There was an error updating your password.")
//      }
//    })
//  }, [])

//I think we should leave metadata alone for now, although it might seem good for ssot, i think it could be benifical to leave it alone
//because I like having the full control over the profile table and if we want to implement 3rd party auth the metadata gets filled with that stuff
// but heres the fn anyway
export const changeUserMetaData = async (metadata: object) => {
  const { data, error } = await supabase.auth.updateUser({
    data: metadata,
  });
  if (error) {
    console.log("Error changing password:", error.message);
  } else {
    return data;
  }
};

//user by id get, patch, delete
//get
export const getPublicUserById = async (id: string) => {
  const { data: userData, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log("Error fetching row:", error.message);
  } else {
    return userData;
  }
};

//patch
interface UserUpdateObject {
  display_name?: string;
  first_name?: string | null;
  last_name?: string | null;
  // Add other user properties as needed
}

export const PatchUser = async (
  id: string,
  newUserObject: UserUpdateObject
) => {
  const { data, error } = await supabase
    .from("users")
    .update({
      ...newUserObject, // Correctly spread the properties of newUserObject here
    })
    .eq("id", id)
    .select();

  if (error) {
    console.log("Error patching row:", error.message);
    return null; // Or handle the error as appropriate
  } else {
    return data;
  }
};

//delete has to be done by request as it requires the servie_role key, has to stay on server, we will ahve to figure this out
// const { data, error } = await supabase.auth.admin.deleteUser(
//    user id
//   )

//have to add rls to REVOKE or just check if user "exists"
// create policy "Users can delete a profile."
// on profiles for delete
// to authenticated
// using ( auth.uid() = user_id );

//recipe query by n (ingredient, tag, title, meal type, cusinse type, rating, user) only return basic info name, rating, cook time, id, image, # of favorites


//recipe by id get, patch, delete ()
//get probably not going to be used as much as the one under it
export const fetchRecipeById = async (id: string) => {
  const { data: recipeData, error } = await supabase
    .from("recipes")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.log("Error fetching row:", error.message);
  } else {
    return recipeData;
  }
};

// get recipe with reviews
export const fetchRecipeWithReviews = async (id: string) => {
  const { data: recipeWithReviews, error } = await supabase
    .from("recipes")
    .select("*, reviews(*)")
    .eq("id", id)
    .single();
  if (error) {
    console.log("Error fetching row:", error.message);
  } else {
    return recipeWithReviews;
  }
};

//post recipe
type Ingredient = {
  food: string;
  quantity: number;
  unit: string;
  text: string;
};
type Recipe = Database["public"]["Tables"]["recipes"]["Insert"]


export const postRecipe = async (recipe:Recipe) => {
const operation = recipe.id
? supabase.from("recipes").update(recipe).eq("id", recipe.id)
: supabase.from("recipes").insert([recipe]).select("id");

const { data, error } = await operation;
if (error) {
  console.error("Error posting review:", error.message);
  return { data: null, error };
}
else{
  return { data }
}

}


//update
// const { error } = await supabase
//   .from('countries')
//   .update({ name: 'Australia' })
//   .eq('id', 1)

//review post
type Review = {
  rating: number;
  title: string;
  comment: string;
  user_id: string;
  recipe_id: string;
};

// postReview function with TypeScript typings
export const postReview = async (review: Review) => {
  // Insert the review
  const { data, error } = await supabase.from("reviews").insert([
    {
      rating: review.rating,
      title: review.title,
      comment: review.comment,
      user_id: review.user_id,
      recipe_id: review.recipe_id,
    },
  ]);

  // Handle any error while posting the review
  if (error) {
    console.error("Error posting review:", error.message);
    return { data: null, error };
  }

  // Call the calculate_average_rating function
  const recipeIdParam = review.recipe_id;
  const { error: rpcError } = await supabase.rpc("calculate_average_rating", {
    recipe_id_param: recipeIdParam,
  });

  // Handle any error from the RPC call
  if (rpcError) {
    console.error("Error calculating average rating:", rpcError.message);
    return { data: null, error: rpcError };
  }

  // Return the review data if successful
  return { data };
};

//review by id patch delete

//favorites post and delete
//step 1 check if userid and recipe id pair exists
//step 2 if it does delete if it does not post

//favorites get by user

//favorites get by recipe

//make a number of favorites column on recipe that triggers on change in favorites db similar to avg, must add front end functionailty to match back end.

//make a average rating column with a db trigger on reviews
// CREATE OR REPLACE FUNCTION calculate_average_rating(recipe_id INTEGER)
// RETURNS NUMERIC AS $$
//   SELECT AVG(rating) FROM reviews WHERE recipe_id = $1;
// $$ LANGUAGE SQL;

// CREATE TRIGGER update_recipe_average_rating
// AFTER INSERT OR UPDATE ON reviews
// FOR EACH ROW
// EXECUTE FUNCTION calculate_average_rating(NEW.recipe_id);

//search functionality
export async function searchRecipes(
  page: number=1,
  filters: {
    searchTerm: string | null;
    tags: string | null;
    meal_type: string | null;
    cuisine: string | null;
    dish_type: string | null;
    user_id: string | null;
  }
) {
  const { searchTerm, tags, meal_type, cuisine, dish_type, user_id } = filters;
  let query = supabase.from("recipes").select("*");
  if (user_id) query = query.eq("user_id", user_id);
  if (meal_type) query = query.eq("meal_type", meal_type);
  if (dish_type) query = query.eq("dish_type", dish_type);
  if (cuisine) query = query.eq("cuisine", cuisine);
  if (tags) query = query.eq("tags", tags);
  if (searchTerm) {
    query = query.textSearch("search_index", searchTerm, {
      config: "english",
      type: "websearch",
    });
  }

  const { data: searchResults, error } = await query.range(
    (page - 1) * 20,
    page * 20 - 1
  );

  if (error) {
    console.error("Error searching recipes:", error.message);
    throw error;
  }

  return searchResults;
}
export async function getRecipeImageUrl(id: string) {
  const { data: image, error } = await supabase
    .from("recipes")
    .select("image")
    .eq("id", id)
    .single();
  if (error) {
    console.error("Error fetching image:", error.message);
    throw error;
  }
  if (image.image) {
    const resp = await fetch(image.image);
    if (resp.ok) {
      return image.image;
    } else {
      return refreshImageUrl(id);
    }
  }
}
function refreshImageUrl(id: string) {
  return "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Oops_Stop_Sign_icon.svg/640px-Oops_Stop_Sign_icon.svg.png";
}
export async function fetchRecipeFromEdamam(uri: string){
  const encodedUri = encodeURIComponent(uri);
  const resp = await fetch(`https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri=${encodedUri}&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}`)
  if (resp.ok){
    const data = await resp.json()
    return data
  } else{
    return null
  }
}
export async function fetchTwentyRecipesFromEdamam(searchTerm: string, meal_type: string, nextURL?: string | null){
  let resp;
  if(nextURL){
    resp = await fetch(nextURL)
  } else {
    resp = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${searchTerm}&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}&mealType=${meal_type}`)
  }
  if (resp.ok){
    const data = await resp.json()
    return data
  } else{
    return null
  }
}

export async function getUserIdFromToken(){
const cookieStore = cookies()
  const userJ = cookieStore.get('sb-yhqlqbchshimjuykugsd-auth-token')
 if (userJ){
  const user = await JSON.parse(userJ.value)
  
  const id = await user.user.id
 
  return id
 } else{
  
 }
}

export async function batchPostRecipes(Recipes:Recipe[]){
  const operation = supabase.from("recipes").insert(Recipes).select("id",);
  const { data, error } = await operation;
  if (error) {
    console.error("Error posting recipes:", error.message);
    return { data: null, error };
  }
  else{
    return { data }
  }
}