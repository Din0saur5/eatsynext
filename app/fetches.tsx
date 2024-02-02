
import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'
import { UUID } from 'crypto'

const supabase = createClient<Database>(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)


//get the auth user table data from currently logged in user:
const getLoggedInUser = async () => {  
    const { data, error } = await supabase.auth.getUser()
    if (error) {
        console.log('Error fetching user:', error.message)
    } else {
        return data
    }
}

//change user email
const { data, error } = await supabase.auth.updateUser({email: 'new@email.com'})
//change user password
const { data, error } = await supabase.auth.updateUser({password: 'new password'})
//forgot password email and on return to app
/**
 * Step 1: Send the user an email to get a password reset token.
 * This email contains a link which sends the user back to your application.
 */
const { data, error } = await supabase.auth
  .resetPasswordForEmail('user@email.com')

/**
 * Step 2: Once the user is redirected back to your application,
 * ask the user to reset their password.
 */
 useEffect(() => {
   supabase.auth.onAuthStateChange(async (event, session) => {
     if (event == "PASSWORD_RECOVERY") {
       const newPassword = prompt("What would you like your new password to be?");
       const { data, error } = await supabase.auth
         .updateUser({ password: newPassword })

       if (data) alert("Password updated successfully!")
       if (error) alert("There was an error updating your password.")
     }
   })
 }, [])

//I think we should leave metadata alone for now, although it might seem good for ssot, i think it could be benifical to leave it alone 
//because I like having the full control over the profile table and if we want to implement 3rd party auth the metadata gets filled with that stuff
// but heres the fn anyway
const { data, error } = await supabase.auth.updateUser({
    data: { hello: 'world' }
  })

//user by id get, patch, delete
//get
const getPublicUserById = async (id: UUID) => {
  
    
    const { data: userData, error } = await supabase
    .from<Database>('users')
    .select('*')
    .eq('id', id)
    
    if (error) {
        console.log('Error fetching row:', error.message)
    } else {
        return userData
    }
    
}

//patch
const PatchUser = async (id: UUID, newUserObject: object) => {
    const { data, error } = await supabase
    .from<Database>('users')
    .update({ 
        newUserObject
    })
    .eq('id', id)
    .select()
    if (error) {
        console.log('Error patching row:', error.message)
    } else {
        return data
    }
}
//delete has to be done by request as it requires the servie_role key, has to stay on server, we will ahve to figure this out
const { data, error } = await supabase.auth.admin.deleteUser(
   user id
  )


//have to add rls to REVOKE or just check if user "exists"
// create policy "Users can delete a profile."
// on profiles for delete
// to authenticated
// using ( auth.uid() = user_id );



//recipe query by n (ingredient, tag, title, meal type, cusinse type, rating, user) only return basic info name, rating, cook time, id, image, # of favorites

// post recipe
const PostRecipe = async () => {
    const { data, error } = await supabase
    .from('countries')
    .insert({ id: 1, name: 'Denmark' })
    .select()
    if (error) {
        console.log('Error posting row:', error.message)
    } else {
        return data
    }
}

//recipe by id get, patch, delete ()
//get probably not going to be used as much as the one under it 
const recipeById = async (id) => {
    const { data: recipeData, error } = await supabase
    .from<Database>('recipes')
    .select('*')
    .eq('id', id)
    .single()
    if (error) {
        console.log('Error fetching row:', error.message)
    } else {
        return recipeData
    }
}


// get recipe with reviews  
const recipeWithReviews = async (id) => {
  
  const { data: recipeWithReviews, error } = await supabase
    .from<Database>('recipes')
    .select('*, reviews(*)')
    .eq('id', id)
    .single()
    if (error) {
        console.log('Error fetching row:', error.message)
    } else {
        return recipeWithReviews
    }
}

//update
const { error } = await supabase
  .from('countries')
  .update({ name: 'Australia' })
  .eq('id', 1)

//review post

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