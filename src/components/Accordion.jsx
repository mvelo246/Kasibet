import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoChevronDown } from 'react-icons/io5'

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="border border-kasibet-border rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between p-4 bg-kasibet-bg-card hover:bg-kasibet-bg-modal transition-colors text-left"
          >
            <span className="font-semibold">{item.question}</span>
            <IoChevronDown
              className={`w-5 h-5 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
            />
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="p-4 pt-0 text-kasibet-text-secondary">
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

