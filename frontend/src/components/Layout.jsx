import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const location = useLocation();
  const navigate = useNavigate();

  const username = localStorage.getItem("username") || "Admin";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.className = `${theme}-theme`;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "dark" ? "light" : "dark");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/login";
  };

  const handleSearch = (e) => {
    if ((e.key === 'Enter' || e.type === 'click') && searchQuery.trim()) {
      navigate(`/sender/${searchQuery.trim()}`);
      setSearchQuery("");
    }
  };

  const pageNames = {
    "/dashboard": "Dashboard Terminal",
    "/leaderboard": "Global Leaderboard",
    "/new": "Neural Scan",
    "/sender": "Sender Intelligence"
  };

  const getPageName = () => {
    const path = location.pathname;
    if (path.startsWith("/sender/")) return pageNames["/sender"];
    return pageNames[path] || "Terminal";
  };

  return (
    <div className="flex h-screen bg-zeabur-bg text-gray-300 font-sans overflow-hidden relative" data-theme={theme}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        
        {/* Top Navigation Bar */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-black/40 backdrop-blur-xl z-50" style={{ backgroundColor: 'var(--header-bg)' }}>
          <div className="flex items-center gap-8">
            <h2 className="text-xl font-black tracking-tighter text-white uppercase" style={{ color: 'var(--text-main)' }}>{getPageName()}</h2>
            
            <div className="hidden md:flex relative">
              <span 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm cursor-pointer hover:text-zeabur-purple transition-colors z-10"
                onClick={handleSearch}
              >
                ⌕
              </span>
              <input 
                type="text" 
                placeholder="Scan identification..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-6 text-xs w-72 focus:outline-none focus:border-zeabur-purple/50 focus:ring-4 focus:ring-zeabur-purple/5 transition-all text-gray-300"
                style={{ color: 'var(--text-main)', backgroundColor: 'var(--zeabur-card)', borderColor: 'var(--zeabur-border)' }}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6 relative">
            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all text-lg"
              style={{ borderColor: 'var(--zeabur-border)' }}
            >
              {theme === "dark" ? "🌙" : "☀️"}
            </button>

            <div 
              className="flex items-center gap-4 cursor-pointer group" 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-white leading-none uppercase tracking-widest" style={{ color: 'var(--text-main)' }}>{username}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mt-1.5 font-bold">Authorized</p>
              </div>
              <div className="w-10 h-10 rounded-xl border border-white/10 p-0.5 group-hover:border-zeabur-purple/50 transition-all relative" style={{ borderColor: 'var(--zeabur-border)' }}>
                <div className="w-full h-full rounded-lg bg-gradient-to-tr from-zeabur-purple to-zeabur-blue flex items-center justify-center overflow-hidden">
                  <span className="text-xs text-white font-black">{username.substring(0, 2).toUpperCase()}</span>
                </div>
                <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-safe rounded-full border-2 border-[#05070d]"></span>
              </div>
            </div>

            {isProfileOpen && (
              <>
                <div className="fixed inset-0 z-[60]" onClick={() => setIsProfileOpen(false)}></div>
                <div className="absolute top-full right-0 mt-4 w-64 bg-[#0b0f1a] border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl py-2 z-[70] animate-fade-up overflow-hidden ring-1 ring-white/5" style={{ backgroundColor: 'var(--zeabur-card)', borderColor: 'var(--zeabur-border)' }}>
                  <div className="px-6 py-5 border-b border-white/5 mb-2 bg-white/[0.02]" style={{ borderColor: 'var(--zeabur-border)' }}>
                    <p className="text-xs font-black text-white uppercase tracking-tighter" style={{ color: 'var(--text-main)' }}>{username}</p>
                    <p className="text-[10px] text-gray-500 mt-1 font-bold">SYSTEM ADMINISTRATOR</p>
                  </div>
                  <div className="px-2 pb-2">
                    <button className="w-full text-left px-4 py-3 text-sm text-gray-400 hover:bg-white/5 hover:text-white rounded-xl transition-colors flex items-center gap-3 group">
                      <span className="opacity-50 group-hover:opacity-100 transition-opacity">⚙</span> Settings
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm text-alert hover:bg-alert/10 rounded-xl transition-colors flex items-center gap-3 font-black group mt-1 cursor-pointer"
                    >
                      <span className="opacity-50 group-hover:opacity-100 transition-opacity">⏻</span> LOGOUT
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-y-auto p-8 relative z-0 premium-dashboard-bg">
          <div className="max-w-7xl mx-auto h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;