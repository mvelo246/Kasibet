import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'

export default function Home() {
  const cardGames = [
    { id: 'poker', name: 'Poker', minBet: 10, players: 1234, icon: '🃏' },
    { id: 'blackjack', name: 'Blackjack', minBet: 5, players: 892, icon: '🎴' },
    { id: 'rummy', name: 'Rummy', minBet: 15, players: 567, icon: '🂡' },
    { id: 'baccarat', name: 'Baccarat', minBet: 20, players: 445, icon: '🎰' },
    { id: 'casino', name: 'Casino', minBet: 10, players: 678, icon: '🎲' },
    { id: 'crazy8', name: 'Crazy 8', minBet: 8, players: 523, icon: '🃎' },
    { id: '5card', name: '5 Card', minBet: 12, players: 789, icon: '🂮' },
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="mt-8 mx-4 lg:mx-16 rounded-2xl overflow-hidden relative">
        <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 p-8 md:p-16 rounded-2xl">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Bet on Your Skills
            </h1>
            <p className="text-lg md:text-xl text-gray-900 mb-6">
              Challenge players worldwide in card games, board games, and billiards. Win real money!
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/games">
                <Button variant="secondary" className="bg-black text-kasibet-accent hover:bg-gray-900">
                  Start Playing Now
                </Button>
              </Link>
              <Link to="/how-to-play">
                <Button variant="secondary">
                  How It Works
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mt-10 mx-4 lg:mx-16">
        <div className="grid grid-cols-3 gap-4 md:gap-6">
          <Card>
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-bold text-kasibet-accent mb-2">
                R2.5M+
              </div>
              <div className="text-xs md:text-sm text-gray-400">Paid to Winners</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-bold text-kasibet-accent mb-2">
                50K+
              </div>
              <div className="text-xs md:text-sm text-gray-400">Active Players</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-bold text-kasibet-accent mb-2">
                10K+
              </div>
              <div className="text-xs md:text-sm text-gray-400">Daily Matches</div>
            </div>
          </Card>
        </div>
      </section>

      {/* Game Categories */}
      <section className="mt-10 mx-4 lg:mx-16 space-y-10">
        {/* Card Games */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">🃏 Card Games</h2>
            <Link to="/games?category=cards">
              <button className="btn-outline text-sm">SEE ALL</button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cardGames.slice(0, 4).map((game) => (
              <Card key={game.id}>
                  <div className="gradient-card-games h-32 flex items-center justify-center text-4xl rounded-lg mb-3">
                    {game.icon}
                  </div>
                  <h3 className="font-bold mb-1">{game.name}</h3>
                  <p className="text-xs text-gray-400 mb-2">
                    Min: R{game.minBet} • {game.players.toLocaleString()} players
                  </p>
                  <Link to={`/games/${game.id}/opponent`}>
                    <Button variant="primary" className="w-full text-xs py-2">
                      Play Now
                    </Button>
                  </Link>
                </Card>
              ))}
          </div>
        </div>

        {/* Board Games */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">♟️ Board Games</h2>
            <Link to="/games?category=board">
              <button className="btn-outline text-sm">SEE ALL</button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {boardGames.slice(0, 4).map((game) => (
              <Card key={game.id}>
                  <div className="gradient-board-games h-32 flex items-center justify-center text-4xl rounded-lg mb-3">
                    {game.icon}
                  </div>
                  <h3 className="font-bold mb-1">{game.name}</h3>
                  <p className="text-xs text-gray-400 mb-2">
                    Min: R{game.minBet} • {game.players.toLocaleString()} players
                  </p>
                  <Link to={`/games/${game.id}/opponent`}>
                    <Button variant="primary" className="w-full text-xs py-2">
                      Play Now
                    </Button>
                  </Link>
                </Card>
              ))}
          </div>
        </div>

        {/* Billiards Games */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">🎱 Billiards Games</h2>
            <Link to="/games?category=billiards">
              <button className="btn-outline text-sm">SEE ALL</button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {billiardsGames.slice(0, 4).map((game) => (
              <Card key={game.id}>
                  <div className="gradient-billiards h-32 flex items-center justify-center text-4xl rounded-lg mb-3">
                    {game.icon}
                  </div>
                  <h3 className="font-bold mb-1">{game.name}</h3>
                  <p className="text-xs text-gray-400 mb-2">
                    Min: R{game.minBet} • {game.players.toLocaleString()} players
                  </p>
                  <Link to={`/games/${game.id}/opponent`}>
                    <Button variant="primary" className="w-full text-xs py-2">
                      Play Now
                    </Button>
                  </Link>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* Why Choose KasiBet */}
      <section className="mt-10 mx-4 lg:mx-16 mb-10">
        <h2 className="text-2xl font-bold text-center mb-8">Why Choose KasiBet?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <div className="text-center">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-lg font-bold mb-2">Secure & Safe</h3>
              <p className="text-sm text-gray-400">
                Bank-level encryption protects all your transactions and personal data
              </p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-lg font-bold mb-2">Instant Payouts</h3>
              <p className="text-sm text-gray-400">
                Win and withdraw your money immediately with no delays
              </p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-4xl mb-4">⚖️</div>
              <h3 className="text-lg font-bold mb-2">Fair Play</h3>
              <p className="text-sm text-gray-400">
                Skill-based matching ensures competitive and fair games
              </p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}

