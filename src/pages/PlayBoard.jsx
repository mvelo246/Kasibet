import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'

export default function PlayBoard() {
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
          <div className="aspect-square bg-kasibet-bg-modal rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-400">
              <div className="text-6xl mb-4">♟️</div>
              <div>Board game interface coming soon</div>
              <div className="text-sm mt-2">This is a placeholder for the {gameId} game board</div>
            </div>
          </div>
        </Card>

        <div className="flex gap-4 justify-center mt-4">
          <Button variant="outline" onClick={() => navigate('/games')}>
            Resign
          </Button>
          <Button variant="outline">
            Offer Draw
          </Button>
        </div>
      </div>
    </div>
  )
}

