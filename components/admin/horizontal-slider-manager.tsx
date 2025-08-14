"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Edit, Trash2, Eye, Plus, Upload, ArrowLeft, ArrowRight } from "lucide-react"

interface SliderImage {
  id: string
  src: string
  alt: string
  title?: string
  subtitle?: string
}

export default function HorizontalSliderManager() {
  const [images, setImages] = useState<SliderImage[]>([
    {
      id: "1",
      src: "/placeholder.svg?height=400&width=600",
      alt: "OKAMA live performance",
      title: "LIVE IN CONCERT",
      subtitle: "Sacred music meets modern stage",
    },
    {
      id: "2",
      src: "/placeholder.svg?height=400&width=600",
      alt: "Traditional regalia",
      title: "SACRED TRADITIONS",
      subtitle: "Honoring our ancestors through music",
    },
    {
      id: "3",
      src: "/placeholder.svg?height=400&width=600",
      alt: "Recording studio",
      title: "IN THE STUDIO",
      subtitle: "Creating the Sacred Winds album",
    },
    {
      id: "4",
      src: "/placeholder.svg?height=400&width=600",
      alt: "Sacred instruments",
      title: "SACRED INSTRUMENTS",
      subtitle: "Hand-crafted by indigenous artisans",
    },
  ])

  const [previewIndex, setPreviewIndex] = useState(0)

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Horizontal Image Slider Manager</h1>
            <p className="text-gray-400">Manage your horizontal scrolling image carousel</p>
          </div>
          <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
            <Plus className="w-5 h-5" />
            Add New Image
          </button>
        </div>

        {/* Live Preview */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
          <div className="bg-black p-4 rounded-lg overflow-hidden">
            <div
              className="flex gap-6"
              style={{ transform: `translateX(-${previewIndex * 424}px)`, transition: "transform 0.5s ease" }}
            >
              {images.map((image, index) => (
                <div key={image.id} className="flex-shrink-0" style={{ width: "400px" }}>
                  <div className="aspect-[3/2] relative rounded-xl overflow-hidden group">
                    <img src={image.src || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-bold text-lg">{image.title}</h3>
                      <p className="text-sm text-gray-300">{image.subtitle}</p>
                    </div>
                    <div className="absolute top-4 left-4 bg-black/60 text-white text-sm px-3 py-1 rounded-full">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    {previewIndex === index && (
                      <div className="absolute top-4 right-4 w-3 h-3 bg-red-600 rounded-full" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preview Controls */}
          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              onClick={() => setPreviewIndex(Math.max(0, previewIndex - 1))}
              disabled={previewIndex === 0}
              className="bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <span className="text-sm text-gray-400">
              {previewIndex + 1} of {images.length}
            </span>

            <button
              onClick={() => setPreviewIndex(Math.min(images.length - 1, previewIndex + 1))}
              disabled={previewIndex === images.length - 1}
              className="bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded-lg transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Horizontal Slider Setup
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3 text-gray-300">
              <p>
                <strong>Slider Behavior:</strong>
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                <li>Images slide horizontally one at a time</li>
                <li>Partial images visible on sides create preview effect</li>
                <li>Image size determines how many fit on screen</li>
                <li>Smooth spring animations between slides</li>
                <li>Auto-advances every 4 seconds</li>
                <li>Click any image to jump to it</li>
              </ul>

              <p>
                <strong>Image Specifications:</strong>
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                <li>Aspect ratio: 3:2 (600x400px recommended)</li>
                <li>Width: 400px (determines spacing)</li>
                <li>Format: JPG or PNG</li>
                <li>File size: 1-2MB for optimal loading</li>
                <li>High quality images work best</li>
              </ul>
            </div>

            <div className="space-y-3 text-gray-300">
              <p>
                <strong>Interactive Features:</strong>
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                <li>Hover effects with scale and play button</li>
                <li>Navigation arrows for manual control</li>
                <li>Dot indicators for direct navigation</li>
                <li>Progress bar showing auto-advance timing</li>
                <li>Active image highlighting</li>
                <li>Click-to-navigate functionality</li>
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
              <div className="aspect-[3/2] relative">
                <img src={image.src || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setPreviewIndex(index)}
                    className="bg-white/20 hover:bg-white/30 p-2 rounded transition-colors"
                  >
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
