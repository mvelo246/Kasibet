import { createContext, useContext, useState } from 'react'

const GameContext = createContext()

export function GameProvider({ children }) {
  const [currentGame, setCurrentGame] = useState(null)
  const [opponent, setOpponent] = useState(null)
  const [gameState, setGameState] = useState(null)

  const startGame = (gameId, matchId, opponentData) => {
    setCurrentGame({ gameId, matchId })
    setOpponent(opponentData)
    setGameState({ status: 'active', turn: 'player' })
  }

  const endGame = () => {
    setCurrentGame(null)
    setOpponent(null)
    setGameState(null)
  }

  const updateGameState = (newState) => {
    setGameState(prev => ({ ...prev, ...newState }))
  }

  return (
    <GameContext.Provider value={{ 
      currentGame, 
      opponent, 
      gameState, 
      startGame, 
      endGame, 
      updateGameState 
    }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within GameProvider')
  }
  return context
}

