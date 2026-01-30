
import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, Loader2, Database } from 'lucide-react';
import { FinancialData } from '../types';

interface FileUploadProps {
  onDataExtracted: (data: FinancialData) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onDataExtracted }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const mockSMEData: FinancialData = {
    revenue: 1250000,
    expenses: 980000,
    cashFlow: [10000, 15000, -2000, 8000, 12000, 18000],
    accountsReceivable: 45000,
    accountsPayable: 32000,
    inventory: 150000,
    loans: 200000,
    creditScore: 820
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    simulateAnalysis(mockSMEData);
  };

  const handleSampleData = () => {
    simulateAnalysis(mockSMEData);
  };

  const simulateAnalysis = (data: FinancialData) => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setIsComplete(true);
      onDataExtracted(data);
    }, 2000);
  };

  return (
    <div className="glass-card rounded-3xl p-12 max-w-2xl mx-auto text-center border-dashed border-2 border-white/10 hover:border-blue-500/30 transition-all group">
      <div className="mb-6 flex justify-center">
        {isComplete ? (
          <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center animate-bounce">
            <CheckCircle size={32} />
          </div>
        ) : isUploading ? (
          <div className="w-16 h-16 text-blue-500 flex items-center justify-center">
            <Loader2 size={32} className="animate-spin" />
          </div>
        ) : (
          <div className="w-16 h-16 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all">
            <Upload size={32} />
          </div>
        )}
      </div>

      <h2 className="text-2xl font-bold mb-2">Upload Financial Statements</h2>
      <p className="text-slate-400 mb-8 max-w-sm mx-auto">
        Import your GST returns, bank statements (PDF/CSV), or Profit & Loss accounts for instant AI analysis.
      </p>

      <div className="flex flex-col items-center gap-4">
        <label className="relative inline-block w-full max-w-xs">
          <input 
            type="file" 
            className="hidden" 
            onChange={handleFileChange} 
            accept=".pdf,.xlsx,.csv"
            disabled={isUploading}
          />
          <div className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium cursor-pointer transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2">
            {isUploading ? 'Analyzing Data...' : 'Select Files to Upload'}
          </div>
        </label>

        <button 
          onClick={handleSampleData}
          disabled={isUploading}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-all text-sm font-medium border border-white/10 px-6 py-2 rounded-xl hover:bg-white/5"
        >
          <Database size={16} />
          Try with Sample SME Data
        </button>
      </div>

      <div className="mt-12 grid grid-cols-3 gap-4 text-slate-500 text-[10px] uppercase tracking-widest font-bold">
        <div className="flex flex-col items-center gap-2 opacity-60">
          <FileText size={16} /> GSTR-3B Auto
        </div>
        <div className="flex flex-col items-center gap-2 opacity-60">
          <FileText size={16} /> Bank Sync
        </div>
        <div className="flex flex-col items-center gap-2 opacity-60">
          <FileText size={16} /> Ledger Analysis
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
