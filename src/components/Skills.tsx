import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldAlert,
  Award,
  Code,
  CheckCircle,
  Layers,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "./Reveal";
import { skillGroups } from "../data/content";

// Specific SQA proficiency ratings for Hassan's skills
const SKILL_PROFICIENCY: Record<
  string,
  { value: number; level: "EXPERT" | "ADVANCED" }
> = {
  "Manual Testing": { value: 87, level: "EXPERT" },
  "Functional Testing": { value: 80, level: "EXPERT" },
  "Regression Testing": { value: 90, level: "EXPERT" },
  "Integration Testing": { value: 88, level: "ADVANCED" },
  "System Testing": { value: 80, level: "ADVANCED" },
  "Exploratory Testing": { value: 82, level: "EXPERT" },

  "API Testing": { value: 85, level: "EXPERT" },
  "Postman": { value: 76, level: "EXPERT" },
  "Swagger": { value: 87, level: "EXPERT" },
  "Insomnia": { value: 80, level: "ADVANCED" },
  "TestRail": { value: 77, level: "ADVANCED" },

  "Jira": { value: 80, level: "EXPERT" },
  "Asana": { value: 88, level: "ADVANCED" },
  "Bug Reporting": { value: 82, level: "EXPERT" },
  "Documentation": { value: 75, level: "EXPERT" },
  "Requirement Analysis": { value: 74, level: "EXPERT" },
  "Root Cause Analysis": { value: 78, level: "ADVANCED" },
  "Release Validation": { value: 85, level: "EXPERT" },

  "UI Testing": { value: 90, level: "EXPERT" },
  "Cross Browser Testing": { value: 86, level: "ADVANCED" },
  "Responsive Testing": { value: 88, level: "EXPERT" },
};

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "Core Testing": ShieldAlert,
  "API & Tools": Code,
  "Process & Reporting": CheckCircle,
  Coverage: Layers,
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
          title={
            <>
              A toolkit built for{" "}
              <span className="text-gradient">
                breaking things properly.
              </span>
            </>
          }
          subtitle="Select a capability suite to scan Hassan's proficiency across core quality systems."
        />

        <div className="grid gap-8 mt-12">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
            {skillGroups.map((group, idx) => {
              const Icon = CATEGORY_ICONS[group.title] || Award;
              const isSelected = activeGroupIndex === idx;

              return (
                <button
                  key={group.title}
                  onClick={() => setActiveGroupIndex(idx)}
                  className={`flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-all duration-200 ${
                    isSelected
                      ? "border-cyan-400 bg-slate-900 text-cyan-300 shadow-[0_0_25px_-10px_rgba(34,211,238,0.65)]"
                      : "border-slate-700 bg-slate-950/40 text-slate-300 hover:border-cyan-400/40 hover:bg-slate-900/80"
                  }`}
                >
                  <Icon
                    size={16}
                    color={isSelected ? "#22d3ee" : "#94a3b8"}
                  />
                  <span>{group.title}</span>
                </button>
              );
            })}
          </div>

          <div className="glass rounded-3xl p-6 border border-white/5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGroupIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <ActiveIcon size={18} color="#22d3ee" />
                  <h3 className="text-xl font-semibold">
                    {activeGroup.title}
                  </h3>
                </div>

                <div className="space-y-5">
                  {activeGroup.skills.map((skill, i) => {
                    const prof =
                      SKILL_PROFICIENCY[skill] || {
                        value: 80,
                        level: "ADVANCED",
                      };

                    return (
                      <div key={skill}>
                        <div className="flex justify-between mb-2">
                          <span>{skill}</span>
                          <span>{prof.value}%</span>
                        </div>

                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${prof.value}%` }}
                            transition={{
                              duration: 0.7,
                              delay: i * 0.05,
                            }}
                            className="h-full bg-cyan-400"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 flex items-center gap-2 text-emerald-400 text-sm">
                  <CheckCircle size={16} />
                  VERIFIED RELEASE STABLE
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}