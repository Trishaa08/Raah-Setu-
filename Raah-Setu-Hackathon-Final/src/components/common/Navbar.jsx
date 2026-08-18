import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  Menu, 
  Sparkles, 
  Clock, 
  MapPin, 
  Shield, 
  Radio, 
  Layers,
  ChevronDown,
  Compass
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTraffic } from '../../context/TrafficContext';
import { useSettings } from '../../context/SettingsContext';

const Navbar = ({ onOpenSearch, onToggleMobileSidebar }) => {
  const { alerts, startDemoTour } = useTraffic();
  const { currentUser, mapLayers, toggleMapLayer } = useSettings();
  const [timeString, setTimeString] = useState('');
  const [showLayerMenu, setShowLayerMenu] = useState(false);

  const unreadAlerts = alerts.filter(a => !a.isRead);

  // Live real-time clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-20 px-4 sm:px-6 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Left: Mobile Toggle & Location Badge */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="p-2 -ml-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link
          to="/"
          className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-bold text-slate-800 transition-colors"
        >
          <Compass className="w-3.5 h-3.5 text-[#EA4C89]" />
          <span>Discovery Grid</span>
        </Link>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs">
          <MapPin className="w-3.5 h-3.5 text-blue-600" />
          <span className="font-bold text-slate-900">Nagpur Central</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="hidden sm:inline text-slate-500 font-mono">LIVE FEED</span>
        </div>
      </div>

      {/* Center: Global Search Bar trigger matching Dribbble pill */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <button
          onClick={() => onOpenSearch(true)}
          className="w-full flex items-center justify-between pl-4 pr-2 py-2 rounded-full bg-[#F3F3F4] hover:bg-white text-xs sm:text-sm text-slate-500 hover:text-slate-800 border border-transparent hover:border-slate-300 hover:shadow-md transition-all group"
        >
          <span className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-slate-400 group-hover:text-[#EA4C89] transition-colors" />
            <span>Search roads, signals, incidents, cameras...</span>
          </span>
          <span className="w-7 h-7 rounded-full bg-[#EA4C89] text-white flex items-center justify-center shadow-sm">
            <Search className="w-3.5 h-3.5" />
          </span>
        </button>
      </div>

      {/* Right: Actions & Tools */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Search Button */}
        <button
          onClick={() => onOpenSearch(true)}
          className="p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 md:hidden"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Live Clock */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-700">
          <Clock className="w-3.5 h-3.5 text-blue-600" />
          <span>{timeString || "18:42:15"}</span>
        </div>

        {/* Map Layers Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowLayerMenu(!showLayerMenu)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-bold text-slate-700 transition-colors"
            title="Map Layer Filters"
          >
            <Layers className="w-4 h-4 text-blue-600" />
            <span className="hidden sm:inline">Layers</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          </button>

          {showLayerMenu && (
            <div className="absolute right-0 mt-2 w-60 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2">
              <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2">Toggle Map Overlays</div>
              <div className="space-y-2">
                {[
                  { key: 'showTrafficDensity', label: 'Traffic Density Flow', color: 'bg-emerald-500' },
                  { key: 'showSignals', label: 'Smart Signals', color: 'bg-amber-500' },
                  { key: 'showIncidents', label: 'Incident Beacons', color: 'bg-rose-500' },
                  { key: 'showCameras', label: 'CCTV Sensors', color: 'bg-cyan-500' },
                ].map((layer) => (
                  <label
                    key={layer.key}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer text-xs font-semibold text-slate-700 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${layer.color}`} />
                      {layer.label}
                    </span>
                    <input
                      type="checkbox"
                      checked={mapLayers[layer.key]}
                      onChange={() => toggleMapLayer(layer.key)}
                      className="rounded border-slate-300 text-slate-900 focus:ring-0"
                    />
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Demo Tour Button */}
        <button
          onClick={startDemoTour}
          className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FDE8F0] hover:bg-[#FCD2E2] text-[#EA4C89] text-xs font-bold transition-all hover:scale-105"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Demo Tour</span>
        </button>

        {/* Notifications Bell */}
        <Link
          to="/alerts"
          className="relative p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          title="Notifications & Alerts"
        >
          <Bell className="w-5 h-5" />
          {unreadAlerts.length > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#EA4C89] text-[10px] font-bold text-white shadow-sm">
              {unreadAlerts.length}
            </span>
          )}
        </Link>

        {/* Profile Link */}
        <Link
          to="/settings"
          className="flex items-center gap-2 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-300"
          />
          <span className="text-xs font-bold text-slate-900 pr-2 hidden md:inline">{currentUser.name.split(' ')[0]}</span>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
