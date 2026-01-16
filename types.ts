export enum RepaymentMethod {
  EqualPrincipalAndInterest = 'equal_principal_interest', // 本息平均攤還
  EqualPrincipal = 'equal_principal', // 本金平均攤還
}

export interface LoanParams {
  totalAmount: number; // In Wan (萬)
  interestRate: number; // Percentage
  periodYears: number;
  gracePeriodYears: number;
  method: RepaymentMethod;
}

export interface MonthlyRecord {
  month: number;
  principalPaid: number;
  interestPaid: number;
  totalPaid: number;
  remainingBalance: number;
}

export interface CalculationResult {
  monthlyRecords: MonthlyRecord[];
  totalInterest: number;
  totalPayment: number;
  monthlyPaymentMin: number;
  monthlyPaymentMax: number;
  isGracePeriodActive: boolean;
}