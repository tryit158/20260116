import React from 'react';
import { CalculationResult, RepaymentMethod } from '../types';
import { formatCurrency } from '../utils/mortgageCalculator';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface SummaryCardProps {
  result: CalculationResult;
  totalLoanAmountWan: number;
}

const COLORS = ['#3b82f6', '#f59e0b']; // Blue for Principal, Amber for Interest

export const SummaryCard: React.FC<SummaryCardProps> = ({ result, totalLoanAmountWan }) => {
  const principalTotal = totalLoanAmountWan * 10000;
  
  const chartData = [
    { name: '貸款本金', value: principalTotal },
    { name: '總利息', value: result.totalInterest },
  ];

  const isFixedPayment = result.monthlyPaymentMin === result.monthlyPaymentMax;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="w-1 h-6 bg-blue-600 rounded-full mr-3"></span>
        試算結果分析
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: Key Figures */}
        <div className="space-y-6">
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-sm text-blue-600 mb-1 font-medium">每月應繳金額 (參考)</p>
                <p className="text-3xl font-bold text-blue-900">
                  {isFixedPayment 
                    ? formatCurrency(result.monthlyPaymentMin)
                    : `${formatCurrency(result.monthlyPaymentMin)} ~ ${formatCurrency(result.monthlyPaymentMax)}`
                  }
                </p>
                {result.isGracePeriodActive && (
                    <p className="text-xs text-blue-500 mt-2">
                        *含寬限期，前期僅需繳納利息
                    </p>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">貸款總額</p>
                    <p className="text-lg font-semibold text-gray-900">{formatCurrency(principalTotal)}</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                    <p className="text-xs text-amber-600 mb-1">總利息支出</p>
                    <p className="text-lg font-semibold text-amber-900">{formatCurrency(result.totalInterest)}</p>
                </div>
                <div className="col-span-2 p-3 bg-gray-50 rounded-lg border border-gray-100 flex justify-between items-center">
                    <div>
                        <p className="text-xs text-gray-500">本息合計</p>
                        <p className="text-xl font-bold text-gray-900">{formatCurrency(result.totalPayment)}</p>
                    </div>
                    <div className="text-right">
                         <span className="text-xs px-2 py-1 bg-gray-200 text-gray-600 rounded-full">
                            利息佔比 {((result.totalInterest / result.totalPayment) * 100).toFixed(1)}%
                         </span>
                    </div>
                </div>
            </div>
        </div>

        {/* Right: Pie Chart */}
        <div className="h-64 w-full flex flex-col justify-center items-center relative">
           <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                 formatter={(value: number) => formatCurrency(value)}
                 contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
          {/* Center Text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center mt-[-30px]">
                  <p className="text-xs text-gray-400">總還款</p>
                  <p className="text-sm font-bold text-gray-700">100%</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};