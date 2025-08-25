
import React, { useState } from 'react';
import type { FareEstimate, CarOption } from '../types';
import { CreditCardIcon, QrCodeIcon, InformationCircleIcon } from './IconComponents';

type PaymentMethod = 'CARD' | 'UPI';

interface PaymentFormProps {
  estimate: FareEstimate;
  car: CarOption;
  onPaymentSuccess: () => void;
  onBack: () => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ estimate, car, onPaymentSuccess, onBack }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('CARD');
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);
  
  const advanceAmount = (estimate.fare * 0.2).toFixed(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToPolicy) {
        alert("Please agree to the cancellation policy to proceed.");
        return;
    }
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
        onPaymentSuccess();
    }, 2000);
  };
  
  if (isProcessing) {
      return (
         <div className="flex flex-col items-center justify-center p-8">
            <div className="w-16 h-16 border-4 border-t-4 border-slate-600 border-t-cyan-500 rounded-full animate-spin"></div>
            <p className="mt-4 text-slate-300">Processing your payment...</p>
        </div>
      );
  }

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-semibold text-center text-white mb-2">Advance Payment</h2>
      <p className="text-slate-400 text-center mb-6">A 20% advance is required to confirm your booking.</p>

       <div className="mb-6 bg-cyan-900/50 border border-cyan-700 rounded-lg p-4 text-center">
        <p className="text-sm text-cyan-300">Total Fare: ₹{estimate.fare.toLocaleString('en-IN')}</p>
        <p className="text-lg text-white">Advance to Pay (20%)</p>
        <p className="text-4xl font-extrabold text-white">₹{parseFloat(advanceAmount).toLocaleString('en-IN')}</p>
      </div>

      <div className="mb-6 bg-yellow-900/30 border border-yellow-700 rounded-lg p-3 flex items-center justify-center text-center space-x-3">
        <InformationCircleIcon className="w-6 h-6 text-yellow-400 flex-shrink-0"/>
        <p className="text-yellow-300 text-xs sm:text-sm">
            <strong>Cancellation Policy:</strong> The 20% advance payment is non-refundable.
        </p>
      </div>

      <div className="mb-4 flex border-b border-slate-600">
        <button 
          onClick={() => setPaymentMethod('CARD')}
          className={`py-2 px-4 text-sm font-medium transition ${paymentMethod === 'CARD' ? 'border-b-2 border-cyan-500 text-white' : 'text-slate-400'}`}
        >
          Credit/Debit Card
        </button>
        <button 
          onClick={() => setPaymentMethod('UPI')}
          className={`py-2 px-4 text-sm font-medium transition ${paymentMethod === 'UPI' ? 'border-b-2 border-cyan-500 text-white' : 'text-slate-400'}`}
        >
          UPI
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {paymentMethod === 'CARD' && (
          <div className="space-y-4 animate-fade-in-fast">
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-slate-400 mb-1">Card Number</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <CreditCardIcon className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="text"
                  name="cardNumber"
                  id="cardNumber"
                  placeholder="0000 0000 0000 0000"
                  required
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-3 pl-10 pr-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-slate-400 mb-1">Expiry Date</label>
                    <input
                        type="text"
                        name="expiryDate"
                        id="expiryDate"
                        placeholder="MM / YY"
                        required
                        className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-3 px-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                    />
                </div>
                <div>
                    <label htmlFor="cvc" className="block text-sm font-medium text-slate-400 mb-1">CVC</label>
                    <input
                        type="text"
                        name="cvc"
                        id="cvc"
                        placeholder="123"
                        required
                        className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-3 px-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                    />
                </div>
            </div>
          </div>
        )}

        {paymentMethod === 'UPI' && (
           <div className="space-y-4 animate-fade-in-fast">
                <div>
                    <label htmlFor="upiId" className="block text-sm font-medium text-slate-400 mb-1">UPI ID</label>
                    <input
                        type="text"
                        name="upiId"
                        id="upiId"
                        placeholder="yourname@bank"
                        required
                        className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-3 px-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                    />
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-slate-400 text-sm mb-2">or scan QR code</p>
                    <div className="p-2 bg-white rounded-lg">
                        <QrCodeIcon className="w-32 h-32 text-slate-800" />
                    </div>
                </div>
           </div>
        )}
        
        <div className="pt-2">
            <div className="flex items-start">
                <input
                    id="policy-agreement"
                    name="policy-agreement"
                    type="checkbox"
                    checked={agreedToPolicy}
                    onChange={(e) => setAgreedToPolicy(e.target.checked)}
                    className="h-4 w-4 mt-1 rounded border-slate-500 bg-slate-700 text-cyan-600 focus:ring-cyan-500 cursor-pointer"
                />
                <label htmlFor="policy-agreement" className="ml-3 block text-sm text-slate-400">
                    I have read and agree to the{' '}
                    <span className="font-semibold text-white">non-refundable</span> advance payment policy.
                </label>
            </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <button
            type="button"
            onClick={onBack}
            className="w-full bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
            >
            Go Back
            </button>
            <button
            type="submit"
            disabled={!agreedToPolicy}
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg shadow-cyan-600/20 disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none"
            >
            Pay ₹{parseFloat(advanceAmount).toLocaleString('en-IN')} Now
            </button>
        </div>
      </form>
    </div>
  );
};