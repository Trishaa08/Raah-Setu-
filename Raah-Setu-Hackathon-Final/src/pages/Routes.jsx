import React, { useState } from 'react';
import { 
  Navigation, 
  MapPin, 
  Clock, 
  Car, 
  Sparkles, 
  Bot, 
  CheckCircle2, 
  Search, 
  Truck, 
  Bus, 
  Bike 
} from 'lucide-react';
import { routePresets } from '../data/routeData';
import RouteCard from '../components/routes/RouteCard';
import TrafficMap from '../components/map/TrafficMap';
import { useTraffic } from '../context/TrafficContext';
import { trafficApi } from '../services/api';

const originLocations = [
  "Dr. Babasaheb Ambedkar International Airport",
  "MIHAN InfoTech Park SEZ",
  "Sitabuldi Central Commercial Hub",
  "Nagpur Central Railway Station",
  "VR Nagpur Mall / Medical Sq",
  "VNIT Campus / Bajaj Nagar"
];

const destinationLocations = [
  "Nagpur Central Railway Station",
  "Sitabuldi Central Commercial Hub",
  "Dr. Babasaheb Ambedkar International Airport",
  "MIHAN InfoTech Park SEZ",
  "Kamptee Road Automotive Sq",
  "Wadi Industrial Area"
];

const vehicleTypes = [
  { id: 'car', label: 'Car / Cab', icon: Car },
  { id: 'bike', label: 'Two Wheeler', icon: Bike },
  { id: 'bus', label: 'Public Transit Bus', icon: Bus },
  { id: 'truck', label: 'Commercial Truck', icon: Truck },
];

const RoutesPage = () => {
  const { showToast, selectedZone, setSelectedZone } = useTraffic();
  const [origin, setOrigin] = useState(originLocations[0]);
  const [destination, setDestination] = useState(destinationLocations[0]);
  const [departure, setDeparture] = useState('Now');
  const [selectedVehicle, setSelectedVehicle] = useState('car');
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
  const [datasetRoute, setDatasetRoute] = useState(null);
  const [loadingRoute, setLoadingRoute] = useState(false);

  const activePreset = routePresets[0];
  const activeRoutes = activePreset.routes;
  const currentSelectedRoute = activeRoutes[selectedRouteIndex] || activeRoutes[0];

  const handleFindRoute = async () => {
    setLoadingRoute(true);
    try {
      const hour = departure === 'Now' ? new Date().getHours() : departure === '+30 min' ? 19 : departure === '+60 min' ? 20 : 18;
      const data = await trafficApi.getOptimalRoute(origin, destination, hour);
      setDatasetRoute(data);
      showToast(`✓ Dataset route selected: ${data.road} (${data.predictedCongestion}% predicted congestion).`, 'success');
    } catch (e) {
      console.error(e);
      showToast('Could not reach Python routing API. Showing benchmark route alternatives.', 'warning');
    } finally { setLoadingRoute(false); }
  };

  const handleNavigate = (route) => {
    showToast(`🚀 Navigation started along ${route.name}! Real-time dynamic rerouting enabled.`, 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header with Highway Corridor Background Photo */}
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl overflow-hidden shadow-2xl border border-cyan-400/20 text-white group">
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80"
          alt="Highway Routing"
          className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/70 backdrop-blur-xs" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-pink-500/20 text-[#EA4C89] border border-pink-400/30">
              <Navigation className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-pink-300 font-mono">DYNAMIC ROUTING ENGINE</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white font-display drop-shadow-md">Smart Route Optimization</h1>
          <p className="text-xs sm:text-sm text-slate-200 font-medium mt-0.5 max-w-2xl drop-shadow">
            Find the fastest, lowest-congestion route dynamically synchronized with predictive signal waves across Nagpur corridors.
          </p>
        </div>

        <div className="flex items-center gap-2 relative z-10 font-mono">
          <span className="px-4 py-2 rounded-full bg-slate-900/80 border border-slate-700 text-xs font-bold text-yellow-300 backdrop-blur-md">
            Routing: <strong>Python ML + A* Optimizer</strong>
          </span>
        </div>
      </div>

      {/* User Input Search Bar */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-cyan-400/20 shadow-xl backdrop-blur-md space-y-5 text-white">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
          Trip Origin & Destination Parameters
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Origin */}
          <div className="space-y-1.5 font-mono">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Origin / Starting Point
            </label>
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400"
            >
              {originLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
          </div>

          {/* Destination */}
          <div className="space-y-1.5 font-mono">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-400" /> Destination
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400"
            >
              {destinationLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
          </div>

          {/* Departure Time */}
          <div className="space-y-1.5 font-mono">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" /> Departure
            </label>
            <select
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="Now">Depart Now (Live Traffic)</option>
              <option value="+15 min">In 15 minutes</option>
              <option value="+30 min">In 30 minutes (Peak Hour)</option>
              <option value="+60 min">In 1 hour</option>
            </select>
          </div>

          {/* Vehicle Type */}
          <div className="space-y-1.5 font-mono">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5 text-pink-400" /> Vehicle Class
            </label>
            <select
              value={selectedVehicle}
              onChange={(e) => setSelectedVehicle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400"
            >
              {vehicleTypes.map(v => <option key={v.id} value={v.id}>{v.label}</option>)}
            </select>
          </div>
        </div>

        {/* Find Route Button */}
        <div className="flex justify-end pt-1">
          <button
            onClick={handleFindRoute}
            className="flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-cyan-600 via-blue-600 to-pink-600 hover:brightness-110 text-white font-bold text-xs shadow-lg transition-all hover:scale-105"
          >
            <Search className="w-4 h-4 text-white" />
            <span>{loadingRoute ? 'Querying Traffic Engine…' : 'Find Best Optimal Route'}</span>
          </button>
        </div>
      </div>

      {/* Main Split Screen: Route Cards + Route Map Overlay */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 5 Cols: 3 Route Comparison Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base flex items-center gap-2 font-display">
              <Navigation className="w-4 h-4 text-pink-400" />
              Available Route Alternatives
            </h3>
            <span className="text-xs text-slate-400 font-mono font-semibold">3 paths computed</span>
          </div>

          <div className="space-y-3.5">
            {activeRoutes.map((route, idx) => (
              <RouteCard
                key={route.id}
                route={route}
                isSelected={selectedRouteIndex === idx}
                onSelect={() => setSelectedRouteIndex(idx)}
                onNavigate={handleNavigate}
              />
            ))}
          </div>
        </div>

        {/* Right 7 Cols: Route Map & AI Explanation */}
        <div className="lg:col-span-7 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-300 font-mono">
              <span className="font-bold flex items-center gap-2 text-white">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: currentSelectedRoute.color }}
                />
                Active Path: {currentSelectedRoute.name}
              </span>
              <span className="text-cyan-300 font-bold">{currentSelectedRoute.via}</span>
            </div>

            <div className="rounded-3xl overflow-hidden bg-slate-900/80 border border-cyan-400/20 shadow-xl p-1">
              <TrafficMap
                height="420px"
                selectedRoute={datasetRoute ? { path: datasetRoute.coordinates } : currentSelectedRoute}
                selectedZone={selectedZone}
                onZoneSelect={setSelectedZone}
              />
            </div>
          </div>

          {datasetRoute && (
            <div className="rounded-3xl bg-yellow-400/10 p-6 border border-yellow-400/30 shadow-xl space-y-4 text-white backdrop-blur-md font-mono">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <div className="text-[10px] uppercase tracking-widest font-black text-yellow-300 flex items-center gap-2"><Sparkles className="w-4 h-4"/> Dataset-Based Optimum Corridor</div>
                  <h4 className="font-black text-white text-lg mt-1">{datasetRoute.road}</h4>
                  <p className="text-xs text-slate-300 mt-1">{datasetRoute.jurisdiction} • {datasetRoute.reason}</p>
                </div>
                <span className="px-3.5 py-1.5 rounded-full bg-yellow-400 text-slate-950 text-xs font-black">🟡 OPTIMUM ROUTE</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800"><span className="text-slate-400 block">Congestion</span><b className="block text-white mt-0.5">{datasetRoute.predictedCongestion}%</b></div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800"><span className="text-slate-400 block">Avg Speed</span><b className="block text-cyan-300 mt-0.5">{datasetRoute.averageSpeed} km/h</b></div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800"><span className="text-slate-400 block">Traffic</span><b className="block text-white mt-0.5">{datasetRoute.vehiclesPerHour.toLocaleString()} veh/h</b></div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800"><span className="text-slate-400 block">Length</span><b className="block text-white mt-0.5">{datasetRoute.lengthKm} km</b></div>
              </div>
            </div>
          )}

          {/* Route AI Explanation Panel */}
          <div className="rounded-3xl bg-slate-900/80 p-6 border border-cyan-400/20 shadow-xl backdrop-blur-md text-white space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2 font-display">
                <Bot className="w-5 h-5 text-cyan-400" />
                Why AI Recommends Route 1?
              </h4>
              <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800">
                ⭐ Saves {currentSelectedRoute.timeSavedMinutes || 8} Minutes
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-300 pt-1 font-mono">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Lower traffic density (38% capacity)</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Fewer intersections (4 vs 9 stops)</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Bypasses NH-44 accident bottleneck</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Synchronized green wave timings</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutesPage;
