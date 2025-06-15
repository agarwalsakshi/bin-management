import React from 'react';
import { Building2 } from 'lucide-react';

export const CompanyHeader: React.FC = () => {
  return (
    <div className="flex items-center space-x-3 mb-8">
      <div className="p-3 bg-green-100 rounded-lg">
        <Building2 className="w-6 h-6 text-green-600" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Franklin Sisters Inc</h1>
        <p className="text-gray-600">Primary Agency Inventory Overview</p>
      </div>
    </div>
  );
};