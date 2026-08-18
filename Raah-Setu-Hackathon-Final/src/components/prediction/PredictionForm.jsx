import React from 'react';
import { Sparkles, Calendar, Clock, CloudSun, CalendarRange, MapPin, Loader2 } from 'lucide-react';

const locations = [
  "Wardha Road (NH-44 Corridor)",
  "Sitabuldi Metro Interchange",
  "Airport Road VIP Junction",
  "Outer Ring Road Sector 5",
  "Central Avenue Commercial Hub",
  "Amravati Road Highway",
  "Kamptee Road Corridor",
  "Hingna Industrial Link"
];

const horizons = [
  { label: "15 minutes", value: 15 },
  { label: "30 minutes", value: 30 },
  { label: "45 minutes", value: 45 },
  { label: "60 minutes", value: 60 },
  { label: "2 hours", value: 120 }
];

const weatherOptions = ["Clear", "Light Rain", "Heavy Downpour", "Dense Fog", "Overcast"];
const eventOptions = ["None", "VIP Convoy Movement", "Cricket Stadium Match", "Trade Fair Exhibition", "Metro Construction"];

const PredictionForm = ({ formData, setFormData, onGenerate, isGenerating }) => {
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="rounded-3xl bg-slate-900/80 p-6 border border-cyan-400/20 shadow-xl backdrop-blur-md space-y-5 text-white">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-800">
        <div>
          <h3 className="font-bold text-white text-base flex items-center gap-2 font-display">
            <Sparkles className="w-4 h-4 text-pink-400" />
            Neural Predictive Simulation Parameters
          </h3>
          <p className="text-xs text-slate-400">Configure situational variables to forecast upcoming congestion bottleneck horizons</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Location Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 font-mono">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Monitored Location / Corridor
          </label>
          <select
            value={formData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-cyan-300 font-medium focus:border-cyan-400 focus:outline-none transition-all"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Prediction Horizon */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 font-mono">
            <Clock className="w-3.5 h-3.5 text-pink-400" /> Prediction Horizon
          </label>
          <select
            value={formData.horizon}
            onChange={(e) => handleChange('horizon', Number(e.target.value))}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-cyan-400 focus:outline-none transition-all"
          >
            {horizons.map((h) => (
              <option key={h.value} value={h.value}>{h.label}</option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 font-mono">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" /> Forecast Date
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => handleChange('date', e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-cyan-400 focus:outline-none transition-all"
          />
        </div>

        {/* Time */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 font-mono">
            <Clock className="w-3.5 h-3.5 text-amber-400" /> Target Timestamp
          </label>
          <input
            type="time"
            value={formData.time}
            onChange={(e) => handleChange('time', e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-cyan-400 focus:outline-none transition-all"
          />
        </div>

        {/* Weather */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 font-mono">
            <CloudSun className="w-3.5 h-3.5 text-emerald-400" /> Meteorological Condition
          </label>
          <select
            value={formData.weather}
            onChange={(e) => handleChange('weather', e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-cyan-400 focus:outline-none transition-all"
          >
            {weatherOptions.map((w) => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>
        </div>

        {/* Event */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 font-mono">
            <CalendarRange className="w-3.5 h-3.5 text-purple-400" /> Special City Events
          </label>
          <select
            value={formData.event}
            onChange={(e) => handleChange('event', e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-cyan-400 focus:outline-none transition-all"
          >
            {eventOptions.map((ev) => (
              <option key={ev} value={ev}>{ev}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-2 flex justify-end">
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className="flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-cyan-600 via-blue-600 to-pink-600 hover:brightness-110 disabled:opacity-50 text-white font-bold text-xs shadow-lg transition-all hover:scale-105"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Running Deep Neural Inference...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-white" />
              <span>Generate AI Prediction</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PredictionForm;
