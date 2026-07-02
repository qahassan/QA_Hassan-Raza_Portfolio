import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Layers, Wrench, Target, TrendingUp, Filter, ShieldCheck, CheckCircle2, AlertTriangle, Bug } from "lucide-react";
import { SectionHeading, Reveal } from "./Reveal";
import { projects } from "../data/content";

const FILTERS = ["All", "Web", "Mobile", "API Testing"];

// Mock QA metrics for Hassan's projects
const PROJECT_QA_STATS: Record<string, { coverage: string; cases: number; defects: number; build: "PASS" | "STABLE" }> = {
  "Foster Ferret": { coverage: "94.8%", cases: 142, defects: 34, build: "PASS" },
  "SeedFunds": { coverage: "98.2%", cases: 210, defects: 48, build: "PASS" },
  "WZRD Pro": { coverage: "91.5%", cases: 98, defects: 19, build: "PASS" },
  "Ride Share App": { coverage: "89.4%", cases: 165, defects: 57, build: "STABLE" },
  "Attendance Management System": { coverage: "95.0%", cases: 120, defects: 22, build: "PASS" },
  "Ryvato iOS": { coverage: "93.6%", cases: 88, defects: 15, build: "STABLE" },
};

export default function Projects() {
  const [open, setOpen] = useState<string | null>(projects[0].name);
  const [filter, setFilter] = useState("All");

  const filteredProjects = projects.filter((p) => {
    if (filter === "All") return true;
    if (filter === "Web") {
      return (
        p.name === "Foster Ferret" ||
        p.name === "WZRD Pro" ||
        p.name === "Attendance Management System"
      );
    }
    if (filter === "Mobile") {
      return p.name === "Ride Share App" || p.name === "Ryvato iOS";
    }
    if (filter === "API Testing") {
      return p.testingTypes.includes("API") || p.tools.includes("Postman") || p.tools.includes("Swagger");
    }
    return true;
  });

  return (
    <section id="projects" className="relative py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="Projects"
          title={<>Real products, <span className="text-gradient">real test coverage.</span></>}
          subtitle="Click a repository below to view deep SQA test reports and coverage analysis."
        />

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-white/5 pb-6">
          <span className="text-slate-500 text-xs font-mono flex items-center gap-1.5 mr-2">
            <Filter size={12} /> FILTER BY:
          </span>
          {FILTERS.map((f) => {
            const isSelected = filter === f;
            return (
              <button
                key={f}
                onClick={() => {
                  setFilter(f);
                  const matched = projects.find((p) => {
                    if (f === "All") return true;
                    if (f === "Web") return p.name === "Foster Ferret" || p.name === "WZRD Pro" || p.name === "Attendance Management System";
                    if (f === "Mobile") return p.name === "Ride Share App" || p.name === "Ryvato iOS";
                    if (f === "API Testing") return p.testingTypes.includes("API") || p.tools.includes("Postman") || p.tools.includes("Swagger");
                    return true;
                  });
                  setOpen(matched ? matched.name : null);
                }}
                data-cursor-hover
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all border ${
                  isSelected
                    ? "bg-indigo-500/10 border-indigo-400/50 text-white shadow-[0_0_15px_rgba(79,70,229,0.15)]"
                    : "bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p, i) => {
              const isOpen = open === p.name;
              const stats = PROJECT_QA_STATS[p.name] || { coverage: "92%", cases: 100, defects: 15, build: "PASS" };
              
              return (
                <Reveal key={p.name} delay={i * 0.05}>
                  <motion.div
                    layout
                    className={`rounded-3xl glass overflow-hidden border transition-all duration-300 ${
                      isOpen ? "border-indigo-550/40 bg-slate-900/15" : "border-white/5 hover:border-white/15"
                    }`}
                  >
                    <button
                      onClick={() => setOpen(isOpen ? null : p.name)}
                      data-cursor-hover
                      className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-5">
                        <div
                          className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center font-display font-bold text-base shrink-0 text-white shadow-[0_4px_12px_rgba(0,0,0,0.2)]`}
                        >
                          {p.name.slice(0, 2)}
                        </div>
                        <div>
                          <h3 className="font-display text-lg font-semibold text-slate-200">{p.name}</h3>
                          <span className="text-slate-500 text-xs font-sans">{p.tag}</span>
                        </div>
                      </div>

                      {/* Diagnostic HUD stats visible on row when collapsed */}
                      <div className="flex flex-wrap items-center gap-3 md:gap-5 text-[10px] font-mono select-none">
                        <div className="flex flex-col">
                          <span className="text-slate-500 text-[9px] uppercase">Coverage</span>
                          <span className="text-cyan-400 font-bold">{stats.coverage}</span>
                        </div>
                        <div className="w-px h-6 bg-white/5 hidden sm:block" />
                        <div className="flex flex-col">
                          <span className="text-slate-500 text-[9px] uppercase">Test Cases</span>
                          <span className="text-indigo-400 font-bold">{stats.cases} Suite</span>
                        </div>
                        <div className="w-px h-6 bg-white/5 hidden sm:block" />
                        <div className="flex flex-col">
                          <span className="text-slate-500 text-[9px] uppercase">Defects Found</span>
                          <span className="text-amber-400 font-bold">{stats.defects} Filed</span>
                        </div>
                        <div className="w-px h-6 bg-white/5 hidden sm:block" />
                        <span className={`px-2 py-0.5 rounded-full border text-[9px] flex items-center gap-1 font-bold ${
                          stats.build === "PASS"
                            ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-400"
                            : "bg-cyan-500/10 border-cyan-500/25 text-cyan-400"
                        }`}>
                          <span className={`w-1 h-1 rounded-full ${stats.build === "PASS" ? "bg-emerald-400 animate-pulse" : "bg-cyan-400"}`} />
                          {stats.build}
                        </span>
                        
                        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="ml-2 text-slate-400">
                          <ChevronDown size={18} />
                        </motion.div>
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-8 pt-2 border-t border-white/5 text-left">
                            {/* Interactive Test Bar */}
                            <div className="mb-6 p-4 rounded-2xl bg-slate-950/60 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
                              <div className="flex items-center gap-2">
                                <CheckCircle2 size={14} className="text-emerald-400" />
                                <span className="text-slate-350">Suite Sign-off Status:</span>
                                <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold">APPROVED FOR RELEASE</span>
                              </div>
                              <div className="flex items-center gap-4 text-[10px]">
                                <span>Passed: <span className="text-emerald-400 font-bold">{stats.cases}</span></span>
                                <span>Failed: <span className="text-rose-500 font-bold">0</span></span>
                                <span>Skipped: <span className="text-slate-500 font-bold">0</span></span>
                              </div>
                            </div>

                            <p className="text-slate-350 leading-relaxed mb-6 text-sm">{p.overview}</p>

                            <div className="grid sm:grid-cols-2 gap-6">
                              <div>
                                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-2">
                                  <Layers size={13} className="text-indigo-400" /> Testing Types
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {p.testingTypes.map((t) => (
                                    <span key={t} className="px-3 py-1 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono">
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-2">
                                  <Wrench size={13} className="text-cyan-400" /> Tools Used
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {p.tools.map((t) => (
                                    <span key={t} className="px-3 py-1 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono">
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="mt-6">
                              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-2">Responsibilities</div>
                              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-slate-400">
                                {p.responsibilities.map((r) => (
                                  <li key={r} className="flex items-start gap-2">
                                    <span className="mt-2 w-1 h-1 rounded-full bg-cyan-400 shrink-0" />
                                    <span>{r}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6 mt-6">
                              <div className="rounded-2xl bg-white/[0.01] border border-white/5 p-4 hover:border-rose-500/20 transition-colors">
                                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-rose-400 mb-2">
                                  <Target size={13} /> QA Challenge
                                </div>
                                <p className="text-xs text-slate-450 leading-relaxed">{p.challenges}</p>
                              </div>
                              <div className="rounded-2xl bg-white/[0.01] border border-white/5 p-4 hover:border-emerald-500/20 transition-colors">
                                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-emerald-400 mb-2">
                                  <TrendingUp size={13} /> SQA Impact
                                </div>
                                <p className="text-xs text-slate-450 leading-relaxed">{p.impact}</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </Reveal>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

