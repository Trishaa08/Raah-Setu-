import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play, 
  ArrowRight, 
  Radio, 
  ShieldCheck, 
  Layers, 
  FileText,
  Building2,
  Cpu,
  Globe
} from 'lucide-react';
import { useTraffic } from '../../context/TrafficContext';
import { Link } from 'react-router-dom';

const DribbbleHero = () => {
  const { startDemoTour } = useTraffic();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      bgImage: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=2000&q=80",
      tagline: "Developing Technology & Smart City",
      title: "Welcome to the Smart City Portal",
      subtitle: "It is a smart city comprehensive portal that strives to discover innovative technologies and promote businesses for smart city development.",
      badge: "K-SMART CITY SOL & RAAH-SETU"
    },
    {
      id: 2,
      bgImage: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=2000&q=80",
      tagline: "Autonomous AI Traffic Management",
      title: "Real-Time Signal Wave Synchronization",
      subtitle: "Graph-STGCN deep learning engine forecasting congestion and coordinating 138 signal junctions autonomously.",
      badge: "LIVE TELEMETRY ENGINE"
    },
    {
      id: 3,
      bgImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=2000&q=80",
      tagline: "Integrated Emergency Corridor Dispatch",
      title: "Zero-Delay Emergency Priority Routes",
      subtitle: "Dynamic A* pathfinding guaranteeing green wave passage for emergency response ambulances and fire engines.",
      badge: "EMERGENCY DISPATCH READY"
    }
  ];

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % slides.length);
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, slides.length]);

  const handleNext = () => setCurrentSlide((currentSlide + 1) % slides.length);
  const handlePrev = () => setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);

  return (
    <section className="relative w-full overflow-hidden text-white font-sans">
      {/* Dynamic Background Image Slider (Screenshot 1) */}
      <div className="relative min-h-[480px] sm:min-h-[540px] lg:min-h-[600px] flex items-center justify-center">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image */}
            <img
              src={slide.bgImage}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Dark Overlay Gradient for maximum readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060b14] via-transparent to-black/30" />
            
            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
          </div>
        ))}

        {/* Hero Content Overlay */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full text-center flex flex-col items-center justify-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-bold tracking-widest uppercase shadow-lg backdrop-blur-md">
            <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-300" />
            <span>{slides[currentSlide].tagline}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-4xl font-display text-white drop-shadow-md">
            {slides[currentSlide].title}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-lg text-slate-200 max-w-2xl font-medium leading-relaxed drop-shadow">
            {slides[currentSlide].subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={startDemoTour}
              className="flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-600 via-blue-600 to-pink-600 hover:brightness-110 text-white font-bold text-sm shadow-xl transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Explore Smart City Solutions</span>
            </button>

            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-7 py-4 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 font-bold text-sm backdrop-blur-md transition-all hover:border-cyan-400/50"
            >
              <span>Command Center</span>
              <ArrowRight className="w-4 h-4 text-cyan-300" />
            </Link>
          </div>

          {/* Interactive Slider Navigation Controls (matching Screenshot 1: 02/02 < || >) */}
          <div className="pt-6 flex items-center justify-center gap-3">
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-slate-700/80 text-xs font-mono font-bold text-slate-300 shadow-2xl">
              <span>0{currentSlide + 1} / 0{slides.length}</span>

              <div className="h-4 w-px bg-slate-700" />

              <button
                onClick={handlePrev}
                className="p-1 hover:text-cyan-300 transition-colors"
                title="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1 hover:text-cyan-300 transition-colors"
                title={isPlaying ? "Pause slider" : "Play slider"}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 text-pink-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
              </button>

              <button
                onClick={handleNext}
                className="p-1 hover:text-cyan-300 transition-colors"
                title="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DribbbleHero;

