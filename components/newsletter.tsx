"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Youtube, Facebook, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Newsletter() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

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

        <form
          name="newsletter"
          method="POST"
          data-netlify="true"
          onSubmit={handleSubmit}
          className="flex gap-4  mb-4"
        >
          <input type="hidden" name="form-name" value="newsletter" />

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            className="flex-1 bg-gray-800 border-2 h-[50px] border-amber-600/30 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 text-white placeholder-gray-400"
          />
          <Button
            type="submit"
            className="bg-gradient-to-r from-red-500 h-[50px]  to-red-600 hover:from-red-600 hover:to-red-700 px-8 border border-amber-600/40 "
          >
            Subscribe
          </Button>
        </form>

        {/* Success / error messages */}
        {status === "success" && (
          <p className="text-green-500 font-semibold mb-4">
            Thank you for subscribing!
          </p>
        )}
        {status === "error" && (
          <p className="text-red-500 font-semibold mb-4">
            Oops! Something went wrong. Please try again.
          </p>
        )}

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
