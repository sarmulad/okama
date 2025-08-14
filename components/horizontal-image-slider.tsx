"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SliderImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
}

const sliderImages: SliderImage[] = [
  {
    id: "1",
    src: "/images/featured-album/1.jpg",
    alt: "OKAMA performing live on stage with traditional instruments",
    title: "LIVE IN CONCERT",
    subtitle: "Sacred music meets modern stage",
  },
  {
    id: "2",
    src: "/images/featured-album/2.jpg",
    alt: "Band members in traditional indigenous regalia",
    title: "SACRED TRADITIONS",
    subtitle: "Honoring our ancestors through music",
  },
  {
    id: "3",
    src: "/images/featured-album/3.jpg",
    alt: "OKAMA recording in the studio",
    title: "IN THE STUDIO",
    subtitle: "Creating the Sacred Winds album",
  },
  {
    id: "4",
    src: "/images/featured-album/4.jpg",
    alt: "Traditional drums and ceremonial instruments",
    title: "SACRED INSTRUMENTS",
    subtitle: "Hand-crafted by indigenous artisans",
  },
  {
    id: "5",
    src: "/images/featured-album/5.jpg",
    alt: "OKAMA band members group portrait",
    title: "THE BAND",
    subtitle: "Five voices, one sacred mission",
  },
  {
    id: "6",
    src: "/images/featured-album/6.jpg",
    alt: "Outdoor ceremonial performance",
    title: "SACRED CEREMONY",
    subtitle: "Music under the open sky",
  },
  {
    id: "7",
    src: "/images/featured-album/7.jpg",
    alt: "Sacred fire ceremony with music",
    title: "SACRED FIRE",
    subtitle: "Ancient rituals in modern times",
  },
  // {
  //   id: "8",
  //   src: "/images/featured-album/9.jpg",
  //   alt: "Community drum circle gathering",
  //   title: "DRUM CIRCLE",
  //   subtitle: "Community gathering through rhythm",
  // },
];

export default function HorizontalImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(sliderImages.length);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);

  const extendedImages = [
    ...sliderImages.slice(-1), // Last image at the beginning
    ...sliderImages, // Original images
    ...sliderImages.slice(0, 1), // First image at the end
  ];

  const imageWidth = 500;
  const gap = 24;
  const translateX = -(currentIndex * (imageWidth + gap));

  // Handle infinite loop reset
  useEffect(() => {
    if (currentIndex === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(sliderImages.length);
        setTimeout(() => setIsTransitioning(true), 50);
      }, 300);
    } else if (currentIndex === extendedImages.length - 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(1);
        setTimeout(() => setIsTransitioning(true), 50);
      }, 300);
    }
  }, [currentIndex, extendedImages.length]);

  useEffect(() => {
    if (!isAutoPlaying || isDragging) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isDragging]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => prev - 1);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => prev + 1);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const goToSlide = (index: number) => {
    // Convert the indicator index to the extended array index
    setCurrentIndex(index + 1);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  // Get the current "real" index for indicators (excluding clones)
  const getRealIndex = () => {
    if (currentIndex === 0) return sliderImages.length - 1;
    if (currentIndex === extendedImages.length - 1) return 0;
    return currentIndex - 1;
  };

  return (
    <section className="py-16 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          <div className="overflow-hidden" ref={sliderRef}>
            <motion.div
              className="flex gap-6"
              animate={{ x: translateX }}
              transition={
                isTransitioning
                  ? {
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                      mass: 0.8,
                    }
                  : { duration: 0 }
              }
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              style={{
                width: `${extendedImages.length * (imageWidth + gap)}px`,
              }}
            >
              {extendedImages.map((image, index) => {
                const realIndex = getRealIndex();
                const isActive = index === currentIndex;

                return (
                  <motion.div
                    key={`${image.id}-${index}`}
                    className="relative group cursor-pointer flex-shrink-0"
                    style={{ width: `${imageWidth}px` }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => {
                      if (index > 0 && index < extendedImages.length - 1) {
                        goToSlide(index - 1);
                      }
                    }}
                  >
                    <div className="aspect-[3/2] relative overflow-hidden rounded-xl shadow-2xl">
                      <img
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        draggable={false}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-40 group-hover:opacity-80 transition-opacity duration-300" />

                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-4 right-4 w-3 h-3 bg-red-600 rounded-full shadow-lg"
                        />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 gap-2 flex-wrap">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  getRealIndex() === index
                    ? "bg-red-600 scale-125 w-8"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
