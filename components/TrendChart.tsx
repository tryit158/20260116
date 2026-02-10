import React from 'react';
import { MonthlyRecord } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../utils/mortgageCalculator';

interface TrendChartProps {
  records: MonthlyRecord[];
}

export const TrendChart: React.FC<TrendChartProps> = ({ records }) => {
  // Downsample data for better chart performance if too many points (e.g., > 120 months)
  // But for precision, we can keep all. Let's just use every 12th month for X-axis ticks to avoid clutter.
  
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-6">還款趨勢圖</h2>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={records}
            margin={{
              top: 10,
              right: 0,
              left: 35,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
                dataKey="month" 
                tick={{fontSize: 12, fill: '#9ca3af'}} 
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `第${val}期`}
                interval={Math.floor(records.length / 5)}
            />
            <YAxis 
                tick={{fontSize: 12, fill: '#9ca3af'}} 
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `${val/10000}萬`}
            />
            <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                labelStyle={{ color: '#6b7280', marginBottom: '0.5rem' }}
                labelFormatter={(label) => `第 ${label} 期`}
            />
            <Area 
                type="monotone" 
                dataKey="remainingBalance" 
                name="剩餘本金"
                stroke="#3b82f6" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorBalance)" 
            />
             <Area 
                type="monotone" 
                dataKey="interestPaid" 
                name="當期利息"
                stroke="#f59e0b" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorInterest)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center mt-4 gap-6 text-sm">
        <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
            <span className="text-gray-600">剩餘本金</span>
        </div>
        <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-amber-500 mr-2"></span>
            <span className="text-gray-600">當期利息</span>
        </div>
      </div>
    </div>
  );
};