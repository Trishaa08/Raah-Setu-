import React from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Activity, 
  BrainCircuit, 
  TrafficCone, 
  Route as RouteIcon, 
  AlertTriangle, 
  BarChart3,
  PlayCircle, 
  Bell, 
  Settings, 
  LogOut, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Compass,
  ArrowLeft
} from 'lucide-react';
import { useTraffic } from '../../context/TrafficContext';
import { useSettings } from '../../context/SettingsContext';

const navigationItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Live Traffic', path: '/live-traffic', icon: Activity },
  { name: 'AI Prediction', path: '/prediction', icon: BrainCircuit, badge: 'ML' },
  { name: 'Traffic Simulation', path: '/simulation', icon: PlayCircle, badge: 'LIVE' },
  { name: 'Signal Control', path: '/signals', icon: TrafficCone },
  { name: 'Route Optimization', path: '/routes', icon: RouteIcon },
  { name: 'Incidents', path: '/incidents', icon: AlertTriangle, countKey: 'incidents' },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  { name: 'Alerts', path: '/alerts', icon: Bell, countKey: 'alerts' },
  { name: 'Settings', path: '/settings', icon: Settings },
];

const Sidebar = ({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) => {
  const { incidents, alerts, startDemoTour } = useTraffic();
  const { currentUser } = useSettings();
  const navigate = useNavigate();

  const activeIncidentsCount = incidents.filter(i => i.status !== 'RESOLVED').length;
  const unreadAlertsCount = alerts.filter(a => !a.isRead).length;

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-white border-r border-slate-200 transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} shadow-sm`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between h-20 px-5 border-b border-slate-100 shrink-0">
          <Link to="/" className="flex items-center gap-2 overflow-hidden">
            {!isCollapsed ? (
              <span className="text-2xl font-black italic tracking-tight text-slate-900 font-display flex items-center">
                <img src="/raah-setu-logo.svg" alt="Raah-Setu" className="h-10 w-auto max-w-[180px] object-contain" />
                <span className="w-2 h-2 rounded-full bg-[#EA4C89] ml-0.5" />
              </span>
            ) : (
              <span className="w-9 h-9 rounded-2xl bg-[#0D0C22] text-white font-black text-lg flex items-center justify-center font-display shadow-md">
                U
              </span>
            )}
          </Link>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Back to Dribbble Discovery View button */}
        {!isCollapsed && (
          <div className="px-4 pt-4">
            <Link
              to="/"
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 transition-all group shadow-sm"
            >
              <span className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#EA4C89] group-hover:rotate-45 transition-transform" />
                <span>Discovery Shots Grid</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white border border-slate-200">HOME</span>
            </Link>
          </div>
        )}

        {/* Nav Links */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className={`text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2 ${isCollapsed ? 'text-center' : ''}`}>
            {isCollapsed ? '•••' : 'Main Command'}
          </div>

          {navigationItems.map((item) => {
            const Icon = item.icon;
            let badgeCount = null;
            if (item.countKey === 'incidents' && activeIncidentsCount > 0) badgeCount = activeIncidentsCount;
            if (item.countKey === 'alerts' && unreadAlertsCount > 0) badgeCount = unreadAlertsCount;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all group relative ${
                    isActive
                      ? 'bg-[#0D0C22] text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  } ${isCollapsed ? 'justify-center px-0' : ''}`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-[#EA4C89]' : 'text-slate-500 group-hover:text-slate-900'}`} />
                    
                    {!isCollapsed && (
                      <span className="flex-1 truncate">{item.name}</span>
                    )}

                    {/* AI Badge */}
                    {!isCollapsed && item.badge && (
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                        isActive ? 'bg-[#EA4C89] text-white' : 'bg-pink-100 text-[#EA4C89]'
                      }`}>
                        {item.badge}
                      </span>
                    )}

                    {/* Count Pill */}
                    {badgeCount !== null && (
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                          isCollapsed ? 'absolute top-1 right-2' : ''
                        } ${
                          item.countKey === 'incidents'
                            ? 'bg-rose-500 text-white'
                            : 'bg-amber-500 text-white'
                        }`}
                      >
                        {badgeCount}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Bottom User / Logout Section */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/70 shrink-0 space-y-2">
          {/* User Preview */}
          <div className={`flex items-center gap-3 p-2 rounded-2xl bg-white border border-slate-200 shadow-sm ${isCollapsed ? 'justify-center p-1' : ''}`}>
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-300 shrink-0"
            />
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-slate-900 truncate flex items-center gap-1">
                  {currentUser.name}
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                </div>
                <div className="text-[10px] text-slate-500 truncate">{currentUser.role}</div>
              </div>
            )}
          </div>

          {/* Logout Button */}
          <button
            onClick={() => { navigate('/login'); if (setIsMobileOpen) setIsMobileOpen(false); }}
            className={`w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-all ${
              isCollapsed ? 'justify-center px-0' : ''
            }`}
            title="Logout"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span>Logout Session</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
