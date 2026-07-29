import React from 'react';
import { Field } from '@/types';
import { Mail } from 'lucide-react';

interface EmailFieldProps {
  field: Field;
  value?: string;
  onChange?: (value: string) => void;
}

export const EmailField: React.FC<EmailFieldProps> = ({
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

      <div className="relative">
        <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type="email"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={field.placeholder || 'your@email.com'}
          disabled={field.disabled}
          className={`
            w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition-all duration-200
            ${field.disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'bg-white'}
          `}
        />
      </div>

      {field.description && (
        <p className="text-xs text-gray-500 mt-1">{field.description}</p>
      )}
    </div>
  );
};