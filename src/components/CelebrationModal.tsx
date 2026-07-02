import { motion } from "framer-motion";
import { Award, Check, Sparkles, X } from "lucide-react";

export default function CelebrationModal({ onClose }: { onClose: () => void }) {
  // Generate random confetti details
  const confetti = Array.from({ length: 60 }).map((_, i) => ({
    id: i,
    x: Math.random() * 600 - 300,
    y: Math.random() * -500 - 100,
    scale: Math.random() * 0.6 + 0.4,
    color: ["#4F46E5", "#06B6D4", "#22C55E", "#F59E0B", "#EC4899", "#E11D48"][
      Math.floor(Math.random() * 6)
    ],
    delay: Math.random() * 0.3,
  }));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-xl"
      />

      {/* Confetti Particles */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center overflow-hidden">
        {confetti.map((c) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 1, scale: 0, x: 0, y: 50 }}
            animate={{
              opacity: [1, 1, 0],
              scale: c.scale,
              x: c.x,
              y: c.y,
              rotate: Math.random() * 720 - 360,
            }}
            transition={{
              duration: 2.5,
              ease: "easeOut",
              delay: c.delay,
            }}
            className="w-3.5 h-3.5 rounded-sm absolute"
            style={{
              background: c.color,
              borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            }}
          />
        ))}
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: 50 }}
        transition={{ type: "spring", damping: 15 }}
        className="relative z-10 w-full max-w-md overflow-hidden rounded-[2.5rem] glass border border-emerald-500/40 bg-[#060b13] p-8 text-center shadow-[0_0_60px_rgba(16,185,129,0.25)]"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-1.5 rounded-xl text-slate-500 hover:text-white hover:bg-white/5 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="relative inline-flex items-center justify-center mb-6">
          {/* Animated glow */}
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-[30px] animate-pulse" />

          {/* Badge Icon wrapper */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="relative w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.5)]"
          >
            <Award size={48} className="text-slate-900" />
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-slate-950 border-2 border-emerald-400 flex items-center justify-center text-emerald-400"
            >
              <Check size={16} strokeWidth={3} />
            </motion.span>
          </motion.div>
        </div>

        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-display text-2xl font-bold text-slate-100 mb-2 flex items-center justify-center gap-2"
        >
          <Sparkles size={20} className="text-emerald-400" /> QA Audit Passed!
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-slate-400 text-sm leading-relaxed mb-6 px-2"
        >
          Congratulations! You found all <strong>4 hidden bugs</strong> on this portfolio. 
          Your attention to detail has verified Hassan's engineering layout.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-2xl p-4 border border-emerald-500/20 bg-emerald-950/20 mb-8"
        >
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400 mb-1">
            Achievement Unlocked
          </div>
          <div className="font-display font-semibold text-slate-200">
            Certified QA Inspector
          </div>
          <div className="text-xs text-slate-500 mt-1 font-mono">
            VERIFICATION KEY: SQA-MODE-PASS-HASH-{Math.random().toString(36).substring(2, 8).toUpperCase()}
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={onClose}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all"
        >
          Keep Inspecting
        </motion.button>
      </motion.div>
    </div>
  );
}
