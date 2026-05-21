import React, { useState, useRef, useEffect } from "react";
import IngredientsList from "./IngredientsList";
import ClaudeRecipe from "./ClaudeRecipe";
import { generateRecipe } from "../api/ai";

export default function MainContent() {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

    await generateRecipe(ingredients)
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
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  }

  return (
    <>
      <main>
        <form action={addIngredient} className="add-ingredient-form">
          <input
            type="text"
            aria-label="Add ingredient"
            placeholder="e.g. oregano"
            name="ingredient"
          />
          <button>Add Ingredient</button>
        </form>
        {ingredients.length > 0 && (
          <IngredientsList
            ref={recipeSection}
            ingredients={ingredients}
            getRecipe={getRecipe}
            loading={loading}
          />
        )}

        {/* loading */}
        {loading && (
          <p className="recipe-loading-msg">
            👨‍🍳 Chef Claude is cooking your recipe, please wait...
          </p>
        )}

        {/* Error */}
        {error && (
          <div className="recipe-error">
            <p>{error}</p>
            {/* <button onClick={getRecipe}>Try Again</button> */}
          </div>
        )}

        {recipe && !loading && <ClaudeRecipe recipe={recipe} />}
      </main>
    </>
  );
}
