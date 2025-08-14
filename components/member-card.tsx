"use client";

import { motion } from "framer-motion";

interface MemberCardProps {
  member: {
    name: string;
    role: string;
    image: string;
  };
  index: number;
}

export default function MemberCard({ member, index }: MemberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      whileHover={{ scale: 1.05 }}
      className="text-center group cursor-pointer relative bg-black/70"
    >
      {/* Native Frame Design */}
      <div className="absolute -inset-4 border-2 border-amber-600/20 rounded-lg group-hover:border-pink-500/40 transition-colors duration-300">
        {/* Corner Decorations */}
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-amber-600/40 transform rotate-45" />
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-amber-600/40 transform rotate-45" />
        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-amber-600/40 transform rotate-45" />
        <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-amber-600/40 transform rotate-45" />
      </div>

      <div className="relative mb-4 overflow-hidden rounded-lg">
        {/* Native Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
          style={{
            backgroundImage: `repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(139, 69, 19, 0.3) 45deg, transparent 90deg)`,
            backgroundSize: "30px 30px",
          }}
        />

        <img
          src={member.image || "/placeholder.svg"}
          alt={member.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500 relative z-10"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"></div>

        {/* Decorative Border */}
        <div className="absolute inset-0 border-2 border-amber-600/30 group-hover:border-pink-500/50 transition-colors duration-300 z-30" />
      </div>

      <div className="relative">
        <h3 className="text-xl font-bold mb-2">{member.name}</h3>
        <p className="text-pink-500">{member.role}</p>

        {/* Decorative Underline */}
        <div className="mt-2 flex justify-center">
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent" />
        </div>
      </div>
    </motion.div>
  );
}
