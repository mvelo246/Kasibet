import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const MatchContext = createContext()

export function MatchProvider({ children }) {
  const { user } = useAuth()
  const [activeMatches, setActiveMatches] = useState([])
  const [matchHistory, setMatchHistory] = useState([])

  useEffect(() => {
    if (user) {
      const storedHistory = localStorage.getItem(`kasibet_history_${user.id}`)
      if (storedHistory) {
        setMatchHistory(JSON.parse(storedHistory))
      }
    }
  }, [user])

  const createMatch = (gameId, opponentId, betAmount) => {
    const match = {
      id: Date.now().toString(),
      gameId,
      opponentId,
      betAmount,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }
    
    setActiveMatches([...activeMatches, match])
    return match
  }

  const completeMatch = (matchId, result, winnings) => {
    const match = activeMatches.find(m => m.id === matchId)
    if (!match) return

    const completedMatch = {
      ...match,
      status: 'completed',
      result,
      winnings,
      completedAt: new Date().toISOString(),
    }

    setActiveMatches(activeMatches.filter(m => m.id !== matchId))
    const newHistory = [completedMatch, ...matchHistory]
    setMatchHistory(newHistory)

    if (user) {
      localStorage.setItem(`kasibet_history_${user.id}`, JSON.stringify(newHistory))
    }

    return completedMatch
  }

  return (
    <MatchContext.Provider value={{ activeMatches, matchHistory, createMatch, completeMatch }}>
      {children}
    </MatchContext.Provider>
  )
}

export function useMatch() {
  const context = useContext(MatchContext)
  if (!context) {
    throw new Error('useMatch must be used within MatchProvider')
  }
  return context
}

