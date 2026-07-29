import React from 'react';
import { Field } from '@/types';

interface ToggleFieldProps {
  field: Field;
  value?: boolean;
  onChange?: (value: boolean) => void;
}

export const ToggleField: React.FC<ToggleFieldProps> = ({
  field,
  value = false,
  onChange,
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>

        <button
          onClick={() => onChange?.(!value)}
          disabled={field.disabled}
          className={`
            relative inline-flex h-6 w-11 items-center rounded-full transition-colors
            ${value ? 'bg-blue-600' : 'bg-gray-300'}
            ${field.disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
          `}
        >
          <span
            className={`
              inline-block h-4 w-4 transform rounded-full bg-white transition-transform
              ${value ? 'translate-x-6' : 'translate-x-1'}
            `}
          />
        </button>
      </div>

      {field.description && (
        <p className="text-xs text-gray-500 mt-2">{field.description}</p>
      )}
    </div>
  );
};