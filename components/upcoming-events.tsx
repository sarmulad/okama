"use client";

import { motion } from "framer-motion";
import EventCard from "./event-card";

const upcomingEvents: any[] = [
  // {
  //   id: "sacred-winds-tour-2024",
  //   title: "OKAMA Live: Sacred Winds Tour",
  //   date: "2024-03-15",
  //   venue: "Red Rocks Amphitheatre",
  //   location: "Morrison, CO",
  //   status: "On Sale",
  // },
];

export default function UpcomingEvents() {
  return (
    <section
      id="events"
      className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(139, 69, 19, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(139, 69, 19, 0.3) 0%, transparent 50%)`,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-amber-600 bg-clip-text text-transparent">
            Upcoming Events
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-amber-600 mx-auto mb-6" />
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join us for powerful worship experiences that bridge ancient
            traditions with contemporary faith
          </p>
        </motion.div>

        {upcomingEvents.length > 0 ? (
          <div className="space-y-6">
            {upcomingEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center text-gray-400 text-lg"
          >
            No upcoming events at the moment — check back soon!
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-4">
            Want to stay updated on all our events?
          </p>
          <button className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 border border-amber-500/50">
            Join Our Mailing List
          </button>
        </motion.div>
      </div>
    </section>
  );
}
