import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Sliders, 
  Layers, 
  RotateCcw, 
  Save, 
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { useTraffic } from '../context/TrafficContext';

const Settings = () => {
  const { currentUser, setCurrentUser, systemSettings, updateSystemSetting, mapLayers, toggleMapLayer } = useSettings();
  const { showToast } = useTraffic();

  const [formData, setFormData] = useState({
    name: currentUser.name,
    role: currentUser.role,
    email: currentUser.email,
    badgeNumber: currentUser.badgeNumber,
    department: currentUser.department,
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setCurrentUser(prev => ({ ...prev, ...formData }));
    showToast('✓ Operator profile preferences updated successfully.', 'success');
  };

  const handleResetDemoData = () => {
    showToast('✓ Simulated traffic network reset to baseline state.', 'info');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-5xl text-white">
      {/* Header with Background Photo */}
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl overflow-hidden shadow-2xl border border-cyan-400/20 text-white group">
        <img
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80"
          alt="System Settings"
          className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/70 backdrop-blur-xs" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1 font-mono">
            <span className="p-1 rounded-md bg-slate-900 text-cyan-300 border border-slate-700">
              <SettingsIcon className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-cyan-300">SYSTEM CONFIGURATION MATRIX</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white font-display drop-shadow-md">Admin & System Management</h1>
          <p className="text-xs sm:text-sm text-slate-200 font-medium mt-0.5 max-w-2xl drop-shadow">
            Command operator profile, automated AI control toggles, and GIS map layers across Nagpur Command Center.
          </p>
        </div>

        <button
          onClick={handleResetDemoData}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 backdrop-blur-md transition-colors relative z-10 font-mono"
        >
          <RotateCcw className="w-3.5 h-3.5 text-pink-400" />
          <span>Reset Demo Telemetry</span>
        </button>
      </div>

      {/* Profile Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-cyan-400/20 shadow-xl backdrop-blur-md space-y-6">
        <div className="flex items-center gap-3.5 pb-4 border-b border-slate-800">
          <div className="p-2.5 rounded-2xl bg-cyan-950 text-cyan-400 border border-cyan-800">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base sm:text-lg font-display">Operator Profile & Authority</h3>
            <p className="text-xs text-slate-400">Authenticated credentials for municipal traffic control override</p>
          </div>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Command Role / Designation</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Official Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Badge ID & Clearance</label>
              <input
                type="text"
                value={formData.badgeNumber}
                onChange={(e) => setFormData({ ...formData, badgeNumber: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-cyan-300 focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2 font-mono">
            <button
              type="submit"
              className="flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-cyan-600 via-blue-600 to-pink-600 hover:brightness-110 text-white text-xs font-bold shadow-lg transition-all hover:scale-105"
            >
              <Save className="w-4 h-4 text-white" />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </form>
      </div>

      {/* System Settings & Automation */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-cyan-400/20 shadow-xl backdrop-blur-md space-y-4">
        <div className="flex items-center gap-3.5 pb-4 border-b border-slate-800">
          <div className="p-2.5 rounded-2xl bg-indigo-950 text-indigo-400 border border-indigo-800">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base sm:text-lg font-display">Autonomous System Settings</h3>
            <p className="text-xs text-slate-400">Configure AI inference thresholds and automated intervention policies</p>
          </div>
        </div>

        <div className="divide-y divide-slate-800">
          {/* Auto Refresh */}
          <div className="py-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-white font-sans">Auto Refresh Telemetry</div>
              <div className="text-xs text-slate-400">Automatically synchronize real-time vehicle flow every 5 seconds</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={systemSettings.autoRefresh}
                onChange={(e) => updateSystemSetting('autoRefresh', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-950 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600 border border-slate-800" />
            </label>
          </div>

          {/* AI Recommendations */}
          <div className="py-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-white font-sans">AI Autonomous Signal Optimization</div>
              <div className="text-xs text-slate-400">Allow machine learning models to suggest & auto-apply green wave splits</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={systemSettings.aiRecommendationsEnabled}
                onChange={(e) => updateSystemSetting('aiRecommendationsEnabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-950 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600 border border-slate-800" />
            </label>
          </div>

          {/* Emergency Alerts */}
          <div className="py-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-white font-sans">Emergency Vehicle Corridor Preemption</div>
              <div className="text-xs text-slate-400">Auto-lock green wave routes when emergency ambulance or fire transit is active</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={systemSettings.emergencyAlertsEnabled}
                onChange={(e) => updateSystemSetting('emergencyAlertsEnabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-950 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600 border border-slate-800" />
            </label>
          </div>
        </div>
      </div>

      {/* Map Display Overlays */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-cyan-400/20 shadow-xl backdrop-blur-md space-y-4">
        <div className="flex items-center gap-3.5 pb-4 border-b border-slate-800">
          <div className="p-2.5 rounded-2xl bg-cyan-950 text-cyan-400 border border-cyan-800">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base sm:text-lg font-display">GIS Map Display Layers</h3>
            <p className="text-xs text-slate-400">Customize default visible elements on the central command map</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
          <div
            onClick={() => toggleMapLayer('showTrafficDensity')}
            className={`p-5 rounded-2xl border cursor-pointer transition-all ${
              mapLayers.showTrafficDensity
                ? 'bg-slate-950 text-white border-cyan-400/40 shadow-lg'
                : 'bg-slate-950/50 text-slate-400 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-cyan-300">Traffic Density Flow</span>
              <span className={`w-3 h-3 rounded-full ${mapLayers.showTrafficDensity ? 'bg-emerald-400' : 'bg-slate-700'}`} />
            </div>
            <p className="text-[11px] opacity-75 font-sans">Colored polyline segments (Green, Yellow, Red)</p>
          </div>

          <div
            onClick={() => toggleMapLayer('showSignals')}
            className={`p-5 rounded-2xl border cursor-pointer transition-all ${
              mapLayers.showSignals
                ? 'bg-slate-950 text-white border-amber-400/40 shadow-lg'
                : 'bg-slate-950/50 text-slate-400 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-300">Traffic Light Signals</span>
              <span className={`w-3 h-3 rounded-full ${mapLayers.showSignals ? 'bg-amber-400' : 'bg-slate-700'}`} />
            </div>
            <p className="text-[11px] opacity-75 font-sans">Interactive live phase & countdown markers</p>
          </div>

          <div
            onClick={() => toggleMapLayer('showCameras')}
            className={`p-5 rounded-2xl border cursor-pointer transition-all ${
              mapLayers.showCameras
                ? 'bg-slate-950 text-white border-pink-400/40 shadow-lg'
                : 'bg-slate-950/50 text-slate-400 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-pink-300">CCTV AI Sensors</span>
              <span className={`w-3 h-3 rounded-full ${mapLayers.showCameras ? 'bg-pink-400' : 'bg-slate-700'}`} />
            </div>
            <p className="text-[11px] opacity-75 font-sans">Optical radar and license ANPR cameras</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
