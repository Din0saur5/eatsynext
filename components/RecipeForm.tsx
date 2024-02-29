// components/RecipeForm.tsx
"use client";

import { Fragment, useEffect, useState } from "react";
import { Database } from "../app/database.types";
import { useRouter } from "next/navigation";
import AutoCompleteInput from "./AutoComplete";
import { PostgrestError } from "@supabase/supabase-js";
 

type Ingredient = {
  food: string;
  quantity: number;
  unit: string;
  text: string;
};
type Recipe = Database["public"]["Tables"]["recipes"]["Insert"] & {
  ingredient_list: Ingredient[];
};
interface RecipeFormProps {
  recipe?: Recipe;
  user_id: any;
  postRecipe: (recipe: Recipe) => Promise<{
    data: null;
    error: PostgrestError;
} | {
    data: {
        id: string;
    }[] | null;
    error?: undefined;
}>
}


const defaultRecipe: Recipe = {
  name: "",
  time: 0,
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
const RecipeForm = ({ recipe = defaultRecipe, user_id, postRecipe}: RecipeFormProps) => {
 


  const [formData, setFormData] = useState<Recipe>({...recipe, user_id});
  const [tagInput, setTagInput] = useState('');
  const [newIngredient, setNewIngredient] = useState<Ingredient>({ food: '', quantity: 0, unit: '', text: '' });
  const [newStep, setNewStep] = useState('');
  const [imageError, setImageError] = useState(false);
  const router = useRouter();
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  


  //If recipe exists, update it. If not, create it
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {data, error} = await postRecipe(formData)
    if (error) {
      console.error(error);
      alert("An error occurred, please try again.");
      } else {
      const redirectId = recipe.id || data![0].id;
      router.push(`/recipes/${redirectId}`);
      }     
      
  };

  const handleImageError = () => {
    setImageError(true);
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

  const cookingMeasurementUnits = [
    "teaspoon",
    "tablespoon",
    "fluid ounce",
    "cup",
    "pint",
    "quart",
    "gallon",
    "milliliter",
    "liter",
    "pound",
    "ounce",
    "gram",
    "kilogram",
    "milligram",
    "pinch",
    "dash",
    "handful",
    "whole",
  ];

  const handleAddTag = () => {
    if ((formData.tags ?? []).length < 5) {
      setFormData({ ...formData, tags: [...(formData.tags ?? []), tagInput] });
      setTagInput("");
    } else {
      alert("You can add up to 5 tags only.");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: (formData.tags ?? []).filter(tag => tag !== tagToRemove),
    });
  };

  const handleNewIngredientChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewIngredient({ ...newIngredient, [e.target.name]: e.target.value });
  };

  const handleAddIngredient = () => {
    setFormData({
      ...formData,
      ingredient_list: [...formData.ingredient_list, newIngredient],
    });
    setNewIngredient({ food: "", quantity: 0, unit: "", text: "" }); // Reset the new ingredient input
  };

  const handleRemoveIngredient = (index: number) => {
    const updatedIngredients = formData.ingredient_list.filter(
      (_, idx) => idx !== index
    ) as Ingredient[];
    setFormData({ ...formData, ingredient_list: updatedIngredients });
  };

  const handleAddStep = () => {
    setFormData({ ...formData, steps: [...(formData.steps ?? []), newStep] });
    setNewStep(""); // Reset the new step input
  };

  const handleRemoveStep = (index: number) => {
    const updatedSteps = (formData.steps ?? []).filter(
      (_, idx) => idx !== index
    );
    setFormData({ ...formData, steps: updatedSteps });
  };

  const validateForm = () => {
    const errors = [];

    if (!(formData.name ?? "").trim()) {
      errors.push("Name is required");
    }
    if (!(formData.description ?? "").trim()) {
      errors.push("Description is required");
    }
    if (!(formData.image ?? "").trim()) {
      errors.push("Image URL is required");
    } else if (imageError) {
      errors.push("Image URL is not valid");
    }
    if (!(formData.dish_type ?? "").trim()) {
      errors.push("Dish type is required");
    }
    if (!(formData.meal_type ?? "").trim()) {
      errors.push("Meal type is required");
    }
    if (!(formData.cuisine ?? "").trim()) {
      errors.push("Cuisine is required");
    }
    if ((formData.ingredient_list ?? []).length === 0) {
      errors.push("At least one ingredient is required");
    }
    if ((formData.steps ?? []).length === 0) {
      errors.push("At least one step is required");
    }
    // Add other required field checks here

    if (errors.length > 1) {
      return "Missing multiple inputs";
    } else if (errors.length === 1) {
      return errors[0];
    } else {
      return false;
    }
  };

  const formValidationError = validateForm();

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="checkbox" name="my-accordion-2" defaultChecked />
          <div className="collapse-title text-xl font-medium">
            Basic Recipe Info
          </div>
          <div className="collapse-content">
            <input
              className="rounded-lg mb-2 mr-1"
              type="text"
              name="name"
              value={formData.name}
              onChange={e => onChange(e)}
              placeholder="Name"
              required
            />
            <div>
              <input
                className="rounded-lg mb-2 mr-1"
                type="text"
                name="image"
                value={formData.image ?? ""}
                onChange={e => onChange(e)}
                placeholder="Image URL"
                required
              />
              <button
                className="btn"
                onClick={() => {
                  const modal = document.getElementById(
                    "previewImg"
                  ) as HTMLDialogElement | null;
                  if (formData.image === "") {
                    alert("No URL entered");
                  } else if (modal && !imageError) {
                    modal.showModal();
                  } else {
                    alert("Image not suitable");
                  }
                }}
              >
                Preview Image
              </button>
            </div>
            <input
              className="rounded-lg mb-2 mr-1"
              type="number"
              name="time"
              value={formData.time ?? 0}
              onChange={e => onChange(e)}
              placeholder="Est. Cook Time"
              required
            />
            <AutoCompleteInput
              dataSet={dishTypes}
              onSuggestionSelect={value =>
                setFormData({ ...formData, dish_type: value })
              }
              onInputChange={e =>
                setFormData({ ...formData, dish_type: e.target.value })
              }
              inputClassName="border border-gray-400 rounded-lg mr-1 p-2"
              suggestionsClassName=""
            >
              <input
                type="text"
                value={formData.dish_type || ""}
                placeholder="Dish Type"
              />
            </AutoCompleteInput>
            <AutoCompleteInput
              dataSet={cuisineTypes}
              onSuggestionSelect={value =>
                setFormData({ ...formData, cuisine: value })
              }
              onInputChange={e =>
                setFormData({ ...formData, cuisine: e.target.value })
              }
              inputClassName="border border-gray-400 rounded-lg mr-1 p-2"
              suggestionsClassName=""
            >
              <input
                type="text"
                value={formData.cuisine || ""}
                placeholder="Cuisine Type"
              />
            </AutoCompleteInput>
            <div className="max-w-md">
              <div className="mb-2 block"></div>
              <select
                name="meal_type"
                value={formData.meal_type ?? ""}
                onChange={e => onChange(e)}
                required
              >
                <option className="text-white hover:text-blue-400">
                  Meal Type
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
            Description and Tags?
          </div>
          <div className="collapse-content">
            <div className="flex flex-col">
              <textarea
                className="rounded-lg mb-2 mr-1"
                name="description"
                value={formData.description ?? ""}
                onChange={e => onChange(e)}
                placeholder="Description"
                required
              />
              <label className="text-gray-500" htmlFor="tags">
                add up to 5 tags for better searchability{" "}
              </label>
              <input
                className="rounded-lg mb-2 mr-1"
                type="text"
                name="tags"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                placeholder="Tags"
              />
              <button type="button" onClick={handleAddTag}>
                Add Tag
              </button>
              <div>
                {(formData.tags ?? []).map((tag, index) => (
                  <div key={index} className="tag">
                    #{tag}
                    <button type="button" onClick={() => handleRemoveTag(tag)}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="checkbox" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">Ingredients?</div>
          <div className="collapse-content">
            {/* New ingredient inputs */}
            <input
              type="text"
              name="food"
              value={newIngredient.food}
              onChange={handleNewIngredientChange}
              placeholder="Food"
            />
            <input
              type="number"
              name="quantity"
              value={newIngredient.quantity.toString()}
              onChange={handleNewIngredientChange}
              placeholder="Quantity"
            />
            <AutoCompleteInput
              dataSet={cookingMeasurementUnits}
              onSuggestionSelect={value =>
                setNewIngredient({ ...newIngredient, unit: value })
              }
              onInputChange={e => handleNewIngredientChange(e)}
              inputClassName="border border-gray-400 rounded-lg mr-1 p-2"
              suggestionsClassName=""
            >
              <input
                type="text"
                name="unit"
                value={newIngredient.unit}
                placeholder="Unit"
              />
            </AutoCompleteInput>

            <input
              type="text"
              name="text"
              value={newIngredient.text}
              onChange={handleNewIngredientChange}
              placeholder="Extra Details"
            />
            <button type="button" onClick={handleAddIngredient}>
              Add Ingredient
            </button>

            {/* List of ingredients */}
            {(formData.ingredient_list ?? []).map((ingredient, index) => {
              const ing = ingredient as Ingredient;

              if (!ing) return null;

              return (
                <div key={index}>
                  {`${ing.quantity ?? ""} ${ing.unit ?? ""} ${
                    ing.food ?? ""
                  }: ${ing.text ?? ""}`}
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(index)}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="checkbox" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">Steps?</div>
          <div className="collapse-content">
            <input
              type="text"
              value={newStep}
              onChange={e => setNewStep(e.target.value)}
              placeholder="New Step"
            />
            <button type="button" onClick={handleAddStep}>
              Add Step
            </button>
            {/* List of steps */}
            {(formData.steps ?? []).map((step, index) => (
              <div key={index}>
                {`Step ${index + 1}: ${step}`}
                <button type="button" onClick={() => handleRemoveStep(index)}>
                  Remove
                </button>
              </div>
            ))}{" "}
          </div>
        </div>

        <div className="flex flex-row justify-between">
          <div
            className={formValidationError ? "tooltip tooltip-bottom" : ""}
            data-tip={`${formValidationError}`}
          >
            <button
              disabled={!!formValidationError}
              className={`btn mt-4 px-4 py-2 ${
                formValidationError ? "bg-gray-500 text-gray-200" : ""
              }`}
              type="submit"
            >
              Create Recipe
            </button>
          </div>
        </div>
      </form>
      <dialog id="previewImg" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Preview!</h3>
          <img
            src={formData.image || "public/DefaultRecipeImg.png"}
            onError={handleImageError}
            alt="Recipe"
          />
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default RecipeForm;
