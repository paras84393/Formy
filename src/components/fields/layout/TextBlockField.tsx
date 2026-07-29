import React from 'react';
import { Field } from '@/types';

interface TextBlockFieldProps {
  field: Field;
}

export const TextBlockField: React.FC<TextBlockFieldProps> = ({ field }) => {
  return (
    <div className="w-full">
      {field.label && (
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {field.label}
        </h3>
      )}
      {field.description && (
        <p className="text-gray-700 whitespace-pre-wrap">
          {field.description}
        </p>
      )}
    </div>
  );
};