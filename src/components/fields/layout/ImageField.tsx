import React, { useState } from 'react';
import { Field } from '@/types';
import { Image, Upload } from 'lucide-react';

interface ImageFieldProps {
  field: Field;
  value?: string;
  onChange?: (value: string) => void;
}

export const ImageField: React.FC<ImageFieldProps> = ({
  field,
  value,
  onChange,
}) => {
  const [imageUrl, setImageUrl] = useState(value || '');

  const handleUrlChange = (url: string) => {
    setImageUrl(url);
    onChange?.(url);
  };

  return (
    <div className="w-full">
      {field.label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {field.label}
        </label>
      )}

      {imageUrl ? (
        <div className="relative rounded-lg overflow-hidden">
          <img
            src={imageUrl}
            alt={field.label}
            className="w-full h-auto max-h-96 object-cover"
          />
          <button
            onClick={() => handleUrlChange('')}
            className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
          >
            Remove
          </button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Image className="mx-auto mb-2 text-gray-400" size={24} />
          <input
            type="url"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={(e) => handleUrlChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-400 mt-2">or paste image URL above</p>
        </div>
      )}

      {field.description && (
        <p className="text-xs text-gray-500 mt-1">{field.description}</p>
      )}
    </div>
  );
};