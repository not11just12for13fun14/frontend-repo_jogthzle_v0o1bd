import { useState } from 'react';
import { api } from '../utils/api';

export default function Auth({ onAuth }) {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const path = mode === 'login' ? '/auth/login' : '/auth/signup';
      const payload = mode === 'login' ? { email, password } : { name, email, password };
      const res = await api(path, { method: 'POST', body: payload });
      onAuth(res.token, res.user);
    } catch (err) {
      setError('Authentication failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="auth" className="relative py-14">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-2xl font-bold">Join the Pack</h2>
              <div className="bg-white/10 rounded-full p-1 text-white text-xs">
                <button onClick={() => setMode('login')} className={`px-3 py-1 rounded-full ${mode==='login'?'bg-white text-slate-900':'text-white'}`}>Login</button>
                <button onClick={() => setMode('signup')} className={`px-3 py-1 rounded-full ${mode==='signup'?'bg-white text-slate-900':'text-white'}`}>Sign up</button>
              </div>
            </div>
            <form onSubmit={submit} className="space-y-4">
              {mode==='signup' && (
                <div>
                  <label className="block text-white/80 mb-1">Name</label>
                  <input value={name} onChange={e=>setName(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400" placeholder="Jordan Belfort" required />
                </div>
              )}
              <div>
                <label className="block text-white/80 mb-1">Email</label>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400" placeholder="you@wolf.site" required />
              </div>
              <div>
                <label className="block text-white/80 mb-1">Password</label>
                <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400" placeholder="••••••••" required />
              </div>
              {error && <p className="text-red-300 text-sm">{error}</p>}
              <button disabled={loading} className="w-full px-5 py-3 rounded-xl bg-emerald-400 text-slate-900 font-semibold shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition disabled:opacity-60">{loading? 'Please wait...' : mode==='login'?'Login':'Create account'}</button>
            </form>
          </div>
          <div className="rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 min-h-[320px]">
            <div className="p-6 md:p-10">
              <h3 className="text-white text-xl font-semibold">Why join?</h3>
              <ul className="mt-4 space-y-2 text-white/80 text-sm">
                <li>• AI trading copilot with smart signals</li>
                <li>• Real-time watchlist and analytics</li>
                <li>• Beautiful glass dashboard experience</li>
              </ul>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="aspect-[4/3] rounded-xl bg-white/10 animate-pulse" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
