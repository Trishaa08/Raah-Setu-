import React, { useState } from 'react';
import { 
  ChevronDown, 
  SlidersHorizontal, 
  Sparkles, 
  MapPin, 
  TrafficCone, 
  BrainCircuit, 
  Route as RouteIcon, 
  AlertTriangle, 
  Video, 
  BarChart3, 
  Bell 
} from 'lucide-react';

const categories = [
  { id: 'ALL', label: 'Discover All', icon: Sparkles },
  { id: 'MAP', label: 'Live GIS Map', icon: MapPin },
  { id: 'AI_PREDICTION', label: 'AI Predictions', icon: BrainCircuit, badge: '91%' },
  { id: 'SIGNALS', label: 'Signal Controls', icon: TrafficCone },
  { id: 'ROUTES', label: 'Route Optimization', icon: RouteIcon },
  { id: 'INCIDENTS', label: 'Emergency Incidents', icon: AlertTriangle },
  { id: 'CAMERAS', label: 'Live CCTV Feeds', icon: Video },
  { id: 'ANALYTICS', label: 'Analytics & Reports', icon: BarChart3 },
  { id: 'ALERTS', label: 'Alerts', icon: Bell },
];

const sortOptions = ['Popular', 'Most Congested', 'New and Noteworthy', 'Critical First', 'Fastest Free Flow'];

const DribbbleFilterBar = ({ activeCategory, onCategoryChange, activeSort, onSortChange, onToggleFilterModal }) => {
  const [sortOpen, setSortOpen] = useState(false);

  return (
    <div className="w-full bg-[#060b14]/90 backdrop-blur-md border-y border-cyan-400/20 sticky top-20 z-40 py-4 shadow-xl text-white font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* Left: Popular Dropdown */}
        <div className="relative shrink-0">
          <button
            onClick={() => setSortOpen(!sortOpen)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-slate-800 bg-slate-900/90 text-xs font-bold text-slate-200 hover:border-cyan-400/40 transition-all shadow-md"
          >
            <span>{activeSort || 'Popular'}</span>
            <ChevronDown className="w-4 h-4 text-cyan-400" />
          </button>

          {sortOpen && (
            <div className="absolute top-full left-0 mt-2 w-52 p-2 bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 text-xs">
              {sortOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { onSortChange && onSortChange(opt); setSortOpen(false); }}
                  className={`w-full text-left px-3 py-2 rounded-xl font-semibold transition-colors ${
                    activeSort === opt ? 'bg-cyan-950 text-cyan-300 font-bold border border-cyan-800' : 'hover:bg-slate-900 text-slate-300'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Center: Scrollable Horizontal Pill Tabs */}
        <div className="flex-1 overflow-x-auto no-scrollbar flex items-center gap-2 py-1 px-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-600 via-blue-600 to-pink-600 text-white shadow-lg'
                    : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-cyan-400'}`} />
                <span className="font-sans">{cat.label}</span>
                {cat.badge && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-white text-slate-950' : 'bg-pink-950 text-pink-300 border border-pink-800'
                  }`}>
                    {cat.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right: Filters Button */}
        <div className="shrink-0">
          <button
            onClick={onToggleFilterModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-slate-800 bg-slate-900/90 text-xs font-bold text-slate-200 hover:border-cyan-400/40 transition-all shadow-md"
          >
            <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default DribbbleFilterBar;
