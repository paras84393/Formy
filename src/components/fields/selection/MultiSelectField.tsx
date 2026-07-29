import React from 'react';
import { Field, FieldOption } from '@/types';
import { X } from 'lucide-react';

interface MultiSelectFieldProps {
  field: Field;
  value?: string[];
  onChange?: (value: string[]) => void;
}

export const MultiSelectField: React.FC<MultiSelectFieldProps> = ({
  field,
  value = [],
  onChange,
}) => {
  const handleToggle = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue];
    onChange?.(newValue);
  };

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
              type="checkbox"
              id={option.id}
              checked={value.includes(option.value)}
              onChange={() => handleToggle(option.value)}
              disabled={field.disabled}
              className={`
                w-4 h-4 rounded cursor-pointer
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