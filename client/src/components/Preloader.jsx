/** Preloader splash screen */
import { motion } from "framer-motion";

export default function Preloader() {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-slate-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Animated logo / initials */}
      <motion.div
        className="text-5xl font-display font-bold gradient-text mb-6"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        SB
      </motion.div>

      {/* Loading bar */}
      <div className="w-48 h-0.5 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, #d4d4d8, #737373)",
          }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
      </div>

      <p className="mt-4 text-xs text-slate-500 tracking-[0.3em] uppercase">
        Loading Experience
      </p>
    </motion.div>
  );
}


