"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function ContactForm() {
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
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-8 border-2 border-amber-600/20 relative overflow-hidden"
    >
      <div className="relative z-10">
        <h3 className="text-2xl font-bold mb-6 text-amber-600">Get In Touch</h3>

        <form
          name="contact"
          method="POST"
          data-netlify="true"
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input type="hidden" name="form-name" value="contact" />

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full bg-gray-700 border-2 border-amber-600/30 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 text-white placeholder-gray-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full bg-gray-700 border-2 border-amber-600/30 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 text-white placeholder-gray-400"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={4}
            required
            className="w-full bg-gray-700 border-2 border-amber-600/30 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 resize-none text-white placeholder-gray-400"
          />

          {/* <label className="flex items-center space-x-2 text-white">
            <input type="checkbox" name="subscribe" className="accent-pink-500" />
            <span>Subscribe to blog notifications</span>
          </label> */}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 border border-amber-600/40"
          >
            Send Message
          </Button>
        </form>

        {status === "success" && (
          <p className="mt-4 text-green-500 font-semibold">
            Thank you! Your message has been sent.
          </p>
        )}
        {status === "error" && (
          <p className="mt-4 text-red-500 font-semibold">
            Oops! Something went wrong. Please try again.
          </p>
        )}
      </div>
    </motion.div>
  );
}
