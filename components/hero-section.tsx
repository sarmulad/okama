"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Play, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";

// Custom SoundCloud and Apple Music icons
const SoundCloudIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 17.939h-1v-8.068c.308-.231.639-.429 1-.566v8.634zm3 0h1v-9.224c-.229.265-.443.548-.621.857l-.379-.184v8.551zm2 0h1v-8.848c-.508-.079-.623-.05-1-.01v8.858zm-4 0h1v-7.02c-.312.458-.555.971-.692 1.535l-.308-.182v5.667z" />
  </svg>
);

const AppleMusicIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.997 6.124c0-.738-.065-1.47-.24-2.19-.317-1.31-1.062-2.31-2.18-3.043C21.003.517 20.373.285 19.7.164c-.517-.093-1.038-.135-1.564-.14H5.864c-.525.005-1.046.047-1.563.14-.674.121-1.304.353-1.878.727-1.118.733-1.863 1.732-2.18 3.043-.175.72-.24 1.452-.24 2.19v11.751c0 .738.065 1.47.24 2.189.317 1.311 1.062 2.311 2.18 3.044.574.374 1.204.606 1.878.727.517.093 1.038.134 1.563.14h12.872c.526-.006 1.047-.047 1.564-.14.673-.121 1.303-.353 1.877-.727 1.118-.733 1.863-1.733 2.18-3.044.175-.719.24-1.451.24-2.189V6.124zM9.857 19.007c-2.023 0-3.665-1.641-3.665-3.665s1.642-3.664 3.665-3.664c2.022 0 3.664 1.64 3.664 3.664s-1.642 3.665-3.664 3.665z" />
  </svg>
);

const SpotifyIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
);

const StarParticle = ({
  delay,
  size = "small",
}: {
  delay: number;
  size?: "small" | "medium" | "large";
}) => {
  const sizeClasses = {
    small: "w-0.5 h-0.5",
    medium: "w-1 h-1",
    large: "w-1.5 h-1.5",
  };

  const randomX =
    Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200);
  const randomY =
    Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800);

  return (
    <motion.div
      className={`absolute ${sizeClasses[size]} bg-white/20 rounded-full`}
      style={{
        left: randomX,
        top: randomY,
      }}
      initial={{
        opacity: 0,
        scale: 0,
      }}
      animate={{
        opacity: [0, 0.3, 0.1, 0.3, 0],
        scale: [0, 1, 0.8, 1, 0],
      }}
      transition={{
        duration: 6 + Math.random() * 4,
        delay: delay,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: Math.random() * 5,
      }}
    />
  );
};

export default function HeroSection() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const [particles, setParticles] = useState<number[]>([]);

  useEffect(() => {
    // Reduced from 150 to 30 particles
    setParticles(Array.from({ length: 30 }, (_, i) => i));
  }, []);

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* <div className="absolute inset-0 w-full h-full pointer-events-none">
          <iframe
            src="https://www.youtube.com/embed/U4cYzpkcqrk?rel=0&modestbranding=1&autohide=1&disablekb=1&controls=0&autoplay=1&loop=1&playlist=U4cYzpkcqrk&mute=1"
            allow="autoplay"
            className="w-full h-full absolute top-0 left-0 object-cover"
            frameBorder="0"
            allowFullScreen
          />
        </div> */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <iframe
            className="absolute top-0 left-0 w-[177.77vh] h-full md:w-full md:h-full"
            src="https://www.youtube.com/embed/U4cYzpkcqrk?rel=0&modestbranding=1&autohide=1&disablekb=1&controls=0&autoplay=1&loop=1&playlist=U4cYzpkcqrk&mute=1"
            title="OKAMA Sacred Winds Video Showcase"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>

        <div className="absolute inset-0 bg-black/60 z-10" />
      </div>

      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => {
          const sizeOptions = ["small", "small", "small", "medium"];
          const randomSize =
            sizeOptions[Math.floor(Math.random() * sizeOptions.length)];
          return (
            <StarParticle
              key={particle}
              delay={particle * 0.2}
              size={randomSize as "small" | "medium" | "large"}
            />
          );
        })}
      </div>

      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-40 flex flex-col space-y-3"
      >
        {[
          { icon: Facebook, href: "#" },
          { icon: Instagram, href: "#" },
          { icon: SoundCloudIcon, href: "#" },
          { icon: AppleMusicIcon, href: "#" },
          { icon: SpotifyIcon, href: "#" },
          { icon: Twitter, href: "#" },
          { icon: Youtube, href: "#" },
        ].map((social, index) => (
          <motion.a
            key={index}
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            href={social.href}
            className="w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-red-500/80 transition-all duration-300 border border-white/10 hover:border-red-400/60"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
          >
            <social.icon size={18} />
          </motion.a>
        ))}
      </motion.div>

      <motion.div
        style={{ y: y1 }}
        className="relative z-10 text-center px-4 max-w-6xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-12"
        >
          <motion.p
            className="text-sm md:text-base tracking-[0.3em] text-gray-200 mb-2 uppercase font-light"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            FOR THOSE WITH EARS TO HEAR
          </motion.p>
          <motion.p
            className="text-sm md:text-base tracking-[0.2em] text-gray-300 uppercase font-light"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: 1.5,
            }}
          >
            A NEW SOUND FROM AN ANCIENT WELL
          </motion.p>
        </motion.div>

        {/* Main OKAMA Title - clean and bold */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-wider leading-none">
            <motion.span
              className="text-red-600"
              animate={{
                textShadow: [
                  "0 0 10px rgba(220, 38, 38, 0.3)",
                  "0 0 20px rgba(220, 38, 38, 0.5)",
                  "0 0 10px rgba(220, 38, 38, 0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              O
            </motion.span>
            <motion.span
              className="text-white"
              animate={{
                textShadow: [
                  "0 0 10px rgba(255, 255, 255, 0.2)",
                  "0 0 20px rgba(255, 255, 255, 0.4)",
                  "0 0 10px rgba(255, 255, 255, 0.2)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: 0.2,
              }}
            >
              KAM
            </motion.span>
            <motion.span
              className="text-red-600"
              animate={{
                textShadow: [
                  "0 0 10px rgba(220, 38, 38, 0.3)",
                  "0 0 20px rgba(220, 38, 38, 0.5)",
                  "0 0 10px rgba(220, 38, 38, 0.3)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: 0.4,
              }}
            >
              A
            </motion.span>
          </h1>
        </motion.div>

        {/* Description Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <p className="text-gray-200 leading-relaxed text-lg md:text-xl font-light tracking-wide">
            WHEN YOUR SOUND IS A PURE REFLECTION OF YOUR HEART, YOU FIND AN
            AUTHENTIC EXPERIENCE. WHEN YOUR WORSHIP IS ANCIENT AND NEW, YOU FIND
            A UNIQUE CULTURAL EXPRESSION IN YOU. GET READY FOR THE UN-ASHAMED
            AND UN-AFRAID. GET READY FOR YOUR TRANSFORMATIONAL ENCOUNTER WITH
            OUR CREATOR.
          </p>
        </motion.div>

        {/* Action Buttons - clean design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="#music">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-800/80 to-red-800/80 hover:from-red-700 hover:to-red-700 text-white px-10 py-4 text-lg rounded-full backdrop-blur-sm border border-white/20 hover:border-red-400/60 font-semibold tracking-wider transition-all duration-300"
              >
                <Play className="mr-3" size={20} />
                LISTEN NOW
              </Button>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/40 text-white hover:bg-white/10 hover:border-white/60 px-10 py-4 text-lg rounded-full bg-transparent backdrop-blur-sm font-semibold tracking-wider transition-all duration-300"
              >
                DISCOVER MORE
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator - simplified
      <motion.div
        style={{ y: y2 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
      >
        <motion.p
          className="text-white text-sm tracking-wider mb-4 font-light"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          SCROLL DOWN
        </motion.p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center mx-auto backdrop-blur-sm"
        >
          <motion.div
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </motion.div>
      </motion.div> */}
    </section>
  );
}
