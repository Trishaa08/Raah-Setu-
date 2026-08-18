import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Cell 
} from 'recharts';
import { peakHoursDistribution } from '../../data/analyticsData';
import { BarChart3 } from 'lucide-react';

const PeakHourBarChart = ({ height = 280 }) => {
  return (
    <div className="rounded-3xl bg-slate-900/80 p-6 border border-cyan-400/20 shadow-xl backdrop-blur-md text-white">
      <div className="flex items-center justify-between pb-3.5 mb-2 border-b border-slate-800">
        <div>
          <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2 font-display">
            <BarChart3 className="w-4 h-4 text-pink-400" />
            Peak Congestion Windows & Hourly Volume
          </h4>
          <p className="text-xs text-slate-400">Total peak corridor vehicles across key traffic hours</p>
        </div>
        <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800">
          Aggregated Metric
        </span>
      </div>

      <div style={{ height, width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={peakHoursDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
            <XAxis
              dataKey="hour"
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#334155' }}
            />
            <YAxis
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              unit=" veh"
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="p-3.5 rounded-2xl bg-slate-950 text-white border border-slate-800 shadow-2xl text-xs font-mono">
                      <div className="font-bold mb-1 text-cyan-300">Time: {label}</div>
                      <div className="text-white">
                        Volume: <strong className="text-cyan-400">{payload[0]?.value?.toLocaleString()}</strong> veh/hr
                      </div>
                      <div className="text-pink-400">
                        Congestion: {payload[0]?.payload?.congestion}% ({payload[0]?.payload?.level})
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="volume" radius={[8, 8, 0, 0]}>
              {peakHoursDistribution.map((entry, index) => {
                const color = entry.congestion >= 85 ? '#EF4444' : entry.congestion >= 65 ? '#F59E0B' : '#06B6D4';
                return <Cell key={`cell-${index}`} fill={color} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PeakHourBarChart;
