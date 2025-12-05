import React from 'react';

interface MobileFrameProps {
  children: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children, header, footer }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white h-[850px] rounded-[3rem] shadow-2xl border-8 border-gray-900 overflow-hidden relative flex flex-col">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-xl z-50"></div>
        
        {/* Status Bar Shim */}
        <div className="h-8 bg-gray-50 w-full shrink-0"></div>

        {/* Header */}
        <div className="shrink-0 bg-white border-b border-gray-100 z-10">
          {header}
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50 pb-20 scroll-smooth">
          {children}
        </div>

        {/* Footer Navigation */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 h-20 pb-4 z-40">
          {footer}
        </div>
      </div>
    </div>
  );
};