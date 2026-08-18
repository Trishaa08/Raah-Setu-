import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { densityHistory24h } from '../../data/analyticsData';
import { Activity } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3.5 rounded-2xl bg-slate-900 text-white shadow-2xl text-xs space-y-1">
        <div className="font-bold border-b border-slate-700 pb-1 flex justify-between gap-4">
          <span>Time: {label}</span>
          <span className="text-pink-400 font-mono">Live Sync</span>
        </div>
        <div className="flex justify-between gap-3 text-blue-400 font-semibold">
          <span>Actual Flow:</span>
          <strong className="font-mono">{payload[0]?.value}%</strong>
        </div>
        {payload[1] && (
          <div className="flex justify-between gap-3 text-indigo-300 font-semibold">
            <span>AI Forecast:</span>
            <strong className="font-mono">{payload[1]?.value}%</strong>
          </div>
        )}
      </div>
    );
  }
  return null;
};

const TrafficDensityChart = ({ title = "Citywide Traffic Density (24h Trend)", height = 280 }) => {
  return (
    <div className="rounded-2xl bg-white p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-2 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-600" />
            {title}
          </h3>
          <p className="text-xs text-slate-500">Comparing real-time flow against neural prediction curve</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-blue-600">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Current Flow
          </span>
          <span className="flex items-center gap-1.5 text-indigo-600">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> AI Forecast
          </span>
        </div>
      </div>

      <div style={{ height, width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={densityHistory24h} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorDensityLight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorPredictedLight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis
              dataKey="time"
              stroke="#94A3B8"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#E2E8F0' }}
            />
            <YAxis
              stroke="#94A3B8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              unit="%"
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="density"
              name="Current Density"
              stroke="#2563EB"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorDensityLight)"
            />
            <Area
              type="monotone"
              dataKey="predicted"
              name="AI Predicted"
              stroke="#6366F1"
              strokeWidth={2}
              strokeDasharray="4 4"
              fillOpacity={1}
              fill="url(#colorPredictedLight)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrafficDensityChart;
