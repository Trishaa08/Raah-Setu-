import React from 'react';
import { 
  Folder, 
  MapPin, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Building2, 
  Zap, 
  Users, 
  Radio, 
  FileText,
  Compass,
  Award,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SmartCitySolutionsGrid = () => {
  const solutionCategories = [
    {
      id: 'mobility',
      title: 'Mobility',
      cases: '9 cases',
      subtitle: "'Mobility' covers technologies and services that improve urban transportation, including public transit, shared mobility, and traffic management.",
      bgImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
      isFeatured: true,
      route: '/live-traffic'
    },
    {
      id: 'safety',
      title: 'Safety & Surveillance',
      cases: '8 cases',
      subtitle: 'Integrated emergency response, smart AI cameras & real-time accident prevention.',
      bgImage: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
      isFeatured: false,
      route: '/incidents'
    },
    {
      id: 'infrastructure',
      title: 'Buildings & Infrastructure',
      cases: '4 cases',
      subtitle: 'Smart highway sensors, bridge load telemetry, and resilient road networks.',
      bgImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      isFeatured: false,
      route: '/routes'
    },
    {
      id: 'energy',
      title: 'Energy & Environment',
      cases: '4 cases',
      subtitle: 'Green wave signal timing, eco-routing, and zero-emission transit corridors.',
      bgImage: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80',
      isFeatured: false,
      route: '/signals'
    },
    {
      id: 'welfare',
      title: 'Welfare, Administration & Life',
      cases: '5 cases',
      subtitle: 'Civic command hub, public notifications, and citywide traffic intelligence.',
      bgImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
      isFeatured: false,
      route: '/dashboard'
    }
  ];

  const cityStories = [
    {
      name: 'NAGPUR',
      description: 'Nagpur, the geographic heart of India, leads AI-driven smart corridor management.',
      bgImage: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80',
      isActive: true,
      route: '/live-traffic'
    },
    {
      name: 'MUMBAI',
      description: 'Coastal Road Expressway & Sea Link adaptive signal wave network.',
      bgImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
      isActive: false,
      route: '/routes'
    },
    {
      name: 'DELHI',
      description: 'Capital Ring Road emergency priority green wave & ANPR grid.',
      bgImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80',
      isActive: false,
      route: '/prediction'
    },
    {
      name: 'BENGALURU',
      description: 'Tech Hub Electronic City arterial congestion forecasting model.',
      bgImage: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80',
      isActive: false,
      route: '/analytics'
    }
  ];

  const newsItems = [
    {
      number: '01',
      type: 'Publications',
      title: 'Raah-Setu AI Smart City Whitepaper 2026',
      date: '2026-08-15',
      desc: 'Comprehensive framework on Graph-STGCN deep learning for autonomous urban signal synchronization.'
    },
    {
      number: '02',
      type: 'News & Press',
      title: 'Nagpur Corridor Delays Reduced by 24%',
      date: '2026-08-10',
      desc: 'Live telemetry confirms 18.7% reduction in commuter wait times across NH-44 Wardha Road corridor.'
    },
    {
      number: '03',
      type: 'Technical Brief',
      title: 'Emergency Priority Vehicle Green Wave Protocol',
      date: '2026-08-04',
      desc: 'Zero-wait emergency corridor routing successfully deployed for hospital and fire emergency dispatches.'
    }
  ];

  const bloombergMediaGrid = [
    {
      title: 'A New City Corridor: How AI Signal Sync is Taming Peak Hour Surges',
      category: 'URBAN MOBILITY',
      bgImage: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=600&q=80',
      route: '/prediction'
    },
    {
      title: 'As Electric Air Taxis Approach, Cities Prepare Smart Sky Corridors',
      category: 'FUTURE TRANSIT',
      bgImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
      route: '/simulation'
    },
    {
      title: 'City of Scaffolding & Signals: Redesigning Urban Traffic Infrastructure',
      category: 'DESIGN & TECH',
      bgImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
      route: '/signals'
    },
    {
      title: 'Restoring Eco-Corridors: Green Traffic Waves Reduce City Emissions',
      category: 'ENVIRONMENT',
      bgImage: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=600&q=80',
      route: '/analytics'
    }
  ];

  return (
    <div className="space-y-16 py-8">
      {/* SECTION 1: What's New? (Matching Screenshot 1) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">LATEST UPDATES</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-display mt-1">What&apos;s New?</h2>
          </div>
          <button className="w-8 h-8 rounded-full border border-slate-700 bg-slate-900 text-slate-300 flex items-center justify-center font-black text-lg hover:border-cyan-400">
            +
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left 8 Cols: News & Publications List */}
          <div className="lg:col-span-8 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
            {newsItems.map((item) => (
              <div
                key={item.number}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-400/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-400/20 flex items-center justify-center font-black text-base shrink-0">
                  {item.number}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-cyan-400 uppercase">{item.type}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-[11px] text-slate-400 font-mono">{item.date}</span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400">{item.desc}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all shrink-0" />
              </div>
            ))}
          </div>

          {/* Right 4 Cols: Vision & Strategy / City Network Cards (Matching Screenshot 1) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Vision & Strategy Card */}
            <div className="relative rounded-3xl overflow-hidden p-6 bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/20 shadow-xl group hover:border-blue-400/40 transition-all">
              <div className="relative z-10 space-y-3">
                <span className="text-[10px] font-bold tracking-widest text-cyan-300 uppercase">SMART CITY VISION</span>
                <h3 className="text-2xl font-black text-white">Vision & Strategy</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Next-generation autonomous mobility framework designed for Indian metropolitan corridors.
                </p>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 hover:text-white pt-2"
                >
                  <span>Explore Master Plan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="absolute right-[-20px] bottom-[-20px] w-36 h-36 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />
            </div>

            {/* City Network Card */}
            <div className="relative rounded-3xl overflow-hidden p-6 bg-gradient-to-br from-purple-950 via-slate-900 to-slate-950 border border-purple-500/20 shadow-xl group hover:border-purple-400/40 transition-all">
              <div className="relative z-10 space-y-3">
                <span className="text-[10px] font-bold tracking-widest text-pink-300 uppercase">NETWORK INTERCHANGE</span>
                <h3 className="text-2xl font-black text-white">City Network</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Connecting 12 regional traffic authority command centers in real time.
                </p>
                <Link
                  to="/live-traffic"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-300 hover:text-white pt-2"
                >
                  <span>View Interchanges</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="absolute right-[-20px] bottom-[-20px] w-36 h-36 bg-pink-500/10 rounded-full blur-xl pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Best Practices & Technologies Cards (Matching Screenshot 2) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">SOLUTIONS & INNOVATION</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-display mt-1">Best Practices & Technologies</h2>
          </div>
          <span className="text-xs font-semibold text-slate-400">5 Smart City Solution Pillars</span>
        </div>

        {/* 5 Cards Row (1 wide featured + 4 vertical) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          {solutionCategories.map((cat) => (
            <Link
              key={cat.id}
              to={cat.route}
              className={`relative rounded-3xl overflow-hidden group shadow-2xl border border-slate-800 hover:border-cyan-400/50 transition-all duration-500 flex flex-col justify-between ${
                cat.isFeatured ? 'lg:col-span-1 min-h-[360px]' : 'min-h-[360px]'
              }`}
            >
              {/* Card Background Image (Exact match to Screenshot 2!) */}
              <img
                src={cat.bgImage}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              
              {/* Dark Gradient Overlay for perfect text visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-black/30 group-hover:via-slate-950/40 transition-colors" />

              {/* Card Top: Folder case count badge */}
              <div className="relative z-10 p-5 flex justify-between items-start">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono font-bold shadow-md">
                  <Folder className="w-3.5 h-3.5 text-cyan-300" />
                  <span>{cat.cases}</span>
                </span>
              </div>

              {/* Card Bottom: Text Content */}
              <div className="relative z-10 p-6 space-y-2">
                <h3 className="text-xl font-black text-white group-hover:text-cyan-300 transition-colors drop-shadow-md">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-200 line-clamp-3 leading-relaxed drop-shadow">
                  {cat.subtitle}
                </p>
                <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-cyan-300 group-hover:translate-x-1 transition-transform">
                  <span>Explore Cases</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 3: City Hub & Regional Map Story (Matching Screenshot 2 bottom section) */}
      <section className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left 5 Cols: City Story Map Pin Card (Matching Screenshot 2) */}
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 p-8 text-white flex flex-col justify-between min-h-[380px] shadow-2xl border border-blue-400/30">
            {/* Background Map Graphic Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#93c5fd_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-25 pointer-events-none" />

            <div className="relative z-10 space-y-3">
              <div className="text-xs font-mono font-bold tracking-widest text-cyan-200 uppercase flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-300 animate-bounce" />
                <span>City story • Nagpur</span>
              </div>

              <h2 className="text-4xl font-black tracking-tight font-display">
                NAGPUR
              </h2>

              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed max-w-sm">
                Nagpur, the geographical center of India, is the pilot city for Raah-Setu AI autonomous traffic signal control, real-time ANPR camera tracking, and emergency priority routing.
              </p>
            </div>

            <div className="relative z-10 pt-6">
              <Link
                to="/live-traffic"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-blue-900 hover:bg-cyan-100 font-bold text-xs shadow-lg transition-all hover:scale-105"
              >
                <span>View corridor map →</span>
              </Link>
            </div>
          </div>

          {/* Right 7 Cols: Horizontal Carousel of City Cards with rich background photos */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cityStories.map((city, idx) => (
              <Link
                key={idx}
                to={city.route}
                className="relative rounded-3xl overflow-hidden min-h-[380px] group shadow-xl border border-slate-800 hover:border-cyan-400 transition-all flex flex-col justify-end p-6"
              >
                <img
                  src={city.bgImage}
                  alt={city.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                <div className="relative z-10 space-y-2">
                  <div className="text-xs font-mono text-cyan-300 font-bold">SMART CORRIDOR</div>
                  <h3 className="text-2xl font-black text-white">{city.name}</h3>
                  <p className="text-xs text-slate-300 line-clamp-2">{city.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Bloomberg Urban Mobility Media Grid (Matching Screenshot 3) */}
      <section className="space-y-6 border-t border-slate-800/80 pt-12">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-xs font-mono font-bold text-pink-400 uppercase tracking-widest">MEDIA & INSIGHTS</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-display mt-1">Urban Mobility Dispatch</h2>
          </div>
          <Link to="/analytics" className="text-xs font-bold text-cyan-300 hover:underline">
            View All Reports →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bloombergMediaGrid.map((news, index) => (
            <Link
              key={index}
              to={news.route}
              className="group bg-slate-900/90 rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-400/40 transition-all flex flex-col justify-between"
            >
              <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                <img
                  src={news.bgImage}
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono font-bold text-cyan-300">
                  {news.category}
                </div>
              </div>
              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                  {news.title}
                </h3>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                  <span>Raah-Setu Research</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SmartCitySolutionsGrid;
