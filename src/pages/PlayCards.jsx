import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import { useWallet } from '../context/WalletContext'
import { useMatch } from '../context/MatchContext'
import Card from '../components/Card'
import Button from '../components/Button'

export default function PlayCards() {
  const { gameId, matchId } = useParams()
  const navigate = useNavigate()
  const { gameState, updateGameState } = useGame()
  const { updateBalance } = useWallet()
  const { completeMatch } = useMatch()
  const [playerHand, setPlayerHand] = useState([5, 7])
  const [opponentHand, setOpponentHand] = useState([9])
  const [playerScore, setPlayerScore] = useState(12)
  const [opponentScore, setOpponentScore] = useState(9)
  const [gameOver, setGameOver] = useState(false)
  const [result, setResult] = useState(null)

  const handleHit = () => {
    const newCard = Math.floor(Math.random() * 10) + 1
    const newHand = [...playerHand, newCard]
    const newScore = newHand.reduce((sum, card) => sum + card, 0)
    
    setPlayerHand(newHand)
    setPlayerScore(newScore)
    
    if (newScore > 21) {
      setGameOver(true)
      setResult('lost')
      handleGameEnd('lost')
    }
  }

  const handleStand = () => {
    // Opponent plays
    const opponentNewCard = Math.floor(Math.random() * 10) + 1
    const newOpponentHand = [...opponentHand, opponentNewCard]
    const newOpponentScore = newOpponentHand.reduce((sum, card) => sum + card, 0)
    
    setOpponentHand(newOpponentHand)
    setOpponentScore(newOpponentScore)
    
    let gameResult = null
    if (newOpponentScore > 21 || playerScore > newOpponentScore) {
      gameResult = 'won'
    } else if (newOpponentScore > playerScore) {
      gameResult = 'lost'
    } else {
      gameResult = 'draw'
    }
    
    setGameOver(true)
    setResult(gameResult)
    handleGameEnd(gameResult)
  }

  const handleGameEnd = (gameResult) => {
    const winnings = gameResult === 'won' ? 100 : gameResult === 'draw' ? 0 : -50
    updateBalance(winnings)
    completeMatch(matchId, gameResult, winnings > 0 ? winnings : 0)
  }

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
          <div className="text-center mb-4">
            <div className="text-xl font-semibold mb-2">Pot: R100</div>
            {gameOver && (
              <div className={`text-2xl font-bold ${
                result === 'won' ? 'text-kasibet-success' :
                result === 'lost' ? 'text-kasibet-danger' :
                'text-gray-400'
              }`}>
                {result === 'won' ? 'You Won!' : result === 'lost' ? 'You Lost!' : 'Draw!'}
              </div>
            )}
          </div>
        </Card>

        {/* Opponent Area */}
        <Card className="mb-4">
          <div className="text-center">
            <div className="font-semibold mb-2">Opponent</div>
            <div className="flex justify-center gap-2 mb-2">
              {opponentHand.map((card, idx) => (
                <div key={idx} className="w-16 h-24 bg-white text-black rounded flex items-center justify-center font-bold text-xl">
                  {card}
                </div>
              ))}
            </div>
            <div className="text-kasibet-accent font-bold">Score: {opponentScore}</div>
          </div>
        </Card>

        {/* Player Area */}
        <Card className="mb-4">
          <div className="text-center">
            <div className="font-semibold mb-2">Your Hand</div>
            <div className="flex justify-center gap-2 mb-2">
              {playerHand.map((card, idx) => (
                <div key={idx} className="w-16 h-24 bg-kasibet-accent text-black rounded flex items-center justify-center font-bold text-xl">
                  {card}
                </div>
              ))}
            </div>
            <div className="text-kasibet-accent font-bold">Score: {playerScore}</div>
          </div>
        </Card>

        {/* Game Actions */}
        {!gameOver && (
          <div className="flex gap-4 justify-center">
            <Button variant="primary" onClick={handleHit}>
              Hit
            </Button>
            <Button variant="secondary" onClick={handleStand}>
              Stand
            </Button>
          </div>
        )}

        {gameOver && (
          <div className="text-center">
            <Button variant="primary" onClick={() => navigate('/games')}>
              Play Again
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

