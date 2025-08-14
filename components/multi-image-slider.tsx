"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"

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
    src: "/placeholder.svg?height=600&width=800&text=OKAMA+Live+Performance",
    alt: "OKAMA performing live on stage with traditional instruments",
    title: "LIVE IN CONCERT",
    subtitle: "Sacred music meets modern stage",
  },
  {
    id: "2",
    src: "/placeholder.svg?height=600&width=800&text=Traditional+Regalia",
    alt: "Band members in traditional indigenous regalia",
    title: "SACRED TRADITIONS",
    subtitle: "Honoring our ancestors through music",
  },
  {
    id: "3",
    src: "/placeholder.svg?height=600&width=800&text=Recording+Studio",
    alt: "OKAMA recording in the studio",
    title: "IN THE STUDIO",
    subtitle: "Creating the Sacred Winds album",
  },
  {
    id: "4",
    src: "/placeholder.svg?height=600&width=800&text=Ceremonial+Drums",
    alt: "Traditional drums and ceremonial instruments",
    title: "SACRED INSTRUMENTS",
    subtitle: "Hand-crafted by indigenous artisans",
  },
  {
    id: "5",
    src: "/placeholder.svg?height=600&width=800&text=Band+Portrait",
    alt: "OKAMA band members group portrait",
    title: "THE BAND",
    subtitle: "Five voices, one sacred mission",
  },
  {
    id: "6",
    src: "/placeholder.svg?height=600&width=800&text=Outdoor+Ceremony",
    alt: "Outdoor ceremonial performance",
    title: "SACRED CEREMONY",
    subtitle: "Music under the open sky",
  },
]

export default function MultiImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Get number of visible images based on screen size
  const getVisibleCount = () => {
    if (typeof window === "undefined") return 3
    if (window.innerWidth >= 1280) return 3 // xl screens
    if (window.innerWidth >= 768) return 2 // md screens
    return 1 // sm screens
  }

  const [visibleCount, setVisibleCount] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount())
    }

    handleResize() // Set initial value
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = sliderImages.length - visibleCount
        return prev >= maxIndex ? 0 : prev + 1
      })
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, visibleCount])

  const goToSlide = useCallback(
    (index: number) => {
      const maxIndex = sliderImages.length - visibleCount
      setCurrentIndex(Math.min(index, maxIndex))
      setIsAutoPlaying(false)
      setTimeout(() => setIsAutoPlaying(true), 10000)
    },
    [visibleCount],
  )

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => {
      const maxIndex = sliderImages.length - visibleCount
      return prev <= 0 ? maxIndex : prev - 1
    })
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }, [visibleCount])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => {
      const maxIndex = sliderImages.length - visibleCount
      return prev >= maxIndex ? 0 : prev + 1
    })
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }, [visibleCount])

  const getVisibleImages = () => {
    return sliderImages.slice(currentIndex, currentIndex + visibleCount)
  }

  return (
    <section className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            SACRED MOMENTS
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Journey through our most powerful performances and sacred traditions
          </motion.p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
            aria-label="Previous images"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
            aria-label="Next images"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Images Container */}
          <div className="overflow-hidden rounded-lg">
            <motion.div className="flex gap-4" animate={{ x: 0 }} transition={{ duration: 0.8, ease: "easeInOut" }}>
              <AnimatePresence mode="wait">
                {getVisibleImages().map((image, index) => (
                  <motion.div
                    key={`${image.id}-${currentIndex}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`relative group cursor-pointer ${
                      visibleCount === 3 ? "flex-1" : visibleCount === 2 ? "w-1/2" : "w-full"
                    }`}
                    onMouseEnter={() => setHoveredIndex(currentIndex + index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Image */}
                    <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
                      <img
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full transform scale-90 group-hover:scale-100 transition-transform duration-300">
                          <Play className="w-8 h-8 ml-1" />
                        </div>
                      </div>

                      {/* Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{
                            opacity: hoveredIndex === currentIndex + index ? 1 : 0.8,
                            y: hoveredIndex === currentIndex + index ? 0 : 10,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {image.title && (
                            <h3 className="text-xl md:text-2xl font-bold mb-2 tracking-wide">{image.title}</h3>
                          )}
                          {image.subtitle && <p className="text-gray-300 text-sm md:text-base">{image.subtitle}</p>}
                        </motion.div>
                      </div>

                      {/* Image Number */}
                      <div className="absolute top-4 left-4 bg-black/50 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm">
                        {String(currentIndex + index + 1).padStart(2, "0")}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: Math.ceil(sliderImages.length / visibleCount) }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index * visibleCount)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  Math.floor(currentIndex / visibleCount) === index
                    ? "bg-red-600 scale-110"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`Go to slide group ${index + 1}`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-6 max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>
                {String(currentIndex + 1).padStart(2, "0")} -{" "}
                {String(Math.min(currentIndex + visibleCount, sliderImages.length)).padStart(2, "0")}
              </span>
              <span>of {String(sliderImages.length).padStart(2, "0")}</span>
            </div>
            <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
              <motion.div
                key={`progress-${currentIndex}`}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 4, ease: "linear" }}
                className="h-full bg-red-600"
              />
            </div>
          </div>

          {/* Auto-play Status */}
          <div className="text-center mt-4">
            <div className="inline-flex items-center gap-2 text-sm text-gray-400">
              <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? "bg-green-400" : "bg-gray-400"}`} />
              {isAutoPlaying ? "Auto-playing" : "Paused"}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
