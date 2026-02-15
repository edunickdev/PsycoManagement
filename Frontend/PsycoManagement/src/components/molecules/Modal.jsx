import React from 'react';
import { MdClose } from 'react-icons/md';
import GlassCard from '../atoms/GlassCard';

const Modal = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <GlassCard 
        intensity="high" 
        className="relative w-full max-w-2xl transform transition-all duration-300 scale-100 shadow-2xl border-white/20"
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <MdClose size={24} />
          </button>
        </div>

        <div className="p-8 text-gray-300 max-h-[70vh] overflow-y-auto">
          {children}
        </div>

        {footer && (
          <div className="p-6 border-t border-white/10 flex justify-end space-x-3">
            {footer}
          </div>
        )}
      </GlassCard>
    </div>
  );
};

export default Modal;
