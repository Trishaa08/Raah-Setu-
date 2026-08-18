import React from 'react';

const SignalTimeline = ({ signal }) => {
  if (!signal) return null;

  const greenSeconds = signal.greenTime || 45;
  const yellowSeconds = 4;
  const redSeconds = (signal.cycleTime || 90) - greenSeconds - yellowSeconds;
  const totalSeconds = signal.cycleTime || 90;

  const greenPct = (greenSeconds / totalSeconds) * 100;
  const yellowPct = (yellowSeconds / totalSeconds) * 100;
  const redPct = (redSeconds / totalSeconds) * 100;

  return (
    <div className="rounded-3xl bg-slate-900/80 p-6 border border-cyan-400/20 shadow-xl backdrop-blur-md text-white">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
        <div>
          <h4 className="font-bold text-white text-sm font-display">Signal Cycle Phase Timeline</h4>
          <p className="text-xs text-slate-400">Total Cycle: {totalSeconds}s split across North-South / East-West</p>
        </div>
        <span className="text-xs font-mono font-bold text-pink-300 bg-pink-950/60 px-3 py-1 rounded-full border border-pink-800">
          Real-Time Sync
        </span>
      </div>

      {/* Timeline Ruler */}
      <div className="relative mb-2 font-mono">
        <div className="flex justify-between text-[10px] text-slate-400 pb-1">
          <span>0s</span>
          <span>15s</span>
          <span>30s</span>
          <span>45s</span>
          <span>60s</span>
          <span>75s</span>
          <span>{totalSeconds}s</span>
        </div>
        <div className="flex h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
          <div className="w-1/6 border-r border-slate-800" />
          <div className="w-1/6 border-r border-slate-800" />
          <div className="w-1/6 border-r border-slate-800" />
          <div className="w-1/6 border-r border-slate-800" />
          <div className="w-1/6 border-r border-slate-800" />
          <div className="w-1/6" />
        </div>
      </div>

      {/* Multi-Phase Color Bar */}
      <div className="h-10 w-full rounded-2xl overflow-hidden flex p-1 bg-slate-950 border border-slate-800 font-mono">
        {/* GREEN BLOCK */}
        <div
          style={{ width: `${greenPct}%` }}
          className="h-full bg-emerald-500 rounded-l-xl flex items-center justify-center text-[11px] font-bold text-white tracking-wider shadow-sm"
        >
          <span>GREEN ({greenSeconds}s)</span>
        </div>

        {/* YELLOW BLOCK */}
        <div
          style={{ width: `${yellowPct}%` }}
          className="h-full bg-amber-400 flex items-center justify-center text-[10px] font-black text-slate-950 tracking-wider shadow-sm"
        >
          <span>Y</span>
        </div>

        {/* RED BLOCK */}
        <div
          style={{ width: `${redPct}%` }}
          className="h-full bg-rose-500 rounded-r-xl flex items-center justify-center text-[11px] font-bold text-white tracking-wider shadow-sm"
        >
          <span>RED ({redSeconds}s)</span>
        </div>
      </div>

      {/* Sub-Legend */}
      <div className="mt-3.5 flex flex-wrap items-center justify-between text-xs text-slate-300 gap-2 font-mono">
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> North-South Green ({greenSeconds}s)
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Clearance (4s)
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Cross Flow Red ({redSeconds}s)
          </span>
        </div>
        <span className="text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800">
          {greenPct.toFixed(0)}% Allocation
        </span>
      </div>
    </div>
  );
};

export default SignalTimeline;
