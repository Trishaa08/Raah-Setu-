import React from 'react';

const StatusBadge = ({ status, size = 'sm', pulse = false }) => {
  const normalized = (status || '').toUpperCase();

  const getStyles = () => {
    switch (normalized) {
      case 'LOW':
      case 'CLEAR':
      case 'NORMAL':
      case 'OPTIMIZED':
      case 'RESOLVED':
        return {
          bg: 'bg-emerald-50',
          text: 'text-emerald-700',
          border: 'border-emerald-200',
          dot: 'bg-emerald-500'
        };
      case 'MEDIUM':
      case 'MODERATE':
      case 'WARNING':
      case 'DIVERTING':
      case 'DISPATCHED':
        return {
          bg: 'bg-amber-50',
          text: 'text-amber-700',
          border: 'border-amber-200',
          dot: 'bg-amber-500'
        };
      case 'HIGH':
      case 'HEAVY':
        return {
          bg: 'bg-orange-50',
          text: 'text-orange-700',
          border: 'border-orange-200',
          dot: 'bg-orange-500'
        };
      case 'CRITICAL':
      case 'SEVERE':
      case 'ACCIDENT':
      case 'EMERGENCY':
      case 'ACTIVE':
        return {
          bg: 'bg-rose-50',
          text: 'text-rose-700',
          border: 'border-rose-200',
          dot: 'bg-rose-500'
        };
      default:
        return {
          bg: 'bg-slate-100',
          text: 'text-slate-700',
          border: 'border-slate-200',
          dot: 'bg-slate-500'
        };
    }
  };

  const styles = getStyles();
  const sizeClasses = size === 'xs' 
    ? 'px-2 py-0.5 text-[10px]' 
    : size === 'lg' 
    ? 'px-3.5 py-1.5 text-sm' 
    : 'px-2.5 py-1 text-xs';

  return (
    <span className={`inline-flex items-center gap-1.5 font-bold rounded-full border ${styles.bg} ${styles.text} ${styles.border} ${sizeClasses}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${styles.dot} ${pulse ? 'animate-ping' : ''}`} />
      <span>{status}</span>
    </span>
  );
};

export default StatusBadge;
