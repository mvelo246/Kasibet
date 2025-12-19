import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useWallet } from '../context/WalletContext'
import { useMatch } from '../context/MatchContext'
import Card from '../components/Card'
import Button from '../components/Button'
import Input from '../components/Input'

export default function OpponentSelection() {
  const { gameId } = useParams()
  const navigate = useNavigate()
  const { balance } = useWallet()
  const { createMatch } = useMatch()
  const [opponentType, setOpponentType] = useState('random')
  const [friendUsername, setFriendUsername] = useState('')
  const [betAmount, setBetAmount] = useState(10)
  const [error, setError] = useState('')

  const handleStartMatch = () => {
    if (betAmount > balance) {
      setError('Insufficient balance')
      return
    }

    if (betAmount < 5) {
      setError('Minimum bet is R5')
      return
    }

    if (opponentType === 'friend' && !friendUsername.trim()) {
      setError('Please enter a friend username')
      return
    }

    const match = createMatch(gameId, opponentType === 'friend' ? friendUsername : 'random', betAmount)
    navigate(`/lobby/${match.id}`)
  }

  return (
    <div className="min-h-screen p-4 lg:p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Select Opponent</h1>

      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Choose Opponent</h2>
        <div className="space-y-3">
          <button
            onClick={() => setOpponentType('random')}
            className={`w-full p-4 rounded-lg border-2 text-left transition-colors ${
              opponentType === 'random'
                ? 'border-kasibet-accent bg-kasibet-bg-modal'
                : 'border-kasibet-border hover:border-kasibet-accent'
            }`}
          >
            <div className="font-semibold mb-1">🎲 Find Random Player</div>
            <div className="text-sm text-gray-400">Match with a random player online</div>
          </button>
          <button
            onClick={() => setOpponentType('friend')}
            className={`w-full p-4 rounded-lg border-2 text-left transition-colors ${
              opponentType === 'friend'
                ? 'border-kasibet-accent bg-kasibet-bg-modal'
                : 'border-kasibet-border hover:border-kasibet-accent'
            }`}
          >
            <div className="font-semibold mb-1">👥 Play with Friend</div>
            <div className="text-sm text-gray-400">Challenge a friend directly</div>
          </button>
        </div>

        {opponentType === 'friend' && (
          <div className="mt-4">
            <Input
              type="text"
              placeholder="Enter friend's username"
              value={friendUsername}
              onChange={(e) => setFriendUsername(e.target.value)}
            />
          </div>
        )}
      </Card>

      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Bet Amount</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Amount (Available: R{balance.toFixed(2)})
          </label>
          <Input
            type="number"
            min="5"
            max={balance}
            step="5"
            value={betAmount}
            onChange={(e) => setBetAmount(parseFloat(e.target.value) || 0)}
          />
          <div className="flex gap-2 mt-2">
            {[10, 25, 50, 100].map((amount) => (
              <button
                key={amount}
                onClick={() => setBetAmount(amount)}
                className={`px-3 py-1 rounded text-sm ${
                  betAmount === amount
                    ? 'bg-kasibet-accent text-black'
                    : 'bg-kasibet-bg-card border border-kasibet-border hover:border-kasibet-accent'
                }`}
              >
                R{amount}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {error && (
        <div className="mb-4 p-3 bg-red-900/20 border border-red-500 rounded text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-4">
        <Button variant="outline" onClick={() => navigate('/games')} className="flex-1">
          Back
        </Button>
        <Button variant="primary" onClick={handleStartMatch} className="flex-1">
          Start Match
        </Button>
      </div>
    </div>
  )
}

