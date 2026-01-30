
export interface FinancialData {
  revenue: number;
  expenses: number;
  cashFlow: number[];
  accountsReceivable: number;
  accountsPayable: number;
  inventory: number;
  loans: number;
  creditScore: number;
}

export interface BusinessProfile {
  businessName: string;
  ownerName: string;
  industry: 'Manufacturing' | 'Retail' | 'Logistics' | 'E-commerce' | 'Services' | 'Agriculture';
  businessType: 'Proprietorship' | 'Partnership' | 'Private Limited' | 'LLP';
  location: string;
  yearsInOperation: number;
  employees: number;
  annualTurnover: number;
  language: 'en' | 'hi';
}

export interface FinancialProduct {
  product: string;
  provider: string;
  interestRate: string;
  reason: string;
}

export interface AIAnalysisResult {
  healthScore: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  insights: string[];
  recommendations: string[];
  forecasting: { month: string; value: number }[];
  creditRating: string;
  taxStatus: string;
  benchmarking?: string;
  optimization?: string;
  financialProducts?: FinancialProduct[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
}
