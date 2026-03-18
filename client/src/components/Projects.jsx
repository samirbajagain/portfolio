/** Projects section with filterable grid and modal lightbox */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiExternalLink } from "react-icons/fi";
import FadeIn from "./FadeIn";

const FILTERS = ["All", "Engineering", "Business", "Creative"];

const PROJECTS = [
  {
    id: 1,
    title: "Himalayan Bridge Project",
    category: "Engineering",
    tag: "Infrastructure",
    description: "Design and supervision of a 120m suspension bridge connecting two remote villages in Sindhupalchok district, reducing travel time by 4 hours.",
    tech: ["AutoCAD", "SAP2000", "Project Mgmt"],
    color: "from-blue-500/20 to-blue-700/20",
    icon: "BR",
  },
  {
    id: 2,
    title: "Residential Complex - Kathmandu",
    category: "Engineering",
    tag: "Structural Design",
    description: "Full structural design and construction management for a G+5 earthquake-resistant residential building in Baneshwor, Kathmandu.",
    tech: ["ETABS", "Civil 3D", "Revit"],
    color: "from-blue-700/20 to-blue-900/20",
    icon: "RC",
  },
  {
    id: 3,
    title: "Road Network Rehabilitation",
    category: "Engineering",
    tag: "Roads & Transport",
    description: "Rehabilitation of 35km of rural road network in Karnali Province, improving connectivity for 12,000+ residents.",
    tech: ["Civil 3D", "AutoCAD", "SAP"],
    color: "from-blue-700/20 to-blue-800/20",
    icon: "RN",
  },
  {
    id: 4,
    title: "NepBuild Construction",
    category: "Business",
    tag: "Startup",
    description: "Co-founded NepBuild - a technology-forward construction firm disrupting Nepal's traditional building industry with digital project management.",
    tech: ["Strategy", "Branding", "Operations"],
    color: "from-blue-700/20 to-blue-700/20",
    icon: "NB",
  },
  {
    id: 5,
    title: "Engineering Consulting Practice",
    category: "Business",
    tag: "Consulting",
    description: "Built a thriving independent consulting firm offering structural assessment, feasibility studies, and PMC services to private and government clients.",
    tech: ["Consulting", "Leadership", "BD"],
    color: "from-blue-600/20 to-blue-800/20",
    icon: "EC",
  },
  {
    id: 6,
    title: "Himalayan Visual Journey",
    category: "Creative",
    tag: "Photography",
    description: "A curated photo series documenting life, landscapes, and culture across the Himalayas - exhibited in Kathmandu and shared with 50K+ followers online.",
    tech: ["Lightroom", "Photography", "Storytelling"],
    color: "from-blue-600/20 to-blue-700/20",
    icon: "PJ",
  },
  {
    id: 7,
    title: "Nepal Travels Documentary",
    category: "Creative",
    tag: "Videography",
    description: "Produced a 25-minute travel documentary showcasing hidden gems of Nepal, earning 100K+ views on YouTube.",
    tech: ["Premiere Pro", "Drone", "Storytelling"],
    color: "from-blue-500/20 to-blue-800/20",
    icon: "VD",
  },
  {
    id: 8,
    title: "Tech-Enabled Property Platform",
    category: "Business",
    tag: "PropTech",
    description: "Conceptualized and launched an early-stage property listing platform bridging buyers, sellers, and engineers in Nepal's growing real estate market.",
    tech: ["Product", "Strategy", "Marketing"],
    color: "from-blue-500/20 to-blue-600/20",
    icon: "PT",
  },
];

function ProjectCard({ project, onClick }) {
  return (
    <motion.div
      className={`glass rounded-2xl p-6 flex flex-col gap-4 cursor-pointer group relative overflow-hidden`}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      onClick={() => onClick(project)}
    >
      {/* BG gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

      <div className="relative z-10 flex items-start justify-between">
        <span className="text-4xl">{project.icon}</span>
        <span className="text-xs glass px-2.5 py-1 rounded-full text-blue-600 border border-blue-500/20">
          {project.tag}
        </span>
      </div>

      <div className="relative z-10">
        <h3 className="font-display font-bold text-slate-900 text-lg mb-2 group-hover:gradient-text transition-all">
          {project.title}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
          {project.description}
        </p>
      </div>

      <div className="relative z-10 flex flex-wrap gap-2 mt-auto pt-2">
        {project.tech.map((t) => (
          <span key={t} className="text-xs text-slate-500 bg-slate-100/80 px-2 py-0.5 rounded-md">
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function Modal({ project, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative glass rounded-3xl p-8 max-w-lg w-full z-10 max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.85, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 40 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full glass flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors"
          aria-label="Close"
        >
          <FiX />
        </button>

        <span className="text-5xl mb-4 block">{project.icon}</span>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs glass px-2.5 py-1 rounded-full text-blue-600 border border-blue-500/20">
            {project.tag}
          </span>
          <span className="text-xs text-slate-500">{project.category}</span>
        </div>
        <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">{project.title}</h2>
        <p className="text-slate-700 leading-relaxed mb-6">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t) => (
            <span key={t} className="text-xs text-slate-600 bg-slate-100/80 px-3 py-1 rounded-full">
              {t}
            </span>
          ))}
        </div>

        <a href="#contact" onClick={onClose} className="btn-primary inline-flex">
          Discuss This Project <FiExternalLink />
        </a>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const visible = PROJECTS.filter((p) => filter === "All" || p.category === filter);

  return (
    <div className="section-pad bg-slate-50 relative overflow-hidden">
      <div className="absolute top-20 right-20 w-[350px] h-[350px] rounded-full opacity-5 bg-blue-500 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <p className="text-xs text-blue-600 tracking-[0.35em] uppercase font-medium mb-3">
            03 / Projects
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4">
            Featured{" "}
            <span className="gradient-text">Work</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mb-12">
            A curated selection of engineering achievements, business ventures, and creative projects that define Samir's impact.
          </p>
        </FadeIn>

        {/* Filter pills */}
        <FadeIn delay={0.1}>
          <div className="flex flex-wrap gap-3 mb-10">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === f ? "btn-primary py-1.5 px-4 text-sm" : "glass text-slate-600 hover:text-slate-800"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence>
            {visible.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
              >
                <ProjectCard project={project} onClick={setSelected} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && <Modal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}



