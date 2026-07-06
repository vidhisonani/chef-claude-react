import ReactMarkdown from "react-markdown";

export default function ClaudeRecipe(props) {
  return (
    <section
      aria-live="polite"
      className="recipe-content">
      <h2 className="text-headfont">Chef Claude Recommendation:</h2>
      <ReactMarkdown>{props.recipe}</ReactMarkdown>
    </section>
  );
}