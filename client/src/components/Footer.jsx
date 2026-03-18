/** Site footer */
import { FiArrowUp } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <span className="text-xl font-display font-bold gradient-text">SB</span>
          <span className="text-slate-500 text-xs hidden sm:block">|</span>
          <p className="text-slate-500 text-xs">
            (c) {new Date().getFullYear()} Samir Bajagain. All rights reserved.
          </p>
        </div>

        <p className="text-slate-500 text-xs italic">
          "Engineering Vision. Building Impact."
        </p>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="w-9 h-9 rounded-full glass flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-500/40 transition-all"
          aria-label="Back to top"
        >
          <FiArrowUp />
        </button>
      </div>
    </footer>
  );
}



