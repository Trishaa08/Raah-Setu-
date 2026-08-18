import React, { useState } from 'react';
import { BrainCircuit, Sparkles } from 'lucide-react';
import PredictionForm from '../components/prediction/PredictionForm';
import ForecastChart from '../components/prediction/ForecastChart';
import ExplainableAI from '../components/prediction/ExplainableAI';
import { trafficApi } from '../services/api';

const initialPredictionState = {
  location: "Wardha Road (NH-44 Corridor)",
  horizonMinutes: 30,
  predictedLevel: "HIGH",
  confidence: 87,
  currentDensity: 78,
  predictedDensity: 91,
  factors: [
    "High vehicle density inflow detected by optical radar (4,820 veh/h)",
    "Evening peak hour commuter surge pattern from SEZ/MIHAN",
    "Reduced average corridor speed (21 km/h vs 55 km/h limit)",
    "Historical Saturday evening correlation (94% match)",
    "Nearby event detected: Metro construction contraction at Airport T-Junction"
  ],
  recommendation: {
    actionText: "Increase green signal duration on Wardha Road by 18 seconds. Divert approximately 12% of incoming traffic toward Ring Road Sector 5.",
    expectedDelayReduction: "18 – 24%",
    estimatedMinutesSaved: 9
  },
  forecastTimeline: [
    { horizon: "Now", vehiclesPerHour: 4820, congestion: 78 },
    { horizon: "+15 min", vehiclesPerHour: 5150, congestion: 83 },
    { horizon: "+30 min", vehiclesPerHour: 5620, congestion: 91 },
    { horizon: "+45 min", vehiclesPerHour: 5400, congestion: 87 },
    { horizon: "+60 min", vehiclesPerHour: 4900, congestion: 79 }
  ]
};

const Prediction = () => {
  const [formData, setFormData] = useState({
    location: "Wardha Road (NH-44 Corridor)",
    horizon: 30,
    date: new Date().toISOString().split('T')[0],
    time: "19:00",
    weather: "Clear",
    event: "None"
  });

  const [predictionResult, setPredictionResult] = useState(initialPredictionState);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await trafficApi.generatePrediction({
        location: formData.location,
        horizonMinutes: formData.horizon,
        weather: formData.weather,
        event: formData.event
      });
      setPredictionResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header with High-Res AI Cyber Photo Background */}
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl overflow-hidden shadow-2xl border border-cyan-400/20 text-white group">
        <img
          src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80"
          alt="AI Predictive Engine"
          className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/70 backdrop-blur-xs" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-pink-500/20 text-[#EA4C89] border border-pink-400/30">
              <BrainCircuit className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-pink-300 font-mono">GRAPH-STGCN NEURAL PREDICTIVE ENGINE</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white font-display drop-shadow-md">AI Traffic Prediction</h1>
          <p className="text-xs sm:text-sm text-slate-200 font-medium mt-0.5 max-w-2xl drop-shadow">
            Predict congestion 30-60 minutes before it happens. Proactive decision support and explainable ML insights.
          </p>
        </div>

        <div className="flex items-center gap-2 relative z-10">
          <span className="px-4 py-2 rounded-full bg-slate-900/80 border border-slate-700 text-xs font-mono font-bold text-cyan-300 backdrop-blur-md">
            Model: <strong className="text-pink-400">Graph-STGCN • Python AI</strong>
          </span>
        </div>
      </div>

      {/* Prediction Input Form */}
      <PredictionForm
        formData={formData}
        setFormData={setFormData}
        onGenerate={handleGenerate}
        isGenerating={isGenerating}
      />

      {/* Prediction Result & Explainable AI */}
      {predictionResult && (
        <div className="space-y-6">
          <ExplainableAI prediction={predictionResult} />
          <ForecastChart data={predictionResult.forecastTimeline} />
        </div>
      )}
    </div>
  );
};

export default Prediction;
