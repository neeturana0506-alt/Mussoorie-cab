
import React from 'react';
import type { BookingDetails, CarOption } from '../types';
import { CheckCircleIcon, PhoneIcon } from './IconComponents';
import { useUser } from '../UserContext';

interface BookingConfirmationProps {
  details: BookingDetails;
  car: CarOption;
  fare: number;
  onNewBooking: () => void;
}

export const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ details, car, fare, onNewBooking }) => {
  const { userRole, userIdentifier } = useUser();
  const advancePaid = fare * 0.2;
  const remainingDue = fare * 0.8;

  return (
    <div className="text-center animate-fade-in">
      <CheckCircleIcon className="w-20 h-20 text-green-400 mx-auto mb-4" />
      <h2 className="text-3xl font-bold text-white">Booking Confirmed!</h2>
      <p className="text-slate-400 mt-2 mb-6">Your Mussoorie Cab is on its way.</p>

      <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-6 text-left space-y-3">
        <p><span className="font-semibold text-slate-300 w-28 inline-block">From:</span> <span className="text-white">{details.pickup}</span></p>
        <p><span className="font-semibold text-slate-300 w-28 inline-block">To:</span> <span className="text-white">{details.dropoff}</span></p>
        <p><span className="font-semibold text-slate-300 w-28 inline-block">Date & Time:</span> <span className="text-white">{details.date} at {details.time}</span></p>
        <p><span className="font-semibold text-slate-300 w-28 inline-block">Vehicle:</span> <span className="text-white">{car.name}</span></p>
        <div className="border-t border-slate-600 my-2"></div>
        <p><span className="font-semibold text-slate-300 w-28 inline-block">Total Fare:</span> <span className="text-white font-bold">₹{fare.toLocaleString('en-IN')}</span></p>
        {userRole === 'GUEST' && (
          <>
            <p><span className="font-semibold text-slate-300 w-28 inline-block">Advance Paid:</span> <span className="text-green-400 font-bold">- ₹{advancePaid.toLocaleString('en-IN')}</span></p>
            <p><span className="font-semibold text-slate-300 w-28 inline-block">Remaining Due:</span> <span className="text-yellow-400 font-bold">₹{remainingDue.toLocaleString('en-IN')}</span></p>
          </>
        )}
         <p className="text-xs text-slate-400 pt-2 italic">*Final fare does not include tolls, parking, or extra waiting charges.</p>
         {userRole === 'GUEST' && (
            <p className="text-xs text-yellow-400 pt-1 italic">*Please note: The advance payment is non-refundable as per our cancellation policy.</p>
         )}
      </div>

      <div className="mt-6 bg-slate-700/50 border border-slate-600 rounded-lg p-4 flex items-center justify-center text-center space-x-3">
        <PhoneIcon className="w-5 h-5 text-cyan-400 flex-shrink-0"/>
        <p className="text-slate-300 text-sm sm:text-base">
          Need help? Call our helpline: <a href="tel:8979973148" className="font-bold text-white hover:underline">8979973148</a>
        </p>
      </div>

       {userRole === 'GUEST' && userIdentifier && (
         <p className="text-sm text-slate-500 mt-6">A confirmation message has been sent to +91 {userIdentifier}.</p>
       )}


      <div className="mt-8">
        <button
          onClick={onNewBooking}
          className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
        >
          Make Another Booking
        </button>
      </div>
    </div>
  );
};