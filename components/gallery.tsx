"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Define image type
interface TourImage {
  id: number;
  src: string;
  alt: string;
}

const tourImages: TourImage[] = [
  { id: 1, src: "/images/tour/1.jpg", alt: "OKAMA Tour - Performance 1" },
  { id: 2, src: "/images/tour/2.jpg", alt: "OKAMA Tour - Performance 2" },
  { id: 3, src: "/images/tour/3.jpg", alt: "OKAMA Tour - Performance 3" },
  { id: 4, src: "/images/tour/4.jpg", alt: "OKAMA Tour - Performance 4" },
  { id: 5, src: "/images/tour/5.jpg", alt: "OKAMA Tour - Performance 5" },
  { id: 6, src: "/images/tour/6.jpg", alt: "OKAMA Tour - Performance 6" },
  { id: 7, src: "/images/tour/7.jpg", alt: "OKAMA Tour - Performance 7" },
  { id: 8, src: "/images/tour/8.jpg", alt: "OKAMA Tour - Performance 8" },
  { id: 9, src: "/images/tour/9.jpg", alt: "OKAMA Tour - Performance 9" },
  { id: 10, src: "/images/tour/10.jpg", alt: "OKAMA Tour - Performance 10" },
  { id: 11, src: "/images/tour/11.jpg", alt: "OKAMA Tour - Performance 11" },
  { id: 12, src: "/images/tour/12.jpg", alt: "OKAMA Tour - Performance 12" },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<TourImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (imageIndex) => {
    setCurrentIndex(imageIndex);
    setSelectedImage(tourImages[imageIndex]);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    const newIndex =
      currentIndex > 0 ? currentIndex - 1 : tourImages.length - 1;
    setCurrentIndex(newIndex);
    setSelectedImage(tourImages[newIndex]);
  };

  const goToNext = () => {
    const newIndex =
      currentIndex < tourImages.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    setSelectedImage(tourImages[newIndex]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") goToPrevious();
    if (e.key === "ArrowRight") goToNext();
  };

  return (
    <>
      <section
        id="gallery"
        className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
      >
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 relative"
          >
            {/* Decorative Native Border */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent" />

            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              TOUR MEMORIES
            </h2>
            <p className="text-gray-400 text-lg">
              Capturing moments of worship and connection
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tourImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
                onClick={() => openModal(index)}
              >
                <div className="absolute -inset-1 border-2 border-amber-600/20 rounded-lg group-hover:border-pink-500/40 transition-colors duration-300" />

                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "/placeholder.svg";
                  }}
                />

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center mb-2 mx-auto">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                        />
                      </svg>
                    </div>
                    {/* <p className="text-sm font-medium">Click to expand</p> */}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Native Pattern Section Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-amber-600/30 to-transparent" />
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X size={32} />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2 hover:bg-black/70"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2 hover:bg-black/70"
            >
              <ChevronRight size={24} />
            </button>

            {/* Image Counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
              {currentIndex + 1} / {tourImages.length}
            </div>

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-6xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-full object-contain rounded-lg shadow-2xl"
                onError={(e) => {
                  e.target.src = "/placeholder.svg";
                }}
              />

              {/* Image Caption */}
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <div className="bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-lg inline-block">
                  <p className="font-medium">{selectedImage.alt}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
