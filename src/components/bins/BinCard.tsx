import React, { useState } from 'react';
import { Package, MapPin, Edit, Trash2, Plus, Minus } from 'lucide-react';
import { Bin, Product } from '../../types';
import { useInventoryStore } from '../../store/useInventoryStore';
import { ProgressBar } from '../common/ProgressBar';
import { EditInventoryModal } from './EditInventoryModal';
import { Card, CardContent, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Chip } from '@mui/material';
import { Button } from '@mui/material';

interface BinCardProps {
  bin: Bin;
  onEdit: (bin: Bin) => void;
  onDelete: (binId: string) => void;
}

export const BinCard: React.FC<BinCardProps> = ({ bin, onEdit, onDelete }) => {
  const { agencies } = useInventoryStore();
  const [showEditModal, setShowEditModal] = useState(false);

  const getAgencyName = (agencyId: string) => {
    const agency = agencies.find(a => a.id === agencyId);
    return agency ? agency.name : 'Unknown Agency';
  };

  const isOwner = (agencyId: string) => agencyId === bin.ownerId;

  return (
    <>
      <div className="bg-white rounded-lg border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-50 rounded-lg">
                <Package className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-emerald-900">{bin.id}</h3>
                <p className="text-sm text-emerald-600">Bin Volume: {bin.volume.toLocaleString()} units</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setShowEditModal(true)}
                className="flex items-center space-x-1 bg-emerald-600 text-white px-3 py-1 rounded-md hover:bg-emerald-700 transition-colors text-sm"
              >
                <Edit className="w-3 h-3" />
                <span>Edit Inventory</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <p className="text-sm text-emerald-600">Product/Subproduct ID</p>
              <p className="font-medium text-emerald-900">{bin.productId}</p>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4 text-emerald-500" />
              <div>
                <p className="text-sm text-emerald-600">Bin Location</p>
                <p className="font-medium text-emerald-900">{bin.location}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-emerald-600">Available Volume</p>
              <p className="font-medium text-emerald-900">{bin.availableVolume.toLocaleString()}</p>
            </div>
          </div>

          {bin.allocations.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-emerald-700 mb-3">Agency-Specific Allocations</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-emerald-100">
                      <th className="text-left py-2 text-emerald-600">Sales Agency Name</th>
                      <th className="text-center py-2 text-emerald-600">Status</th>
                      <th className="text-right py-2 text-emerald-600">Allocated Units</th>
                      <th className="text-right py-2 text-emerald-600 pr-8">Physical Units</th>
                      <th className="text-left py-2 text-emerald-600 pl-8">Bin Utilization Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bin.allocations.map((allocation) => {
                      const agency = agencies.find(a => a.id === allocation.agencyId);
                      const utilizationRate = (allocation.physicalUnits / allocation.allocatedUnits) * 100;
                      
                      return (
                        <tr key={allocation.id} className="border-b border-emerald-50">
                          <td className="py-3 text-emerald-900">{agency?.name}</td>
                          <td className="py-3 text-center">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              isOwner(allocation.agencyId) 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {isOwner(allocation.agencyId) ? 'Owner' : 'Partner'}
                            </span>
                          </td>
                          <td className="py-3 text-right text-emerald-900">{allocation.allocatedUnits.toLocaleString()}</td>
                          <td className="py-3 text-right pr-8 text-emerald-900">{allocation.physicalUnits.toLocaleString()}</td>
                          <td className="py-3 pl-8">
                            <div className="flex items-center space-x-2">
                              <ProgressBar 
                                value={utilizationRate} 
                                max={100} 
                                className="flex-1"
                                color={isOwner(allocation.agencyId) ? 'green' : 'yellow'}
                              />
                              <span className="text-xs text-emerald-600 w-12">
                                {utilizationRate.toFixed(1)}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {showEditModal && (
        <EditInventoryModal
          bin={bin}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </>
  );
};