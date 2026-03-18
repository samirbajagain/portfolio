/** About section with expanded legacy narrative and premium visual composition */
import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

const HIGHLIGHTS = [
  { icon: "CE", title: "Civil Engineering", desc: "Advanced structural planning, resilient infrastructure design, and technical delivery across Nepal and international contexts." },
  { icon: "EN", title: "Entrepreneurship", desc: "Built and led ventures that merge engineering discipline with practical innovation and scalable execution." },
  { icon: "CR", title: "Creative Direction", desc: "Visual storytelling through photography and film with a focus on atmosphere, composition, and meaning." },
  { icon: "GL", title: "Global Perspective", desc: "Field exposure across multiple countries has shaped a disciplined, adaptive, and globally fluent leadership style." },
];

const LEGACY_PILLARS = [
  "Precision in planning and execution",
  "Calm leadership under complexity",
  "Elegant solutions to hard problems",
  "Long-term value over short-term noise",
];

export default function About() {
  return (
    <div className="section-pad bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[520px] h-[420px] rounded-full opacity-15 bg-blue-700 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <p className="text-xs text-blue-600 tracking-[0.35em] uppercase font-semibold mb-3">
            01 / About Me
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">
            The Story Behind The <span className="gradient-text">Vision</span>
          </h2>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-16 items-start mt-12">
          <FadeIn delay={0.08}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl gradient-border opacity-45" />
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] glass">
                <img
                  src="/images/samir-luxury.png"
                  alt="Samir Bajagain profile portrait"
                  loading="lazy"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/46 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                  <span className="px-3 py-1.5 rounded-full text-[11px] tracking-[0.2em] uppercase bg-slate-100/80 backdrop-blur-sm border border-blue-500/30 text-blue-700 font-semibold">
                    Official Portrait
                  </span>
                  <span className="text-xs text-slate-900 font-medium">Samir Bajagain</span>
                </div>
              </div>
            </div>
          </FadeIn>

          <div className="flex flex-col gap-7">
            <FadeIn delay={0.14}>
              <p className="text-lg text-slate-700 leading-relaxed">
                Samir Bajagain is a <span className="text-blue-600 font-semibold">Civil Engineer, entrepreneur, and creative strategist</span>
                {" "}whose journey bridges three demanding worlds: technical excellence, disciplined business leadership, and high-aesthetic storytelling.
                He is known for unifying structure and imagination into work that feels both precise and human.
              </p>
            </FadeIn>

            <FadeIn delay={0.18}>
              <p className="text-slate-600 leading-relaxed">
                Over more than eight years, Samir has delivered infrastructure and construction outcomes that required rigorous planning,
                stakeholder alignment, financial control, and field-level accountability. His professional signature is consistency under pressure:
                the ability to lead teams, resolve complexity, and maintain quality when timelines tighten and variables shift.
              </p>
            </FadeIn>

            <FadeIn delay={0.22}>
              <p className="text-slate-600 leading-relaxed">
                In parallel, his entrepreneurial work has proven that engineering thinking can become a strategic advantage in business.
                By building systems, standards, and execution rhythms from the ground up, he has transformed ambitious concepts into operating ventures
                with measurable impact. This mindset extends into his creative practice, where image and motion are treated not as decoration,
                but as narrative tools for memory, meaning, and identity.
              </p>
            </FadeIn>

            <FadeIn delay={0.26}>
              <p className="text-slate-600 leading-relaxed">
                Whether at a project site, in a boardroom, or behind the lens, Samir operates with the same principle:
                do the work with depth, do it with elegance, and leave behind something that lasts.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="glass-light rounded-2xl p-5 border border-blue-500/30">
                <p className="text-xs uppercase tracking-[0.24em] text-blue-600 mb-2">Legacy Note</p>
                <p className="text-slate-700 leading-relaxed">
                  "My goal is not simply to complete projects. My goal is to craft outcomes that endure - technically, commercially, and culturally."
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.34}>
              <div className="grid sm:grid-cols-2 gap-3">
                {LEGACY_PILLARS.map((item) => (
                  <div key={item} className="glass rounded-xl px-4 py-3 text-sm text-slate-700 border border-blue-500/25">
                    {item}
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.38}>
              <div className="flex flex-wrap gap-3 pt-2">
                <a href="#projects" className="btn-primary">Explore Projects</a>
                <a href="/cv.pdf" download className="btn-outline">Download CV</a>
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-24">
          {HIGHLIGHTS.map((h, i) => (
            <FadeIn key={h.title} delay={i * 0.08}>
              <motion.div
                className="glass rounded-2xl p-6 flex flex-col gap-3 group cursor-default"
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <span className="text-3xl font-display text-blue-700">{h.icon}</span>
                <h3 className="font-display font-semibold text-slate-900 text-sm">{h.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{h.desc}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
