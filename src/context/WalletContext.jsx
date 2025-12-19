import { createContext, useContext, useState, useEffect } from 'react'

const WalletContext = createContext()

export function WalletProvider({ children }) {
  // Get user from localStorage to avoid circular dependency
  const getUser = () => {
    const storedUser = localStorage.getItem('kasibet_user')
    return storedUser ? JSON.parse(storedUser) : null
  }
  const [balance, setBalance] = useState(0)
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    const user = getUser()
    if (user) {
      // Load wallet data from localStorage
      const storedBalance = localStorage.getItem(`kasibet_balance_${user.id}`)
      const storedTransactions = localStorage.getItem(`kasibet_transactions_${user.id}`)
      
      if (storedBalance) {
        setBalance(parseFloat(storedBalance))
      } else {
        setBalance(0)
      }
      
      if (storedTransactions) {
        setTransactions(JSON.parse(storedTransactions))
      }
    }
  }, [])

  const deposit = (amount) => {
    const newBalance = balance + amount
    setBalance(newBalance)
    
    const transaction = {
      id: Date.now().toString(),
      type: 'deposit',
      amount,
      balance: newBalance,
      timestamp: new Date().toISOString(),
      status: 'completed',
    }
    
    const newTransactions = [transaction, ...transactions]
    setTransactions(newTransactions)
    
    const user = getUser()
    if (user) {
      localStorage.setItem(`kasibet_balance_${user.id}`, newBalance.toString())
      localStorage.setItem(`kasibet_transactions_${user.id}`, JSON.stringify(newTransactions))
    }
    
    return Promise.resolve(transaction)
  }

  const withdraw = (amount) => {
    if (amount > balance) {
      return Promise.reject(new Error('Insufficient balance'))
    }
    
    const newBalance = balance - amount
    setBalance(newBalance)
    
    const transaction = {
      id: Date.now().toString(),
      type: 'withdraw',
      amount,
      balance: newBalance,
      timestamp: new Date().toISOString(),
      status: 'pending',
    }
    
    const newTransactions = [transaction, ...transactions]
    setTransactions(newTransactions)
    
    const user = getUser()
    if (user) {
      localStorage.setItem(`kasibet_balance_${user.id}`, newBalance.toString())
      localStorage.setItem(`kasibet_transactions_${user.id}`, JSON.stringify(newTransactions))
    }
    
    return Promise.resolve(transaction)
  }

  const updateBalance = (amount) => {
    const newBalance = balance + amount
    setBalance(newBalance)
    
    const user = getUser()
    if (user) {
      localStorage.setItem(`kasibet_balance_${user.id}`, newBalance.toString())
    }
  }

  return (
    <WalletContext.Provider value={{ balance, transactions, deposit, withdraw, updateBalance }}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider')
  }
  return context
}

