
import React from 'react';
import type { FareEstimate, CarOption, BookingDetails } from '../types';
import { MapPinIcon, InformationCircleIcon } from './IconComponents';
import { useUser } from '../UserContext';

interface FareDetailsProps {
  estimate: FareEstimate;
  car: CarOption;
  bookingDetails: BookingDetails;
  onConfirm: () => void;
  onBack: () => void;
}

export const FareDetails: React.FC<FareDetailsProps> = ({ estimate, car, bookingDetails, onConfirm, onBack }) => {
  const { userRole } = useUser();
  const IconComponent = car.icon;
  
  return (
    <div className="animate-fade-in text-center">
      <h2 className="text-2xl font-semibold text-white mb-2">Trip Estimate</h2>
      <p className="text-slate-400 mb-6">Review your trip details and confirm.</p>
      
      <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-6 space-y-4 text-left">
          <div className="flex items-center space-x-4">
              <IconComponent className="w-12 h-12 text-cyan-400" />
              <div>
                  <h3 className="text-xl font-bold text-white">{car.name}</h3>
                  <p className="text-slate-400">{car.capacity}</p>
              </div>
          </div>
          <div className="border-t border-slate-600 my-4"></div>
          <div className="space-y-3">
              <div className="flex items-start">
                  <MapPinIcon className="w-5 h-5 text-green-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                      <span className="font-semibold text-slate-300">From: </span>
                      <span className="text-white">{bookingDetails.pickup}</span>
                  </div>
              </div>
              <div className="flex items-start">
                  <MapPinIcon className="w-5 h-5 text-red-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                      <span className="font-semibold text-slate-300">To: </span>
                      <span className="text-white">{bookingDetails.dropoff}</span>
                  </div>
              </div>
          </div>
          <div className="border-t border-slate-600 my-4"></div>
          <p className="text-slate-300 italic">"{estimate.description}"</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6 text-center">
        <div className="bg-slate-700/50 p-4 rounded-lg">
          <p className="text-sm text-slate-400">Distance</p>
          <p className="text-xl font-bold text-white">{estimate.distance}</p>
        </div>
        <div className="bg-slate-700/50 p-4 rounded-lg">
          <p className="text-sm text-slate-400">Duration</p>
          <p className="text-xl font-bold text-white">{estimate.duration}</p>
        </div>
      </div>

      <div className="mt-6 bg-cyan-900/50 border border-cyan-700 rounded-lg p-4">
        <p className="text-lg text-cyan-300">Estimated Fare</p>
        <p className="text-4xl font-extrabold text-white">₹{estimate.fare.toLocaleString('en-IN')}</p>
      </div>

       <div className="mt-4 bg-slate-700/50 border border-slate-600 rounded-lg p-3 flex items-center justify-center text-center space-x-3">
        <InformationCircleIcon className="w-5 h-5 text-slate-400 flex-shrink-0"/>
        <p className="text-slate-400 text-xs sm:text-sm">
          Extra charges for tolls, parking, and waiting time may apply.
        </p>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button
          onClick={onBack}
          className="w-full bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
        >
          Go Back
        </button>
        <button
          onClick={onConfirm}
          className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg shadow-cyan-600/20"
        >
          {userRole === 'GUEST' ? 'Proceed to Payment' : 'Confirm Booking'}
        </button>
      </div>
    </div>
  );
};