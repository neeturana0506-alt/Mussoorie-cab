
import React from 'react';
import type { CarOption } from '../types';
import { CarType } from '../types';
import { PhoneIcon } from './IconComponents';

interface CarSelectionProps {
  selectedCar: CarType;
  onSelectCar: (car: CarType) => void;
  carRates: Record<CarType, CarOption>;
}

export const CarSelection: React.FC<CarSelectionProps> = ({ selectedCar, onSelectCar, carRates }) => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-center text-white mb-4">Choose Your Vehicle</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.values(carRates).map((car) => {
          const IconComponent = car.icon;
          return (
            <button
              key={car.type}
              onClick={() => onSelectCar(car.type)}
              className={`p-4 border-2 rounded-lg text-center transition duration-200 flex flex-col items-center justify-between h-full ${
                selectedCar === car.type
                  ? 'bg-cyan-500/20 border-cyan-500'
                  : 'bg-slate-700/50 border-slate-600 hover:border-cyan-600'
              }`}
            >
              <div className="flex-grow">
                <IconComponent className="w-16 h-16 text-cyan-400 mx-auto" />
                <p className="font-bold mt-2 text-white">{car.name}</p>
                <p className="text-sm text-slate-400">{car.capacity}</p>
              </div>
              <div className="mt-3 bg-slate-800/50 rounded-md px-2 py-1 w-full text-xs">
                  <p className="text-slate-300">
                      <span className="font-semibold text-white">₹{car.baseFare}</span> base + <span className="font-semibold text-white">₹{car.perKm}</span>/km
                  </p>
              </div>
            </button>
          );
        })}
      </div>
      <div className="mt-8">
         <button
            type="submit"
            form="booking-form" // This targets the form in BookingForm.tsx
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg shadow-cyan-600/20"
          >
            Get Fare Estimate
          </button>

          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-slate-600"></div>
            <span className="flex-shrink mx-4 text-slate-500 text-sm">OR</span>
            <div className="flex-grow border-t border-slate-600"></div>
          </div>

          <a
            href="tel:8979973148"
            className="w-full flex items-center justify-center gap-x-3 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 text-slate-200 font-bold py-3 px-4 rounded-lg transition duration-300"
          >
            <PhoneIcon className="w-5 h-5" />
            <span>Book on Call: 8979973148</span>
          </a>
      </div>
    </div>
  );
};