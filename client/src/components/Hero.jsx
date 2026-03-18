/** Premium Hero section with royal horse frames and luxury centerpiece */
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiArrowDown } from "react-icons/fi";
import { HiArrowRight } from "react-icons/hi";
import { publicAsset } from "../utils/assetPath";

/* Tiny particle canvas background */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    let raf;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    const N = Math.min(90, Math.floor((W * H) / 13000));
    const particles = Array.from({ length: N }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.25,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      alpha: Math.random() * 0.45 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(223,186,120,${p.alpha})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-35"
    />
  );
}

const WORDS = [
  "Civil Engineer",
  "Entrepreneur",
  "Creative Visionary",
  "Infrastructure Strategist",
  "Legacy Builder",
];

function TypeWriter() {
  const ref = useRef(null);

  useEffect(() => {
    let wordIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let timer;

    const tick = () => {
      const word = WORDS[wordIdx % WORDS.length];
      if (ref.current) {
        ref.current.textContent = deleting
          ? word.slice(0, charIdx--)
          : word.slice(0, charIdx++);
      }

      let speed = deleting ? 52 : 88;
      if (!deleting && charIdx > word.length + 1) {
        deleting = true;
        speed = 1400;
      } else if (deleting && charIdx <= 0) {
        deleting = false;
        wordIdx++;
        speed = 280;
      }
      timer = setTimeout(tick, speed);
    };

    timer = setTimeout(tick, 550);
    return () => clearTimeout(timer);
  }, []);

  return <span className="gradient-text" ref={ref} />;
}

export default function Hero() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-50 noise">
      {/* Antique atmosphere */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_12%,rgba(224,185,117,0.18),transparent_34%),radial-gradient(circle_at_80%_82%,rgba(129,95,47,0.16),transparent_37%)]" />
      <div className="absolute -top-24 -left-16 w-[520px] h-[360px] rounded-full opacity-25 bg-blue-700 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-16 w-[560px] h-[380px] rounded-full opacity-25 bg-blue-500 blur-[130px] pointer-events-none" />

      <ParticleCanvas />

      {/* Fine grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(212,175,110,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,110,0.35) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Left Horse Frame - Full Height */}
      <motion.div
        className="absolute left-0 top-16 h-[calc(100vh-200px)] pointer-events-none z-[2] flex items-center"
        initial={{ opacity: 0, x: -120 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.1 }}
      >
        <img
          src={publicAsset("images/horse-left.png")}
          alt="Royal Horse Left"
          className="w-56 sm:w-80 md:w-96 lg:w-[520px] h-auto drop-shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
          style={{ filter: "brightness(1.1) contrast(1.08)", objectFit: "contain" }}
        />
      </motion.div>

      {/* Right Horse Frame - Full Height */}
      <motion.div
        className="absolute right-0 top-16 h-[calc(100vh-200px)] pointer-events-none z-[2] flex items-center"
        initial={{ opacity: 0, x: 120 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.15 }}
      >
        <img
          src={publicAsset("images/horse-right.png")}
          alt="Royal Horse Right"
          className="w-56 sm:w-80 md:w-96 lg:w-[520px] h-auto drop-shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
          style={{ filter: "brightness(1.1) contrast(1.08)", objectFit: "contain" }}
        />
      </motion.div>

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.div
          className="inline-flex items-center gap-2 glass px-5 py-2.5 rounded-full text-xs text-blue-600 font-semibold tracking-[0.28em] uppercase mb-8 backdrop-blur-xl border border-blue-400/30"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-300 animate-pulse shadow-lg shadow-blue-400/50" />
          Private Portfolio - 2026 Curated Edition
        </motion.div>

        <motion.div
          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 mb-10 border border-blue-500/50 bg-gradient-to-r from-slate-100/80 to-slate-50/80 text-blue-700 text-xs tracking-[0.24em] uppercase font-semibold backdrop-blur-md shadow-lg shadow-blue-500/10"
          initial={{ opacity: 0, y: 12, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <span className="w-2 h-2 rounded-full bg-gradient-to-br from-blue-500 to-blue-400" />
          London Headquarters - Global Reach
        </motion.div>

        <motion.h1
          className="text-5xl sm:text-7xl lg:text-8xl font-display font-bold text-slate-900 leading-[1.04] tracking-tight mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.5 }}
        >
          Samir <span className="gradient-text text-glow">Bajagain</span>
        </motion.h1>

        <motion.p
          className="text-xl sm:text-2xl text-slate-700 font-body mb-8 h-9 tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.65 }}
        >
          <TypeWriter />
          <span className="ml-1 inline-block w-0.5 h-7 bg-gradient-to-b from-blue-400 to-blue-300 animate-pulse align-middle" />
        </motion.p>

        <motion.p
          className="text-lg sm:text-xl text-slate-600 font-body italic mb-12 max-w-2xl mx-auto leading-relaxed tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
        >
          "Engineering mastercraft, entrepreneurial precision, and timeless aesthetics - delivered with a legacy mindset."
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <a href="#projects" className="btn-primary group shadow-xl hover:shadow-2xl transition-all hover:scale-105">
            View Signature Works
            <HiArrowRight className="group-hover:translate-x-2 transition-transform" />
          </a>
          <a href="#about" className="btn-outline hover:shadow-lg transition-all hover:scale-105">
            Read The Legacy
          </a>
        </motion.div>

        <motion.div
          className="mt-24 flex flex-wrap justify-center gap-12 sm:gap-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          {[
            { value: "50+", label: "Projects" },
            { value: "8+", label: "Years Of Practice" },
            { value: "3+", label: "Businesses" },
            { value: "15+", label: "Countries Visited" },
          ].map((s, idx) => (
            <motion.div
              key={s.label}
              className="flex flex-col gap-2 group hover:scale-110 transition-transform"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.15 + idx * 0.08 }}
            >
              <span className="text-4xl sm:text-5xl font-display font-bold gradient-text">{s.value}</span>
              <span className="text-xs text-slate-600 tracking-[0.2em] uppercase font-semibold">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600 text-xs tracking-[0.2em] uppercase z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
      >
        <FiArrowDown className="text-lg text-blue-600" />
        Scroll
      </motion.a>
    </div>
  );
}
