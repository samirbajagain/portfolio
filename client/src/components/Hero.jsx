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

      {/* Left Horse Frame - Desktop/tablet side decoration */}
      <motion.div
        className=\"hidden sm:flex absolute left-0 lg:-left-8 xl:-left-12 -bottom-6 sm:bottom-0 md:bottom-1 lg:bottom-6 h-[28vh] sm:h-[32vh] md:h-[40vh] lg:h-[45vh] pointer-events-none z-0 items-end justify-start\"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
        style={{ willChange: "transform, opacity" }}
      >
        <img
          src={publicAsset("images/horse-left.png")}
          alt="Royal Horse Left"
          className="w-36 md:w-56 lg:w-80 xl:w-96 2xl:w-[420px] h-auto drop-shadow-[0_50px_120px_rgba(0,0,0,0.62)] object-contain"
          style={{ filter: "brightness(1.1) contrast(1.08)", willChange: "transform" }}
        />
      </motion.div>

      {/* Right Horse Frame - Desktop/tablet side decoration */}
      <motion.div
        className=\"hidden sm:flex absolute right-0 lg:-right-8 xl:-right-12 -bottom-6 sm:bottom-0 md:bottom-1 lg:bottom-6 h-[28vh] sm:h-[32vh] md:h-[40vh] lg:h-[45vh] pointer-events-none z-0 items-end justify-end\"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
        style={{ willChange: "transform, opacity" }}
      >
        <img
          src={publicAsset("images/horse-right.png")}
          alt="Royal Horse Right"
          className="w-36 md:w-56 lg:w-80 xl:w-96 2xl:w-[420px] h-auto drop-shadow-[0_50px_120px_rgba(0,0,0,0.62)] object-contain"
          style={{ filter: "brightness(1.1) contrast(1.08)", willChange: "transform" }}
        />
      </motion.div>

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto pb-14 sm:pb-12">
        {/* Top Header: SB Logo + Badges - Organized Horizontally */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
          style={{ willChange: "transform, opacity" }}
        >
          {/* SB Logo */}
          <div className="glass px-4 py-2.5 rounded-full flex items-center gap-2 border border-blue-400/30">
            <span className="text-lg sm:text-xl font-display font-bold gradient-text">SB</span>
            <span className="text-xs text-slate-600 font-medium hidden xs:block">Samir Bajagain</span>
          </div>

          {/* Divider on desktop */}
          <div className="hidden sm:block w-1 h-6 bg-gradient-to-b from-transparent via-blue-400/50 to-transparent" />

          {/* Private Portfolio Badge */}
          <motion.div
            className="inline-flex items-center gap-2 glass px-4 py-2.5 rounded-full text-[10px] xs:text-xs text-blue-600 font-semibold tracking-[0.25em] uppercase backdrop-blur-xl border border-blue-400/30"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            style={{ willChange: "transform, opacity" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-blue-300 animate-pulse" />
            <span>Portfolio 2026</span>
          </motion.div>

          {/* Divider on desktop */}
          <div className="hidden sm:block w-1 h-6 bg-gradient-to-b from-transparent via-blue-400/50 to-transparent" />

          {/* London Headquarters Badge */}
          <motion.div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 border border-blue-500/50 bg-gradient-to-r from-slate-100/80 to-slate-50/80 text-blue-700 text-[10px] xs:text-xs tracking-[0.24em] uppercase font-semibold backdrop-blur-md shadow-lg shadow-blue-500/10"
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, delay: 0.28, ease: "easeOut" }}
            style={{ willChange: "transform, opacity" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-blue-500 to-blue-400" />
            <span>Global Reach</span>
          </motion.div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          className="text-4xl xs:text-5xl sm:text-7xl lg:text-8xl font-display font-bold text-slate-900 leading-[1.04] tracking-tight mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
          style={{ willChange: "transform, opacity" }}
        >
          Samir <span className="gradient-text text-glow">Bajagain</span>
        </motion.h1>

        {/* Mobile horses: directly below heading, left and right, no overlap */}
        <motion.div
          className="sm:hidden w-full max-w-[320px] mx-auto mb-5 -mt-2 flex items-end justify-between px-1 pointer-events-none"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.45, ease: "easeOut" }}
          style={{ willChange: "transform, opacity" }}
        >
          <img
            src={publicAsset("images/horse-left.png")}
            alt="Royal Horse Left"
            className="w-20 xs:w-24 h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
            style={{ filter: "brightness(1.1) contrast(1.08)", willChange: "transform" }}
          />
          <img
            src={publicAsset("images/horse-right.png")}
            alt="Royal Horse Right"
            className="w-20 xs:w-24 h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
            style={{ filter: "brightness(1.1) contrast(1.08)", willChange: "transform" }}
          />
        </motion.div>

        {/* TypeWriter */}
        <motion.p
          className="text-lg xs:text-xl sm:text-2xl text-slate-700 font-body mb-8 h-8 xs:h-9 tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.45, ease: "easeOut" }}
          style={{ willChange: "opacity" }}
        >
          <TypeWriter />
          <span className="ml-1 inline-block w-0.5 h-7 bg-gradient-to-b from-blue-400 to-blue-300 animate-pulse align-middle" />
        </motion.p>

        <motion.p
          className="text-lg sm:text-xl text-slate-600 font-body italic mb-12 max-w-2xl mx-auto leading-relaxed tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
          style={{ willChange: "transform, opacity" }}
        >
          "Engineering mastercraft, entrepreneurial precision, and timeless aesthetics - delivered with a legacy mindset."
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6, ease: "easeOut" }}
          style={{ willChange: "transform, opacity" }}
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
          transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
          style={{ willChange: "transform, opacity" }}
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
        className="hidden sm:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1 text-slate-600 text-xs tracking-[0.2em] uppercase z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
      >
        <FiArrowDown className="text-lg text-blue-600" />
        Scroll
      </motion.a>
    </div>
  );
}
