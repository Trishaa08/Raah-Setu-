import React from 'react';
import { 
  Siren, 
  Navigation, 
  Bot, 
  Radio, 
  CheckCheck
} from 'lucide-react';
import { useTraffic } from '../../context/TrafficContext';
import StatusBadge from '../common/StatusBadge';

const IncidentDetailView = ({ incident }) => {
  const { dispatchIncidentResponse, divertIncidentTraffic, resolveIncident } = useTraffic();

  if (!incident) return null;

  const {
    id,
    type,
    title,
    location,
    status,
    reportedTime,
    coordinates,
    description,
    recommendations,
    unitsDispatched,
    estimatedClearanceTime,
    delayImpact
  } = incident;

  const isResolved = status === 'RESOLVED';
  const isDispatched = status === 'DISPATCHED';
  const isDiverting = status === 'DIVERTING';

  return (
    <div className="rounded-3xl bg-slate-900/80 p-6 sm:p-7 border border-cyan-400/20 shadow-xl backdrop-blur-md text-white space-y-5">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1 font-mono">
            <span className="text-xs font-bold text-rose-400">[{id}]</span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800">
              {type}
            </span>
            <StatusBadge status={status} size="sm" pulse={status === 'ACTIVE'} />
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white font-display">{title}</h3>
        </div>

        <div className="text-left sm:text-right font-mono">
          <div className="text-xs text-slate-400">GPS Coordinates</div>
          <div className="text-xs font-black text-cyan-300">
            {coordinates[0].toFixed(4)}° N, {coordinates[1].toFixed(4)}° E
          </div>
        </div>
      </div>

      {/* Overview Metadata Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs font-mono">
        <div>
          <span className="text-slate-400 font-bold uppercase text-[10px]">Location</span>
          <div className="text-white font-bold mt-0.5">{location}</div>
        </div>
        <div>
          <span className="text-slate-400 font-bold uppercase text-[10px]">Reported Time</span>
          <div className="text-cyan-300 font-bold mt-0.5">{reportedTime}</div>
        </div>
        <div>
          <span className="text-slate-400 font-bold uppercase text-[10px]">Delay Impact</span>
          <div className="text-rose-400 font-bold mt-0.5">{delayImpact}</div>
        </div>
        <div>
          <span className="text-slate-400 font-bold uppercase text-[10px]">Est. Clearance</span>
          <div className="text-emerald-400 font-bold mt-0.5">{estimatedClearanceTime}</div>
        </div>
      </div>

      {/* Description */}
      <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
        <strong className="text-white font-mono">Situation Summary: </strong>
        {description}
      </div>

      {/* Units En Route */}
      {unitsDispatched && unitsDispatched.length > 0 && (
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Emergency Units Tagged</span>
          <div className="flex flex-wrap gap-2">
            {unitsDispatched.map((unit, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-full bg-slate-950 border border-slate-800 text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5 shadow-sm"
              >
                <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                {unit}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* AI Emergency Response Recommendations */}
      <div className="rounded-3xl bg-pink-950/20 p-5 border border-pink-800/60 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-pink-800/60 font-mono">
          <h4 className="font-bold text-white text-sm flex items-center gap-2 font-display">
            <Bot className="w-4 h-4 text-pink-400" />
            AI Dynamic Incident Response Protocol
          </h4>
          <span className="text-[10px] text-pink-300 font-bold">AUTOMATED INFERENCE</span>
        </div>

        <div className="space-y-2 font-mono">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="flex items-start justify-between gap-3 p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 shadow-sm"
            >
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-pink-600 text-white flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
                  {rec.id}
                </span>
                <span className="font-medium">{rec.step}</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                rec.status === 'DONE' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
              }`}>
                {rec.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Command Action Buttons */}
      <div className="pt-2 flex flex-wrap items-center gap-3 font-mono">
        <button
          onClick={() => dispatchIncidentResponse(id)}
          disabled={isDispatched || isResolved}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-full text-xs sm:text-sm font-bold transition-all ${
            isDispatched
              ? 'bg-amber-950 text-amber-300 border border-amber-800'
              : 'bg-gradient-to-r from-cyan-600 to-pink-600 hover:brightness-110 text-white shadow-lg'
          }`}
        >
          <Siren className="w-4 h-4 text-white" />
          <span>{isDispatched ? 'Units Dispatched' : 'Dispatch Response'}</span>
        </button>

        <button
          onClick={() => divertIncidentTraffic(id)}
          disabled={isDiverting || isResolved}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-full text-xs sm:text-sm font-bold transition-all ${
            isDiverting
              ? 'bg-blue-950 text-blue-300 border border-blue-800'
              : 'bg-pink-600 hover:bg-pink-500 text-white shadow-lg'
          }`}
        >
          <Navigation className="w-4 h-4" />
          <span>{isDiverting ? 'Diversion Active' : 'Divert Traffic'}</span>
        </button>

        <button
          onClick={() => resolveIncident(id)}
          disabled={isResolved}
          className={`flex items-center justify-center gap-2 py-3 px-5 rounded-full text-xs sm:text-sm font-bold transition-all ${
            isResolved
              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800 cursor-default'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
          }`}
        >
          <CheckCheck className="w-4 h-4 text-emerald-400" />
          <span>{isResolved ? 'Resolved' : 'Mark Resolved'}</span>
        </button>
      </div>
    </div>
  );
};

export default IncidentDetailView;
