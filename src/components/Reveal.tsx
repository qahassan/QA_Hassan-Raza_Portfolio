import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className = "",
  y = 28,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] uppercase text-cyan-400/90 mb-4">
      <span className="w-6 h-px bg-cyan-400/70" />
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={align === "center" ? "text-center max-w-2xl mx-auto mb-16" : "mb-16 max-w-2xl"}>
      <div className={align === "center" ? "flex justify-center" : ""}>
        <Eyebrow>{eyebrow}</Eyebrow>
      </div>
      <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">{title}</h2>
      {subtitle && <p className="mt-4 text-slate-400 text-lg">{subtitle}</p>}
    </Reveal>
  );
}
