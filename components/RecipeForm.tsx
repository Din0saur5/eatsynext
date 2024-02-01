// components/RecipeForm.tsx
"use client";
import { useState } from "react";
import { Database } from "../app/database.types";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

type Recipe = Database["public"]["Tables"]["recipes"]["Insert"];

interface RecipeFormProps {
  recipe?: Recipe;
}

const defaultRecipe: Recipe = {
  name: "",
  description: "",
  ingredient_list: [],
  cuisine: "",
  image: "",
  dish_type: "",
  meal_type: "",
  steps: [],
  tags: [],
};

//Create form component, get recipe prop from parent if editing, create blank recipe if not
const RecipeForm = ({ recipe = defaultRecipe }: RecipeFormProps) => {
  // Create a supabase client for interacting with the db, use Database to define the types
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const router = useRouter();
  const [formData, setFormData] = useState<Recipe>(recipe);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //If recipe exists, update it. If not, create it
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const operation = recipe.id
      ? supabase.from("recipes").update(formData).eq("id", recipe.id)
      : supabase.from("recipes").insert([formData]).select("id");

    const { data, error } = await operation;
    if (error) {
      console.error(error);
      alert("An error occurred, please try again.");
    } else {
      const redirectId = recipe.id || data![0].id;
      router.push(`/recipes/${redirectId}`);
    }
  };
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
  return (
    <div>
      <form onSubmit={onSubmit}></form>
    </div>
  );
};

export default RecipeForm;
