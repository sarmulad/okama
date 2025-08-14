"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface EventCardProps {
  event: {
    id: string;
    date: string;
    venue: string;
    location: string;
    status: string;
    title?: string;
  };
  index: number;
}

export default function EventCard({ event, index }: EventCardProps) {
  return (
    <motion.div
      // initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-6 border-2 border-amber-600/20 hover:border-pink-500/50 transition-all duration-300 relative overflow-hidden"
    >
      {/* Native Pattern Background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 15px, rgba(139, 69, 19, 0.2) 15px, rgba(139, 69, 19, 0.2) 30px)`,
        }}
      />

      {/* Decorative Corner Elements */}
      <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-amber-600/40" />
      <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-amber-600/40" />
      <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-amber-600/40" />
      <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-amber-600/40" />

      <div className="flex flex-col md:flex-row md:items-center justify-between relative z-10">
        <div className="flex items-center space-x-6 mb-4 md:mb-0">
          <div className="text-center relative">
            {/* Native Circle Design */}
            <div className="absolute inset-0 border-2 border-amber-600/30 rounded-full" />
            <div className="w-16 h-16 bg-gradient-to-br from-amber-900/40 to-amber-700/40 rounded-full flex flex-col items-center justify-center border border-amber-600/50">
              <div className="text-2xl font-bold text-pink-500">
                {new Date(event.date).getDate()}
              </div>
              <div className="text-xs text-gray-400">
                {new Date(event.date).toLocaleDateString("en-US", {
                  month: "short",
                })}
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">
              {event.title || event.venue}
            </h3>
            <div className="flex items-center text-gray-400">
              <MapPin size={16} className="mr-1" />
              {event.location}
            </div>
          </div>
        </div>
        <Link href={`/events/${event.id}`}>
          <Button className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 border border-amber-600/40 hover:border-amber-500 transition-all duration-300">
            Get Tickets
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
