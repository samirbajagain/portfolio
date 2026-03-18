/** Premium glass navbar with scroll detection and active-section tracking */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Journeys", href: "#journeys" },
  { label: "Gallery", href: "#gallery" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section spy
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass py-3 shadow-lg shadow-black/20" : "py-5 bg-transparent"
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <span className="text-2xl font-display font-bold gradient-text text-glow">SB</span>
            <span className="hidden sm:block text-sm text-slate-600 font-medium group-hover:text-slate-800 transition-colors">
              Samir Bajagain
            </span>
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link ${active === link.href.replace("#", "") ? "active text-slate-900" : ""}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <span className="px-4 py-2 rounded-full border border-blue-500/45 bg-blue-500/12 text-blue-700 text-[11px] tracking-[0.2em] uppercase font-semibold">
              Legacy Collection
            </span>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="block w-6 h-0.5 bg-slate-700 rounded-full origin-center"
                animate={
                  open
                    ? i === 0
                      ? { rotate: 45, y: 8 }
                      : i === 1
                      ? { opacity: 0 }
                      : { rotate: -45, y: -8 }
                    : { rotate: 0, y: 0, opacity: 1 }
                }
                transition={{ duration: 0.25 }}
              />
            ))}
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 glass flex flex-col items-center justify-center gap-8 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="text-2xl font-display font-semibold text-slate-800 hover:gradient-text transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.div
              className="mt-4 px-4 py-2 rounded-full border border-blue-500/45 bg-blue-500/12 text-blue-700 text-xs tracking-[0.18em] uppercase font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Legacy Collection
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


