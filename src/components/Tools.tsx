import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading, Reveal } from "./Reveal";
import { tools } from "../data/content";

// Custom SVG Icons with exact paths from Simple Icons set
const PostmanIcon = ({ size = 26 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: size, height: size }}>
    <path d="M13.527.099C6.955-.744.942 3.9.099 10.473c-.843 6.572 3.8 12.584 10.373 13.428 6.573.843 12.587-3.801 13.428-10.374C24.744 6.955 20.101.943 13.527.099zm2.471 7.485a.855.855 0 0 0-.593.25l-4.453 4.453-.307-.307-.643-.643c4.389-4.376 5.18-4.418 5.996-3.753zm-4.863 4.861l4.44-4.44a.62.62 0 1 1 .847.903l-4.699 4.125-.588-.588zm.33.694l-1.1.238a.06.06 0 0 1-.067-.032.06.06 0 0 1 .01-.073l.645-.645.512.512zm-2.803-.459l1.172-1.172.879.878-1.979.426a.074.074 0 0 1-.085-.039.072.072 0 0 1 .013-.093zm-3.646 6.058a.076.076 0 0 1-.069-.083.077.077 0 0 1 .022-.046h.002l.946-.946 1.222 1.222-2.123-.147zm2.425-1.256a.228.228 0 0 0-.117.256l.203.865a.125.125 0 0 1-.211.117h-.003l-.934-.934-.294-.295 3.762-3.758 1.82-.393.874.874c-1.255 1.102-2.971 2.201-5.1 3.268zm5.279-3.428h-.002l-.839-.839 4.699-4.125a.952.952 0 0 0 .119-.127c-.148 1.345-2.029 3.245-3.977 5.091zm3.657-6.46l-.003-.002a1.822 1.822 0 0 1 2.459-2.684l-1.61 1.613a.119.119 0 0 0 0 .169l1.247 1.247a1.817 1.817 0 0 1-2.093-.343zm2.578 0a1.714 1.714 0 0 1-.271.218h-.001l-1.207-1.207 1.533-1.533c.661.72.637 1.832-.054 2.522zM18.855 6.05a.143.143 0 0 0-.053.157.416.416 0 0 1-.053.45.14.14 0 0 0 .023.197.141.141 0 0 0 .084.03.14.14 0 0 0 .106-.05.691.691 0 0 0 .087-.751.138.138 0 0 0-.194-.033z" />
  </svg>
);

const SwaggerIcon = ({ size = 26 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: size, height: size }}>
    <path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12c6.616 0 12-5.383 12-12S18.616 0 12 0zm0 1.144c5.995 0 10.856 4.86 10.856 10.856 0 5.995-4.86 10.856-10.856 10.856-5.996 0-10.856-4.86-10.856-10.856C1.144 6.004 6.004 1.144 12 1.144zM8.37 5.868a6.707 6.707 0 0 0-.423.005c-.983.056-1.573.517-1.735 1.472-.115.665-.096 1.348-.143 2.017-.013.35-.05.697-.115 1.038-.134.609-.397.798-1.016.83a2.65 2.65 0 0 0-.244.042v1.463c1.126.055 1.278.452 1.37 1.629.033.429-.013.858.015 1.287.018.406.073.808.156 1.2.259 1.075 1.307 1.435 2.575 1.218v-1.283c-.203 0-.383.005-.558 0-.43-.013-.591-.12-.632-.535-.056-.535-.042-1.08-.075-1.62-.064-1.001-.175-1.988-1.153-2.625.503-.37.868-.812.983-1.398.083-.41.134-.821.166-1.237.028-.415-.023-.84.014-1.25.06-.665.102-.937.9-.91.12 0 .235-.017.369-.027v-1.31c-.16 0-.31-.004-.454-.006zm7.593.009a4.247 4.247 0 0 0-.813.06v1.274c.245 0 .434 0 .623.005.328.004.577.13.61.494.032.332.031.669.064 1.006.065.669.101 1.347.217 2.007.102.544.475.95.941 1.283-.817.549-1.057 1.333-1.098 2.215-.023.604-.037 1.213-.069 1.822-.028.554-.222.734-.78.748-.157.004-.31.018-.484.028v1.305c.327 0 .627.019.927 0 .932-.055 1.495-.507 1.68-1.412.078-.498.124-1 .138-1.504.032-.461.028-.927.074-1.384.069-.715.397-1.01 1.112-1.057a.972.972 0 0 0 .199-.046v-1.463c-.12-.014-.204-.027-.291-.032-.536-.023-.804-.203-.937-.71a5.146 5.146 0 0 1-.152-.993c-.037-.618-.033-1.241-.074-1.86-.08-1.192-.794-1.753-1.887-1.786zm-6.89 5.28a.844.844 0 0 0-.083 1.684h.055a.83.83 0 0 0 .877-.78v-.046a.845.845 0 0 0-.83-.858zm2.911 0a.808.808 0 0 0-.834.78c0 .027 0 .05.004.078 0 .503.342.826.859.826.507 0 .826-.332.826-.853-.005-.503-.342-.836-.855-.831zm2.963 0a.861.861 0 0 0-.876.835c0 .47.378.849.849.849h.009c.425.074.853-.337.881-.83.023-.457-.392-.854-.863-.854z" />
  </svg>
);

const InsomniaIcon = ({ size = 26 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: size, height: size }}>
    <path d="M12.1356 3.4577c4.7179 0 8.5424 3.8245 8.5424 8.5424 0 4.7178-3.8245 8.5423-8.5424 8.5423-4.7178 0-8.5423-3.8245-8.5423-8.5423 0-1.153.2284-2.2527.6425-3.2562.6046.8233 1.5796 1.3579 2.6795 1.3579 1.8347 0 3.322-1.4874 3.322-3.3221 0-1.0999-.5345-2.0749-1.3579-2.6795 1.0036-.414 2.1032-.6425 3.2562-.6425zM12 0C5.3726 0 0 5.3726 0 12s5.3726 12 12 12 12-5.3726 12-12S18.6274 0 12 0Zm0 1.2203c5.9534 0 10.7797 4.8263 10.7797 10.7797S17.9534 22.7797 12 22.7797 1.2203 17.9534 1.2203 12 6.0466 1.2203 12 1.2203Z" />
  </svg>
);

const JiraIcon = ({ size = 26 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: size, height: size }}>
    <path d="M11.571 11.513H0a5.218 5.218 0 0 0 5.232 5.215h2.13v2.057A5.215 5.215 0 0 0 12.575 24V12.518a1.005 1.005 0 0 0-1.005-1.005zm5.723-5.756H5.736a5.215 5.215 0 0 0 5.215 5.214h2.129v2.058a5.218 5.218 0 0 0 5.215 5.214V6.758a1.001 1.001 0 0 0-1.001-1.001zM23.013 0H11.455a5.215 5.215 0 0 0 5.215 5.215h2.129v2.057A5.215 5.215 0 0 0 24 12.483V1.005A1.001 1.001 0 0 0 23.013 0Z" />
  </svg>
);

const AsanaIcon = ({ size = 26 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: size, height: size }}>
    <path d="M18.78 12.653c-2.882 0-5.22 2.336-5.22 5.22s2.338 5.22 5.22 5.22 5.22-2.34 5.22-5.22-2.336-5.22-5.22-5.22zm-13.56 0c-2.88 0-5.22 2.337-5.22 5.22s2.338 5.22 5.22 5.22 5.22-2.338 5.22-5.22-2.336-5.22-5.22-5.22zm12-6.525c0 2.883-2.337 5.22-5.22 5.22-2.882 0-5.22-2.337-5.22-5.22 0-2.88 2.338-5.22 5.22-5.22 2.883 0 5.22 2.34 5.22 5.22z" />
  </svg>
);

// Custom SVG Icon for TestRail
const TestRailIcon = ({ size = 26 }: { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
  >
    <path d="M3 3h18v18H3z" />
    <path d="M7 8h10M7 12h10M7 16h6" />
    <circle cx="16" cy="16" r="2" fill="currentColor" />
  </svg>
);

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Postman: PostmanIcon,
  Swagger: SwaggerIcon,
  Insomnia: InsomniaIcon,
  Jira: JiraIcon,
  Asana: AsanaIcon,
  TestRail: TestRailIcon,
};

function TiltCard({ name, color, delay }: { name: string; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: py * -14, ry: px * 14 });
  };

  const Icon = iconMap[name];

  return (
    <Reveal delay={delay}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setTilt({ rx: 0, ry: 0 });
        }}
        initial={{ opacity: 0, y: 24, scale: 0.92 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, delay: delay * 0.5, ease: "easeOut" }}
        animate={{
          rotateX: tilt.rx,
          rotateY: tilt.ry,
          y: hovered ? -6 : 0,
          scale: hovered ? 1.04 : 1,
        }}
        whileTap={{ scale: 0.97 }}
        style={{ transformStyle: "preserve-3d", perspective: 800 }}
        className="glass rounded-2xl p-8 flex flex-col items-center gap-4 cursor-default border border-white/5 hover:border-white/15 hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.08)] transition-colors"
      >
        <motion.div
          className="w-14 h-14 rounded-2xl flex items-center justify-center font-display font-bold text-lg"
          style={{ background: `${color}15`, color, boxShadow: `0 0 25px -8px ${color}` }}
          animate={{
            rotate: hovered ? [0, -8, 8, 0] : 0,
            scale: hovered ? 1.12 : 1,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {Icon ? <Icon size={26} /> : name.slice(0, 2)}
        </motion.div>
        <motion.span
          className="font-medium text-slate-200 text-sm"
          animate={{ opacity: hovered ? 1 : 0.85 }}
        >
          {name}
        </motion.span>
      </motion.div>
    </Reveal>
  );
}

export default function Tools() {
  return (
    <section id="tools" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="Tools" title={<>The everyday <span className="text-gradient">testing stack.</span></>} />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5">
          {tools.map((t, i) => (
            <TiltCard key={t.name} name={t.name} color={t.color} delay={i * 0.06} />
          ))}
        </div>
      </div>
    </section>
  );
}