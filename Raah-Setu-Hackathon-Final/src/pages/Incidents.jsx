import React, { useState } from 'react';
import { 
  Siren, 
  Search, 
} from 'lucide-react';
import { useTraffic } from '../context/TrafficContext';
import IncidentCard from '../components/incidents/IncidentCard';
import IncidentDetailView from '../components/incidents/IncidentDetailView';
import TrafficMap from '../components/map/TrafficMap';
import { nagpurGisZones } from '../data/gisZonesData';

const Incidents = () => {
  const { incidents, selectedZone, setSelectedZone } = useTraffic();
  const [selectedIncidentId, setSelectedIncidentId] = useState(incidents[0]?.id || 'INC-101');
  const [filterSeverity, setFilterSeverity] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const zonesList = ['ALL', ...nagpurGisZones.map(z => z.id)];
  const selectedIncident = incidents.find((i) => i.id === selectedIncidentId) || incidents[0];

  const filteredIncidents = incidents.filter((i) => {
    const matchesZone = selectedZone === 'ALL' || i.location.toLowerCase().includes(selectedZone.toLowerCase()) || selectedZone.toLowerCase().includes(i.location.toLowerCase());
    const matchesSeverity = filterSeverity === 'ALL' || i.severity === filterSeverity;
    const matchesSearch = i.title.toLowerCase().includes(searchQuery.toLowerCase()) || i.location.toLowerCase().includes(searchQuery.toLowerCase()) || i.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesZone && matchesSeverity && matchesSearch;
  });

  const criticalCount = incidents.filter(i => i.severity === 'CRITICAL' && i.status !== 'RESOLVED').length;
  const activeCount = incidents.filter(i => i.status !== 'RESOLVED').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header with Emergency Siren Background Photo */}
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl overflow-hidden shadow-2xl border border-rose-500/30 text-white group">
        <img
          src="https://images.unsplash.com/photo-1587748860084-3838579ca544?auto=format&fit=crop&w=1600&q=80"
          alt="Emergency Incident Command"
          className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/70 backdrop-blur-xs" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-rose-500/20 text-rose-300 border border-rose-400/30">
              <Siren className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-rose-300 font-mono">INCIDENT COMMAND HUB</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white font-display drop-shadow-md">Incident & Emergency Management</h1>
          <p className="text-xs sm:text-sm text-slate-200 font-medium mt-0.5 max-w-2xl drop-shadow">
            Detect • Verify • Coordinate Rapid Tactical Response • Automated Emergency Green Corridors.
          </p>
        </div>

        <div className="flex items-center gap-2 relative z-10 font-mono">
          <span className="px-4 py-2 rounded-full bg-rose-950/80 border border-rose-700 text-xs font-bold text-rose-300 backdrop-blur-md">
            Emergency Dispatch: <strong>ONLINE</strong>
          </span>
        </div>
      </div>

      {/* 4 Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-cyan-400/20 shadow-xl backdrop-blur-md text-white">
          <span className="text-xs font-bold text-slate-400 uppercase font-mono">Active Incidents</span>
          <div className="text-2xl sm:text-3xl font-black text-white font-display mt-1">0{activeCount}</div>
          <span className="text-[10px] text-cyan-300 font-semibold font-mono">Real-time monitored</span>
        </div>

        <div className="p-5 rounded-3xl bg-rose-950/40 border border-rose-800/60 shadow-xl backdrop-blur-md text-white">
          <span className="text-xs font-bold text-rose-400 uppercase font-mono">Critical Priority</span>
          <div className="text-2xl sm:text-3xl font-black text-rose-400 font-display mt-1">0{criticalCount}</div>
          <span className="text-[10px] text-rose-300 font-bold font-mono">Immediate action</span>
        </div>

        <div className="p-5 rounded-3xl bg-emerald-950/40 border border-emerald-800/60 shadow-xl backdrop-blur-md text-white">
          <span className="text-xs font-bold text-emerald-400 uppercase font-mono">Resolved Today</span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-display mt-1">18</div>
          <span className="text-[10px] text-emerald-300 font-semibold font-mono">Avg. 14 min clear time</span>
        </div>

        <div className="p-5 rounded-3xl bg-blue-950/40 border border-blue-800/60 shadow-xl backdrop-blur-md text-white">
          <span className="text-xs font-bold text-blue-400 uppercase font-mono">Average Response</span>
          <div className="text-2xl sm:text-3xl font-black text-blue-400 font-display mt-1">6.4 min</div>
          <span className="text-[10px] text-blue-300 font-bold font-mono">↓ 46.7% vs traditional</span>
        </div>
      </div>

      {/* Main Split Screen: Incident List + Incident Detail / Response Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 5 Cols: Incident Feed */}
        <div className="lg:col-span-5 space-y-4">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="relative flex-1 min-w-[180px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search incidents..."
                className="w-full bg-slate-900/80 border border-slate-800 rounded-full pl-10 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="bg-slate-900/80 border border-slate-800 rounded-full px-3 py-2 text-xs font-bold text-cyan-300 focus:outline-none focus:border-cyan-400 font-mono"
            >
              {zonesList.map(z => <option key={z} value={z}>{z === 'ALL' ? 'All Zones' : z}</option>)}
            </select>

            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="bg-slate-900/80 border border-slate-800 rounded-full px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-cyan-400 font-mono"
            >
              <option value="ALL">All Severity</option>
              <option value="CRITICAL">Critical</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
          </div>

          {/* List Cards */}
          <div className="space-y-3.5 max-h-[620px] overflow-y-auto pr-1">
            {filteredIncidents.map((incident) => (
              <IncidentCard
                key={incident.id}
                incident={incident}
                isSelected={incident.id === selectedIncidentId}
                onSelect={() => setSelectedIncidentId(incident.id)}
              />
            ))}
          </div>
        </div>

        {/* Right 7 Cols: Detailed Tactical View & Map */}
        <div className="lg:col-span-7 space-y-5">
          {selectedIncident && (
            <>
              <IncidentDetailView incident={selectedIncident} />

              {/* Map Preview */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-300 font-mono">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                    Incident Geographic Focus: {selectedIncident.location}
                  </span>
                  <span className="font-bold text-rose-300 bg-rose-950/60 px-2 py-0.5 rounded-full border border-rose-800">
                    Radius: 1.5 km Impact
                  </span>
                </div>
                <div className="rounded-3xl overflow-hidden bg-slate-900/80 border border-cyan-400/20 shadow-xl p-1">
                  <TrafficMap
                    height="260px"
                    customCenter={selectedIncident.coordinates}
                    customZoom={14}
                    selectedZone={selectedZone}
                    onZoneSelect={setSelectedZone}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Incidents;
