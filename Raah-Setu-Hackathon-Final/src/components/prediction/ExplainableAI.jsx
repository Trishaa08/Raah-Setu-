import React, { useState } from 'react';
import { 
  Bot, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  Sparkles
} from 'lucide-react';
import { useTraffic } from '../../context/TrafficContext';

const ExplainableAI = ({ prediction }) => {
  const { applyPredictionRecommendation } = useTraffic();
  const [isApplied, setIsApplied] = useState(false);

  if (!prediction) return null;

  const {
    location,
    predictedLevel,
    confidence,
    currentDensity,
    predictedDensity,
    factors,
    recommendation,
  } = prediction;

  const handleApply = () => {
    applyPredictionRecommendation(recommendation.actionText, location);
    setIsApplied(true);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-300 text-white">
      {/* Top Banner: Predicted Traffic Level & Confidence Gauge */}
      <div className="rounded-3xl bg-slate-900/80 p-6 border border-cyan-400/20 shadow-xl backdrop-blur-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">Prediction Output</span>
            <h3 className="text-xl font-black text-white font-display flex items-center gap-2 mt-0.5">
              <span>{location}</span>
            </h3>
          </div>

          {/* Level Pill */}
          <div className="flex items-center gap-3">
            <div className="text-right font-mono">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Confidence Score</div>
              <div className="text-xl font-black text-cyan-300">{confidence}%</div>
            </div>
            <div className={`px-4 py-2 rounded-full text-xs font-black border flex items-center gap-2 ${
              predictedLevel === 'HIGH' || predictedLevel === 'CRITICAL'
                ? 'bg-rose-950/80 border-rose-700 text-rose-300'
                : 'bg-amber-950/80 border-amber-700 text-amber-300'
            }`}>
              <AlertTriangle className="w-4 h-4" />
              <span>PREDICTED: {predictedLevel}</span>
            </div>
          </div>
        </div>

        {/* Current vs Predicted Density Bar comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 font-mono">
          {/* Current Density */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-300">Current Corridor Density:</span>
              <span className="text-cyan-300 text-sm">{currentDensity}%</span>
            </div>
            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
              <div
                className="bg-cyan-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${currentDensity}%` }}
              />
            </div>
          </div>

          {/* Predicted Density */}
          <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-800/60 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-200">Predicted Buildup Density (Next 30m):</span>
              <span className="text-rose-400 text-sm font-black">{predictedDensity}% (+{predictedDensity - currentDensity}%)</span>
            </div>
            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-rose-500 h-full rounded-full transition-all duration-500 animate-pulse"
                style={{ width: `${predictedDensity}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Explainable AI Checklist */}
      <div className="rounded-3xl bg-slate-900/80 p-6 border border-slate-800 shadow-xl backdrop-blur-md space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2 font-display">
            <Bot className="w-5 h-5 text-cyan-400" />
            Explainable AI — Why is Congestion Expected?
          </h4>
          <span className="text-xs font-mono font-bold text-slate-400">Feature Importance Weights</span>
        </div>

        <p className="text-xs text-slate-400">
          The deep predictive neural model correlated the following multi-sensor telemetry vectors:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          {factors.map((factor, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-medium text-slate-200"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{factor}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actionable Recommendation Box */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 p-6 text-white shadow-2xl border border-cyan-400/30 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-2xl bg-pink-600 text-white shrink-0 shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-pink-300 font-mono">
                Autonomous AI Recommendation
              </span>
              <p className="text-sm sm:text-base font-bold text-white mt-0.5 leading-relaxed">
                {recommendation.actionText}
              </p>
            </div>
          </div>
        </div>

        {/* Expected Benefits */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-950/60 border border-slate-800 font-mono">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold">Estimated Delay Reduction</span>
            <div className="text-lg font-black text-emerald-400">{recommendation.expectedDelayReduction}</div>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold">Time Saved Per Vehicle</span>
            <div className="text-lg font-black text-cyan-300">~{recommendation.estimatedMinutesSaved} min</div>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Throughput Gain</span>
            <div className="text-lg font-black text-pink-300">+16.2% Flow</div>
          </div>
        </div>

        {/* Apply Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <span className="text-xs text-slate-400">
            {isApplied ? '✓ System deployed autonomous timing adjustments to S001 and VMS signage.' : 'Action ready to execute across city signal controllers.'}
          </span>

          <button
            onClick={handleApply}
            disabled={isApplied}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3 rounded-full text-xs sm:text-sm font-bold transition-all ${
              isApplied
                ? 'bg-emerald-600 text-white cursor-default'
                : 'bg-gradient-to-r from-pink-600 to-cyan-600 hover:brightness-110 text-white shadow-lg hover:scale-105'
            }`}
          >
            {isApplied ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Recommendation Deployed</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 text-white" />
                <span>Apply Recommendation</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExplainableAI;
