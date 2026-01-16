import React, { useState } from 'react';
import { MonthlyRecord } from '../types';
import { formatCurrency } from '../utils/mortgageCalculator';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AmortizationTableProps {
  records: MonthlyRecord[];
}

export const AmortizationTable: React.FC<AmortizationTableProps> = ({ records }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [displayCount, setDisplayCount] = useState(12);

  const displayedRecords = isExpanded ? records : records.slice(0, displayCount);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-6">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-800">每月還款明細</h2>
        <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
            共 {records.length} 期
        </span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-3 font-medium whitespace-nowrap">期數</th>
              <th className="px-6 py-3 font-medium text-blue-600 whitespace-nowrap">本期應繳</th>
              <th className="px-6 py-3 font-medium whitespace-nowrap">償還本金</th>
              <th className="px-6 py-3 font-medium whitespace-nowrap">償還利息</th>
              <th className="px-6 py-3 font-medium text-gray-400 whitespace-nowrap">剩餘本金</th>
            </tr>
          </thead>
          <tbody>
            {displayedRecords.map((record) => (
              <tr key={record.month} className="bg-white border-b border-gray-50 hover:bg-blue-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">
                    第 {record.month} 期
                </td>
                <td className="px-6 py-4 font-bold text-blue-600">
                  {formatCurrency(record.totalPaid)}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {formatCurrency(record.principalPaid)}
                </td>
                <td className="px-6 py-4 text-amber-600">
                  {formatCurrency(record.interestPaid)}
                </td>
                <td className="px-6 py-4 text-gray-400">
                  {formatCurrency(record.remainingBalance)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!isExpanded && records.length > displayCount && (
        <div className="p-4 bg-gray-50 text-center border-t border-gray-100">
          <button 
            onClick={() => setIsExpanded(true)}
            className="text-blue-600 font-medium hover:text-blue-800 flex items-center justify-center mx-auto transition-colors"
          >
            查看全部期數 <ChevronDown className="w-4 h-4 ml-1" />
          </button>
        </div>
      )}
      
      {isExpanded && (
         <div className="p-4 bg-gray-50 text-center border-t border-gray-100">
          <button 
            onClick={() => setIsExpanded(false)}
            className="text-gray-500 font-medium hover:text-gray-700 flex items-center justify-center mx-auto transition-colors"
          >
            收合明細 <ChevronUp className="w-4 h-4 ml-1" />
          </button>
        </div>
      )}
    </div>
  );
};