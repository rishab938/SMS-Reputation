import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [theme] = useState(localStorage.getItem("theme") || "dark");
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.className = `${theme}-theme`;
  }, [theme]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await API.post("/api/login", { username, password });
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("username", response.data.username);
      navigate("/dashboard");
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          setError("Identification failed. Access Denied.");
        } else {
          setError(`Server Error: ${err.response.data?.detail || "Unknown error"}`);
        }
      } else if (err.request) {
        setError("Network Error: Could not reach the security gate.");
      } else {
        setError("System Error: Request failed to initialize.");
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-zeabur-bg" data-theme={theme}>
      {/* Dynamic Background Layer */}
      <div className="login-bg"></div>

      {/* Star Field Overlay (Dark Theme Only) */}
      {theme === 'dark' && (
        <div className="absolute inset-0 z-1 pointer-events-none opacity-40">
          {[...Array(50)].map((_, i) => (
            <div 
              key={i}
              className="absolute bg-white rounded-full animate-pulse"
              style={{
                width: Math.random() * 2 + 'px',
                height: Math.random() * 2 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                animationDelay: Math.random() * 5 + 's',
                animationDuration: Math.random() * 3 + 2 + 's'
              }}
            ></div>
          ))}
        </div>
      )}

      {/* Global Depth Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-zeabur-purple/10 rounded-full blur-[120px] z-2"></div>
      
      {/* Light Theme Depth Accent */}
      {theme === 'light' && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white/20 rounded-full blur-[100px] z-2"></div>
      )}

      <div className="w-full max-w-md relative z-10 animate-fade-up">
        {/* Glass Card */}
        <div className="glass-card p-10 ring-1 ring-zeabur-purple/20">
          <div className="text-center mb-10">
            <div 
              className="w-16 h-16 bg-gradient-to-tr from-zeabur-purple to-zeabur-blue rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(124,58,237,0.4)] cursor-pointer hover:scale-110 transition-transform"
              onClick={() => navigate('/')}
            >
              <span className="text-3xl text-white font-black">⌬</span>
            </div>
            <h2 className="text-3xl font-black text-text-main tracking-tighter">Terminal Access</h2>
            <p className="text-text-dim text-sm mt-2 font-medium">Verify credentials to bypass security gate.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-text-dim uppercase tracking-[0.2em] mb-2 px-1">Identification</label>
              <input
                type="text"
                placeholder="Admin ID"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-text-dim uppercase tracking-[0.2em] mb-2 px-1">Access Key</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                required
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-4 rounded-xl text-center font-bold animate-shake">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full h-14 bg-gradient-to-r from-zeabur-purple to-zeabur-blue text-white font-black rounded-xl shadow-[0_10px_20px_rgba(124,58,237,0.3)] hover:shadow-[0_15px_30px_rgba(124,58,237,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all flex justify-center items-center gap-3 ${isLoading ? 'opacity-50' : ''}`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                "SIGN IN"
              )}
            </button>
          </form>

          <div className="mt-10 text-center">
            <button 
              onClick={() => navigate('/')}
              className="text-[10px] font-bold text-text-dim uppercase tracking-widest hover:text-text-main transition-colors"
            >
              ← Return to Gateway
            </button>
          </div>
        </div>
        
        {/* Subtle Branding */}
        <p className="text-center mt-8 text-[10px] font-medium text-text-dim uppercase tracking-[0.3em]">
          Powered by Abyssal Neural Engine v2.4
        </p>
      </div>
    </div>
  );
}

export default Login;