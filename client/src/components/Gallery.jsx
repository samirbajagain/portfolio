/** Gallery with real photo collection and lightbox */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import FadeIn from "./FadeIn";

const GALLERY = [
  { id: 1, title: "Waterfall Ridge", category: "Nepal", src: "/images/collection-01.jpg" },
  { id: 2, title: "MBC Summit Moment", category: "Annapurna", src: "/images/collection-02.jpg" },
  { id: 3, title: "Tower Bridge Day", category: "London", src: "/images/collection-03.jpg" },
  { id: 4, title: "Underground Frame", category: "London", src: "/images/collection-04.jpg" },
  { id: 5, title: "Tilicho Panorama", category: "Nepal", src: "/images/collection-05.jpg" },
  { id: 6, title: "Fallside Stop", category: "Nepal", src: "/images/collection-06.jpg" },
  { id: 7, title: "Flag at Tilicho", category: "Adventure", src: "/images/collection-07.jpg" },
  { id: 8, title: "Golden Hour Backdrop", category: "Collection", src: "/images/collection-08.jpg" },
  { id: 9, title: "Mountain Portrait", category: "Annapurna", src: "/images/collection-09.jpg" },
  { id: 10, title: "Glacier Energy", category: "Annapurna", src: "/images/collection-10.jpg" },
  { id: 11, title: "Waterfall Rest", category: "Nepal", src: "/images/collection-11.jpg" },
  { id: 12, title: "Fallside Stance", category: "Nepal", src: "/images/collection-12.jpg" },
  { id: 13, title: "Cold Altitude Portrait", category: "Annapurna", src: "/images/collection-13.jpg" },
  { id: 14, title: "Meditation Valley", category: "Annapurna", src: "/images/collection-14.jpg" },
  { id: 15, title: "Tilicho 4919m", category: "Milestone", src: "/images/collection-15.jpg" },
  { id: 16, title: "Summit Stance", category: "Annapurna", src: "/images/collection-16.jpg" },
  { id: 17, title: "Stone Spires Trail", category: "Travel", src: "/images/collection-17.jpg" },
  { id: 18, title: "Valley Outlook", category: "Nepal", src: "/images/collection-18.jpg" },
  { id: 19, title: "High Meadow", category: "Nepal", src: "/images/collection-19.jpg" },
  { id: 20, title: "Snow Pause", category: "Winter", src: "/images/collection-20.jpg" },
  { id: 21, title: "Himalayan Viewpoint", category: "Winter", src: "/images/collection-21.jpg" },
  { id: 22, title: "Bench Above Peaks", category: "Winter", src: "/images/collection-22.jpg" },
  { id: 23, title: "Trail Watch", category: "Winter", src: "/images/collection-23.jpg" },
  { id: 24, title: "Steel Bridge Frame", category: "Travel", src: "/images/collection-24.jpg" },
  { id: 25, title: "Portrait Classic", category: "Collection", src: "/images/collection-25.jpg" },
  { id: 26, title: "City Monument", category: "Collection", src: "/images/collection-26.jpg" },
];

function Lightbox({ items, index, onClose, onPrev, onNext }) {
  const item = items[index];

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative rounded-3xl overflow-hidden bg-slate-50 border border-blue-500/30 w-full max-w-4xl"
        initial={{ scale: 0.85, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 24 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.src}
          alt={item.title}
          className="w-full max-h-[78vh] object-contain bg-slate-50"
        />

        <div className="absolute left-4 bottom-4 glass rounded-xl px-4 py-2">
          <h3 className="text-blue-700 font-display text-lg leading-none">{item.title}</h3>
          <p className="text-xs text-slate-700 mt-1">{item.category}</p>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center text-slate-700 hover:text-slate-900"
          aria-label="Close"
        >
          <FiX />
        </button>

        {index > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full glass flex items-center justify-center text-slate-700 hover:text-slate-900"
            aria-label="Previous image"
          >
            <FiChevronLeft />
          </button>
        )}

        {index < items.length - 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full glass flex items-center justify-center text-slate-700 hover:text-slate-900"
            aria-label="Next image"
          >
            <FiChevronRight />
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function Gallery() {
  const [lightboxIdx, setLightboxIdx] = useState(null);

  return (
    <div className="section-pad bg-slate-50 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full opacity-5 bg-blue-500 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <p className="text-xs text-blue-600 tracking-[0.35em] uppercase font-medium mb-3">
            06 / Gallery
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4">
            Samir's <span className="gradient-text">Photo Collection</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mb-12">
            Full visual archive from London, Nepal adventures, mountain expeditions, and personal portraits.
          </p>
        </FadeIn>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {GALLERY.map((item, i) => (
            <FadeIn key={item.id} delay={i * 0.06}>
              <motion.div
                className="relative rounded-2xl overflow-hidden cursor-pointer group break-inside-avoid border border-blue-500/20 mb-5"
                whileHover={{ scale: 1.015 }}
                transition={{ type: "spring", stiffness: 230, damping: 20 }}
                onClick={() => setLightboxIdx(i)}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-auto object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute left-4 right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <h3 className="text-white font-display text-xl leading-tight">{item.title}</h3>
                  <p className="text-xs text-blue-100 tracking-wide uppercase mt-1">{item.category}</p>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox
            items={GALLERY}
            index={lightboxIdx}
            onClose={() => setLightboxIdx(null)}
            onPrev={() => setLightboxIdx((i) => Math.max(0, i - 1))}
            onNext={() => setLightboxIdx((i) => Math.min(GALLERY.length - 1, i + 1))}
          />
        )}
      </AnimatePresence>
    </div>
  );
}



