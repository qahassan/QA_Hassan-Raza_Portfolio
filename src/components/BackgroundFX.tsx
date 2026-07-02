import { useEffect, useRef } from "react";

export default function BackgroundFX() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const colors = ["#4F46E5", "#06B6D4", "#22C55E"];
    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.6 + 0.5,
      vy: Math.random() * 0.25 + 0.05,
      vx: (Math.random() - 0.5) * 0.15,
      color: colors[Math.floor(Math.random() * colors.length)],
      o: Math.random() * 0.5 + 0.2,
    }));

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.y -= p.vy;
        p.x += p.vx;
        if (p.y < -10) p.y = h + 10;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.o;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050816]">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute -top-40 -left-40 w-[40rem] h-[40rem] rounded-full bg-indigo-600/25 blur-[120px] animate-blob" />
      <div className="absolute top-1/3 -right-40 w-[36rem] h-[36rem] rounded-full bg-cyan-500/20 blur-[120px] animate-blob" style={{ animationDelay: "4s" }} />
      <div className="absolute bottom-0 left-1/3 w-[34rem] h-[34rem] rounded-full bg-emerald-500/15 blur-[120px] animate-blob" style={{ animationDelay: "8s" }} />
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="noise-overlay" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050816]" />
    </div>
  );
}