"use client";

import { motion } from "framer-motion";
import { Music, TreePine, Sparkles, Heart, Users, Award } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import BandMembers from "@/components/band-members";

export default function AboutPage() {
  const stats = [
    { icon: Music, label: "Albums Released", value: "2" },
    { icon: Users, label: "Years Together", value: "8" },
    { icon: Heart, label: "Concerts Performed", value: "50+" },
    { icon: Award, label: "Music Awards", value: "5" },
  ];

  const missions = [
    {
      title: "Cultural Bridge",
      description:
        "Connecting ancient indigenous wisdom with contemporary worship expressions",
      icon: TreePine,
    },
    {
      title: "Spiritual Transformation",
      description:
        "Creating transformational encounters with the Creator through sacred music",
      icon: Sparkles,
    },
    {
      title: "Authentic Expression",
      description:
        "Encouraging un-ashamed and un-afraid worship in its purest form",
      icon: Music,
    },
  ];

  const timeline = [
    {
      year: "2016",
      title: "Band Formation",
      description:
        "OKAMA was formed with a vision to bridge ancient indigenous sounds with contemporary worship music.",
    },
    {
      year: "2018",
      title: "First Album",
      description:
        "Released 'Ancient Ruins' - our debut album that introduced our unique sound to the world.",
    },
    {
      year: "2020",
      title: "International Recognition",
      description:
        "Gained international attention and started touring across major venues in North America.",
    },
    {
      year: "2022",
      title: "Father of lights",
      description:
        "Released our second album 'Father of lights' which topped indigenous music charts.",
    },
    {
      year: "2023",
      title: "Sacred fire",
      description:
        "Our latest album 'Sacred Winds' represents our most mature and spiritually profound work.",
    },
    {
      year: "2024",
      title: "International Tour",
      description:
        "Embarking on our first international tour, sharing our message globally.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-36 md:pt-48 pb-12 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 font-serif">
                OUR <span className="text-pink-500">STORY</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed font-sans">
                For those with ears to hear - a new sound from an ancient well.
                We are OKAMA, an Indigenous Worship Band dedicated to bridging
                the sacred traditions of our ancestors with the contemporary
                expressions of faith.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => {
                  const StatIcon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className="text-center"
                    >
                      <StatIcon
                        className="mx-auto mb-2 text-pink-500"
                        size={32}
                      />
                      <div className="text-2xl font-bold text-pink-500 font-serif">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-400 font-sans">
                        {stat.label}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src="/images/band.jpg"
                alt="OKAMA Band"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
              OUR <span className="text-pink-500">MISSION</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-sans">
              We believe that when your sound is a pure reflection of your
              heart, you find an authentic experience. When your worship is
              ancient and new, you find a unique cultural expression that
              transcends boundaries and touches souls across all walks of life.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {missions.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="bg-gray-800 rounded-lg p-8 text-center border border-gray-700 hover:border-pink-500/50 transition-colors group"
                >
                  <div className="mb-4 flex justify-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-500/20 to-amber-600/20 rounded-full flex items-center justify-center group-hover:from-pink-500/30 group-hover:to-amber-600/30 transition-colors">
                      <IconComponent
                        size={32}
                        className="text-pink-500 group-hover:text-pink-400 transition-colors"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-pink-500 font-serif">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 font-sans">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
              OUR <span className="text-pink-500">JOURNEY</span>
            </h2>
            <p className="text-xl text-gray-300 font-sans">
              The milestones that shaped our musical and spiritual path
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line - Responsive */}
            <div className="absolute md:left-1/2 left-8 md:transform md:-translate-x-1/2 w-1 h-full bg-pink-500"></div>

            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative flex items-center mb-12 ${
                  // Desktop: alternating sides, Mobile: all left-aligned
                  index % 2 === 0
                    ? "md:justify-start justify-start"
                    : "md:justify-end justify-start"
                }`}
              >
                <div
                  className={`
                    ${
                      // Desktop width and positioning
                      index % 2 === 0
                        ? "md:w-5/12 md:text-right md:pr-8"
                        : "md:w-5/12 md:text-left md:pl-8"
                    }
                    ${
                      // Mobile: full width with left padding for line clearance
                      "w-full pl-16 md:pl-0 text-left"
                    }
                  `}
                >
                  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-pink-500/50 transition-colors">
                    <div className="text-2xl font-bold text-pink-500 mb-2 font-serif">
                      {item.year}
                    </div>
                    <h3 className="text-xl font-bold mb-2 font-serif text-white">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 font-sans">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Timeline Dot - Responsive positioning */}
                <div
                  className={`
                  absolute w-4 h-4 bg-pink-500 rounded-full border-4 border-black
                  ${
                    // Desktop: center, Mobile: left side
                    "md:left-1/2 md:transform md:-translate-x-1/2 left-8 transform -translate-x-1/2"
                  }
                `}
                ></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Band Members Section */}
      <BandMembers />

      <Footer />
    </div>
  );
}
