import React from 'react';
import { Field } from '@/types';

interface SectionFieldProps {
  field: Field;
}

export const SectionField: React.FC<SectionFieldProps> = ({ field }) => {
  return (
    <div className="w-full my-8">
      <div className="border-b-2 border-gray-300 pb-4">
        {field.label && (
          <h2 className="text-2xl font-bold text-gray-900">{field.label}</h2>
        )}
        {field.description && (
          <p className="text-gray-600 mt-2">{field.description}</p>
        )}
      </div>
    </div>
  );
};