import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWallet } from '../context/WalletContext'
import Card from '../components/Card'
import Button from '../components/Button'
import Input from '../components/Input'
import BottomSheet from '../components/BottomSheet'

export default function Deposit() {
  const navigate = useNavigate()
  const { deposit } = useWallet()
  const [amount, setAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [showMethodSheet, setShowMethodSheet] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
    { id: 'bank', name: 'Bank Transfer', icon: '🏦' },
    { id: 'mobile', name: 'Mobile Money', icon: '📱' },
    { id: 'crypto', name: 'Cryptocurrency', icon: '₿' },
  ]

  const handleDeposit = async () => {
    if (!paymentMethod) {
      setError('Please select a payment method')
      return
    }

    const depositAmount = parseFloat(amount)
    if (!depositAmount || depositAmount < 10) {
      setError('Minimum deposit is R10')
      return
    }

    setLoading(true)
    setError('')

    try {
      await deposit(depositAmount)
      navigate('/wallet')
    } catch (err) {
      setError(err.message || 'Deposit failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-4 lg:p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Deposit Funds</h1>

      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
        <button
          onClick={() => setShowMethodSheet(true)}
          className="w-full p-4 bg-kasibet-bg-modal border border-kasibet-border rounded-lg text-left hover:border-kasibet-accent transition-colors"
        >
          {paymentMethod ? (
            <div className="flex items-center gap-3">
              <span className="text-2xl">
                {paymentMethods.find(m => m.id === paymentMethod)?.icon}
              </span>
              <span>{paymentMethods.find(m => m.id === paymentMethod)?.name}</span>
            </div>
          ) : (
            <span className="text-gray-400">Select payment method</span>
          )}
        </button>
      </Card>

      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Amount</h2>
        <Input
          type="number"
          min="10"
          step="10"
          placeholder="Enter amount (min R10)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div className="flex gap-2 mt-2">
          {[50, 100, 250, 500].map((amt) => (
            <button
              key={amt}
              onClick={() => setAmount(amt.toString())}
              className={`px-3 py-1 rounded text-sm ${
                amount === amt.toString()
                  ? 'bg-kasibet-accent text-black'
                  : 'bg-kasibet-bg-card border border-kasibet-border hover:border-kasibet-accent'
              }`}
            >
              R{amt}
            </button>
          ))}
        </div>
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
          onClick={handleDeposit}
          disabled={loading || !amount || !paymentMethod}
          className="flex-1"
        >
          {loading ? 'Processing...' : 'Deposit'}
        </Button>
      </div>

      <BottomSheet
        isOpen={showMethodSheet}
        onClose={() => setShowMethodSheet(false)}
        title="Select Payment Method"
      >
        <div className="space-y-2">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => {
                setPaymentMethod(method.id)
                setShowMethodSheet(false)
              }}
              className="w-full p-4 bg-kasibet-bg-card border border-kasibet-border rounded-lg text-left hover:border-kasibet-accent transition-colors flex items-center gap-3"
            >
              <span className="text-2xl">{method.icon}</span>
              <span className="font-semibold">{method.name}</span>
            </button>
          ))}
        </div>
      </BottomSheet>
    </div>
  )
}

