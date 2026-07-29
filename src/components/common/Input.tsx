import React from "react";

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  disabled,
  error,
  label,
  required,
  className = "",
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-gray-800">
          {label}
          {required && (
            <span className="ml-1 text-red-500">*</span>
          )}
        </label>
      )}

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`
          w-full
          h-11
          rounded-xl
          border
          px-4
          text-sm
          text-gray-900
          placeholder:text-gray-400
          transition-all
          duration-150
          outline-none

          ${
            error
              ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
              : "border-gray-200 focus:border-gray-900 focus:ring-4 focus:ring-gray-100"
          }

          ${
            disabled
              ? "cursor-not-allowed bg-gray-100 text-gray-400"
              : "bg-white hover:border-gray-300"
          }

          ${className}
        `}
      />

      {error && (
        <p className="mt-2 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};