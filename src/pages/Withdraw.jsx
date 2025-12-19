import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWallet } from '../context/WalletContext'
import Card from '../components/Card'
import Button from '../components/Button'
import Input from '../components/Input'

export default function Withdraw() {
  const navigate = useNavigate()
  const { balance, withdraw } = useWallet()
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleWithdraw = async () => {
    const withdrawAmount = parseFloat(amount)
    
    if (!withdrawAmount || withdrawAmount < 50) {
      setError('Minimum withdrawal is R50')
      return
    }

    if (withdrawAmount > balance) {
      setError('Insufficient balance')
      return
    }

    setLoading(true)
    setError('')

    try {
      await withdraw(withdrawAmount)
      navigate('/wallet')
    } catch (err) {
      setError(err.message || 'Withdrawal failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-4 lg:p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Withdraw Funds</h1>

      <Card className="mb-6">
        <div className="text-center py-4">
          <div className="text-sm text-gray-400 mb-2">Available Balance</div>
          <div className="text-3xl font-bold text-kasibet-accent">
            R{balance.toFixed(2)}
          </div>
        </div>
      </Card>

      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Withdrawal Amount</h2>
        <Input
          type="number"
          min="50"
          max={balance}
          step="10"
          placeholder="Enter amount (min R50)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div className="flex gap-2 mt-2">
          {[100, 250, 500, balance].filter(amt => amt > 0).map((amt) => (
            <button
              key={amt}
              onClick={() => setAmount(Math.min(amt, balance).toString())}
              className={`px-3 py-1 rounded text-sm ${
                amount === amt.toString()
                  ? 'bg-kasibet-accent text-black'
                  : 'bg-kasibet-bg-card border border-kasibet-border hover:border-kasibet-accent'
              }`}
            >
              R{amt === balance ? 'All' : amt}
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-400 mt-4">
          Processing time: 1-3 business days
        </p>
      </Card>

      {error && (
        <div className="mb-4 p-3 bg-red-900/20 border border-red-500 rounded text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-4">
        <Button variant="outline" onClick={() => navigate('/wallet')} className="flex-1">
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleWithdraw}
          disabled={loading || !amount}
          className="flex-1"
        >
          {loading ? 'Processing...' : 'Withdraw'}
        </Button>
      </div>
    </div>
  )
}

