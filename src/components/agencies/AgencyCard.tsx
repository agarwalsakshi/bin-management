import React, { useState } from 'react';
import { Building2, MapPin, Edit, Trash2, ChevronDown, ChevronUp, X } from 'lucide-react';
import { Agency } from '../../types';
import { useInventoryStore } from '../../store/useInventoryStore';

interface AgencyCardProps {
  agency: Agency;
}

export const AgencyCard: React.FC<AgencyCardProps> = ({ agency }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState({
    name: agency.name,
    type: agency.type,
    location: agency.location,
  });
  const { bins, products, updateAgency } = useInventoryStore();

  // Get bins allocated to this agency
  const agencyAllocations = bins.flatMap(bin => 
    bin.allocations
      .filter(allocation => allocation.agencyId === agency.id)
      .map(allocation => ({
        ...allocation,
        bin,
        product: products.find(p => p.id === bin.productId)
      }))
  );

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditSave = () => {
    updateAgency(agency.id, formData);
    setIsEditing(false);
  };

  const handleDelete = () => {
    setIsDeleting(true);
  };

  const handleDeleteConfirm = () => {
    updateAgency(agency.id, { name: '[Deleted]', type: agency.type, location: agency.location });
    setIsDeleting(false);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Building2 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{agency.name}</h3>
              <p className="text-sm text-gray-500">Primary Agency Inventory Overview</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Edit onClick={handleEdit} className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
              <Trash2 onClick={handleDelete} className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <span className="text-sm">•••</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Agency ID</p>
            <p className="font-medium">{agency.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Type</p>
            <p className="font-medium">{agency.type}</p>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium">{agency.location}</p>
            </div>
          </div>
        </div>

        {agencyAllocations.length > 0 && (
          <div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center justify-between w-full py-2 text-left"
            >
              <span className="text-sm font-medium text-gray-700">
                Product/Bin Allocation Details ({agencyAllocations.length})
              </span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </button>

            {isExpanded && (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 text-gray-600">Product Name/ID</th>
                      <th className="text-left py-2 text-gray-600">Bin ID</th>
                      <th className="text-left py-2 text-gray-600">Bin Location</th>
                      <th className="text-right py-2 text-gray-600">Allocated Units</th>
                      <th className="text-right py-2 text-gray-600">Invoiced Units</th>
                      <th className="text-right py-2 text-gray-600">Physical Units</th>
                      <th className="text-right py-2 text-gray-600">Returned to plant</th>
                      <th className="text-right py-2 text-gray-600">Delivered Units</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agencyAllocations.map((allocation) => (
                      <tr key={allocation.id} className="border-b border-gray-100">
                        <td className="py-3">
                          <div>
                            <p className="font-medium">{allocation.product?.name}</p>
                            <p className="text-gray-500 text-xs">
                              {allocation.product?.type} | {allocation.product?.id}
                            </p>
                          </div>
                        </td>
                        <td className="py-3">{allocation.bin.id}</td>
                        <td className="py-3">{allocation.bin.location}</td>
                        <td className="py-3 text-right">{allocation.allocatedUnits.toLocaleString()}</td>
                        <td className="py-3 text-right">{allocation.invoicedUnits.toLocaleString()}</td>
                        <td className="py-3 text-right">{allocation.physicalUnits.toLocaleString()}</td>
                        <td className="py-3 text-right">{allocation.returnedUnits.toLocaleString()}</td>
                        <td className="py-3 text-right">{allocation.deliveredUnits.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Edit Agency</h3>
              <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form
              onSubmit={e => {
                e.preventDefault();
                handleEditSave();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Agency Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={formData.type}
                  onChange={e => setFormData({ ...formData, type: e.target.value as Agency['type'] })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Primary">Primary</option>
                  <option value="Partner">Partner</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={e => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-4">Are you sure you want to delete this agency? This action cannot be undone.</p>
            <div className="flex space-x-3">
              <button
                onClick={() => setIsDeleting(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};