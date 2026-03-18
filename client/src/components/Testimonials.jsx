/** Testimonials auto-scrolling slider with glass cards */
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import FadeIn from "./FadeIn";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Rajesh Adhikari",
    role: "Director, Nepal Infrastructure Ltd.",
    quote: "Samir's engineering expertise and leadership transformed our most challenging project. His ability to solve complex problems under pressure is truly exceptional.",
    avatar: "RA",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "MD, Urban Developers Nepal",
    quote: "Working with Samir was a game-changer. His structural designs are not only technically sound but also innovative and cost-effective. Highly recommend.",
    avatar: "PS",
    rating: 5,
  },
  {
    id: 3,
    name: "Michael Torres",
    role: "ADB Project Consultant",
    quote: "Samir brought incredible dedication and professionalism to our ADB-funded roads project. His reporting, coordination, and technical quality stood out.",
    avatar: "MT",
    rating: 5,
  },
  {
    id: 4,
    name: "Anita Tamang",
    role: "Partner, BuildRight Engineering",
    quote: "Samir is the kind of engineer who thinks beyond specs. His entrepreneurial mindset and creative approach add real value to every collaboration.",
    avatar: "AT",
    rating: 5,
  },
  {
    id: 5,
    name: "Dr. Kumar Maharjan",
    role: "Professor, IOE Pulchowk Campus",
    quote: "I've mentored hundreds of engineers. Samir's drive, curiosity, and integrity make him one of the finest professionals I've seen emerge from our program.",
    avatar: "KM",
    rating: 5,
  },
];

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);

  const next = useCallback(() => {
    setDir(1);
    setIdx((i) => (i + 1) % TESTIMONIALS.length);
  }, []);

  const prev = useCallback(() => {
    setDir(-1);
    setIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  // Auto-advance
  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next]);

  const t = TESTIMONIALS[idx];

  const variants = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (d) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
  };

  return (
    <div className="section-pad bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full opacity-5 bg-blue-800 blur-[80px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <p className="text-xs text-blue-600 tracking-[0.35em] uppercase font-medium mb-3 text-center">
            08 / Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-16 text-center">
            What{" "}
            <span className="gradient-text">Others Say</span>
          </h2>
        </FadeIn>

        <div className="relative">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={t.id}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-3xl p-10 text-center relative"
            >
              {/* Large quote mark */}
              <div className="absolute top-6 left-8 text-7xl text-slate-500 font-serif leading-none select-none pointer-events-none">"</div>

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-blue-400 text-sm">*</span>
                ))}
              </div>

              <p className="text-slate-800 text-lg md:text-xl leading-relaxed mb-8 relative z-10">
                "{t.quote}"
              </p>

              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-2xl mb-1 border border-slate-200">
                  {t.avatar}
                </div>
                <p className="font-display font-semibold text-slate-900">{t.name}</p>
                <p className="text-slate-600 text-xs">{t.role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-600 hover:text-slate-900 hover:border-blue-500 transition-all"
              aria-label="Previous"
            >
              <FiChevronLeft />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i); }}
                  className={`rounded-full transition-all duration-300 ${i === idx ? "w-6 h-2 bg-blue-300" : "w-2 h-2 bg-slate-300 hover:bg-slate-400"}`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-600 hover:text-slate-900 hover:border-blue-500 transition-all"
              aria-label="Next"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}




