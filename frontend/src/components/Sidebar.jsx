import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { path: "/dashboard", name: "Dashboard", icon: "⌬" },
    { path: "/new", name: "Neural Scan", icon: "⚡" },
    { path: "/leaderboard", name: "Hierarchy", icon: "≡" },
  ];

  return (
    <div className="w-72 border-r z-20 flex flex-col h-full relative" style={{ backgroundColor: 'var(--sidebar-bg)', borderColor: 'var(--zeabur-border)', backdropFilter: 'var(--glass-blur)' }}>
      {/* Brand Header */}
      <div className="p-10">
        <div className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-tr from-zeabur-purple to-zeabur-blue rounded-xl flex items-center justify-center shadow-lg shadow-zeabur-purple/20">
            <span className="text-white font-black text-xl">⌬</span>
          </div>
          <div>
            <h1 className="text-sm font-black tracking-tighter uppercase leading-none" style={{ color: 'var(--text-main)' }}>Abyssal</h1>
            <h2 className="text-[10px] font-bold tracking-[0.3em] uppercase mt-1" style={{ color: 'var(--text-dim)' }}>Intelligence</h2>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-4 px-6 space-y-3">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 px-4" style={{ color: 'var(--text-dim)' }}>Main Terminal</p>
        {menuItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <Link 
              key={item.path} 
              to={item.path}
              className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 relative group ${
                isActive 
                  ? "bg-white/5" 
                  : "hover:bg-white/[0.02]"
              }`}
              style={{ 
                color: isActive ? 'var(--text-main)' : 'var(--text-dim)',
                backgroundColor: isActive ? 'rgba(124, 58, 237, 0.1)' : 'transparent'
              }}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-zeabur-purple rounded-r-full shadow-[4px_0_15px_rgba(124,58,237,0.5)] animate-fade-in"></div>
              )}
              <span className={`text-lg transition-transform group-hover:scale-110 ${isActive ? 'text-zeabur-purple' : 'opacity-50'}`}>{item.icon}</span>
              <span className="text-xs font-black uppercase tracking-widest">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom CTA & Logout */}
      <div className="p-8 space-y-4">
        <div className="glass-card p-6 bg-gradient-to-br from-zeabur-purple/10 to-transparent relative overflow-hidden group" style={{ borderColor: 'var(--zeabur-border)' }}>
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: 'var(--text-main)' }}>Neural Link</p>
            <p className="text-[10px] font-bold leading-relaxed mb-4" style={{ color: 'var(--text-dim)' }}>Secure connection established with Neon node.</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-safe animate-pulse"></div>
              <span className="text-[10px] text-safe font-black uppercase">Active</span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-zeabur-purple/20 rounded-full blur-2xl group-hover:bg-zeabur-purple/30 transition-colors"></div>
        </div>

        <button 
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            window.location.href = "/login";
          }}
          className="w-full py-4 rounded-2xl border text-[10px] font-black uppercase tracking-[0.2em] hover:bg-alert/5 hover:text-alert hover:border-alert/20 transition-all flex items-center justify-center gap-3 group"
          style={{ backgroundColor: 'var(--zeabur-card)', borderColor: 'var(--zeabur-border)', color: 'var(--text-dim)' }}
        >
          <span className="opacity-50 group-hover:opacity-100 transition-opacity">⏻</span>
          <span>Disconnect Session</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;