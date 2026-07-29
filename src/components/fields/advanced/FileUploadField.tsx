import React, { useRef } from 'react';
import { Field } from '@/types';
import { Upload, X } from 'lucide-react';

interface FileUploadFieldProps {
  field: Field;
  value?: File | null;
  onChange?: (file: File | null) => void;
}

export const FileUploadField: React.FC<FileUploadFieldProps> = ({
  field,
  value,
  onChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    onChange?.(file || null);
  };

  const handleRemove = () => {
    onChange?.(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      {field.label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div
        onClick={() => fileInputRef.current?.click()}
        className={`
          border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer
          transition-all hover:border-blue-500 hover:bg-blue-50
          ${field.disabled ? 'cursor-not-allowed opacity-60' : ''}
        `}
      >
        <Upload className="mx-auto mb-2 text-gray-400" size={24} />
        <p className="text-sm text-gray-600">
          {value ? value.name : 'Click to upload or drag and drop'}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          {field.placeholder || 'Any file type'}
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        disabled={field.disabled}
        className="hidden"
      />

      {value && (
        <div className="mt-3 flex items-center justify-between bg-gray-100 p-3 rounded-lg">
          <span className="text-sm text-gray-700">{value.name}</span>
          <button
            onClick={handleRemove}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
          >
            <X size={16} className="text-gray-600" />
          </button>
        </div>
      )}

      {field.description && (
        <p className="text-xs text-gray-500 mt-1">{field.description}</p>
      )}
    </div>
  );
};