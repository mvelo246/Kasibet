import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoCheckmarkCircle, IoCloseCircle, IoInformationCircle } from 'react-icons/io5'

export default function Toast({ message, type = 'info', isVisible, onClose, duration = 3000 }) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  const icons = {
    success: <IoCheckmarkCircle className="w-6 h-6 text-kasibet-success" />,
    error: <IoCloseCircle className="w-6 h-6 text-kasibet-danger" />,
    info: <IoInformationCircle className="w-6 h-6 text-kasibet-accent" />,
  }

  const bgColors = {
    success: 'bg-green-900/20 border-green-500',
    error: 'bg-red-900/20 border-red-500',
    info: 'bg-kasibet-bg-card border-kasibet-accent',
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed top-4 right-4 z-50 flex items-center gap-3 p-4 rounded-lg border ${bgColors[type]} shadow-lg max-w-sm`}
        >
          {icons[type]}
          <p className="text-sm font-medium flex-1">{message}</p>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
            aria-label="Close"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

