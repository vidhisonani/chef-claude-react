import { Link } from "react-router-dom";
import ChefClaudeLogo from "../assets/chef-claude-icon.png";
import useAuth from "../hooks/useAuth";

export default function Footer() {
  const { user } = useAuth();

  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row justify-between gap-10 mb-8">
          <div className="flex flex-col gap-3 max-w-xl">
            <div className="flex items-center gap-2">
              <img
                src={ChefClaudeLogo}
                alt="Chef Claude Logo"
                className="w-7"
              />
              <span className="font-medium text-slate-700">Chef Claude</span>
            </div>

            <p className="text-sm text-slate-500 leading-relaxed">
              A full-stack AI recipe generator built as a learning project —
              exploring React, Node.js, Express, MongoDB, and AI APIs.
            </p>

            <div className="mt-1">
              <p className="text-sm font-medium text-slate-700">Vidhi Patel</p>
              <p className="text-xs text-slate-400">
                Computer Engineering Student
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-slate-700">Quick Links</p>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  to="/"
                  className="text-sm text-slate-500 hover:text-terracotta transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              {user && (
                <li>
                  <Link
                    to="/history"
                    className="text-sm text-slate-500 hover:text-terracotta transition-colors duration-200"
                  >
                    My History
                  </Link>
                </li>
              )}
              <li>
                <a
                  href="https://github.com/vidhisonani/chef-claude-react"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-500 hover:text-terracotta transition-colors duration-200"
                >
                  GitHub Repo
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6 flex justify-center gap-3">
            <a
              href="https://vidhipatel-portfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-500 hover:text-terracotta transition-colors duration-200"
            >
              Portfolio
            </a>
            <span className="text-slate-300">·</span>
            <a
              href="https://www.linkedin.com/in/vidhipatel73/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-500 hover:text-terracotta transition-colors duration-200"
            >
              LinkedIn
            </a>
            <span className="text-slate-300">·</span>
            <a
              href="https://github.com/vidhisonani"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-slate-500 hover:text-terracotta transition-colors duration-200"
            >
              GitHub
            </a>
        </div>
      </div>
    </footer>
  );
}
