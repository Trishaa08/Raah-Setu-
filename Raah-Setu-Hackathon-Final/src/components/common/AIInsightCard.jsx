import React from 'react';
import { Bot, AlertTriangle, TrafficCone, Compass, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const AIInsightCard = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#FDE8F0] text-[#EA4C89] border border-pink-100">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              AI Traffic Insights & Actions
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-100 text-[#EA4C89]">
                ACTIVE INFERENCE
              </span>
            </h3>
            <p className="text-xs text-slate-500">Predictive neural traffic model recommendations</p>
          </div>
        </div>
        <span className="text-xs font-mono font-bold text-slate-600">Conf: 91.4%</span>
      </div>

      {/* 3 Key Insights */}
      <div className="mt-4 space-y-3">
        {/* Insight 1 */}
        <div className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-100 flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-900">
                Heavy congestion predicted on <span className="text-rose-600">Wardha Road</span>
              </div>
              <div className="text-xs text-slate-500 mt-0.5">Expected peak: 19:00 – 20:00 • Inflow rate 4,820 veh/h</div>
            </div>
          </div>
          <Link
            to="/prediction"
            className="shrink-0 text-xs font-bold text-rose-700 bg-white hover:bg-rose-50 px-3 py-1.5 rounded-full border border-rose-200 flex items-center gap-1 shadow-sm transition-all hover:scale-105"
          >
            Predict <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Insight 2 */}
        <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-100 flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <TrafficCone className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-900">
                Signal optimization for <span className="text-amber-600">S001 Airport T-Point</span>
              </div>
              <div className="text-xs text-slate-500 mt-0.5">Expected delay reduction: <strong className="text-emerald-600">18% (3.2 min/veh)</strong></div>
            </div>
          </div>
          <Link
            to="/signals"
            className="shrink-0 text-xs font-bold text-amber-700 bg-white hover:bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200 flex items-center gap-1 shadow-sm transition-all hover:scale-105"
          >
            Optimize <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Insight 3 */}
        <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100 flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <Compass className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-900">
                Alternative route available via <span className="text-emerald-600">Outer Ring Road</span>
              </div>
              <div className="text-xs text-slate-500 mt-0.5">Estimated time saved: <strong className="text-emerald-600">9 minutes</strong></div>
            </div>
          </div>
          <Link
            to="/routes"
            className="shrink-0 text-xs font-bold text-emerald-700 bg-white hover:bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1 shadow-sm transition-all hover:scale-105"
          >
            Reroute <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Footer Tagline */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#EA4C89]" /> Detect → Predict → Decide → Action Pipeline
        </span>
        <span className="font-mono text-emerald-600 font-bold">Auto-sync active</span>
      </div>
    </div>
  );
};

export default AIInsightCard;
