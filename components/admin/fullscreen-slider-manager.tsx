"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Edit, Trash2, Eye, Plus, Upload } from "lucide-react"

interface SliderImage {
  id: string
  src: string
  alt: string
  title?: string
  subtitle?: string
}

export default function FullscreenSliderManager() {
  const [images, setImages] = useState<SliderImage[]>([
    {
      id: "1",
      src: "/placeholder.svg?height=600&width=800",
      alt: "OKAMA live performance",
      title: "LIVE IN CONCERT",
      subtitle: "Sacred music meets modern stage",
    },
  ])

  const [editingImage, setEditingImage] = useState<SliderImage | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Fullscreen Slider Manager</h1>
            <p className="text-gray-400">Manage your Adele-style fullscreen image slider</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add New Image
          </button>
        </div>

        {/* Instructions */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Upload className="w-5 h-5" />
            How to Add Fullscreen Images
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3 text-gray-300">
              <p>
                <strong>Step 1:</strong> Prepare your images
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                <li>Resolution: 1920x1080px (Full HD) minimum</li>
                <li>Aspect ratio: 16:9 (landscape)</li>
                <li>Format: JPG (recommended for photos)</li>
                <li>File size: 2-5MB for optimal loading</li>
                <li>High quality, professional images work best</li>
              </ul>

              <p>
                <strong>Step 2:</strong> Add to project
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                <li>
                  Save images in <code className="bg-gray-700 px-1 rounded">public/images/slider/</code>
                </li>
                <li>Use descriptive filenames (e.g., "live-performance.jpg")</li>
              </ul>
            </div>

            <div className="space-y-3 text-gray-300">
              <p>
                <strong>Step 3:</strong> Update the slider array
              </p>
              <div className="bg-gray-900 p-3 rounded text-xs overflow-x-auto">
                <pre>{`const sliderImages = [
  {
    id: "1",
    src: "/images/slider/your-image.jpg",
    alt: "Descriptive alt text",
    title: "MAIN TITLE",
    subtitle: "Supporting description"
  }
]`}</pre>
              </div>

              <p>
                <strong>Features:</strong>
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                <li>Auto-advance every 6 seconds</li>
                <li>Keyboard navigation (arrow keys, 1-4)</li>
                <li>Mouse hover reveals controls</li>
                <li>Progress bar shows timing</li>
                <li>Slide counter in top-right</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Current Images */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 rounded-lg overflow-hidden group"
            >
              <div className="aspect-video relative">
                <img src={image.src || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                  <button className="bg-white/20 hover:bg-white/30 p-2 rounded transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setEditingImage(image)}
                    className="bg-white/20 hover:bg-white/30 p-2 rounded transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="bg-red-600/50 hover:bg-red-600/70 p-2 rounded transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Slide number indicator */}
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

        {/* Style Guide */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Adele-Style Design Features</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-300">
            <div>
              <h4 className="font-medium text-white mb-2">Visual Design:</h4>
              <ul className="space-y-1">
                <li>• Full viewport height (100vh)</li>
                <li>• Smooth crossfade transitions</li>
                <li>• Minimal, clean interface</li>
                <li>• Content positioned bottom-left</li>
                <li>• Subtle navigation on hover</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">Interactions:</h4>
              <ul className="space-y-1">
                <li>• Auto-advance with progress bar</li>
                <li>• Keyboard navigation support</li>
                <li>• Vertical slide indicators</li>
                <li>• Pause on user interaction</li>
                <li>• Smooth scaling animations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
