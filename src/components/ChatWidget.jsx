import React, { useState } from 'react'
import { useChat } from '../context/ChatContext'
import { useAuth } from '../context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'
import { IoClose, IoSend } from 'react-icons/io5'

export default function ChatWidget({ opponentId, matchId }) {
  const { sendMessage } = useChat()
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [messageText, setMessageText] = useState('')

  const handleSend = () => {
    if (!messageText.trim() || !opponentId) return
    sendMessage(opponentId, messageText, matchId)
    setMessageText('')
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 w-14 h-14 bg-kasibet-accent text-black rounded-full flex items-center justify-center shadow-lg hover:bg-kasibet-accent-hover transition-colors z-40"
        aria-label="Toggle chat"
      >
        💬
      </button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-20 right-4 w-80 h-96 bg-kasibet-bg-modal border border-kasibet-border rounded-lg shadow-xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-3 border-b border-kasibet-border">
              <h3 className="font-semibold">Chat</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
                aria-label="Close chat"
              >
                <IoClose className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              <div className="text-center text-gray-400 text-sm">
                Start of conversation
              </div>
              {/* Messages would be rendered here */}
            </div>
            <div className="p-3 border-t border-kasibet-border flex gap-2">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 bg-kasibet-bg-card border border-kasibet-border rounded text-sm focus:outline-none focus:border-kasibet-accent"
              />
              <button
                onClick={handleSend}
                className="bg-kasibet-accent text-black p-2 rounded hover:bg-kasibet-accent-hover transition-colors"
                aria-label="Send message"
              >
                <IoSend className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

