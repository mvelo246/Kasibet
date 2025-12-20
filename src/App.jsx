import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Games from './pages/Games'
import OpponentSelection from './pages/OpponentSelection'
import Lobby from './pages/Lobby'
import Wallet from './pages/Wallet'
import Deposit from './pages/Deposit'
import Withdraw from './pages/Withdraw'
import History from './pages/History'
import Profile from './pages/Profile'
import ProfileVerification from './pages/ProfileVerification'
import Leaderboard from './pages/Leaderboard'
import FAQ from './pages/FAQ'
import Help from './pages/Help'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import About from './pages/About'
import Contact from './pages/Contact'
import ResponsibleGaming from './pages/ResponsibleGaming'
import HowToPlay from './pages/HowToPlay'
import Chat from './pages/Chat'
import PlayCards from './pages/PlayCards'
import PlayBoard from './pages/PlayBoard'
import PlayBilliards from './pages/PlayBilliards'
import { AuthProvider } from './context/AuthContext'
import { WalletProvider } from './context/WalletContext'
import { MatchProvider } from './context/MatchContext'
import { GameProvider } from './context/GameContext'
import { ChatProvider } from './context/ChatContext'

function App() {
  return (
    <AuthProvider>
      <WalletProvider>
        <MatchProvider>
          <GameProvider>
            <ChatProvider>
              <Router>
                <ScrollToTop />
                <Layout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/games" element={<Games />} />
                    <Route path="/games/:gameId/opponent" element={<OpponentSelection />} />
                    <Route path="/lobby/:matchId" element={<Lobby />} />
                    <Route path="/play/cards/:gameId/:matchId" element={<PlayCards />} />
                    <Route path="/play/board/:gameId/:matchId" element={<PlayBoard />} />
                    <Route path="/play/billiards/:gameId/:matchId" element={<PlayBilliards />} />
                    <Route path="/wallet" element={<Wallet />} />
                    <Route path="/deposit" element={<Deposit />} />
                    <Route path="/withdraw" element={<Withdraw />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/profile/verify" element={<ProfileVerification />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/help" element={<Help />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/responsible-gaming" element={<ResponsibleGaming />} />
                    <Route path="/how-to-play" element={<HowToPlay />} />
                    <Route path="/chat" element={<Chat />} />
                  </Routes>
                </Layout>
              </Router>
            </ChatProvider>
          </GameProvider>
        </MatchProvider>
      </WalletProvider>
    </AuthProvider>
  )
}

export default App

