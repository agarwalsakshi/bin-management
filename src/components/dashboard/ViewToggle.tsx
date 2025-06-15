import React from 'react';
import { List, Map } from 'lucide-react';
import { useInventoryStore } from '../../store/useInventoryStore';

export const ViewToggle: React.FC = () => {
  const { displayMode, setDisplayMode } = useInventoryStore();

  return (
    <div className="flex items-center space-x-2 mb-6">
      <span className="text-sm font-medium text-gray-700">View:</span>
      
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setDisplayMode('list')}
          className={`flex items-center space-x-2 px-3 py-1 rounded-md transition-colors ${
            displayMode === 'list'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <List className="w-4 h-4" />
          <span className="text-sm">List View</span>
        </button>
        
        <button
          onClick={() => setDisplayMode('map')}
          className={`flex items-center space-x-2 px-3 py-1 rounded-md transition-colors ${
            displayMode === 'map'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Map className="w-4 h-4" />
          <span className="text-sm">Map View</span>
        </button>
      </div>
    </div>
  );
};