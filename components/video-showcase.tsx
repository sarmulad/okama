"use client";

import { motion } from "framer-motion";

export default function VideoShowcase() {
  return (
    <section className="relative h-[70vh] md:h-screenflex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <iframe
          className="absolute top-0 left-0 w-[177.77vh] h-full md:w-full md:h-full"
          src="https://www.youtube.com/embed/SSe0EvueQmM?autoplay=1&mute=1&loop=1&playlist=SSe0EvueQmM&controls=0&modestbranding=1&rel=0"
          title="OKAMA Sacred Winds Video Showcase"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </div>

      {/* Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

      {/* Content Overlay */}
      <div className="relative z-10 text-white max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-wider">
            SACRED WINDS
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Experience Our Latest Music Video
          </p>

          <motion.a
            href="https://youtu.be/SSe0EvueQmM"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 text-lg font-semibold tracking-wide"
          >
            WATCH ON YOUTUBE
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
