import { useState, useEffect } from "react";
import API from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({ total_senders: 0, average_score: 0, alerts: 0 });
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, leaderboardRes] = await Promise.all([
          API.get("/api/dashboard"),
          API.get("/api/leaderboard")
        ]);
        setStats(statsRes.data);
        setLeaderboard(leaderboardRes.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const generateGraphPath = (data) => {
    if (data.length < 2) return "";
    const points = data.slice(0, 10).map((s, i) => ({
      x: (i * 100) / 9,
      y: 100 - s.score
    }));
    
    // Create smooth curve using Bezier
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const x_mid = (points[i].x + points[i+1].x) / 2;
      const y_mid = (points[i].y + points[i+1].y) / 2;
      path += ` Q ${points[i].x} ${points[i].y}, ${x_mid} ${y_mid}`;
    }
    path += ` T ${points[points.length-1].x} ${points[points.length-1].y}`;
    return path;
  };

  if (loading) return (
    <div className="h-full flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-zeabur-purple/20 border-t-zeabur-purple rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 relative overflow-hidden group hover:ring-2 hover:ring-zeabur-blue/30">
          <div className="absolute top-0 right-0 w-32 h-32 bg-zeabur-blue/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-zeabur-blue/10 transition-colors"></div>
          <p className="text-[10px] font-black text-text-dim uppercase tracking-widest">Active Senders</p>
          <h3 className="text-4xl font-black text-text-main mt-1 tracking-tighter">{stats.total_senders}</h3>
          <div className="mt-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-zeabur-blue animate-pulse"></span>
            <span className="text-[10px] text-zeabur-blue font-bold uppercase">Real-time Telemetry</span>
          </div>
        </div>

        <div className="glass-card p-6 relative overflow-hidden group hover:ring-2 hover:ring-safe/30">
          <div className="absolute top-0 right-0 w-32 h-32 bg-safe/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-safe/10 transition-colors"></div>
          <p className="text-[10px] font-black text-text-dim uppercase tracking-widest">Reputation Avg</p>
          <h3 className="text-4xl font-black text-text-main mt-1 tracking-tighter">{Math.round(stats.average_score)}%</h3>
          <div className="mt-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-safe"></span>
            <span className="text-[10px] text-safe font-bold uppercase">Healthy Environment</span>
          </div>
        </div>

        <div className="glass-card p-6 relative overflow-hidden group hover:ring-2 hover:ring-alert/30">
          <div className="absolute top-0 right-0 w-32 h-32 bg-alert/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-alert/10 transition-colors"></div>
          <p className="text-[10px] font-black text-text-dim uppercase tracking-widest">Risk Alerts</p>
          <h3 className="text-4xl font-black text-alert mt-1 tracking-tighter">{stats.alerts}</h3>
          <div className="mt-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-alert animate-ping"></span>
            <span className="text-[10px] text-alert font-bold uppercase">Mitigation Required</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Chart */}
        <div className="lg:col-span-2 glass-card p-8">
          <div className="flex justify-between items-center mb-8">
            <h4 className="text-sm font-black text-text-main uppercase tracking-widest">Performance Matrix</h4>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-zeabur-purple"></span>
                <span className="text-[10px] text-text-dim font-bold uppercase">Sender Score</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full relative graph-container">
            <svg viewBox="0 0 100 100" className="w-full h-full preserve-3d" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path 
                d={`${generateGraphPath(leaderboard)} L 100 100 L 0 100 Z`} 
                fill="url(#gradient)"
                className="transition-all duration-1000"
              />
              <path 
                d={generateGraphPath(leaderboard)} 
                fill="none" 
                stroke="#7c3aed" 
                strokeWidth="2" 
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex justify-between items-end px-2 pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-full border-l border-white/5 w-px"></div>
              ))}
            </div>
          </div>
          <div className="flex justify-between mt-6 text-[10px] font-bold text-text-dim uppercase tracking-widest">
            <span>Historical T-10</span>
            <span>Real-time Intercepts</span>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-card p-8 flex flex-col">
          <h4 className="text-sm font-black text-text-main uppercase tracking-widest mb-8">Recent Intercepts</h4>
          <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {leaderboard.slice(0, 6).map((sender) => (
              <div key={sender.sender_id} className="flex items-center justify-between group cursor-pointer hover:bg-white/5 p-2 rounded-xl transition-all">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-10 rounded-full ${
                    sender.status === 'Safe' ? 'bg-safe' : 
                    sender.status === 'Suspicious' ? 'bg-warning' : 'bg-alert'
                  }`}></div>
                  <div>
                    <p className="text-xs font-black text-text-main uppercase tracking-tighter">{sender.sender_id}</p>
                    <p className="text-[10px] text-text-dim font-bold uppercase mt-1">Score: {Math.round(sender.score)}</p>
                  </div>
                </div>
                <span className={`status-badge ${
                  sender.status === 'Safe' ? 'status-safe' : 
                  sender.status === 'Suspicious' ? 'status-suspicious' : 'status-malicious'
                }`}>
                  {sender.status}
                </span>
              </div>
            ))}
          </div>
          <button className="mt-8 w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-text-dim uppercase tracking-widest hover:bg-white/10 transition-all">
            Audit Full Logs
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;