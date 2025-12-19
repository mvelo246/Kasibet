import React, { useState } from 'react'
import { useMatch } from '../context/MatchContext'
import Card from '../components/Card'

export default function History() {
  const { matchHistory } = useMatch()
  const [filter, setFilter] = useState('all')

  const filteredHistory = matchHistory.filter((match) => {
    if (filter === 'all') return true
    if (filter === 'won') return match.result === 'won'
    if (filter === 'lost') return match.result === 'lost'
    return true
  })

  return (
    <div className="min-h-screen p-4 lg:p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Match History</h1>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-semibold ${
            filter === 'all'
              ? 'bg-kasibet-accent text-black'
              : 'bg-kasibet-bg-card border border-kasibet-border hover:border-kasibet-accent'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('won')}
          className={`px-4 py-2 rounded-lg font-semibold ${
            filter === 'won'
              ? 'bg-kasibet-accent text-black'
              : 'bg-kasibet-bg-card border border-kasibet-border hover:border-kasibet-accent'
          }`}
        >
          Won
        </button>
        <button
          onClick={() => setFilter('lost')}
          className={`px-4 py-2 rounded-lg font-semibold ${
            filter === 'lost'
              ? 'bg-kasibet-accent text-black'
              : 'bg-kasibet-bg-card border border-kasibet-border hover:border-kasibet-accent'
          }`}
        >
          Lost
        </button>
      </div>

      {filteredHistory.length > 0 ? (
        <div className="space-y-4">
          {filteredHistory.map((match) => (
            <Card key={match.id} hover={false}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-lg mb-1">{match.gameId}</div>
                  <div className="text-sm text-gray-400">
                    vs {match.opponentId === 'random' ? 'Random Player' : match.opponentId}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(match.completedAt || match.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`font-bold text-lg ${
                      match.result === 'won' ? 'text-kasibet-success' : 'text-kasibet-danger'
                    }`}
                  >
                    {match.result === 'won' ? '+' : '-'}R{match.winnings?.toFixed(2) || match.betAmount.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-400">Bet: R{match.betAmount}</div>
                  <div
                    className={`text-xs font-semibold mt-1 ${
                      match.result === 'won' ? 'text-kasibet-success' : 'text-kasibet-danger'
                    }`}
                  >
                    {match.result === 'won' ? 'WON' : 'LOST'}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card hover={false}>
          <div className="text-center py-12 text-gray-400">
            <div className="text-4xl mb-4">📊</div>
            <div className="text-lg font-semibold mb-2">No matches yet</div>
            <div>Start playing to see your match history here</div>
          </div>
        </Card>
      )}
    </div>
  )
}

