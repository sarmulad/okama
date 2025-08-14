"use client"

import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, X } from "lucide-react"
import { useEffect } from "react"

interface ToastProps {
  message: string
  type: "success" | "error" | "info"
  isVisible: boolean
  onClose: () => void
  duration?: number
}

export default function Toast({ message, type, isVisible, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="text-green-500" size={20} />
      case "error":
        return <X className="text-red-500" size={20} />
      default:
        return null
    }
  }

  const getBgColor = () => {
    switch (type) {
      case "success":
        return "bg-green-900/90 border-green-500/50"
      case "error":
        return "bg-red-900/90 border-red-500/50"
      default:
        return "bg-gray-900/90 border-gray-500/50"
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          className={`fixed top-20 right-4 z-50 ${getBgColor()} border rounded-lg p-4 backdrop-blur-sm max-w-sm`}
        >
          <div className="flex items-center space-x-3">
            {getIcon()}
            <p className="text-white font-medium">{message}</p>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors ml-auto">
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
