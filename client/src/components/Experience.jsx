/** Experience section - vertical timeline */
import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

const EXPERIENCES = [
  {
    period: "2022 - Present",
    role: "Founder & CEO",
    company: "NepBuild Construction",
    type: "Entrepreneurship",
    color: "from-blue-500 to-blue-700",
    icon: "CEO",
    bullets: [
      "Founded a technology-driven construction company focused on digital project delivery.",
      "Scaled to a team of 20+ professionals within 2 years, acquiring 15+ major contracts.",
      "Introduced BIM and digital workflows to streamline cost and quality control.",
    ],
  },
  {
    period: "2019 - 2022",
    role: "Senior Civil Engineer",
    company: "Nepal Infrastructure Group",
    type: "Engineering",
    color: "from-blue-700 to-blue-800",
    icon: "SE",
    bullets: [
      "Led structural design and project management for government-funded road & bridge projects.",
      "Managed teams of 50+ on-site workers, consistently delivering ahead of schedule.",
      "Authored feasibility and EIA reports for 3 major provincial projects.",
    ],
  },
  {
    period: "2017 - 2019",
    role: "Project Engineer",
    company: "Himalayan Builders Pvt. Ltd.",
    type: "Engineering",
    color: "from-blue-600 to-blue-800",
    icon: "PE",
    bullets: [
      "Supervised residential and commercial construction in Kathmandu Valley.",
      "Conducted soil testing, structural audits, and seismic retrofitting.",
      "Reduced project overruns by 18% through lean site management.",
    ],
  },
  {
    period: "2015 - 2017",
    role: "Graduate Engineer",
    company: "Urban Planning Department - Nepal",
    type: "Public Sector",
    color: "from-blue-500 to-blue-700",
    icon: "GE",
    bullets: [
      "Supported urban road design and drainage planning for Pokhara Metropolitan.",
      "Collaborated with international consultants on ADB-funded infrastructure projects.",
      "Prepared technical reports, BoQs, and design drawings.",
    ],
  },
];

export default function Experience() {
  return (
    <div className="section-pad bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-5 bg-blue-900 blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <p className="text-xs text-blue-600 tracking-[0.35em] uppercase font-medium mb-3">
            04 / Experience
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-16">
            Professional{" "}
            <span className="gradient-text">Journey</span>
          </h2>
        </FadeIn>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/60 via-blue-700/40 to-transparent hidden md:block" />

          <div className="flex flex-col gap-12">
            {EXPERIENCES.map((exp, i) => (
              <FadeIn key={exp.role} delay={i * 0.1}>
                <div className="flex gap-8 group">
                  {/* Timeline dot */}
                  <div className="relative hidden md:flex flex-col items-center">
                    <motion.div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${exp.color} flex items-center justify-center text-lg flex-shrink-0 shadow-lg`}
                      whileHover={{ scale: 1.25 }}
                    >
                      {exp.icon}
                    </motion.div>
                  </div>

                  {/* Card */}
                  <motion.div
                    className="glass rounded-2xl p-7 flex-1 group-hover:border-blue-200 transition-all duration-300"
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <p className="text-slate-500 text-xs font-mono mb-1">{exp.period}</p>
                        <h3 className="font-display font-bold text-slate-900 text-xl">{exp.role}</h3>
                        <p className="text-slate-600 text-sm mt-0.5">{exp.company}</p>
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium bg-gradient-to-r ${exp.color} text-slate-900`}>
                        {exp.type}
                      </span>
                    </div>

                    <ul className="flex flex-col gap-2">
                      {exp.bullets.map((b) => (
                        <li key={b} className="text-slate-600 text-sm leading-relaxed flex gap-2">
                          <span className="text-blue-400 mt-1.5 flex-shrink-0 text-xs">&gt;</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}



