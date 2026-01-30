
import React from 'react';
import { BusinessProfile } from '../types';
import { Send, Building2, User as UserIcon, MapPin, Briefcase, Languages } from 'lucide-react';

interface BusinessDetailFormProps {
  onSubmit: (profile: BusinessProfile) => void;
  defaultOwnerName: string;
}

const BusinessDetailForm: React.FC<BusinessDetailFormProps> = ({ onSubmit, defaultOwnerName }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const profile: BusinessProfile = {
      businessName: formData.get('businessName') as string,
      ownerName: formData.get('ownerName') as string,
      industry: formData.get('industry') as any,
      businessType: formData.get('businessType') as any,
      location: formData.get('location') as string,
      yearsInOperation: Number(formData.get('yearsInOperation')),
      employees: Number(formData.get('employees')),
      annualTurnover: Number(formData.get('annualTurnover')),
      language: formData.get('language') as any || 'en',
    };
    
    onSubmit(profile);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Business Profile</h2>
        <p className="text-slate-400">Tell us more about your enterprise for tailored AI insights.</p>
      </div>

      <form onSubmit={handleSubmit} className="glass-card p-8 rounded-[2.5rem] grid grid-cols-1 md:grid-cols-2 gap-6 border border-white/5 shadow-2xl">
        <div className="space-y-1">
          <label className="text-xs text-slate-500 uppercase tracking-widest font-bold flex items-center gap-2">
            <Building2 size={12} /> Business Name
          </label>
          <input name="businessName" placeholder="e.g. Sri Lakshmi Traders" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all" required />
        </div>

        <div className="space-y-1">
          <label className="text-xs text-slate-500 uppercase tracking-widest font-bold flex items-center gap-2">
            <UserIcon size={12} /> Owner Name
          </label>
          <input name="ownerName" defaultValue={defaultOwnerName} placeholder="e.g. Ramesh Kumar" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all" required />
        </div>

        <div className="space-y-1">
          <label className="text-xs text-slate-500 uppercase tracking-widest font-bold">Industry</label>
          <select name="industry" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all appearance-none">
            <option value="Retail" className="bg-slate-900">Retail</option>
            <option value="Manufacturing" className="bg-slate-900">Manufacturing</option>
            <option value="Logistics" className="bg-slate-900">Logistics</option>
            <option value="E-commerce" className="bg-slate-900">E-commerce</option>
            <option value="Services" className="bg-slate-900">Services</option>
            <option value="Agriculture" className="bg-slate-900">Agriculture</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-slate-500 uppercase tracking-widest font-bold">Business Type</label>
          <select name="businessType" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all appearance-none">
            <option value="Proprietorship" className="bg-slate-900">Proprietorship</option>
            <option value="Partnership" className="bg-slate-900">Partnership</option>
            <option value="LLP" className="bg-slate-900">LLP</option>
            <option value="Private Limited" className="bg-slate-900">Private Limited</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-slate-500 uppercase tracking-widest font-bold flex items-center gap-2">
            <MapPin size={12} /> Location
          </label>
          <input name="location" placeholder="e.g. Coimbatore, Tamil Nadu" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all" required />
        </div>

        <div className="space-y-1">
          <label className="text-xs text-slate-500 uppercase tracking-widest font-bold">Years in Operation</label>
          <input name="yearsInOperation" type="number" placeholder="5" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all" required />
        </div>

        <div className="space-y-1">
          <label className="text-xs text-slate-500 uppercase tracking-widest font-bold">No. of Employees</label>
          <input name="employees" type="number" placeholder="12" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all" required />
        </div>

        <div className="space-y-1">
          <label className="text-xs text-slate-500 uppercase tracking-widest font-bold">Annual Turnover (₹)</label>
          <input name="annualTurnover" type="number" placeholder="8500000" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all" required />
        </div>

        <div className="space-y-1 md:col-span-2">
          <label className="text-xs text-slate-500 uppercase tracking-widest font-bold flex items-center gap-2">
            <Languages size={12} /> Preferred Language
          </label>
          <select name="language" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all appearance-none">
            <option value="en" className="bg-slate-900">English</option>
            <option value="hi" className="bg-slate-900">Hindi (हिन्दी)</option>
          </select>
        </div>

        <div className="md:col-span-2 mt-4">
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-2">
            <Send size={20} />
            Analyze Automatically
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinessDetailForm;
