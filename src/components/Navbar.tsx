import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Menu, X, Bug } from "lucide-react";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar({
  qaMode,
  setQaMode,
  reportedCount,
}: {
  qaMode: boolean;
  setQaMode: (mode: boolean) => void;
  reportedCount: number;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4"
    >
      <div
        className={`w-full max-w-6xl flex items-center justify-between rounded-2xl px-5 transition-all duration-300 ${scrolled ? "glass py-2.5 shadow-[0_0_40px_-15px_rgba(79,70,229,0.6)]" : "py-3 bg-transparent"
          }`}
      >
        <a href="#hero" className="flex items-center gap-2 font-display font-semibold text-lg" data-cursor-hover>
          <span className="grid place-items-center w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400">
            <ShieldCheck size={16} className="text-white" />
          </span>
          Hassan Raza<span className="text-gradient">.QA</span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm text-slate-300">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="relative group" data-cursor-hover>
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-indigo-400 to-cyan-400 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Action Button & SQA Toggle Container */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => setQaMode(!qaMode)}
            data-cursor-hover
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono font-medium transition-all duration-300 ${qaMode
                ? "bg-rose-500/10 border-rose-500/40 text-rose-400 shadow-[0_0_20px_-3px_rgba(244,63,94,0.4)] animate-pulse"
                : "bg-white/5 border-white/10 text-slate-400 hover:border-slate-500 hover:text-white"
              }`}
          >
            <Bug size={14} className={qaMode ? "animate-spin" : ""} />
            {qaMode ? `QA INSPECT: ${reportedCount}/4` : "QA MODE: OFF"}
          </button>

          <a
            href="#contact"
            data-cursor-hover
            className="inline-flex items-center text-sm font-medium px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:shadow-[0_0_25px_-5px_rgba(79,70,229,0.8)] transition-shadow"
          >
            Let's talk
          </a>
        </div>

        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setQaMode(!qaMode)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[10px] font-mono transition-all ${qaMode
                ? "bg-rose-500/20 border-rose-500/50 text-rose-400"
                : "bg-white/5 border-white/10 text-slate-400"
              }`}
          >
            <Bug size={10} />
            {qaMode ? `${reportedCount}/4` : "QA"}
          </button>

          <button className="text-white" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-20 left-4 right-4 glass rounded-2xl p-5 flex flex-col gap-4 md:hidden z-50 bg-[#090d16]"
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-slate-200 py-1 border-b border-white/5">
              {l.label}
            </a>
          ))}
          <button
            onClick={() => {
              setQaMode(!qaMode);
              setOpen(false);
            }}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-xs font-mono font-medium transition-all ${qaMode
                ? "bg-rose-500/20 border-rose-500/50 text-rose-400"
                : "bg-white/5 border-white/10 text-slate-400"
              }`}
          >
            <Bug size={14} />
            {qaMode ? `QA INSPECT MODE ACTIVE: ${reportedCount}/4` : "ENABLE SQA INSPECT MODE"}
          </button>
        </motion.div>
      )}
    </motion.header>
  );
}

