import React, { useState } from 'react';
import DribbbleNavbar from '../components/dribbble/DribbbleNavbar';
import DribbbleHero from '../components/dribbble/DribbbleHero';
import SmartCitySolutionsGrid from '../components/dribbble/SmartCitySolutionsGrid';
import DribbbleFilterBar from '../components/dribbble/DribbbleFilterBar';
import DribbbleShotsGrid from '../components/dribbble/DribbbleShotsGrid';
import DemoTourModal from '../components/common/DemoTourModal';
import ToastContainer from '../components/common/Toast';
import { Sparkles, Radio, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { useTraffic } from '../context/TrafficContext';
import { Link } from 'react-router-dom';
import TrafficMap from '../components/map/TrafficMap';

const DribbbleHome = () => {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [activeSort, setActiveSort] = useState('Popular');
  const [searchQuery, setSearchQuery] = useState('');
  const { startDemoTour } = useTraffic();

  return (
    <div className="min-h-screen bg-[#060b14] text-slate-100 flex flex-col font-sans">
      {/* Top Dribbble Navbar with Announcement Banner */}
      <DribbbleNavbar
        onSearch={setSearchQuery}
        activeFilter={activeCategory}
        onFilterChange={setActiveCategory}
      />

      {/* Hero Showcase Section (matching Screenshot 1) */}
      <DribbbleHero />

      {/* Main Solutions & Highlights Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-12">
        {/* Smart City Portal Solutions, Best Practices Cards & City Network (Matching Screenshots 1, 2, and 3) */}
        <SmartCitySolutionsGrid />

        {/* Filter Category Pills Bar */}
        <DribbbleFilterBar
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          activeSort={activeSort}
          onSortChange={setActiveSort}
          onToggleFilterModal={() => {}}
        />
        
        {/* Results Counter / Title */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-white font-display">
              {activeCategory === 'ALL' ? 'Discover Traffic Shots & Corridors' : `${activeCategory} Telemetry Shots`}
            </h2>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-cyan-400/10 border border-cyan-300/20 text-cyan-200">
              12 Corridors • ML Dataset
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Nagpur Live Feed</span>
          </div>
        </div>

        {/* Live Nagpur GIS map */}
        <section className="glass-panel rounded-3xl p-4 sm:p-5 border border-cyan-400/15 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2 text-cyan-300 text-xs font-black uppercase tracking-widest">
                <Radio className="w-4 h-4 animate-pulse" /> LIVE NAGPUR TRAFFIC NETWORK
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">Nagpur Road Network & Active Traffic Routes</h2>
              <p className="text-xs text-slate-400 mt-1">Actual OpenStreetMap road network with Raah-Setu traffic overlays. Click a corridor for live telemetry.</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Link to="/simulation" className="btn-vibrant text-xs"><Sparkles className="w-4 h-4" /> Traffic Simulation</Link>
              <Link to="/routes" className="px-4 py-2.5 rounded-full border border-cyan-300/20 bg-cyan-300/10 text-cyan-100 text-xs font-black hover:bg-cyan-300/20">Route Optimizer</Link>
            </div>
          </div>
          <TrafficMap height="520px" customCenter={[21.1458,79.0882]} customZoom={12} showRouteLegend />
        </section>

        {/* The Dribbble Shots Card Grid */}
        <DribbbleShotsGrid
          activeCategory={activeCategory}
          searchQuery={searchQuery}
        />

        {/* Bottom Load More CTA */}
        <div className="text-center py-12 space-y-4">
          <button
            onClick={startDemoTour}
            className="px-8 py-3.5 rounded-full bg-[#0D0C22] hover:bg-[#2B2945] text-white font-bold text-sm shadow-md transition-all hover:scale-105"
          >
            ✦ Explore Full Interactive Demo Tour
          </button>
          <p className="text-xs text-slate-400">
            Nagpur Smart City Command & Control Centre • Powered by Graph-STGCN & A* Optimization
          </p>
        </div>
      </main>

      {/* Dribbble Footer */}
      <footer className="w-full bg-[#07101d] border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-lg font-black italic text-white font-display">Raah-Setu</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#EA4C89]" />
            <span>© 2026 Raah-Setu AI. Intelligent Traffic. Smarter Cities.</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-semibold text-slate-300">
            <Link to="/dashboard" className="hover:text-slate-900">Dashboard</Link>
            <Link to="/live-traffic" className="hover:text-slate-900">Live Traffic</Link>
            <Link to="/prediction" className="hover:text-slate-900">AI Prediction</Link>
            <Link to="/signals" className="hover:text-slate-900">Signals</Link>
            <Link to="/routes" className="hover:text-slate-900">Routes</Link>
            <Link to="/incidents" className="hover:text-slate-900">Incidents</Link>
            <Link to="/analytics" className="hover:text-slate-900">Analytics</Link>
          </div>
        </div>
      </footer>

      {/* Overlays */}
      <DemoTourModal />
      <ToastContainer />
    </div>
  );
};

export default DribbbleHome;
