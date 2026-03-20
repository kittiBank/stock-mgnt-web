"use client";

import { ReactNode } from "react";
import { X } from "lucide-react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  description?: string;
}

// Dialog/Modal component with shadcn UI styling for forms and confirmations
export default function Dialog({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  description,
}: DialogProps) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-2xl",
    lg: "max-w-3xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog container */}
      <div
        className={`relative bg-white rounded-2xl shadow-2xl ${sizeClasses[size]} w-full mx-4 overflow-hidden`}
      >
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-5 border-b border-blue-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-blue-950">{title}</h2>
            {description && (
              <p className="text-sm text-blue-700 mt-1">{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-white/50 text-blue-600 hover:text-blue-900 transition-colors"
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content area with padding */}
        <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
