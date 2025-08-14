"use client";

import { motion } from "framer-motion";
import { Instagram, Youtube, Facebook, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Newsletter() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="relative"
    >
      <div className="relative z-10">
        <h2 className="text-4xl font-bold mb-6">STAY CONNECTED</h2>
        <p className="text-gray-300 text-lg mb-8">
          Subscribe to our newsletter for the latest updates on new music, tour
          dates, and exclusive content.
        </p>
        <div className="flex space-x-4 mb-8">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 bg-gray-800 border-2 border-amber-600/30 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 text-white placeholder-gray-400"
          />
          <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-8 border border-amber-600/40">
            Subscribe
          </Button>
        </div>
        <div className="flex space-x-6">
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="#"
            className="text-red-500 hover:text-red-400 transition-colors"
          >
            <Instagram size={24} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="#"
            className="text-red-500 hover:text-red-400 transition-colors"
          >
            <Youtube size={24} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="#"
            className="text-red-500 hover:text-red-400 transition-colors"
          >
            <Facebook size={24} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="#"
            className="text-red-500 hover:text-red-400 transition-colors"
          >
            <Mail size={24} />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}
