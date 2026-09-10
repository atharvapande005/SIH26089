import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkers } from '../context/WorkerContext';

export default function CustomerSignup() {
  const { loginAs } = useWorkers();
  const navigate = useNavigate();

  // Mobile & Name state
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [userOtp, setUserOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [formError, setFormError] = useState('');

  const handleGetOtp = () => {
    if (!name.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!mobile.trim()) {
      setFormError('Please enter your mobile number.');
      return;
    }
    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(newOtp);
    setOtpSent(true);
    setOtpVerified(false);
    setUserOtp('');
    setOtpError('');
    setFormError('');
  };

  const handleVerifyOtp = () => {
    if (userOtp.trim() === generatedOtp) {
      setOtpVerified(true);
      setOtpError('');
      setFormError('');
    } else {
      setOtpError('Incorrect OTP, please try again.');
    }
  };

  const handleResendOtp = () => {
    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(newOtp);
    setUserOtp('');
    setOtpError('');
  };

  const handleCitizenLogin = (e) => {
    if (e) e.preventDefault();
    if (!name.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!otpVerified) {
      setFormError('Please verify your mobile number with OTP before completing registration.');
      if (!otpSent) {
        handleGetOtp();
      }
      return;
    }
    loginAs('citizen', { name: name.trim(), phone: mobile.trim() });
    navigate('/service-search');
  };

  const handleDirectSignIn = () => {
    const citizenName = name.trim() || 'Registered Citizen';
    loginAs('citizen', { name: citizenName, phone: mobile.trim() });
    navigate('/service-search');
  };

  return (
    <div className="w-full flex-1 bg-surface-canvas flex flex-col justify-center items-center p-4 md:p-8">
      <div className="flex flex-col w-full max-w-2xl items-center justify-center py-4">
        {/* Ribbon */}
        <div className="w-full flex items-center justify-between pb-3 text-text-secondary text-xs uppercase tracking-wider font-semibold">
          <span className="flex items-center gap-1 text-primary">
            <span className="material-symbols-outlined text-gov-saffron text-[18px]">verified_user</span>
            G2C Citizen Service Onboarding Portal
          </span>
          <span className="flex items-center gap-1 text-text-muted hidden sm:flex">
            <span className="material-symbols-outlined text-[16px]">lock</span>
            256-Bit SSL Encrypted
          </span>
        </div>

        {/* Card */}
        <div className="w-full bg-surface-card border border-border-subtle shadow-sm">
          {/* Card Top Header */}
          <div className="bg-[#F0F4F8] border-b border-border-subtle p-6 flex items-start gap-4">
            <div className="w-12 h-12 bg-primary-container text-on-primary flex items-center justify-center shrink-0 border border-primary">
              <span className="material-symbols-outlined text-[28px]">how_to_reg</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h1 className="text-xl text-primary font-bold tracking-tight">
                  Citizen Registration / नागरिक पंजीकरण
                </h1>
                <span className="bg-surface-container text-primary text-xs px-2 py-0.5 border border-secondary/30 font-semibold">
                  FORM CR-01
                </span>
              </div>
              <p className="text-xs text-text-secondary mt-1">
                Create an official citizen account to book verified cooperative society service personnel.
              </p>
            </div>
          </div>

          {/* Statutory Notice */}
          <div className="bg-surface-canvas border-b border-border-subtle px-6 py-2.5 flex items-center gap-2 text-text-secondary text-xs">
            <span className="material-symbols-outlined text-status-info text-[18px] shrink-0">info</span>
            <span>Simplified onboarding form. Fields marked with (<span className="text-status-danger font-bold">*</span>) are required.</span>
          </div>

          {formError && (
            <div className="mx-6 mt-4 p-3 bg-red-50 border border-status-danger text-status-danger text-xs font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              <span>{formError}</span>
            </div>
          )}

          {/* Form */}
          <form className="p-6 flex flex-col gap-4" onSubmit={handleCitizenLogin}>
            {/* Field 1: Full Name */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-text-primary flex items-center gap-1">
                Full Name (as per Aadhaar / Official ID) <span className="text-status-danger">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setFormError('');
                }}
                className="w-full h-10 px-3 bg-surface-card border border-border-strong text-xs focus:border-primary focus:outline-none placeholder:text-text-muted"
                placeholder="Enter full name e.g. Priya Sharma"
              />
            </div>

            {/* Field 2: Mobile Number & OTP Verification */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-text-primary flex items-center gap-1">
                Mobile Number (Linked with OTP) <span className="text-status-danger">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="flex-1 h-10 px-3 bg-surface-card border border-border-strong text-xs focus:border-primary focus:outline-none placeholder:text-text-muted"
                  placeholder="10-digit mobile number"
                  disabled={otpVerified}
                />
                {!otpVerified ? (
                  <button
                    type="button"
                    onClick={handleGetOtp}
                    className="px-4 h-10 bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container shrink-0 cursor-pointer"
                  >
                    {otpSent ? 'Get New OTP' : 'Get OTP'}
                  </button>
                ) : (
                  <div className="px-3 h-10 bg-green-50 border border-status-success text-status-success font-bold text-xs flex items-center gap-1 shrink-0">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    OTP Verified ✓
                  </div>
                )}
              </div>

              {/* Simulated OTP Hint & Input */}
              {otpSent && !otpVerified && (
                <div className="mt-2 p-3 bg-surface-canvas border border-border-subtle rounded flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-muted italic font-medium">
                      Demo Mode: Your OTP is <strong className="text-primary font-bold text-sm bg-yellow-100 px-1.5 py-0.5 rounded">{generatedOtp}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="text-xs text-primary font-semibold underline hover:text-gov-saffron cursor-pointer"
                    >
                      Resend OTP
                    </button>
                  </div>

                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      maxLength={6}
                      value={userOtp}
                      onChange={(e) => {
                        setUserOtp(e.target.value);
                        setOtpError('');
                      }}
                      className="w-36 h-9 px-3 bg-white border border-border-strong text-xs font-bold tracking-widest focus:border-primary focus:outline-none"
                      placeholder="Enter OTP"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      className="px-4 h-9 bg-status-success text-white text-xs font-bold hover:bg-green-700 shrink-0 cursor-pointer"
                    >
                      Verify OTP
                    </button>
                  </div>

                  {otpError && (
                    <span className="text-xs text-status-danger font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">cancel</span>
                      {otpError}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Field 3: District & PIN Code */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-xs font-semibold text-text-primary flex items-center gap-1">
                  District / Tehsil <span className="text-status-danger">*</span>
                </label>
                <select className="w-full h-10 px-3 bg-surface-card border border-border-strong text-xs focus:border-primary focus:outline-none">
                  <option>Pune District, Maharashtra</option>
                  <option>Nashik District, Maharashtra</option>
                  <option>Ahmedabad District, Gujarat</option>
                  <option>Jaipur District, Rajasthan</option>
                </select>
              </div>
              <div className="w-full sm:w-36 flex flex-col gap-1">
                <label className="text-xs font-semibold text-text-primary flex items-center gap-1">
                  PIN Code <span className="text-status-danger">*</span>
                </label>
                <input
                  type="text"
                  className="w-full h-10 px-3 bg-surface-card border border-border-strong text-xs focus:border-primary focus:outline-none"
                  defaultValue="411001"
                />
              </div>
            </div>

            {/* Field 4: Account Password */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-text-primary flex items-center gap-1">
                Create Account Password <span className="text-status-danger">*</span>
              </label>
              <input
                type="password"
                className="w-full h-10 px-3 bg-surface-card border border-border-strong text-xs focus:border-primary focus:outline-none"
                placeholder="Minimum 8 characters"
                defaultValue="••••••••••••"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-border-subtle flex flex-col sm:flex-row gap-3 items-center justify-between">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 bg-primary text-on-primary font-bold text-xs hover:bg-primary-container text-center cursor-pointer shadow-sm"
              >
                Complete Citizen Registration →
              </button>
              <button
                type="button"
                onClick={handleDirectSignIn}
                className="text-xs text-primary font-bold underline cursor-pointer"
              >
                Already Registered? Sign In as Citizen →
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
