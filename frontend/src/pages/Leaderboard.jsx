import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Leaderboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await API.get("/api/leaderboard");
        setData(response.data);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) return (
    <div className="h-full flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-zeabur-purple/20 border-t-zeabur-purple rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h3 className="text-3xl font-black text-text-main tracking-tighter uppercase">Reputation Hierarchy</h3>
          <p className="text-xs text-text-dim font-bold uppercase tracking-widest mt-2">Ranked by linguistic integrity and volume</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {data.map((sender) => (
          <div 
            key={sender.sender_id}
            onClick={() => navigate(`/sender/${sender.sender_id}`)}
            className="glass-card p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-white/5 cursor-pointer group relative overflow-hidden"
          >
            {/* Rank Badge */}
            <div className="flex items-center gap-6 w-full md:w-auto">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black ${
                sender.rank === 1 ? 'bg-yellow-500/20 text-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.3)]' :
                sender.rank === 2 ? 'bg-gray-400/20 text-text-dim' :
                sender.rank === 3 ? 'bg-amber-700/20 text-amber-600' :
                'bg-white/5 text-text-dim'
              }`}>
                #{sender.rank}
              </div>
              
              <div>
                <h4 className="text-lg font-black text-text-main uppercase tracking-tighter">{sender.sender_id}</h4>
                <p className="text-[10px] text-text-dim font-bold uppercase tracking-widest mt-1">
                  {sender.total_messages} Messages Processed
                </p>
              </div>
            </div>

            {/* Score Progress Bar */}
            <div className="flex-1 w-full max-w-md">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-black text-text-dim uppercase tracking-widest">Reputation Score</span>
                <span className={`text-xs font-black ${
                  sender.score > 70 ? 'text-safe' : sender.score > 40 ? 'text-warning' : 'text-alert'
                }`}>{Math.round(sender.score)}%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${
                    sender.score > 70 ? 'bg-gradient-to-r from-safe/40 to-safe shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 
                    sender.score > 40 ? 'bg-gradient-to-r from-warning/40 to-warning' : 
                    'bg-gradient-to-r from-alert/40 to-alert shadow-[0_0_10px_rgba(239,68,68,0.5)]'
                  }`}
                  style={{ width: `${sender.score}%` }}
                ></div>
              </div>
            </div>

            {/* Status & Action */}
            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
              <span className={`status-badge ${
                sender.status === 'Safe' ? 'status-safe' : 
                sender.status === 'Suspicious' ? 'status-suspicious' : 'status-malicious'
              }`}>
                {sender.status}
              </span>
              <button className="p-3 rounded-xl bg-white/5 text-text-dim group-hover:text-text-main group-hover:bg-zeabur-purple transition-all">
                →
              </button>
            </div>

            {/* Background Accent */}
            <div className={`absolute -right-10 -bottom-10 w-32 h-32 blur-[80px] opacity-10 pointer-events-none ${
              sender.score > 70 ? 'bg-safe' : sender.score > 40 ? 'bg-warning' : 'bg-alert'
            }`}></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;