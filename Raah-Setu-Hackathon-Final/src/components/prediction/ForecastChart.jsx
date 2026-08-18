import React from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ReferenceLine 
} from 'recharts';
import { Activity } from 'lucide-react';

const ForecastChart = ({ data, height = 260 }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="rounded-3xl bg-slate-900/80 p-6 border border-cyan-400/20 shadow-xl backdrop-blur-md text-white">
      <div className="flex items-center justify-between pb-3.5 mb-2 border-b border-slate-800">
        <div>
          <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2 font-display">
            <Activity className="w-4 h-4 text-cyan-400" />
            Traffic Flow Forecast Horizon (Vehicles / Hour)
          </h4>
          <p className="text-xs text-slate-400">Comparing current baseline against forecasted peak buildup</p>
        </div>
        <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800">
          Accuracy: 91.4%
        </span>
      </div>

      <div style={{ height, width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
            <XAxis
              dataKey="horizon"
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
              domain={['auto', 'auto']}
              unit=" veh"
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="p-3.5 rounded-2xl bg-slate-950 text-white border border-slate-800 shadow-2xl text-xs font-mono">
                      <div className="font-bold mb-1 text-cyan-300">Horizon: {label}</div>
                      <div className="text-white">
                        Rate: <strong className="text-cyan-400">{payload[0]?.value?.toLocaleString()}</strong> veh/hr
                      </div>
                      <div className="text-pink-400">
                        Congestion: {payload[0]?.payload?.congestion}%
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <ReferenceLine y={4500} stroke="#EF4444" strokeDasharray="3 3" label={{ value: 'Capacity Limit (4,500/hr)', fill: '#F87171', fontSize: 10 }} />
            <Line
              type="monotone"
              dataKey="vehiclesPerHour"
              name="Flow Rate"
              stroke="#06B6D4"
              strokeWidth={3}
              dot={{ r: 5, fill: '#06B6D4', stroke: '#08111E', strokeWidth: 2 }}
              activeDot={{ r: 7, fill: '#38BDF8', stroke: '#FFFFFF', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ForecastChart;
