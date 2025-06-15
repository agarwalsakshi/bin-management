import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, AlertTriangle } from 'lucide-react';
import { Bin } from '../../types';
import { useInventoryStore } from '../../store/useInventoryStore';

interface EditInventoryModalProps {
  bin: Bin;
  onClose: () => void;
}

export const EditInventoryModal: React.FC<EditInventoryModalProps> = ({ bin, onClose }) => {
  const [action, setAction] = useState<'add' | 'withdraw'>('add');
  const [quantity, setQuantity] = useState('');
  const [selectedAgency, setSelectedAgency] = useState('');
  const [error, setError] = useState('');
  const [selectedAllocation, setSelectedAllocation] = useState<Bin['allocations'][0] | null>(null);
  
  const { addStock, withdrawStock, agencies } = useInventoryStore();

  useEffect(() => {
    if (selectedAgency) {
      const allocation = bin.allocations.find(a => a.agencyId === selectedAgency);
      setSelectedAllocation(allocation || null);
      console.log('Selected Agency:', selectedAgency);
      console.log('Matching Allocation:', allocation);
      console.log('All Allocations:', bin.allocations);
    } else {
      setSelectedAllocation(null);
    }
  }, [selectedAgency, bin.allocations]);

  const validateQuantity = (qty: number): string | null => {
    if (isNaN(qty) || qty <= 0) {
      return 'Please enter a valid quantity';
    }

    if (action === 'add') {
      // For adding inventory, check if it exceeds available volume
      if (qty > bin.availableVolume) {
        return `Cannot add more than available volume (${bin.availableVolume} units)`;
      }
    } else {
      // For withdrawal, check if agency is selected and has enough physical units
      if (!selectedAgency) {
        return 'Please select an agency for withdrawal';
      }

      if (!selectedAllocation) {
        return 'Selected agency has no allocation in this bin';
      }

      if (qty > selectedAllocation.physicalUnits) {
        return `Insufficient physical units. Available: ${selectedAllocation.physicalUnits}`;
      }

      // Check if withdrawal would exceed allocated units
      if (qty > selectedAllocation.allocatedUnits) {
        return `Cannot withdraw more than allocated units (${selectedAllocation.allocatedUnits})`;
      }
    }

    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const qty = parseInt(quantity);
    const validationError = validateQuantity(qty);
    
    if (validationError) {
      setError(validationError);
      return;
    }

    if (action === 'add') {
      addStock(bin.id, qty, 'Current User');
      onClose();
    } else {
      withdrawStock(bin.id, selectedAgency, qty, 'Current User');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Edit Inventory - {bin.id}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Action
            </label>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => {
                  setAction('add');
                  setError('');
                  setSelectedAgency('');
                }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  action === 'add'
                    ? 'bg-green-100 text-green-700 border-2 border-green-300'
                    : 'bg-gray-100 text-gray-700 border-2 border-gray-300'
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>Add Stock</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setAction('withdraw');
                  setError('');
                }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  action === 'withdraw'
                    ? 'bg-red-100 text-red-700 border-2 border-red-300'
                    : 'bg-gray-100 text-gray-700 border-2 border-gray-300'
                }`}
              >
                <Minus  className="w-4 h-4" />
                <span>Withdraw Stock</span>
              </button>
            </div>
          </div>

          {action === 'withdraw' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Agency
              </label>
              <select
                value={selectedAgency}
                onChange={(e) => {
                  setSelectedAgency(e.target.value);
                  setError('');
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select an agency...</option>
                {bin.allocations.map((allocation) => {
                  const agency = agencies.find(a => a.id === allocation.agencyId);
                  return (
                    <option key={allocation.id} value={allocation.agencyId}>
                      {agency?.name} (Available: {allocation.physicalUnits})
                    </option>
                  );
                })}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
                setError('');
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter quantity"
              min="1"
              required
            />
            {action === 'add' && (
              <p className="mt-1 text-sm text-gray-500">
                Available volume: {bin.availableVolume} units
              </p>
            )}
            {action === 'withdraw' && selectedAllocation && (
              <p className="mt-1 text-sm text-gray-500">
                Available physical units: {selectedAllocation.physicalUnits} units
              </p>
            )}
          </div>

          {error && (
            <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span className="text-sm text-red-700">{error}</span>
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`flex-1 px-4 py-2 rounded-lg text-white transition-colors ${
                action === 'add'
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {action === 'add' ? 'Add Stock' : 'Withdraw Stock'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};