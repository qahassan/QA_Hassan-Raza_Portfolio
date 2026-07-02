import { SectionHeading, Reveal } from "./Reveal";
import { experience } from "../data/content";

export default function Experience() {
  return (
    <section id="experience" className="relative py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          eyebrow="Experience"
          title={<>Where I've put <span className="text-gradient">testing into practice.</span></>}
          subtitle="A branching commit history of my professional quality engineering timeline."
        />

        <div className="relative flex flex-col mt-12">
          {experience.map((exp, i) => {
            const isFirst = i === 0;
            const isLast = i === experience.length - 1;
            
            return (
              <Reveal key={exp.company} delay={i * 0.15} className="flex flex-col sm:flex-row gap-4 sm:gap-6 relative mb-12 last:mb-0">
                {/* Git Graph Visual Branch */}
                <div className="hidden sm:flex flex-col items-center w-12 shrink-0 select-none">
                  {/* Top Branch Line */}
                  <div className={`w-0.5 h-6 transition-all ${
                    isFirst ? "bg-transparent" : "bg-gradient-to-b from-cyan-400 to-cyan-500"
                  }`} />
                  
                  {/* Pulsing Commit Node */}
                  <div className={`w-9 h-9 rounded-full border-2 bg-slate-950 flex items-center justify-center relative z-10 transition-all ${
                    exp.current
                      ? "border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.35)]"
                      : "border-indigo-400 shadow-[0_0_15px_rgba(79,70,229,0.2)]"
                  }`}>
                    {exp.current ? (
                      <span className="w-4 h-4 rounded-full bg-cyan-400 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />
                      </span>
                    ) : (
                      <GitCommit size={14} className="text-indigo-400" />
                    )}
                  </div>

                  {/* Bottom Branch Line */}
                  <div className={`w-0.5 flex-1 transition-all ${
                    isLast ? "bg-gradient-to-b from-indigo-500 to-transparent" : "bg-gradient-to-b from-cyan-500 to-indigo-500"
                  }`} />
                </div>

                {/* Job Details Card */}
                <div className="flex-1 glass rounded-2xl p-6 border border-white/5 hover:border-indigo-550/25 transition-all duration-300 hover:shadow-[0_0_30px_-10px_rgba(79,70,229,0.15)] text-left">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <Briefcase size={16} className={exp.current ? "text-cyan-400" : "text-indigo-400"} />
                      <h3 className="font-display text-lg font-semibold text-slate-200">{exp.role}</h3>
                      {/* Mobile Git Commit badge */}
                      <span className="sm:hidden w-2 h-2 rounded-full flex items-center justify-center shrink-0 ml-1" style={{ color: exp.current ? "#22d3ee" : "#818cf8" }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                      </span>
                    </div>
                    {exp.current && (
                      <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-400 border border-cyan-400/25 shadow-[0_0_10px_rgba(6,182,212,0.1)]">
                        ACTIVE BRANCH
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between flex-wrap gap-2 text-sm mb-4">
                    <span className="text-cyan-400 font-medium">{exp.company}</span>
                    <span className="text-slate-500 text-xs font-mono flex items-center gap-1.5">
                      <Calendar size={12} /> {exp.duration}
                    </span>
                  </div>

                  <div className="mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-2">Target Repositories</span>
                    <div className="flex flex-wrap gap-2">
                      {exp.projects.map((p) => (
                        <span key={p} className="px-2.5 py-0.5 rounded-lg bg-white/[0.03] border border-white/5 text-xs text-slate-350 font-sans">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-2">Release Contributions</span>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.responsibilities.map((r) => (
                        <span
                          key={r}
                          className="px-2 py-0.5 rounded-md border border-white/[0.03] bg-indigo-500/[0.01] text-[11px] text-slate-400 font-mono"
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
