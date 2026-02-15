import React from 'react';

const Avatar = ({ src, name, size = 'md', className = '', isBordered = true }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '';

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 overflow-hidden rounded-full ${sizes[size]} ${isBordered ? 'ring-2 ring-primary/50' : ''} ${className}`}>
      {src ? (
        <img
          src={src}
          alt={name}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = ''; // Force fallback
          }}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-white/10 text-xs font-medium text-white">
          {initials}
        </div>
      )}
    </div>
  );
};

export default Avatar;
