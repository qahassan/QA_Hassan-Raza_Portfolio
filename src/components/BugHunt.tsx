import { motion } from "framer-motion";
import { Bug, AlertTriangle } from "lucide-react";
import { SectionHeading, Reveal } from "./Reveal";
import { bugReports } from "../data/content";

const priorityColor: Record<string, string> = {
  Critical: "text-rose-400 bg-rose-400/10 border-rose-400/30",
  High: "text-orange-400 bg-orange-400/10 border-orange-400/30",
  Medium: "text-amber-400 bg-amber-400/10 border-amber-400/30",
};

export default function BugHunt({ userBugs = [] }: { userBugs?: any[] }) {
  // Merge user submitted bugs at the beginning
  const allBugs = [...userBugs, ...bugReports];

  const getStatusStyle = (status: string) => {
    if (status.includes("Reported by")) {
      return "text-emerald-400 bg-emerald-500/15 border-emerald-400/40 shadow-[0_0_15px_rgba(16,185,129,0.15)] font-bold";
    }
    if (status === "Resolved") {
      return "text-emerald-400 bg-emerald-400/10 border-emerald-400/30";
    }
    return "text-cyan-400 bg-cyan-400/10 border-cyan-400/30";
  };

  return (
    <section id="process" className="relative py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="Bug Hunt Showcase"
          title={<>Found it. Reported it. <span className="text-gradient">Fixed it.</span></>}
          subtitle="A look at how defects get documented — clear, reproducible, and actionable."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {allBugs.map((bug, i) => (
            <Reveal key={bug.id} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -8 }}
                className={`glass rounded-3xl p-6 h-full flex flex-col transition-all duration-300 ${
                  bug.status.includes("Reported by")
                    ? "border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.15)] bg-emerald-950/5"
                    : "border-white/10 hover:shadow-[0_0_35px_-15px_rgba(244,63,94,0.25)]"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-slate-500">{bug.id}</span>
                  <Bug size={16} className={bug.status.includes("Reported by") ? "text-emerald-400" : "text-rose-400"} />
                </div>
                
                <h3 className="font-display font-semibold mb-4 leading-snug text-slate-100 text-left">
                  {bug.title}
                </h3>

                <div className="flex flex-wrap gap-2 mb-5">
                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${priorityColor[bug.priority] || "text-slate-400 border-white/10 bg-white/5"}`}>
                    {bug.priority}
                  </span>
                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${getStatusStyle(bug.status)}`}>
                    {bug.status}
                  </span>
                </div>

                <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5 font-mono">
                  <AlertTriangle size={11} /> Steps to Reproduce
                </div>
                
                <ol className="text-xs text-slate-400 space-y-1 mb-6 list-decimal list-inside text-left leading-normal">
                  {bug.steps.map((s: string, idx: number) => (
                    <li key={idx} className="pl-1 text-slate-350">
                      <span className="font-sans">{s}</span>
                    </li>
                  ))}
                </ol>

                <div className="mt-auto space-y-3.5 pt-4 border-t border-white/10 text-left">
                  <div>
                    <div className="text-[9px] font-mono uppercase tracking-wider text-emerald-400 mb-0.5">Expected Behavior</div>
                    <div className="text-xs text-slate-400 leading-normal">{bug.expected}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-mono uppercase tracking-wider text-rose-400 mb-0.5">Actual Behavior</div>
                    <div className="text-xs text-slate-400 leading-normal">{bug.actual}</div>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

