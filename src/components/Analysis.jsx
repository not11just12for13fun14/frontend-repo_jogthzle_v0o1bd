import { useEffect, useState } from 'react';
import { api } from '../utils/api';

export default function Analysis({ token }) {
  const [symbol, setSymbol] = useState('AAPL');
  const [timeframe, setTimeframe] = useState('1D');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const run = async () => {
    setLoading(true);
    try {
      const res = await api('/analysis', { method: 'POST', body: { symbol, timeframe, strategy: 'SMA', lookback: 20 }, token });
      setResult(res);
    } catch (e) {
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) run();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <section id="analysis" className="relative py-14">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl">
          <div className="flex flex-wrap items-end gap-3">
            <div>
              <label className="block text-white/80 text-sm mb-1">Symbol</label>
              <input value={symbol} onChange={e=>setSymbol(e.target.value.toUpperCase())} className="bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white" />
            </div>
            <div>
              <label className="block text-white/80 text-sm mb-1">Timeframe</label>
              <select value={timeframe} onChange={e=>setTimeframe(e.target.value)} className="bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white">
                {['1m','5m','15m','1H','4H','1D','1W'].map(tf=> <option key={tf} value={tf}>{tf}</option>)}
              </select>
            </div>
            <button onClick={run} disabled={!token || loading} className="px-5 py-2.5 rounded-xl bg-white text-slate-900 font-semibold shadow-lg">
              {loading? 'Analyzing...' : 'Run Analysis'}
            </button>
          </div>

          <div className="mt-6 grid md:grid-cols-4 gap-4 text-white">
            {result ? (
              <>
                <Card title="Symbol" value={result.symbol} />
                <Card title="Last Price" value={`$${result.last}`} />
                <Card title="SMA" value={`$${result.sma}`} />
                <Card title="Signal" value={`${result.signal.toUpperCase()} (${Math.round(result.confidence*100)}%)`} />
              </>
            ) : (
              <div className="md:col-span-4 text-white/70">{token? 'Enter a symbol and run analysis.' : 'Login to use analysis.'}</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ title, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-5">
      <div className="text-white/70 text-xs">{title}</div>
      <div className="text-white text-2xl font-semibold mt-1">{value}</div>
    </div>
  )
}
