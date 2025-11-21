import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import Auth from './components/Auth'
import Analysis from './components/Analysis'
import Watchlist from './components/Watchlist'
import ChatBot from './components/ChatBot'

function App() {
  const [token, setToken] = useState(localStorage.getItem('wolf_token') || '')
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('wolf_user') || 'null'))

  const onAuth = (tkn, usr) => {
    setToken(tkn)
    setUser(usr)
    localStorage.setItem('wolf_token', tkn)
    localStorage.setItem('wolf_user', JSON.stringify(usr))
  }

  const logout = () => {
    localStorage.removeItem('wolf_token')
    localStorage.removeItem('wolf_user')
    setToken('')
    setUser(null)
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <header className="fixed top-0 left-0 right-0 z-20">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-400" />
            <span className="text-white font-semibold">Wolf of Wall Street.site</span>
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="text-white/80 text-sm">Hi, {user.name}</span>
                <button onClick={logout} className="px-4 py-2 rounded-xl bg-white/10 text-white border border-white/20">Logout</button>
              </>
            ) : (
              <a href="#auth" className="px-4 py-2 rounded-xl bg-white text-slate-900 font-semibold">Login</a>
            )}
          </div>
        </div>
      </header>

      <main className="pt-16">
        <Hero />
        <Auth onAuth={onAuth} />
        <Analysis token={token} />
        <Watchlist token={token} />
        <ChatBot token={token} />
      </main>

      <footer className="py-10 text-center text-white/60">
        © {new Date().getFullYear()} Wolf of Wall Street.site — For educational purposes only, not financial advice.
      </footer>
    </div>
  )
}

export default App
