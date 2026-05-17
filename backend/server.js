const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    process.env.FRONTEND_URL
  ]
}));

app.use(express.json());

// ── secret key 
const GROQ_API_KEY = process.env.GROQ_API_KEY;

app.get("/", (req, res) => {
  res.json({ message: "Chef Claude Backend is running!" });
});

app.post("/api/recipe", async (req, res) => {

  try {
    // 1. Get ingredients from the request body
    const { ingredients } = req.body;

    if (!ingredients || ingredients.length === 0) {
      return res.status(400).json({ error: "No ingredients provided!" });
    }

    // 2. Vegetarian check
    const nonVegKeywords = [
      "chicken", "mutton", "beef", "pork", "fish", "egg", "eggs",
      "prawn", "shrimp", "lamb", "turkey", "bacon", "ham", "tuna", "salmon"
    ];
    const ingredientsList = ingredients.join(", ").toLowerCase();
    const isVeg = !nonVegKeywords.some(word => ingredientsList.includes(word));

    // 3. Build the prompt for Groq
    const prompt = `
      You are a professional chef. Create a detailed recipe using ONLY these ingredients
      (you may add basic pantry staples like salt, oil, water): ${ingredientsList}.

      ${isVeg
        ? "IMPORTANT: Keep this recipe strictly VEGETARIAN. No meat, fish, or eggs."
        : "Feel free to use the non-vegetarian ingredients provided."
      }

      Use this EXACT format (plain markdown, NO tables):

      ## [Creative Recipe Name]

      **Prep time:** X mins | **Cook time:** X mins | **Serves:** X

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

    // 4. Call Groq API
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

    // 5. Extract recipe text and send back
    const data = await groqResponse.json();
    const recipe = data.choices[0].message.content;

    res.json({ recipe, isVeg });

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Something went wrong in the kitchen! 🔥" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\nKitchen is open on http://localhost:${PORT}`);
  console.log(`Groq key loaded: ${GROQ_API_KEY ? "✅ Yes" : "❌ MISSING — check .env!"}\n`);
});

module.exports = app;