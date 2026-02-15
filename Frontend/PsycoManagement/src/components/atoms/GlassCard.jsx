import React from 'react';

const GlassCard = ({ children, className = '', intensity = 'medium' }) => {
  const intensities = {
    low: 'bg-white/5 backdrop-blur-sm border-white/10',
    medium: 'bg-white/10 backdrop-blur-md border-white/20',
    high: 'bg-white/20 backdrop-blur-lg border-white/30',
  };

  return (
    <div className={`rounded-2xl border ${intensities[intensity]} shadow-xl ${className}`}>
      {children}
    </div>
  );
};

export default GlassCard;
