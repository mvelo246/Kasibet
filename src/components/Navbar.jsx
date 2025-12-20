import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useWallet } from '../context/WalletContext'
import { useChat } from '../context/ChatContext'
import { IoSearch, IoNotificationsOutline } from 'react-icons/io5'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { balance } = useWallet()
  const { unreadCount, conversations } = useChat()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [registerModalOpen, setRegisterModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Calculate unread count from conversations
  const totalUnreadCount = conversations.reduce((sum, conv) => sum + (conv.unread || 0), 0) || unreadCount

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [sidebarOpen])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/games?search=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
    }
  }

  return (
    <>
      <nav className="w-full flex items-center justify-between px-4 lg:px-16 h-[60px] lg:h-[80px] bg-kasibet-bg-primary border-b border-kasibet-border sticky top-0 z-40">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-400 text-2xl focus:outline-none hover:text-yellow-500"
            aria-label="Open menu"
          >
            ☰
          </button>
          <Link to="/" className="text-2xl font-bold">
            <span className="text-white italic font-semibold">Kasi</span>
            <span className="text-kasibet-accent italic font-semibold">Bet</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-3 flex-1 max-w-md mx-4">
          <form onSubmit={handleSearch} className="flex items-center space-x-2 flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search games..."
              className="bg-kasibet-bg-card border border-gray-700 text-sm text-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:border-kasibet-accent flex-1"
            />
            <button
              type="submit"
              className="btn-primary text-sm px-3 py-1.5"
            >
              Go
            </button>
          </form>
        </div>

        <div className="flex items-center space-x-2">
          {user ? (
            <>
              {balance !== undefined && (
                <Link
                  to="/wallet"
                  className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-md bg-kasibet-bg-card border border-kasibet-border hover:border-kasibet-accent transition-colors"
                >
                  <span className="text-sm font-semibold text-kasibet-accent">
                    R{balance.toFixed(2)}
                  </span>
                </Link>
              )}
              <Link
                to="/chat"
                className="text-gray-400 hover:text-kasibet-accent transition-colors p-2"
                aria-label="Messages"
              >
                <IoNotificationsOutline className="w-6 h-6" />
              </Link>
              <Link
                to="/profile"
                className="text-sm font-semibold px-3 py-1.5 rounded-md hover:text-kasibet-accent transition-colors"
              >
                {user.username}
              </Link>
              <button
                onClick={logout}
                className="text-sm font-semibold px-3 py-1.5 rounded-md hover:text-kasibet-accent transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setLoginModalOpen(true)}
                className="btn-primary text-sm px-4 py-1.5"
              >
                LOGIN
              </button>
              <button
                onClick={() => setRegisterModalOpen(true)}
                className="bg-kasibet-accent-light hover:bg-kasibet-accent text-black font-semibold text-sm px-4 py-1.5 rounded-md transition"
              >
                REGISTER
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Sidebar */}
      <div
        id="sidebar"
        className={`fixed top-0 left-0 h-full w-64 bg-[#111] text-gray-200 transform transition-transform duration-300 ease-in-out z-50 border-r border-gray-800 flex flex-col ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header - Fixed */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700 flex-shrink-0">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button
            id="close-btn"
            onClick={() => setSidebarOpen(false)}
            className="text-gray-400 text-2xl hover:text-yellow-500"
            aria-label="Close menu"
          >
            &times;
          </button>
        </div>

        {/* User Quick Info Section - Fixed */}
        {user && (
          <div className="bg-kasibet-bg-modal border-b border-gray-700 p-4 space-y-3 flex-shrink-0">
            {/* Wallet Balance */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg">💰</span>
                <div>
                  <p className="text-xs text-gray-400">Balance</p>
                  <p className="text-lg font-bold text-kasibet-accent">
                    R{balance !== undefined ? balance.toFixed(2) : '0.00'}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Deposit Button */}
            <Link
              to="/deposit"
              onClick={() => setSidebarOpen(false)}
              className="block w-full"
            >
              <button className="w-full btn-primary text-sm py-2">
                Quick Deposit
              </button>
            </Link>

            {/* Verification Status */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-800">
              <span className="text-xs text-gray-400">Verification:</span>
              {(() => {
                const verificationStatus = user.verification?.status || 'not_verified'
                const statusConfig = {
                  verified: { text: 'Verified', color: 'text-green-500', icon: '✅' },
                  pending: { text: 'Pending', color: 'text-yellow-500', icon: '⏳' },
                  rejected: { text: 'Rejected', color: 'text-red-500', icon: '❌' },
                  not_verified: { text: 'Not Verified', color: 'text-gray-400', icon: '⚪' },
                }
                const config = statusConfig[verificationStatus] || statusConfig.not_verified
                return (
                  <div className="flex items-center space-x-1">
                    <span>{config.icon}</span>
                    <span className={`text-xs font-semibold ${config.color}`}>
                      {config.text}
                    </span>
                  </div>
                )
              })()}
            </div>

            {/* Notifications */}
            <Link
              to="/chat"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center justify-between pt-2 border-t border-gray-800 hover:text-kasibet-accent transition-colors"
            >
              <div className="flex items-center space-x-2">
                <IoNotificationsOutline className="w-5 h-5" />
                <span className="text-sm">Notifications</span>
              </div>
              {totalUnreadCount > 0 && (
                <span className="bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5 min-w-[20px] text-center">
                  {totalUnreadCount > 99 ? '99+' : totalUnreadCount}
                </span>
              )}
            </Link>
          </div>
        )}

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto sidebar-scroll p-4 space-y-4">
          {/* Game Categories Section */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Game Categories</h3>
            
            {/* Card Games */}
            <Link
              to="/games?category=cards"
              onClick={() => setSidebarOpen(false)}
              className="block"
            >
              <div className="border border-gray-800 rounded-lg p-3 hover:border-kasibet-accent transition-all duration-200 cursor-pointer group">
                <div className="flex items-center space-x-3">
                  <div className="gradient-card-games w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                    🃏
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white group-hover:text-kasibet-accent transition-colors">
                      Card Games
                    </h4>
                    <p className="text-xs text-gray-400 mt-0.5">4 games available</p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Board Games */}
            <Link
              to="/games?category=board"
              onClick={() => setSidebarOpen(false)}
              className="block"
            >
              <div className="border border-gray-800 rounded-lg p-3 hover:border-kasibet-accent transition-all duration-200 cursor-pointer group">
                <div className="flex items-center space-x-3">
                  <div className="gradient-board-games w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                    ♟️
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white group-hover:text-kasibet-accent transition-colors">
                      Board Games
                    </h4>
                    <p className="text-xs text-gray-400 mt-0.5">4 games available</p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Billiards */}
            <Link
              to="/games?category=billiards"
              onClick={() => setSidebarOpen(false)}
              className="block"
            >
              <div className="border border-gray-800 rounded-lg p-3 hover:border-kasibet-accent transition-all duration-200 cursor-pointer group">
                <div className="flex items-center space-x-3">
                  <div className="gradient-billiards w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                    🎱
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white group-hover:text-kasibet-accent transition-colors">
                      Billiards
                    </h4>
                    <p className="text-xs text-gray-400 mt-0.5">4 games available</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Other Menu Items */}
          <div className="pt-2 border-t border-gray-800 space-y-2">
            <Link 
              to="/leaderboard" 
              className="hover:text-yellow-500 block py-2 transition-colors" 
              onClick={() => setSidebarOpen(false)}
            >
              🏆 Results
            </Link>
            <Link 
              to="/contact" 
              className="hover:text-yellow-500 block py-2 transition-colors" 
              onClick={() => setSidebarOpen(false)}
            >
              📧 Contact
            </Link>
          </div>
        </div>
        
        {/* Footer - Fixed */}
        <div className="p-4 border-t border-gray-700 flex-shrink-0">
          <div className="text-xs text-gray-400 text-center">
            <p>Play Responsibly</p>
            <p>18+ Only</p>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div
        id="overlay"
        className={`fixed inset-0 bg-black opacity-50 z-40 transition-opacity ${
          sidebarOpen ? 'block' : 'hidden'
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSwitchToRegister={() => {
          setLoginModalOpen(false)
          setRegisterModalOpen(true)
        }}
      />
      <RegisterModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        onSwitchToLogin={() => {
          setRegisterModalOpen(false)
          setLoginModalOpen(true)
        }}
      />
    </>
  )
}

