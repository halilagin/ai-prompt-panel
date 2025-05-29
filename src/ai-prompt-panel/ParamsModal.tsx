import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface ParamsModalProps {
  isOpen: boolean;
  onClose: () => void;
  params: Record<string, any>;
  onSave: (updatedParams: Record<string, any>) => void;
  title?: string;
}

export const ParamsModal: React.FC<ParamsModalProps> = ({
  isOpen,
  onClose,
  params,
  onSave,
  title = "Edit Parameters"
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});

  useEffect(() => {
    // Convert params to string values for form inputs
    const stringParams: Record<string, string> = {};
    Object.keys(params).forEach(key => {
      stringParams[key] = String(params[key] || '');
    });
    setFormData(stringParams);
  }, [params, isOpen]);

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleAddField = () => {
    const newKey = prompt('Enter parameter name:');
    if (newKey && !formData.hasOwnProperty(newKey)) {
      setFormData(prev => ({
        ...prev,
        [newKey]: ''
      }));
    }
  };

  const handleRemoveField = (key: string) => {
    setFormData(prev => {
      const newData = { ...prev };
      delete newData[key];
      return newData;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Convert string values back to appropriate types if needed
    const updatedParams: Record<string, any> = {};
    Object.keys(formData).forEach(key => {
      updatedParams[key] = formData[key];
    });
    onSave(updatedParams);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {Object.keys(formData).map((key) => (
              <div key={key} className="flex items-center space-x-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {key}
                  </label>
                  <input
                    type="text"
                    value={formData[key]}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder={`Enter ${key}`}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveField(key)}
                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-1"
                  title="Remove field"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <button
              type="button"
              onClick={handleAddField}
              className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
            >
              + Add Parameter
            </button>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 