import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Lock, 
  Mail, 
  Activity, 
  Cpu, 
  BarChart3, 
  ShieldCheck
} from 'lucide-react';
import { useTraffic } from '../context/TrafficContext';

const Login = () => {
  const navigate = useNavigate();
  const { showToast } = useTraffic();
  const [email, setEmail] = useState('admin@raah-setu.gov.in');
  const [password, setPassword] = useState('••••••••••••');

  const handleLogin = (e) => {
    e.preventDefault();
    showToast('✓ Authentication successful. Welcome to Raah-Setu AI Command Center!', 'success');
    navigate('/dashboard');
  };

  const handleDemoMode = () => {
    showToast('🚀 Launching Hackathon Demo Mode with Live City Telemetry!', 'info');
    navigate('/');
  };

  return (
    <div className="min-h-screen w-full bg-[#060b14] flex items-center justify-center p-4 sm:p-6 lg:p-12 relative overflow-hidden font-sans">
      {/* Full Page High-Res Smart City Background Photo */}
      <img
        src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=2000&q=80"
        alt="Smart City Night"
        className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105 filter blur-xs"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/90 to-blue-950/70" />

      {/* Main Container */}
      <div className="w-full max-w-5xl rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-cyan-400/20 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10 text-white">
        
        {/* Left Side: Smart City Hero Showcase */}
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between bg-slate-950/70 border-b lg:border-b-0 lg:border-r border-slate-800 relative">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-3xl font-black italic tracking-tight text-white font-display flex items-center">
                <span>Raah-Setu</span>
                <span className="w-2.5 h-2.5 rounded-full bg-pink-500 ml-1" />
              </span>
            </Link>

            <h2 className="text-2xl sm:text-3xl font-black text-white font-display pt-2">
              Intelligent Traffic. <span className="text-pink-400 italic">Smarter Cities.</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              AI-powered real-time traffic monitoring, neural predictive bottleneck prevention, adaptive signal optimization, and dynamic emergency routing.
            </p>
          </div>

          {/* Feature Highlights Grid */}
          <div className="my-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5 font-mono">
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400 shrink-0 border border-cyan-800">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white font-sans">Live Real-Time GIS</h4>
                <p className="text-[11px] text-slate-400">Corridor flow & camera radar</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-pink-950 text-pink-400 shrink-0 border border-pink-800">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white font-sans">91.4% AI Accuracy</h4>
                <p className="text-[11px] text-slate-400">Deep neural forecast engine</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-emerald-950 text-emerald-400 shrink-0 border border-emerald-800">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white font-sans">Adaptive Signal Waves</h4>
                <p className="text-[11px] text-slate-400">↓ 18.7% travel delay reduction</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-purple-950 text-purple-400 shrink-0 border border-purple-800">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white font-sans">Emergency Corridors</h4>
                <p className="text-[11px] text-slate-400">Instant ambulance green wave</p>
              </div>
            </div>
          </div>

          {/* Footer Badge */}
          <div className="flex items-center gap-2 text-xs text-slate-400 pt-4 border-t border-slate-800 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-medium">Nagpur Smart City Command Center v4.2 • Operational</span>
          </div>
        </div>

        {/* Right Side: Auth Form + Demo Mode */}
        <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between bg-slate-900/90">
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-black text-white font-display">Welcome Back</h2>
              <p className="text-xs text-slate-400 mt-1">Sign in with your municipal command credentials</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 font-mono">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Operator Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    placeholder="name@raah-setu.gov.in"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-300">Password</label>
                  <a href="#forgot" onClick={(e) => { e.preventDefault(); showToast('Demo credentials pre-filled.', 'info'); }} className="text-[11px] text-pink-400 font-bold hover:underline">
                    Forgot?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    placeholder="••••••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:brightness-110 text-white font-bold text-sm shadow-lg transition-all hover:scale-[1.02] font-sans"
              >
                <span>Login to Command Center</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </form>
          </div>

          {/* DEMO MODE HACKATHON SHORTCUT */}
          <div className="mt-8 pt-6 border-t border-slate-800 text-center space-y-3 font-mono">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase">
                <span className="bg-slate-900 px-3 text-slate-400 font-bold tracking-wider">
                  Hackathon Presentation Access
                </span>
              </div>
            </div>

            <button
              onClick={handleDemoMode}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-pink-600 to-cyan-600 hover:brightness-110 text-white font-black text-sm shadow-lg transition-all hover:scale-[1.02] font-sans"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch Discovery Shots Demo</span>
            </button>
            <p className="text-[11px] text-slate-400">
              Direct access without authentication for live jury walkthroughs.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
