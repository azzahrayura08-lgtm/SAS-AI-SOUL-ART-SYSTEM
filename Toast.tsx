import React from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-2.5 bg-[#14131A]/95 text-[#FAF7F2] border border-[#E5AA9C]/30 rounded-xl shadow-xl backdrop-blur-md animate-fade-in text-sm max-w-[90vw]">
      <CheckCircle2 className="w-4 h-4 text-[#E5AA9C] shrink-0" />
      <span className="font-medium text-xs sm:text-sm tracking-wide">{message}</span>
      <button 
        onClick={onClose}
        className="ml-2 text-[#FAF7F2]/60 hover:text-[#FAF7F2] p-1 rounded-md transition-colors"
        aria-label="Close notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
