import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  MapPin, 
  TrafficCone, 
  AlertTriangle, 
  Video, 
  Route as RouteIcon, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTraffic } from '../../context/TrafficContext';

const GlobalSearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { roads, signals, incidents } = useTraffic();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter items
  const matchedRoads = query ? roads.filter(r => r.name.toLowerCase().includes(query.toLowerCase()) || r.zone.toLowerCase().includes(query.toLowerCase())).slice(0, 3) : [];
  const matchedSignals = query ? signals.filter(s => s.name.toLowerCase().includes(query.toLowerCase()) || s.id.toLowerCase().includes(query.toLowerCase())).slice(0, 3) : [];
  const matchedIncidents = query ? incidents.filter(i => i.title.toLowerCase().includes(query.toLowerCase()) || i.location.toLowerCase().includes(query.toLowerCase())).slice(0, 2) : [];

  const handleSelect = (path) => {
    navigate(path);
    onClose(false);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden animate-in slide-in-from-top-4">
        {/* Search Input Bar */}
        <div className="flex items-center px-6 py-4 border-b border-slate-100 bg-white">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search corridors, signals, incidents, CCTV cameras..."
            className="flex-1 text-sm sm:text-base text-slate-900 placeholder-slate-400 bg-transparent focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-slate-700 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => onClose(false)}
            className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-600"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4">
          {!query ? (
            <div className="p-4 space-y-3">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quick Navigation</div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: 'Live Traffic Map', path: '/live-traffic', icon: MapPin },
                  { name: 'Signal Management', path: '/signals', icon: TrafficCone },
                  { name: 'AI Prediction', path: '/prediction', icon: Sparkles },
                  { name: 'Emergency Incidents', path: '/incidents', icon: AlertTriangle },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.path}
                      onClick={() => handleSelect(item.path)}
                      className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 text-left text-xs font-bold text-slate-800 transition-colors"
                    >
                      <Icon className="w-4 h-4 text-[#EA4C89]" />
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <>
              {/* Roads */}
              {matchedRoads.length > 0 && (
                <div className="space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3">Corridors</div>
                  {matchedRoads.map((road) => (
                    <div
                      key={road.id}
                      onClick={() => handleSelect('/live-traffic')}
                      className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 cursor-pointer text-xs font-medium text-slate-800 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                        <div>
                          <div className="font-bold text-slate-900">{road.name}</div>
                          <div className="text-[10px] text-slate-500">{road.zone} • {road.vehiclesPerHour} veh/h</div>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-600">{road.trafficLevel}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Signals */}
              {matchedSignals.length > 0 && (
                <div className="space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3">Signals</div>
                  {matchedSignals.map((signal) => (
                    <div
                      key={signal.id}
                      onClick={() => handleSelect('/signals')}
                      className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 cursor-pointer text-xs font-medium text-slate-800 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <TrafficCone className="w-4 h-4 text-amber-600 shrink-0" />
                        <div>
                          <div className="font-bold text-slate-900">{signal.name}</div>
                          <div className="text-[10px] text-slate-500">[{signal.id}] • Phase: {signal.currentPhase} ({signal.secondsRemaining}s)</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </div>
                  ))}
                </div>
              )}

              {/* Incidents */}
              {matchedIncidents.length > 0 && (
                <div className="space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3">Incidents</div>
                  {matchedIncidents.map((incident) => (
                    <div
                      key={incident.id}
                      onClick={() => handleSelect('/incidents')}
                      className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 cursor-pointer text-xs font-medium text-slate-800 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                        <div>
                          <div className="font-bold text-slate-900">{incident.title}</div>
                          <div className="text-[10px] text-slate-500">{incident.location} • {incident.severity}</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 px-6">
          <span>Search across 91 city zones and 138 traffic controllers</span>
          <span className="font-mono">Raah-Setu Search v4.2</span>
        </div>
      </div>
    </div>
  );
};

export default GlobalSearchModal;
