import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const ChatContext = createContext()

export function ChatProvider({ children }) {
  const { user } = useAuth()
  const [messages, setMessages] = useState([])
  const [conversations, setConversations] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [onlineUsers, setOnlineUsers] = useState([])

  useEffect(() => {
    if (user) {
      const storedMessages = localStorage.getItem(`kasibet_messages_${user.id}`)
      const storedConversations = localStorage.getItem(`kasibet_conversations_${user.id}`)
      
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages))
      }
      if (storedConversations) {
        setConversations(JSON.parse(storedConversations))
      }
    }
  }, [user])

  const sendMessage = (recipientId, text, matchId = null) => {
    const message = {
      id: Date.now().toString(),
      senderId: user?.id,
      recipientId,
      text,
      matchId,
      timestamp: new Date().toISOString(),
      status: 'sent',
    }

    const newMessages = [...messages, message]
    setMessages(newMessages)

    // Update or create conversation
    const conversation = conversations.find(c => c.userId === recipientId) || {
      userId: recipientId,
      lastMessage: text,
      lastMessageTime: message.timestamp,
      unread: 0,
    }
    conversation.lastMessage = text
    conversation.lastMessageTime = message.timestamp

    const updatedConversations = [
      conversation,
      ...conversations.filter(c => c.userId !== recipientId),
    ]
    setConversations(updatedConversations)

    if (user) {
      localStorage.setItem(`kasibet_messages_${user.id}`, JSON.stringify(newMessages))
      localStorage.setItem(`kasibet_conversations_${user.id}`, JSON.stringify(updatedConversations))
    }

    return message
  }

  const markAsRead = (conversationId) => {
    setConversations(conversations.map(c => 
      c.userId === conversationId ? { ...c, unread: 0 } : c
    ))
    setUnreadCount(Math.max(0, unreadCount - 1))
  }

  return (
    <ChatContext.Provider value={{ 
      messages, 
      conversations, 
      unreadCount, 
      onlineUsers, 
      sendMessage, 
      markAsRead 
    }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChat must be used within ChatProvider')
  }
  return context
}

