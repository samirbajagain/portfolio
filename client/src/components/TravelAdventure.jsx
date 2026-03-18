import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

const VISITED_PLACES = [
  "Mugu",
  "Tilicho Lake",
  "Manang",
  "Mardi Himal",
  "Pokhara",
  "Damauli",
  "Lamjung",
  "Gosaikunda",
  "Mahabharat",
  "Kalinchowk",
  "Jiri",
  "Tatopani",
  "Damak",
  "Itahari",
  "Birtamod",
  "Janakpur",
  "Parsa",
  "Bara",
  "Birgunj",
  "Tanahun",
  "Chitwan National Park",
];

export default function TravelAdventure() {
  return (
    <div className="section-pad bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[420px] h-[320px] rounded-full opacity-10 bg-blue-500 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[460px] h-[360px] rounded-full opacity-10 bg-blue-800 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <p className="text-xs text-blue-600 tracking-[0.35em] uppercase font-medium mb-3">
            05 / Journeys & Adventure
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4">
            The Places He Has <span className="gradient-text">Lived Through</span>
          </h2>
          <p className="text-slate-700 max-w-3xl leading-relaxed mb-10">
            Samir Bajagain is currently based in <span className="text-blue-600 font-semibold">London, UK</span>,
            while carrying a deep connection to Nepal through his travel, field work, and adventure-driven life.
          </p>
        </FadeIn>

        <div className="grid xl:grid-cols-2 gap-8">
          <FadeIn delay={0.08}>
            <motion.div
              className="glass rounded-3xl p-5 md:p-6 h-full"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 240, damping: 18 }}
            >
              <div className="overflow-hidden rounded-2xl border border-blue-500/30 mb-6">
                <img
                  src="/images/travel.jpeg"
                  alt="Travelled places in Nepal map"
                  loading="lazy"
                  className="w-full h-auto object-cover"
                />
              </div>

              <h3 className="text-2xl font-display font-semibold text-blue-700 mb-3">
                Travelled Places in Nepal
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed mb-5">
                These are the locations Samir has visited across Nepal, reflecting his love for exploration,
                terrain learning, and culture-first travel.
              </p>

              <div className="flex flex-wrap gap-2">
                {VISITED_PLACES.map((place) => (
                  <span
                    key={place}
                    className="text-xs px-3 py-1.5 rounded-full bg-slate-100/90 border border-blue-500/25 text-slate-800"
                  >
                    {place}
                  </span>
                ))}
              </div>
            </motion.div>
          </FadeIn>

          <FadeIn delay={0.14}>
            <motion.div
              className="glass rounded-3xl p-5 md:p-6 h-full flex flex-col"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 240, damping: 18 }}
            >
              <div className="overflow-hidden rounded-2xl border border-blue-500/30 mb-6">
                <img
                  src="/images/bungeeeee.jpeg"
                  alt="Samir Bajagain bungee jump moment"
                  loading="lazy"
                  className="w-full h-auto object-cover"
                />
              </div>

              <h3 className="text-2xl font-display font-semibold text-blue-700 mb-3">
                Signature Bungee Experience
              </h3>

              <p className="text-slate-700 text-sm leading-relaxed mb-4">
                This bungee jump captures Samir's personality in one frame: decisive, fearless, and fully committed.
                It is not only an adventure photo, but also a symbol of how he approaches life and business -
                with calculated risk, courage, and trust in preparation.
              </p>

              <div className="grid grid-cols-2 gap-3 mt-auto">
                <div className="rounded-xl bg-slate-100/80 border border-blue-500/20 p-3">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Mindset</p>
                  <p className="text-sm text-blue-700 font-medium">Bold & Focused</p>
                </div>
                <div className="rounded-xl bg-slate-100/80 border border-blue-500/20 p-3">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Energy</p>
                  <p className="text-sm text-blue-700 font-medium">Adventure Driven</p>
                </div>
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}

