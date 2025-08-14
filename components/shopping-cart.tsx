"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Plus, Minus, ShoppingBag, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface ShoppingCartProps {
  isOpen: boolean
  onClose: () => void
}

export default function ShoppingCart({ isOpen, onClose }: ShoppingCartProps) {
  const { state, updateQuantity, removeItem, clearCart } = useCart()

  const handleCheckout = async () => {
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: state.items }),
      })

      const { sessionId } = await response.json()
      const stripe = await stripePromise

      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId })
        if (error) {
          console.error("Error redirecting to checkout:", error)
        }
      }
    } catch (error) {
      console.error("Error during checkout:", error)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* Cart Sidebar - much cleaner */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-gray-900/95 backdrop-blur-md border-l border-white/10 z-50 overflow-hidden"
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <ShoppingBag className="text-pink-500" size={24} />
                    <h2 className="text-xl font-bold">Shopping Cart</h2>
                  </div>
                  <Button onClick={onClose} variant="ghost" size="sm" className="text-white hover:bg-white/10">
                    <X size={20} />
                  </Button>
                </div>
                <p className="text-gray-400 mt-2">{state.itemCount} items</p>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {state.items.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="mx-auto text-gray-600 mb-4" size={48} />
                    <p className="text-gray-400">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {state.items.map((item) => (
                      <motion.div key={item.id} layout className="bg-gray-800/50 rounded-lg p-4 border border-white/10">
                        <div className="flex items-center space-x-4">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-sm">{item.name}</h3>
                            <p className="text-pink-500 font-bold">${item.price}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              variant="ghost"
                              size="sm"
                              className="w-8 h-8 p-0 hover:bg-white/10"
                            >
                              <Minus size={14} />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              variant="ghost"
                              size="sm"
                              className="w-8 h-8 p-0 hover:bg-white/10"
                            >
                              <Plus size={14} />
                            </Button>
                          </div>
                          <Button
                            onClick={() => removeItem(item.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                          >
                            <X size={16} />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {state.items.length > 0 && (
                <div className="p-6 border-t border-white/10">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold">Total:</span>
                    <span className="text-2xl font-bold text-pink-500">${state.total.toFixed(2)}</span>
                  </div>
                  <div className="space-y-3">
                    <Button
                      onClick={handleCheckout}
                      className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700"
                    >
                      <CreditCard size={16} className="mr-2" />
                      Checkout
                    </Button>
                    <Button
                      onClick={clearCart}
                      variant="outline"
                      className="w-full border-white/30 text-white hover:bg-white/10 bg-transparent"
                    >
                      Clear Cart
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
