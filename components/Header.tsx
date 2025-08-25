
import React from 'react';
import { LogoIcon } from './IconComponents';

export const Header: React.FC = () => {
  return (
    <header className="w-full max-w-2xl mx-auto flex flex-col items-center text-center">
      <div className="bg-cyan-500/10 p-4 rounded-full">
        <LogoIcon className="w-12 h-12 text-cyan-400" />
      </div>
      <h1 className="text-4xl sm:text-5xl font-bold text-white mt-4 tracking-tight">
        Mussoorie Cab
      </h1>
      <p className="text-lg text-slate-400 mt-2">
        Your Premier Taxi Service in the Queen of Hills
      </p>
    </header>
  );
};