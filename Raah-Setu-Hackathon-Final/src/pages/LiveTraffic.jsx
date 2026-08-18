import React, { useState } from 'react';
import { 
  Activity, 
  Search, 
  Video, 
  ShieldCheck, 
  AlertTriangle, 
  Flame, 
} from 'lucide-react';
import { useTraffic } from '../context/TrafficContext';
import TrafficMap from '../components/map/TrafficMap';
import { liveCameras } from '../data/cameraData';
import StatusBadge from '../components/common/StatusBadge';
import { nagpurGisZones } from '../data/gisZonesData';

const LiveTraffic = () => {
  const { roads, stats, selectedZone, setSelectedZone } = useTraffic();
  const [selectedLevel, setSelectedLevel] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const zonesList = ['ALL', ...nagpurGisZones.map(z => z.id)];
  const levels = ['ALL', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

  // Filter roads
  const filteredRoads = roads.filter((r) => {
    const matchesZone = selectedZone === 'ALL' || r.zone === selectedZone || r.zone.includes(selectedZone);
    const matchesLevel = selectedLevel === 'ALL' || r.trafficLevel === selectedLevel;
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.zone.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesZone && matchesLevel && matchesSearch;
  });

  // Filter cameras by selected zone
  const filteredCameras = liveCameras.filter((cam) => {
    return selectedZone === 'ALL' || cam.zone.toLowerCase().includes(selectedZone.toLowerCase()) || selectedZone.toLowerCase().includes(cam.zone.toLowerCase());
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header with High-Res Traffic Photo Background */}
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl overflow-hidden shadow-2xl border border-cyan-400/20 text-white group">
        <img
          src="https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1600&q=80"
          alt="Live Traffic Radar"
          className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/70 backdrop-blur-xs" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-bold text-emerald-300 font-mono">REAL-TIME TELEMETRY & CCTV</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white font-display drop-shadow-md">Live Traffic Monitoring</h1>
          <p className="text-xs sm:text-sm text-slate-200 font-medium mt-0.5 max-w-2xl drop-shadow">
            Real-time urban arterial conditions, optical vehicle radar counts, and CCTV feeds across Nagpur Metropolitan Corridors.
          </p>
        </div>

        <div className="flex items-center gap-2 relative z-10">
          <div className="px-4 py-2 rounded-full bg-slate-900/80 border border-slate-700 text-xs font-mono font-bold text-slate-200 backdrop-blur-md">
            <span>Sensors Online: <strong className="text-emerald-400">100%</strong></span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-3xl bg-slate-900/80 border border-cyan-400/20 shadow-xl backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-white">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter location or corridor name..."
            className="w-full bg-slate-950/80 border border-slate-800 rounded-full pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-medium"
          />
        </div>

        {/* Zone Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400 font-bold hidden sm:inline">Nagpur Zone:</label>
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-full px-4 py-2 text-xs font-bold text-cyan-300 focus:outline-none focus:border-cyan-400"
          >
            {zonesList.map(z => <option key={z} value={z}>{z === 'ALL' ? 'All Nagpur Zones' : z}</option>)}
          </select>
        </div>

        {/* Traffic Level */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400 font-bold hidden sm:inline font-mono">Level:</label>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-full px-4 py-2 text-xs font-bold text-white focus:outline-none focus:border-cyan-400"
          >
            {levels.map(l => <option key={l} value={l}>{l === 'ALL' ? 'All Traffic Levels' : l}</option>)}
          </select>
        </div>

        {/* Reset */}
        <button
          onClick={() => { setSelectedZone('ALL'); setSelectedLevel('ALL'); setSearchQuery(''); }}
          className="px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Main Split Screen: Live Map + Traffic Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Map */}
        <div className="lg:col-span-8 rounded-3xl overflow-hidden bg-slate-900/80 border border-cyan-400/20 shadow-xl p-1">
          <TrafficMap 
            height="520px"
            selectedZone={selectedZone}
            onZoneSelect={setSelectedZone}
            selectedLevel={selectedLevel}
            searchQuery={searchQuery}
          />
        </div>

        {/* Right 4 Cols: Traffic Summary */}
        <div className="lg:col-span-4 space-y-4 flex flex-col justify-between">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-cyan-400/20 shadow-xl space-y-4 text-slate-100">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                Live Corridor Summary
              </h3>
              <p className="text-xs text-slate-400">Zone: <strong className="text-cyan-300">{selectedZone}</strong> • {filteredRoads.length} Active Corridors</p>
            </div>

            {/* Metric Rows */}
            <div className="space-y-3">
              {/* High */}
              <div className="p-3.5 rounded-2xl bg-rose-950/40 border border-rose-800/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-rose-900/60 text-rose-400">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">High / Jammed Corridors</div>
                    <div className="text-[10px] text-slate-400">Proactive signal wave diversion</div>
                  </div>
                </div>
                <div className="text-2xl font-black text-rose-400 font-display">{stats.corridorSummary.high}</div>
              </div>

              {/* Medium */}
              <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-800/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-900/60 text-amber-400">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Moderate Congestion</div>
                    <div className="text-[10px] text-slate-400">Operating at 60-75% capacity</div>
                  </div>
                </div>
                <div className="text-2xl font-black text-amber-400 font-display">{stats.corridorSummary.medium}</div>
              </div>

              {/* Low */}
              <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-900/60 text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Clear / Free Flow</div>
                    <div className="text-[10px] text-slate-400">Free flow velocity &gt; 45 km/h</div>
                  </div>
                </div>
                <div className="text-2xl font-black text-emerald-400 font-display">{stats.corridorSummary.low}</div>
              </div>
            </div>
          </div>

          {/* Quick Filtered Corridor List Preview */}
          <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl flex-1 max-h-60 overflow-y-auto space-y-2">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">
              Zone Filtered Corridors ({filteredRoads.length})
            </div>
            {filteredRoads.map((road) => (
              <div key={road.id} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white truncate max-w-[170px]">{road.name}</div>
                  <div className="text-[10px] text-slate-400">{road.averageSpeed} km/h • {road.vehiclesPerHour} veh/h</div>
                </div>
                <StatusBadge status={road.trafficLevel} size="xs" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Traffic Camera Panel in Dribbble Shot Card style */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-white text-xl font-display flex items-center gap-2">
              <Video className="w-5 h-5 text-[#EA4C89]" />
              Live AI Optical CCTV & Sensor Network
            </h3>
            <p className="text-xs text-slate-400">Simulated AI computer-vision vehicle detection feeds across <strong className="text-cyan-300">{selectedZone}</strong></p>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800">
            {filteredCameras.length} Cameras Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(filteredCameras.length > 0 ? filteredCameras : liveCameras).map((cam) => (
            <div
              key={cam.id}
              className="rounded-3xl overflow-hidden bg-slate-900/80 border border-slate-800 shadow-xl hover:border-cyan-400/40 transition-all duration-300 flex flex-col group"
            >
              {/* Camera Live Stream Simulated View */}
              <div className="relative h-48 bg-slate-950 overflow-hidden">
                <img
                  src={cam.thumbnail}
                  alt={cam.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />

                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-600 text-white text-[10px] font-bold shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  <span>{cam.status}</span>
                </div>

                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-mono text-cyan-300">
                  {cam.streamQuality}
                </div>

                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-white font-mono bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl">
                  <span>{cam.id}</span>
                  <span className="text-cyan-300">{cam.cameraType}</span>
                </div>
              </div>

              {/* Camera Telemetry Details */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between text-slate-100">
                <div>
                  <h4 className="font-bold text-white text-sm sm:text-base truncate">{cam.name}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{cam.zone}</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-center text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Vehicles</span>
                    <div className="text-sm font-black text-white">{cam.hourlyVehicleRate}</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Density</span>
                    <div className={`text-sm font-black ${
                      cam.density === 'High' ? 'text-rose-400' : cam.density === 'Medium' ? 'text-amber-400' : 'text-emerald-400'
                    }`}>
                      {cam.density}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Speed</span>
                    <div className="text-sm font-black text-cyan-300">{cam.averageSpeed}</div>
                  </div>
                </div>

                {/* AI Detection Breakdown */}
                <div className="text-[11px] font-medium text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800 font-mono">
                  <span>Cars: {cam.detectionClasses.cars}%</span>
                  <span>2-W: {cam.detectionClasses.twoWheelers}%</span>
                  <span>Buses: {cam.detectionClasses.buses}%</span>
                  <span>Trucks: {cam.detectionClasses.trucks}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveTraffic;
