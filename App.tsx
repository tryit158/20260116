import React, { useState, useMemo } from 'react';
import { LoanParams, RepaymentMethod } from './types';
import { calculateMortgage } from './utils/mortgageCalculator';
import { InputForm } from './components/InputForm';
import { SummaryCard } from './components/SummaryCard';
import { AmortizationTable } from './components/AmortizationTable';
import { TrendChart } from './components/TrendChart';
import { Building2 } from 'lucide-react';

const App: React.FC = () => {
  // Default values tailored for Taiwan market (e.g., 1000W, 30 years, 2.06% rate)
  const [params, setParams] = useState<LoanParams>({
    totalAmount: 1200, // 1200萬
    interestRate: 2.185, // Common floor rate
    periodYears: 30,
    gracePeriodYears: 3,
    method: RepaymentMethod.EqualPrincipalAndInterest,
  });

  // Recalculate whenever params change
  const result = useMemo(() => calculateMortgage(params), [params]);

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="bg-blue-600 p-2 rounded-lg">
                    <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-gray-900 tracking-tight">台灣房貸試算神器</h1>
                    <p className="text-xs text-gray-500 hidden sm:block">快速計算月付金、總利息與攤還明細</p>
                </div>
            </div>
            <a 
                href="#" 
                className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                onClick={(e) => e.preventDefault()}
            >
                關於計算機
            </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Sidebar / Input Section */}
            <div className="lg:col-span-4 space-y-6">
                <InputForm params={params} onChange={setParams} />
                
                {/* Info Card */}
                <div className="bg-blue-50 rounded-xl p-5 border border-blue-100 text-sm text-blue-800 space-y-2">
                    <p className="font-bold">💡 購屋小知識</p>
                    <p>目前台灣首購族地板利率約為 2.185%。若使用寬限期，前期資金壓力較小，但寬限期後月付金會顯著增加，請審慎評估。</p>
                </div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-8">
                <SummaryCard result={result} totalLoanAmountWan={params.totalAmount} />
                
                <TrendChart records={result.monthlyRecords} />

                <AmortizationTable records={result.monthlyRecords} />
                
                <p className="text-center text-xs text-gray-400 mt-8">
                    *本試算結果僅供參考，實際貸款金額、利率及月付金以銀行最終核貸方案為準。
                </p>
            </div>
        </div>
      </main>
    </div>
  );
};

export default App;