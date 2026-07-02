import { motion } from "framer-motion";
import { ShieldCheck, ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative py-12 px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 font-display font-semibold text-lg">
          <span className="grid place-items-center w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400">
            <ShieldCheck size={16} className="text-white" />
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
