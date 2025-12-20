import React, { useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Card from '../components/Card'
import Button from '../components/Button'
import RegisterModal from '../components/RegisterModal'
import LoginModal from '../components/LoginModal'

export default function Games() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [registerModalOpen, setRegisterModalOpen] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [searchParams] = useSearchParams()
  const category = searchParams.get('category')
  const [activeTab, setActiveTab] = useState(category || 'cards')

  const cardGames = [
    { id: 'casino', name: 'Casino', minBet: 10, players: 678, icon: '🎲' },
    { id: 'crazy8', name: 'Crazy 8s', minBet: 8, players: 523, icon: '🃎' },
    { id: '5card', name: '5 Card', minBet: 12, players: 789, icon: '🂮' },
    { id: 'poker', name: 'Poker', minBet: 10, players: 1234, icon: '🃏' },
  ]

  const boardGames = [
    { id: 'chess', name: 'Chess', minBet: 20, players: 789, icon: '♟️' },
    { id: 'checkers', name: 'Checkers', minBet: 10, players: 456, icon: '⚫' },
    { id: 'backgammon', name: 'Backgammon', minBet: 15, players: 323, icon: '🎲' },
    { id: 'ludo', name: 'Ludo', minBet: 5, players: 634, icon: '🎯' },
  ]

  const billiardsGames = [
    { id: '8ball', name: '8-Ball Pool', minBet: 25, players: 523, icon: '🎱' },
    { id: '9ball', name: '9-Ball Pool', minBet: 30, players: 398, icon: '9️⃣' },
    { id: 'snooker', name: 'Snooker', minBet: 50, players: 234, icon: '🎯' },
    { id: 'straight', name: 'Straight Pool', minBet: 40, players: 187, icon: '🎳' },
  ]

  const getGames = () => {
    switch (activeTab) {
      case 'cards':
        return cardGames
      case 'board':
        return boardGames
      case 'billiards':
        return billiardsGames
      default:
        return cardGames
    }
  }

  const getGradient = () => {
    switch (activeTab) {
      case 'cards':
        return 'gradient-card-games'
      case 'board':
        return 'gradient-board-games'
      case 'billiards':
        return 'gradient-billiards'
      default:
        return 'gradient-card-games'
    }
  }

  const handlePlayNow = (e, gameId) => {
    if (!user) {
      e.preventDefault()
      setRegisterModalOpen(true)
    } else {
      navigate(`/games/${gameId}/opponent`)
    }
  }

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">Select a Game</h1>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6 border-b border-kasibet-border">
        <button
          onClick={() => setActiveTab('cards')}
          className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
            activeTab === 'cards'
              ? 'border-kasibet-accent text-kasibet-accent'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          🃏 Card Games
        </button>
        <button
          onClick={() => setActiveTab('board')}
          className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
            activeTab === 'board'
              ? 'border-kasibet-accent text-kasibet-accent'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          ♟️ Board Games
        </button>
        <button
          onClick={() => setActiveTab('billiards')}
          className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
            activeTab === 'billiards'
              ? 'border-kasibet-accent text-kasibet-accent'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          🎱 Billiards
        </button>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {getGames().slice(0, 4).map((game) => (
          <Card key={game.id}>
              <div className={`${getGradient()} h-32 flex items-center justify-center text-4xl rounded-lg mb-3`}>
                {game.icon}
              </div>
              <h3 className="font-bold mb-1">{game.name}</h3>
              <p className="text-xs text-gray-400 mb-2">
                Min: R{game.minBet} • {game.players.toLocaleString()} players
              </p>
              <Button 
                variant="primary" 
                className="w-full text-xs py-2"
                onClick={(e) => handlePlayNow(e, game.id)}
              >
                Play Now
              </Button>
            </Card>
          ))}
      </div>

      <RegisterModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        onSwitchToLogin={() => {
          setRegisterModalOpen(false)
          setLoginModalOpen(true)
        }}
      />
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSwitchToRegister={() => {
          setLoginModalOpen(false)
          setRegisterModalOpen(true)
        }}
      />
    </div>
  )
}

