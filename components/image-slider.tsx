"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SliderImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

const sliderImages: SliderImage[] = [
  {
    id: "1",
    src: "/images/wind2.jpg",
    alt: "OKAMA band members in traditional regalia",
    title: "Sacred Circle",
    description: "The complete OKAMA ensemble in ceremonial dress",
  },
  {
    id: "2",
    src: "/images/wind2.jpg",
    alt: "Lead vocalist performing in traditional headdress",
    title: "Voice of the Ancestors",
    description: "Channeling ancient wisdom through modern sound",
  },
  {
    id: "3",
    src: "/images/wind2.jpg",
    alt: "Traditional drums and instruments",
    title: "Sacred Instruments",
    description: "Hand-crafted drums and traditional instruments",
  },
  {
    id: "4",
    src: "/images/wind2.jpg",
    alt: "OKAMA performing live on stage",
    title: "Live Performance",
    description: "Bringing sacred music to modern audiences",
  },
  {
    id: "5",
    src: "/images/wind2.jpg",
    alt: "Traditional regalia and ceremonial items",
    title: "Sacred Regalia",
    description: "Authentic ceremonial dress and sacred items",
  },
];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + sliderImages.length) % sliderImages.length
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Native Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(139, 69, 19, 0.3) 10%, transparent 30%),
              radial-gradient(circle at 75% 75%, rgba(210, 105, 30, 0.3) 10%, transparent 30%)
            `,
            backgroundSize: "200px 200px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            SACRED <span className="text-red-500">MOMENTS</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Journey through our visual story of tradition, music, and spiritual
            connection
          </p>
        </motion.div>

        {/* Main Slider */}
        <div className="relative max-w-6xl mx-auto">
          <div className="relative h-[400px] md:h-[600px] overflow-hidden rounded-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <img
                  src={sliderImages[currentIndex].src || "/placeholder.svg"}
                  alt={sliderImages[currentIndex].alt}
                  className="w-full h-full object-cover"
                />

                {/* Image overlay with title */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {sliderImages[currentIndex].title}
                    </h3>
                    <p className="text-gray-300 text-lg">
                      {sliderImages[currentIndex].description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex justify-center mt-8 gap-2 overflow-x-auto pb-4">
            {sliderImages.map((image, index) => (
              <button
                key={image.id}
                onClick={() => goToSlide(index)}
                className={`relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden transition-all duration-300 ${
                  index === currentIndex
                    ? "ring-2 ring-red-500 scale-110"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                {index === currentIndex && (
                  <div className="absolute inset-0 bg-red-500/20" />
                )}
              </button>
            ))}
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-red-500 scale-125"
                    : "bg-gray-600 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Auto-play indicator */}
          <div className="flex justify-center mt-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div
                className={`w-2 h-2 rounded-full ${
                  isAutoPlaying ? "bg-green-500" : "bg-gray-500"
                }`}
              />
              {isAutoPlaying ? "Auto-playing" : "Paused"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
