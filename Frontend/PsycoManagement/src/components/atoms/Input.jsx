import React from 'react';

const Input = ({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  error, 
  className = '',
  name
}) => {
  return (
    <div className={`flex flex-col space-y-1.5 w-full ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-300 ml-1">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`bg-white/5 border ${error ? 'border-red-500' : 'border-white/10'} focus:border-primary/50 backdrop-blur-sm rounded-xl px-4 py-2.5 text-white placeholder-gray-500 outline-none transition-all duration-300 focus:ring-2 focus:ring-primary/20`}
      />
      {error && (
        <span className="text-xs text-red-500 mt-1 ml-1">{error}</span>
      )}
    </div>
  );
};

export default Input;
