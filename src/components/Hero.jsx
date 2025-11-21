import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative h-[70vh] min-h-[540px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 h-full flex items-center">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-emerald-300/90 bg-emerald-400/10 rounded-full px-3 py-1 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live • Markets open
            </div>
            <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight text-white">
              Wolf of Wall Street.site
            </h1>
            <p className="mt-3 md:mt-5 text-base md:text-lg text-white/80 max-w-2xl">
              A glassmorphic, AI-powered trading cockpit. Analyze symbols, get signals, and manage your watchlist with a sleek, modern dashboard.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#auth" className="px-5 py-2.5 rounded-xl bg-white text-slate-900 font-semibold shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5 transition">Login / Sign up</a>
              <a href="#analysis" className="px-5 py-2.5 rounded-xl bg-white/10 text-white border border-white/20 hover:bg-white/15 transition">Try analysis</a>
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/30 to-slate-950" />
    </section>
  );
}
