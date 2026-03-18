/** Services section with hover cards */
import { motion } from "framer-motion";
import FadeIn from "./FadeIn";
import { FiArrowRight } from "react-icons/fi";

const SERVICES = [
  {
    icon: "SE",
    title: "Structural Engineering",
    desc: "From concept to completion - seismic-resistant structural design, analysis, and peer review for residential, commercial, and infrastructure projects.",
    features: ["Structural Analysis", "Seismic Assessment", "Foundation Design", "Construction Drawings"],
    color: "from-blue-500/10 to-blue-700/10",
    accent: "text-blue-600",
  },
  {
    icon: "PM",
    title: "Project Management & Consulting",
    desc: "End-to-end project management consultancy that keeps your builds on time, on budget, and above specification.",
    features: ["PMC Services", "Cost Estimation", "Quality Control", "Tender Documentation"],
    color: "from-blue-700/10 to-blue-700/10",
    accent: "text-blue-600",
  },
  {
    icon: "BD",
    title: "Business Development",
    desc: "Strategic growth consulting for construction, real estate, and infrastructure companies looking to scale, modernize, or enter new markets.",
    features: ["Market Research", "Business Strategy", "Partnerships", "Growth Planning"],
    color: "from-blue-600/10 to-blue-800/10",
    accent: "text-blue-600",
  },
  {
    icon: "FS",
    title: "Feasibility & EIA Studies",
    desc: "Comprehensive feasibility analysis and Environmental Impact Assessments for government and private-sector infrastructure projects.",
    features: ["Feasibility Reports", "EIA / IEE", "Risk Analysis", "Site Surveys"],
    color: "from-blue-500/10 to-blue-700/10",
    accent: "text-blue-400",
  },
  {
    icon: "VC",
    title: "Visual Content Creation",
    desc: "Professional photography and videography for construction firms, travel brands, and real estate - telling your story beautifully.",
    features: ["Aerial / Drone", "Time-lapse", "Brand Photography", "Video Production"],
    color: "from-blue-600/10 to-blue-800/10",
    accent: "text-blue-600",
  },
  {
    icon: "TM",
    title: "Training & Mentorship",
    desc: "Workshops and one-on-one mentoring for aspiring civil engineers, helping them fast-track their technical and professional growth.",
    features: ["Technical Training", "Career Coaching", "Workshops", "Curriculum Design"],
    color: "from-blue-700/10 to-blue-900/10",
    accent: "text-blue-600",
  },
];

export default function Services() {
  return (
    <div className="section-pad bg-slate-50 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-5 bg-blue-900 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <p className="text-xs text-blue-600 tracking-[0.35em] uppercase font-medium mb-3">
            07 / Services
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4">
            How I Can{" "}
            <span className="gradient-text">Help You</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mb-14">
            World-class engineering, business, and creative services - delivered with professionalism, precision, and passion.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((svc, i) => (
            <FadeIn key={svc.title} delay={i * 0.08}>
              <motion.div
                className={`glass rounded-2xl p-7 flex flex-col gap-5 group cursor-default relative overflow-hidden h-full`}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                {/* BG gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${svc.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none`} />

                <span className="text-4xl relative z-10">{svc.icon}</span>

                <div className="relative z-10">
                  <h3 className="font-display font-bold text-slate-900 text-lg mb-2">{svc.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{svc.desc}</p>
                </div>

                <ul className="relative z-10 grid grid-cols-2 gap-y-1.5 gap-x-2 mt-auto">
                  {svc.features.map((f) => (
                    <li key={f} className={`text-xs ${svc.accent} flex items-center gap-1.5`}>
                      <span className="text-[8px]">&gt;</span> {f}
                    </li>
                  ))}
                </ul>

                <a href="#contact" className={`relative z-10 flex items-center gap-1 text-xs font-medium ${svc.accent} group-hover:gap-2 transition-all`}>
                  Get in Touch <FiArrowRight />
                </a>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}



