import { motion } from "framer-motion";
import { Eye, MessageCircle, Zap, Search, Shield, RefreshCw, Bug } from "lucide-react";
import { SectionHeading, Reveal } from "./Reveal";
import { whyHireMe } from "../data/content";

const icons = [Eye, MessageCircle, Zap, Search, Shield, RefreshCw];
const colors = ["#4F46E5", "#06B6D4", "#22C55E", "#F59E0B", "#8B5CF6", "#EC4899"];

export default function WhyHireMe({
  qaMode,
  reportedBugs,
  onReportBug,
}: {
  qaMode: boolean;
  reportedBugs: string[];
  onReportBug: (bug: any) => void;
}) {
  const isBug3Reported = reportedBugs.includes("BUG-INT-03");

  return (
    <section id="why" className="relative py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="Why Hire Me"
          title={<>Six reasons <span className="text-gradient">quality ships on time.</span></>}
          align="center"
        />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {whyHireMe.map((item, i) => {
            const Icon = icons[i];
            const color = colors[i];
            const isMisaligned = i === 0 && qaMode && !isBug3Reported;

            return (
              <Reveal key={item.title} delay={i * 0.08} className="relative">
                <motion.div
                  whileHover={{ y: isMisaligned ? 0 : -8, borderColor: isMisaligned ? "rgba(244,63,94,0.4)" : `${color}60` }}
                  className={`glass rounded-2xl p-7 group transition-colors h-full flex flex-col ${
                    isMisaligned ? "border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.1)]" : "border-white/10"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 ${
                      isMisaligned
                        ? "rotate-[-42deg] -translate-x-3.5 -translate-y-2.5 border border-dashed border-rose-500"
                        : "group-hover:scale-110"
                    }`}
                    style={{
                      background: isMisaligned ? "rgba(244,63,94,0.15)" : `${color}18`,
                      boxShadow: isMisaligned
                        ? "0 0 15px rgba(244,63,94,0.3)"
                        : `0 0 20px -6px ${color}`,
                    }}
                  >
                    <Icon size={22} style={{ color: isMisaligned ? "#F43F5E" : color }} />
                  </div>
                  <h3 className="font-display font-semibold mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">{item.desc}</p>

                  {/* Bug reporter trigger */}
                  {isMisaligned && (
                    <button
                      type="button"
                      onClick={() =>
                        onReportBug({
                          id: "BUG-INT-03",
                          title: "Misaligned icon badge inside Why Hire Me grid card",
                          steps: [
                            "Toggle QA Mode to Active",
                            "Scroll to 'Why Hire Me' section",
                            "Observe the layout of the grid cards",
                          ],
                          expected: "Icon badges are centered and aligned consistently with titles.",
                          actual: "The first card's icon badge ('Attention to Detail') is rotated and shifted out of place.",
                          priority: "Medium",
                          severity: "Moderate",
                        })
                      }
                      className="absolute top-4 right-4 flex items-center gap-1 px-1.5 py-0.5 bg-rose-500 hover:bg-rose-600 text-[9px] text-white font-mono rounded shadow-[0_0_8px_rgba(244,63,94,0.4)] z-20 cursor-pointer animate-pulse"
                    >
                      <Bug size={9} /> Report Bug
                    </button>
                  )}
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

