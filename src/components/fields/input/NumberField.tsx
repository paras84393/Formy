import React from 'react';
import { Field } from '@/types';

interface NumberFieldProps {
  field: Field;
  value?: number;
  onChange?: (value: number) => void;
}

export const NumberField: React.FC<NumberFieldProps> = ({
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

      <input
        type="number"
        value={value || ''}
        onChange={(e) => onChange?.(Number(e.target.value))}
        placeholder={field.placeholder || 'Enter a number'}
        disabled={field.disabled}
        className={`
          w-full px-4 py-2 border border-gray-300 rounded-lg
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-all duration-200
          ${field.disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'bg-white'}
        `}
      />

      {field.description && (
        <p className="text-xs text-gray-500 mt-1">{field.description}</p>
      )}
    </div>
  );
};