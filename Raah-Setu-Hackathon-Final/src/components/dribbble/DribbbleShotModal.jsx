import React from 'react';
import { 
  X, 
  Heart, 
  Bookmark, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';

const DribbbleShotModal = ({ shot, isOpen, onClose }) => {
  if (!isOpen || !shot) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in">
      {/* Modal Card */}
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-slate-900/95 rounded-3xl border border-cyan-400/30 shadow-2xl overflow-hidden flex flex-col text-white font-sans">
        
        {/* Top Sticky Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md shrink-0">
          
          {/* Left: Author Profile */}
          <div className="flex items-center gap-3">
            <img
              src={shot.authorAvatar}
              alt={shot.author}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-cyan-400/40"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-white">{shot.title}</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono">
                  {shot.badge || 'PRO'}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">{shot.author} • {shot.category}</p>
            </div>
          </div>

          {/* Right: Actions & Close */}
          <div className="flex items-center gap-2 sm:gap-3 font-mono">
            <button
              onClick={() => alert('Saved to your Command Collection!')}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-700 bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-200 transition-all"
            >
              <Bookmark className="w-3.5 h-3.5 text-cyan-400" />
              <span>Save</span>
            </button>

            <button
              onClick={() => alert('Liked!')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-pink-950/80 hover:bg-pink-900 text-xs font-bold text-pink-300 border border-pink-800 transition-all"
            >
              <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
              <span>{shot.likes}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Main Visual Display */}
          <div className="rounded-3xl overflow-hidden border border-cyan-400/20 shadow-xl bg-slate-950">
            {shot.renderDetailedView ? (
              shot.renderDetailedView()
            ) : (
              <img
                src={shot.thumbnail}
                alt={shot.title}
                className="w-full h-auto max-h-[480px] object-cover"
              />
            )}
          </div>

          {/* Shot Details & Description */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <h4 className="text-xl font-extrabold text-white font-display">{shot.title}</h4>
                <p className="text-sm text-slate-300 mt-1 leading-relaxed">{shot.description}</p>
              </div>

              {shot.actionRoute && (
                <Link
                  to={shot.actionRoute}
                  onClick={onClose}
                  className="shrink-0 flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-600 via-blue-600 to-pink-600 hover:brightness-110 text-white font-bold text-xs shadow-lg transition-all self-start sm:self-auto font-mono"
                >
                  <span>Open Dedicated Module</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>

            {/* Highlights / Key Stats Grid */}
            {shot.stats && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 font-mono">
                {Object.entries(shot.stats).map(([k, v], idx) => (
                  <div key={idx}>
                    <span className="text-[10px] font-bold uppercase text-slate-400">{k}</span>
                    <div className="text-base font-black text-cyan-300 mt-0.5">{v}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Verified Smart City Nagpur Telemetry
          </span>
          <span>{shot.views} total views</span>
        </div>

      </div>
    </div>
  );
};

export default DribbbleShotModal;
