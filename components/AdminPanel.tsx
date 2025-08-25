
import React, { useState, useEffect } from 'react';
import type { CarOption } from '../types';
import { CarType } from '../types';

interface AdminPanelProps {
  currentRates: Record<CarType, CarOption>;
  onSave: (newRates: Record<CarType, CarOption>) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ currentRates, onSave }) => {
  const [rates, setRates] = useState(currentRates);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setRates(currentRates);
  }, [currentRates]);

  const handleChange = (carType: CarType, field: 'baseFare' | 'perKm', value: string) => {
    const numericValue = Number(value);
    if (!isNaN(numericValue) && numericValue >= 0) {
      setRates(prevRates => ({
        ...prevRates,
        [carType]: {
          ...prevRates[carType],
          [field]: numericValue,
        },
      }));
    }
  };

  const handleSave = () => {
    onSave(rates);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000); // Hide message after 2 seconds
  };

  return (
    <div className="mb-8 p-4 border border-cyan-700 bg-cyan-900/20 rounded-lg">
      <h3 className="text-xl font-semibold text-center text-white mb-4">Rate Management</h3>
      <div className="space-y-4">
        {Object.values(rates).map(car => (
          <div key={car.type} className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
            <label className="text-slate-300 sm:col-span-1">{car.name} Rates</label>
            <div className="relative sm:col-span-1">
               <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">₹</span>
                <input
                  type="number"
                  value={car.baseFare}
                  onChange={(e) => handleChange(car.type, 'baseFare', e.target.value)}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 pl-7 pr-3 text-white placeholder-slate-400 focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition"
                  aria-label={`${car.name} Base Fare`}
                />
            </div>
            <div className="relative sm:col-span-1">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">₹</span>
                <input
                  type="number"
                  value={car.perKm}
                  onChange={(e) => handleChange(car.type, 'perKm', e.target.value)}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 pl-7 pr-12 text-white placeholder-slate-400 focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition"
                   aria-label={`${car.name} Per Kilometer Rate`}
                />
                 <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">/km</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-end items-center">
         {isSaved && <p className="text-green-400 text-sm mr-4 transition-opacity duration-300">Rates saved!</p>}
        <button
          onClick={handleSave}
          className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          Save Rates
        </button>
      </div>
    </div>
  );
};