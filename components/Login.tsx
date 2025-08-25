
import React, { useState } from 'react';
import { useUser } from '../UserContext';
import { Header } from './Header';
import { DevicePhoneMobileIcon, KeyIcon, EnvelopeIcon, LockClosedIcon } from './IconComponents';

type AdminLoginMethod = 'CHOICE' | 'EMAIL' | 'MOBILE_INPUT' | 'MOBILE_OTP';
type LoginStep = 'ROLE_SELECTION' | 'GUEST_MOBILE_INPUT' | 'GUEST_OTP_INPUT' | 'ADMIN_LOGIN';

export const Login: React.FC = () => {
  const { login } = useUser();
  const [step, setStep] = useState<LoginStep>('ROLE_SELECTION');
  
  // Guest states
  const [guestMobile, setGuestMobile] = useState('');
  const [guestOtp, setGuestOtp] = useState('');

  // Admin states
  const [adminLoginMethod, setAdminLoginMethod] = useState<AdminLoginMethod>('CHOICE');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminMobile, setAdminMobile] = useState('');
  const [adminOtp, setAdminOtp] = useState('');

  // Simulated OTP state
  const [simulatedOtp, setSimulatedOtp] = useState('');
  
  const handleGuestLogin = () => {
    setStep('GUEST_MOBILE_INPUT');
  };
  
  const handleAdminLogin = () => {
    setAdminLoginMethod('CHOICE'); // Reset on entry
    setStep('ADMIN_LOGIN');
  };

  // --- GUEST HANDLERS ---
  const handleGuestMobileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (/^\d{10}$/.test(guestMobile)) {
      const fakeOtp = "123456";
      setSimulatedOtp(fakeOtp);
      console.log(`Simulated OTP for guest ${guestMobile}: ${fakeOtp}`);
      setStep('GUEST_OTP_INPUT');
    } else {
      alert('Please enter a valid 10-digit mobile number.');
    }
  };

  const handleGuestOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guestOtp === simulatedOtp) { 
      login('GUEST', guestMobile);
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };
  
  // --- ADMIN HANDLERS ---
  const handleAdminEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hardcoded admin credentials for demo purposes
    const validAdmins: Record<string, string> = {
      'admin@mussooriecab.com': 'password123',
      'manphool3244@gmail.com': 'password123',
    };

    if (validAdmins[adminEmail] === adminPassword) {
      login('ADMIN', adminEmail);
    } else {
      alert('Invalid admin credentials.');
    }
  };
  
  const handleAdminMobileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, we check against hardcoded admin numbers.
    const validAdminMobiles = ['9999999999', '8384825527'];
    if (validAdminMobiles.includes(adminMobile)) {
       const fakeOtp = "987654";
       setSimulatedOtp(fakeOtp);
       console.log(`Simulated OTP for admin ${adminMobile}: ${fakeOtp}`);
       setAdminLoginMethod('MOBILE_OTP');
    } else {
       alert('This mobile number is not registered for admin access.');
    }
  };

  const handleAdminOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminOtp === simulatedOtp) {
      login('ADMIN', adminMobile);
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  // --- RENDER FUNCTIONS ---
  const renderAdminLogin = () => {
     switch(adminLoginMethod) {
       case 'CHOICE':
         return (
           <div className="space-y-4">
              <h2 className="text-xl font-bold text-center text-white mb-6">Admin Login</h2>
              <button onClick={() => setAdminLoginMethod('EMAIL')} className="w-full flex items-center justify-center space-x-3 bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 px-4 rounded-lg transition">
                 <EnvelopeIcon className="h-5 w-5" />
                 <span>Login with Email</span>
              </button>
              <button onClick={() => setAdminLoginMethod('MOBILE_INPUT')} className="w-full flex items-center justify-center space-x-3 bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 px-4 rounded-lg transition">
                 <DevicePhoneMobileIcon className="h-5 w-5" />
                 <span>Login with Mobile OTP</span>
              </button>
              <button
                type="button"
                onClick={() => setStep('ROLE_SELECTION')}
                className="w-full text-center text-slate-400 hover:text-cyan-400 text-sm mt-2 pt-2"
              >
                Back to Role Selection
              </button>
           </div>
         );

        case 'EMAIL':
            return (
              <form onSubmit={handleAdminEmailSubmit} className="space-y-4">
                <h2 className="text-xl font-bold text-center text-white mb-6">Admin Email Login</h2>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-1">Email Address</label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <EnvelopeIcon className="h-5 w-5 text-slate-500" />
                    </div>
                    <input type="email" name="email" id="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} placeholder="your@email.com" required className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-3 pl-10 pr-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"/>
                  </div>
                </div>
                 <div>
                  <label htmlFor="password" className="block text-sm font-medium text-slate-400 mb-1">Password</label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <LockClosedIcon className="h-5 w-5 text-slate-500" />
                    </div>
                    <input type="password" name="password" id="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} placeholder="••••••••" required className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-3 pl-10 pr-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"/>
                  </div>
                </div>
                <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg transition">Login</button>
                 <button type="button" onClick={() => setAdminLoginMethod('CHOICE')} className="w-full text-center text-slate-400 hover:text-cyan-400 text-sm mt-2">Back</button>
              </form>
            );

        case 'MOBILE_INPUT':
            return (
               <form onSubmit={handleAdminMobileSubmit} className="space-y-4">
                 <h2 className="text-xl font-bold text-center text-white mb-6">Admin Mobile Login</h2>
                <div>
                  <label htmlFor="adminMobile" className="block text-sm font-medium text-slate-400 mb-1">Admin Mobile Number</label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <DevicePhoneMobileIcon className="h-5 w-5 text-slate-500" />
                    </div>
                    <input type="tel" name="adminMobile" id="adminMobile" value={adminMobile} onChange={(e) => setAdminMobile(e.target.value)} placeholder="Enter admin mobile" required maxLength={10} className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-3 pl-10 pr-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"/>
                  </div>
                </div>
                <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg transition">Get OTP</button>
                <button type="button" onClick={() => setAdminLoginMethod('CHOICE')} className="w-full text-center text-slate-400 hover:text-cyan-400 text-sm mt-2">Back</button>
              </form>
            );
        
        case 'MOBILE_OTP':
            return (
                <form onSubmit={handleAdminOtpSubmit} className="space-y-4">
                     <h2 className="text-xl font-bold text-center text-white mb-6">Enter Admin OTP</h2>
                    <p className="text-center text-sm text-slate-400 -mt-4 mb-4">An OTP was sent to +91 {adminMobile}</p>
                    <p className="text-center text-sm text-cyan-300 bg-cyan-900/50 rounded-md py-2 mb-4">
                      For demo, your OTP is: <strong className="font-bold text-white tracking-widest">{simulatedOtp}</strong>
                    </p>
                    <div>
                    <label htmlFor="adminOtp" className="block text-sm font-medium text-slate-400 mb-1">One-Time Password</label>
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <KeyIcon className="h-5 w-5 text-slate-500" />
                        </div>
                        <input type="text" name="adminOtp" id="adminOtp" value={adminOtp} onChange={(e) => setAdminOtp(e.target.value)} placeholder="Enter OTP" required maxLength={6} className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-3 pl-10 pr-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"/>
                    </div>
                    </div>
                    <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg transition">Verify & Login</button>
                    <button type="button" onClick={() => setAdminLoginMethod('MOBILE_INPUT')} className="w-full text-center text-slate-400 hover:text-cyan-400 text-sm mt-2">Back</button>
              </form>
            );
     }
  }

  const renderStep = () => {
    switch (step) {
      case 'ADMIN_LOGIN':
        return renderAdminLogin();

      case 'GUEST_MOBILE_INPUT':
        return (
          <form onSubmit={handleGuestMobileSubmit} className="space-y-4">
             <h2 className="text-xl font-bold text-center text-white mb-6">Guest Login</h2>
            <div>
              <label htmlFor="guestMobile" className="block text-sm font-medium text-slate-400 mb-1">Mobile Number</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <DevicePhoneMobileIcon className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="tel"
                  name="guestMobile"
                  id="guestMobile"
                  value={guestMobile}
                  onChange={(e) => setGuestMobile(e.target.value)}
                  placeholder="e.g., 9876543210"
                  required
                  maxLength={10}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-3 pl-10 pr-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg transition"
            >
              Get OTP
            </button>
             <button
              type="button"
              onClick={() => setStep('ROLE_SELECTION')}
              className="w-full text-center text-slate-400 hover:text-cyan-400 text-sm mt-2"
            >
              Back
            </button>
          </form>
        );

      case 'GUEST_OTP_INPUT':
          return (
            <form onSubmit={handleGuestOtpSubmit} className="space-y-4">
                 <h2 className="text-xl font-bold text-center text-white mb-6">Enter OTP</h2>
                <p className="text-center text-sm text-slate-400 -mt-4 mb-4">An OTP was sent to +91 {guestMobile}</p>
                <p className="text-center text-sm text-cyan-300 bg-cyan-900/50 rounded-md py-2 mb-4">
                  For demo, your OTP is: <strong className="font-bold text-white tracking-widest">{simulatedOtp}</strong>
                </p>
                <div>
                <label htmlFor="guestOtp" className="block text-sm font-medium text-slate-400 mb-1">One-Time Password</label>
                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <KeyIcon className="h-5 w-5 text-slate-500" />
                    </div>
                    <input
                    type="text"
                    name="guestOtp"
                    id="guestOtp"
                    value={guestOtp}
                    onChange={(e) => setGuestOtp(e.target.value)}
                    placeholder="Enter OTP"
                    required
                    maxLength={6}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-3 pl-10 pr-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                    />
                </div>
                </div>
                <button
                type="submit"
                className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg transition"
                >
                Verify & Continue
                </button>
                <button
                type="button"
                onClick={() => setStep('GUEST_MOBILE_INPUT')}
                className="w-full text-center text-slate-400 hover:text-cyan-400 text-sm mt-2"
                >
                Back
                </button>
            </form>
            );

      case 'ROLE_SELECTION':
      default:
        return (
          <div className="space-y-4">
            <button
              onClick={handleAdminLogin}
              className="w-full bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 px-4 rounded-lg transition"
            >
              Login as Admin
            </button>
            <button
              onClick={handleGuestLogin}
              className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg transition"
            >
              Continue as Guest
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 font-sans bg-grid-slate-800/[0.2]">
       <div 
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-900/50 -z-10"
        ></div>
        <Header />
        <main className="w-full max-w-sm mx-auto mt-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-2xl shadow-cyan-500/10 border border-slate-700">
                <div className="p-6 sm:p-8">
                    {renderStep()}
                </div>
            </div>
        </main>
    </div>
  );
};