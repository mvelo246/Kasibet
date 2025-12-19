import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useMatch } from '../context/MatchContext'
import Card from '../components/Card'
import Button from '../components/Button'
import LoadingSpinner from '../components/LoadingSpinner'

export default function Lobby() {
  const { matchId } = useParams()
  const navigate = useNavigate()
  const { activeMatches } = useMatch()
  const [isReady, setIsReady] = useState(false)
  const [opponentReady, setOpponentReady] = useState(false)
  const [countdown, setCountdown] = useState(null)

  const match = activeMatches.find(m => m.id === matchId)

  useEffect(() => {
    if (isReady && opponentReady && !countdown) {
      setCountdown(3)
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            // Navigate to game
            navigate(`/play/cards/${match?.gameId}/${matchId}`)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [isReady, opponentReady, countdown, navigate, match, matchId])

  if (!match) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Match not found</h2>
          <Button onClick={() => navigate('/games')}>Go to Games</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 lg:p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Waiting Room</h1>

      <Card className="mb-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Match Details</h2>
          <p className="text-gray-400">Game: {match.gameId}</p>
          <p className="text-kasibet-accent font-bold text-xl mt-2">
            Bet Amount: R{match.betAmount}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-kasibet-bg-modal rounded-lg">
            <div>
              <div className="font-semibold">You</div>
              <div className="text-sm text-gray-400">Player 1</div>
            </div>
            <div>
              {isReady ? (
                <span className="text-kasibet-success font-semibold">✓ Ready</span>
              ) : (
                <span className="text-gray-400">Waiting...</span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-kasibet-bg-modal rounded-lg">
            <div>
              <div className="font-semibold">
                {match.opponentId === 'random' ? 'Random Player' : match.opponentId}
              </div>
              <div className="text-sm text-gray-400">Player 2</div>
            </div>
            <div>
              {opponentReady ? (
                <span className="text-kasibet-success font-semibold">✓ Ready</span>
              ) : (
                <span className="text-gray-400">Waiting...</span>
              )}
            </div>
          </div>
        </div>
      </Card>

      {countdown ? (
        <Card>
          <div className="text-center py-8">
            <div className="text-6xl font-bold text-kasibet-accent mb-4">
              {countdown}
            </div>
            <p className="text-xl">Starting game...</p>
          </div>
        </Card>
      ) : (
        <div className="flex gap-4">
          <Button
            variant="primary"
            onClick={() => setIsReady(true)}
            disabled={isReady}
            className="flex-1"
          >
            {isReady ? 'Ready!' : 'I\'m Ready'}
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/games')}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      )}

      {/* Mock: Simulate opponent ready after 2 seconds */}
      {!opponentReady && (
        <div className="mt-4 text-center">
          <LoadingSpinner />
          <p className="text-sm text-gray-400 mt-2">Waiting for opponent...</p>
        </div>
      )}
    </div>
  )
}

