"use client";

import { motion } from "framer-motion";
import { Menu, X, MapPin, ShoppingCart } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import ShoppingCartComponent from "@/components/shopping-cart";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { state } = useCart();

  const navItems = [
    { name: "HOME", href: "/" },
    { name: "ABOUT", href: "/about" },
    { name: "MUSIC", href: "/#music" },
    { name: "SHOP", href: "/shop" },
    { name: "GALLERY", href: "/gallery" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10"
      >
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-[110px]"
            >
              <Link
                href="/"
                className="text-2xl font-bold text-pink-500 tracking-wider"
              >
                <img src="/images/logo.png" alt="logo" />
              </Link>
            </motion.div>

            {/* Desktop Navigation - clean */}
            <div className="hidden lg:flex items-center space-x-12">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -2 }}
                  className="relative group"
                >
                  <Link
                    href={item.href}
                    className="text-sm tracking-wider hover:text-pink-400 transition-colors cursor-pointer font-medium text-white/90 relative"
                  >
                    {item.name}
                    {/* Simple underline on hover */}
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Cart and Contact Buttons - simplified */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Shopping Cart Button */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Button
                  onClick={() => setIsCartOpen(true)}
                  variant="ghost"
                  size="sm"
                  className="relative text-white hover:bg-white/10 border border-white/20"
                >
                  <ShoppingCart size={20} />
                  {state.itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {state.itemCount}
                    </span>
                  )}
                </Button>
              </motion.div>

              {/* Contact Button */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="sm"
                    className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-6 py-2 rounded-full backdrop-blur-sm font-medium tracking-wider transition-all duration-300 bg-transparent"
                  >
                    <MapPin size={16} className="mr-2" />
                    CONTACT US
                  </Button>
                </motion.div>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-2">
              <Button
                onClick={() => setIsCartOpen(true)}
                variant="ghost"
                size="sm"
                className="relative text-white hover:bg-white/10 border border-white/20"
              >
                <ShoppingCart size={20} />
                {state.itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {state.itemCount}
                  </span>
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10 border border-white/20"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu - simplified */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-6 pb-6 border-t border-white/20"
            >
              <div className="flex flex-col space-y-6 mt-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="text-sm tracking-wider hover:text-pink-400 transition-colors font-medium text-white/90 block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="pt-4 border-t border-white/20"
                >
                  <Button
                    size="sm"
                    className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-6 py-2 rounded-full backdrop-blur-sm font-medium tracking-wider w-full transition-all duration-300 bg-transparent"
                  >
                    <MapPin size={16} className="mr-2" />
                    CONTACT US
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Shopping Cart Sidebar */}
      <ShoppingCartComponent
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
}
