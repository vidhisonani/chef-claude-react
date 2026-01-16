import Groq from "groq-sdk";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. 
Do not use tables — format everything in plain Markdown with headings, lists, and paragraphs only.
If the user does NOT mention any non-vegetarian ingredients (meat, fish, poultry) or eggs, then do NOT include any non-vegetarian items or eggs in the recipe. 
You don't need to use every ingredient they mention in your recipe. 
The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. 
Format your response in Markdown to make it easy to render in a web page.
Finish the recipe completely.
If space is limited, prioritize completing instructions over extras.
`;

// Initialize Groq client (browser mode)
const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true, // allows client-side usage
});

export async function getRecipeFromGroq(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ");
    try {
        const response = await groq.chat.completions.create({
            model: "openai/gpt-oss-20b", // Groq model (OpenAI-style)
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                {
                    role: "user",
                    content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
                },
            ],
            max_completion_tokens: 2048,
        });

        // Return the text of the first choice
        return response.choices?.[0]?.message?.content ?? "No recipe generated.";
    } catch (err) {
        console.error("Groq API error:", err);
        return "Failed to generate recipe.";
    }
}
