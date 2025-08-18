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
  {
    id: "8",
    src: "/images/featured-album/1.jpg",
    alt: "OKAMA performing live on stage with traditional instruments",
    title: "LIVE IN CONCERT",
    subtitle: "Sacred music meets modern stage",
  },
  {
    id: "9",
    src: "/images/featured-album/2.jpg",
    alt: "Band members in traditional indigenous regalia",
    title: "SACRED TRADITIONS",
    subtitle: "Honoring our ancestors through music",
  },
  {
    id: "10",
    src: "/images/featured-album/3.jpg",
    alt: "OKAMA recording in the studio",
    title: "IN THE STUDIO",
    subtitle: "Creating the Sacred Winds album",
  },
  {
    id: "11",
    src: "/images/featured-album/4.jpg",
    alt: "Traditional drums and ceremonial instruments",
    title: "SACRED INSTRUMENTS",
    subtitle: "Hand-crafted by indigenous artisans",
  },
  {
    id: "12",
    src: "/images/featured-album/5.jpg",
    alt: "OKAMA band members group portrait",
    title: "THE BAND",
    subtitle: "Five voices, one sacred mission",
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
  const [isTransitioning, setIsTransitioning] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);

  const extendedImages = [
    ...sliderImages.slice(-1),
    ...sliderImages,
    ...sliderImages.slice(0, 1),
  ];

  const imageWidth = 320; // smaller for mobile
  const gap = 16;
  const translateX = -(currentIndex * (imageWidth + gap));

  // Loop reset
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

  // Auto slide
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => setCurrentIndex((prev) => prev - 1);
  const goToNext = () => setCurrentIndex((prev) => prev + 1);

  const getRealIndex = () => {
    if (currentIndex === 0) return sliderImages.length - 1;
    if (currentIndex === extendedImages.length - 1) return 0;
    return currentIndex - 1;
  };

  return (
    <section className="py-16 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative">
          {/* Navigation Buttons (desktop only) */}
          {/* <button
            onClick={goToPrevious}
            className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={goToNext}
            className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
          >
            <ChevronRight size={24} />
          </button> */}

          <div className="overflow-hidden" ref={sliderRef}>
            <motion.div
              className="flex gap-4"
              animate={{ x: translateX }}
              transition={
                isTransitioning
                  ? { type: "spring", stiffness: 300, damping: 30 }
                  : { duration: 0 }
              }
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50) {
                  goToNext();
                } else if (info.offset.x > 50) {
                  goToPrevious();
                }
              }}
              style={{
                width: `${extendedImages.length * (imageWidth + gap)}px`,
              }}
            >
              {extendedImages.map((image, index) => {
                const isActive = index === currentIndex;

                return (
                  <motion.div
                    key={`${image.id}-${index}`}
                    className="relative group flex-shrink-0"
                    style={{ width: `${imageWidth}px` }}
                  >
                    <div className="aspect-[4/3] relative overflow-hidden rounded-xl shadow-2xl">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        draggable={false}
                      />
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

          {/* Indicators */}
          <div className="flex justify-center mt-6 gap-2 flex-wrap">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index + 1)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  getRealIndex() === index
                    ? "bg-red-600 scale-125 w-6"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
