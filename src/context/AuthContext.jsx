import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('kasibet_user')
    const storedVerification = localStorage.getItem('kasibet_verification')
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      if (storedVerification) {
        userData.verification = JSON.parse(storedVerification)
      } else {
        userData.verification = { status: 'not_verified', submittedAt: null }
      }
      setUser(userData)
    }
    setIsLoading(false)
  }, [])

  const login = (email, password) => {
    // Mock login - in real app, this would call an API
    const mockUser = {
      id: '1',
      username: email.split('@')[0],
      email,
      avatar: null,
    }
    setUser(mockUser)
    localStorage.setItem('kasibet_user', JSON.stringify(mockUser))
    return Promise.resolve(mockUser)
  }

  const register = (username, email, password) => {
    // Mock registration
    const mockUser = {
      id: Date.now().toString(),
      username,
      email,
      avatar: null,
    }
    setUser(mockUser)
    localStorage.setItem('kasibet_user', JSON.stringify(mockUser))
    return Promise.resolve(mockUser)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('kasibet_user')
    localStorage.removeItem('kasibet_verification')
  }

  const submitVerification = (idFile, addressFile) => {
    if (!user) return Promise.reject(new Error('User not logged in'))
    
    const verification = {
      status: 'pending',
      submittedAt: new Date().toISOString(),
      idDocument: idFile.name,
      addressDocument: addressFile.name,
    }
    
    const updatedUser = {
      ...user,
      verification,
    }
    
    setUser(updatedUser)
    localStorage.setItem('kasibet_user', JSON.stringify(updatedUser))
    localStorage.setItem('kasibet_verification', JSON.stringify(verification))
    
    return Promise.resolve(verification)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, submitVerification }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

