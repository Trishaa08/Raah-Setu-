import React, { useState } from 'react';
import { 
  Heart, 
  Eye, 
  Sparkles, 
  ArrowRight,
  Bot
} from 'lucide-react';
import { useTraffic } from '../../context/TrafficContext';
import TrafficMap from '../map/TrafficMap';
import SignalVisualizer from '../signals/SignalVisualizer';
import ExplainableAI from '../prediction/ExplainableAI';
import RouteCard from '../routes/RouteCard';
import IncidentDetailView from '../incidents/IncidentDetailView';
import TrafficDensityChart from '../dashboard/TrafficDensityChart';
import PeakHourBarChart from '../analytics/PeakHourBarChart';
import BeforeAfterComparison from '../analytics/BeforeAfterComparison';
import DribbbleShotModal from './DribbbleShotModal';
import { routePresets } from '../../data/routeData';

const DribbbleShotsGrid = ({ activeCategory, searchQuery }) => {
  const { signals, incidents, selectedZone, setSelectedZone } = useTraffic();
  const [selectedShot, setSelectedShot] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [likedShots, setLikedShots] = useState({});

  const toggleLike = (shotId, e) => {
    e.stopPropagation();
    setLikedShots(prev => ({ ...prev, [shotId]: !prev[shotId] }));
  };

  const openShotModal = (shot) => {
    setSelectedShot(shot);
    setModalOpen(true);
  };

  // Build the list of 12 rich Dribbble Shots in Dark Command Center style
  const shots = [
    // Shot 1: Live GIS Map
    {
      id: 'shot-map',
      category: 'MAP',
      title: 'Nagpur Central — Live Arterial GIS Map & Flow Heatmap',
      author: 'Samuel Oktavianus',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      badge: 'PRO',
      likes: 212,
      views: '10.7k',
      actionRoute: '/live-traffic',
      stats: { 'Monitored Vehicles': '128,430', 'Average Speed': '34.6 km/h', 'Flow Efficiency': '94.2%', 'Active Corridors': '91' },
      description: 'Real-time multi-lane GIS telemetry over Nagpur with colored congestion polylines and incident beacons.',
      renderThumbnail: () => (
        <div className="relative h-60 w-full bg-slate-950 overflow-hidden">
          <TrafficMap height="240px" selectedZone={selectedZone} onZoneSelect={setSelectedZone} />
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/90 backdrop-blur-md text-[10px] font-bold text-cyan-300 border border-cyan-400/30 flex items-center gap-1.5 pointer-events-none font-mono">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>LIVE GIS RADAR</span>
          </div>
        </div>
      ),
      renderDetailedView: () => (
        <div className="p-4 bg-slate-950">
          <TrafficMap height="460px" selectedZone={selectedZone} onZoneSelect={setSelectedZone} />
        </div>
      )
    },

    // Shot 2: Adaptive 3D Traffic Light
    {
      id: 'shot-signal',
      category: 'SIGNALS',
      title: 'S001 Wardha Rd — Adaptive 3D Signal Phase Controller',
      author: 'strangehelix',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      badge: 'PRO',
      likes: 205,
      views: '10.5k',
      actionRoute: '/signals',
      stats: { 'Current Phase': 'GREEN (18s)', 'Cycle Length': '90 sec', 'Optimization': '↓ 16% wait', 'Status': 'AI Synchronized' },
      description: 'Intelligent traffic light visualizer with real-time countdown lamps and autonomous split adjustments.',
      renderThumbnail: () => (
        <div className="h-60 w-full bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-4 flex flex-col justify-between text-white relative font-mono">
          <div className="flex justify-between items-center">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold border border-amber-500/30">
              SIGNAL S001
            </span>
            <span className="text-xs text-cyan-400 font-bold">18s Remaining</span>
          </div>
          <div className="flex items-center justify-center gap-4 py-2">
            <div className="w-10 h-10 rounded-full bg-rose-950/40 border border-rose-900 opacity-40" />
            <div className="w-10 h-10 rounded-full bg-amber-950/40 border border-amber-900 opacity-40" />
            <div className="w-12 h-12 rounded-full bg-emerald-500 border-2 border-emerald-200 shadow-[0_0_25px_rgba(34,197,94,0.9)] flex items-center justify-center font-mono font-black text-sm text-white animate-pulse">
              18
            </div>
          </div>
          <div className="flex justify-between text-[11px] text-slate-300 border-t border-slate-800 pt-2">
            <span>Timing: NS 45s / EW 30s</span>
            <span className="text-emerald-400 font-bold">↓ 16% wait</span>
          </div>
        </div>
      ),
      renderDetailedView: () => (
        <div className="p-4 bg-slate-950">
          <SignalVisualizer signal={signals[0]} />
        </div>
      )
    },

    // Shot 3: AI Traffic Prediction
    {
      id: 'shot-prediction',
      category: 'AI_PREDICTION',
      title: 'Wardha Road — 30-Minute Neural Congestion Forecast',
      author: 'Nizam',
      authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      badge: 'PRO',
      likes: 93,
      views: '6.8k',
      actionRoute: '/prediction',
      stats: { 'Confidence Score': '87%', 'Current Density': '78%', 'Predicted Density': '91%', 'Recommended Action': '+18s Green' },
      description: 'Deep neural graph model predicting upcoming commuter surge with explainable multi-sensor feature checklist.',
      renderThumbnail: () => (
        <div className="h-60 w-full bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 p-5 flex flex-col justify-between text-white relative font-mono">
          <div className="flex justify-between items-center">
            <span className="px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-400 text-[10px] font-bold border border-pink-500/30">
              AI INFERENCE
            </span>
            <span className="text-xs text-emerald-400 font-bold">Conf: 87%</span>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-black text-white font-sans">Heavy Congestion Predicted</div>
            <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
              <div className="bg-gradient-to-r from-amber-500 to-rose-500 h-full w-[91%] rounded-full animate-pulse" />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Current: 78%</span>
              <span className="text-rose-400 font-bold">Peak Inflow: 91%</span>
            </div>
          </div>
          <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-[10px] text-cyan-300 truncate">
            🤖 Divert 12% to Ring Rd & extend green wave by 18s
          </div>
        </div>
      ),
      renderDetailedView: () => (
        <div className="p-4 bg-slate-950">
          <ExplainableAI
            prediction={{
              location: "Wardha Road (NH-44 Corridor)",
              predictedLevel: "HIGH",
              confidence: 87,
              currentDensity: 78,
              predictedDensity: 91,
              factors: [
                "High vehicle density inflow detected by optical radar (4,820 veh/h)",
                "Evening peak hour commuter surge pattern from SEZ/MIHAN",
                "Reduced average corridor speed (21 km/h vs 55 km/h limit)",
                "Historical Saturday evening correlation",
                "Nearby event: Metro maintenance contraction"
              ],
              recommendation: {
                actionText: "Increase green signal duration on Wardha Road by 18 seconds. Divert approx. 12% flow to Ring Road.",
                expectedDelayReduction: "18 – 24%",
                estimatedMinutesSaved: 9
              }
            }}
          />
        </div>
      )
    },

    // Shot 4: Smart Route Optimization
    {
      id: 'shot-routes',
      category: 'ROUTES',
      title: 'Airport → Central Station — Dynamic AI Rerouting',
      author: 'Alamin Hossen',
      authorAvatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=120&q=80',
      badge: 'PRO',
      likes: 124,
      views: '7.4k',
      actionRoute: '/routes',
      stats: { 'Distance': '11.4 km', 'Travel Time': '24 min', 'Time Saved': '8 min', 'Fuel Reduced': '0.45 L' },
      description: 'Side-by-side comparison of 3 routing alternatives avoiding active bottlenecks on NH-44.',
      renderThumbnail: () => (
        <div className="h-60 w-full bg-gradient-to-br from-slate-900 to-slate-950 p-5 flex flex-col justify-between text-white relative font-mono">
          <div className="flex justify-between items-center">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
              ⭐ AI RECOMMENDED
            </span>
            <span className="text-xs text-emerald-300 font-bold">Save 8 min</span>
          </div>
          <div className="space-y-1.5 py-1">
            <div className="text-sm font-bold text-white font-sans">Route 1: via Ring Road Bypass</div>
            <div className="text-xs text-slate-400">11.4 km • 24 min • Medium traffic</div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
              <Sparkles className="w-3 h-3" /> Avoids accident bottleneck near Airport
            </div>
          </div>
          <div className="flex justify-between text-[11px] text-slate-400 border-t border-slate-800 pt-2 font-mono">
            <span>CO2: -1.08 kg</span>
            <span>Signals: 4 stops (vs 9)</span>
          </div>
        </div>
      ),
      renderDetailedView: () => (
        <div className="p-4 bg-slate-950">
          <RouteCard
            route={routePresets[0].routes[0]}
            isSelected={true}
            onSelect={() => {}}
            onNavigate={() => alert('Navigation started along Route 1!')}
          />
        </div>
      )
    },

    // Shot 5: Emergency Incident Dispatch Hub
    {
      id: 'shot-incident',
      category: 'INCIDENTS',
      title: 'Wardha Road — Critical Collision Incident Command',
      author: 'Unicorn',
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      badge: 'PRO',
      likes: 106,
      views: '5.6k',
      actionRoute: '/incidents',
      stats: { 'Severity': 'CRITICAL', 'Vehicles Affected': '~320', 'Units Dispatched': 'Ambulance-09, PCR-04', 'Response Time': '6.4 min' },
      description: 'Emergency corridor priority routing and automatic traffic diversion for high-priority road hazards.',
      renderThumbnail: () => (
        <div className="h-60 w-full bg-gradient-to-br from-rose-950/80 via-slate-900 to-black p-5 flex flex-col justify-between text-white relative font-mono">
          <div className="flex justify-between items-center">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              CRITICAL ACCIDENT
            </span>
            <span className="text-xs text-slate-400">18:32</span>
          </div>
          <div className="space-y-1">
            <div className="text-sm font-black text-rose-300 font-sans">Multi-Vehicle Collision</div>
            <div className="text-xs text-slate-300">Near Airport Junction (NH-44)</div>
            <div className="text-[11px] text-rose-400 font-semibold">Impact: ~320 vehicles queued</div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-300 border-t border-slate-800 pt-2">
            <span>Ambulance-09 en route</span>
            <span className="text-rose-400 font-bold">Diversion Active</span>
          </div>
        </div>
      ),
      renderDetailedView: () => (
        <div className="p-4 bg-slate-950">
          <IncidentDetailView incident={incidents[0]} />
        </div>
      )
    },

    // Shot 6: Live CCTV Camera Feed (CAM 01)
    {
      id: 'shot-cam1',
      category: 'CAMERAS',
      title: 'CAM 01 — Wardha Road Live AI Optical Flow Sensor',
      author: 'Hasib Hemal',
      authorAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80',
      badge: 'LIVE',
      likes: 154,
      views: '6.4k',
      actionRoute: '/live-traffic',
      stats: { 'Stream': '1080p 60fps', 'Flow Rate': '4,820 veh/h', 'Avg Speed': '19 km/h', 'Sensor Type': 'PTZ Optical AI' },
      description: 'Computer vision ANPR and optical vehicle radar tracking 84 vehicles/minute with lane classification.',
      renderThumbnail: () => (
        <div className="relative h-60 w-full bg-slate-950 overflow-hidden font-mono">
          <img
            src="https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=600&q=80"
            alt="CAM 01"
            className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded bg-rose-600 text-white text-[10px] font-bold shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            <span>LIVE 60FPS</span>
          </div>
          <div className="absolute bottom-2 left-3 right-3 flex justify-between text-[10px] bg-slate-950/90 backdrop-blur-md px-2.5 py-1 rounded text-white border border-slate-800">
            <span>4,820 veh/h</span>
            <span className="text-cyan-400">19 km/h</span>
          </div>
        </div>
      )
    },

    // Shot 7: 24h Traffic Density Curve
    {
      id: 'shot-density',
      category: 'ANALYTICS',
      title: 'Citywide Traffic Density — 24-Hour Trend Curve',
      author: 'Rafiz Brandor',
      authorAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
      badge: 'PRO',
      likes: 107,
      views: '6.5k',
      actionRoute: '/analytics',
      stats: { 'Peak Density': '92%', 'Baseline Gap': '-8.4%', 'Flow Velocity': '34.6 km/h', 'Accuracy': '91.4%' },
      description: 'High-frequency density curves comparing live vehicle flow against neural forecasts and historical baselines.',
      renderThumbnail: () => (
        <div className="h-60 w-full bg-slate-900 p-2 overflow-hidden flex items-center justify-center">
          <TrafficDensityChart title="24h Density Flow" height={210} />
        </div>
      ),
      renderDetailedView: () => (
        <div className="p-4 bg-slate-950">
          <TrafficDensityChart height={340} />
        </div>
      )
    },

    // Shot 8: Peak Hour Congestion Bar Chart
    {
      id: 'shot-peakhours',
      category: 'ANALYTICS',
      title: 'Peak Congestion Distribution by Hour (8 AM - 10 PM)',
      author: 'Fahema Yesmin',
      authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
      badge: 'PRO',
      likes: 162,
      views: '5.9k',
      actionRoute: '/analytics',
      stats: { 'Worst Hour': '6 PM (9,800 veh)', 'Morning Peak': '10 AM (8,800 veh)', 'AI Load Shift': '+14.3%', 'Delay Reduction': '18.7%' },
      description: 'Hourly volume breakdown across morning and evening peak windows.',
      renderThumbnail: () => (
        <div className="h-60 w-full bg-slate-900 p-2 overflow-hidden flex items-center justify-center">
          <PeakHourBarChart height={210} />
        </div>
      ),
      renderDetailedView: () => (
        <div className="p-4 bg-slate-950">
          <PeakHourBarChart height={340} />
        </div>
      )
    },

    // Shot 9: Before vs After AI Benchmark Matrix
    {
      id: 'shot-benchmark',
      category: 'ANALYTICS',
      title: 'Before vs. After AI — Impact Benchmark Matrix',
      author: 'Suhayel Ahmed',
      authorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80',
      badge: 'PRO',
      likes: 170,
      views: '8.2k',
      actionRoute: '/analytics',
      stats: { 'Delay Reduction': '↓ 24.0%', 'Speed Increase': '↑ 27.6%', 'Response Time': '↓ 46.7%', 'Idling Loss': '↓ 29.8%' },
      description: 'Side-by-side operational comparison matrix proving real-world travel time and fuel reductions.',
      renderThumbnail: () => (
        <div className="h-60 w-full bg-slate-900 p-4 flex flex-col justify-between text-white text-xs font-mono">
          <div className="flex justify-between items-center pb-1 border-b border-slate-800">
            <span className="font-bold text-emerald-400">Before AI vs With AI</span>
            <span className="text-[10px] text-cyan-300">DEMO VERIFIED</span>
          </div>
          <div className="space-y-1.5 py-1 text-[11px]">
            <div className="flex justify-between">
              <span className="text-slate-400">Avg Delay:</span>
              <span>24.2 min → <strong className="text-emerald-400">18.4 min</strong></span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Arterial Speed:</span>
              <span>27.1 km/h → <strong className="text-emerald-400">34.6 km/h</strong></span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Response Time:</span>
              <span>12.0 min → <strong className="text-emerald-400">6.4 min</strong></span>
            </div>
          </div>
          <div className="text-[10px] text-slate-400 border-t border-slate-800 pt-1 flex justify-between">
            <span>CO2 Saved: 142.8 T</span>
            <span className="text-emerald-400 font-bold">↓ 18.7% Total Delay</span>
          </div>
        </div>
      ),
      renderDetailedView: () => (
        <div className="p-4 bg-slate-950">
          <BeforeAfterComparison />
        </div>
      )
    },

    // Shot 10: CAM 02 Sitabuldi Metro Interchange
    {
      id: 'shot-cam2',
      category: 'CAMERAS',
      title: 'CAM 02 — Sitabuldi Metro Interchange Optical Hub',
      author: 'Nixtio',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      badge: 'PRO+',
      likes: 188,
      views: '8.8k',
      actionRoute: '/live-traffic',
      stats: { 'Hourly Rate': '2,420 veh/h', 'Average Speed': '42 km/h', 'Congestion': 'Low (35%)', 'Lanes': '4 Lanes' },
      description: 'Central CBD metro interchange camera feed operating at smooth free-flow speeds.',
      renderThumbnail: () => (
        <div className="relative h-60 w-full bg-slate-950 overflow-hidden font-mono">
          <img
            src="https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=600&q=80"
            alt="CAM 02"
            className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-600 text-white text-[10px] font-bold shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            <span>LIVE 60FPS</span>
          </div>
          <div className="absolute bottom-2 left-3 right-3 flex justify-between text-[10px] bg-slate-950/90 backdrop-blur-md px-2.5 py-1 rounded text-white border border-slate-800">
            <span>2,420 veh/h</span>
            <span className="text-emerald-400">42 km/h</span>
          </div>
        </div>
      )
    },

    // Shot 11: S002 Sitabuldi Signal
    {
      id: 'shot-signal2',
      category: 'SIGNALS',
      title: 'S002 Sitabuldi Metro — Balanced Split Cycle Controller',
      author: 'Samuel Oktavianus',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      badge: 'PRO',
      likes: 98,
      views: '4.9k',
      actionRoute: '/signals',
      stats: { 'Current Phase': 'RED (31s)', 'Split': 'NS 35s / EW 35s', 'Pedestrian Window': '15s', 'Status': 'Normal Split' },
      description: 'Pedestrian priority coordination with Sitabuldi metro railway passenger exits.',
      renderThumbnail: () => (
        <div className="h-60 w-full bg-gradient-to-br from-slate-950 to-slate-900 p-5 flex flex-col justify-between text-white font-mono">
          <div className="flex justify-between items-center">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400 text-[10px] font-bold border border-rose-500/30">
              SIGNAL S002
            </span>
            <span className="text-xs text-rose-400 font-bold">RED Phase (31s)</span>
          </div>
          <div className="space-y-1 text-center py-2">
            <div className="text-sm font-bold text-white font-sans">Sitabuldi Interchange</div>
            <div className="text-xs text-slate-400">Pedestrian wave active</div>
          </div>
          <div className="flex justify-between text-[11px] text-slate-400 border-t border-slate-800 pt-2 font-mono">
            <span>Cycle: 85s</span>
            <span className="text-emerald-400">Holding 98% Flow</span>
          </div>
        </div>
      )
    },

    // Shot 12: Metro Girder Maintenance Roadblock
    {
      id: 'shot-roadblock',
      category: 'INCIDENTS',
      title: 'Kamptee Road — Metro Girder Maintenance Lane Restriction',
      author: 'Unicorn',
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      badge: 'PRO',
      likes: 88,
      views: '4.2k',
      actionRoute: '/incidents',
      stats: { 'Severity': 'MEDIUM', 'Vehicles Affected': '~180', 'Duration': '35 min', 'Status': 'ACTIVE' },
      description: 'Automated contra-flow timing active on S006 to alleviate metro construction constriction.',
      renderThumbnail: () => (
        <div className="h-60 w-full bg-gradient-to-br from-amber-950/80 via-slate-900 to-black p-5 flex flex-col justify-between text-white font-mono">
          <div className="flex justify-between items-center">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold">
              ROAD BLOCK
            </span>
            <span className="text-xs text-slate-400">17:45</span>
          </div>
          <div className="space-y-1">
            <div className="text-sm font-bold text-amber-300 font-sans">Metro Girder Maintenance</div>
            <div className="text-xs text-slate-300">Kamptee Road — Kadbi Chowk</div>
            <div className="text-[11px] text-slate-400">Contra-flow signal timing applied</div>
          </div>
          <div className="flex justify-between text-[11px] text-slate-400 border-t border-slate-800 pt-2">
            <span>Duration: ~35 min</span>
            <span className="text-amber-400 font-bold">+6 min delay</span>
          </div>
        </div>
      )
    }
  ];

  // Filter shots
  const filteredShots = shots.filter((shot) => {
    const matchesCat = activeCategory === 'ALL' || shot.category === activeCategory;
    const matchesSearch = !searchQuery || shot.title.toLowerCase().includes(searchQuery.toLowerCase()) || shot.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full">
      {/* Shots Grid matching Dark Command Center Dribbble layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
        {filteredShots.map((shot) => {
          const isLiked = likedShots[shot.id];

          return (
            <div
              key={shot.id}
              onClick={() => openShotModal(shot)}
              className="group cursor-pointer flex flex-col justify-between rounded-3xl overflow-hidden bg-slate-900/90 border border-cyan-400/20 shadow-xl hover:border-cyan-400/60 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300"
            >
              {/* Visual Thumbnail Frame */}
              <div className="relative w-full rounded-t-3xl overflow-hidden bg-slate-950">
                {shot.renderThumbnail()}

                {/* Hover Action Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                  <span className="text-xs font-bold text-white bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-cyan-400/40 shadow-lg flex items-center gap-1.5 font-mono">
                    <span>Inspect & Control</span>
                    <ArrowRight className="w-3.5 h-3.5 text-pink-400" />
                  </span>

                  <button
                    onClick={(e) => toggleLike(shot.id, e)}
                    className="p-2 rounded-full bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700 shadow-md transition-transform hover:scale-110"
                    title="Like shot"
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'text-pink-500 fill-pink-500' : 'text-slate-400'}`} />
                  </button>
                </div>
              </div>

              {/* Author & Telemetry Footer Bar */}
              <div className="p-4 flex items-center justify-between gap-2 bg-slate-900/90 border-t border-slate-800 text-white font-mono">
                
                {/* Author Info */}
                <div className="flex items-center gap-2 min-w-0">
                  <img
                    src={shot.authorAvatar}
                    alt={shot.author}
                    className="w-6 h-6 rounded-full object-cover ring-1 ring-cyan-400/40 shrink-0"
                  />
                  <span className="text-xs font-bold text-white truncate font-sans">{shot.author}</span>
                  <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-slate-950 text-cyan-300 border border-slate-800">
                    {shot.badge || 'PRO'}
                  </span>
                </div>

                {/* Likes & Views Metrics */}
                <div className="flex items-center gap-2.5 text-[11px] font-semibold text-slate-400 shrink-0">
                  <span className="flex items-center gap-1 hover:text-pink-400 transition-colors">
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'text-pink-400 fill-pink-400' : ''}`} />
                    <span>{isLiked ? shot.likes + 1 : shot.likes}</span>
                  </span>

                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-slate-400" />
                    <span>{shot.views}</span>
                  </span>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal Overlay */}
      <DribbbleShotModal
        shot={selectedShot}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default DribbbleShotsGrid;
