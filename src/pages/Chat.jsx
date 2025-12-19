import React, { useState } from 'react'
import { useChat } from '../context/ChatContext'
import { useAuth } from '../context/AuthContext'
import Card from '../components/Card'
import Input from '../components/Input'
import Button from '../components/Button'

export default function Chat() {
  const { conversations, sendMessage } = useChat()
  const { user } = useAuth()
  const [activeConversation, setActiveConversation] = useState(null)
  const [messageText, setMessageText] = useState('')

  const handleSendMessage = () => {
    if (!messageText.trim() || !activeConversation) return
    
    sendMessage(activeConversation.userId, messageText)
    setMessageText('')
  }

  return (
    <div className="min-h-screen p-4 lg:p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Messages</h1>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Conversations List */}
        <div className="md:col-span-1">
          <Card>
            <h2 className="text-xl font-semibold mb-4">Conversations</h2>
            {conversations.length > 0 ? (
              <div className="space-y-2">
                {conversations.map((conv) => (
                  <button
                    key={conv.userId}
                    onClick={() => setActiveConversation(conv)}
                    className={`w-full p-3 rounded-lg text-left transition-colors ${
                      activeConversation?.userId === conv.userId
                        ? 'bg-kasibet-accent text-black'
                        : 'bg-kasibet-bg-modal hover:bg-kasibet-bg-card'
                    }`}
                  >
                    <div className="font-semibold">{conv.userId}</div>
                    <div className="text-sm truncate">{conv.lastMessage}</div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                No conversations yet
              </div>
            )}
          </Card>
        </div>

        {/* Chat Window */}
        <div className="md:col-span-2">
          <Card className="h-[600px] flex flex-col">
            {activeConversation ? (
              <>
                <div className="border-b border-kasibet-border pb-4 mb-4">
                  <h3 className="text-xl font-semibold">{activeConversation.userId}</h3>
                </div>
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  <div className="text-center text-gray-400 text-sm">
                    Start of conversation
                  </div>
                  {/* Messages would be rendered here */}
                </div>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button variant="primary" onClick={handleSendMessage}>
                    Send
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-400">
                Select a conversation to start chatting
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

