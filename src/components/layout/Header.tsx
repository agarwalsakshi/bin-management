import React from 'react';
import { Package, Bell, User } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Package className="w-6 h-6" />
        <h1 className="text-xl font-semibold">Inventory Dashboard</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Bell className="w-5 h-5 cursor-pointer hover:text-gray-300 transition-colors" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center text-white">
            1
          </span>
        </div>
        
        <div className="flex items-center space-x-2 bg-gray-700 rounded-lg px-3 py-2">
          <User className="w-4 h-4" />
          <span className="text-sm">John Doe</span>
        </div>
      </div>
    </header>
  );
};