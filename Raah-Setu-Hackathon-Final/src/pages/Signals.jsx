import React, { useState } from 'react';
import { 
  TrafficCone, 
  Search, 
  Radio
} from 'lucide-react';
import { useTraffic } from '../context/TrafficContext';
import SignalVisualizer from '../components/signals/SignalVisualizer';
import SignalTimeline from '../components/signals/SignalTimeline';
import TimingComparison from '../components/signals/TimingComparison';
import StatusBadge from '../components/common/StatusBadge';
import { nagpurGisZones } from '../data/gisZonesData';

const Signals = () => {
  const { signals, stats, applySignalAITiming, selectedZone, setSelectedZone } = useTraffic();
  const [selectedSignalId, setSelectedSignalId] = useState('S001');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const zonesList = ['ALL', ...nagpurGisZones.map(z => z.id)];
  const selectedSignal = signals.find((s) => s.id === selectedSignalId) || signals[0];

  const filteredSignals = signals.filter((s) => {
    const matchesZone = selectedZone === 'ALL' || s.location.toLowerCase().includes(selectedZone.toLowerCase()) || s.name.toLowerCase().includes(selectedZone.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || s.status === filterStatus;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.location.toLowerCase().includes(searchQuery.toLowerCase()) || s.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesZone && matchesStatus && matchesSearch;
  });

  const optimizedCount = signals.filter(s => s.status === 'Optimized').length;
  const manualCount = signals.filter(s => s.status === 'Manual' || s.status === 'Normal').length;
  const criticalCount = signals.filter(s => s.status === 'Critical' || s.trafficDensity === 'High').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header with Traffic Light Photo Background */}
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl overflow-hidden shadow-2xl border border-cyan-400/20 text-white group">
        <img
          src="https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?auto=format&fit=crop&w=1600&q=80"
          alt="Adaptive Signals"
          className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/70 backdrop-blur-xs" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-400/30">
              <TrafficCone className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-amber-300 font-mono">ADAPTIVE TRAFFIC LIGHT ENGINE</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white font-display drop-shadow-md">Adaptive Signal Management</h1>
          <p className="text-xs sm:text-sm text-slate-200 font-medium mt-0.5 max-w-2xl drop-shadow">
            Real-time split-cycle coordination, dynamic green waves, and AI phase optimization across 138 junctions.
          </p>
        </div>

        <div className="flex items-center gap-2 relative z-10 font-mono">
          <span className="px-4 py-2 rounded-full bg-slate-900/80 border border-slate-700 text-xs font-bold text-emerald-400 backdrop-blur-md">
            Network Sync: <strong>Autonomous Wave</strong>
          </span>
        </div>
      </div>

      {/* 4 Overview KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-cyan-400/20 shadow-xl backdrop-blur-md text-white">
          <span className="text-xs font-bold text-slate-400 uppercase font-mono">Total Signals</span>
          <div className="text-2xl sm:text-3xl font-black text-white font-display mt-1">{stats.activeSignals}</div>
          <span className="text-[10px] text-cyan-300 font-semibold font-mono">100% telemetry online</span>
        </div>

        <div className="p-5 rounded-3xl bg-emerald-950/40 border border-emerald-800/60 shadow-xl backdrop-blur-md text-white">
          <span className="text-xs font-bold text-emerald-400 uppercase font-mono">AI Optimized</span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-display mt-1">{optimizedCount}</div>
          <span className="text-[10px] text-emerald-300 font-semibold font-mono">Active adaptive cycles</span>
        </div>

        <div className="p-5 rounded-3xl bg-blue-950/40 border border-blue-800/60 shadow-xl backdrop-blur-md text-white">
          <span className="text-xs font-bold text-blue-400 uppercase font-mono">Fixed / Manual</span>
          <div className="text-2xl sm:text-3xl font-black text-blue-400 font-display mt-1">0{manualCount}</div>
          <span className="text-[10px] text-blue-300 font-semibold font-mono">Scheduled for upgrade</span>
        </div>

        <div className="p-5 rounded-3xl bg-rose-950/40 border border-rose-800/60 shadow-xl backdrop-blur-md text-white">
          <span className="text-xs font-bold text-rose-400 uppercase font-mono">Critical Demand</span>
          <div className="text-2xl sm:text-3xl font-black text-rose-400 font-display mt-1">0{criticalCount}</div>
          <span className="text-[10px] text-rose-300 font-bold font-mono">Congestion surge</span>
        </div>
      </div>

      {/* Selected Signal In-Depth Visualizer & Controls */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-white text-lg flex items-center gap-2 font-display">
            <Radio className="w-5 h-5 text-pink-400 animate-pulse" />
            Live Intersection Visualizer: <span className="text-cyan-300 font-mono">[{selectedSignal.id}] {selectedSignal.name}</span>
          </h3>
          <span className="text-xs text-slate-400 font-medium">Select any row in the table below to inspect</span>
        </div>

        {/* 3D Traffic Light Visualizer */}
        <SignalVisualizer signal={selectedSignal} />

        {/* Multi-Phase Timeline Bar */}
        <SignalTimeline signal={selectedSignal} />

        {/* Timing Comparison Matrix */}
        <TimingComparison signal={selectedSignal} />
      </div>

      {/* Signal Table */}
      <div className="rounded-3xl bg-slate-900/80 border border-cyan-400/20 shadow-xl overflow-hidden text-white">
        {/* Table Toolbar */}
        <div className="p-5 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-white text-base">Citywide Signal Controller Grid</h3>
            <p className="text-xs text-slate-400">Click any row to inspect timing splits and apply AI optimizations</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:w-56">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search signal ID or junction..."
                className="w-full bg-slate-950 border border-slate-800 rounded-full pl-10 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Zone Selector */}
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-full px-4 py-2 text-xs font-bold text-cyan-300 focus:outline-none focus:border-cyan-400"
            >
              {zonesList.map(z => <option key={z} value={z}>{z === 'ALL' ? 'All Zones' : z}</option>)}
            </select>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-full px-4 py-2 text-xs font-bold text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="ALL">All Statuses</option>
              <option value="Optimized">Optimized</option>
              <option value="Normal">Normal</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-bold bg-slate-950 text-[11px] font-mono">
                <th className="py-3.5 px-5">Signal ID</th>
                <th className="py-3.5 px-5">Junction Location</th>
                <th className="py-3.5 px-5">Current Phase</th>
                <th className="py-3.5 px-5">Green Window</th>
                <th className="py-3.5 px-5">Traffic Demand</th>
                <th className="py-3.5 px-5">Optimization Status</th>
                <th className="py-3.5 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredSignals.map((signal) => {
                const isSelected = signal.id === selectedSignalId;
                const isGreen = signal.currentPhase === 'GREEN';
                const isYellow = signal.currentPhase === 'YELLOW';

                return (
                  <tr
                    key={signal.id}
                    onClick={() => setSelectedSignalId(signal.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-pink-950/40 border-l-4 border-l-pink-500'
                        : 'hover:bg-slate-800/50'
                    }`}
                  >
                    <td className="py-4 px-5 font-mono font-bold text-cyan-300">{signal.id}</td>
                    <td className="py-4 px-5 font-medium text-white">
                      <div>{signal.name}</div>
                      <div className="text-xs text-slate-400 font-normal">{signal.location}</div>
                    </td>
                    <td className="py-4 px-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono ${
                        isGreen
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : isYellow
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-rose-950 text-rose-300 border border-rose-800'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isGreen ? 'bg-emerald-400' : isYellow ? 'bg-amber-400' : 'bg-rose-400'}`} />
                        {signal.currentPhase} ({signal.secondsRemaining}s)
                      </span>
                    </td>
                    <td className="py-4 px-5 font-mono font-bold text-white">{signal.greenTime} sec</td>
                    <td className="py-4 px-5">
                      <StatusBadge status={signal.trafficDensity} size="xs" />
                    </td>
                    <td className="py-4 px-5">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full font-mono ${
                        signal.status === 'Optimized'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : signal.status === 'Critical'
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}>
                        {signal.status}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSignalId(signal.id);
                          applySignalAITiming(signal.id);
                        }}
                        disabled={signal.isAITimingApplied}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                          signal.isAITimingApplied
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800 cursor-default'
                            : 'bg-gradient-to-r from-cyan-600 to-pink-600 hover:brightness-110 text-white shadow-md'
                        }`}
                      >
                        {signal.isAITimingApplied ? 'Optimized' : 'Apply AI'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Signals;
