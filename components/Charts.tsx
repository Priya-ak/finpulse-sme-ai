
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export const RevenueTrendChart: React.FC<{ data: any[] }> = ({ data }) => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#ffffff05" />
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false} 
            tick={{fill: '#64748b', fontSize: 12}}
          />
          <Tooltip 
            contentStyle={{backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px'}}
            itemStyle={{color: '#3b82f6'}}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#3b82f6" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorValue)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const SalesBarChart: React.FC = () => {
  const data = [
    { name: 'Feb', val: 400 },
    { name: 'Mar', val: 300 },
    { name: 'Apr', val: 500 },
    { name: 'May', val: 450 },
    { name: 'Jun', val: 700 },
    { name: 'Jul', val: 600 },
    { name: 'Aug', val: 550 },
  ];

  return (
    <div className="h-40 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <Bar dataKey="val" fill="#334155" radius={[4, 4, 0, 0]} />
          <Bar dataKey="val" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={8} />
          <XAxis dataKey="name" hide />
          <Tooltip cursor={{fill: 'transparent'}} content={() => null} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const CreditRateGauge: React.FC<{ score: number }> = ({ score }) => {
  const data = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: 1000 - score },
  ];
  const COLORS = ['#3b82f6', '#1e293b'];

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="h-32 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="80%"
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={0}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="absolute bottom-2 text-center">
        <span className="text-3xl font-bold text-white">{score}</span>
        <div className="bg-blue-500/10 text-blue-400 text-[10px] px-2 py-0.5 rounded-full mt-1">
          GOOD
        </div>
      </div>
    </div>
  );
};
