"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { ArrowLeft, ShoppingCart, Heart, Share2, Star, Truck, Shield, RotateCcw, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Toast from "@/components/toast-notification"
import { useCart } from "@/contexts/cart-context"
import { getProductById, getAllProducts } from "@/lib/product-manager"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string
  const [product, setProduct] = useState<any>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("")
  const [wishlist, setWishlist] = useState<string[]>([])
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])

  const { addItem } = useCart()
  const { toasts, showToast, removeToast } = useToast()

  useEffect(() => {
    if (productId) {
      const foundProduct = getProductById(productId)
      setProduct(foundProduct)

      if (foundProduct) {
        // Get related products from same category
        const allProducts = getAllProducts()
        const related = allProducts
          .filter((p) => p.category === foundProduct.category && p.id !== foundProduct.id)
          .slice(0, 4)
        setRelatedProducts(related)
      }
    }
  }, [productId])

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-xl">Loading product...</p>
        </div>
      </div>
    )
  }

  const productImages = [
    product.image || "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ]

  const handleAddToCart = () => {
    try {
      const productToAdd = {
        ...product,
        selectedSize,
        quantity,
      }

      for (let i = 0; i < quantity; i++) {
        addItem(productToAdd)
      }

      showToast(`${quantity} x ${product.name} added to cart!`, "success")
    } catch (error) {
      showToast("Failed to add item to cart", "error")
    }
  }

  const toggleWishlist = () => {
    if (wishlist.includes(product.id)) {
      setWishlist(wishlist.filter((id) => id !== product.id))
      showToast("Removed from wishlist", "info")
    } else {
      setWishlist([...wishlist, product.id])
      showToast("Added to wishlist", "success")
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      showToast("Product link copied to clipboard!", "success")
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Toast Notifications */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          isVisible={true}
          onClose={() => removeToast(toast.id)}
        />
      ))}

      {/* Breadcrumb */}
      <section className="pt-24 pb-8 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-sm text-gray-400"
          >
            <Link href="/shop" className="hover:text-pink-500 transition-colors flex items-center">
              <ArrowLeft size={16} className="mr-1" />
              Back to Shop
            </Link>
            <span>/</span>
            <span className="capitalize">{product.category}</span>
            <span>/</span>
            <span className="text-white">{product.name}</span>
          </motion.div>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-12 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative aspect-square bg-gray-800 rounded-lg overflow-hidden">
                  <img
                    src={productImages[selectedImage] || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.featured && <Badge className="absolute top-4 left-4 bg-amber-600">Featured</Badge>}
                  {product.originalPrice && (
                    <Badge className="absolute top-4 right-4 bg-red-500">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </Badge>
                  )}
                </div>

                {/* Thumbnail Images */}
                <div className="grid grid-cols-4 gap-2">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square bg-gray-800 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? "border-pink-500" : "border-transparent hover:border-gray-600"
                      }`}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {/* Category & Rating */}
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="capitalize border-amber-600 text-amber-600">
                  {product.category}
                </Badge>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="text-amber-500 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">(4.8) 124 reviews</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-pink-500">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                {product.inventory > 0 ? (
                  <>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-green-400">In Stock ({product.inventory} available)</span>
                  </>
                ) : (
                  <>
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-red-400">Out of Stock</span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-300 leading-relaxed">{product.description}</p>

              {/* Size Selection (for apparel) */}
              {product.category === "apparel" && (
                <div>
                  <h3 className="font-semibold mb-3">Size</h3>
                  <div className="flex gap-2">
                    {["S", "M", "L", "XL"].map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 border-2 rounded-lg font-semibold transition-colors ${
                          selectedSize === size
                            ? "border-pink-500 bg-pink-500 text-white"
                            : "border-gray-600 hover:border-gray-500"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h3 className="font-semibold mb-3">Quantity</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-600 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-gray-700 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.inventory, quantity + 1))}
                      className="p-2 hover:bg-gray-700 transition-colors"
                      disabled={quantity >= product.inventory}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <span className="text-gray-400">
                    Total: <span className="text-pink-500 font-bold">${(product.price * quantity).toFixed(2)}</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 py-3"
                  disabled={product.inventory === 0 || (product.category === "apparel" && !selectedSize)}
                >
                  <ShoppingCart size={20} className="mr-2" />
                  Add to Cart
                </Button>
                <Button
                  onClick={toggleWishlist}
                  variant="outline"
                  className="border-gray-600 hover:border-pink-500 bg-transparent"
                >
                  <Heart size={20} fill={wishlist.includes(product.id) ? "currentColor" : "none"} />
                </Button>
                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="border-gray-600 hover:border-pink-500 bg-transparent"
                >
                  <Share2 size={20} />
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-700">
                <div className="text-center">
                  <Truck className="mx-auto mb-2 text-green-500" size={24} />
                  <p className="text-sm text-gray-400">Free Shipping</p>
                  <p className="text-xs text-gray-500">Orders over $50</p>
                </div>
                <div className="text-center">
                  <Shield className="mx-auto mb-2 text-blue-500" size={24} />
                  <p className="text-sm text-gray-400">Secure Payment</p>
                  <p className="text-xs text-gray-500">SSL Protected</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="mx-auto mb-2 text-purple-500" size={24} />
                  <p className="text-sm text-gray-400">Easy Returns</p>
                  <p className="text-xs text-gray-500">30-day policy</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-12 bg-gray-900">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-800">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews (124)</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Product Description</h3>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 leading-relaxed mb-4">{product.description}</p>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      This premium product represents the highest quality in our collection, crafted with attention to
                      detail and designed to last. Each item supports our mission of bringing indigenous music and
                      culture to modern audiences.
                    </p>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Premium materials and construction</li>
                      <li>• Authentic indigenous-inspired designs</li>
                      <li>• Supports OKAMA's musical mission</li>
                      <li>• Limited edition availability</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Specifications</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Product Details</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li>
                          <span className="text-gray-400">Category:</span> {product.category}
                        </li>
                        <li>
                          <span className="text-gray-400">SKU:</span> {product.id}
                        </li>
                        <li>
                          <span className="text-gray-400">Weight:</span> 0.5 lbs
                        </li>
                        <li>
                          <span className="text-gray-400">Dimensions:</span> 12" x 8" x 2"
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Care Instructions</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li>• Handle with care</li>
                        <li>• Store in cool, dry place</li>
                        <li>• Clean with soft cloth</li>
                        <li>• Avoid direct sunlight</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
                  <div className="space-y-6">
                    {[1, 2, 3].map((review) => (
                      <div key={review} className="border-b border-gray-700 pb-4">
                        <div className="flex items-center gap-4 mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={14} className="text-amber-500 fill-current" />
                            ))}
                          </div>
                          <span className="font-semibold">John D.</span>
                          <span className="text-gray-400 text-sm">2 weeks ago</span>
                        </div>
                        <p className="text-gray-300">
                          Amazing quality and fast shipping! This product exceeded my expectations and I love supporting
                          OKAMA's mission.
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 bg-black">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Related <span className="text-pink-500">Products</span>
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/shop/${relatedProduct.id}`}>
                    <Card className="bg-gray-800 border-gray-700 overflow-hidden group hover:border-pink-500/50 transition-colors">
                      <div className="relative">
                        <img
                          src={relatedProduct.image || "/placeholder.svg"}
                          alt={relatedProduct.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold mb-2 line-clamp-2">{relatedProduct.name}</h3>
                        <p className="text-pink-500 font-bold">${relatedProduct.price}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
