"use client"

import type React from "react"

import { useState } from "react"
import { Save, Trash2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/shop-data"

interface ProductEditorProps {
  product?: Product
  onSave: (product: Product) => void
  onDelete?: (productId: string) => void
}

export default function ProductEditor({ product, onSave, onDelete }: ProductEditorProps) {
  const [formData, setFormData] = useState<Partial<Product>>(
    product || {
      name: "",
      price: 0,
      category: "music",
      description: "",
      inventory: 0,
      featured: false,
      image: "",
    },
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.price) {
      onSave(formData as Product)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you'd upload to a service like Cloudinary or AWS S3
      const imageUrl = URL.createObjectURL(file)
      setFormData({ ...formData, image: imageUrl })
    }
  }

  return (
    <Card className="bg-gray-800 border-amber-600/30">
      <CardHeader>
        <CardTitle className="text-pink-500">{product ? "Edit Product" : "Add New Product"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Image */}
          <div>
            <label className="block text-sm font-medium mb-2">Product Image</label>
            <div className="flex items-center space-x-4">
              {formData.image && (
                <img
                  src={formData.image || "/placeholder.svg"}
                  alt="Product preview"
                  className="w-20 h-20 object-cover rounded"
                />
              )}
              <div>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                  <Upload size={16} />
                  <span>Upload Image</span>
                </label>
              </div>
            </div>
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Product Name</label>
            <input
              type="text"
              value={formData.name || ""}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-pink-500"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={formData.category || "music"}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-pink-500"
            >
              <option value="music">Music</option>
              <option value="apparel">Apparel</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>

          {/* Price */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Price ($)</label>
              <input
                type="number"
                step="0.01"
                value={formData.price || ""}
                onChange={(e) => setFormData({ ...formData, price: Number.parseFloat(e.target.value) })}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-pink-500"
                placeholder="0.00"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Original Price ($) - Optional</label>
              <input
                type="number"
                step="0.01"
                value={formData.originalPrice || ""}
                onChange={(e) =>
                  setFormData({ ...formData, originalPrice: Number.parseFloat(e.target.value) || undefined })
                }
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-pink-500"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Inventory */}
          <div>
            <label className="block text-sm font-medium mb-2">Inventory</label>
            <input
              type="number"
              value={formData.inventory || ""}
              onChange={(e) => setFormData({ ...formData, inventory: Number.parseInt(e.target.value) })}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-pink-500"
              placeholder="0"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-pink-500 h-24 resize-none"
              placeholder="Enter product description"
            />
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured || false}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 text-pink-500 bg-gray-700 border-gray-600 rounded focus:ring-pink-500"
            />
            <label htmlFor="featured" className="text-sm font-medium">
              Featured Product
            </label>
            {formData.featured && <Badge className="bg-amber-600">Featured</Badge>}
          </div>

          {/* Stripe IDs (for advanced users) */}
          <details className="bg-gray-700/50 rounded-lg p-4">
            <summary className="cursor-pointer text-sm font-medium mb-2">Stripe Configuration (Advanced)</summary>
            <div className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-medium mb-2">Stripe Product ID</label>
                <input
                  type="text"
                  value={formData.stripeProductId || ""}
                  onChange={(e) => setFormData({ ...formData, stripeProductId: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-pink-500"
                  placeholder="prod_..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Stripe Price ID</label>
                <input
                  type="text"
                  value={formData.stripePriceId || ""}
                  onChange={(e) => setFormData({ ...formData, stripePriceId: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-pink-500"
                  placeholder="price_..."
                />
              </div>
            </div>
          </details>

          {/* Action Buttons */}
          <div className="flex justify-between pt-6">
            <div>
              {onDelete && product && (
                <Button
                  type="button"
                  onClick={() => onDelete(product.id)}
                  variant="destructive"
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Trash2 size={16} className="mr-2" />
                  Delete Product
                </Button>
              )}
            </div>
            <Button
              type="submit"
              className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700"
            >
              <Save size={16} className="mr-2" />
              {product ? "Update Product" : "Add Product"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
