import React, { useState, useRef, useEffect } from 'react';
import GlassCard from '../atoms/GlassCard';

const Dropdown = ({ trigger, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-64 origin-top-right z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <GlassCard intensity="high" className="shadow-2xl border-white/20 p-4">
            {children}
          </GlassCard>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
