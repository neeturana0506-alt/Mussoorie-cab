
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="w-16 h-16 border-4 border-t-4 border-slate-600 border-t-cyan-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-slate-300">Calculating your fare...</p>
    </div>
  );
};