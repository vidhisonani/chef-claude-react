const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function generateRecipe(ingredients) {
  try {
    const response = await fetch(`${API_URL}/api/recipe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients })
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || "Failed to get recipe");
    }

    return response.json();

  } catch (err) {
    throw new Error(err.message || "Network error, please try again!");
  }
}