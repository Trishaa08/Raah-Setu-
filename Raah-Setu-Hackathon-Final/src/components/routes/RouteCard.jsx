import React from 'react';
import { Sparkles, Navigation, CheckCircle2 } from 'lucide-react';

const RouteCard = ({ route, isSelected, onSelect, onNavigate }) => {
  const {
    name,
    tag,
    isRecommended,
    distanceKm,
    estimatedMinutes,
    timeSavedMinutes,
    trafficLevel,
    color,
    via,
    reasons,
    fuelSavedLiters,
  } = route;

  return (
    <div
      onClick={onSelect}
      className={`relative cursor-pointer rounded-3xl p-5 sm:p-6 border transition-all duration-300 ${
        isSelected
          ? 'bg-slate-900/90 border-cyan-400 shadow-2xl ring-2 ring-cyan-400/40'
          : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:shadow-lg'
      } text-white`}
    >
      {/* Header Badge */}
      <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <span
            className="w-3.5 h-3.5 rounded-full shrink-0 shadow-md"
            style={{ backgroundColor: color }}
          />
          <h4 className="font-bold text-white text-sm sm:text-base truncate">{name}</h4>
        </div>

        <span className={`text-[10px] font-bold font-mono px-3 py-1 rounded-full ${
          isRecommended
            ? 'bg-pink-950/80 text-pink-300 border border-pink-800'
            : trafficLevel === 'High'
            ? 'bg-rose-950/80 text-rose-300 border border-rose-800'
            : 'bg-cyan-950/80 text-cyan-300 border border-cyan-800'
        }`}>
          {tag}
        </span>
      </div>

      {/* Corridor Via */}
      <p className="text-xs text-slate-400 font-medium mb-3.5 font-mono">{via}</p>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-2 p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 mb-4 text-center font-mono">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400">Travel Time</span>
          <div className="text-base sm:text-lg font-black text-white">{estimatedMinutes} min</div>
        </div>

        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400">Distance</span>
          <div className="text-base sm:text-lg font-black text-cyan-300">{distanceKm} km</div>
        </div>

        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400">Congestion</span>
          <div className={`text-xs sm:text-sm font-black mt-0.5 ${
            trafficLevel === 'Low' ? 'text-emerald-400' : trafficLevel === 'Medium' ? 'text-amber-400' : 'text-rose-400'
          }`}>
            {trafficLevel}
          </div>
        </div>
      </div>

      {/* Time Saved Highlight */}
      {timeSavedMinutes > 0 && (
        <div className="flex items-center justify-between p-2.5 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 text-xs text-emerald-300 font-bold mb-3.5 font-mono">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Save {timeSavedMinutes} minutes
          </span>
          <span className="text-[10px] text-emerald-400">Fuel -{fuelSavedLiters}</span>
        </div>
      )}

      {/* Reasons Checklist (for selected card) */}
      {isSelected && reasons && (
        <div className="space-y-1.5 pb-4 pt-1 border-t border-slate-800/60">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">Why Choose This Route:</div>
          {reasons.map((r, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{r}</span>
            </div>
          ))}
        </div>
      )}

      {/* Navigate Action Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate(route);
        }}
        className={`w-full flex items-center justify-center gap-2 py-3 rounded-full text-xs sm:text-sm font-bold transition-all ${
          isRecommended
            ? 'bg-gradient-to-r from-cyan-600 via-blue-600 to-pink-600 hover:brightness-110 text-white shadow-lg hover:scale-105'
            : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
        }`}
      >
        <Navigation className="w-4 h-4 text-white" />
        <span>Navigate Route</span>
      </button>
    </div>
  );
};

export default RouteCard;
