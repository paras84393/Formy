import React from 'react';
import { Field } from '@/types';

interface CheckboxFieldProps {
  field: Field;
  value?: boolean;
  onChange?: (value: boolean) => void;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  field,
  value = false,
  onChange,
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id={field.id}
          checked={value}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={field.disabled}
          className={`
            w-5 h-5 rounded border-gray-300 cursor-pointer
            focus:ring-2 focus:ring-blue-500
            ${field.disabled ? 'cursor-not-allowed opacity-60' : ''}
          `}
        />
        <label htmlFor={field.id} className="text-sm font-medium text-gray-700 cursor-pointer">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      </div>

      {field.description && (
        <p className="text-xs text-gray-500 mt-2">{field.description}</p>
      )}
    </div>
  );
};