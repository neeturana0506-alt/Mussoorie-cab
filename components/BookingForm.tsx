
import React, { useState } from 'react';
import type { BookingDetails } from '../types';
import { MapPinIcon, CalendarIcon, ClockIcon } from './IconComponents';

interface BookingFormProps {
  onSubmit: (details: BookingDetails) => void;
  initialDetails: BookingDetails;
}

export const BookingForm: React.FC<BookingFormProps> = ({ onSubmit, initialDetails }) => {
  const [details, setDetails] = useState<BookingDetails>(initialDetails);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (details.pickup && details.dropoff && details.date && details.time) {
      onSubmit(details);
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <form id="booking-form" onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-semibold text-center text-white mb-6">Plan Your Ride</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="pickup" className="block text-sm font-medium text-slate-400 mb-1">Pickup Location</label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MapPinIcon className="h-5 w-5 text-slate-500" />
            </div>
            <input
              type="text"
              name="pickup"
              id="pickup"
              value={details.pickup}
              onChange={handleChange}
              placeholder="e.g., Library Chowk"
              required
              className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-3 pl-10 pr-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            />
          </div>
        </div>
        <div>
          <label htmlFor="dropoff" className="block text-sm font-medium text-slate-400 mb-1">Drop-off Location</label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MapPinIcon className="h-5 w-5 text-slate-500" />
            </div>
            <input
              type="text"
              name="dropoff"
              id="dropoff"
              value={details.dropoff}
              onChange={handleChange}
              placeholder="e.g., Lal Tibba"
              required
              className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-3 pl-10 pr-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-slate-400 mb-1">Date</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <CalendarIcon className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="date"
                name="date"
                id="date"
                value={details.date}
                onChange={handleChange}
                required
                className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-3 pl-10 pr-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
              />
            </div>
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-slate-400 mb-1">Time</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <ClockIcon className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="time"
                name="time"
                id="time"
                value={details.time}
                onChange={handleChange}
                required
                className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-3 pl-10 pr-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};