import { motion } from "framer-motion";
import { Bug, X, FileText, Send } from "lucide-react";
import { useState } from "react";

export type BugInfo = {
  id: string;
  title: string;
  steps: string[];
  expected: string;
  actual: string;
  priority: "Critical" | "High" | "Medium";
  severity: "Critical" | "Critical" | "Moderate";
};

export default function BugReporterModal({
  bug,
  onClose,
  onSubmit,
}: {
  bug: BugInfo;
  onClose: () => void;
  onSubmit: (reporterName: string) => void;
}) {
  const [reporter, setReporter] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit(reporter || "Anonymous QA");
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl glass border border-rose-500/30 bg-[#0b0f19] shadow-[0_0_50px_rgba(244,63,94,0.15)] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-rose-500/5">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400">
              <Bug size={18} />
            </span>
            <div>
              <h3 className="font-display font-bold text-slate-100">Create Bug Report</h3>
              <span className="text-[10px] font-mono text-slate-500">JIRA-SIMULATOR // {bug.id}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto max-h-[70vh]">
          {/* Summary */}
          <div>
            <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1">
              Summary
            </label>
            <div className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-200 flex items-center gap-2">
              <FileText size={14} className="text-indigo-400 shrink-0" />
              <span className="font-medium truncate text-left">{bug.title}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Priority */}
            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1">
                Priority
              </label>
              <div className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-slate-200 font-mono capitalize">
                🚨 {bug.priority}
              </div>
            </div>
            {/* Severity */}
            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1">
                Severity
              </label>
              <div className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-slate-200 font-mono capitalize">
                💥 {bug.severity}
              </div>
            </div>
          </div>

          {/* Steps */}
          <div>
            <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1">
              Steps to Reproduce
            </label>
            <div className="bg-black/35 rounded-xl p-3 border border-white/5 text-xs font-mono text-slate-300 space-y-1 text-left">
              {bug.steps.map((step, idx) => (
                <div key={idx} className="flex gap-2">
                  <span className="text-indigo-400">{idx + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Expected vs Actual */}
          <div className="grid grid-cols-2 gap-4 text-left">
            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block mb-1">
                Expected
              </label>
              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-3 text-xs text-slate-300 leading-normal min-h-[70px]">
                {bug.expected}
              </div>
            </div>
            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-rose-400 block mb-1">
                Actual
              </label>
              <div className="bg-rose-500/5 border border-rose-500/20 rounded-xl p-3 text-xs text-slate-300 leading-normal min-h-[70px]">
                {bug.actual}
              </div>
            </div>
          </div>

          {/* Reporter Name */}
          <div className="text-left">
            <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1.5">
              Reporter Name
            </label>
            <input
              type="text"
              required
              value={reporter}
              onChange={(e) => setReporter(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-400/60 transition-colors"
              placeholder="Enter your name to sign the ticket..."
            />
          </div>

          {/* Footer actions */}
          <div className="pt-2 flex justify-end gap-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-white/10 text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 font-medium text-xs text-white hover:shadow-[0_0_20px_rgba(244,63,94,0.4)] transition-all"
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <>
                  <Send size={12} /> Submit to Backlog
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
