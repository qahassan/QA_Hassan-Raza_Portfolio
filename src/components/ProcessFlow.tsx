import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Activity } from "lucide-react";
import { SectionHeading } from "./Reveal";
import { testingProcess } from "../data/content";

// Detailed QA checklist tasks for Hassan's testing process stages
const STAGE_CHECKLISTS: Record<string, { subtitle: string; tasks: string[]; iconColor: string }> = {
  "Requirement Analysis": {
    subtitle: "Uncovering logic gaps & boundary assumptions early",
    iconColor: "text-cyan-400",
    tasks: [
      "Audit PRD/FSD specifications for ambiguous wording & contradictions",
      "Verify edge-case handling rules in flow diagrams before dev starts",
      "Participate in sprint backlog grooming & SQA risk assessments",
      "Identify third-party API sync latency boundaries & dependency limits"
    ]
  },
  "Test Planning": {
    subtitle: "Structuring scope, strategy, & priority metrics",
    iconColor: "text-indigo-400",
    tasks: [
      "Define SQA environment matrix (OS, browsers, mobile devices)",
      "Determine smoke, regression, and sanity testing boundaries",
      "Set testing milestones & coordinate release checkpoints with devs",
      "Create target defect leakage threshold margins per epic"
    ]
  },
  "Test Case Creation": {
    subtitle: "Writing repeatable test cases mapped to acceptance criteria",
    iconColor: "text-purple-400",
    tasks: [
      "Draft functional scenario scripts inside TestRail database",
      "Verify 100% test coverage against Jira user story requirements",
      "Document boundary values & positive/negative test scripts",
      "Prepare mocks & state-payload variables for API execution"
    ]
  },
  "Execution": {
    subtitle: "Executing exploratory & structured test suites",
    iconColor: "text-rose-400",
    tasks: [
      "Run manual test cases across target desktop & mobile browsers",
      "Trigger exploratory sweeps focusing on user-friction flows",
      "Execute REST API integration payload contracts in Postman/Swagger",
      "Validate cookie storage, browser cache, and local variables state"
    ]
  },
  "Bug Reporting": {
    subtitle: "Documenting clear, actionable bug profiles for engineering",
    iconColor: "text-amber-400",
    tasks: [
      "Record screen videos & capture developer console logs",
      "Isolate steps to reproduce to the absolute minimum path",
      "Assign priority (P1-P4) & severity levels inside Jira tickets",
      "Attach payload responses & backend stack trace logs"
    ]
  },
  "Regression Testing": {
    subtitle: "Verifying fixed states & validating adjacent modules",
    iconColor: "text-emerald-400",
    tasks: [
      "Re-test resolved ticket paths to verify fix resolution",
      "Run targeted smoke checks on adjacent database modules",
      "Ensure no new regressions were introduced by changes",
      "Update historical test suites with new regression benchmarks"
    ]
  },
  "Release Validation": {
    subtitle: "Final release sign-off & production verification checks",
    iconColor: "text-teal-400",
    tasks: [
      "Verify release builds against staging environment parameters",
      "Run complete end-to-end smoke scenarios pre-release",
      "Provide formal SQA metrics sign-off documentation",
      "Perform post-production sanity checks following deploy"
    ]
  }
};

const STEP_LABELS = [
  "Requirements",
  "Planning",
  "Test Design",
  "Execution",
  "Bug Logging",
  "Regression",
  "Validation"
];

export default function ProcessFlow() {
  const [activeStep, setActiveStep] = useState(0);
  const currentStep = testingProcess[activeStep];
  const checklist = STAGE_CHECKLISTS[currentStep.title] || { subtitle: "", tasks: [], iconColor: "text-cyan-400" };

  return (
    <section id="process" className="relative py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          eyebrow="Testing Process"
          title={<>Every release follows <span className="text-gradient">the same discipline.</span></>}
          subtitle="Click on any pipeline stage below to view the active SQA task verification checklist."
          align="center"
        />

        {/* Horizontal Step Tracker Console */}
        <div className="relative mb-12 pt-6 pb-8 px-4 rounded-3xl bg-slate-900/5 border border-white/5 backdrop-blur-sm overflow-x-auto select-none flex justify-between gap-4 md:gap-0 items-start">
          {/* Connector Pipe */}
          <div className="absolute left-8 right-8 top-[46px] h-[2px] bg-slate-800 -z-10 hidden md:block" />
          <div
            className="absolute left-8 top-[46px] h-[2px] bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 -z-10 hidden md:block transition-all duration-500"
            style={{ width: `${(activeStep / (testingProcess.length - 1)) * 92}%` }}
          />

          {testingProcess.map((step, i) => {
            const isActive = activeStep === i;
            const isCompleted = activeStep > i;
            
            return (
              <button
                key={step.title}
                onClick={() => setActiveStep(i)}
                data-cursor-hover
                className="flex flex-col items-center gap-2 shrink-0 cursor-pointer group"
              >
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center font-mono font-bold text-xs border relative z-10 transition-all duration-300 ${
                    isActive
                      ? "bg-slate-950 border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] scale-110"
                      : isCompleted
                      ? "bg-slate-950 border-indigo-500/30 text-indigo-300"
                      : "bg-slate-950 border-white/5 text-slate-500 hover:border-slate-400 hover:text-slate-355"
                  }`}
                >
                  {isCompleted ? <Check size={14} /> : String(i + 1).padStart(2, "0")}
                </div>
                <span className={`text-[10px] font-mono tracking-wide uppercase transition-colors hidden md:block ${
                  isActive ? "text-cyan-400 font-bold" : "text-slate-500 group-hover:text-slate-300"
                }`}>
                  {STEP_LABELS[i]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Checklist Board */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="glass rounded-3xl p-7 border border-white/5 shadow-[0_15px_40px_-20px_rgba(0,0,0,0.6)] text-left"
          >
            {/* Board Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full bg-cyan-400 animate-pulse`} />
                <div>
                  <h3 className="font-display font-semibold text-lg text-slate-200">{currentStep.title}</h3>
                  <p className="text-[11px] font-mono text-slate-500">{checklist.subtitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-white/[0.02] border border-white/5 rounded-xl text-[10px] font-mono text-slate-400">
                <Activity size={12} className={checklist.iconColor} />
                STATUS: {activeStep === 6 ? "RELEASE APPROVED" : "IN PROGRESS"}
              </div>
            </div>

            {/* Checklist items */}
            <div className="grid md:grid-cols-2 gap-4">
              {checklist.tasks.map((task, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.06 }}
                  className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.01] border border-white/[0.02] hover:border-white/5 transition-colors"
                >
                  <span className="w-5 h-5 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400">
                    <Check size={11} strokeWidth={3} />
                  </span>
                  <span className="text-xs text-slate-350 leading-relaxed font-sans">{task}</span>
                </motion.div>
              ))}
            </div>

            {/* Flow Description */}
            <div className="mt-6 p-4 rounded-2xl bg-slate-950/40 border border-white/5 text-slate-400 text-xs leading-relaxed font-sans">
              <span className="font-bold text-slate-300 block mb-1">Process Strategy:</span>
              {currentStep.desc}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
