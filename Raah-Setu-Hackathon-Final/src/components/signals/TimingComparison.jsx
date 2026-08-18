import React from 'react';
import { Bot, CheckCircle2, Zap, Clock, Sparkles } from 'lucide-react';
import { useTraffic } from '../../context/TrafficContext';

const TimingComparison = ({ signal }) => {
  const { applySignalAITiming } = useTraffic();

  if (!signal) return null;

  const { timings, aiRecommendedTimings, isAITimingApplied, expectedImprovement, aiRecommendationReason } = signal;

  return (
    <div className="rounded-3xl bg-slate-900/80 p-6 border border-cyan-400/20 shadow-xl backdrop-blur-md text-white space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm sm:text-base font-display">Adaptive Timing Optimization Matrix</h4>
            <p className="text-xs text-slate-400">Autonomous cycle redistribution recommendations</p>
          </div>
        </div>
        <span className={`text-xs font-bold font-mono px-3 py-1 rounded-full ${
          isAITimingApplied 
            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' 
            : 'bg-pink-950 text-pink-300 border border-pink-800 animate-pulse'
        }`}>
          {isAITimingApplied ? 'AI OPTIMIZATION ACTIVE' : 'AI TIMING READY'}
        </span>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 font-mono">
        {/* Current Timing */}
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Current Timing Split</span>
            <Clock className="w-3.5 h-3.5 text-slate-400" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <span className="text-slate-300">North-South (Corridor):</span>
              <span className="font-mono font-bold text-white bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">{timings.northSouth} sec</span>
            </div>
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <span className="text-slate-300">East-West (Cross Street):</span>
              <span className="font-mono font-bold text-white bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">{timings.eastWest} sec</span>
            </div>
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <span className="text-slate-300">Pedestrian Cross:</span>
              <span className="font-mono font-bold text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">{timings.pedestrian || 15} sec</span>
            </div>
          </div>
        </div>

        {/* AI Recommended Timing */}
        <div className="p-5 rounded-2xl bg-pink-950/20 border border-pink-800/60 shadow-md space-y-3 relative">
          <div className="text-xs font-bold text-pink-300 uppercase tracking-wider flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" /> AI Recommended Timing
            </span>
            <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800">
              {expectedImprovement}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <span className="text-white font-medium">North-South (Corridor):</span>
              <span className="font-mono font-bold text-emerald-300 bg-emerald-950 border border-emerald-800 px-2.5 py-1 rounded-lg shadow-sm">
                {aiRecommendedTimings.northSouth} sec (+10s)
              </span>
            </div>
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <span className="text-white font-medium">East-West (Cross Street):</span>
              <span className="font-mono font-bold text-white bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg">
                {aiRecommendedTimings.eastWest} sec (-5s)
              </span>
            </div>
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <span className="text-white font-medium">Pedestrian Cross:</span>
              <span className="font-mono font-bold text-slate-400 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg">
                {aiRecommendedTimings.pedestrian || 10} sec
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Rationale & Action */}
      <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="text-xs text-slate-300 leading-relaxed">
          <strong className="text-cyan-300 font-mono">AI Logic: </strong>
          {aiRecommendationReason || "Evening commuter wave surge requires extended green window to prevent queue spillover."}
        </div>

        <button
          onClick={() => applySignalAITiming(signal.id)}
          disabled={isAITimingApplied}
          className={`shrink-0 flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold transition-all ${
            isAITimingApplied
              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800 cursor-default'
              : 'bg-gradient-to-r from-cyan-600 to-pink-600 hover:brightness-110 text-white shadow-lg hover:scale-105'
          }`}
        >
          {isAITimingApplied ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>AI Timing Deployed</span>
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 text-white animate-pulse" />
              <span>Apply AI Timing</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default TimingComparison;
