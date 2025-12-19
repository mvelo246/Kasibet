import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'

export default function PlayBilliards() {
  const { gameId, matchId } = useParams()
  const navigate = useNavigate()
  const [turn, setTurn] = useState('player')
  const [gameOver, setGameOver] = useState(false)

  return (
    <div className="min-h-screen p-4 bg-kasibet-bg-primary">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{gameId}</h1>
          <Button variant="outline" onClick={() => navigate('/games')}>
            Exit Game
          </Button>
        </div>

        <Card className="mb-4">
          <div className="text-center">
            <div className="text-xl font-semibold mb-2">
              {turn === 'player' ? 'Your Turn' : "Opponent's Turn"}
            </div>
            <div className="text-gray-400">Game in progress...</div>
          </div>
        </Card>

        <Card>
          <div className="aspect-[2/1] bg-gradient-to-b from-green-700 to-green-900 rounded-lg flex items-center justify-center relative">
            <div className="text-center text-white">
              <div className="text-6xl mb-4">🎱</div>
              <div>Billiards game interface coming soon</div>
              <div className="text-sm mt-2">This is a placeholder for the {gameId} pool table</div>
            </div>
          </div>
        </Card>

        <div className="flex gap-4 justify-center mt-4">
          <Button variant="outline" onClick={() => navigate('/games')}>
            Forfeit
          </Button>
        </div>
      </div>
    </div>
  )
}

