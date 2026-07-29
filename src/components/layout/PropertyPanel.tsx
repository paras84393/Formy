import React, { useState } from 'react';
import { useFormStore } from '@/store/formStore';
import { useUIStore } from '@/store/uiStore';
import { Button } from '@/components/common/Button';
import { Trash2, Copy, ChevronDown } from 'lucide-react';
import { Field, FieldOption } from '@/types';
import { motion } from 'framer-motion';

export const PropertyPanel: React.FC = () => {
  const {
    getCurrentForm,
    currentFormId,
    updateField,
    removeField,
    duplicateField,
  } = useFormStore();

  const { selectedFieldId, setSelectedFieldId } = useUIStore();
  const form = getCurrentForm();
  const selectedField = form?.fields.find((f) => f.id === selectedFieldId);

  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    validation: false,
    options: false,
    advanced: false,
  });
  if(!selectedField) return null;

  if (!form || !currentFormId) {
    return (
      <aside className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto flex items-center justify-center">
        <p className="text-gray-500 text-center">Select a field to customize</p>
      </aside>
    );
  }

  const handleUpdate = (updates: Partial<Field>) => {
    updateField(currentFormId, selectedFieldId, updates);
  };

  const handleDelete = () => {
    if (window.confirm('Delete this field?')) {
      removeField(currentFormId, selectedFieldId);
      setSelectedFieldId(null);
    }
  };

  const handleDuplicate = () => {
    duplicateField(currentFormId, selectedFieldId);
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const hasOptions = ['checkbox', 'radio', 'dropdown', 'multiselect'].includes(
    selectedField.type
  );

  return (
    <aside className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">

        <div className="flex items-center justify-between mb-3">
          <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
            {selectedField.type.toUpperCase()}
          </div>
          <div className="flex gap-1">
            <button
              onClick={handleDuplicate}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              title="Duplicate"
            >
              <Copy size={14} className="text-gray-600" />
            </button>
            <button
              onClick={handleDelete}
              className="p-1 hover:bg-red-100 rounded transition-colors"
              title="Delete"
            >
              
              <Trash2 size={14} className="text-red-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        {/* Basic Settings */}
        <motion.div
          initial={false}
          className="border border-gray-200 rounded-lg overflow-hidden"
        >
          <button
            onClick={() => toggleSection('basic')}
            className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
          >
            <span className="text-sm font-semibold text-gray-900">Basic</span>
            <ChevronDown
              size={16}
              className={`transition-transform ${
                expandedSections.basic ? 'rotate-180' : ''
              }`}
            />
          </button>

          {expandedSections.basic && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-200 p-3 space-y-3"
            >
              {/* Label */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Label
                </label>
                <input
                  type="text"
                  value={selectedField.label}
                  onChange={(e) => handleUpdate({ label: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Placeholder */}
              {['text', 'textarea', 'email', 'number', 'phone', 'url'].includes(
                selectedField.type
              ) && (
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Placeholder
                  </label>
                  <input
                    type="text"
                    value={selectedField.placeholder || ''}
                    onChange={(e) => handleUpdate({ placeholder: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              {/* Description */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={selectedField.description || ''}
                  onChange={(e) => handleUpdate({ description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={2}
                />
              </div>

              {/* Help Text */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Help Text
                </label>
                <input
                  type="text"
                  value={selectedField.helpText || ''}
                  onChange={(e) => handleUpdate({ helpText: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Required */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="required"
                  checked={selectedField.required}
                  onChange={(e) => handleUpdate({ required: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <label htmlFor="required" className="text-sm text-gray-700">
                  Required field
                </label>
              </div>

              {/* Disabled */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="disabled"
                  checked={selectedField.disabled}
                  onChange={(e) => handleUpdate({ disabled: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <label htmlFor="disabled" className="text-sm text-gray-700">
                  Disabled
                </label>
              </div>

              {/* Column Span */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Column Width
                </label>
                <select
                  value={selectedField.columnSpan || 12}
                  onChange={(e) =>
                    handleUpdate({ columnSpan: parseInt(e.target.value) as any })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={12}>Full Width</option>
                  <option value={6}>Half Width</option>
                  <option value={4}>One Third</option>
                  <option value={3}>One Quarter</option>
                </select>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Options Settings */}
        {hasOptions && (
          <motion.div
            initial={false}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleSection('options')}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm font-semibold text-gray-900">Options</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  expandedSections.options ? 'rotate-180' : ''
                }`}
              />
            </button>

            {expandedSections.options && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-gray-200 p-3 space-y-2"
              >
                {selectedField.options?.map((option: FieldOption, index: number) => (
                  <div key={option.id} className="flex gap-2">
                    <input
                      type="text"
                      value={option.label}
                      onChange={(e) => {
                        const newOptions = [...(selectedField.options || [])];
                        newOptions[index] = {
                          ...option,
                          label: e.target.value,
                        };
                        handleUpdate({ options: newOptions });
                      }}
                      placeholder="Option label"
                      className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => {
                        const newOptions = selectedField.options?.filter(
                          (_, i) => i !== index
                        );
                        handleUpdate({ options: newOptions });
                      }}
                      className="px-2 py-1 text-red-600 hover:bg-red-50 rounded text-xs"
                    >
                      Remove
                    </button>
                  </div>
                ))}

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    const newOptions = [
                      ...(selectedField.options || []),
                      {
                        id: `option-${Date.now()}`,
                        label: 'New option',
                        value: `option-${Date.now()}`,
                      },
                    ];
                    handleUpdate({ options: newOptions });
                  }}
                  fullWidth
                >
                  Add Option
                </Button>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </aside>
  );
};