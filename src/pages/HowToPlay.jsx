import React from 'react'
import Card from '../components/Card'

export default function HowToPlay() {
  return (
    <div className="min-h-screen p-4 lg:p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">How to Play</h1>

      <Card className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
        <ol className="space-y-3 text-gray-300 list-decimal list-inside">
          <li>Create an account and verify your email</li>
          <li>Make a deposit to your wallet</li>
          <li>Browse available games and select one</li>
          <li>Choose to play with a friend or find a random opponent</li>
          <li>Set your bet amount and start the match</li>
          <li>Play the game and win to earn your winnings!</li>
        </ol>
      </Card>

      <Card className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Game Categories</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-white mb-2">🃏 Card Games</h3>
            <p className="text-gray-300">
              Play Casino, Crazy 8s, 5 Card, Poker, and more. Each game has its own rules and strategies.
              Master the game to increase your chances of winning.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">♟️ Board Games</h3>
            <p className="text-gray-300">
              Challenge opponents in Chess, Checkers, Backgammon, and Ludo. These games require
              strategy, planning, and skill.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">🎱 Billiards</h3>
            <p className="text-gray-300">
              Show off your pool skills in 8-Ball, 9-Ball, Snooker, and more. Precision and
              strategy are key to winning.
            </p>
          </div>
        </div>
      </Card>

      <Card className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Betting Mechanics</h2>
        <div className="space-y-3 text-gray-300">
          <p>
            <strong className="text-white">Bet Amount:</strong> You and your opponent agree on
            a bet amount before the match starts. The winner takes the total pot (both bets).
          </p>
          <p>
            <strong className="text-white">Minimum Bets:</strong> Each game has a minimum bet
            requirement. Check the game card for specific amounts.
          </p>
          <p>
            <strong className="text-white">Winnings:</strong> If you win, your winnings are
            automatically added to your wallet. You can withdraw them at any time.
          </p>
        </div>
      </Card>

      <Card>
        <h2 className="text-2xl font-semibold mb-4">Tips for Success</h2>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-start">
            <span className="text-kasibet-accent mr-2">✓</span>
            <span>Practice makes perfect - play free games to improve your skills</span>
          </li>
          <li className="flex items-start">
            <span className="text-kasibet-accent mr-2">✓</span>
            <span>Start with smaller bets until you're comfortable</span>
          </li>
          <li className="flex items-start">
            <span className="text-kasibet-accent mr-2">✓</span>
            <span>Know the rules of each game before betting</span>
          </li>
          <li className="flex items-start">
            <span className="text-kasibet-accent mr-2">✓</span>
            <span>Set a budget and stick to it</span>
          </li>
          <li className="flex items-start">
            <span className="text-kasibet-accent mr-2">✓</span>
            <span>Take breaks and play responsibly</span>
          </li>
        </ul>
      </Card>
    </div>
  )
}

