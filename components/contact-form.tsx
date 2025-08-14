"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function ContactForm() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-8 border-2 border-amber-600/20 relative overflow-hidden"
    >
      <div className="relative z-10">
        <h3 className="text-2xl font-bold mb-6 text-amber-600">Get In Touch</h3>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full bg-gray-700 border-2 border-amber-600/30 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 text-white placeholder-gray-400"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full bg-gray-700 border-2 border-amber-600/30 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 text-white placeholder-gray-400"
          />
          <textarea
            placeholder="Your Message"
            rows={4}
            className="w-full bg-gray-700 border-2 border-amber-600/30 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 resize-none text-white placeholder-gray-400"
          />
          <Button className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 border border-amber-600/40">
            Send Message
          </Button>
        </form>
      </div>
    </motion.div>
  );
}
