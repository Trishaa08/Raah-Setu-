import React from 'react';
import { Clock } from 'lucide-react';

const SignalVisualizer = ({ signal }) => {
  if (!signal) return null;

  const { currentPhase, secondsRemaining, name, id, cycleTime } = signal;

  const isGreen = currentPhase === 'GREEN';
  const isYellow = currentPhase === 'YELLOW';
  const isRed = currentPhase === 'RED';

  return (
    <div className="rounded-3xl bg-slate-900/80 p-6 sm:p-8 border border-cyan-400/20 shadow-xl backdrop-blur-md text-white flex flex-col md:flex-row items-center justify-between gap-6">
      {/* Left: Signal Info & Phase Badge */}
      <div className="flex-1 space-y-3.5 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2">
          <span className="px-3 py-1 rounded-full bg-slate-950 text-cyan-300 font-mono text-xs font-bold border border-slate-800">
            {id}
          </span>
          <span className="text-xs text-slate-400 font-medium">{signal.location}</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-white font-display">{name}</h2>

        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 font-mono">
          <div className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 border ${
            isGreen 
              ? 'bg-emerald-950 border-emerald-800 text-emerald-300' 
              : isYellow 
              ? 'bg-amber-950 border-amber-800 text-amber-300' 
              : 'bg-rose-950 border-rose-800 text-rose-300'
          }`}>
            <span className={`w-2.5 h-2.5 rounded-full ${isGreen ? 'bg-emerald-400' : isYellow ? 'bg-amber-400' : 'bg-rose-400'} animate-pulse`} />
            <span>PHASE: {currentPhase}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-950 border border-slate-800 text-xs text-slate-300">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Remaining: <strong className="text-sm font-black text-white">{secondsRemaining}s</strong></span>
          </div>

          <span className="text-xs text-slate-400 font-medium">Cycle: {cycleTime}s Total</span>
        </div>
      </div>

      {/* Physical 3D Glowing Traffic Light in Sleek Housing */}
      <div className="relative flex items-center justify-center p-5 bg-slate-950 rounded-3xl border-4 border-slate-800 shadow-2xl">
        <div className="flex flex-col gap-4 p-3 bg-gradient-to-b from-slate-900 to-black rounded-2xl border border-slate-800">
          {/* RED LAMP */}
          <div className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
            isRed 
              ? 'bg-rose-500 shadow-[0_0_35px_rgba(239,68,68,0.9)] border-2 border-rose-200' 
              : 'bg-rose-950/30 border border-rose-900/30 opacity-40'
          }`}>
            {isRed && (
              <span className="text-white font-mono font-black text-lg animate-pulse">{secondsRemaining}</span>
            )}
          </div>

          {/* YELLOW LAMP */}
          <div className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
            isYellow 
              ? 'bg-amber-400 shadow-[0_0_35px_rgba(245,158,11,0.9)] border-2 border-amber-100' 
              : 'bg-amber-950/30 border border-amber-900/30 opacity-40'
          }`}>
            {isYellow && (
              <span className="text-slate-950 font-mono font-black text-lg animate-pulse">{secondsRemaining}</span>
            )}
          </div>

          {/* GREEN LAMP */}
          <div className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
            isGreen 
              ? 'bg-emerald-500 shadow-[0_0_35px_rgba(34,197,94,0.9)] border-2 border-emerald-100' 
              : 'bg-emerald-950/30 border border-emerald-900/30 opacity-40'
          }`}>
            {isGreen && (
              <span className="text-white font-mono font-black text-lg animate-pulse">{secondsRemaining}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignalVisualizer;
