import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { useTraffic } from '../../context/TrafficContext';

const ToastContainer = () => {
  const { toasts, removeToast } = useTraffic();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[999999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className="pointer-events-auto p-4 rounded-2xl bg-white border border-slate-200 shadow-2xl flex items-start justify-between gap-3 animate-in slide-in-from-bottom-5 duration-300"
          >
            <div className="flex items-start gap-3">
              <div className={`p-1.5 rounded-xl shrink-0 mt-0.5 ${
                isSuccess
                  ? 'bg-emerald-50 text-emerald-600'
                  : isError
                  ? 'bg-rose-50 text-rose-600'
                  : isWarning
                  ? 'bg-amber-50 text-amber-600'
                  : 'bg-blue-50 text-blue-600'
              }`}>
                {isSuccess ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : isError || isWarning ? (
                  <AlertTriangle className="w-4 h-4" />
                ) : (
                  <Info className="w-4 h-4 text-[#EA4C89]" />
                )}
              </div>

              <p className="text-xs font-semibold text-slate-800 leading-snug">
                {toast.message}
              </p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 text-slate-400 hover:text-slate-700 rounded-full"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ToastContainer;
