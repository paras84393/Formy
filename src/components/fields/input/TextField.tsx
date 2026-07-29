import React from 'react';
import { Field } from '@/types';

interface TextFieldProps {
  field: Field;
  value?: string;
  onChange?: (value: string) => void;
  isEditing?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({
  field,
  value = '',
  onChange,
  isEditing = false,
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
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={field.placeholder || 'Enter text'}
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

      {field.helpText && (
        <p className="text-xs text-gray-400 mt-1">ℹ️ {field.helpText}</p>
      )}
    </div>
  );
};