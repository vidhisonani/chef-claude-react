const Recipe = require('../models/Recipe');


const nonVegKeywords = [
  "chicken", "mutton", "beef", "pork", "fish", "egg", "eggs",
  "prawn", "shrimp", "lamb", "turkey", "bacon", "ham", "tuna", "salmon"
];

async function generateRecipe(req, res) {
  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  try {
    const { ingredients, servings } = req.body;
    if (!ingredients || ingredients.length === 0) {
      return res.status(400).json({ error: "No ingredients provided!" });
    }

    const ingredientsList = ingredients.join(", ").toLowerCase();
    const isVeg = !nonVegKeywords.some(word => ingredientsList.includes(word));

    const prompt = `
    You are a professional chef. Create a detailed recipe using SOME or ALL of these ingredients — use what makes sense for the dish, you don't have to use everything.
    This recipe MUST serve EXACTLY ${servings} person/people — do not give a range, use the exact number.
    (you may add basic pantry staples like salt, oil, water): ${ingredientsList}. 

    ${isVeg
        ? "IMPORTANT: Keep this recipe strictly VEGETARIAN. No meat, fish, or eggs."
        : "Feel free to use the non-vegetarian ingredients provided."
      }

      Use this EXACT format (plain markdown, NO tables):

      ## [Creative Recipe Name]

      **Prep time:** X mins | **Cook time:** X mins | **Serves:** ${servings}

      ### Ingredients
      - ingredient with quantity
      - ingredient with quantity

      ### Instructions
      1. First step
      2. Second step

      ### Chef's Tips
      - One helpful tip
      - One helpful tip
    `;

    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1000,
        temperature: 0.7
      })
    });

    if (!groqResponse.ok) {
      const err = await groqResponse.json();
      console.error("Groq error:", err);
      return res.status(502).json({ error: "AI chef is unavailable. Try again!" });
    }

    const data = await groqResponse.json();
    const recipe = data.choices[0].message.content;

    await Recipe.create({ ingredients, servings, recipe, isVeg });
    res.json({ recipe, isVeg });

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Something went wrong in the kitchen!" });
  }
}

module.exports = { generateRecipe };