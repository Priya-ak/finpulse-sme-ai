
import React from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  Search, 
  Calendar, 
  Settings, 
  LogOut, 
  Zap 
} from 'lucide-react';

interface SidebarProps {
  onLogout: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout, activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'reports', icon: Search, label: 'Reports' },
    { id: 'calendar', icon: Calendar, label: 'Schedule' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-20 md:w-24 bg-[#0a0c10] border-r border-white/5 flex flex-col items-center py-8 h-screen sticky top-0">
      <div className="mb-12">
        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
          <Zap className="text-white fill-white" size={24} />
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-8">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`p-3 rounded-xl transition-all duration-300 ${
              activeTab === item.id 
                ? 'bg-blue-600/10 text-blue-500 border border-blue-500/20' 
                : 'text-slate-500 hover:text-slate-300'
            }`}
            title={item.label}
          >
            <item.icon size={24} />
          </button>
        ))}
      </nav>

      <button 
        onClick={onLogout}
        className="mt-auto p-3 text-slate-500 hover:text-red-400 transition-colors"
        title="Logout"
      >
        <LogOut size={24} />
      </button>
    </div>
  );
};

export default Sidebar;
