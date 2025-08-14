"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface SliderImage {
  id: string
  src: string
  alt: string
  title?: string
  subtitle?: string
}

const sliderImages: SliderImage[] = [
  {
    id: "1",
    src: "/placeholder.svg?height=1080&width=1920&text=OKAMA+Live+Performance",
    alt: "OKAMA performing live on stage with traditional instruments",
    title: "LIVE IN CONCERT",
    subtitle: "Sacred music meets modern stage",
  },
  {
    id: "2",
    src: "/placeholder.svg?height=1080&width=1920&text=Traditional+Regalia",
    alt: "Band members in traditional indigenous regalia",
    title: "SACRED TRADITIONS",
    subtitle: "Honoring our ancestors through music",
  },
  {
    id: "3",
    src: "/placeholder.svg?height=1080&width=1920&text=Recording+Studio",
    alt: "OKAMA recording in the studio",
    title: "IN THE STUDIO",
    subtitle: "Creating the Sacred Winds album",
  },
  {
    id: "4",
    src: "/placeholder.svg?height=1080&width=1920&text=Ceremonial+Drums",
    alt: "Traditional drums and ceremonial instruments",
    title: "SACRED INSTRUMENTS",
    subtitle: "Hand-crafted by indigenous artisans",
  },
]

export default function FullscreenSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [showNavigation, setShowNavigation] = useState(false)

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    // Resume auto-play after 15 seconds
    setTimeout(() => setIsAutoPlaying(true), 15000)
  }, [])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + sliderImages.length) % sliderImages.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 15000)
  }, [])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % sliderImages.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 15000)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevious()
      if (e.key === "ArrowRight") goToNext()
      if (e.key >= "1" && e.key <= "9") {
        const index = Number.parseInt(e.key) - 1
        if (index < sliderImages.length) goToSlide(index)
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [goToPrevious, goToNext, goToSlide])

  return (
    <section
      className="relative h-screen w-full overflow-hidden cursor-pointer"
      onMouseEnter={() => setShowNavigation(true)}
      onMouseLeave={() => setShowNavigation(false)}
    >
      {/* Full-screen Image Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${sliderImages[currentIndex].src})`,
            }}
          />

          {/* Subtle overlay for text readability */}
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay - Bottom Left */}
      <div className="absolute bottom-0 left-0 p-8 md:p-16 z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${currentIndex}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white"
          >
            {sliderImages[currentIndex].title && (
              <h2 className="text-4xl md:text-6xl font-bold mb-2 tracking-wider">{sliderImages[currentIndex].title}</h2>
            )}
            {sliderImages[currentIndex].subtitle && (
              <p className="text-lg md:text-xl text-gray-200 max-w-md">{sliderImages[currentIndex].subtitle}</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <AnimatePresence>
        {showNavigation && (
          <>
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              onClick={goToPrevious}
              className="absolute left-8 top-1/2 transform -translate-y-1/2 text-white hover:text-red-400 transition-colors duration-300 z-30"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-12 h-12" />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              onClick={goToNext}
              className="absolute right-8 top-1/2 transform -translate-y-1/2 text-white hover:text-red-400 transition-colors duration-300 z-30"
              aria-label="Next image"
            >
              <ChevronRight className="w-12 h-12" />
            </motion.button>
          </>
        )}
      </AnimatePresence>

      {/* Slide Indicators - Bottom Right */}
      <div className="absolute bottom-8 right-8 flex flex-col gap-3 z-20">
        {sliderImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-8 transition-all duration-300 ${
              index === currentIndex ? "bg-white" : "bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
        <motion.div
          key={`progress-${currentIndex}`}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 6, ease: "linear" }}
          className="h-full bg-white"
        />
      </div>

      {/* Slide Counter - Top Right */}
      <div className="absolute top-8 right-8 text-white text-sm tracking-wider z-20">
        <span className="text-2xl font-light">{String(currentIndex + 1).padStart(2, "0")}</span>
        <span className="text-white/60 mx-2">/</span>
        <span className="text-white/60">{String(sliderImages.length).padStart(2, "0")}</span>
      </div>

      {/* Auto-play indicator */}
      <AnimatePresence>
        {showNavigation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-8 left-8 text-white text-xs tracking-wider z-20"
          >
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? "bg-green-400" : "bg-gray-400"}`} />
              {isAutoPlaying ? "AUTO" : "MANUAL"}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
