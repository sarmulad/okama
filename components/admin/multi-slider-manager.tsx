"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Edit, Trash2, Eye, Plus, Upload, Monitor, Tablet, Smartphone } from "lucide-react"

interface SliderImage {
  id: string
  src: string
  alt: string
  title?: string
  subtitle?: string
}

export default function MultiSliderManager() {
  const [images, setImages] = useState<SliderImage[]>([
    {
      id: "1",
      src: "/placeholder.svg?height=600&width=800",
      alt: "OKAMA live performance",
      title: "LIVE IN CONCERT",
      subtitle: "Sacred music meets modern stage",
    },
    {
      id: "2",
      src: "/placeholder.svg?height=600&width=800",
      alt: "Traditional regalia",
      title: "SACRED TRADITIONS",
      subtitle: "Honoring our ancestors through music",
    },
    {
      id: "3",
      src: "/placeholder.svg?height=600&width=800",
      alt: "Recording studio",
      title: "IN THE STUDIO",
      subtitle: "Creating the Sacred Winds album",
    },
  ])

  const [selectedDevice, setSelectedDevice] = useState<"desktop" | "tablet" | "mobile">("desktop")

  const getVisibleCount = () => {
    switch (selectedDevice) {
      case "desktop":
        return 3
      case "tablet":
        return 2
      case "mobile":
        return 1
      default:
        return 3
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Multi-Image Slider Manager</h1>
            <p className="text-gray-400">Manage your responsive image carousel</p>
          </div>
          <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
            <Plus className="w-5 h-5" />
            Add New Image
          </button>
        </div>

        {/* Device Preview Selector */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Responsive Preview</h2>
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setSelectedDevice("desktop")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                selectedDevice === "desktop" ? "bg-red-600" : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              <Monitor className="w-4 h-4" />
              Desktop (3 images)
            </button>
            <button
              onClick={() => setSelectedDevice("tablet")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                selectedDevice === "tablet" ? "bg-red-600" : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              <Tablet className="w-4 h-4" />
              Tablet (2 images)
            </button>
            <button
              onClick={() => setSelectedDevice("mobile")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                selectedDevice === "mobile" ? "bg-red-600" : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              <Smartphone className="w-4 h-4" />
              Mobile (1 image)
            </button>
          </div>

          {/* Preview */}
          <div className="bg-black p-4 rounded-lg">
            <div
              className={`grid gap-4 ${
                selectedDevice === "desktop"
                  ? "grid-cols-3"
                  : selectedDevice === "tablet"
                    ? "grid-cols-2"
                    : "grid-cols-1"
              }`}
            >
              {images.slice(0, getVisibleCount()).map((image, index) => (
                <div key={image.id} className="aspect-[4/3] relative rounded-lg overflow-hidden group">
                  <img src={image.src || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-bold text-sm">{image.title}</h3>
                    <p className="text-xs text-gray-300">{image.subtitle}</p>
                  </div>
                  <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Multi-Image Slider Setup
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3 text-gray-300">
              <p>
                <strong>Responsive Behavior:</strong>
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                <li>Desktop (1280px+): Shows 3 images side by side</li>
                <li>Tablet (768px-1279px): Shows 2 images side by side</li>
                <li>Mobile (below 768px): Shows 1 image at a time</li>
                <li>Auto-advances every 4 seconds</li>
                <li>Smooth transitions between image groups</li>
              </ul>

              <p>
                <strong>Image Specifications:</strong>
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                <li>Aspect ratio: 4:3 (800x600px recommended)</li>
                <li>Format: JPG or PNG</li>
                <li>File size: 1-3MB for optimal loading</li>
                <li>High quality images work best</li>
              </ul>
            </div>

            <div className="space-y-3 text-gray-300">
              <p>
                <strong>Interactive Features:</strong>
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                <li>Hover effects with play button overlay</li>
                <li>Navigation arrows for manual control</li>
                <li>Dot indicators for direct navigation</li>
                <li>Progress bar showing auto-advance timing</li>
                <li>Image numbering and total count</li>
              </ul>

              <p>
                <strong>File Structure:</strong>
              </p>
              <div className="bg-gray-900 p-3 rounded text-xs overflow-x-auto">
                <pre>{`public/
├── images/
│   ├── slider/
│   │   ├── image-1.jpg
│   │   ├── image-2.jpg
│   │   └── image-3.jpg`}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* Current Images Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 rounded-lg overflow-hidden group"
            >
              <div className="aspect-[4/3] relative">
                <img src={image.src || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                  <button className="bg-white/20 hover:bg-white/30 p-2 rounded transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="bg-white/20 hover:bg-white/30 p-2 rounded transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="bg-red-600/50 hover:bg-red-600/70 p-2 rounded transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{image.title || "Untitled"}</h3>
                <p className="text-gray-400 text-sm mb-2">{image.subtitle || "No subtitle"}</p>
                <p className="text-xs text-gray-500">Alt: {image.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
