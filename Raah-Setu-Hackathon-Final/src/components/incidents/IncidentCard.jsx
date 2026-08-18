import React from 'react';
import { AlertTriangle, Clock, MapPin, Users, ChevronRight, Siren, ShieldAlert, Wrench } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

const IncidentCard = ({ incident, isSelected, onSelect }) => {
  const { id, type, title, location, severity, status, reportedTime, vehiclesAffected } = incident;

  const getTypeIcon = () => {
    switch (type) {
      case 'ACCIDENT':
        return <Siren className="w-5 h-5 text-rose-400" />;
      case 'EMERGENCY':
        return <ShieldAlert className="w-5 h-5 text-rose-400" />;
      case 'ROAD_BLOCK':
        return <Wrench className="w-5 h-5 text-amber-400" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div
      onClick={onSelect}
      className={`relative cursor-pointer rounded-3xl p-5 border transition-all duration-300 ${
        isSelected
          ? 'bg-slate-900/90 border-cyan-400 shadow-2xl ring-2 ring-cyan-400/40'
          : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:shadow-lg'
      } text-white`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3.5">
          <div className={`p-2.5 rounded-2xl border shrink-0 ${
            severity === 'CRITICAL' 
              ? 'bg-rose-950/80 border-rose-800' 
              : 'bg-amber-950/80 border-amber-800'
          }`}>
            {getTypeIcon()}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1 font-mono">
              <span className="text-xs font-bold text-cyan-300">{id}</span>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-950 text-slate-300 border border-slate-800">
                {type}
              </span>
            </div>

            <h4 className="font-bold text-white text-sm sm:text-base leading-snug">{title}</h4>

            <div className="flex items-center gap-1 text-xs text-slate-400 mt-1 font-mono">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{location}</span>
            </div>
          </div>
        </div>

        <StatusBadge status={status} size="sm" pulse={status === 'ACTIVE'} />
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-medium">
            <Clock className="w-3.5 h-3.5 text-slate-400" /> {reportedTime}
          </span>
          <span className="flex items-center gap-1 font-medium">
            <Users className="w-3.5 h-3.5 text-slate-400" /> ~{vehiclesAffected} veh
          </span>
        </div>

        <span className="text-xs font-bold text-cyan-300 flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
          Details <ChevronRight className="w-3.5 h-3.5 text-pink-400" />
        </span>
      </div>
    </div>
  );
};

export default IncidentCard;
