import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { SectionHeading, Reveal } from "./Reveal";
import { testimonials } from "../data/content";

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIdx((i) => (i + 1) % testimonials.length);

  return (
    <section id="testimonials" className="relative py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeading
          eyebrow="Recommendations"
          title={<>What teams <span className="text-gradient">have said.</span></>}
          align="center"
        />

        <Reveal className="relative glass rounded-3xl p-10 overflow-hidden">
          <Quote size={48} className="absolute top-8 right-8 text-indigo-500/20" />
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-lg text-slate-200 leading-relaxed mb-8 font-display italic">
                "{testimonials[idx].text}"
              </p>
              <div>
                <div className="font-semibold">{testimonials[idx].name}</div>
                <div className="text-slate-500 text-sm">{testimonials[idx].role}</div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  data-cursor-hover
                  className={`w-2 h-2 rounded-full transition-all ${i === idx ? "bg-indigo-400 w-6" : "bg-slate-600"}`}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={prev}
                data-cursor-hover
                className="w-10 h-10 rounded-xl glass hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                data-cursor-hover
                className="w-10 h-10 rounded-xl glass hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
