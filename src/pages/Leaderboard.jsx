import React, { useState } from 'react'
import Card from '../components/Card'

export default function Leaderboard() {
  const [filter, setFilter] = useState('winnings')

  // Mock leaderboard data
  const leaderboard = [
    { rank: 1, username: 'ProGamer', winnings: 125000, winRate: 78, games: 450 },
    { rank: 2, username: 'Champion', winnings: 98000, winRate: 72, games: 380 },
    { rank: 3, username: 'MasterBet', winnings: 87500, winRate: 75, games: 320 },
    { rank: 4, username: 'LuckyOne', winnings: 72000, winRate: 68, games: 290 },
    { rank: 5, username: 'Winner', winnings: 65000, winRate: 70, games: 250 },
  ]

  const sortedLeaderboard = [...leaderboard].sort((a, b) => {
    if (filter === 'winnings') return b.winnings - a.winnings
    if (filter === 'winrate') return b.winRate - a.winRate
    return b.games - a.games
  })

  return (
    <div className="min-h-screen p-4 lg:p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter('winnings')}
          className={`px-4 py-2 rounded-lg font-semibold ${
            filter === 'winnings'
              ? 'bg-kasibet-accent text-black'
              : 'bg-kasibet-bg-card border border-kasibet-border hover:border-kasibet-accent'
          }`}
        >
          Total Winnings
        </button>
        <button
          onClick={() => setFilter('winrate')}
          className={`px-4 py-2 rounded-lg font-semibold ${
            filter === 'winrate'
              ? 'bg-kasibet-accent text-black'
              : 'bg-kasibet-bg-card border border-kasibet-border hover:border-kasibet-accent'
          }`}
        >
          Win Rate
        </button>
        <button
          onClick={() => setFilter('games')}
          className={`px-4 py-2 rounded-lg font-semibold ${
            filter === 'games'
              ? 'bg-kasibet-accent text-black'
              : 'bg-kasibet-bg-card border border-kasibet-border hover:border-kasibet-accent'
          }`}
        >
          Games Played
        </button>
      </div>

      <div className="space-y-3">
        {sortedLeaderboard.map((player, index) => (
          <Card key={player.rank} hover={false}>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                index === 0 ? 'bg-yellow-500 text-black' :
                index === 1 ? 'bg-gray-400 text-black' :
                index === 2 ? 'bg-orange-600 text-white' :
                'bg-kasibet-bg-modal'
              }`}>
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-lg">{player.username}</div>
                <div className="text-sm text-gray-400">
                  {filter === 'winnings' && `R${player.winnings.toLocaleString()} won`}
                  {filter === 'winrate' && `${player.winRate}% win rate`}
                  {filter === 'games' && `${player.games} games played`}
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-kasibet-accent">
                  {filter === 'winnings' && `R${(player.winnings / 1000).toFixed(0)}K`}
                  {filter === 'winrate' && `${player.winRate}%`}
                  {filter === 'games' && player.games}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

