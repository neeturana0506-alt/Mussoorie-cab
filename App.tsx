import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { BookingForm } from './components/BookingForm';
import { CarSelection } from './components/CarSelection';
import { FareDetails } from './components/FareDetails';
import { BookingConfirmation } from './components/BookingConfirmation';
import { Loader } from './components/Loader';
import type { BookingDetails, FareEstimate, AppStep, CarOption, UserRole } from './types';
import { CarType } from './types';
import { getFareEstimate } from './services/geminiService';
import { CAR_OPTIONS } from './components/constants';
import { PhoneIcon } from './components/IconComponents';
import { UserProvider, useUser } from './UserContext';
import { Login } from './components/Login';
import { AdminPanel } from './components/AdminPanel';
import { PaymentForm } from './components/PaymentForm';
import { InstallPWAButton } from './components/InstallPWAButton';

const AppContent: React.FC = () => {
  const { userRole, userIdentifier, logout } = useUser();
  const [step, setStep] = useState<AppStep>('BOOKING_FORM');
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    pickup: '',
    dropoff: '',
    date: '',
    time: '',
  });
  
  const [carRates, setCarRates] = useState<Record<CarType, CarOption>>(CAR_OPTIONS);
  const [selectedCar, setSelectedCar] = useState<CarOption>(carRates[CarType.SEDAN]);
  const [fareEstimate, setFareEstimate] = useState<FareEstimate | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    // Update selected car details if rates change
    if (selectedCar) {
      setSelectedCar(prevCar => carRates[prevCar.type]);
    }
  }, [carRates]);

  const handleBookingSubmit = useCallback(async (details: BookingDetails) => {
    setIsLoading(true);
    setError(null);
    setBookingDetails(details);

    try {
      const estimate = await getFareEstimate(details, selectedCar.type, carRates);
      setFareEstimate(estimate);
      setStep('FARE_DETAILS');
    } catch (err) {
      setError('Failed to get a fare estimate. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCar, carRates]);

  const handleConfirmBooking = () => {
    if (userRole === 'GUEST') {
      setStep('PAYMENT');
    } else {
      // Admin skips payment
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep('CONFIRMED');
      }, 1500);
    }
  };

  const handlePaymentSuccess = () => {
    setIsLoading(true);
    // Simulate final booking confirmation after payment
    setTimeout(() => {
      setIsLoading(false),
      setStep('CONFIRMED');
    }, 1500);
  };

  const handleBackToFareDetails = () => {
    setStep('FARE_DETAILS');
  };

  const handleNewBooking = () => {
    setStep('BOOKING_FORM');
    setBookingDetails({ pickup: '', dropoff: '', date: '', time: '' });
    setSelectedCar(carRates[CarType.SEDAN]);
    setFareEstimate(null);
    setError(null);
  };
  
  if (!userRole) {
    return <Login />;
  }

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }

    switch (step) {
      case 'BOOKING_FORM':
        return (
          <>
            {userRole === 'ADMIN' && <AdminPanel currentRates={carRates} onSave={setCarRates} />}
            <BookingForm onSubmit={handleBookingSubmit} initialDetails={bookingDetails} />
            <CarSelection carRates={carRates} selectedCar={selectedCar.type} onSelectCar={(carType) => setSelectedCar(carRates[carType])} />
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          </>
        );
      case 'FARE_DETAILS':
        return (
          fareEstimate && (
            <FareDetails
              estimate={fareEstimate}
              car={selectedCar}
              bookingDetails={bookingDetails}
              onConfirm={handleConfirmBooking}
              onBack={handleNewBooking}
            />
          )
        );
      case 'PAYMENT':
        return (
            fareEstimate && (
                <PaymentForm 
                    estimate={fareEstimate}
                    car={selectedCar}
                    onPaymentSuccess={handlePaymentSuccess}
                    onBack={handleBackToFareDetails}
                />
            )
        );
      case 'CONFIRMED':
        return (
          fareEstimate && (
            <BookingConfirmation
              details={bookingDetails}
              car={selectedCar}
              fare={fareEstimate.fare}
              onNewBooking={handleNewBooking}
            />
          )
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center p-4 sm:p-6 lg:p-8 font-sans bg-grid-slate-800/[0.2]">
        <div 
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-900/50 -z-10"
        ></div>
        <Header />
        <main className="w-full max-w-2xl mx-auto mt-8 flex-grow">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-2xl shadow-cyan-500/10 border border-slate-700">
                <div className="p-6 sm:p-8">
                    {renderContent()}
                </div>
            </div>
            <footer className="text-center text-slate-500 text-sm mt-8 space-y-2">
                <div className="flex items-center justify-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <PhoneIcon className="w-4 h-4" />
                        <span>Helpline: <a href="tel:8979973148" className="hover:text-cyan-400 transition">8979973148</a></span>
                    </div>
                     {userRole === 'ADMIN' && userIdentifier && (
                        <span className="hidden sm:inline">|</span>
                        <span className="hidden sm:inline">{userIdentifier}</span>
                    )}
                    <InstallPWAButton />
                    <button onClick={logout} className="hover:text-cyan-400 transition">
                        Logout
                    </button>
                </div>
                <p>Powered by Gemini AI</p>
            </footer>
        </main>
    </div>
  );
};

const App: React.FC = () => (
  <UserProvider>
    <AppContent />
  </UserProvider>
);

export default App;