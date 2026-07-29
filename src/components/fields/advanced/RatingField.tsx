import React from 'react';
import { Field } from '@/types';
import { Star } from 'lucide-react';

interface RatingFieldProps {
  field: Field;
  value?: number;
  onChange?: (value: number) => void;
}

export const RatingField: React.FC<RatingFieldProps> = ({
  field,
  value = 0,
  onChange,
}) => {
  const maxRating = 5;

  return (
    <div className="w-full">
      {field.label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="flex gap-2">
        {Array.from({ length: maxRating }).map((_, index) => (
          <button
            key={index}
            onClick={() => onChange?.(index + 1)}
            disabled={field.disabled}
            className={`
              transition-all transform hover:scale-110
              ${field.disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
            `}
          >
            <Star
              size={28}
              className={`
                transition-colors
                ${index < value ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
              `}
            />
          </button>
        ))}
      </div>

      {value > 0 && (
        <p className="text-sm text-gray-600 mt-2">{value} out of {maxRating} stars</p>
      )}

      {field.description && (
        <p className="text-xs text-gray-500 mt-2">{field.description}</p>
      )}
    </div>
  );
};