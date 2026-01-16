import { LoanParams, RepaymentMethod, CalculationResult, MonthlyRecord } from '../types';

export const calculateMortgage = (params: LoanParams): CalculationResult => {
  const { totalAmount, interestRate, periodYears, gracePeriodYears, method } = params;

  // Convert inputs to calculation units
  // Total loan amount in TWD (input is in Wan/10k)
  const principal = totalAmount * 10000;
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = periodYears * 12;
  const graceMonths = gracePeriodYears * 12;

  let monthlyRecords: MonthlyRecord[] = [];
  let currentBalance = principal;
  let totalInterest = 0;
  let totalPayment = 0;

  // For min/max monthly payment display
  let minPayment = Number.MAX_VALUE;
  let maxPayment = 0;

  // Loop through each month
  for (let month = 1; month <= totalMonths; month++) {
    let interestPaid = 0;
    let principalPaid = 0;
    let totalPaid = 0;

    // Calculate Interest for this month
    interestPaid = Math.round(currentBalance * monthlyRate);

    if (month <= graceMonths) {
      // Grace Period: Pay only interest
      principalPaid = 0;
      totalPaid = interestPaid;
    } else {
      // Post-Grace Period Calculation
      const remainingMonths = totalMonths - graceMonths;
      const monthsElapsedSinceGrace = month - graceMonths;

      if (method === RepaymentMethod.EqualPrincipalAndInterest) {
        // 本息平均攤還 (Annuity)
        // Formula: PMT = P * (r(1+r)^n) / ((1+r)^n - 1)
        // Here P is the principal at start of amortization period (which is original principal if grace period just ended)
        // But since we are calculating month by month, let's use the formula based on original principal at start of amortization
        
        // We only calculate the fixed payment once per amortization period start
        const loanAmountForAmortization = principal; // Since no principal paid during grace period
        
        const numerator = loanAmountForAmortization * monthlyRate * Math.pow(1 + monthlyRate, remainingMonths);
        const denominator = Math.pow(1 + monthlyRate, remainingMonths) - 1;
        const fixedPayment = Math.round(numerator / denominator);
        
        totalPaid = fixedPayment;
        // Correction for last month to match exactly 0 balance usually, 
        // but strictly following standard: Interest is calculated on balance, Principal is diff.
        
        interestPaid = Math.round(currentBalance * monthlyRate);
        principalPaid = totalPaid - interestPaid;
        
        // Adjust for last month rounding
        if (month === totalMonths) {
             principalPaid = currentBalance;
             totalPaid = principalPaid + interestPaid;
        }

      } else {
        // 本金平均攤還 (Linear Gradient)
        // Principal is fixed: P / n
        const fixedPrincipal = Math.ceil(principal / remainingMonths);
        
        principalPaid = fixedPrincipal;
        
        // Ensure we don't overpay principal in the last month
        if (currentBalance < principalPaid) {
          principalPaid = currentBalance;
        }
        
        totalPaid = principalPaid + interestPaid;
      }
    }

    // Update state
    currentBalance -= principalPaid;
    if (currentBalance < 0) currentBalance = 0;

    totalInterest += interestPaid;
    totalPayment += totalPaid;

    if (totalPaid < minPayment) minPayment = totalPaid;
    if (totalPaid > maxPayment) maxPayment = totalPaid;

    monthlyRecords.push({
      month,
      principalPaid,
      interestPaid,
      totalPaid,
      remainingBalance: currentBalance,
    });
  }

  return {
    monthlyRecords,
    totalInterest,
    totalPayment,
    monthlyPaymentMin: minPayment,
    monthlyPaymentMax: maxPayment,
    isGracePeriodActive: gracePeriodYears > 0,
  };
};

export const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: 'TWD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(val);
};

export const formatWan = (val: number) => {
    if (val >= 10000) {
        const yi = Math.floor(val / 10000);
        const wan = val % 10000;
        return wan > 0 ? `${yi}億${wan}萬` : `${yi}億`;
    }
    return `${val}萬`;
}