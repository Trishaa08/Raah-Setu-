import React, { useState } from 'react';
import { 
  BarChart3, 
  Download, 
} from 'lucide-react';
import TrafficDensityChart from '../components/dashboard/TrafficDensityChart';
import PeakHourBarChart from '../components/analytics/PeakHourBarChart';
import PerformanceMetrics from '../components/analytics/PerformanceMetrics';
import BeforeAfterComparison from '../components/analytics/BeforeAfterComparison';
import { useTraffic } from '../context/TrafficContext';
import { nagpurGisZones } from '../data/gisZonesData';

const Analytics = () => {
  const { showToast, selectedZone, setSelectedZone } = useTraffic();
  const [timePeriod, setTimePeriod] = useState('Today');
  const [metric, setMetric] = useState('Traffic Density');

  const zonesList = ['ALL', ...nagpurGisZones.map(z => z.id)];

  const handleExport = () => {
    showToast('✓ Traffic Analytics & Before/After Report downloaded as PDF.', 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header with High-Res Data Analytics Photo Background */}
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl overflow-hidden shadow-2xl border border-cyan-400/20 text-white group">
        <img
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80"
          alt="Analytics Matrix"
          className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/70 backdrop-blur-xs" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
              <BarChart3 className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-cyan-300 font-mono">HISTORICAL INTELLIGENCE & AUDIT MATRIX</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white font-display drop-shadow-md">Traffic Analytics & Performance Reports</h1>
          <p className="text-xs sm:text-sm text-slate-200 font-medium mt-0.5 max-w-2xl drop-shadow">
            Understand long-term congestion trends, audit AI efficiency benchmarks, and evaluate Before vs After impact across Nagpur.
          </p>
        </div>

        {/* Export Button */}
        <div className="flex items-center gap-2 relative z-10 font-mono">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-600 to-pink-600 hover:brightness-110 text-white text-xs font-bold shadow-lg transition-all hover:scale-105"
          >
            <Download className="w-4 h-4 text-white" />
            <span>Export Report (PDF / CSV)</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-3xl bg-slate-900/80 border border-cyan-400/20 shadow-xl backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-white">
        <div className="flex flex-wrap items-center gap-3 font-mono">
          {/* Time Period */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-slate-400">Period:</label>
            <select
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-full px-4 py-2 text-xs font-bold text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="Today">Today (Live 24h)</option>
              <option value="Last 7 Days">Last 7 Days (Weekly Peak)</option>
              <option value="Last 30 Days">Last 30 Days (Monthly Trend)</option>
              <option value="Quarterly">Q3 2026 Comprehensive</option>
            </select>
          </div>

          {/* Zone */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-slate-400">Zone:</label>
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-full px-4 py-2 text-xs font-bold text-cyan-300 focus:outline-none focus:border-cyan-400"
            >
              {zonesList.map(z => <option key={z} value={z}>{z === 'ALL' ? 'All City Zones' : z}</option>)}
            </select>
          </div>

          {/* Metric */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-slate-400">Metric:</label>
            <select
              value={metric}
              onChange={(e) => setMetric(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-full px-4 py-2 text-xs font-bold text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="Traffic Density">Traffic Density (%)</option>
              <option value="Average Speed">Average Velocity (km/h)</option>
              <option value="Delay Times">Intersection Queuing Delay (min)</option>
              <option value="CO2 Emissions">CO2 & Fuel Loss Reductions</option>
            </select>
          </div>
        </div>

        <span className="text-xs text-slate-400 font-mono font-medium">Dataset: 1.84M sensor data points</span>
      </div>

      {/* AI Performance Metrics */}
      <PerformanceMetrics />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrafficDensityChart title="Average Traffic Density Curve" />
        <PeakHourBarChart />
      </div>

      {/* Before vs After Impact Benchmark Matrix */}
      <BeforeAfterComparison />
    </div>
  );
};

export default Analytics;
