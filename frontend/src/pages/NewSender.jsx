import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function NewSender() {
  const [senderId, setSenderId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleScan = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await API.post("/api/predict", {
        sender_id: senderId,
        message: message,
      });
      setResult(response.data);
      setTimeout(() => {
        navigate(`/sender/${response.data.sender_id}`);
      }, 1500);
    } catch (err) {
      console.error("Analysis failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center animate-fade-up">
      <div className="w-full max-w-xl glass-card p-10 relative overflow-hidden">
        {/* Glow Accent */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-zeabur-purple/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-tr from-zeabur-purple to-zeabur-blue rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-zeabur-purple/20">
            <span className="text-4xl text-white font-black">🔭</span>
          </div>
          <h3 className="text-3xl font-black text-text-main tracking-tighter uppercase">Neural Scan</h3>
          <p className="text-xs text-text-dim font-bold uppercase tracking-widest mt-3">Initiating deep linguistic forensics on sender ID</p>
        </div>

        <form onSubmit={handleScan} className="space-y-8">
          <div>
            <label className="block text-[10px] font-black text-text-dim uppercase tracking-[0.25em] mb-3 px-1">Identifier</label>
            <input
              type="text"
              placeholder="e.g. AM-610123"
              value={senderId}
              onChange={(e) => setSenderId(e.target.value)}
              className="input-field !py-4 focus:ring-4 focus:ring-zeabur-purple/5"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-text-dim uppercase tracking-[0.25em] mb-3 px-1">Message Payload</label>
            <textarea
              placeholder="Paste intercept text here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="input-field h-40 !py-4 resize-none"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full primary-button !rounded-2xl !h-16 flex justify-center items-center gap-4 transition-all ${loading ? 'opacity-50 scale-95' : ''}`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                <span className="text-xs font-black uppercase tracking-widest">Processing Forensics...</span>
              </>
            ) : (
              <>
                <span className="text-lg font-black uppercase tracking-widest">SCAN</span>
                <span className="opacity-50">⚡</span>
              </>
            )}
          </button>
        </form>

        {result && (
          <div className="mt-8 p-6 bg-safe/10 border border-safe/20 rounded-2xl animate-fade-up flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-2xl">✓</span>
              <div>
                <p className="text-xs font-black text-text-main uppercase tracking-widest">Analysis Complete</p>
                <p className="text-[10px] text-safe font-bold uppercase mt-1">Status: {result.status}</p>
              </div>
            </div>
            <p className="text-[10px] text-text-dim uppercase font-black">Redirecting...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewSender;