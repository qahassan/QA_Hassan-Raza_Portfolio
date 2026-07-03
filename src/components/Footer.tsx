import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import profilePic from "../assets/hero.png";

export default function Footer() {
  return (
    <footer className="relative py-12 px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3 font-display font-semibold text-lg">
          <span className="rounded-full p-[1px] bg-gradient-to-br from-indigo-500 to-cyan-400">
            <span className="flex items-center justify-center w-9 h-9 rounded-full overflow-hidden bg-slate-950 border border-white/10">
              <img src={profilePic} alt="Hassan Raza" className="w-full h-full object-cover object-center" />
            </span>
          </span>
          Hassan Raza<span className="text-gradient">.QA</span>
        </div>
        <p className="text-slate-600 text-sm text-center">
          © {new Date().getFullYear()} Hassan Raza · Crafted with care for quality.
        </p>
        <motion.button
          data-cursor-hover
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          whileHover={{ y: -4 }}
          className="glass rounded-xl px-4 py-2.5 flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ArrowUp size={15} /> Back to top
        </motion.button>
      </div>
    </footer>
  );
}
