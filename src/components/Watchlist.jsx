import { useEffect, useState } from 'react';
import { api } from '../utils/api';

export default function Watchlist({ token }) {
  const [items, setItems] = useState([]);
  const [symbol, setSymbol] = useState('TSLA');

  const load = async () => {
    if (!token) return;
    const res = await api('/watchlist', { token });
    setItems(res);
  }

  const add = async () => {
    const res = await api('/watchlist', { method: 'POST', body: { symbol }, token });
    setItems(prev => [res, ...prev]);
    setSymbol('');
  }

  const remove = async (id) => {
    await api(`/watchlist/${id}`, { method: 'DELETE', token });
    setItems(prev => prev.filter(i => i.id !== id));
  }

  useEffect(() => { load(); }, [token]);

  return (
    <section className="relative py-14">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl">
          <div className="flex items-end gap-3">
            <div>
              <label className="block text-white/80 text-sm mb-1">Add symbol</label>
              <input value={symbol} onChange={e=>setSymbol(e.target.value.toUpperCase())} className="bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white" placeholder="e.g. NVDA" />
            </div>
            <button disabled={!token || !symbol} onClick={add} className="px-5 py-2.5 rounded-xl bg-emerald-400 text-slate-900 font-semibold shadow-lg">Add</button>
          </div>

          <div className="mt-6 grid md:grid-cols-3 gap-3">
            {items.map(i => (
              <div key={i.id} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white flex items-center justify-between">
                <div>
                  <div className="font-semibold">{i.symbol}</div>
                  {i.note && <div className="text-white/70 text-sm">{i.note}</div>}
                </div>
                <button onClick={() => remove(i.id)} className="text-white/70 hover:text-white text-sm">Remove</button>
              </div>
            ))}
            {items.length===0 && <div className="text-white/70">{token? 'No items yet' : 'Login to manage your watchlist.'}</div>}
          </div>
        </div>
      </div>
    </section>
  );
}
