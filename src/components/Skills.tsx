import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldAlert,
  Award,
  Code,
  CheckCircle,
  Terminal,
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
  "Process & Reporting": Terminal,
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

        <div className="grid md:grid-cols-[260px_1fr] gap-8 items-start mt-12">
          <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0">
            {skillGroups.map((group, idx) => {
              const Icon = CATEGORY_ICONS[group.title] || Award;
              const isSelected = activeGroupIndex === idx;

              return (
                <button
                  key={group.title}
                  onClick={() => setActiveGroupIndex(idx)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                    isSelected
                      ? "bg-slate-900 border border-cyan-400 text-cyan-400"
                      : "bg-white/5 border border-white/10 text-slate-400"
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