"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ShoppingCart, Heart, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Toast from "@/components/toast-notification"
import { useCart } from "@/contexts/cart-context"
import { getAllProducts } from "@/lib/product-manager"
import { useToast } from "@/hooks/use-toast"

export default function ShopPage() {
  const [filter, setFilter] = useState("all")
  const [wishlist, setWishlist] = useState<string[]>([])
  const { addItem, state } = useCart()
  const { toasts, showToast, removeToast } = useToast()

  // Use the product manager instead of hardcoded products
  const allProducts = getAllProducts()

  const categories = [
    { id: "all", label: "All Products" },
    { id: "music", label: "Music" },
    { id: "apparel", label: "Apparel" },
    { id: "accessories", label: "Accessories" },
  ]

  const filteredProducts = filter === "all" ? allProducts : allProducts.filter((product) => product.category === filter)

  const handleAddToCart = (product: any) => {
    try {
      addItem(product)
      showToast(`${product.name} added to cart!`, "success")
    } catch (error) {
      showToast("Failed to add item to cart", "error")
    }
  }

  const toggleWishlist = (productId: string) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId))
      showToast("Removed from wishlist", "info")
    } else {
      setWishlist([...wishlist, productId])
      showToast("Added to wishlist", "success")
    }
  }

  const isInCart = (productId: string) => {
    return state.items.some((item) => item.id === productId)
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

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              OKAMA <span className="text-pink-500">SHOP</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Support our music and mission with official OKAMA merchandise, albums, and exclusive items
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-black border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Filter className="text-gray-400" size={20} />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    onClick={() => setFilter(category.id)}
                    variant={filter === category.id ? "default" : "outline"}
                    size="sm"
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
            <div className="flex items-center gap-2 text-gray-400">
              <ShoppingCart size={20} />
              <span>{state.itemCount} items in cart</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-gray-800 border-gray-700 overflow-hidden group hover:border-pink-500/50 transition-colors">
                  <div className="relative">
                    <img
                      src={product.image || "/placeholder.svg?height=300&width=300"}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.featured && <Badge className="absolute top-2 left-2 bg-amber-600">Featured</Badge>}
                    {product.originalPrice && <Badge className="absolute top-2 left-2 bg-red-500">Sale</Badge>}
                    <Button
                      onClick={() => toggleWishlist(product.id)}
                      className={`absolute top-2 right-2 p-2 ${
                        wishlist.includes(product.id)
                          ? "bg-pink-500 hover:bg-pink-600"
                          : "bg-black/50 hover:bg-black/70"
                      }`}
                      size="sm"
                    >
                      <Heart size={16} fill={wishlist.includes(product.id) ? "white" : "none"} />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">{product.description}</p>

                    {/* Stock Status */}
                    <div className="mb-3">
                      {product.inventory > 0 ? (
                        <Badge variant="outline" className="text-green-500 border-green-500">
                          In Stock ({product.inventory})
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-red-500 border-red-500">
                          Out of Stock
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-pink-500">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                        )}
                      </div>
                    </div>

                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-pink-500 hover:bg-pink-600"
                      disabled={product.inventory === 0}
                    >
                      <ShoppingCart size={16} className="mr-2" />
                      {product.inventory === 0 ? "Out of Stock" : isInCart(product.id) ? "Add Another" : "Add to Cart"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-pink-500/10 to-purple-500/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-3xl font-bold mb-4">Get Exclusive Offers</h2>
            <p className="text-gray-300 mb-6">
              Subscribe to our newsletter for early access to new releases and special discounts
            </p>
            <div className="flex max-w-md mx-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-500"
              />
              <Button className="bg-pink-500 hover:bg-pink-600">Subscribe</Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
