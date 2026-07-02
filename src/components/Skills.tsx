import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Award, Code, CheckCircle, Terminal, Layers } from "lucide-react";
import { SectionHeading } from "./Reveal";
import { skillGroups } from "../data/content";

// Specific SQA proficiency ratings for Hassan's skills
const SKILL_PROFICIENCY: Record<string, { value: number; level: "EXPERT" | "ADVANCED" }> = {
  // Core Testing
  "Manual Testing": { value: 87, level: "EXPERT" },
  "Functional Testing": { value: 80, level: "EXPERT" },
  "Regression Testing": { value: 90, level: "EXPERT" },
  "Integration Testing": { value: 88, level: "ADVANCED" },
  "System Testing": { value: 80, level: "ADVANCED" },
  "Exploratory Testing": { value: 82, level: "EXPERT" },
  // API & Tools
  "API Testing": { value: 85, level: "EXPERT" },
  "Postman": { value: 76, level: "EXPERT" },
  "Swagger": { value: 87, level: "EXPERT" },
  "Insomnia": { value: 80, level: "ADVANCED" },
  "TestRail": { value: 77, level: "ADVANCED" },
  // Process & Reporting
  "Jira": { value: 80, level: "EXPERT" },
  "Asana": { value: 88, level: "ADVANCED" },
  "Bug Reporting": { value: 82, level: "EXPERT" },
  "Documentation": { value: 75, level: "EXPERT" },
  "Requirement Analysis": { value: 74, level: "EXPERT" },
  "Root Cause Analysis": { value: 78, level: "ADVANCED" },
  "Release Validation": { value: 85, level: "EXPERT" },
  // Coverage
  "UI Testing": { value: 90, level: "EXPERT" },
  "Cross Browser Testing": { value: 86, level: "ADVANCED" },
  "Responsive Testing": { value: 88, level: "EXPERT" }
};

const CATEGORY_ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  "Core Testing": ShieldAlert,
  "API & Tools": Code,
  "Process & Reporting": Terminal,
  "Coverage": Layers
};

export default function Skills() {
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const activeGroup = skillGroups[activeGroupIndex];
  const ActiveIcon = CATEGORY_ICONS[activeGroup.title] || Award;

  return (
    <section id="skills" className="relative py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="Skills"
          title={<>A toolkit built for <span className="text-gradient">breaking things properly.</span></>}
          subtitle="Select a capability suite to scan Hassan's proficiency across core quality systems."
        />

        <div className="grid md:grid-cols-[260px_1fr] gap-8 items-start mt-12">
          {/* Left Category Tabs list */}
          <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 select-none">
            {skillGroups.map((group, idx) => {
              const Icon = CATEGORY_ICONS[group.title] || Award;
              const isSelected = activeGroupIndex === idx;
              
              return (
                <button
                  key={group.title}
                  onClick={() => setActiveGroupIndex(idx)}
                  data-cursor-hover
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border text-left text-xs font-mono transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? "bg-slate-900 border-cyan-400 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                      : "bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  <Icon size={14} className={isSelected ? "text-cyan-400" : "text-slate-500"} />
                  <span className="font-semibold">{group.title}</span>
                </button>
              );
            })}
          </div>

          {/* Right Metrics Panel */}
          <div className="glass rounded-3xl p-6 md:p-8 border border-white/5 min-h-[340px] flex flex-col justify-between text-left relative overflow-hidden">
            {/* Ambient Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeGroupIndex}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                {/* Panel Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-xl bg-cyan-400/10 text-cyan-400 border border-cyan-400/20">
                      <ActiveIcon size={16} />
                    </span>
                    <h3 className="font-display font-semibold text-lg text-slate-200">{activeGroup.title} Suite</h3>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">SYS_AUDIT // COMPILED</span>
                </div>

                {/* Skill Bars List */}
                <div className="space-y-5">
                  {activeGroup.skills.map((skill, i) => {
                    const prof = SKILL_PROFICIENCY[skill] || { value: 85, level: "ADVANCED" };
                    const isExpert = prof.level === "EXPERT";
                    
                    return (
                      <div key={skill} className="group cursor-default p-3 rounded-2xl hover:bg-white/[0.01] hover:border-white/5 border border-transparent transition-all">
                        <div className="flex items-center justify-between gap-4 mb-2 text-xs font-mono">
                          <span className="font-display font-medium text-slate-300 text-sm">{skill}</span>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[8px] font-bold tracking-wider ${
                              isExpert 
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                            }`}>
                              {prof.level}
                            </span>
                            <span className="text-slate-400 font-bold">{prof.value}%</span>
                          </div>
                        </div>
                        
                        {/* Progress Bar Track */}
                        <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${prof.value}%` }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.05 }}
                            className={`h-full rounded-full bg-gradient-to-r ${
                              isExpert 
                                ? "from-indigo-500 via-cyan-400 to-emerald-400"
                                : "from-indigo-500 to-cyan-400"
                            }`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 border-t border-white/5 pt-4 text-[10px] font-mono text-slate-500 flex items-center justify-between select-none">
              <span className="flex items-center gap-1">
                <CheckCircle size={10} className="text-emerald-400" />
                VERIFIED RELEASE STABLE
              </span>
              <span>HASSAN_RAZA // QA_PORTFOLIO</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
