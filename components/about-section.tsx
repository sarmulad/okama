"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Thunderbird SVG Component
const Thunderbird = ({
  size = 50,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
    <path
      d="M50 20 L30 40 L20 35 L25 50 L15 60 L35 55 L50 70 L65 55 L85 60 L75 50 L80 35 L70 40 Z"
      fill="currentColor"
      stroke="#654321"
      strokeWidth="1"
    />
    <circle cx="45" cy="35" r="2" fill="#FF6B6B" />
    <circle cx="55" cy="35" r="2" fill="#FF6B6B" />
    <path
      d="M40 45 L50 50 L60 45"
      stroke="#654321"
      strokeWidth="2"
      fill="none"
    />
  </svg>
);

// Sacred Fire SVG Component
const SacredFire = ({
  size = 60,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
    <path
      d="M50 80 Q40 70 45 60 Q35 50 40 40 Q30 30 35 20 Q45 25 50 35 Q55 25 65 20 Q70 30 60 40 Q65 50 55 60 Q60 70 50 80"
      fill="#FF6B6B"
    />
    <path
      d="M50 75 Q45 65 48 58 Q42 50 45 42 Q40 35 43 28 Q48 32 50 40 Q52 32 57 28 Q60 35 55 42 Q58 50 52 58 Q55 65 50 75"
      fill="#FFD700"
    />
    <path
      d="M50 70 Q47 62 49 56 Q46 50 48 44 Q45 38 47 32 Q49 35 50 42 Q51 35 53 32 Q55 38 52 44 Q54 50 51 56 Q53 62 50 70"
      fill="#FFA500"
    />
  </svg>
);

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden"
    >
      {/* Native Pattern Background
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(139, 69, 19, 0.2) 90deg, transparent 180deg, rgba(139, 69, 19, 0.2) 270deg, transparent 360deg),
              radial-gradient(circle at 30% 70%, rgba(210, 105, 30, 0.1) 20%, transparent 50%)
            `,
            backgroundSize: "100px 100px, 200px 200px",
          }}
        />
      </div> */}

      {/* Floating Sacred Elements */}
      {/* <motion.div
        className="absolute top-32 right-16 opacity-20"
        animate={{
          y: [0, -30, 0],
          rotate: [0, 15, 0],
        }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY }}
      >
        <Thunderbird size={90} className="text-amber-600" />
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-16 opacity-25"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0],
        }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
      >
        <SacredFire size={80} className="text-orange-500" />
      </motion.div> */}

      {/* Floating Tribal Elements
      {Array.from({ length: 8 }).map((_, index) => (
        <motion.div
          key={`about-tribal-${index}`}
          className="absolute opacity-8"
          style={{
            left: `${15 + Math.random() * 70}%`,
            top: `${15 + Math.random() * 70}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 360],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 4,
          }}
        >
          <div className="w-4 h-4 bg-amber-600 transform rotate-45" />
        </motion.div>
      ))} */}

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Native Border Frame */}
            {/* <div className="absolute -inset-4 border-2 border-amber-600/30 rounded-lg">
              <div className="absolute -top-2 -left-2 w-6 h-6 bg-amber-600/50 transform rotate-45" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-600/50 transform rotate-45" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-amber-600/50 transform rotate-45" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-amber-600/50 transform rotate-45" />
            </div> */}

            <h2 className="text-4xl md:text-5xl font-bold mb-6 relative">
              WE ARE <span className="text-red-300">OKAMA</span> MUSIC
              {/* Decorative Native Elements */}
              <div className="absolute -top-6 left-0 w-16 h-1 bg-gradient-to-r from-amber-600 to-transparent" />
              <div className="absolute -bottom-2 right-0 w-12 h-1 bg-gradient-to-l from-amber-600 to-transparent" />
            </h2>

            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              For those with ears to hear - a new sound from an ancient well.
              When your sound is a pure reflection of your heart, you find an
              authentic experience. When your worship is ancient and new, you
              find a unique cultural expression in you.
            </p>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Get ready for the un-ashamed and un-afraid. Get ready for your
              transformational encounter with our Creator through the power of
              indigenous worship music that bridges generations and cultures.
            </p>
            <Link href="/about">
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 border-2 border-amber-600/40 hover:border-amber-500 transition-all duration-300"
              >
                Learn More About Us
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Native Pattern Frame */}
            <div
              className="absolute -inset-6 rounded-lg opacity-20"
              style={{
                backgroundImage: `repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(139, 69, 19, 0.3) 45deg, transparent 90deg)`,
                backgroundSize: "40px 40px",
              }}
            />

            <img
              src="/images/band.jpg"
              alt="OKAMA Band"
              className="rounded-lg shadow-2xl relative z-10"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg z-20"></div>

            {/* Decorative Corner Elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 border-l-4 border-t-4 border-amber-600/60 z-30" />
            <div className="absolute -top-4 -right-4 w-8 h-8 border-r-4 border-t-4 border-amber-600/60 z-30" />
            <div className="absolute -bottom-4 -left-4 w-8 h-8 border-l-4 border-b-4 border-amber-600/60 z-30" />
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-4 border-b-4 border-amber-600/60 z-30" />
          </motion.div>
        </div>
      </div>

      {/* Native Pattern Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-transparent via-amber-600/40 to-transparent" />
      <div
        className="absolute bottom-0 left-0 right-0 h-2"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 25px, rgba(139, 69, 19, 0.5) 25px, rgba(139, 69, 19, 0.5) 50px)`,
        }}
      />
    </section>
  );
}
