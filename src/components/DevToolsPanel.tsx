import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, Network, AlertTriangle, CheckCircle2, X, Compass } from "lucide-react";

type DevToolsTab = "console" | "network" | "issues";

type NetworkLog = {
  method: string;
  url: string;
  status: number;
  time: string;
  latency: string;
};

export default function DevToolsPanel({
  reportedBugs,
  onLocateBug,
  onClose,
  networkLogs,
}: {
  reportedBugs: string[];
  onLocateBug: (bugId: string) => void;
  onClose: () => void;
  networkLogs: NetworkLog[];
}) {
  const [activeTab, setActiveTab] = useState<DevToolsTab>("console");
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);

  useEffect(() => {
    // Add logs periodically
    const logs = [
      "[INFO] SQA Sandbox Engine v1.5.0 initialized.",
      "[INFO] Scanning DOM trees for structure integrity...",
      `[WARN] DOM Scan: 4 deviations detected in page layouts.`,
      "[INFO] Listening on API mock port 5173...",
    ];
    setConsoleLogs(logs);

    const interval = setInterval(() => {
      const liveLogs = [
        "[INFO] Watcher: HMR (Hot Module Replacement) active.",
        "[INFO] Performance: Page load Largest Contentful Paint (LCP) optimized at 0.62s.",
        "[INFO] Accessibility Audit: WCAG AA compliant.",
        "[INFO] Memory allocation: WebAssembly thread pool stable.",
      ];
      const randomLog = liveLogs[Math.floor(Math.random() * liveLogs.length)];
      setConsoleLogs((prev) => [...prev, `[INFO] ${new Date().toLocaleTimeString()} — ${randomLog}`]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const bugsList = [
    { id: "BUG-INT-01", name: "BUG-INT-01: Hero Resume Button Runaway", section: "hero", desc: "Download Resume button evades hover interaction." },
    { id: "BUG-INT-02", name: "BUG-INT-02: About Summary Spelling Typo", section: "about", desc: "Spelling typo 'quallity' in About paragraph." },
    { id: "BUG-INT-03", name: "BUG-INT-03: Why Hire Me Icon Misalignment", section: "why", desc: "First grid card's icon badge is rotated and shifted." },
    { id: "BUG-INT-04", name: "BUG-INT-04: REST API Health Check Failure", section: "api", desc: "GET /api/v1/health returns 500 Internal Error." },
  ];

  return (
    <motion.div
      initial={{ y: 260 }}
      animate={{ y: 0 }}
      exit={{ y: 260 }}
      transition={{ type: "spring", damping: 20, stiffness: 180 }}
      className="fixed bottom-0 left-0 right-0 h-64 z-[90] glass bg-[#050814]/95 border-t border-white/10 flex flex-col font-mono text-xs text-slate-300 shadow-[0_-10px_40px_rgba(0,0,0,0.6)] select-none text-left"
    >
      {/* DevTools Menu Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-slate-900/40 select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="text-[10px] text-slate-500 font-bold uppercase ml-2 border-r border-white/10 pr-3">QA DevTools</span>

          {/* Tabs */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab("console")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[10px] uppercase font-bold transition-colors ${
                activeTab === "console" ? "bg-white/10 text-cyan-400" : "text-slate-500 hover:text-slate-350"
              }`}
            >
              <Terminal size={11} /> Console
            </button>
            <button
              onClick={() => setActiveTab("network")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[10px] uppercase font-bold transition-colors ${
                activeTab === "network" ? "bg-white/10 text-cyan-400" : "text-slate-500 hover:text-slate-350"
              }`}
            >
              <Network size={11} /> Network
            </button>
            <button
              onClick={() => setActiveTab("issues")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[10px] uppercase font-bold transition-colors ${
                activeTab === "issues" ? "bg-white/10 text-cyan-400" : "text-slate-500 hover:text-slate-350"
              }`}
            >
              <AlertTriangle size={11} /> Issues ({4 - reportedBugs.length})
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-md text-slate-500 hover:text-white hover:bg-white/5 transition-colors"
        >
          <X size={14} />
        </button>
      </div>

      {/* Pane Contents */}
      <div className="flex-1 overflow-y-auto p-4 bg-black/30">
        {activeTab === "console" && (
          <div className="space-y-1.5">
            {consoleLogs.map((log, i) => {
              const isError = log.includes("[ERROR]");
              const isWarn = log.includes("[WARN]");
              return (
                <div
                  key={i}
                  className={`leading-relaxed border-l-2 pl-2 ${
                    isError
                      ? "border-rose-500 text-rose-400 bg-rose-500/5"
                      : isWarn
                      ? "border-amber-500 text-amber-400 bg-amber-500/5"
                      : "border-cyan-500/40 text-slate-300"
                  }`}
                >
                  {log}
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "network" && (
          <div className="space-y-1 text-[11px]">
            {networkLogs.length === 0 ? (
              <div className="text-slate-500 italic text-center py-8">
                No active network sockets logged. Send a request in the API testing client below to log calls.
              </div>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="text-slate-500 border-b border-white/5">
                    <th className="pb-1.5 font-bold">METHOD</th>
                    <th className="pb-1.5 font-bold">PATH</th>
                    <th className="pb-1.5 font-bold">STATUS</th>
                    <th className="pb-1.5 font-bold">TIME</th>
                    <th className="pb-1.5 font-bold">LATENCY</th>
                  </tr>
                </thead>
                <tbody>
                  {networkLogs.map((log, i) => (
                    <tr key={i} className="border-b border-white/[0.02]">
                      <td className={`py-1 font-bold ${log.method === "POST" ? "text-emerald-400" : "text-cyan-400"}`}>
                        {log.method}
                      </td>
                      <td className="py-1 text-slate-300">{log.url}</td>
                      <td className={`py-1 font-bold ${log.status === 200 ? "text-emerald-400" : "text-rose-400"}`}>
                        {log.status}
                      </td>
                      <td className="py-1 text-slate-500">{log.time}</td>
                      <td className="py-1 text-slate-400 font-mono">{log.latency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === "issues" && (
          <div className="grid md:grid-cols-2 gap-4">
            {bugsList.map((bug) => {
              const isReported = reportedBugs.includes(bug.id);
              return (
                <div
                  key={bug.id}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-colors ${
                    isReported
                      ? "bg-emerald-950/10 border-emerald-500/20 text-emerald-400/80"
                      : "bg-rose-950/10 border-rose-500/20 text-slate-200"
                  }`}
                >
                  <div>
                    <div className="font-bold flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${isReported ? "bg-emerald-400" : "bg-rose-500 animate-pulse"}`} />
                      {bug.name}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">{bug.desc}</div>
                  </div>

                  {isReported ? (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 font-mono">
                      <CheckCircle2 size={12} /> REPORTED
                    </span>
                  ) : (
                    <button
                      onClick={() => onLocateBug(bug.id)}
                      data-cursor-hover
                      className="flex items-center gap-1 px-2.5 py-1 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-bold rounded-lg text-[9px] transition-all cursor-pointer"
                    >
                      <Compass size={10} className="animate-spin" /> LOCATE
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Console Bottom Stats */}
      <div className="flex items-center justify-between px-4 py-1.5 border-t border-white/10 bg-slate-900/20 text-[10px] text-slate-500">
        <div>SANDBOX ENGINE: ACTIVE // WORKERS: 1</div>
        <div>VERIFY STATS: {reportedBugs.length}/4 BUGS SOLVED</div>
      </div>
    </motion.div>
  );
}
