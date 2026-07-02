import { motion, useInView } from "framer-motion";
import { Eye, Lightbulb, Brain, Gem, GraduationCap, Bug, ClipboardCheck, CheckCircle2, Settings, Briefcase, TrendingUp } from "lucide-react";
import { useRef } from "react";
import { Reveal, SectionHeading } from "./Reveal";
import { aboutPillars, timeline, profile } from "../data/content";

const icons = [Eye, Lightbulb, Brain, Gem];

const pillarStyles = [
  { border: "hover:border-cyan-500/40 hover:shadow-[0_0_30px_-8px_rgba(6,182,212,0.25)]", iconColor: "text-cyan-400" },
  { border: "hover:border-indigo-500/40 hover:shadow-[0_0_30px_-8px_rgba(79,70,229,0.25)]", iconColor: "text-indigo-400" },
  { border: "hover:border-purple-500/40 hover:shadow-[0_0_30px_-8px_rgba(139,92,246,0.25)]", iconColor: "text-purple-400" },
  { border: "hover:border-emerald-500/40 hover:shadow-[0_0_30px_-8px_rgba(16,185,129,0.25)]", iconColor: "text-emerald-400" },
];

const pillarDetails = [
  { metric: "COVERAGE: 100%", color: "text-cyan-400 bg-cyan-400/10 border-cyan-400/25" },
  { metric: "DEFECTS: RESOLVED", color: "text-indigo-400 bg-indigo-400/10 border-indigo-400/25" },
  { metric: "LOGIC: VALIDATED", color: "text-purple-400 bg-purple-400/10 border-purple-400/25" },
  { metric: "AUDIT: CERTIFIED", color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/25" }
];

const TIMELINE_METADATA = [
  { commit: "commit 23ef451a", date: "Jun 2024" },
  { commit: "commit 5b88c12f", date: "Sep 2024" },
  { commit: "commit 9d42f61e", date: "Feb 2025" },
  { commit: "commit b7c3d90e", date: "Jul 2026" },
];

const TIMELINE_STYLES = [
  {
    dot: "border-violet-500 shadow-[0_0_14px_rgba(139,92,246,0.8)]",
    inner: "bg-violet-400",
    badge: "text-violet-400 bg-violet-400/10 border-violet-400/30",
    year: "text-violet-400",
    glow: "shadow-[0_0_30px_-8px_rgba(139,92,246,0.3)]",
    line: "from-violet-500/60 to-cyan-500/20",
    icon: GraduationCap,
  },
  {
    dot: "border-cyan-500 shadow-[0_0_14px_rgba(6,182,212,0.8)]",
    inner: "bg-cyan-400",
    badge: "text-cyan-400 bg-cyan-400/10 border-cyan-400/30",
    year: "text-cyan-400",
    glow: "shadow-[0_0_30px_-8px_rgba(6,182,212,0.3)]",
    line: "from-cyan-500/60 to-indigo-500/20",
    icon: Briefcase,
  },
  {
    dot: "border-emerald-500 shadow-[0_0_14px_rgba(16,185,129,0.8)]",
    inner: "bg-emerald-400",
    badge: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
    year: "text-emerald-400",
    glow: "shadow-[0_0_30px_-8px_rgba(16,185,129,0.3)]",
    line: "from-emerald-500/60 to-amber-500/20",
    icon: Briefcase,
  },
  {
    dot: "border-amber-500 shadow-[0_0_14px_rgba(245,158,11,0.8)]",
    inner: "bg-amber-400 animate-pulse",
    badge: "text-amber-400 bg-amber-400/10 border-amber-400/30",
    year: "text-amber-400",
    glow: "shadow-[0_0_30px_-8px_rgba(245,158,11,0.3)]",
    line: "from-amber-500/40 to-transparent",
    icon: TrendingUp,
  },
];

function AnimatedTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(timelineRef, { once: true, margin: "-80px" });

  return (
    <div ref={timelineRef} className="relative">
      {/* Animated growing vertical line */}
      <motion.div
        className="absolute left-[17px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-500 via-cyan-500 via-50% via-emerald-500 to-amber-500/50"
        style={{ originY: 0 }}
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      />

      <div className="space-y-0">
        {timeline.map((t, i) => {
          const style = TIMELINE_STYLES[i] ?? TIMELINE_STYLES[0];
          const Icon = style.icon;
          const isLast = i === timeline.length - 1;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -28 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -28 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.25 + i * 0.2 }}
              className="relative pl-14 pb-5 last:pb-0 group cursor-default"
            >
              {/* Glowing dot */}
              <div className={`absolute left-0 top-0.5 w-9 h-9 rounded-full bg-slate-950 border-2 ${style.dot} flex items-center justify-center z-10 transition-transform duration-300 group-hover:scale-110`}>
                <Icon size={14} className={style.year} />
              </div>

              {/* Card */}
              <motion.div
                whileHover={{ y: -3, x: 4 }}
                transition={{ duration: 0.2 }}
                className={`glass rounded-2xl p-5 border border-white/5 transition-all duration-300 group-hover:border-white/10 ${style.glow} relative overflow-hidden`}
              >
                {/* Top gradient bar */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${style.line}`} />

                {/* HUD corner marks */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/10 group-hover:border-white/25 transition-colors" />
                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/10 group-hover:border-white/25 transition-colors" />

                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div className={`font-mono text-[9px] font-bold tracking-widest mb-1 ${style.year}`}>
                      {t.year}
                    </div>
                    <div className="font-display font-semibold text-slate-100 text-base">{t.title}</div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span className={`px-2 py-0.5 rounded-full border text-[8px] font-mono font-bold whitespace-nowrap ${style.badge}`}>
                      {(t as any).badge}
                    </span>
                    {isLast && (
                      <span className="flex items-center gap-1 text-[8px] font-mono text-amber-400 animate-pulse">
                        <span className="w-1 h-1 rounded-full bg-amber-400" />
                        LIVE
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-slate-500 text-sm leading-relaxed">{t.desc}</p>

                {/* Hover commit metadata */}
                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="font-mono text-[9px] text-slate-700">
                    {TIMELINE_METADATA[i]?.commit} · {TIMELINE_METADATA[i]?.date}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default function About({
  qaMode,
  reportedBugs,
  onReportBug,
}: {
  qaMode: boolean;
  reportedBugs: string[];
  onReportBug: (bug: any) => void;
}) {
  const isBug2Reported = reportedBugs.includes("BUG-INT-02");

  // Dynamic text rendering to introduce the intentional typo bug
  const renderSummary = () => {
    const startText = "Detail-oriented Manual QA engineer with 1+ year of experience delivering high-";
    const endText = " web and mobile applications. Skilled in API testing using Swagger, Postman, Insomnia, TestRail, Jira, and Asana.";

    if (qaMode && !isBug2Reported) {
      return (
        <>
          {startText}
          <span
            onClick={() =>
              onReportBug({
                id: "BUG-INT-02",
                title: "Spelling typo 'quallity' in About Me summary text",
                steps: [
                  "Toggle QA Mode to Active",
                  "Scroll down to About Me section",
                  "Read the summary text paragraph",
                ],
                expected: "Summary reads 'delivering high-quality web and mobile applications' with correct spelling.",
                actual: "Summary reads 'delivering high-quallity web and mobile applications' with a double 'l'.",
                priority: "Medium",
                severity: "Moderate",
              })
            }
            className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-rose-500/10 border border-dashed border-rose-500/60 text-rose-300 cursor-pointer hover:bg-rose-500/25 transition-colors relative group font-semibold"
          >
            quallity
            <Bug size={12} className="text-rose-400 animate-pulse shrink-0" />
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block bg-rose-950 border border-rose-500 text-[10px] text-white px-2 py-0.5 rounded font-mono whitespace-nowrap z-30">
              REPORT BUG
            </span>
          </span>
          {endText}
        </>
      );
    }

    return profile.summary;
  };

  return (
    <section id="about" className="relative pt-28 pb-4 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="About Me" title={<>Quality isn't a phase, <span className="text-gradient">it's a mindset.</span></>} />

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <Reveal className="relative">
            <div className="relative w-full max-w-[340px] mx-auto aspect-[10/14.6] rounded-[2rem] overflow-hidden glass">
              <div
                className="absolute inset-0 rounded-[2rem] animate-hue-cycle"
                style={{
                  background: "conic-gradient(from 0deg, #4F46E5, #06B6D4, #22C55E, #4F46E5)",
                  padding: 2,
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />

              {/* Premium SQA Cyber HUD Avatar Card */}
              <div className="absolute inset-3 rounded-[1.75rem] bg-slate-950 overflow-hidden flex flex-col justify-between p-5 group">
                {/* Cyber grid background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:16px_16px] opacity-60 pointer-events-none" />

                {/* Top Readout Header */}
                <div className="flex items-center justify-between w-full font-mono text-[9px] select-none z-10">
                  <div className={`flex items-center gap-1.5 transition-colors duration-300 ${qaMode && !isBug2Reported ? "text-rose-400" : "text-cyan-400"}`}>
                    <span className="text-slate-600 font-bold">&gt;</span> QA ID: HR-2025
                  </div>
                  <div className={`flex items-center gap-1.5 font-semibold transition-colors duration-300 ${qaMode && !isBug2Reported ? "text-rose-400 animate-pulse" : "text-emerald-400"}`}>
                    <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${qaMode && !isBug2Reported ? "bg-rose-500" : "bg-emerald-400 animate-pulse"}`} />
                    {qaMode && !isBug2Reported ? "OFFLINE" : "ONLINE"}
                  </div>
                </div>

                {/* Radar section with Shield */}
                <div className="relative w-full h-40 flex items-center justify-center flex-shrink-0 z-10 -mt-2">
                  {/* Conic Radar sweep effect */}
                  <div className={`absolute w-36 h-36 rounded-full pointer-events-none transition-all duration-500 ${qaMode && !isBug2Reported
                    ? "bg-[conic-gradient(from_0deg,rgba(244,63,94,0.1),transparent_60%)] animate-[spin_3s_linear_infinite]"
                    : "bg-[conic-gradient(from_0deg,rgba(6,182,212,0.08),transparent_60%)] animate-[spin_5s_linear_infinite]"
                    }`} />

                  {/* Concentric Rotating Cyber Rings (Centering Fixed) */}
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className={`absolute w-36 h-36 rounded-full border border-dashed animate-[spin_25s_linear_infinite] transition-colors duration-350 ${qaMode && !isBug2Reported ? "border-rose-500/20" : "border-cyan-500/20"
                      }`} />
                    <div className={`absolute w-44 h-44 rounded-full border border-dotted animate-[spin_40s_linear_infinite_reverse] transition-colors duration-350 ${qaMode && !isBug2Reported ? "border-amber-500/15" : "border-indigo-500/25"
                      }`} />
                    <div className="absolute w-[200px] h-[200px] rounded-full border border-white/[0.03]" />
                  </div>

                  {/* SQA Shield Icon */}
                  <div className="relative z-10 flex flex-col items-center justify-center">
                    <svg
                      width="88"
                      height="88"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className={`transition-colors duration-300 ${qaMode && !isBug2Reported
                        ? "text-rose-500/80 drop-shadow-[0_0_15px_rgba(244,63,94,0.4)]"
                        : "text-cyan-400/80 drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                        }`}
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M9 11l2 2 4-4" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>

                {/* Status indicator */}
                <div className="flex justify-center w-full z-10 -mt-2">
                  <div className={`px-4 py-1 rounded-full border text-[9px] font-mono flex items-center gap-1.5 transition-all duration-300 ${qaMode && !isBug2Reported
                    ? "bg-rose-500/10 border-rose-500/35 text-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.15)] animate-pulse"
                    : "bg-emerald-500/10 border-emerald-500/35 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.1)]"
                    }`}>
                    <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${qaMode && !isBug2Reported ? "bg-rose-500" : "bg-emerald-400 animate-pulse"
                      }`} />
                    {qaMode && !isBug2Reported ? "QA STATUS: ERROR" : "QA STATUS: ACTIVE"}
                  </div>
                </div>

                {/* Stats Table */}
                <div className="bg-slate-900/60 border border-white/[0.05] rounded-xl px-4 py-3 w-full space-y-3 z-10 my-2">
                  {/* Stat Row 1 */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-400">
                      <ClipboardCheck size={14} className="text-cyan-400" />
                      <span className="font-mono tracking-wider text-[9px]">TEST CASES EXECUTED</span>
                    </div>
                    <span className="font-mono font-bold text-cyan-400">1,247+</span>
                  </div>

                  <div className="border-t border-white/[0.05]" />

                  {/* Stat Row 2 */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Bug size={14} className="text-purple-400" />
                      <span className="font-mono tracking-wider text-[9px]">BUGS REPORTED</span>
                    </div>
                    <span className="font-mono font-bold text-purple-400">513+</span>
                  </div>

                  <div className="border-t border-white/[0.05]" />

                  {/* Stat Row 3 */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-400">
                      <CheckCircle2 size={14} className="text-emerald-400" />
                      <span className="font-mono tracking-wider text-[9px]">SUCCESS RATE</span>
                    </div>
                    <span className="font-mono font-bold text-emerald-400">98.7%</span>
                  </div>

                  <div className="border-t border-white/[0.05]" />

                  {/* Stat Row 4 */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Settings size={14} className="text-sky-400" />
                      <span className="font-mono tracking-wider text-[9px]">REGRESSION COVERAGE</span>
                    </div>
                    <span className="font-mono font-bold text-sky-400">98%</span>
                  </div>
                </div>

                {/* Profile Details */}
                <div className="w-full text-left z-10 px-1 mb-2">
                  <h4 className="font-display font-bold text-xl text-white tracking-wide">{profile.name}</h4>
                  <p className="text-indigo-400/90 text-xs font-mono mt-0.5">{profile.title}</p>
                </div>

                {/* Scanning HUD line */}
                <motion.div
                  className={`absolute left-0 right-0 h-0.5 z-10 pointer-events-none transition-colors duration-300 ${qaMode && !isBug2Reported
                    ? "bg-gradient-to-r from-transparent via-rose-500 to-transparent shadow-[0_0_12px_#f43f5e]"
                    : "bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#06b6d4]"
                    }`}
                  animate={{ top: ["5%", "95%", "5%"] }}
                  transition={{
                    duration: qaMode && !isBug2Reported ? 1.8 : 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* HUD Corners */}
                <div className={`absolute top-2 right-2 w-2.5 h-2.5 border-t border-r pointer-events-none transition-colors duration-300 ${qaMode && !isBug2Reported ? "border-rose-500/40" : "border-cyan-500/40"}`} />
                <div className={`absolute top-2 left-2 w-2.5 h-2.5 border-t border-l pointer-events-none transition-colors duration-300 ${qaMode && !isBug2Reported ? "border-rose-500/40" : "border-cyan-500/40"}`} />
                <div className={`absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r pointer-events-none transition-colors duration-300 ${qaMode && !isBug2Reported ? "border-rose-500/40" : "border-cyan-500/40"}`} />
                <div className={`absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l pointer-events-none transition-colors duration-300 ${qaMode && !isBug2Reported ? "border-rose-500/40" : "border-cyan-500/40"}`} />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            {/* Render dynamically to support QA Mode bug hunting */}
            <p className="text-slate-300 text-lg leading-relaxed mb-8 select-text">
              {renderSummary()}
            </p>

            <div className="flex items-center gap-3 mb-8 text-slate-400">
              <GraduationCap size={20} className="text-cyan-400" />
              <span>{profile.education.degree} — {profile.education.school}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {aboutPillars.map((p, i) => {
                const Icon = icons[i];
                const style = pillarStyles[i];
                const details = pillarDetails[i];
                return (
                  <motion.div
                    key={p.title}
                    whileHover={{ y: -6 }}
                    className={`glass rounded-2xl p-5 border border-white/5 transition-all duration-300 relative group overflow-hidden ${style.border}`}
                  >
                    {/* Corner HUD Markers */}
                    <div className="absolute top-1.5 left-1.5 font-mono text-[8px] text-slate-800 select-none group-hover:text-cyan-500/40 transition-colors">+</div>
                    <div className="absolute top-1.5 right-1.5 font-mono text-[8px] text-slate-800 select-none group-hover:text-cyan-500/40 transition-colors">+</div>

                    <div className="flex items-center justify-between gap-2 mb-3">
                      <Icon size={20} className={`mb-0 ${style.iconColor}`} />
                      <span className={`px-2 py-0.5 rounded-full border text-[8.5px] font-mono font-bold ${details.color}`}>
                        {details.metric}
                      </span>
                    </div>

                    <div className="font-medium text-sm mb-1 text-slate-200">{p.title}</div>
                    <div className="text-slate-500 text-xs leading-relaxed">{p.desc}</div>
                  </motion.div>
                );
              })}
            </div>
          </Reveal>
        </div>

        <div className="mt-40">
          <Reveal className="mb-12">
            <div className="flex items-center gap-4">
              <h3 className="font-display text-2xl font-semibold">Career Timeline</h3>
              <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
              <span className="font-mono text-[9px] text-slate-600 select-none">4 MILESTONES</span>
            </div>
          </Reveal>

          <AnimatedTimeline />
        </div>
      </div>
    </section>
  );
}

