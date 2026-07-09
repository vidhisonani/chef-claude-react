import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { X } from 'lucide-react';
import RecipeActions from "./RecipeActions";

export default function RecipeHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const { user } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    const token = localStorage.getItem("token");
    fetch(`${API_URL}/api/recipe/history`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setHistory(data.recipes);
        setLoading(false);
      })
  }, [user]);

  function getTitle(recipe) {
    return recipe.split("\n")[0].replace("## ", "");
  }

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric"
    });
  }

  return (
    <div className="mt-12 max-w-2xl mx-auto px-4">
      <h2 className="text-2xl font-semibold text-slate-800 mb-4">Recent Recipes</h2>

      {!user ? (
        <div className="bg-recipe-bg rounded-lg p-6 text-center">
          <p className="text-slate-500">Login to see your recipe history.</p>
        </div>
      ) : loading ? (
        <p className="text-slate-500 italic">Loading history...</p>
      ) : history.length === 0 ? (
        <div className="bg-recipe-bg rounded-lg p-6 text-center">
          <p className="text-slate-500">No recipes yet — generate one!</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {history.map((item) => (
            <li key={item._id}
              onClick={() => setSelectedRecipe(item)}
              className="flex justify-between items-center bg-recipe-bg rounded-lg px-5 py-4">
              <div>
                <p className="font-medium text-slate-800">{getTitle(item.recipe)}</p>
                <p className="text-sm text-slate-500 mt-1">
                  {item.isVeg ? "Veg" : "Non-veg"} · {item.ingredients.join(", ")}
                </p>
              </div>
              <span className="text-xs text-slate-400 shrink-0 ml-4">{formatDate(item.createdAt)}</span>
            </li>
          ))}
        </ul>
      )}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 relative">
            <button onClick={() => setSelectedRecipe(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer">
              <X size={18} strokeWidth={2.75} />
            </button>
            <div className="recipe-content">
              <RecipeActions recipe={selectedRecipe.recipe} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}