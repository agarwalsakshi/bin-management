import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
}

export const KPICard: React.FC<KPICardProps> = ({ title, value, subtitle, icon: Icon }) => {
  return (
    <div className="p-6 rounded-lg border-2 border-emerald-400 bg-white transition-all duration-200 hover:shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-700">{title}</h3>
        <Icon className="w-5 h-5 text-emerald-600" />
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
};