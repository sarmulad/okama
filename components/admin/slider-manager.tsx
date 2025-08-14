"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Edit, Trash2, Eye, Plus } from "lucide-react"

interface SliderImage {
  id: string
  src: string
  alt: string
  title?: string
  description?: string
}

export default function SliderManager() {
  const [images, setImages] = useState<SliderImage[]>([
    {
      id: "1",
      src: "/placeholder.svg?height=300&width=400",
      alt: "OKAMA band members",
      title: "Sacred Circle",
      description: "The complete OKAMA ensemble",
    },
  ])

  const [editingImage, setEditingImage] = useState<SliderImage | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Image Slider Manager</h1>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add New Image
          </button>
        </div>

        {/* Instructions */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">How to Add Images to Slider</h2>
          <div className="space-y-3 text-gray-300">
            <p>
              <strong>Step 1:</strong> Add your images to the{" "}
              <code className="bg-gray-700 px-2 py-1 rounded">public/images/slider/</code> folder
            </p>
            <p>
              <strong>Step 2:</strong> Recommended image specs:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Resolution: 1200x800px or higher</li>
              <li>Aspect ratio: 3:2 (landscape)</li>
              <li>Format: JPG or PNG</li>
              <li>File size: Under 2MB for optimal loading</li>
            </ul>
            <p>
              <strong>Step 3:</strong> Update the slider images array in{" "}
              <code className="bg-gray-700 px-2 py-1 rounded">components/image-slider.tsx</code>
            </p>
          </div>
        </div>

        {/* Current Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 rounded-lg overflow-hidden"
            >
              <div className="aspect-video relative">
                <img src={image.src || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 flex gap-2">
                  <button className="bg-black/50 hover:bg-black/70 p-2 rounded transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setEditingImage(image)}
                    className="bg-black/50 hover:bg-black/70 p-2 rounded transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="bg-red-600/50 hover:bg-red-600/70 p-2 rounded transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">{image.title}</h3>
                <p className="text-gray-400 text-sm mb-2">{image.description}</p>
                <p className="text-xs text-gray-500">Alt: {image.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Code Example */}
        <div className="mt-12 bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Example Code Structure</h3>
          <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
            <code>{`const sliderImages: SliderImage[] = [
  {
    id: "1",
    src: "/images/slider/band-group-photo.jpg",
    alt: "OKAMA band members in traditional regalia",
    title: "Sacred Circle",
    description: "The complete OKAMA ensemble in ceremonial dress"
  },
  {
    id: "2",
    src: "/images/slider/performance-shot.jpg", 
    alt: "Lead vocalist performing",
    title: "Voice of the Ancestors",
    description: "Channeling ancient wisdom through modern sound"
  }
  // Add more images here...
]`}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
