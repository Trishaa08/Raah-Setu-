import React from 'react';
import { BrainCircuit, Clock, Zap, Navigation } from 'lucide-react';
import { aiPerformanceMetrics } from '../../data/analyticsData';

const PerformanceMetrics = () => {
  const {
    predictionAccuracy,
    averageDelayReduction,
    averageResponseTime,
    routeOptimizationGain,
  } = aiPerformanceMetrics;

  return (
    <div className="space-y-3.5 text-white">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2 font-display">
          <BrainCircuit className="w-5 h-5 text-cyan-400" />
          AI System Performance Benchmark
        </h4>
        <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800">
          Online Inference Engine
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-cyan-400/20 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-1 font-mono">
            <span>Prediction Accuracy</span>
            <div className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800">
              <BrainCircuit className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-display">{predictionAccuracy}%</div>
          <span className="text-[10px] text-emerald-300 font-bold mt-1 inline-block bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800 font-mono">↑ 4.2% vs Baseline</span>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-cyan-400/20 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-1 font-mono">
            <span>Avg. Delay Reduction</span>
            <div className="p-1.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-display">↓ {averageDelayReduction}%</div>
          <span className="text-[10px] text-slate-400 mt-1 inline-block font-mono">~5.8 min / trip saved</span>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-cyan-400/20 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-1 font-mono">
            <span>Avg. Response Time</span>
            <div className="p-1.5 rounded-lg bg-pink-950 text-pink-400 border border-pink-800">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-display">{averageResponseTime}s</div>
          <span className="text-[10px] text-emerald-300 font-bold mt-1 inline-block bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800 font-mono">Sub-second dispatch</span>
        </div>

        {/* Metric 4 */}
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-cyan-400/20 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-1 font-mono">
            <span>Route Optimization Gain</span>
            <div className="p-1.5 rounded-lg bg-purple-950 text-purple-400 border border-purple-800">
              <Navigation className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-cyan-300 font-display">+{routeOptimizationGain}%</div>
          <span className="text-[10px] text-slate-400 mt-1 inline-block font-mono">Network load balanced</span>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
