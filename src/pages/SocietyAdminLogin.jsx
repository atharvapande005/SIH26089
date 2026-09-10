import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkers } from '../context/WorkerContext';

export default function SocietyAdminLogin() {
  const { loginAs } = useWorkers();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // 2FA OTP state
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [userOtp, setUserOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState('');

  const handleGetOtp = () => {
    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(newOtp);
    setOtpSent(true);
    setOtpVerified(false);
    setUserOtp('');
    setOtpError('');
  };

  const handleVerifyOtp = () => {
    if (userOtp.trim() === generatedOtp) {
      setOtpVerified(true);
      setOtpError('');
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

  const handleSocietySubmit = (e) => {
    if (e) e.preventDefault();
    loginAs('society');
    navigate('/society-dashboard');
  };

  const handleFederationSubmit = () => {
    loginAs('federation');
    navigate('/federation-dashboard');
  };

  return (
    <div className="w-full flex-1 bg-surface-canvas flex flex-col justify-center items-center p-4 md:p-8">
      <div className="flex flex-col w-full max-w-lg items-center justify-center py-4">
        {/* Portal Badge */}
        <div className="w-full flex items-center justify-between pb-3 text-text-secondary text-xs uppercase tracking-wider font-semibold">
          <span className="flex items-center gap-1 text-primary">
            <span className="material-symbols-outlined text-gov-saffron text-[18px]">account_balance</span>
            PACS / Society & Federation Administrative Login
          </span>
          <span className="text-text-muted">Statutory Portal</span>
        </div>

        {/* Card */}
        <div className="w-full bg-surface-card border border-border-subtle shadow-sm">
          {/* Header */}
          <div className="bg-primary text-on-primary p-6 border-b-4 border-gov-saffron flex items-start gap-4">
            <div className="w-12 h-12 bg-white/10 text-gov-saffron flex items-center justify-center shrink-0 border border-white/20">
              <span className="material-symbols-outlined text-[28px]">admin_panel_settings</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight">
                Cooperative Administrator Login
              </h1>
              <p className="text-xs text-on-primary-container mt-1">
                Authorized Login for Primary Agricultural Credit Societies (PACS) & District Federations.
              </p>
            </div>
          </div>

          {/* Warning Banner */}
          <div className="bg-surface-canvas border-b border-border-subtle px-6 py-2.5 flex items-center gap-2 text-text-secondary text-xs">
            <span className="material-symbols-outlined text-status-warning text-[18px] shrink-0">gavel</span>
            <span>Restricted Access: Unauthorized access attempts are monitored under the IT Act 2000.</span>
          </div>

          {/* Form */}
          <form className="p-6 flex flex-col gap-4" onSubmit={handleSocietySubmit}>
            {/* Field 1: Cooperative Society Selection */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-text-primary flex items-center gap-1">
                Society Registration ID / Name <span className="text-status-danger">*</span>
              </label>
              <select className="w-full h-10 px-3 bg-surface-card border border-border-strong text-xs focus:border-primary focus:outline-none">
                <option>Haveli Taluka Labour PACS Ltd. (MAH/PNE/772)</option>
                <option>Khed Cooperative Labour Union (MAH/PNE/801)</option>
                <option>Baramati Agricultural Cooperative (MAH/PNE/992)</option>
                <option>Pune Green Energy PACS (MAH/PNE/102)</option>
              </select>
            </div>

            {/* Field 2: Admin Username / Email */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-text-primary flex items-center gap-1">
                Secretary / Admin User ID <span className="text-status-danger">*</span>
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-10 px-3 bg-surface-card border border-border-strong text-xs focus:border-primary focus:outline-none"
                placeholder="Enter admin ID e.g. SEC-HAVELI-01"
                required
              />
            </div>

            {/* Field 3: Password */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-text-primary flex items-center gap-1">
                Password & Security PIN <span className="text-status-danger">*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-10 px-3 bg-surface-card border border-border-strong text-xs focus:border-primary focus:outline-none"
                placeholder="••••••••••••"
                required
              />
            </div>

            {/* Field 4: Optional 2FA Mobile OTP Verification */}
            <div className="flex flex-col gap-1.5 pt-1 border-t border-border-subtle">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-text-primary flex items-center gap-1">
                  2FA Mobile Security OTP <span className="text-text-muted font-normal">(Optional for Admin)</span>
                </label>
                {!otpVerified && (
                  <button
                    type="button"
                    onClick={handleGetOtp}
                    className="text-xs text-primary font-semibold hover:underline cursor-pointer"
                  >
                    {otpSent ? 'Get New OTP' : 'Get 2FA OTP'}
                  </button>
                )}
              </div>

              {otpVerified && (
                <div className="p-2 bg-green-50 border border-status-success text-status-success font-bold text-xs flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  2FA OTP Verified ✓
                </div>
              )}

              {otpSent && !otpVerified && (
                <div className="p-3 bg-surface-canvas border border-border-subtle rounded flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-muted italic font-medium">
                      Demo Mode: Your 2FA OTP is <strong className="text-primary font-bold text-sm bg-yellow-100 px-1.5 py-0.5 rounded">{generatedOtp}</strong>
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
                      placeholder="Enter 2FA OTP"
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

            {/* Submit Options */}
            <div className="pt-3 border-t border-border-subtle flex flex-col gap-3">
              <button
                type="submit"
                className="w-full py-2.5 bg-primary text-on-primary font-bold text-xs hover:bg-primary-container text-center shadow-sm cursor-pointer"
              >
                Sign In to Society Admin Dashboard →
              </button>

              <div className="relative my-1">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border-subtle"></div>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-bold text-text-muted">
                  <span className="bg-surface-card px-2">OR</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleFederationSubmit}
                className="w-full py-2.5 bg-secondary/10 text-primary border border-secondary/30 font-bold text-xs hover:bg-secondary/20 text-center shadow-sm cursor-pointer flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">account_balance</span>
                Sign In to District Federation Rollup Dashboard →
              </button>

              <div className="flex justify-between items-center text-[11px] text-text-muted mt-2">
                <a href="#" className="hover:underline">Forgot Admin Password?</a>
                <a href="#" className="hover:underline text-primary font-semibold">Contact District Nodal Officer</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
