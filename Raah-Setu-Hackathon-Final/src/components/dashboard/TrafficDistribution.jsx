import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { PieChart as PieIcon, ShieldCheck, AlertTriangle, Flame } from 'lucide-react';

const distributionData = [
  { name: 'Low Congestion', value: 42, color: '#10B981' },
  { name: 'Medium Traffic', value: 31, color: '#F59E0B' },
  { name: 'High Congestion', value: 27, color: '#EF4444' },
];

const TrafficDistribution = () => {
  return (
    <div className="rounded-2xl bg-white p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      {/* Header */}
      <div className="pb-3 border-b border-slate-100">
        <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
          <PieIcon className="w-4 h-4 text-[#EA4C89]" />
          Traffic Distribution Breakdown
        </h3>
        <p className="text-xs text-slate-500">Current corridor density ratio across 91 city zones</p>
      </div>

      {/* 3 Metric Summary Cards */}
      <div className="grid grid-cols-3 gap-2 my-4">
        {/* LOW */}
        <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 flex flex-col items-center text-center">
          <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 mb-1">
            <ShieldCheck className="w-3 h-3" /> LOW
          </div>
          <div className="text-2xl font-black text-slate-900 font-display">42%</div>
          <span className="text-[10px] text-slate-500 mt-0.5">38 Zones</span>
        </div>

        {/* MEDIUM */}
        <div className="p-3 rounded-2xl bg-amber-50 border border-amber-100 flex flex-col items-center text-center">
          <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-700 mb-1">
            <AlertTriangle className="w-3 h-3" /> MEDIUM
          </div>
          <div className="text-2xl font-black text-slate-900 font-display">31%</div>
          <span className="text-[10px] text-slate-500 mt-0.5">28 Zones</span>
        </div>

        {/* HIGH */}
        <div className="p-3 rounded-2xl bg-rose-50 border border-rose-100 flex flex-col items-center text-center">
          <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-rose-700 mb-1">
            <Flame className="w-3 h-3" /> HIGH
          </div>
          <div className="text-2xl font-black text-slate-900 font-display">27%</div>
          <span className="text-[10px] text-slate-500 mt-0.5">25 Zones</span>
        </div>
      </div>

      {/* Donut Chart */}
      <div className="relative h-44 w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={distributionData}
              cx="50%"
              cy="50%"
              innerRadius={48}
              outerRadius={68}
              paddingAngle={5}
              dataKey="value"
            >
              {distributionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#FFFFFF" strokeWidth={3} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="p-2.5 rounded-xl bg-slate-900 text-white text-xs shadow-xl font-medium">
                      <span>{payload[0].name}: </span>
                      <strong className="font-mono text-cyan-400">{payload[0].value}%</strong>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Donut Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Flow</span>
          <span className="text-sm font-black text-emerald-600 font-display">Optimal</span>
        </div>
      </div>
    </div>
  );
};

export default TrafficDistribution;
