import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus, HelpCircle } from 'lucide-react';

const KPICard = ({
  title,
  value,
  subvalue,
  trend,
  trendDirection = 'up',
  trendIsGood = true,
  icon: Icon,
  accentColor = 'blue',
  tooltip,
  badgeText
}) => {
  const getTrendStyles = () => {
    if (trendDirection === 'neutral') return 'text-slate-600 bg-slate-100 border-slate-200';
    if (trendIsGood) {
      return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    }
    return trendDirection === 'up' 
      ? 'text-rose-700 bg-rose-50 border-rose-200' 
      : 'text-emerald-700 bg-emerald-50 border-emerald-200';
  };

  const getIconStyles = () => {
    switch (accentColor) {
      case 'emerald':
      case 'green':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'amber':
      case 'yellow':
        return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'rose':
      case 'red':
        return 'bg-rose-50 text-rose-600 border-rose-100';
      case 'cyan':
        return 'bg-cyan-50 text-cyan-600 border-cyan-100';
      case 'purple':
        return 'bg-purple-50 text-purple-600 border-purple-100';
      case 'pink':
        return 'bg-[#FDE8F0] text-[#EA4C89] border-pink-100';
      default:
        return 'bg-blue-50 text-blue-600 border-blue-100';
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{title}</span>
          {tooltip && (
            <div className="group relative">
              <HelpCircle className="w-3.5 h-3.5 text-slate-400 cursor-help" />
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-48 p-2.5 bg-slate-900 text-xs text-slate-100 rounded-xl shadow-xl z-50 pointer-events-none">
                {tooltip}
              </div>
            </div>
          )}
        </div>
        {Icon && (
          <div className={`p-2.5 rounded-xl border ${getIconStyles()}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline justify-between gap-2">
        <div>
          <div className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 font-display">{value}</div>
          {subvalue && <div className="text-xs font-semibold text-slate-500 mt-0.5">{subvalue}</div>}
        </div>

        {trend && (
          <div className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${getTrendStyles()}`}>
            {trendDirection === 'up' ? (
              <ArrowUpRight className="w-3.5 h-3.5" />
            ) : trendDirection === 'down' ? (
              <ArrowDownRight className="w-3.5 h-3.5" />
            ) : (
              <Minus className="w-3.5 h-3.5" />
            )}
            <span>{trend}</span>
          </div>
        )}

        {badgeText && (
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );
};

export default KPICard;
