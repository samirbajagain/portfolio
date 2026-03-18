/** Skills section with animated progress bars and category tabs */
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "./FadeIn";

const CATEGORIES = [
  {
    id: "engineering",
    label: "Engineering",
    icon: "ENG",
    skills: [
      { name: "Structural Design", level: 92 },
      { name: "AutoCAD / Civil 3D", level: 90 },
      { name: "Project Management", level: 88 },
      { name: "Site Supervision", level: 95 },
      { name: "Geotechnical Analysis", level: 80 },
      { name: "Construction Estimation", level: 85 },
    ],
  },
  {
    id: "business",
    label: "Business & Leadership",
    icon: "BIZ",
    skills: [
      { name: "Strategic Planning", level: 90 },
      { name: "Business Development", level: 87 },
      { name: "Team Leadership", level: 93 },
      { name: "Financial Management", level: 78 },
      { name: "Negotiation", level: 85 },
      { name: "Marketing & Branding", level: 75 },
    ],
  },
  {
    id: "creative",
    label: "Creative Skills",
    icon: "CRE",
    skills: [
      { name: "Photography", level: 88 },
      { name: "Video Production", level: 82 },
      { name: "Adobe Lightroom / Premiere", level: 80 },
      { name: "Storytelling", level: 90 },
      { name: "Visual Direction", level: 78 },
      { name: "Drone Piloting", level: 70 },
    ],
  },
];

function SkillBar({ name, level, visible }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-slate-700 font-medium">{name}</span>
        <span className="text-xs text-blue-600 font-semibold">{level}%</span>
      </div>
      <div className="progress-bar">
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: visible ? `${level}%` : 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const [active, setActive] = useState("engineering");
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const current = CATEGORIES.find((c) => c.id === active);

  return (
    <div ref={ref} className="section-pad bg-gradient-to-b from-slate-100 to-slate-50 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full opacity-5 bg-blue-500 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <p className="text-xs text-blue-600 tracking-[0.35em] uppercase font-medium mb-3">
            02 / Skills
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-12">
            Expertise &{" "}
            <span className="gradient-text">Capabilities</span>
          </h2>
        </FadeIn>

        {/* Tab switcher */}
        <FadeIn delay={0.1}>
          <div className="flex flex-wrap gap-3 mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  active === cat.id
                    ? "btn-primary"
                    : "glass text-slate-600 hover:text-slate-800"
                }`}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Skills grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="grid sm:grid-cols-2 gap-x-16 gap-y-6"
          >
            {current.skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
              >
                <SkillBar name={skill.name} level={skill.level} visible={visible} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Extra tech tags */}
        <FadeIn delay={0.3}>
          <div className="mt-16 flex flex-wrap gap-3">
            {[
              "AutoCAD", "Civil 3D", "SAP2000", "ETABS", "MS Project", "Revit",
              "Adobe Suite", "Excel / GSheets", "Leadership", "Communication",
              "Problem Solving", "Innovation",
            ].map((tag) => (
              <span
                key={tag}
                className="glass px-3 py-1.5 rounded-full text-xs text-slate-600 border border-slate-200 hover:border-blue-500/40 hover:text-slate-800 transition-all cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}




