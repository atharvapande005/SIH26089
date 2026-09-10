import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkers } from '../context/WorkerContext';

export default function WorkerSignup() {
  const { registerNewWorker, loginAs } = useWorkers();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    aadhaar: '',
    skill: 'Senior Certified Electrician',
    society: 'Haveli Taluka Labour PACS Ltd.'
  });

  // Mobile & OTP state
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [userOtp, setUserOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrorMessage('');
  };

  const handleGetOtp = () => {
    if (!formData.phone.trim()) {
      setErrorMessage('Please enter your mobile number before getting OTP.');
      return;
    }
    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(newOtp);
    setOtpSent(true);
    setOtpVerified(false);
    setUserOtp('');
    setOtpError('');
    setErrorMessage('');
  };

  const handleVerifyOtp = () => {
    if (userOtp.trim() === generatedOtp) {
      setOtpVerified(true);
      setOtpError('');
      setErrorMessage('');
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

  const handleDirectWorkerLogin = () => {
    const workerName = formData.name.trim() || 'Registered Worker';
    loginAs('worker', { name: workerName, phone: formData.phone.trim() });
    navigate('/worker-profile');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!formData.name || !formData.phone || !formData.aadhaar) {
      setErrorMessage('Please fill in all mandatory fields.');
      return;
    }

    if (!otpVerified) {
      setErrorMessage('Please verify your mobile number with OTP before completing registration.');
      if (!otpSent) {
        handleGetOtp();
      }
      return;
    }

    const result = registerNewWorker({
      name: formData.name,
      phone: formData.phone,
      aadhaar: formData.aadhaar,
      skill: formData.skill,
      society: formData.society
    });

    if (!result.success) {
      // If phone exists, log in as worker
      loginAs('worker', { name: formData.name, phone: formData.phone });
      navigate('/worker-profile');
    } else {
      loginAs('worker', { name: result.worker.name, phone: result.worker.phone, id: result.worker.id });
      setSuccessMessage(`Worker registration completed for ${formData.name}! Redirecting to your Worker Profile...`);
      setTimeout(() => {
        navigate('/worker-profile');
      }, 1000);
    }
  };

  return (
    <div className="w-full flex-1 bg-surface-canvas flex flex-col justify-center items-center p-4 md:p-8">
      <div className="flex flex-col w-full max-w-2xl items-center justify-center py-4">
        {/* Header Badge */}
        <div className="w-full flex items-center justify-between pb-3 text-text-secondary text-xs uppercase tracking-wider font-semibold">
          <span className="flex items-center gap-1 text-primary">
            <span className="material-symbols-outlined text-gov-saffron text-[18px]">badge</span>
            Cooperative Worker Enrollment Desk
          </span>
          <span className="text-text-muted hidden sm:inline">Ministry of Cooperation & eShram Integrated</span>
        </div>

        {/* Card */}
        <div className="w-full bg-surface-card border border-border-subtle shadow-sm">
          {/* Header */}
          <div className="bg-[#F0F4F8] border-b border-border-subtle p-6 flex items-start gap-4">
            <div className="w-12 h-12 bg-gov-saffron text-primary flex items-center justify-center shrink-0 border border-yellow-600 font-bold">
              <span className="material-symbols-outlined text-[28px]">engineering</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h1 className="text-xl text-primary font-bold tracking-tight">
                  Worker Registration / श्रमिक पंजीकरण
                </h1>
                <span className="bg-surface-container text-primary text-xs px-2 py-0.5 border border-secondary/30 font-semibold">
                  FORM WR-01
                </span>
              </div>
              <p className="text-xs text-text-secondary mt-1">
                Register as a certified cooperative worker to receive direct government-audited gig jobs.
              </p>
            </div>
          </div>

          {/* Info Banner */}
          <div className="bg-surface-canvas border-b border-border-subtle px-6 py-2.5 flex items-center gap-2 text-text-secondary text-xs">
            <span className="material-symbols-outlined text-status-success text-[18px] shrink-0">check_circle</span>
            <span>Zero signup fee. 100% statutory wages directly credited to your Aadhaar-linked bank account.</span>
          </div>

          {/* Notifications */}
          {errorMessage && (
            <div className="mx-6 mt-4 p-3 bg-red-50 border border-status-danger text-status-danger text-xs font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mx-6 mt-4 p-3 bg-green-50 border border-status-success text-status-success text-xs font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span>{successMessage}</span>
            </div>
          )}

          {/* Form */}
          <form className="p-6 flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Field 1: Full Name */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-text-primary flex items-center gap-1">
                Full Name (as per Aadhaar Card) <span className="text-status-danger">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full h-10 px-3 bg-surface-card border border-border-strong text-xs focus:border-primary focus:outline-none"
                placeholder="Enter worker full name e.g. Ramesh Balaji Patil"
                required
              />
            </div>

            {/* Field 2: Mobile Number & OTP Verification */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-text-primary flex items-center gap-1">
                Mobile Number (Linked with eShram / Aadhaar) <span className="text-status-danger">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="flex-1 h-10 px-3 bg-surface-card border border-border-strong text-xs focus:border-primary focus:outline-none"
                  placeholder="10-digit mobile number e.g. 9822011223"
                  required
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

            {/* Field 3: Aadhaar Number */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-text-primary flex items-center gap-1">
                12-Digit Aadhaar Number / eShram ID <span className="text-status-danger">*</span>
              </label>
              <input
                type="text"
                name="aadhaar"
                value={formData.aadhaar}
                onChange={handleChange}
                className="w-full h-10 px-3 bg-surface-card border border-border-strong text-xs focus:border-primary focus:outline-none"
                placeholder="XXXX-XXXX-XXXX"
                required
              />
            </div>

            {/* Field 4: Trade / Skill Category */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-text-primary flex items-center gap-1">
                Primary Skill / Trade Category <span className="text-status-danger">*</span>
              </label>
              <select
                name="skill"
                value={formData.skill}
                onChange={handleChange}
                className="w-full h-10 px-3 bg-surface-card border border-border-strong text-xs focus:border-primary focus:outline-none"
              >
                <option value="Senior Certified Electrician">Electrical Maintenance & Wiring</option>
                <option value="Plumbing & Sanitation Specialist">Plumbing & Water Works Specialist</option>
                <option value="Heavy Machinery & Tractor Operator">Agricultural Equipment & Tractor Driver</option>
                <option value="Sanitation & Domestic Hygiene Care">Sanitation & Domestic Hygiene Care</option>
                <option value="Solar Panel Maintenance Specialist">Solar Panel Maintenance Specialist</option>
              </select>
            </div>

            {/* Field 5: Local Cooperative Society Selection */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-text-primary flex items-center gap-1">
                Affiliated Local Cooperative Society (PACS) <span className="text-status-danger">*</span>
              </label>
              <select
                name="society"
                value={formData.society}
                onChange={handleChange}
                className="w-full h-10 px-3 bg-surface-card border border-border-strong text-xs focus:border-primary focus:outline-none"
              >
                <option value="Haveli Taluka Labour PACS Ltd.">Haveli Taluka Labour PACS Ltd. (Reg: MAH/PNE/LBR/772)</option>
                <option value="Khed Cooperative Labour Union">Khed Cooperative Labour Union (Reg: MAH/PNE/LBR/801)</option>
                <option value="Baramati Agricultural Cooperative">Baramati Agricultural Cooperative (Reg: MAH/PNE/AGR/992)</option>
                <option value="Pune Green Energy PACS">Pune Green Energy PACS (Reg: MAH/PNE/ENG/102)</option>
              </select>
            </div>

            {/* Submit */}
            <div className="pt-4 border-t border-border-subtle flex flex-col sm:flex-row gap-3 items-center justify-between">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 bg-gov-saffron text-primary font-bold text-xs hover:bg-yellow-400 text-center cursor-pointer shadow-sm"
              >
                Submit Worker Registration →
              </button>
              <button
                type="button"
                onClick={handleDirectWorkerLogin}
                className="text-xs text-primary font-bold underline cursor-pointer"
              >
                Already Registered? Sign In as Worker →
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
