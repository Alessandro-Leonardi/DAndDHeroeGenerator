import React, { useState } from 'react';
import { GLOSSARY } from '../data/glossary';

interface TooltipProps {
  term: keyof typeof GLOSSARY | string;
  definition: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ term, definition, children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <span className="relative inline-block group cursor-help">
      <span 
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="border-b border-dotted border-amber-500 text-amber-200"
      >
        {children}
      </span>
      
      {visible && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-slate-800 border border-amber-600 rounded-lg shadow-2xl animate-in fade-in zoom-in duration-200">
          <p className="text-[10px] font-bold text-amber-500 uppercase mb-1">{term}</p>
          <p className="text-[11px] text-slate-200 leading-tight leading-relaxed">
            {definition}
          </p>
          {/* Triângulo do Tooltip */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-800" />
        </div>
      )}
    </span>
  );
};

export default Tooltip;