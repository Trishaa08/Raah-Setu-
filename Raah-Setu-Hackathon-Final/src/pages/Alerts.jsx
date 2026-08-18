import React, { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  Clock, 
  ArrowRight, 
  Trash2, 
  CheckCheck
} from 'lucide-react';
import { useTraffic } from '../context/TrafficContext';
import { Link } from 'react-router-dom';

const tabs = ['All', 'Critical', 'Traffic', 'Signals', 'Incidents', 'System'];

const Alerts = () => {
  const { alerts, showToast } = useTraffic();
  const [activeTab, setActiveTab] = useState('All');
  const [alertList, setAlertList] = useState(alerts);

  const filteredAlerts = alertList.filter((a) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Critical') return a.type === 'CRITICAL';
    return a.category.toLowerCase() === activeTab.toLowerCase();
  });

  const handleMarkAllRead = () => {
    setAlertList(prev => prev.map(a => ({ ...a, isRead: true })));
    showToast('✓ All notification alerts marked as read.', 'info');
  };

  const handleClearAll = () => {
    setAlertList([]);
    showToast('✓ Alert feed cleared.', 'info');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 text-white">
      {/* Header with Background Photo */}
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl overflow-hidden shadow-2xl border border-cyan-400/20 text-white group">
        <img
          src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1600&q=80"
          alt="Alert System"
          className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/70 backdrop-blur-xs" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-pink-500/20 text-pink-300 border border-pink-400/30">
              <Bell className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-pink-300 font-mono">AUTOMATED INCIDENT & TELEMETRY ALERTS</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white font-display drop-shadow-md">Alerts & System Notifications</h1>
          <p className="text-xs sm:text-sm text-slate-200 font-medium mt-0.5 max-w-2xl drop-shadow">
            Real-time critical events, sensor threshold breaches, and autonomous signal execution logs across Nagpur.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 relative z-10 font-mono">
          <button
            onClick={handleMarkAllRead}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 backdrop-blur-md transition-colors"
          >
            <CheckCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Mark All Read</span>
          </button>
          <button
            onClick={handleClearAll}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-rose-950/80 hover:bg-rose-900 border border-rose-800 text-xs font-bold text-rose-300 backdrop-blur-md transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Feed</span>
          </button>
        </div>
      </div>

      {/* Categorized Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3 font-mono">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          let count = 0;
          if (tab === 'All') count = alertList.length;
          else if (tab === 'Critical') count = alertList.filter(a => a.type === 'CRITICAL').length;
          else count = alertList.filter(a => a.category.toLowerCase() === tab.toLowerCase()).length;

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-600 to-pink-600 text-white shadow-lg'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 border border-slate-800'
              }`}
            >
              <span>{tab}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                isActive ? 'bg-white text-slate-950' : 'bg-slate-800 text-cyan-300'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Alert Feed Items */}
      <div className="space-y-3.5">
        {filteredAlerts.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white font-display">No active alerts in this category</h3>
            <p className="text-xs text-slate-400 mt-1">All monitored city corridors and signals are operating normally.</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const isCritical = alert.type === 'CRITICAL';
            const isWarning = alert.type === 'WARNING';
            const isSystem = alert.type === 'SYSTEM';

            return (
              <div
                key={alert.id}
                className={`p-5 rounded-3xl border transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  !alert.isRead
                    ? 'bg-slate-900/90 border-cyan-400/30 shadow-xl'
                    : 'bg-slate-900/60 border-slate-800/80 opacity-75'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-2xl shrink-0 mt-0.5 ${
                    isCritical
                      ? 'bg-rose-950 text-rose-400 border border-rose-800'
                      : isWarning
                      ? 'bg-amber-950 text-amber-400 border border-amber-800'
                      : isSystem
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                  }`}>
                    {isCritical ? (
                      <ShieldAlert className="w-5 h-5 animate-pulse" />
                    ) : isWarning ? (
                      <AlertTriangle className="w-5 h-5" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1 font-mono">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        isCritical
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : isWarning
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      }`}>
                        {alert.type}
                      </span>
                      <span className="text-xs text-slate-400">• {alert.category}</span>
                      <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-slate-400" /> {alert.timeAgo}
                      </span>
                    </div>

                    <h4 className="font-bold text-white text-sm sm:text-base leading-snug">{alert.title}</h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{alert.description}</p>
                  </div>
                </div>

                {/* Right Quick Action Button */}
                <Link
                  to={alert.actionLink || '/dashboard'}
                  className="shrink-0 flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-slate-950 hover:bg-gradient-to-r hover:from-cyan-600 hover:to-pink-600 text-xs font-bold text-cyan-300 hover:text-white border border-slate-800 transition-all self-end sm:self-center font-mono"
                >
                  <span>Inspect</span>
                  <ArrowRight className="w-3.5 h-3.5 text-pink-400" />
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Alerts;
