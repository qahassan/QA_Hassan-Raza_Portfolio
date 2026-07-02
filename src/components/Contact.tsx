import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { FiLinkedin } from "react-icons/fi";
import { SectionHeading, Reveal } from "./Reveal";
import { profile } from "../data/content";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1400);
  };

  return (
    <section id="contact" className="relative py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="Contact"
          title={<>Let's build <span className="text-gradient">something reliable.</span></>}
          align="center"
        />

        <div className="grid md:grid-cols-2 gap-10">
          <Reveal delay={0.05} className="flex flex-col gap-6">
            {[
              { Icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
              { Icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone}` },
              { Icon: MapPin, label: "Location", value: profile.location, href: null },
              { Icon: FiLinkedin, label: "LinkedIn", value: profile.linkedin, href: `https://${profile.linkedin}` },
            ].map(({ Icon, label, value, href }) => (
              <div key={label} className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl glass flex items-center justify-center text-cyan-400 shrink-0">
                  <Icon size={18} />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">{label}</div>
                  {href ? (
                    <a href={href} data-cursor-hover className="text-slate-200 hover:text-cyan-400 transition-colors text-sm">
                      {value}
                    </a>
                  ) : (
                    <div className="text-slate-200 text-sm">{value}</div>
                  )}
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.15} className="glass rounded-3xl p-8">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-full flex flex-col items-center justify-center text-center gap-4"
              >
                <div className="text-4xl">✅</div>
                <h3 className="font-display text-xl font-semibold">Message sent!</h3>
                <p className="text-slate-400 text-sm">Thanks for reaching out — I'll reply within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-4">
                {(["name", "email"] as const).map((field) => (
                  <div key={field}>
                    <label className="text-xs uppercase tracking-wider text-slate-500 block mb-1.5 capitalize">
                      {field}
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      required
                      value={form[field]}
                      onChange={handle}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-400/60 transition-colors"
                      placeholder={field === "name" ? "Your name" : "your@email.com"}
                    />
                  </div>
                ))}
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-500 block mb-1.5">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={handle}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-400/60 transition-colors resize-none"
                    placeholder="Tell me about the role or project…"
                  />
                </div>
                <motion.button
                  type="submit"
                  data-cursor-hover
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 font-medium hover:shadow-[0_0_30px_-5px_rgba(79,70,229,0.9)] transition-shadow"
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : (
                    <>
                      <Send size={16} /> Send Message
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
