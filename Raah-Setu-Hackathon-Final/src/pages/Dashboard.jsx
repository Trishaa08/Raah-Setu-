import React, { useState, useEffect } from 'react';
import { 
  Car, 
  TrafficCone, 
  AlertTriangle, 
  Gauge, 
  Clock, 
  Sparkles, 
  Radio, 
  RefreshCw, 
  ChevronRight,
  Compass,
  Grid
} from 'lucide-react';
import { useTraffic } from '../context/TrafficContext';
import KPICard from '../components/common/KPICard';
import TrafficMap from '../components/map/TrafficMap';
import TrafficDensityChart from '../components/dashboard/TrafficDensityChart';
import TrafficDistribution from '../components/dashboard/TrafficDistribution';
import AIInsightCard from '../components/common/AIInsightCard';
import DribbbleShotsGrid from '../components/dribbble/DribbbleShotsGrid';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { stats, signals, incidents, selectedZone, setSelectedZone, startDemoTour } = useTraffic();
  const [lastUpdated, setLastUpdated] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState('command'); // 'command' or 'shots'

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLastUpdated(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const activeIncidentsCount = incidents.filter(i => i.status !== 'RESOLVED').length;
  const optimizedSignalsCount = signals.filter(s => s.status === 'Optimized').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Welcome Header with City Photo Background */}
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl overflow-hidden shadow-2xl border border-cyan-400/20 text-white group">
        {/* Background Photo */}
        <img
          src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1600&q=80"
          alt="Smart City Central Command"
          className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-700"
        />
        {/* Dark Glass Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/70 backdrop-blur-xs" />

        <div className="relative z-10 space-y-1.5 font-sans">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-400/30 text-xs font-bold font-mono">
              CENTRAL COMMAND ACTIVE
            </span>
            <span className="text-xs text-slate-300 font-mono">
              Last updated: <span className="text-cyan-300 font-black">{lastUpdated || "18:42:15"}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight font-display drop-shadow-md">
            Good Evening, <span className="text-pink-400 italic">Traffic Control</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 font-medium max-w-2xl drop-shadow">
            Real-time urban telemetry, neural congestion forecasting, and autonomous signal wave management across Nagpur Arterial Network.
          </p>
        </div>

        {/* View Switcher & Quick Actions */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0 relative z-10 font-mono">
          <div className="flex items-center gap-1 p-1 rounded-full bg-slate-950/90 border border-slate-800 backdrop-blur-md">
            <button
              onClick={() => setViewMode('command')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                viewMode === 'command'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Command Hub
            </button>
            <button
              onClick={() => setViewMode('shots')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'shots'
                  ? 'bg-gradient-to-r from-pink-600 to-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Discovery Shots</span>
            </button>
          </div>

          <button
            onClick={handleManualRefresh}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 backdrop-blur-md transition-all"
            title="Refresh Telemetry"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Sync</span>
          </button>

          <button
            onClick={startDemoTour}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-600 to-pink-600 hover:brightness-110 text-white text-xs font-bold shadow-lg transition-all hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>Walkthrough</span>
          </button>
        </div>
      </div>

      {viewMode === 'command' ? (
        <>
          {/* 5 KPI Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <KPICard
              title="Vehicles Monitored"
              value={stats.totalMonitoredVehicles.toLocaleString()}
              trend={stats.vehicleTrend}
              trendDirection="up"
              trendIsGood={true}
              icon={Car}
              accentColor="pink"
              tooltip="Real-time count of vehicles detected across all city ANPR and radar sensors"
            />

            <KPICard
              title="Active Signals"
              value={stats.activeSignals}
              subvalue={`${optimizedSignalsCount} AI Optimized`}
              badgeText="97% Online"
              icon={TrafficCone}
              accentColor="amber"
              tooltip="Smart signal controllers active. 138 running AI synchronized cycles"
            />

            <KPICard
              title="Active Incidents"
              value={`0${activeIncidentsCount}`}
              trend={stats.incidentTrend}
              trendDirection="down"
              trendIsGood={true}
              icon={AlertTriangle}
              accentColor="rose"
              tooltip="Verified active accidents, roadblocks, or emergency transits"
            />

            <KPICard
              title="Average Speed"
              value={`${stats.averageCitySpeed} km/h`}
              trend={stats.speedTrend}
              trendDirection="up"
              trendIsGood={true}
              icon={Gauge}
              accentColor="cyan"
              tooltip="Citywide arterial vehicle velocity across all major corridors"
            />

            <KPICard
              title="Avg. Travel Time"
              value={`${stats.averageTravelTime} min`}
              trend={stats.travelTimeTrend}
              trendDirection="down"
              trendIsGood={true}
              icon={Clock}
              accentColor="emerald"
              tooltip="Average standard commuter transit time across key OD routes"
            />
          </div>

          {/* Main Map + AI Insights Split Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 8 Cols: Interactive GIS Live Map */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-base flex items-center gap-2 font-display">
                  <Radio className="w-4 h-4 text-pink-400 animate-pulse" />
                  Live City Traffic Command Map
                </h3>
                <Link
                  to="/live-traffic"
                  className="text-xs font-bold text-pink-400 hover:underline flex items-center gap-1 font-mono"
                >
                  Open Full CCTV Radar View <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="rounded-3xl overflow-hidden bg-slate-900/80 border border-cyan-400/20 shadow-xl p-1">
                <TrafficMap height="480px" selectedZone={selectedZone} onZoneSelect={setSelectedZone} />
              </div>
            </div>

            {/* Right 4 Cols: AI Traffic Insights + Distribution */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <AIInsightCard />
              <TrafficDistribution />
            </div>
          </div>

          {/* Lower Analytics Section: 24h Density Chart */}
          <div className="w-full">
            <TrafficDensityChart />
          </div>
        </>
      ) : (
        /* Discovery Shots Grid Mode */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-xl flex items-center gap-2 font-display">
              <Sparkles className="w-5 h-5 text-pink-400" />
              Nagpur Telemetry Discovery Shots
            </h3>
            <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800">
              12 Interactive Telemetry Modules
            </span>
          </div>

          <DribbbleShotsGrid activeCategory="ALL" searchQuery="" />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
