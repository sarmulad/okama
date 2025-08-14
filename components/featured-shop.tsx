"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Star, ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useCart } from "@/contexts/cart-context";
import { getFeaturedProducts } from "@/lib/product-manager";
import { useState } from "react";
import Toast from "@/components/toast-notification";
import { useToast } from "@/hooks/use-toast";

export default function FeaturedShop() {
  const { addItem } = useCart();
  const [wishlist, setWishlist] = useState<string[]>([]);
  const { toasts, showToast, removeToast } = useToast();

  // Get featured products from our product manager
  const featuredProducts = getFeaturedProducts().slice(0, 4); // Show top 4 featured items

  const handleAddToCart = (product: any) => {
    try {
      addItem(product);
      showToast(`${product.name} added to cart!`, "success");
    } catch (error) {
      showToast("Failed to add item to cart", "error");
    }
  };

  const toggleWishlist = (productId: string) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
      showToast("Removed from wishlist", "info");
    } else {
      setWishlist([...wishlist, productId]);
      showToast("Added to wishlist", "success");
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
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

      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-3">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 70% 30%, rgba(139, 69, 19, 0.05) 20%, transparent 50%)`,
            backgroundSize: "300px 300px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              FEATURED COLLECTION
            </h2>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Support our music and mission with official OKAMA merchandise and
            exclusive releases
          </p>
        </motion.div>

        {/* Featured Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="bg-gray-800/50 border-gray-700/50 overflow-hidden group hover:border-pink-500/50 transition-all duration-300 h-full backdrop-blur-sm">
                <div className="relative">
                  <img
                    src={
                      product.image || "/placeholder.svg?height=250&width=250"
                    }
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <Badge className="bg-amber-600/90 backdrop-blur-sm">
                      Featured
                    </Badge>
                    {product.originalPrice && (
                      <Badge className="bg-red-500/90 backdrop-blur-sm">
                        Sale
                      </Badge>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <Button
                    onClick={() => toggleWishlist(product.id)}
                    className={`absolute top-3 right-3 p-2 ${
                      wishlist.includes(product.id)
                        ? "bg-pink-500/90 hover:bg-pink-600/90"
                        : "bg-black/50 hover:bg-black/70"
                    } backdrop-blur-sm`}
                    size="sm"
                  >
                    <Heart
                      size={16}
                      fill={wishlist.includes(product.id) ? "white" : "none"}
                    />
                  </Button>

                  {/* Quick Add Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="bg-pink-500 hover:bg-pink-600 transform scale-90 group-hover:scale-100 transition-transform duration-300"
                      disabled={product.inventory === 0}
                    >
                      <ShoppingBag size={16} className="mr-2" />
                      {product.inventory === 0 ? "Out of Stock" : "Quick Add"}
                    </Button>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="mb-2">
                    <Badge
                      variant="outline"
                      className="text-xs capitalize border-amber-600/50 text-amber-600"
                    >
                      {product.category}
                    </Badge>
                  </div>

                  <h3 className="font-bold mb-2 line-clamp-2 group-hover:text-pink-400 transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Stock Status */}
                  {/* <div className="mb-3">
                    {product.inventory > 0 ? (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-green-400">
                          In Stock ({product.inventory})
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-xs text-red-400">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div> */}

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-pink-500">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>

                    {/* Rating Stars (placeholder) */}
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className="text-amber-500 fill-current"
                        />
                      ))}
                      <span className="text-xs text-gray-400 ml-1">(4.8)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Shop CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-2xl p-8 border border-pink-500/20"
        >
          <h3 className="text-2xl font-bold mb-4">Support Our Mission</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Every purchase helps us continue creating music that bridges ancient
            wisdom with modern worship. Explore our full collection of albums,
            merchandise, and exclusive items.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/shop">
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 px-8 py-3 rounded-full font-semibold tracking-wider"
              >
                Explore Full Shop
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
