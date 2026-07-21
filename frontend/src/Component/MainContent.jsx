import React, { useState, useRef, useEffect } from "react";
import IngredientsList from "./IngredientsList";
import ClaudeRecipe from "./ClaudeRecipe";
import { generateRecipe } from "../api/ai";
import { Plus } from "lucide-react";

export default function MainContent() {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ingredientError, setIngredientError] = useState("");
  const [servings, setServings] = useState(2);
  const recipeSection = useRef(null);

  useEffect(() => {
    if (recipe !== "" && recipeSection.current !== null) {
      // recipeSection.current.scrollIntoView({behavior: "smooth"});
      const yCoord = recipeSection.current.getBoundingClientRect().top;
      window.scroll({
        top: yCoord,
        behavior: "smooth",
      });
    }
  }, [recipe]);

  async function getRecipe() {
    setLoading(true);
    setError("");
    setRecipe("");

    await generateRecipe(ingredients, servings)
      .then((data) => {
        setRecipe(data.recipe);
      })
      .catch((err) => {
        setError("Oops! Something went wrong in the kitchen. Please try again");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient").trim().toLowerCase();
    if (newIngredient === "") {
      setIngredientError("Please enter a valid ingredient");
      return;
    }
    if (ingredients.includes(newIngredient)) {
      setIngredientError("Ingredient already added");
      return;
    }
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
    setIngredientError("");
  }

  function removeIngredient(ingredientToRemove) {
    setIngredients((prev) => prev.filter((i) => i !== ingredientToRemove));
  }

  return (
    <>
      <main className="pt-[30px] pb-2.5 px-[30px] ">
        {ingredients.length < 4 && (
          <p className="text-center mb-2 font-medium text-xl text-terracotta">
            Add at least 4 ingredients to get a recipe.
          </p>
        )}
        <form
          action={addIngredient}
          className="flex flex-col gap-y-3 gap-x-3 w-full max-w-[500px] mx-auto my-0 md:flex-none md:flex md:flex-row md:gap-x-3"
        >
          <input
            type="text"
            aria-label="Add ingredient"
            placeholder="e.g. oregano"
            name="ingredient"
            required
            className="flex-1 border border-gray-300 shadow-input min-w-0 px-2 py-2 rounded-md border-solid bg-white"
          />
          <button className="inline-flex items-center justify-center gap-1.5 bg-charcoal text-cream font-medium text-sm cursor-pointer px-5 py-[9px] rounded-md transition-colors duration-500 hover:bg-charcoal-hover">
            <Plus size={16} strokeWidth={2.5} /> Add Ingredient
          </button>
        </form>

        <div className="flex items-center gap-2 mt-3 max-w-[500px] mx-auto justify-center">
          <span className="text-sm text-slate-500">Serves:</span>
          {[1, 2, 4, 6].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setServings(n)}
              className={`w-9 h-9 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer
              ${
                servings === n
                  ? "bg-charcoal text-cream"
                  : "bg-recipe-bg text-slate-600 hover:bg-slate-200"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
        {ingredientError && (
          <p className="text-center text-red-500 mt-4">{ingredientError}</p>
        )}

        {ingredients.length > 0 && (
          <IngredientsList
            ref={recipeSection}
            ingredients={ingredients}
            servings={servings}
            getRecipe={getRecipe}
            removeIngredient={removeIngredient}
            loading={loading}
          />
        )}

        {/* loading */}
        {loading && (
          <p className="text-center italic my-4">
            👨‍🍳 Chef Claude is cooking your recipe, please wait...
          </p>
        )}

        {/* Error */}
        {error && (
          <div className="text-center text-red-500 my-4">
            <p>{error}</p>
          </div>
        )}
        {recipe && !loading && <ClaudeRecipe recipe={recipe} />}
      </main>
    </>
  );
}
