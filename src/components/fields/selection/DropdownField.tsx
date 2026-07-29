import React from 'react';
import { Field,  } from '@/types';
import { ChevronDown } from 'lucide-react';

interface DropdownFieldProps {
  field: Field;
  value?: string;
  onChange?: (value: string) => void;
}

export const DropdownField: React.FC<DropdownFieldProps> = ({
  field,
  value,
  onChange,
}) => {
  return (
    <div className="w-full">
      {field.label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <select
          value={value || ''}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={field.disabled}
          className={`
            w-full px-4 py-2 border border-gray-300 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition-all duration-200 appearance-none cursor-pointer
            ${field.disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'bg-white'}
          `}
        >
          <option value="">Select an option</option>
          {field.options?.map((option: FieldOption) => (
            <option key={option.id} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={18} />
      </div>

      {field.description && (
        <p className="text-xs text-gray-500 mt-1">{field.description}</p>
      )}
    </div>
  );
};