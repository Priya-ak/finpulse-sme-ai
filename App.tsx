
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import FileUpload from './components/FileUpload';
import BusinessDetailForm from './components/BusinessDetailForm';
import { User, FinancialData, BusinessProfile, AIAnalysisResult } from './types';
import { analyzeFinancialHealth } from './services/geminiService';
import { LayoutDashboard, FileUp, ShieldCheck, Zap, LogIn, Languages } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [financialData, setFinancialData] = useState<FinancialData | null>(null);
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile | null>(null);
  const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [appLanguage, setAppLanguage] = useState<'en' | 'hi'>('en');
  const [setupStep, setSetupStep] = useState<'upload' | 'profile' | 'complete'>('upload');

  const handleAuth = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: formData.get('email') as string,
      name: formData.get('name') as string || 'Business Owner',
      phone: formData.get('phone') as string || '',
    };
    setUser(mockUser);
  };

  const handleDataExtracted = (data: FinancialData) => {
    setFinancialData(data);
    setSetupStep('profile');
  };

  const handleProfileSubmit = async (profile: BusinessProfile) => {
    setBusinessProfile(profile);
    setIsAnalyzing(true);
    
    try {
      if (financialData) {
        const result = await analyzeFinancialHealth(financialData, profile);
        setAnalysis(result);
        setSetupStep('complete');
        setActiveTab('dashboard');
      }
    } catch (error) {
      console.error("Analysis Error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const toggleLanguage = () => {
    setAppLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#05070a] flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6 shadow-2xl shadow-blue-500/20">
              <Zap className="text-white fill-white" size={32} />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">FinPulse SME</h1>
            <p className="text-slate-400">AI-Powered SME Health Dashboard</p>
          </div>

          <form onSubmit={handleAuth} className="glass-card p-8 rounded-[2rem] border border-white/5 shadow-2xl space-y-4">
            <div className="flex gap-1 p-1 bg-white/5 rounded-xl mb-4">
              <button 
                type="button"
                onClick={() => setAuthMode('login')}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${authMode === 'login' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Login
              </button>
              <button 
                type="button"
                onClick={() => setAuthMode('signup')}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${authMode === 'signup' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Register
              </button>
            </div>

            {authMode === 'signup' && (
              <>
                <div className="space-y-1">
                  <label className="text-xs text-slate-500 uppercase tracking-widest font-bold">User Name</label>
                  <input name="name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all" placeholder="Enter full name" required />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-500 uppercase tracking-widest font-bold">Phone Number</label>
                  <input name="phone" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all" placeholder="+91 00000 00000" required />
                </div>
              </>
            )}
            
            <div className="space-y-1">
              <label className="text-xs text-slate-500 uppercase tracking-widest font-bold">Email Address</label>
              <input name="email" type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all" placeholder="name@company.com" required />
            </div>
            
            <div className="space-y-1">
              <label className="text-xs text-slate-500 uppercase tracking-widest font-bold">Password</label>
              <input type="password" name="password" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all" placeholder="••••••••" required />
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-2 mt-4">
              <LogIn size={20} />
              {authMode === 'signup' ? 'Create Account' : 'Enter Dashboard'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#05070a] text-slate-200">
      <Sidebar 
        onLogout={() => setUser(null)} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'dashboard' ? (
            financialData && businessProfile && analysis ? (
              <Dashboard user={user} analysis={analysis} language={appLanguage} toggleLanguage={toggleLanguage} businessName={businessProfile.businessName} />
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-8 text-center max-w-4xl mx-auto">
                <div className="mb-12">
                   <h2 className="text-4xl font-bold text-white mb-4">Complete Your Financial Profile</h2>
                   <p className="text-slate-400 text-lg">FinPulse needs your data to generate industry-specific health assessments.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
                  <div className="glass-card p-8 rounded-[2rem] border border-white/5 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-blue-600/10 text-blue-500 rounded-2xl flex items-center justify-center mb-6">
                      <FileUp size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Upload Documents</h3>
                    <p className="text-slate-500 text-sm mb-6 flex-1">Upload P&L statements, GST returns, or Ledger files in PDF/XLSX.</p>
                    <button onClick={() => setActiveTab('upload')} className="w-full bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 py-3 rounded-xl font-bold transition-all border border-blue-500/20">
                      Go to Upload
                    </button>
                  </div>

                  <div className="glass-card p-8 rounded-[2rem] border border-white/5 flex flex-col items-center text-center opacity-60 group relative">
                    <div className="absolute inset-0 bg-slate-950/40 rounded-[2rem] z-10 flex items-center justify-center">
                        <span className="bg-blue-600 text-[10px] font-bold px-2 py-1 rounded">BETA ACCESS</span>
                    </div>
                    <div className="w-16 h-16 bg-purple-600/10 text-purple-500 rounded-2xl flex items-center justify-center mb-6">
                      <ShieldCheck size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Connect Banking APIs</h3>
                    <p className="text-slate-500 text-sm mb-6 flex-1">Securely sync via Open Banking integrations (ICICI / HDFC / Razorpay).</p>
                    <button disabled className="w-full bg-slate-800 text-slate-500 py-3 rounded-xl font-bold transition-all border border-white/5 cursor-not-allowed">
                      Sync Unavailable
                    </button>
                  </div>
                </div>
              </div>
            )
          ) : activeTab === 'upload' ? (
            <div className="h-full flex items-center justify-center p-8">
              {setupStep === 'upload' ? (
                <FileUpload onDataExtracted={handleDataExtracted} />
              ) : (
                <BusinessDetailForm 
                  defaultOwnerName={user.name} 
                  onSubmit={handleProfileSubmit} 
                />
              )}
            </div>
          ) : (
             <div className="h-full flex items-center justify-center text-slate-500 italic">
               Module is being prepared for your sector...
             </div>
          )}
        </div>
      </main>

      {isAnalyzing && (
        <div className="fixed inset-0 bg-[#05070a]/80 backdrop-blur-xl z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-8">
               <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
               <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
               <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500 animate-pulse" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Analyzing Financial DNA</h2>
            <p className="text-slate-400">Gemini AI is processing your statements and cross-referencing industry benchmarks...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
