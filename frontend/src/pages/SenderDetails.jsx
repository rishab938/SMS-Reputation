import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function SenderDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSender = async () => {
      try {
        const response = await API.get(`/api/sender/${id}`);
        setData(response.data);
      } catch (err) {
        console.error("Error fetching sender details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSender();
  }, [id]);

  if (loading) return (
    <div className="h-full flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-zeabur-purple/20 border-t-zeabur-purple rounded-full animate-spin"></div>
    </div>
  );

  if (!data) return <div className="text-center text-alert py-20 font-black uppercase tracking-widest">Identification Record Not Found</div>;

  const scoreColor = data.status === 'Safe' ? 'text-safe' : data.status === 'Suspicious' ? 'text-warning' : 'text-alert';
  const scoreBorder = data.status === 'Safe' ? 'border-safe/20' : data.status === 'Suspicious' ? 'border-warning/20' : 'border-alert/20';
  const scoreGlow = data.status === 'Safe' ? 'shadow-[0_0_40px_rgba(16,185,129,0.15)]' : data.status === 'Suspicious' ? 'shadow-[0_0_40px_rgba(245,158,11,0.15)]' : 'shadow-[0_0_40px_rgba(239,68,68,0.15)]';

  const calculateTrend = () => {
    // If we have real history, use it
    if (data.history && data.history.length > 0) {
      const trend = [100];
      let spamCount = 0;
      data.history.forEach((isSpam, index) => {
        if (isSpam) spamCount++;
        const currentTotal = index + 1;
        const rate = spamCount / currentTotal;
        const score = (1 - rate) * 100;
        trend.push(Math.round(score));
      });
      return trend.slice(-10);
    }
    
    // Otherwise, simulate a sequence of 10 steps as requested
    const trend = [50]; // Base score
    let currentScore = 50;
    
    // Determine behavior based on status
    const isMainlySpam = data.status === 'Malicious' || data.status === 'Suspicious';
    
    for (let i = 0; i < 9; i++) {
      // Simulate "ham" or "spam" message
      const isHam = isMainlySpam ? Math.random() > 0.7 : Math.random() > 0.2;
      
      if (isHam) {
        currentScore += Math.floor(Math.random() * 6) + 5; // +5 to 10
      } else {
        currentScore -= Math.floor(Math.random() * 11) + 10; // -10 to 20
      }
      
      // Clamp 0-100
      currentScore = Math.max(0, Math.min(100, currentScore));
      trend.push(currentScore);
    }
    
    return trend;
  };

  const trendData = calculateTrend();
  
  const generateTrendPath = (points) => {
    if (points.length < 2) return "";
    const width = 100;
    const height = 100;
    const step = width / (points.length - 1);
    
    let path = `M 0 ${height - points[0]}`;
    for (let i = 1; i < points.length; i++) {
      const x = i * step;
      const y = height - points[i];
      // Cubic Bezier for smooth curve
      const prevX = (i - 1) * step;
      const prevY = height - points[i - 1];
      const cpX = (prevX + x) / 2;
      path += ` C ${cpX} ${prevY}, ${cpX} ${y}, ${x} ${y}`;
    }
    return path;
  };

  const isTrendingUp = trendData[trendData.length - 1] >= trendData[trendData.length - 2];

  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="text-[10px] font-black text-text-dim uppercase tracking-widest hover:text-text-main transition-colors flex items-center gap-2"
        >
          ← Back to Terminal
        </button>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-safe animate-pulse"></span>
          <span className="text-[10px] text-text-dim font-bold uppercase tracking-widest">Live Intelligence Feed</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Score Circle Card */}
        <div className={`glass-card p-10 flex flex-col items-center justify-center text-center relative overflow-hidden ${scoreGlow}`}>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          
          <h3 className="text-[10px] font-black text-text-dim uppercase tracking-[0.3em] mb-10">Reputation Core</h3>
          
          <div className={`w-48 h-48 rounded-full border-4 ${scoreBorder} flex flex-col items-center justify-center relative`}>
            <div className={`absolute inset-0 rounded-full border-2 ${scoreBorder} animate-ping opacity-20`}></div>
            <span className={`text-6xl font-black tracking-tighter ${scoreColor}`}>
              {Math.round(data.score)}
            </span>
            <span className="text-[10px] font-black text-text-dim uppercase tracking-widest mt-1">Percentile</span>
          </div>

          <div className="mt-10">
            <span className={`status-badge !text-xs !py-2 !px-6 ${
              data.status === 'Safe' ? 'status-safe' : 
              data.status === 'Suspicious' ? 'status-suspicious' : 'status-malicious'
            }`}>
              {data.status} Status
            </span>
          </div>
        </div>

        {/* Intelligence Metrics Card */}
        <div className="lg:col-span-2 glass-card p-10">
          <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/5">
            <h3 className="text-sm font-black text-text-main uppercase tracking-[0.2em]">Intel Profile: {data.sender_id}</h3>
            <span className="text-[10px] text-text-dim font-bold uppercase tracking-widest">Updated Real-time</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div className="group">
                <p className="text-[10px] font-black text-text-dim uppercase tracking-widest mb-3 group-hover:text-zeabur-purple transition-colors">Spam Probability</p>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-zeabur-purple transition-all duration-1000" style={{ width: `${data.spam_rate * 100}%` }}></div>
                  </div>
                  <span className="text-sm font-black text-text-main">{(data.spam_rate * 100).toFixed(1)}%</span>
                </div>
              </div>

              <div className="group">
                <p className="text-[10px] font-black text-text-dim uppercase tracking-widest mb-3 group-hover:text-zeabur-blue transition-colors">Forensic Link Density</p>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-zeabur-blue transition-all duration-1000" style={{ width: `${data.link_density * 100}%` }}></div>
                  </div>
                  <span className="text-sm font-black text-text-main">{(data.link_density * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex justify-between items-center p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                <span className="text-[10px] font-black text-text-dim uppercase tracking-widest">Message Volume</span>
                <span className="text-sm font-black text-text-main">{data.volume} Int</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                <span className="text-[10px] font-black text-text-dim uppercase tracking-widest">Linguistic Length</span>
                <span className="text-sm font-black text-text-main">{Math.round(data.avg_length)} Chars</span>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-zeabur-purple/5 border border-zeabur-purple/10 rounded-2xl">
            <h4 className="text-[10px] font-black text-zeabur-purple uppercase tracking-widest mb-4">Neural Conclusion</h4>
            <p className="text-sm text-text-dim leading-relaxed italic text-justify">
              "Based on the processed message volume and linguistic entropy, this sender exhibits {
                data.status === 'Safe' ? 'stable reputable behavior' : 
                data.status === 'Suspicious' ? 'erratic patterns indicative of potential risk' : 'highly malicious fraudulent signatures'
              }. Recommendation: {
                data.status === 'Safe' ? 'Continue standard monitoring.' : 
                data.status === 'Suspicious' ? 'Escalate to human review.' : 'Immediate blacklisting required.'
              }"
            </p>
          </div>
        </div>
      </div>

      {/* Score Trend Graph Card */}
      <div className="glass-card p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-sm font-black text-text-main uppercase tracking-[0.2em]">Reputation Momentum</h3>
            <p className="text-[10px] text-text-dim font-bold uppercase tracking-widest mt-1">Historical score fluctuation</p>
          </div>
          <div className={`px-3 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${isTrendingUp ? 'bg-safe/10 border-safe/20 text-safe' : 'bg-alert/10 border-alert/20 text-alert'}`}>
            {isTrendingUp ? '↑ Ascending' : '↓ Descending'}
          </div>
        </div>

        <div className="h-[250px] w-full relative overflow-hidden bg-white/[0.01] rounded-xl border border-white/5">
          <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="trendGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#00f2fe" stopOpacity="0" />
              </linearGradient>
            </defs>
            
            {/* Grid lines */}
            <g className="opacity-10">
              {[0, 25, 50, 75, 100].map(y => (
                <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="white" strokeWidth="0.05" />
              ))}
            </g>

            {/* Fill */}
            <path 
              d={`${generateTrendPath(trendData)} L 100 100 L 0 100 Z`} 
              fill="url(#trendGradient)"
            />
            
            {/* Line */}
            <path 
              d={generateTrendPath(trendData)} 
              fill="none" 
              stroke="#00f2fe" 
              strokeWidth="0.6" 
              strokeLinecap="round"
              className="drop-shadow-[0_0_8px_rgba(0,242,254,0.3)]"
            />
            
            {/* Data Dots */}
            {trendData.map((val, i) => (
              <circle 
                key={i}
                cx={(i * 100) / (trendData.length - 1)}
                cy={100 - val}
                r="0.8"
                fill="#00f2fe"
              />
            ))}
          </svg>
        </div>

        <div className="flex justify-between mt-4 text-[8px] font-black text-text-dim uppercase tracking-[0.3em]">
          <span>Initial</span>
          <span>Latest Telemetry</span>
        </div>
      </div>
    </div>
  );
}

export default SenderDetails;