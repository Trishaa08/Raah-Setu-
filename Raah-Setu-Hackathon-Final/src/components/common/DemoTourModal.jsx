import React from 'react';
import { 
  Sparkles, 
  X, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import { useTraffic } from '../../context/TrafficContext';
import { useNavigate } from 'react-router-dom';

const DemoTourModal = () => {
  const { demoTourOpen, currentTourStep, tourSteps, nextTourStep, prevTourStep, endDemoTour } = useTraffic();
  const navigate = useNavigate();

  if (!demoTourOpen) return null;

  const currentStepData = tourSteps[currentTourStep];
  const progressPercent = ((currentTourStep + 1) / tourSteps.length) * 100;

  const handleGoToModule = () => {
    if (currentStepData.actionRoute) {
      navigate(currentStepData.actionRoute);
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4">
        
        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-1.5">
          <div
            className="bg-[#EA4C89] h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Modal Header */}
        <div className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-[#FDE8F0] text-[#EA4C89]">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="text-xs font-mono font-bold text-slate-500">
                JUDGING WALKTHROUGH • STEP {currentTourStep + 1} OF {tourSteps.length}
              </span>
            </div>

            <button
              onClick={endDemoTour}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div>
            <h2 className="text-2xl font-black text-slate-900 font-display">{currentStepData.title}</h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1 leading-relaxed">
              {currentStepData.description}
            </p>
          </div>

          {/* Key Insight Highlight Box */}
          <div className="p-4 rounded-2xl bg-[#FDE8F0]/50 border border-pink-200 text-xs text-slate-800 space-y-1">
            <div className="font-bold text-[#EA4C89] uppercase tracking-wider text-[10px]">What to Notice:</div>
            <div className="font-medium">{currentStepData.highlight}</div>
          </div>

          {/* Module Deep Link Button */}
          {currentStepData.actionRoute && (
            <button
              onClick={handleGoToModule}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-bold text-slate-800 transition-colors"
            >
              <span>Jump Directly into {currentStepData.title}</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#EA4C89]" />
            </button>
          )}
        </div>

        {/* Modal Navigation Footer */}
        <div className="px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={prevTourStep}
            disabled={currentTourStep === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 bg-white text-xs font-bold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {/* Dot Step Indicators */}
          <div className="hidden sm:flex items-center gap-1.5">
            {tourSteps.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentTourStep ? 'w-5 bg-[#EA4C89]' : 'bg-slate-300'
                }`}
              />
            ))}
          </div>

          {currentTourStep < tourSteps.length - 1 ? (
            <button
              onClick={nextTourStep}
              className="flex items-center gap-1.5 px-6 py-2 rounded-full bg-[#0D0C22] hover:bg-[#2B2945] text-white text-xs font-bold shadow-md transition-all hover:scale-105"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4 text-[#EA4C89]" />
            </button>
          ) : (
            <button
              onClick={endDemoTour}
              className="flex items-center gap-1.5 px-6 py-2 rounded-full bg-[#EA4C89] hover:bg-[#F082AC] text-white text-xs font-black shadow-glow-pink transition-all hover:scale-105"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Finish Tour</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default DemoTourModal;
