import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Reveal } from "./Reveal";
import { stats } from "../data/content";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-gradient">
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="text-center glass rounded-3xl py-6 px-2.5 sm:py-10 sm:px-4">
            <Counter value={s.value} suffix={s.suffix} />
            <div className="text-slate-400 text-sm mt-2">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
