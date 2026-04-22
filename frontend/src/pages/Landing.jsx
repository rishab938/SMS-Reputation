import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  const [theme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-zeabur-bg selection:bg-zeabur-purple/30 selection:text-text-main overflow-hidden relative" data-theme={theme}>
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-zeabur-purple/20 rounded-full blur-[120px] animate-glow pointer-events-none z-0"></div>
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-zeabur-blue/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full h-20 border-b border-white/5 backdrop-blur-md z-50 px-6 md:px-20 flex items-center justify-between" style={{ backgroundColor: 'var(--header-bg)', borderColor: 'var(--zeabur-border)' }}>
        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-8 h-8 bg-gradient-to-tr from-zeabur-purple to-zeabur-blue rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-xl">⌬</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-text-main group-hover:text-zeabur-purple transition-colors">Abyssal Intel</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <span className="nav-link text-text-dim hover:text-text-main transition-colors cursor-pointer">Technology</span>
          <span className="nav-link text-text-dim hover:text-text-main transition-colors cursor-pointer">Security</span>
          <span className="nav-link text-text-dim hover:text-text-main transition-colors cursor-pointer">Enterprise</span>
          <span className="nav-link text-text-dim hover:text-text-main transition-colors cursor-pointer">Docs</span>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/login')}
            className="secondary-button"
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 pt-44 pb-20 px-6 flex flex-col items-center text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-10 animate-fade-up" style={{ backgroundColor: 'var(--zeabur-card)', borderColor: 'var(--zeabur-border)' }}>
          <span className="text-[10px] font-bold uppercase tracking-widest text-zeabur-purple">New</span>
          <span className="text-xs text-text-dim">Integrated NLP Scoring Engine v2.4 →</span>
        </div>

        <h1 className="text-5xl md:text-8xl font-black text-text-main tracking-tighter mb-8 leading-[0.9] animate-fade-up">
          Scan Fraudulently, <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zeabur-purple via-zeabur-blue to-white">Verify Infinitely.</span>
        </h1>

        <p className="max-w-2xl text-lg md:text-xl text-text-dim mb-12 animate-fade-up delay-100">
          The next generation SMS reputation system. Analyze sender integrity, 
          detect sophisticated spam patterns, and secure your sub-channels with AI.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 animate-fade-up delay-200">
          <button 
            onClick={() => navigate('/login')}
            className="primary-button"
          >
            Get Started
          </button>
          <button className="secondary-button h-14 px-10">
            View Documentation
          </button>
        </div>

        {/* Feature Grid Mockup */}
        <div className="mt-32 w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-up delay-300">
          <div className="glass-card p-8 text-left group">
            <div className="w-12 h-12 bg-zeabur-purple/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-zeabur-purple/20 transition-colors">
              <span className="text-zeabur-purple text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-bold text-text-main mb-3">Real-time Telemetry</h3>
            <p className="text-text-dim text-sm leading-relaxed">Streaming reputation scoring with sub-second latency for global message interceptors.</p>
          </div>
          
          <div className="glass-card p-8 text-left group">
            <div className="w-12 h-12 bg-zeabur-blue/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-zeabur-blue/20 transition-colors">
              <span className="text-zeabur-blue text-2xl">🛡</span>
            </div>
            <h3 className="text-xl font-bold text-text-main mb-3">NLP Analysis</h3>
            <p className="text-text-dim text-sm leading-relaxed">Sophisticated linguistic modeling to identify complex social engineering and phishing attempts.</p>
          </div>

          <div className="glass-card p-8 text-left group">
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
              <span className="text-text-main text-2xl">☁</span>
            </div>
            <h3 className="text-xl font-bold text-text-main mb-3">Neon Backend</h3>
            <p className="text-text-dim text-sm leading-relaxed">Powered by serverless PostgreSQL for infinite scalability and high-integrity data storage.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-40 border-t border-white/5 py-12 px-6 flex flex-col md:flex-row justify-between items-center gap-6" style={{ borderColor: 'var(--zeabur-border)' }}>
        <div className="flex items-center gap-2 opacity-50">
          <span className="font-bold text-text-main tracking-tight">Abyssal Intel</span>
          <span className="text-xs text-text-dim">© 2026. All rights reserved.</span>
        </div>
        <div className="flex gap-8">
          <span className="nav-link text-text-dim hover:text-text-main transition-colors cursor-pointer">Privacy</span>
          <span className="nav-link text-text-dim hover:text-text-main transition-colors cursor-pointer">Terms</span>
          <span className="nav-link text-text-dim hover:text-text-main transition-colors cursor-pointer">GitHub</span>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
