import ReactMarkdown from "react-markdown";
import RecipeActions from "./RecipeActions";


export default function ClaudeRecipe({recipe}) {
  return (
    <section aria-live="polite" className="recipe-content">
      <h2 className="text-headfont">Chef Claude Recommendation:</h2>
      <RecipeActions recipe={recipe} />
    </section>
  );
}