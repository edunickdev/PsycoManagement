import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  type = 'button', 
  className = '', 
  disabled = false,
  isLoading = false 
}) => {
  const baseStyles = 'inline-flex items-center justify-center px-6 py-2.5 rounded-full font-semibold transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5',
    secondary: 'bg-quinary text-white hover:bg-quinary/90 shadow-lg hover:-translate-y-0.5',
    outline: 'border-2 border-primary text-primary hover:bg-primary/10',
    ghost: 'text-gray-300 hover:bg-white/10 backdrop-blur-sm',
    glass: 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {isLoading ? (
        <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : null}
      {children}
    </button>
  );
};

export default Button;
