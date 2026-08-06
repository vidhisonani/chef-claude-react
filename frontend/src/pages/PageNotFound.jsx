import { Link, useNavigate } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { MoveLeft } from "lucide-react";
import ChefClaudeLogo from "../assets/chef-claude-icon.png";

export default function PageNotFound() {
  useDocumentTitle("Page Not Found | Chef Claude");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-4">
      <Link to="/" className="flex items-center gap-2 mb-12 group">
        <img src={ChefClaudeLogo} alt="Chef Claude Logo" className="w-8" />
        <span className="text-2xl font-normal text-charcoal group-hover:text-charcoal-hover transition">
          Chef Claude
        </span>
      </Link>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 max-w-md w-full text-center">
        <div className="relative mb-6 select-none">
          <p
            aria-hidden="true"
            className="text-[7rem] font-extrabold leading-none text-recipe-bg tracking-tighter"
          >
            404
          </p>
          <p className="absolute inset-0 flex items-center justify-center text-[3rem] font-extrabold text-terracotta tracking-tight">
            404
          </p>
        </div>

        <h1 className="text-xl font-bold text-headfont mb-2">Page not found</h1>
        <p className="text-sm text-slate-500 mb-8 leading-relaxed">
          Looks like this recipe got lost in the kitchen.
          <br />
          This page doesn't exist or may have been moved.
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => {
              if (window.history.length > 1) {
                navigate(-1);
              } else {
                navigate("/");
              }
            }}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 text-slate-600 text-sm font-medium hover:bg-recipe-bg transition cursor-pointer"
          >
            <MoveLeft className="w-4 h-4" />
            Go back
          </button>

          <Link
            to="/"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-charcoal text-cream text-sm font-medium hover:bg-charcoal-hover transition"
          >
            Go home
          </Link>
        </div>
      </div>

      <p className="mt-8 text-xs text-slate-400">
        If you think this is a mistake,{" "}
        <Link
          to="/"
          className="text-terracotta hover:text-terracotta-hover underline underline-offset-2"
        >
          return home
        </Link>
      </p>
    </div>
  );
}
