"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { X, Play, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState("all");

  const galleryItems = [
    {
      id: 1,
      src: "/images/1.jpg",
      category: "events",
      title: "Red Rocks Performance",
    },
    {
      id: 2,
      src: "/images/2.jpg",
      category: "events",
      title: "Recording Sacred Winds",
    },
    {
      id: 3,
      src: "/images/3.jpg",
      category: "events",
      title: "Backstage Moments",
    },
    {
      id: 4,
      src: "/images/4.jpg",
      category: "concerts",
      title: "Chicago House of Blues",
    },
    {
      id: 5,
      src: "/images/5.jpg",
      category: "concerts",
      title: "Chicago House of Blues",
    },
    {
      id: 6,
      src: "/images/6.jpg",
      category: "concerts",
      title: "Chicago House of Blues",
    },
    {
      id: 7,
      src: "/images/7.jpg",
      category: "concerts",
      title: "Chicago House of Blues",
    },
    {
      id: 8,
      src: "/images/8.jpg",
      category: "concerts",
      title: "Chicago House of Blues",
    },
    {
      id: 9,
      src: "/images/9.jpg",
      category: "concerts",
      title: "Chicago House of Blues",
    },
    {
      id: 10,
      src: "/images/10.jpg",
      category: "concerts",
      title: "Chicago House of Blues",
    },
    {
      id: 11,
      src: "/images/11.jpg",
      category: "concerts",
      title: "Chicago House of Blues",
    },
    {
      id: 12,
      src: "/images/12.jpg",
      category: "concerts",
      title: "Chicago House of Blues",
    },
    {
      id: 13,
      src: "/images/13.jpg",
      category: "concerts",
      title: "Chicago House of Blues",
    },
    {
      id: 14,
      src: "/images/14.jpg",
      category: "concerts",
      title: "Chicago House of Blues",
    },
    {
      id: 15,
      src: "/images/15.jpg",
      category: "concerts",
      title: "Chicago House of Blues",
    },
    {
      id: 16,
      src: "/images/16.jpg",
      category: "concerts",
      title: "Chicago House of Blues",
    },
    {
      id: 17,
      src: "/images/17.jpg",
      category: "concerts",
      title: "Chicago House of Blues",
    },
    {
      id: 18,
      src: "/images/18.jpg",
      category: "concerts",
      title: "Chicago House of Blues",
    },
    {
      id: 19,
      src: "/images/19.jpg",
      category: "concerts",
      title: "Chicago House of Blues",
    },
    {
      id: 20,
      src: "/images/20.jpg",
      category: "concerts",
      title: "Chicago House of Blues",
    },
    {
      id: 21,
      src: "/images/21.jpg",
      category: "concerts",
      title: "Chicago House of Blues",
    },
    {
      id: 22,
      src: "/images/22.jpg",
      category: "concerts",
      title: "Chicago House of Blues",
    },
    {
      id: 23,
      src: "/images/23.jpg",
      category: "concerts",
      title: "Chicago House of Blues",
    },
    {
      id: 24,
      src: "/images/24.jpg",
      category: "concerts",
      title: "Chicago House of Blues",
    },
    {
      id: 25,
      src: "/images/25.jpg",
      category: "concerts",
      title: "Chicago House of Blues",
    },
    {
      id: 26,
      src: "/images/26.jpg",
      category: "concerts",
      title: "Chicago House of Blues",
    },
    {
      id: 27,
      src: "/images/27.jpg",
      category: "concerts",
      title: "Chicago House of Blues",
    },
    {
      id: 28,
      src: "/images/28.jpg",
      category: "concerts",
      title: "Chicago House of Blues",
    },
    {
      id: 29,
      src: "/images/29.jpg",
      category: "concerts",
      title: "Chicago House of Blues",
    },
    {
      id: 30,
      src: "/images/30.jpg",
      category: "concerts",
      title: "Chicago House of Blues",
    },
    {
      id: 31,
      src: "/images/31.jpg",
      category: "concerts",
      title: "Chicago House of Blues",
    },
    {
      id: 32,
      src: "/images/32.jpg",
      category: "concerts",
      title: "Chicago House of Blues",
    },
    {
      id: 33,
      src: "/images/33.jpg",
      category: "concerts",
      title: "Chicago House of Blues",
    },
    {
      id: 34,
      src: "/images/34.jpg",
      category: "concerts",
      title: "Chicago House of Blues",
    },
    {
      id: 35,
      src: "/images/35.jpg",
      category: "concerts",
      title: "Chicago House of Blues",
    },
  ];

  const categories = [
    { id: "all", label: "All Photos" },
    { id: "concerts", label: "Live Concerts" },
    { id: "backstage", label: "Backstage" },
    { id: "portraits", label: "Portraits" },
    { id: "videos", label: "Music Videos" },
    { id: "events", label: "Events" },
  ];

  const filteredItems =
    filter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === filter);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <section className="pt-24 pb-12 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              PHOTO <span className="text-pink-500">GALLERY</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Capturing the sacred moments, powerful performances, and
              behind-the-scenes memories of our musical journey
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setFilter(category.id)}
                variant={filter === category.id ? "default" : "outline"}
                className={`${
                  filter === category.id
                    ? "bg-pink-500 hover:bg-pink-600 text-white"
                    : "border-gray-600 text-gray-300 hover:border-pink-500 hover:text-pink-500"
                }`}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer relative overflow-hidden rounded-lg bg-gray-800"
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={item.src || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white font-semibold">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={filteredItems[selectedImage].src || "/placeholder.svg"}
              alt={filteredItems[selectedImage].title}
              className="max-w-full max-h-full object-contain"
            />
            <Button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70"
              size="sm"
            >
              <X size={20} />
            </Button>
            <div className="absolute bottom-4 left-4 right-4 bg-black/70 rounded-lg p-4">
              <h3 className="text-white font-semibold text-lg">
                {filteredItems[selectedImage].title}
              </h3>
            </div>
          </div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}
