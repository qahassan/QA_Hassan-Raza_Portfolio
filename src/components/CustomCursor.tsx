import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 28, stiffness: 350, mass: 0.4 });
  const springY = useSpring(y, { damping: 28, stiffness: 350, mass: 0.4 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX - 14);
      y.set(e.clientY - 14);
      if (!visible) setVisible(true);
      const target = e.target as HTMLElement;
      setIsPointer(!!target.closest("a,button,[data-cursor-hover]"));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [visible, x, y]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 z-[200] pointer-events-none mix-blend-difference hidden md:block"
      style={{ x: springX, y: springY, opacity: visible ? 1 : 0 }}
    >
      <motion.div
        className="rounded-full border border-white"
        animate={{
          width: isPointer ? 48 : 28,
          height: isPointer ? 48 : 28,
          backgroundColor: isPointer ? "rgba(255,255,255,0.15)" : "transparent",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </motion.div>
  );
}
