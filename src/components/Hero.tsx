import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowRight, Download, Mail, ShieldCheck, Bug, CheckCircle2, FlaskConical, Radar } from "lucide-react";
import { useState, useEffect } from "react";
import TypeCycle from "./TypeCycle";
import { profile } from "../data/content";

const floatIcons = [
  { Icon: Bug, top: "12%", left: "8%", delay: 0 },
  { Icon: CheckCircle2, top: "65%", left: "4%", delay: 1.2 },
  { Icon: FlaskConical, top: "25%", left: "88%", delay: 0.6 },
  { Icon: Radar, top: "75%", left: "85%", delay: 1.8 },
];

const testSuite = [
  { name: "src/tests/auth_tokens.spec.ts", time: "85ms" },
  { name: "src/tests/applications.spec.ts", time: "112ms" },
  { name: "src/tests/about_typo_check.spec.ts", time: "58ms" },
  { name: "src/tests/why_alignments.spec.ts", time: "42ms" },
  { name: "src/tests/database_health.spec.ts", time: "245ms", failOnBug: true },
];

export default function Hero({
  qaMode,
  reportedBugs,
  onReportBug,
}: {
  qaMode: boolean;
  reportedBugs: string[];
  onReportBug: (bug: any) => void;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });

  const isBug1Reported = reportedBugs.includes("BUG-INT-01");
  const isBug4Reported = reportedBugs.includes("BUG-INT-04");

  // Interactive Test Runner states
  const [testPhase, setTestPhase] = useState<"running" | "done">("running");
  const [activeTestIndex, setActiveTestIndex] = useState(0);
  const [completedTests, setCompletedTests] = useState<{ name: string; status: "PASS" | "FAIL"; time: string }[]>([]);

  useEffect(() => {
    if (testPhase === "running") {
      if (activeTestIndex < testSuite.length) {
        const nextTest = testSuite[activeTestIndex];
        const isFailingTest = nextTest.failOnBug && qaMode && !isBug4Reported;

        const timeout = setTimeout(() => {
          setCompletedTests((prev) => [
            ...prev,
            {
              name: nextTest.name,
              status: isFailingTest ? "FAIL" : "PASS",
              time: isFailingTest ? "4500ms" : nextTest.time,
            },
          ]);
          setActiveTestIndex((prev) => prev + 1);
        }, isFailingTest ? 1500 : 400);

        return () => clearTimeout(timeout);
      } else {
        setTestPhase("done");
        const timeout = setTimeout(() => {
          setCompletedTests([]);
          setActiveTestIndex(0);
          setTestPhase("running");
        }, 8000);
        return () => clearTimeout(timeout);
      }
    }
  }, [testPhase, activeTestIndex, qaMode, isBug4Reported]);

  const handleMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  const handleBtnHover = () => {
    if (qaMode && !isBug1Reported) {
      const rangeX = 140;
      const rangeY = 70;
      const newX = (Math.random() - 0.5) * rangeX;
      const newY = (Math.random() - 0.5) * rangeY;
      setBtnOffset({ x: newX, y: newY });
    }
  };

  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${mx}px ${my}px, rgba(79,70,229,0.22), transparent 70%)`;

  return (
    <section
      id="hero"
      onMouseMove={handleMove}
      className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden"
    >
      <motion.div className="pointer-events-none absolute inset-0" style={{ background: spotlight }} />

      {floatIcons.map(({ Icon, top, left, delay }, i) => (
        <motion.div
          key={i}
          className="hidden md:flex absolute w-14 h-14 rounded-2xl glass items-center justify-center text-indigo-300 animate-float"
          style={{ top, left, animationDelay: `${delay}s` }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 + delay * 0.2, duration: 0.6 }}
        >
          <Icon size={22} />
        </motion.div>
      ))}

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-mono text-emerald-400 mb-6"
          >
            <ShieldCheck size={14} />
            SQA Engineer
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
          >
            {profile.name.split(" ")[0]}{" "}
            <span className="text-gradient">{profile.name.split(" ")[1]}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-5 text-xl text-slate-300 font-display"
          >
            Ensuring Quality. Delivering Reliability.
            <br /> Building Confidence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-4 h-7 font-mono text-cyan-400 text-lg"
          >
            <TypeCycle words={profile.roles} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-4 items-center"
          >
            <a
              href="#projects"
              data-cursor-hover
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 font-medium hover:shadow-[0_0_30px_-5px_rgba(79,70,229,0.9)] transition-all hover:-translate-y-0.5"
            >
              View Projects
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Runaway Download Resume Button */}
            <div className="relative inline-block">
              <motion.a
                href="/resume.pdf"
                onMouseEnter={handleBtnHover}
                animate={{ x: btnOffset.x, y: btnOffset.y }}
                transition={{ type: "spring", stiffness: 320, damping: 14 }}
                data-cursor-hover
                className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-xl glass font-medium transition-all ${
                  qaMode && !isBug1Reported
                    ? "border-rose-500/40 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.15)]"
                    : "hover:-translate-y-0.5 hover:text-white"
                }`}
              >
                <Download size={16} /> Download Resume
              </motion.a>

              {/* Bug reporter trigger */}
              {qaMode && !isBug1Reported && (
                <button
                  type="button"
                  onClick={() =>
                    onReportBug({
                      id: "BUG-INT-01",
                      title: "Download Resume button evades mouse interaction (elusive layout bug)",
                      steps: [
                        "Toggle QA Mode to Active",
                        "Hover mouse cursor near 'Download Resume' button in Hero section",
                        "Attempt to click button",
                      ],
                      expected: "Download Resume button remains static and responds to standard click events.",
                      actual: "Button shifts coordinates automatically on hover, rendering it unclickable.",
                      priority: "High",
                      severity: "Critical",
                    })
                  }
                  className="absolute -top-6 -right-6 flex items-center gap-1 px-2 py-1 bg-rose-500 hover:bg-rose-600 text-[10px] text-white font-mono rounded-lg shadow-[0_0_10px_rgba(244,63,94,0.5)] z-20 cursor-pointer animate-bounce"
                >
                  <Bug size={10} /> Report Bug
                </button>
              )}
            </div>

            <a
              href="#contact"
              data-cursor-hover
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/10 font-medium hover:bg-white/5 hover:-translate-y-0.5 transition-all"
            >
              <Mail size={16} /> Contact Me
            </a>
          </motion.div>
        </div>

        {/* Live SQA IDE Console */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative w-full max-w-[460px] h-[390px] hidden md:flex items-center justify-center"
        >
          <div className="absolute w-80 h-80 rounded-full bg-indigo-500/10 blur-[100px] -z-10" />
          
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className={`w-full h-full glass rounded-[1.75rem] border flex overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] transition-all duration-300 ${
              completedTests.some((c) => c.status === "FAIL")
                ? "border-rose-500/35 bg-slate-950/90 shadow-[0_0_35px_rgba(244,63,94,0.15)]"
                : "border-white/10 bg-slate-950/95"
            }`}
          >
            {/* VS Code Left Sidebar (Activity Bar) */}
            <div className="w-11 shrink-0 bg-slate-950 border-r border-white/5 flex flex-col items-center py-4 justify-between select-none">
              <div className="flex flex-col gap-5 text-slate-500">
                <span className="cursor-pointer hover:text-cyan-400 transition-colors text-cyan-400">
                  <ShieldCheck size={18} />
                </span>
                <span className="cursor-pointer hover:text-cyan-400 transition-colors">
                  <Bug size={18} />
                </span>
                <span className="cursor-pointer hover:text-cyan-400 transition-colors">
                  <Radar size={18} />
                </span>
                <span className="cursor-pointer hover:text-cyan-400 transition-colors text-indigo-400/70">
                  <FlaskConical size={18} />
                </span>
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
            </div>

            {/* Editor + Terminal Container */}
            <div className="flex-1 flex flex-col min-w-0">
              {/* Tab Bar */}
              <div className="h-8 bg-slate-950/80 border-b border-white/5 flex items-center justify-between px-3 select-none font-mono text-[9px] text-slate-400">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/40 border-r border-white/5 text-slate-200">
                  <span className="text-cyan-400 font-bold">PW</span>
                  <span className="truncate max-w-[120px]">system_integrity.spec.ts</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span className="text-[8px] text-slate-500">PLAYWRIGHT</span>
                </div>
              </div>

              {/* Code Editor Area */}
              <div className="p-4 flex-1 font-mono text-[10px] leading-relaxed text-left text-slate-300 select-text overflow-hidden">
                <div className="text-slate-500 text-[9px] mb-1.5 select-none">// Hassan's Automated Health Contract</div>
                <div>
                  <span className="text-indigo-400">import</span> {"{ test, expect }"} <span className="text-indigo-400">from</span> <span className="text-emerald-400">"@playwright/test"</span>;
                </div>
                <div className="mt-1">
                  <span className="text-cyan-400">test</span>(<span className="text-emerald-400">"verify environment"</span>, <span className="text-indigo-400">async</span> ({"{ page }"}) =&gt; {"{"}
                </div>
                <div className="pl-4">
                  <span className="text-indigo-400">await</span> page.<span className="text-cyan-400">goto</span>(<span className="text-emerald-400">"https://hassanraza.qa"</span>);
                </div>
                <div className="pl-4">
                  <span className="text-indigo-400">const</span> status = <span className="text-indigo-400">await</span> page.<span className="text-cyan-400">locator</span>(<span className="text-emerald-400">"#sys-status"</span>);
                </div>
                <div className="pl-4">
                  <span className="text-indigo-400">await</span> <span className="text-cyan-400">expect</span>(status).<span className="text-cyan-400">toHaveText</span>(<span className="text-emerald-400">"ACTIVE"</span>);
                </div>
                <div>{"});"}</div>
              </div>

              {/* Integrated Terminal Panel */}
              <div className="h-[155px] border-t border-white/5 bg-slate-950 flex flex-col font-mono text-[10px] p-4 text-left">
                {/* Terminal Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-1.5 mb-2 select-none text-[8.5px] text-slate-500">
                  <span className="font-bold">INTEGRATED TERMINAL // PLAYWRIGHT RUNNER</span>
                  <span>PW Version: 1.45.0</span>
                </div>

                {/* Log Stream */}
                <div className="flex-1 overflow-y-auto pr-1 space-y-1.5">
                  {completedTests.map((t, idx) => (
                    <div key={idx} className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[8px] font-bold shrink-0 ${
                            t.status === "PASS" ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                          }`}
                        >
                          {t.status}
                        </span>
                        <span className="text-slate-300 font-medium truncate max-w-[150px]">{t.name}</span>
                        <span className="text-slate-500 text-[8.5px] ml-auto">{t.time}</span>
                      </div>
                      {t.status === "FAIL" && (
                        <div className="pl-6 text-rose-400/90 text-[9px] leading-normal border-l border-rose-500/30 ml-2.5 my-1 font-mono">
                          <div>Error: locator("#sys-status") timed out</div>
                          <div className="text-[8px] text-rose-500/70">Expected: "ACTIVE" | Actual: "DEGRADED"</div>
                        </div>
                      )}
                    </div>
                  ))}

                  {testPhase === "running" && activeTestIndex < testSuite.length && (
                    <div className="flex items-center gap-2 text-cyan-400 animate-pulse">
                      <span className="px-1.5 py-0.5 rounded bg-cyan-500/10 text-[8px] font-bold shrink-0">RUNNING</span>
                      <span className="truncate max-w-[180px]">{testSuite[activeTestIndex].name}</span>
                    </div>
                  )}
                </div>

                {/* Summary Status Bar */}
                <div className="border-t border-white/5 pt-2 mt-2 flex justify-between items-center text-[9px] text-slate-400 select-none">
                  <div>
                    PASS: <span className="text-emerald-400 font-bold">{completedTests.filter((c) => c.status === "PASS").length}</span>
                    {"  "}
                    FAIL: <span className={completedTests.some((c) => c.status === "FAIL") ? "text-rose-400 font-bold" : "text-slate-450"}>{completedTests.filter((c) => c.status === "FAIL").length}</span>
                  </div>
                  <span className={`px-1.5 py-0.5 rounded-md border text-[8px] font-bold font-mono ${
                    completedTests.some((c) => c.status === "FAIL")
                      ? "bg-rose-500/10 border-rose-500/25 text-rose-400 animate-pulse"
                      : "bg-emerald-500/10 border-emerald-500/25 text-emerald-400"
                  }`}>
                    {completedTests.some((c) => c.status === "FAIL") ? "DEGRADED" : "SYS_STABLE"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
      >
        <span className="text-xs font-mono tracking-widest">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-slate-600 flex justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-slate-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}

