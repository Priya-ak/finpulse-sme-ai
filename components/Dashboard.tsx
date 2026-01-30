
import React from 'react';
import { 
  Bell, 
  MessageSquare, 
  Calendar as CalendarIcon, 
  ArrowUpRight, 
  TrendingUp,
  CreditCard,
  Target,
  FileDown,
  ShieldCheck,
  Zap,
  Languages,
  Banknote,
  Briefcase
} from 'lucide-react';
import AIAssistantCard from './AIAssistantCard';
import { RevenueTrendChart, SalesBarChart, CreditRateGauge } from './Charts';
import { AIAnalysisResult } from '../types';

interface DashboardProps {
  user: any;
  analysis: AIAnalysisResult | null;
  language: 'en' | 'hi';
  toggleLanguage: () => void;
  businessName?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ user, analysis, language, toggleLanguage, businessName }) => {
  const forecastData = analysis?.forecasting || [];
  
  const generateReport = () => {
    alert("Generating Investor-Ready PDF Report... This includes P&L summaries, cash flow forecasts, and credit risk assessment.");
  };

  const summaryText = analysis ? 
    (language === 'hi' 
      ? `नमस्ते ${user.name}, ${businessName || 'आपका व्यवसाय'} विश्लेषण रिपोर्ट तैयार है। स्वास्थ्य स्कोर ${analysis.healthScore} है। क्रेडिट रेटिंग ${analysis.creditRating} है। ${analysis.insights[0]}`
      : `Hi ${user.name}, analysis for ${businessName || 'your enterprise'} is complete. Health score: ${analysis.healthScore}. Credit Rating: ${analysis.creditRating}. ${analysis.insights[0]}`)
    : "";

  return (
    <div className="flex-1 p-4 md:p-8 max-w-[1600px] mx-auto overflow-y-auto pb-20">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">{businessName || 'Enterprise Dashboard'}</h1>
          <p className="text-slate-500 mt-1 uppercase tracking-widest text-[10px] font-bold">
            {language === 'hi' ? 'स्वागत है' : 'Welcome back'}, {user.name}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 bg-white/5 border border-white/10 text-slate-300 px-4 py-2.5 rounded-xl font-medium hover:bg-white/10 transition-all text-sm"
          >
            <Languages size={16} />
            {language === 'en' ? 'हिन्दी' : 'English'}
          </button>
          
          <button 
            onClick={generateReport}
            className="flex items-center gap-2 bg-blue-600/10 border border-blue-500/20 text-blue-400 px-5 py-2.5 rounded-xl font-medium hover:bg-blue-600/20 transition-all text-sm"
          >
            <FileDown size={16} />
            {language === 'hi' ? 'रिपोर्ट' : 'Export Report'}
          </button>

          <div className="flex items-center gap-3 bg-[#0a0c10] p-1.5 rounded-2xl border border-white/5 ml-2">
            <button className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all relative">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-blue-500 rounded-full border-2 border-[#0a0c10]"></span>
            </button>
            <div className="h-8 w-px bg-white/5 mx-1"></div>
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
              alt="Avatar" 
              className="w-8 h-8 rounded-xl bg-slate-800"
            />
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - AI Assistant */}
        <div className="lg:col-span-4">
          <AIAssistantCard summary={summaryText} />
        </div>

        {/* Right Columns */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card rounded-[2.5rem] p-8 flex flex-col min-h-[300px]">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/5 rounded-2xl text-blue-400">
                    <TrendingUp size={24} />
                  </div>
                  <span className="text-slate-400 font-medium">{language === 'hi' ? 'स्वास्थ्य स्कोर' : 'Health Score'}</span>
                </div>
                <div className="text-[10px] font-black text-blue-400 px-3 py-1 bg-blue-500/10 rounded-full uppercase tracking-widest">
                  {analysis?.riskLevel || 'N/A'} {language === 'hi' ? 'जोखिम' : 'RISK'}
                </div>
              </div>
              <div className="mt-6">
                <h2 className="text-6xl font-bold tracking-tight">{analysis?.healthScore || '0'}<span className="text-2xl text-slate-600">/100</span></h2>
              </div>
              <div className="mt-8 space-y-3">
                {analysis?.insights.map((insight, idx) => (
                  <div key={idx} className="flex gap-3 text-sm text-slate-400 bg-white/5 p-3 rounded-xl border border-white/5">
                    <Zap className="text-yellow-500 shrink-0" size={16} />
                    {insight}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="glass-card rounded-[2.5rem] p-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 font-medium">{language === 'hi' ? 'क्रेडिट रेटिंग' : 'Credit rating'}</span>
                  <span className="text-2xl font-bold text-white tracking-tight">{analysis?.creditRating || '--'}</span>
                </div>
                <CreditRateGauge score={analysis?.healthScore ? analysis.healthScore * 10 : 0} />
              </div>

              <div className="glass-card rounded-[2.5rem] p-6 bg-green-500/5 border-green-500/10">
                <div className="flex items-center gap-3 mb-2">
                  <ShieldCheck className="text-green-500" size={20} />
                  <span className="text-slate-200 font-bold uppercase text-[10px] tracking-widest">{language === 'hi' ? 'अनुपालन स्थिति' : 'Compliance Check'}</span>
                </div>
                <p className="text-sm text-green-300 font-medium leading-snug">
                  {analysis?.taxStatus || (language === 'hi' ? "डेटा अपलोड की प्रतीक्षा है..." : "Awaiting Data...")}
                </p>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-[2.5rem] p-8">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/5 rounded-2xl">
                  <Target className="text-slate-400" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{language === 'hi' ? 'उद्योग बेंचमार्किंग' : 'Industry Benchmarking'}</h3>
                  <p className="text-xs text-slate-500">{analysis?.benchmarking || "Analyzing competitive landscape..."}</p>
                </div>
              </div>
            </div>

            <RevenueTrendChart data={forecastData} />
            <p className="text-center text-[10px] text-slate-600 uppercase tracking-widest font-bold mt-4">6-Month Revenue Forecast (AI Projected)</p>
          </div>

          {/* Financial Products Section */}
          <div className="glass-card rounded-[2.5rem] p-8">
            <div className="flex items-center gap-3 mb-6">
               <div className="p-3 bg-blue-600/10 rounded-2xl">
                  <Banknote className="text-blue-400" size={24} />
               </div>
               <div>
                  <h3 className="text-lg font-bold">{language === 'hi' ? 'अनुशंसित उत्पाद' : 'Recommended Products'}</h3>
                  <p className="text-xs text-slate-500">Curated bank & NBFC offers based on your health score</p>
               </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysis?.financialProducts?.map((product, idx) => (
                <div key={idx} className="bg-white/5 border border-white/5 rounded-2xl p-5 hover:border-blue-500/30 transition-all group">
                   <div className="flex justify-between items-start mb-2">
                     <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors">{product.product}</h4>
                     <span className="text-xs font-black text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">{product.interestRate}</span>
                   </div>
                   <p className="text-xs text-slate-500 font-medium mb-3">{product.provider}</p>
                   <p className="text-xs text-slate-400 leading-relaxed italic">{product.reason}</p>
                </div>
              )) || <p className="text-slate-500 text-sm italic">Analyze your data to see offers.</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card rounded-[2.5rem] p-8 border-blue-500/20">
               <h4 className="text-blue-400 font-bold text-[10px] uppercase tracking-widest mb-4">{language === 'hi' ? 'पूँजी रणनीति' : 'Working Capital Strategy'}</h4>
               <p className="text-slate-300 text-sm leading-relaxed">
                 {analysis?.optimization || "No data to calculate optimization yet."}
               </p>
            </div>
            <div className="glass-card rounded-[2.5rem] p-8">
               <h4 className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-4">{language === 'hi' ? 'प्रमुख सिफारिशें' : 'Key Recommendations'}</h4>
               <ul className="space-y-2">
                 {analysis?.recommendations.map((rec, i) => (
                   <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                     <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0"></span>
                     {rec}
                   </li>
                 ))}
               </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
