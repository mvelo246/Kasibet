import React from 'react'
import { Link } from 'react-router-dom'
import { useWallet } from '../context/WalletContext'
import Card from '../components/Card'
import Button from '../components/Button'

export default function Wallet() {
  const { balance, transactions } = useWallet()

  const recentTransactions = transactions.slice(0, 5)

  return (
    <div className="min-h-screen p-4 lg:p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Wallet</h1>

      <Card className="mb-6">
        <div className="text-center py-8">
          <div className="text-5xl font-bold text-kasibet-accent mb-2">
            R{balance.toFixed(2)}
          </div>
          <div className="text-gray-400 mb-6">Available Balance</div>
          <div className="flex gap-4 justify-center">
            <Link to="/deposit">
              <Button variant="primary">Deposit</Button>
            </Link>
            <Link to="/withdraw">
              <Button variant="outline">Withdraw</Button>
            </Link>
          </div>
        </div>
      </Card>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        {recentTransactions.length > 0 ? (
          <div className="space-y-2">
            {recentTransactions.map((transaction) => (
              <Card key={transaction.id} hover={false}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold capitalize">{transaction.type}</div>
                    <div className="text-sm text-gray-400">
                      {new Date(transaction.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`font-bold ${
                        transaction.type === 'deposit'
                          ? 'text-kasibet-success'
                          : 'text-kasibet-danger'
                      }`}
                    >
                      {transaction.type === 'deposit' ? '+' : '-'}R{transaction.amount.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-400">
                      Balance: R{transaction.balance.toFixed(2)}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card hover={false}>
            <div className="text-center py-8 text-gray-400">
              No transactions yet. Make your first deposit to get started!
            </div>
          </Card>
        )}
      </div>

      <Link to="/history">
        <Button variant="outline" className="w-full">
          View All Transactions
        </Button>
      </Link>
    </div>
  )
}

