import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useMatch } from '../context/MatchContext'
import Card from '../components/Card'
import Button from '../components/Button'
import { IoCheckmarkCircle, IoTimeOutline, IoCloseCircle, IoLockClosed } from 'react-icons/io5'

export default function Profile() {
  const { user } = useAuth()
  const { matchHistory } = useMatch()

  const stats = {
    totalMatches: matchHistory.length,
    wins: matchHistory.filter(m => m.result === 'won').length,
    losses: matchHistory.filter(m => m.result === 'lost').length,
    totalWinnings: matchHistory
      .filter(m => m.result === 'won')
      .reduce((sum, m) => sum + (m.winnings || 0), 0),
    winRate: matchHistory.length > 0
      ? ((matchHistory.filter(m => m.result === 'won').length / matchHistory.length) * 100).toFixed(1)
      : 0,
  }

  return (
    <div className="min-h-screen p-4 lg:p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      <Card className="mb-6">
        <div className="text-center py-6">
          <div className="w-24 h-24 bg-kasibet-accent rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
            {user?.username?.[0]?.toUpperCase() || 'U'}
          </div>
          <h2 className="text-2xl font-bold mb-2">{user?.username || 'User'}</h2>
          <p className="text-gray-400 mb-4">{user?.email}</p>
          
          {/* Verification Status */}
          <div className="flex items-center justify-center gap-2 mb-4">
            {user?.verification?.status === 'verified' ? (
              <div className="flex items-center gap-2 text-kasibet-success">
                <IoCheckmarkCircle className="w-5 h-5" />
                <span className="text-sm font-semibold">Verified</span>
              </div>
            ) : user?.verification?.status === 'pending' ? (
              <div className="flex items-center gap-2 text-kasibet-warning">
                <IoTimeOutline className="w-5 h-5" />
                <span className="text-sm font-semibold">Verification Pending</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-gray-400">
                <IoLockClosed className="w-5 h-5" />
                <span className="text-sm">Not Verified</span>
              </div>
            )}
          </div>
          
          {user?.verification?.status !== 'verified' && (
            <Link to="/profile/verify">
              <Button variant="primary" className="text-sm">
                {user?.verification?.status === 'pending' ? 'View Status' : 'Verify Account'}
              </Button>
            </Link>
          )}
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-kasibet-accent mb-2">
              {stats.totalMatches}
            </div>
            <div className="text-gray-400">Total Matches</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-kasibet-accent mb-2">
              {stats.winRate}%
            </div>
            <div className="text-gray-400">Win Rate</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-kasibet-success mb-2">
              R{stats.totalWinnings.toFixed(2)}
            </div>
            <div className="text-gray-400">Total Winnings</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-kasibet-accent mb-2">
              {stats.wins}W / {stats.losses}L
            </div>
            <div className="text-gray-400">Win / Loss</div>
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="text-xl font-semibold mb-4">Achievements</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.totalMatches > 0 && (
            <div className="text-center p-4 bg-kasibet-bg-modal rounded-lg">
              <div className="text-3xl mb-2">🎮</div>
              <div className="text-sm font-semibold">First Match</div>
            </div>
          )}
          {stats.wins >= 10 && (
            <div className="text-center p-4 bg-kasibet-bg-modal rounded-lg">
              <div className="text-3xl mb-2">🏆</div>
              <div className="text-sm font-semibold">10 Wins</div>
            </div>
          )}
          {stats.totalWinnings >= 1000 && (
            <div className="text-center p-4 bg-kasibet-bg-modal rounded-lg">
              <div className="text-3xl mb-2">💰</div>
              <div className="text-sm font-semibold">R1K Winner</div>
            </div>
          )}
          {stats.winRate >= 70 && stats.totalMatches >= 10 && (
            <div className="text-center p-4 bg-kasibet-bg-modal rounded-lg">
              <div className="text-3xl mb-2">⭐</div>
              <div className="text-sm font-semibold">Pro Player</div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

