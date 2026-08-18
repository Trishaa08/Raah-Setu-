import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  ChevronDown, 
  X, 
  Sparkles, 
  TrendingUp, 
  Activity,
  Bell
} from 'lucide-react';
import { useTraffic } from '../../context/TrafficContext';

const DribbbleNavbar = ({ onSearch, activeFilter, onFilterChange }) => {
  const navigate = useNavigate();
  const { startDemoTour, alerts } = useTraffic();
  const [showBanner, setShowBanner] = useState(true);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [searchCategory, setSearchCategory] = useState('Shots');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchQuery);
  };

  return (
    <header className="w-full bg-[#060b14]/90 backdrop-blur-md border-b border-cyan-400/20 sticky top-0 z-50 shadow-2xl text-white font-sans">
      {/* Top Pink Announcement Banner */}
      {showBanner && (
        <div className="bg-slate-950 border-b border-cyan-400/20 py-2.5 px-4 text-xs font-semibold text-slate-200 flex items-center justify-between transition-all font-mono">
          <div className="max-w-7xl mx-auto flex items-center gap-2 flex-wrap justify-center flex-1">
            <span className="inline-flex items-center gap-1.5 text-pink-400 font-bold">
              <span>⚡ AI Traffic Pulse:</span>
            </span>
            <span className="text-slate-300">
              91.4% predictive accuracy across 91 city zones — Adaptive Signal Wave Active in Nagpur!
            </span>
            <button
              onClick={startDemoTour}
              className="ml-2 px-3.5 py-1 rounded-full bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-800 text-[11px] font-bold shadow-md transition-all hover:scale-105"
            >
              Launch Demo Tour
            </button>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            className="p-1 text-slate-400 hover:text-white rounded-full transition-colors ml-2 shrink-0"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Navbar Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo & Navigation Dropdowns */}
        <div className="flex items-center gap-6 lg:gap-8">
          {/* Logo in Dribbble styling */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0" aria-label="Raah-Setu home">
            <img src="/raah-setu-logo.svg" alt="Raah-Setu" className="h-11 w-auto max-w-[170px] object-contain" />
            <div className="hidden xl:block leading-none font-mono">
              <div className="text-[15px] font-black tracking-wide text-white font-display">RAAH-SETU</div>
              <div className="text-[9px] font-bold tracking-[0.18em] text-cyan-300 mt-1">NAGPUR TRAFFIC INTELLIGENCE</div>
            </div>
          </Link>

          {/* Navigation Links with Dropdown */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-semibold text-slate-300 font-mono">
            
            {/* Explore Dropdown */}
            <div className="relative group" onMouseLeave={() => setExploreOpen(false)}>
              <button
                onClick={() => setExploreOpen(!exploreOpen)}
                onMouseEnter={() => setExploreOpen(true)}
                className="flex items-center gap-1 hover:text-cyan-300 py-2 transition-colors"
              >
                <span>Explore</span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-cyan-300 transition-transform" />
              </button>

              {exploreOpen && (
                <div className="absolute top-full left-0 w-64 p-3 bg-slate-950 rounded-2xl border border-cyan-400/20 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="space-y-1 text-xs font-mono">
                    <button
                      onClick={() => { onFilterChange && onFilterChange('ALL'); setExploreOpen(false); }}
                      className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-slate-900 font-bold text-white text-left"
                    >
                      <TrendingUp className="w-4 h-4 text-pink-400" />
                      <span>Popular Corridors</span>
                    </button>
                    <button
                      onClick={() => { onFilterChange && onFilterChange('AI_PREDICTION'); setExploreOpen(false); }}
                      className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-slate-900 font-bold text-cyan-300 text-left"
                    >
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      <span>New and Noteworthy AI</span>
                    </button>
                    <div className="h-px bg-slate-800 my-1" />
                    <Link to="/live-traffic" className="block p-2 rounded-xl hover:bg-slate-900 text-slate-300">Live Radar Map</Link>
                    <Link to="/signals" className="block p-2 rounded-xl hover:bg-slate-900 text-slate-300">Signal Timing Systems</Link>
                    <Link to="/prediction" className="block p-2 rounded-xl hover:bg-slate-900 text-slate-300">Neural Congestion Forecast</Link>
                    <Link to="/routes" className="block p-2 rounded-xl hover:bg-slate-900 text-slate-300">Route Optimization</Link>
                    <Link to="/incidents" className="block p-2 rounded-xl hover:bg-slate-900 text-slate-300">Emergency Incident Dispatch</Link>
                    <Link to="/analytics" className="block p-2 rounded-xl hover:bg-slate-900 text-slate-300">Traffic Analytics & Reports</Link>
                  </div>
                </div>
              )}
            </div>

            {/* Live Command Link */}
            <Link to="/live-traffic" className="hover:text-cyan-300 transition-colors">
              Live Command
            </Link>

            {/* AI Prediction Link */}
            <Link to="/prediction" className="hover:text-cyan-300 transition-colors flex items-center gap-1">
              <span>AI Prediction</span>
              <span className="px-2 py-0.5 rounded-full bg-pink-950 text-pink-300 text-[10px] font-bold border border-pink-800">91%</span>
            </Link>

            {/* Signal Waves */}
            <Link to="/signals" className="hover:text-cyan-300 transition-colors">
              Signal Control
            </Link>

            {/* Analytics */}
            <Link to="/analytics" className="hover:text-cyan-300 transition-colors">Analytics</Link>
            <Link to="/simulation" className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-amber-400/30 bg-amber-950/60 text-amber-300 hover:bg-amber-900/60 transition-colors font-bold text-xs"><Activity className="w-3.5 h-3.5" /> Simulation</Link>
          </nav>
        </div>

        {/* Center: Search Pill Bar */}
        <div className="flex-1 max-w-md mx-2 hidden md:block font-mono">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center bg-slate-950 rounded-full border border-slate-800 focus-within:border-cyan-400/50 transition-all">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (onSearch) onSearch(e.target.value);
              }}
              placeholder="What corridor are you inspecting?"
              className="w-full bg-transparent pl-5 pr-28 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
            />

            {/* Shots selector */}
            <div className="absolute right-12 flex items-center text-xs font-bold text-cyan-300 border-l border-slate-800 pl-2">
              <span className="cursor-pointer">{searchCategory}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
            </div>

            {/* Circular Search Button */}
            <button
              type="submit"
              className="absolute right-1.5 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-600 to-pink-600 hover:brightness-110 text-white flex items-center justify-center shadow-lg transition-all hover:scale-105"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Right: Auth & Demo CTA Buttons */}
        <div className="flex items-center gap-3 font-mono">
          <button
            onClick={startDemoTour}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-800 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>Demo Tour</span>
          </button>

          <Link
            to="/alerts"
            className="relative p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-900 transition-colors"
            title="Alerts"
          >
            <Bell className="w-5 h-5" />
            {alerts.filter(a => !a.isRead).length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-pink-500 ring-2 ring-slate-950 animate-ping" />
            )}
          </Link>

          <Link
            to="/dashboard"
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-600 via-blue-600 to-pink-600 hover:brightness-110 text-white text-xs font-bold transition-all shadow-lg hover:scale-105"
          >
            Dashboard
          </Link>
        </div>

      </div>
    </header>
  );
};

export default DribbbleNavbar;
