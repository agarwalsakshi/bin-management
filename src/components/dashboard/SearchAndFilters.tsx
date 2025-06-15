import React from 'react';
import { Search, Filter } from 'lucide-react';
import { useInventoryStore } from '../../store/useInventoryStore';

export const SearchAndFilters: React.FC = () => {
  const { currentView, setCurrentView, searchQuery, setSearchQuery } = useInventoryStore();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search bins, agencies, or products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <Filter className="w-4 h-4 text-gray-600" />
          <span className="text-sm text-gray-700">Filters</span>
        </button>

        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setCurrentView('agency')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              currentView === 'agency'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            By Sales Agency
          </button>
          <button
            onClick={() => setCurrentView('bin')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              currentView === 'bin'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            By Bin
          </button>
        </div>
      </div>
    </div>
  );
};