"use client";

import { motion } from "framer-motion";
import MemberCard from "@/components/member-card";

// // Eagle SVG Component
// const Eagle = ({
//   size = 60,
//   className = "",
// }: {
//   size?: number;
//   className?: string;
// }) => (
//   <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
//     <path
//       d="M50 20 L30 35 L20 30 L25 45 L15 55 L35 50 L50 65 L65 50 L85 55 L75 45 L80 30 L70 35 Z"
//       fill="currentColor"
//     />
//     <circle cx="45" cy="35" r="2" fill="#FFD700" />
//     <circle cx="55" cy="35" r="2" fill="#FFD700" />
//     <path
//       d="M40 42 L50 47 L60 42"
//       stroke="#654321"
//       strokeWidth="2"
//       fill="none"
//     />
//     <path
//       d="M35 50 Q50 60 65 50"
//       stroke="#654321"
//       strokeWidth="1"
//       fill="none"
//     />
//   </svg>
// );

export default function BandMembers() {
  const members = [
    {
      name: "Gerard Roberts",
      role: "Plays Wind Flute",
      image: "/images/gerard.jpg",
    },
    {
      name: "Peta-Gay Roberts",
      role: "Vocals & Flute",
      image: "/images/peta.jpg",
    },
    {
      name: "Isreal-Rain Roberts",
      role: "Guitar & Vocals",
      image: "/images/isreal.jpg",
    },
    {
      name: "Matthew Macleod",
      role: "Bass & Percussion",
      image: "/images/mathew.jpg",
    },
    {
      name: "Gesse-lea Roberts",
      role: "Bass & Percussion",
      image: "/images/gesse.jpg",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Native Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(139, 69, 19, 0.2) 10%, transparent 30%),
              radial-gradient(circle at 80% 80%, rgba(210, 105, 30, 0.2) 10%, transparent 30%),
              repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(139, 69, 19, 0.1) 60deg, transparent 120deg)
            `,
            backgroundSize: "200px 200px, 200px 200px, 100px 100px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 relative"
        >
          {/* Sacred Circle Design */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
            <div className="w-24 h-24 border-2 border-amber-600/30 rounded-full flex items-center justify-center">
              <div className="w-16 h-16 border border-amber-600/50 rounded-full flex items-center justify-center">
                {/* <Eagle size={30} className="text-amber-600" /> */}
              </div>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 pt-8">
            TALENTED <span className="text-pink-500">MEMBERS</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Meet the voices behind the sacred sounds
          </p>

          {/* Decorative Native Elements */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
            <div className="w-2 h-2 bg-amber-600 rounded-full" />
            <div className="w-3 h-3 bg-amber-600 rounded-full" />
            <div className="w-2 h-2 bg-amber-600 rounded-full" />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {members.map((member, index) => (
            <MemberCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>

      {/* Native Pattern Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-transparent via-amber-600/40 to-transparent" />
      <div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 15px, rgba(139, 69, 19, 0.6) 15px, rgba(139, 69, 19, 0.6) 18px, transparent 18px, transparent 33px)`,
        }}
      />
    </section>
  );
}
