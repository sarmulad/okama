"use client";

import { Instagram, Youtube, Facebook } from "lucide-react";
import Link from "next/link";

const NativeBorder = ({ className = "" }: { className?: string }) => (
  <div className={`h-2 ${className}`}>
    <div
      className="h-full"
      style={{
        backgroundImage: `
          repeating-linear-gradient(90deg, 
            transparent, transparent 10px, 
            rgba(139, 69, 19, 0.6) 10px, rgba(139, 69, 19, 0.6) 15px,
            transparent 15px, transparent 25px,
            rgba(210, 105, 30, 0.6) 25px, rgba(210, 105, 30, 0.6) 30px,
            transparent 30px, transparent 40px
          )
        `,
      }}
    />
  </div>
);

export default function Footer() {
  const quickLinks = ["Home", "Music", "About", "Events"];
  const musicLinks = [
    "Sacred Winds",
    "Thunder Prayer",
    "Ancient Echoes",
    "All Albums",
  ];
  const contactInfo = [
    "booking@okamamusic.com",
    "info@okamamusic.com",
    "+1 (555) 123-4567",
  ];

  return (
    <footer className="bg-black border-t-4 border-amber-600/40 py-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        {/* <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(139, 69, 19, 0.2) 30px, rgba(139, 69, 19, 0.2) 60px),
              repeating-linear-gradient(-45deg, transparent, transparent 30px, rgba(210, 105, 30, 0.1) 30px, rgba(210, 105, 30, 0.1) 60px)
            `,
          }}
        /> */}
      </div>

      {/* Native Border at Top */}
      <NativeBorder className="absolute top-0 left-0 right-0" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="relative">
            <div className="flex items-center justify-between">
              <div className="w-[120px]">
                <Link
                  href="/"
                  className="text-2xl font-bold text-pink-500 tracking-wider"
                >
                  <img src="/images/logo.png" alt="logo" />
                </Link>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Indigenous Worship Band bringing ancient sounds to modern worship.
            </p>
            <div className="flex space-x-4">
              <Instagram
                size={20}
                className="text-gray-400 hover:text-pink-500 cursor-pointer transition-colors"
              />
              <Youtube
                size={20}
                className="text-gray-400 hover:text-pink-500 cursor-pointer transition-colors"
              />
              <Facebook
                size={20}
                className="text-gray-400 hover:text-pink-500 cursor-pointer transition-colors"
              />
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-amber-600">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              {quickLinks.map((link) => (
                <li key={link} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-amber-600/60 transform rotate-45" />
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="hover:text-pink-500 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-amber-600">Music</h4>
            <ul className="space-y-2 text-gray-400">
              {musicLinks.map((link) => (
                <li key={link} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-amber-600/60 transform rotate-45" />
                  <a href="#" className="hover:text-pink-500 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-amber-600">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              {contactInfo.map((info) => (
                <li key={info} className="flex items-center space-x-2">
                  <div className="w-1 h-1 bg-amber-600/60 rounded-full" />
                  <span>{info}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Native Pattern Divider */}
        <div className="mt-8 pt-8 relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-600/50 to-transparent" />
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(139, 69, 19, 0.8) 20px, rgba(139, 69, 19, 0.8) 25px, transparent 25px, transparent 45px)`,
            }}
          />

          <div className="text-center text-gray-400 pt-4">
            <p>
              &copy; 2024 OKAMA Music. All rights reserved. | Indigenous Worship
              Band
            </p>
            <div className="mt-2 flex justify-center">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Native Border at Bottom */}
      <NativeBorder className="absolute bottom-0 left-0 right-0" />
    </footer>
  );
}
