import React from 'react';
import { LoanParams, RepaymentMethod } from '../types';
import { formatWan } from '../utils/mortgageCalculator';
import { DollarSign, Percent, Calendar, Clock, Calculator, Sparkles } from 'lucide-react';

interface InputFormProps {
  params: LoanParams;
  onChange: (newParams: LoanParams) => void;
}

const PRESETS = [
  {
    name: '新青安專案 (40年)',
    description: '政府優惠房貸，5年寬限期，減輕首購壓力',
    params: {
      totalAmount: 1000,
      interestRate: 1.775, // 2.185 - subsidy (approx 0.41 difference in some periods, but effectively 1.775 for eligible) - Keeping simple or using market floor. Let's use 1.775 as the attractive rate people look for.
      periodYears: 40,
      gracePeriodYears: 5,
      method: RepaymentMethod.EqualPrincipalAndInterest,
    }
  },
  {
    name: '一般首購 (30年)',
    description: '常見銀行房貸方案，收支平衡',
    params: {
      totalAmount: 1200,
      interestRate: 2.185,
      periodYears: 30,
      gracePeriodYears: 3,
      method: RepaymentMethod.EqualPrincipalAndInterest,
    }
  },
  {
    name: '保守理財 (20年)',
    description: '不使用寬限期，快速還款省利息',
    params: {
      totalAmount: 1000,
      interestRate: 2.35,
      periodYears: 20,
      gracePeriodYears: 0,
      method: RepaymentMethod.EqualPrincipal,
    }
  }
];

export const InputForm: React.FC<InputFormProps> = ({ params, onChange }) => {
  const handleChange = (field: keyof LoanParams, value: any) => {
    onChange({ ...params, [field]: value });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <Calculator className="w-5 h-5 mr-2 text-blue-600" />
        貸款條件設定
      </h2>

      {/* Quick Scenarios */}
      <div className="mb-6 bg-blue-50/50 p-4 rounded-xl border border-blue-100/50">
        <label className="block text-xs font-bold text-blue-800 mb-3 flex items-center">
            <Sparkles className="w-3 h-3 mr-1 text-blue-600" />
            快速帶入常見情境
        </label>
        <div className="grid grid-cols-1 gap-2">
            {PRESETS.map((preset) => (
                <button
                    key={preset.name}
                    onClick={() => onChange(preset.params)}
                    className="group flex items-center justify-between p-3 rounded-lg bg-white border border-blue-100 hover:border-blue-400 hover:shadow-sm transition-all text-left"
                >
                    <div>
                        <span className="block text-sm font-bold text-gray-800 group-hover:text-blue-700">{preset.name}</span>
                        <span className="block text-xs text-gray-500 mt-1">{preset.description}</span>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <span className="text-xs">➜</span>
                    </div>
                </button>
            ))}
        </div>
      </div>

      <hr className="border-gray-100 mb-6" />

      <div className="space-y-6">
        {/* Loan Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex justify-between">
             <span className="flex items-center text-gray-600"><DollarSign className="w-4 h-4 mr-1"/>貸款金額</span>
             <span className="text-blue-600 font-bold text-lg">{formatWan(params.totalAmount)}</span>
          </label>
          <div className="flex items-center space-x-4">
             <input
                type="range"
                min="100"
                max="5000"
                step="10"
                value={params.totalAmount}
                onChange={(e) => handleChange('totalAmount', Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
             />
             <div className="relative w-28">
                 <input
                    type="number"
                    value={params.totalAmount}
                    onChange={(e) => handleChange('totalAmount', Number(e.target.value))}
                    className="w-full p-2 pr-8 border border-gray-300 rounded-lg text-right focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                 />
                 <span className="absolute right-3 top-2 text-gray-400 text-sm">萬</span>
             </div>
          </div>
        </div>

        {/* Period Years */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex justify-between">
            <span className="flex items-center text-gray-600"><Calendar className="w-4 h-4 mr-1"/>貸款期限</span>
            <span className="text-blue-600 font-bold text-lg">{params.periodYears} 年</span>
          </label>
           <div className="flex items-center space-x-4">
            <input
                type="range"
                min="1"
                max="40"
                step="1"
                value={params.periodYears}
                onChange={(e) => handleChange('periodYears', Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="relative w-28">
                <input
                    type="number"
                    max="50"
                    value={params.periodYears}
                    onChange={(e) => handleChange('periodYears', Number(e.target.value))}
                    className="w-full p-2 pr-8 border border-gray-300 rounded-lg text-right focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <span className="absolute right-3 top-2 text-gray-400 text-sm">年</span>
            </div>
          </div>
          <div className="flex gap-2 mt-2">
              {[20, 30, 40].map(yr => (
                  <button 
                    key={yr}
                    onClick={() => handleChange('periodYears', yr)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${params.periodYears === yr ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'}`}
                  >
                      {yr}年
                  </button>
              ))}
          </div>
        </div>

        {/* Interest Rate */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex justify-between">
            <span className="flex items-center text-gray-600"><Percent className="w-4 h-4 mr-1"/>年利率</span>
            <span className="text-blue-600 font-bold text-lg">{params.interestRate}%</span>
          </label>
          <div className="flex items-center space-x-4">
            <input
                type="range"
                min="1.0"
                max="4.0"
                step="0.005"
                value={params.interestRate}
                onChange={(e) => handleChange('interestRate', Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="relative w-28">
                <input
                    type="number"
                    step="0.001"
                    value={params.interestRate}
                    onChange={(e) => handleChange('interestRate', Number(e.target.value))}
                    className="w-full p-2 pr-8 border border-gray-300 rounded-lg text-right focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <span className="absolute right-3 top-2 text-gray-400 text-sm">%</span>
            </div>
          </div>
           <div className="flex gap-2 mt-2 flex-wrap">
              {[1.775, 2.185, 2.4, 2.6].map(r => (
                  <button 
                    key={r}
                    onClick={() => handleChange('interestRate', r)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${params.interestRate === r ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'}`}
                  >
                      {r}%
                  </button>
              ))}
          </div>
        </div>

        {/* Grace Period */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex justify-between">
             <span className="flex items-center text-gray-600"><Clock className="w-4 h-4 mr-1"/>寬限期</span>
             <span className={`font-bold text-lg ${params.gracePeriodYears > 0 ? 'text-amber-600' : 'text-gray-400'}`}>
                {params.gracePeriodYears > 0 ? `${params.gracePeriodYears} 年` : '無'}
             </span>
          </label>
           <div className="flex items-center space-x-4">
             <input
                type="range"
                min="0"
                max="5"
                step="1"
                value={params.gracePeriodYears}
                onChange={(e) => handleChange('gracePeriodYears', Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
             />
             <select
                value={params.gracePeriodYears}
                onChange={(e) => handleChange('gracePeriodYears', Number(e.target.value))}
                className="w-28 p-2 border border-gray-300 rounded-lg text-right focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white cursor-pointer"
             >
                <option value={0}>無寬限期</option>
                {[1,2,3,4,5].map(y => <option key={y} value={y}>{y} 年</option>)}
             </select>
           </div>
           <p className="text-xs text-gray-500 mt-2 bg-gray-50 p-2 rounded">
             {params.gracePeriodYears > 0 
                ? '⚠️ 寬限期內僅需繳納利息，之後月付金會大幅增加。' 
                : '寬限期可減輕前期壓力，但會增加總利息支出。'}
           </p>
        </div>

        {/* Repayment Method */}
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">還款方式</label>
            <div className="grid grid-cols-2 gap-3">
                <button
                    onClick={() => handleChange('method', RepaymentMethod.EqualPrincipalAndInterest)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-all text-left ${
                        params.method === RepaymentMethod.EqualPrincipalAndInterest
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-200 ring-offset-1'
                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                    }`}
                >
                    本息平均攤還
                    <span className={`block text-[11px] font-normal mt-1 ${params.method === RepaymentMethod.EqualPrincipalAndInterest ? 'text-blue-100' : 'text-gray-400'}`}>
                        每月繳款金額固定，適合薪水固定的上班族
                    </span>
                </button>
                <button
                    onClick={() => handleChange('method', RepaymentMethod.EqualPrincipal)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-all text-left ${
                        params.method === RepaymentMethod.EqualPrincipal
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-200 ring-offset-1'
                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                    }`}
                >
                    本金平均攤還
                    <span className={`block text-[11px] font-normal mt-1 ${params.method === RepaymentMethod.EqualPrincipal ? 'text-blue-100' : 'text-gray-400'}`}>
                        每月繳款金額遞減，總利息較省，前期壓力大
                    </span>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};