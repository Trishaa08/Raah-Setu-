import React from 'react';
import { ArrowDownRight, ArrowUpRight, Clock, Activity, Zap, ShieldAlert, Fuel, Sparkles } from 'lucide-react';
import { beforeVsAfterMetrics } from '../../data/analyticsData';

const iconMap = {
  Clock: Clock,
  Activity: Activity,
  Zap: Zap,
  ShieldAlert: ShieldAlert,
  Fuel: Fuel,
};

const BeforeAfterComparison = () => {
  return (
    <div className="rounded-3xl bg-slate-900/80 p-6 border border-cyan-400/20 shadow-xl backdrop-blur-md text-white space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h4 className="font-bold text-white text-base sm:text-lg flex items-center gap-2 font-display">
            <Sparkles className="w-5 h-5 text-pink-400" />
            Before vs. After AI System Impact Matrix
          </h4>
          <p className="text-xs text-slate-400">Direct operational metrics comparison before deployment vs with RAAH-SETU AI</p>
        </div>
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
          DEMO VERIFIED
        </span>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-bold bg-slate-950 font-mono text-[11px]">
              <th className="py-3.5 px-4 rounded-l-xl">City Metric</th>
              <th className="py-3.5 px-4">Legacy (Before AI)</th>
              <th className="py-3.5 px-4 text-pink-400">RAAH-SETU AI</th>
              <th className="py-3.5 px-4 text-right rounded-r-xl">Net Improvement</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 font-mono">
            {beforeVsAfterMetrics.map((item, idx) => {
              const Icon = iconMap[item.icon] || Activity;
              return (
                <tr key={idx} className="hover:bg-slate-800/50 transition-colors">
                  <td className="py-4 px-4 font-semibold text-white flex items-center gap-2.5 font-sans">
                    <div className="p-2 rounded-xl bg-slate-950 text-cyan-300 border border-slate-800">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span>{item.metric}</span>
                  </td>
                  <td className="py-4 px-4 text-slate-400">{item.beforeAI}</td>
                  <td className="py-4 px-4 font-black text-emerald-400">{item.withAI}</td>
                  <td className="py-4 px-4 text-right">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {item.improvement.includes('↑') ? (
                        <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <ArrowDownRight className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                      <span>{item.improvement}</span>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BeforeAfterComparison;
