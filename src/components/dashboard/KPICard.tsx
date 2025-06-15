import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
}

export const KPICard: React.FC<KPICardProps> = ({ title, value, subtitle, icon: Icon }) => {
  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-green-100 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 opacity-50"></div>
      
      {/* Animated Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute inset-[2px] rounded-2xl bg-white"></div>
      
      <div className="relative p-6 z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-700 group-hover:text-green-700 transition-colors duration-300">
            {title}
          </h3>
          <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
            <Icon className="w-5 h-5 text-green-600 group-hover:text-emerald-600 transition-colors duration-300" />
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-3xl font-bold text-gray-900 group-hover:text-green-800 transition-colors duration-300">
            {value}
          </p>
          <p className="text-sm text-gray-500 group-hover:text-green-600 transition-colors duration-300">
            {subtitle}
          </p>
        </div>
        
        {/* Progress indicator */}
        <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left"></div>
        </div>
      </div>
    </div>
  );
};