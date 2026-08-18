import React, { useState } from 'react';
import { Play, RotateCcw, Zap, Gauge, ShieldCheck, ArrowDownRight, Route as RouteIcon, MapPin, Database } from 'lucide-react';
import TrafficMap from '../components/map/TrafficMap';
import { trafficApi } from '../services/api';
import { useTraffic } from '../context/TrafficContext';

const Simulation = () => {
  const { selectedZone, setSelectedZone } = useTraffic();
  const [params, setParams] = useState({ hour: 19, duration: 60, rain: 0, event: 0, diversionPercent: 12 });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recommendedRoute, setRecommendedRoute] = useState(null);

  const run = async () => {
    setLoading(true);
    try {
      const data = await trafficApi.runSimulation(params);
      setResult(data);
      setRecommendedRoute(data.recommendedRoutePath ? { path: data.recommendedRoutePath } : null);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setParams({ hour: 19, duration: 60, rain: 0, event: 0, diversionPercent: 12 });
    setResult(null);
    setRecommendedRoute(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header with High-Res Cyber Photo Background */}
      <div className="relative p-6 sm:p-8 rounded-3xl overflow-hidden shadow-2xl border border-cyan-400/20 text-white group">
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80"
          alt="Traffic Simulator"
          className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/70 backdrop-blur-xs" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 text-cyan-300 text-xs font-black uppercase tracking-widest font-mono">
            <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
            PEAK-HOUR TRAFFIC SIMULATOR
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mt-2 font-display drop-shadow-md">
            Raah-Setu <span className="text-[#EA4C89] italic">Traffic Management Simulator</span>
          </h1>
          <p className="text-slate-200 mt-2 text-xs sm:text-sm max-w-3xl font-medium drop-shadow">
            Simulate uneven traffic distribution across Nagpur planning-authority jurisdictions and generate an adaptive diversion + signal plan using Python ML models.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[340px_1fr] gap-5">
        {/* Scenario Controls Panel */}
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-cyan-400/20 shadow-xl backdrop-blur-md space-y-5 text-white">
          <div>
            <h3 className="font-black text-white text-base">Scenario Controls</h3>
            <p className="text-xs text-slate-400 mt-1">Adjust inputs and trigger Python Linear Regression model.</p>
          </div>

          {[
            ['hour', 'Peak hour (0-23)', 0, 23, 1],
            ['duration', 'Simulation duration (min)', 15, 240, 15],
            ['rain', 'Rainfall intensity (mm)', 0, 100, 1],
            ['diversionPercent', 'Diversion target (%)', 0, 40, 1]
          ].map(([k, l, min, max, step]) => (
            <label key={k} className="block text-xs font-bold text-slate-300">
              {l}
              <div className="flex gap-3 items-center mt-2">
                <input
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  value={params[k]}
                  onChange={e => setParams({ ...params, [k]: Number(e.target.value) })}
                  className="w-full accent-cyan-400"
                />
                <span className="w-12 text-right text-cyan-300 font-mono font-black">{params[k]}</span>
              </div>
            </label>
          ))}

          <label className="block text-xs font-bold text-slate-300">
            Special Event Flag
            <select
              value={params.event}
              onChange={e => setParams({ ...params, event: Number(e.target.value) })}
              className="mt-2 w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-bold text-white focus:outline-none focus:border-cyan-400"
            >
              <option value={0}>No Major Event</option>
              <option value={1}>Major City Event (Stadium / Rally)</option>
            </select>
          </label>

          <div className="flex gap-2 pt-2">
            <button
              onClick={run}
              disabled={loading}
              className="flex-1 py-3 px-4 rounded-full bg-gradient-to-r from-cyan-600 to-pink-600 hover:brightness-110 text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-105"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{loading ? 'Executing ML Model…' : 'Run Simulation'}</span>
            </button>

            <button
              onClick={reset}
              className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Reset parameters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Map Column */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div>
              <h3 className="text-white font-black text-base flex items-center gap-2">
                <MapPin className="w-4 h-4 text-yellow-300" />
                Nagpur Jurisdiction Optimization GIS Map
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5 font-mono">Yellow line = ML-selected optimum corridor • Polygons = Nagpur planning jurisdictions</p>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-cyan-300 bg-cyan-950/60 border border-cyan-800/60 px-3 py-1.5 rounded-full font-mono">
              <Database className="w-3.5 h-3.5 text-pink-400" />
              25,920 ML Rows
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden bg-slate-900/80 border border-cyan-400/20 shadow-xl p-1">
            <TrafficMap
              height="470px"
              customZoom={12}
              selectedRoute={recommendedRoute}
              selectedZone={selectedZone}
              onZoneSelect={setSelectedZone}
              showRouteLegend
            />
          </div>
        </div>
      </div>

      {/* Simulation Results Section */}
      {result && (
        <div className="space-y-5">
          {/* AI Redistribution Summary */}
          <div className="p-5 rounded-3xl bg-yellow-400/10 border border-yellow-400/30 text-slate-100 backdrop-blur-md">
            <div className="text-xs uppercase tracking-wider text-yellow-300 font-black font-mono">🟡 AI Traffic Redistribution Route</div>
            <div className="text-xl font-black text-white mt-1">{result.redistribution?.fromRoad} → {result.redistribution?.toRoad}</div>
            <div className="text-sm text-slate-200 mt-1">{result.redistribution?.message}</div>
          </div>

          {/* Optimum Route Highlight */}
          {result.optimalRoute && (
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-cyan-400/30 shadow-xl text-white space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-yellow-300 text-xs font-black uppercase tracking-widest font-mono">
                    <RouteIcon className="w-4 h-4 text-yellow-300" />
                    Optimum Corridor Selected From Dataset
                  </div>
                  <h2 className="text-2xl font-black text-white mt-1">{result.optimalRoute.road}</h2>
                  <p className="text-xs text-slate-400 mt-1">{result.optimalRoute.jurisdiction} • {result.optimalRoute.reason}</p>
                </div>

                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  <span className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"><b className="text-yellow-300">{result.optimalRoute.lengthKm} km</b> route</span>
                  <span className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"><b className="text-cyan-300">{result.optimalRoute.averageSpeed} km/h</b> avg speed</span>
                  <span className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"><b className="text-emerald-300">{result.optimalRoute.afterCongestion}%</b> after</span>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-3 mt-4 text-xs font-mono">
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <div className="text-[10px] uppercase text-slate-400">Traffic Load</div>
                  <div className="text-white font-black text-sm mt-1">{result.optimalRoute.vehiclesPerHour.toLocaleString()} veh/h</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <div className="text-[10px] uppercase text-slate-400">Capacity</div>
                  <div className="text-white font-black text-sm mt-1">{result.optimalRoute.capacity.toLocaleString()} veh/h</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <div className="text-[10px] uppercase text-slate-400">Occupancy</div>
                  <div className="text-pink-300 font-black text-sm mt-1">{result.optimalRoute.occupancy}%</div>
                </div>
              </div>
            </div>
          )}

          {/* 4 KPI Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Metric icon={Gauge} label="Before Avg. Congestion" value={`${result.beforeAverage}%`} />
            <Metric icon={ArrowDownRight} label="After Avg. Congestion" value={`${result.afterAverage}%`} />
            <Metric icon={Zap} label="Efficiency Improvement" value={`${result.improvement}%`} />
            <Metric icon={ShieldCheck} label="Model R² Score" value={result.modelR2} />
          </div>

          {/* Jurisdiction Table */}
          <div className="rounded-3xl bg-slate-900/80 border border-cyan-400/20 shadow-xl overflow-hidden text-white">
            <div className="p-5 border-b border-slate-800">
              <h3 className="text-white font-black text-base">Jurisdiction-wise Redistribution Plan</h3>
              <p className="text-xs text-slate-400 mt-0.5">Predicted congestion before vs after adaptive redistribution management across Nagpur authorities.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-950 text-[11px] uppercase tracking-wider text-slate-400 font-mono">
                  <tr>
                    {['Road Corridor', 'Jurisdiction Authority', 'Vehicles/h', 'Before %', 'After %', 'Action Strategy'].map(x => (
                      <th key={x} className="px-5 py-3.5">{x}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-xs">
                  {result.roads.map(r => (
                    <tr key={r.id} className="hover:bg-slate-800/50">
                      <td className="px-5 py-4 text-white font-bold whitespace-nowrap">{r.road}</td>
                      <td className="px-5 py-4 text-slate-400 font-mono">{r.jurisdiction}</td>
                      <td className="px-5 py-4 text-cyan-300 font-mono font-bold">{r.vehiclesPerHour.toLocaleString()}</td>
                      <td className="px-5 py-4 text-rose-400 font-mono font-bold">{r.before}%</td>
                      <td className="px-5 py-4 text-emerald-400 font-mono font-bold">{r.after}%</td>
                      <td className="px-5 py-4 text-slate-200">{r.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Metric = ({ icon: Icon, label, value }) => (
  <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl text-white">
    <Icon className="w-5 h-5 text-cyan-300" />
    <div className="text-xs text-slate-400 mt-3 font-medium">{label}</div>
    <div className="text-2xl sm:text-3xl font-black text-white mt-1 font-display">{value}</div>
  </div>
);

export default Simulation;
