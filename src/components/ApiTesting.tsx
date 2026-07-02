import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertOctagon, RefreshCw, Bug } from "lucide-react";
import { SectionHeading, Reveal } from "./Reveal";

interface Endpoint {
  id: string;
  label: string;
  method: string;
  endpoint: string;
  request: string;
  response: string;
  responseBug?: string;
  statusCode: number;
  statusText: string;
  latency: string;
  size: string;
}

const ENDPOINTS: Record<string, Endpoint> = {
  applications: {
    id: "applications",
    label: "Create Application",
    method: "POST",
    endpoint: "/api/v1/applications",
    request: `{
  "petId": "f3a9-2210",
  "fosterId": "u-8841",
  "message": "Available starting next week",
  "duration": "2 weeks"
}`,
    response: `{
  "status": "success",
  "applicationId": "app-5521",
  "createdAt": "2026-06-28T10:32:00Z",
  "pet": {
    "id": "f3a9-2210",
    "name": "Biscuit",
    "species": "Dog"
  }
}`,
    statusCode: 200,
    statusText: "OK",
    latency: "38ms",
    size: "0.26 KB",
  },
  health: {
    id: "health",
    label: "Health Check",
    method: "GET",
    endpoint: "/api/v1/health",
    request: "{}",
    response: `{
  "status": "healthy",
  "version": "1.2.0",
  "uptime": "12.4 days",
  "checks": {
    "database": "connected",
    "cache": "connected"
  }
}`,
    responseBug: `{
  "status": "error",
  "code": 500,
  "timestamp": "2026-07-01T12:44:00Z",
  "error": "NullPointerException",
  "message": "Cannot invoke 'db.getConnection()' because 'this.pool' is null",
  "stackTrace": [
    "com.foliumai.db.Pool.getConnection(Pool.java:42)",
    "com.foliumai.api.HealthController.check(HealthController.java:18)"
  ]
}`,
    statusCode: 200,
    statusText: "OK",
    latency: "24ms",
    size: "0.19 KB",
  },
  coverage: {
    id: "coverage",
    label: "QA Metrics",
    method: "GET",
    endpoint: "/api/v1/coverage",
    request: "{}",
    response: `{
  "status": "active",
  "summary": {
    "totalTestCases": 1000,
    "passRate": "99.2%",
    "apiCoverage": "95.8%",
    "automationPercentage": "0.0% (Manual Guarded)"
  },
  "lastBuild": {
    "id": "build-104",
    "outcome": "PASSED"
  }
}`,
    statusCode: 200,
    statusText: "OK",
    latency: "45ms",
    size: "0.31 KB",
  },
};

type EndpointKey = keyof typeof ENDPOINTS;

export default function ApiTesting({
  qaMode,
  reportedBugs,
  onReportBug,
  onAddNetworkLog,
}: {
  qaMode: boolean;
  reportedBugs: string[];
  onReportBug: (bug: any) => void;
  onAddNetworkLog: (log: any) => void;
}) {
  const [selected, setSelected] = useState<EndpointKey>("applications");
  const [isSending, setIsSending] = useState(false);
  const [showResponse, setShowResponse] = useState(true);

  const active = ENDPOINTS[selected];
  const isBug4Reported = reportedBugs.includes("BUG-INT-04");

  // Determine if this specific response is bugged
  const isBuggedResponse = qaMode && selected === "health" && !isBug4Reported;

  const handleSend = () => {
    setIsSending(true);
    setShowResponse(false);
    setTimeout(() => {
      setIsSending(false);
      setShowResponse(true);

      // Log network call to SQA DevTools
      onAddNetworkLog({
        method: active.method,
        url: active.endpoint,
        status: isBuggedResponse ? 500 : 200,
        time: new Date().toLocaleTimeString(),
        latency: active.latency,
      });
    }, 850);
  };

  const getResponseContent = () => {
    if (isBuggedResponse) return active.responseBug;
    return active.response;
  };

  const getResponseStatus = () => {
    if (isBuggedResponse) return { code: 500, text: "Internal Server Error" };
    return { code: active.statusCode, text: active.statusText };
  };

  return (
    <section id="api" className="relative py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          eyebrow="API Testing"
          title={<>Validating contracts, <span className="text-gradient">not just UIs.</span></>}
          subtitle="Test real mock endpoints below using the interactive API console."
        />

        {/* Tab Selector */}
        <div className="flex flex-wrap gap-2.5 mb-6">
          {(Object.keys(ENDPOINTS) as EndpointKey[]).map((key) => {
            const endpoint = ENDPOINTS[key];
            const isTabSelected = selected === key;
            const isMethodPost = endpoint.method === "POST";
            
            return (
              <button
                key={key}
                onClick={() => {
                  setSelected(key);
                  setShowResponse(true);
                }}
                data-cursor-hover
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border text-xs font-mono font-medium transition-all ${
                  isTabSelected
                    ? "bg-white/10 border-indigo-400/50 text-white shadow-[0_0_20px_rgba(79,70,229,0.2)]"
                    : "bg-white/[0.02] border-white/10 text-slate-400 hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    isMethodPost ? "bg-emerald-500/10 text-emerald-400" : "bg-cyan-500/10 text-cyan-400"
                  }`}
                >
                  {endpoint.method}
                </span>
                <span>{endpoint.endpoint}</span>
              </button>
            );
          })}
        </div>

        {/* Console Box */}
        <Reveal className="glass rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.4)]">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.01]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-[10px] font-mono text-slate-500 ml-2">REST_CLIENT // v1.2</span>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleSend}
              disabled={isSending}
              data-cursor-hover
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-xs font-medium text-white hover:shadow-[0_0_25px_-5px_rgba(79,70,229,0.8)] disabled:opacity-50 transition-shadow cursor-pointer"
            >
              {isSending ? (
                <RefreshCw size={12} className="animate-spin" />
              ) : (
                <Send size={12} />
              )}
              {isSending ? "Sending..." : "Send Request"}
            </motion.button>
          </div>

          {/* Grid Client body */}
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {/* Request Pane */}
            <div className="p-6 text-left">
              <div className="flex gap-4 border-b border-white/5 pb-2 mb-3 text-[10px] font-mono text-slate-500">
                <span className="text-cyan-400 font-bold border-b-2 border-cyan-400 pb-2">Body</span>
                <span className="cursor-not-allowed hover:text-slate-300 transition-colors">Headers (3)</span>
                <span className="cursor-not-allowed hover:text-slate-300 transition-colors">Params (0)</span>
                <span className="cursor-not-allowed hover:text-slate-300 transition-colors">Authorization</span>
              </div>
              <pre className="font-mono text-xs text-slate-300 bg-black/45 rounded-xl p-4 overflow-x-auto leading-relaxed border border-white/5 h-60 text-left">
{active.request}
              </pre>
            </div>

            {/* Response Pane */}
            <div className="p-6 relative text-left">
              <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3 text-[10px] font-mono text-slate-500">
                <div className="flex gap-4">
                  <span className="text-cyan-400 font-bold border-b-2 border-cyan-400 pb-2">Response Body</span>
                  <span className="cursor-not-allowed hover:text-slate-300 transition-colors">Headers (5)</span>
                  <span className="cursor-not-allowed hover:text-slate-300 transition-colors">Cookies</span>
                </div>
                {showResponse && !isSending && (
                  <span
                    className={`flex items-center gap-1 font-mono font-semibold ${
                      getResponseStatus().code === 200 ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {getResponseStatus().code === 200 ? (
                      <CheckCircle2 size={11} />
                    ) : (
                      <AlertOctagon size={11} />
                    )}
                    {getResponseStatus().code} {getResponseStatus().text}
                  </span>
                )}
              </div>

              <div className="relative h-60 bg-black/45 rounded-xl border border-white/5 overflow-hidden">
                <AnimatePresence mode="wait">
                  {isSending && (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/20"
                    >
                      <RefreshCw size={20} className="text-cyan-400 animate-spin" />
                      <span className="text-[10px] font-mono text-cyan-400 animate-pulse">EXECUTING CALL...</span>
                    </motion.div>
                  )}

                  {showResponse && !isSending && (
                    <motion.div
                      key="response"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="h-full overflow-auto p-4 text-left"
                    >
                      <pre
                        className={`font-mono text-xs leading-relaxed ${
                          getResponseStatus().code === 200 ? "text-emerald-300/90" : "text-rose-400"
                        }`}
                      >
{getResponseContent()}
                      </pre>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bug indicator overlay if this is the health check error */}
              {isBuggedResponse && showResponse && !isSending && (
                <div className="absolute inset-0 bg-rose-950/20 backdrop-blur-[1px] flex items-center justify-center pointer-events-none p-6">
                  <motion.button
                    type="button"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() =>
                      onReportBug({
                        id: "BUG-INT-04",
                        title: "HTTP 500 Internal Server Error when testing '/api/v1/health' endpoint",
                        steps: [
                          "Toggle QA Mode to Active",
                          "Scroll to API Testing client section",
                          "Select '/api/v1/health' from the endpoint selector",
                          "Click 'Send'",
                        ],
                        expected: "Response shows status code 200 OK with server status green.",
                        actual: "Response returns status code 500 Internal Server Error and crashes.",
                        priority: "Critical",
                        severity: "Critical",
                      })
                    }
                    data-cursor-hover
                    className="pointer-events-auto flex items-center gap-2 px-5 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 font-medium text-xs text-white shadow-[0_0_30px_rgba(244,63,94,0.7)] cursor-pointer"
                  >
                    <Bug size={14} className="animate-pulse" />
                    Report API Bug
                  </motion.button>
                </div>
              )}
            </div>
          </div>

          {/* Stats Bar */}
          {showResponse && !isSending && (
            <div className="flex items-center justify-end gap-6 px-6 py-2 border-t border-white/10 bg-white/[0.005] font-mono text-[10px] text-slate-500">
              <div>SIZE: {isBuggedResponse ? "0.38 KB" : active.size}</div>
              <div>TIME: {active.latency}</div>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

