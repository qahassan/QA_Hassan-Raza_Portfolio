import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Bug } from "lucide-react";
import profilePic from "../assets/hero.png";

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
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = links.map((link) => link.href.slice(1));

    const updateActiveSection = () => {
      const viewportMiddle = window.scrollY + window.innerHeight / 2;
      let currentSection = sectionIds[0];
      let closestDistance = Infinity;

      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (!element) return;

        const { top, height } = element.getBoundingClientRect();
        const elementTop = window.scrollY + top;
        const sectionCenter = elementTop + height / 2;
        const distance = Math.abs(sectionCenter - viewportMiddle);

        if (distance < closestDistance) {
          closestDistance = distance;
          currentSection = id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", updateActiveSection);
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4"
    >
      <div
        className={`w-full max-w-6xl flex items-center justify-between rounded-2xl px-5 transition-all duration-300 ${scrolled ? "glass bg-slate-950/80 py-2.5 shadow-[0_0_40px_-15px_rgba(79,70,229,0.6)]" : "py-3 bg-transparent"
          }`}
      >
        <a href="#hero" className="flex items-center gap-2 font-display font-semibold text-lg" data-cursor-hover>
          <span className="rounded-full p-[1px] bg-gradient-to-br from-indigo-500 to-cyan-400">
            <span className="flex items-center justify-center w-9 h-9 rounded-full overflow-hidden bg-slate-950 border border-white/10">
              <img src={profilePic} alt="Hassan Raza" className="w-full h-full object-cover object-center" />
            </span>
          </span>
          Hassan Raza<span className="text-gradient">.QA</span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm text-slate-300">
          {links.map((l) => {
            const sectionId = l.href.slice(1);
            const isActive = activeSection === sectionId;

            return (
              <a
                key={l.href}
                href={l.href}
                className={`relative group transition-colors duration-300 ${isActive ? "text-white" : "text-slate-300 hover:text-white"}`}
                data-cursor-hover
              >
                <span className="relative z-10">{l.label}</span>
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-gradient-to-r from-indigo-400 to-cyan-400 transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                />
                {isActive && (
                  <span className="absolute inset-x-0 -bottom-2 mx-auto h-1 w-10 rounded-full bg-indigo-500/40 blur-sm animate-[pulse_1.5s_ease-in-out_infinite]" />
                )}
              </a>
            );
          })}
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

