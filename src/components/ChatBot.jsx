import { useState } from 'react';
import { api } from '../utils/api';

export default function ChatBot({ token }) {
  const [input, setInput] = useState('What about AAPL today?');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'I am your AI trading copilot. Ask me about a symbol, risk or entries.' }
  ]);
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim()) return;
    const msg = { role: 'user', content: input };
    setMessages(prev => [...prev, msg]);
    setInput('');
    setLoading(true);
    try {
      const res = await api('/chat', { method: 'POST', body: { message: msg.content }, token });
      setMessages(prev => [...prev, { role: 'assistant', content: res.reply }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error contacting AI. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative py-14">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl">
          <h3 className="text-white text-xl font-semibold mb-4">AI Bot</h3>
          <div className="space-y-3 max-h-64 overflow-auto pr-2">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role==='user'?'justify-end':''}`}>
                <div className={`rounded-2xl px-4 py-2 text-sm ${m.role==='user'?'bg-emerald-400 text-slate-900':'bg-white/10 text-white'}`}>{m.content}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <input value={input} onChange={e=>setInput(e.target.value)} className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white" placeholder="Type your question..." />
            <button disabled={!token || loading} onClick={send} className="px-5 py-2.5 rounded-xl bg-white text-slate-900 font-semibold shadow-lg">{loading? '...' : 'Send'}</button>
          </div>
          {!token && <p className="text-white/70 text-sm mt-2">Login to chat with the bot.</p>}
        </div>
      </div>
    </section>
  );
}
