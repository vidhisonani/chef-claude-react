import { X } from 'lucide-react';

export default function IngredientsList(props) {
  const ingredientsListItems = props.ingredients.map((ingredient) => (
    <li key={ingredient} className="text-slate-600 leading-7">
      <div className='flex justify-between items-center'>
        {ingredient[0].toUpperCase() + ingredient.slice(1)}
        <button onClick={() => props.removeIngredient(ingredient)} className="ml-2 text-slate-600 leading-7 cursor-pointer hover:text-red-500 transition-colors duration-500">
          <X size={18} strokeWidth={2.75} />
        </button>
      </div>
    </li>
  ));

  return (
    <>
      <section>
        <h2 className="text-2xl font-semibold text-slate-800 my-4">Ingredients on hand:</h2>
        <ul className="list-disc pl-6 mb-12 space-y-1" aria-live="polite">
          {ingredientsListItems}
        </ul>
        {props.ingredients.length > 3 && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 rounded-lg bg-recipe-bg px-7 py-7">
            <div ref={props.ref}>
              <h3 className="text-lg font-medium text-slate-800 leading-6 mb-4">Ready for a recipe?</h3>
              <p className="text-sm text-slate-500 leading-5">Generate a recipe from your list of ingredients.</p>
            </div>
            <button
              onClick={props.getRecipe}
              disabled={props.loading}
              className={`rounded-md bg-terracotta px-4 py-2 text-sm text-offwhite shadow transition-colors duration-500 hover:bg-terracotta-hover ${props.loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
                }`}
            >
              {props.loading ? "⏳ Generating..." : "Get a recipe"}
            </button>
          </div>
        )}
      </section>
    </>
  );
}