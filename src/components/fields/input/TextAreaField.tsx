import React from 'react';
import { Field } from '@/types';

interface TextAreaFieldProps {
  field: Field;
  value?: string;
  onChange?: (value: string) => void;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  field,
  value = '',
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

      <textarea
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={field.placeholder || 'Enter text'}
        disabled={field.disabled}
        rows={4}
        className={`
          w-full px-4 py-2 border border-gray-300 rounded-lg
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-all duration-200 resize-none
          ${field.disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'bg-white'}
        `}
      />

      {field.description && (
        <p className="text-xs text-gray-500 mt-1">{field.description}</p>
      )}
    </div>
  );
};