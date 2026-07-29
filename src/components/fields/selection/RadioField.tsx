import React from 'react';
import { Field, FieldOption } from '@/types';

interface RadioFieldProps {
  field: Field;
  value?: string;
  onChange?: (value: string) => void;
}

export const RadioField: React.FC<RadioFieldProps> = ({
  field,
  value,
  onChange,
}) => {
  return (
    <div className="w-full">
      {field.label && (
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="space-y-2">
        {field.options?.map((option: FieldOption) => (
          <div key={option.id} className="flex items-center gap-3">
            <input
              type="radio"
              id={option.id}
              name={field.id}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange?.(e.target.value)}
              disabled={field.disabled}
              className={`
                w-4 h-4 cursor-pointer
                ${field.disabled ? 'cursor-not-allowed opacity-60' : ''}
              `}
            />
            <label htmlFor={option.id} className="text-sm text-gray-700 cursor-pointer">
              {option.label}
            </label>
          </div>
        ))}
      </div>

      {field.description && (
        <p className="text-xs text-gray-500 mt-2">{field.description}</p>
      )}
    </div>
  );
};