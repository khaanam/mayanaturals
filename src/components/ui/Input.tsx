import React from 'react';
import { InputProps } from '../../types';
import { cn } from '../../utils/cn';

const Input: React.FC<InputProps> = ({
  label,
  error,
  className,
  ...props
}) => {
  const inputClasses = cn(
    'block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm',
    error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
    props.disabled && 'bg-gray-100 cursor-not-allowed opacity-50',
    className
  );

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        className={inputClasses}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input;