import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWorkers } from '../context/WorkerContext';

export default function BookingConfirmation() {
  const { bookingDraft, updateBookingStep, completeBookingAndAddToLedger } = useWorkers();
  const navigate = useNavigate();

  // Local state for interactive steps
  const [selectedDate, setSelectedDate] = useState(bookingDraft.date || '2026-09-11');
  const [selectedSlot, setSelectedSlot] = useState(bookingDraft.timeSlot || '10:00 AM - 12:00 PM');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [upiId, setUpiId] = useState('citizen@upi');
  const [ratingStars, setRatingStars] = useState(5);
  const [ratingComment, setRatingComment] = useState('Work was completed with exceptional quality and strict adherence to safety standards.');

  const worker = bookingDraft.worker || {
    name: 'Ramesh Balaji Patil',
    trade: 'Senior Certified Electrician',
    society: 'Haveli Taluka Labour PACS Ltd.',
    badge: 'Aadhaar Verified',
    rate: '₹350 / hr'
  };

  // Handlers
  const handleProceedToPayment = () => {
    updateBookingStep('PAYMENT', { date: selectedDate, timeSlot: selectedSlot });
  };

  const handlePayNow = () => {
    updateBookingStep('CONFIRMED', { paid: true, paymentMethod });
  };

  const handleMarkComplete = () => {
    updateBookingStep('RATING', { jobCompleted: true });
  };

  const handleSubmitRating = () => {
    completeBookingAndAddToLedger(ratingStars, ratingComment);
  };

  return (
    <div className="w-full flex-1 bg-surface-canvas py-8">
      <div className="max-w-3xl mx-auto px-4 md:px-6 flex flex-col gap-6">

        {/* Step Progress Tracker */}
        <div className="bg-surface-card border border-border-subtle p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className={`flex items-center gap-1 ${bookingDraft.step === 'SELECT_TIME' ? 'text-primary font-bold' : 'text-text-muted'}`}>
              1. Date & Time
            </span>
            <span className="text-border-subtle">→</span>
            <span className={`flex items-center gap-1 ${bookingDraft.step === 'PAYMENT' ? 'text-primary font-bold' : 'text-text-muted'}`}>
              2. Payment
            </span>
            <span className="text-border-subtle">→</span>
            <span className={`flex items-center gap-1 ${bookingDraft.step === 'CONFIRMED' ? 'text-primary font-bold' : 'text-text-muted'}`}>
              3. Confirmation
            </span>
            <span className="text-border-subtle">→</span>
            <span className={`flex items-center gap-1 ${bookingDraft.step === 'RATING' || bookingDraft.step === 'COMPLETED' ? 'text-primary font-bold' : 'text-text-muted'}`}>
              4. Complete & Rate
            </span>
          </div>
        </div>

        {/* STEP 1: SELECT DATE & TIME */}
        {bookingDraft.step === 'SELECT_TIME' && (
          <div className="bg-surface-card border border-border-subtle shadow-sm p-6 flex flex-col gap-5">
            <div className="flex items-start justify-between border-b border-border-subtle pb-4">
              <div>
                <span className="bg-primary/10 text-primary font-bold text-[11px] px-2 py-0.5 uppercase">Step 1 of 4</span>
                <h1 className="text-xl font-bold text-primary mt-1">Configure Booking Details</h1>
                <p className="text-xs text-text-secondary">Select your preferred date and time slot for service dispatch.</p>
              </div>
              <span className="text-xs font-mono bg-surface-canvas p-2 border border-border-subtle">
                Ref: {bookingDraft.referenceId}
              </span>
            </div>

            {/* Selected Worker Info */}
            <div className="bg-surface-canvas p-4 border border-border-subtle flex items-center gap-4">
              <div className="w-12 h-12 bg-primary text-on-primary font-bold text-lg flex items-center justify-center">
                {worker.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-text-primary text-sm">{worker.name}</h3>
                  <span className="bg-green-100 text-status-success text-[10px] font-bold px-1.5 py-0.5">
                    {worker.badge || 'Aadhaar Verified'}
                  </span>
                </div>
                <p className="text-xs font-semibold text-primary">{worker.trade}</p>
                <p className="text-[11px] text-text-muted">{worker.society}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-text-muted block uppercase">Rate</span>
                <span className="font-bold text-sm text-primary">{worker.rate || '₹350 / hr'}</span>
              </div>
            </div>

            {/* Date & Time Picker */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-text-primary">Select Booking Date:</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full h-10 px-3 bg-surface-card border border-border-strong text-xs focus:border-primary focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-text-primary">Select Time Slot:</label>
                <select
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  className="w-full h-10 px-3 bg-surface-card border border-border-strong text-xs focus:border-primary focus:outline-none"
                >
                  <option>09:00 AM - 11:00 AM</option>
                  <option>10:00 AM - 12:00 PM</option>
                  <option>02:00 PM - 04:00 PM</option>
                  <option>04:00 PM - 06:00 PM</option>
                </select>
              </div>
            </div>

            {/* Fee Breakdown */}
            <div className="border border-border-subtle p-4 bg-white text-xs space-y-2">
              <h4 className="font-bold text-text-primary uppercase text-[11px] border-b border-border-subtle pb-1">Statutory Fee Calculation</h4>
              <div className="flex justify-between">
                <span>Worker Base Fee (2 Hours):</span>
                <span className="font-semibold">₹700.00</span>
              </div>
              <div className="flex justify-between">
                <span>Society Operational Fund:</span>
                <span className="font-semibold">₹35.00</span>
              </div>
              <div className="flex justify-between">
                <span>Worker Social Security Cess (5%):</span>
                <span className="font-semibold">₹35.00</span>
              </div>
              <div className="border-t border-border-subtle pt-2 flex justify-between font-bold text-sm text-primary">
                <span>Total Escrow Amount:</span>
                <span>₹770.00</span>
              </div>
            </div>

            <button
              onClick={handleProceedToPayment}
              className="w-full py-3 bg-primary text-on-primary font-bold text-xs hover:bg-primary-container text-center shadow-sm"
            >
              Proceed to Payment (₹770.00) →
            </button>
          </div>
        )}

        {/* STEP 2: PAYMENT SCREEN */}
        {bookingDraft.step === 'PAYMENT' && (
          <div className="bg-surface-card border border-border-subtle shadow-sm p-6 flex flex-col gap-5">
            <div className="flex items-start justify-between border-b border-border-subtle pb-4">
              <div>
                <span className="bg-gov-saffron text-primary font-bold text-[11px] px-2 py-0.5 uppercase">Step 2 of 4</span>
                <h1 className="text-xl font-bold text-primary mt-1">Simulated Direct Benefit Payment</h1>
                <p className="text-xs text-text-secondary">Funds are held safely in Ministry statutory escrow until job completion.</p>
              </div>
              <span className="text-xs font-bold text-status-success bg-green-50 px-2.5 py-1 border border-green-200">
                Total: ₹770.00
              </span>
            </div>

            {/* Payment Method Selector */}
            <div className="flex gap-2 border-b border-border-subtle pb-2 text-xs">
              {['UPI', 'Debit/Credit Card', 'Net Banking'].map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method)}
                  className={`px-4 py-2 font-bold text-xs border ${
                    paymentMethod === method
                      ? 'bg-primary text-on-primary border-primary'
                      : 'bg-surface-canvas text-text-secondary border-border-subtle'
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>

            {paymentMethod === 'UPI' && (
              <div className="flex flex-col gap-2 text-xs bg-surface-canvas p-4 border border-border-subtle">
                <label className="font-bold text-text-primary">Virtual Payment Address (VPA / UPI ID):</label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full h-10 px-3 bg-surface-card border border-border-strong text-xs font-mono focus:border-primary focus:outline-none"
                  placeholder="e.g. mobile@upi"
                />
                <p className="text-[11px] text-text-muted">Supports BHIM, Google Pay, PhonePe, and Paytm UPI handle.</p>
              </div>
            )}

            {paymentMethod !== 'UPI' && (
              <div className="flex flex-col gap-2 text-xs bg-surface-canvas p-4 border border-border-subtle">
                <label className="font-bold text-text-primary">Simulated Card / NetBanking Handle:</label>
                <input
                  type="text"
                  defaultValue="4111 •••• •••• 8892"
                  className="w-full h-10 px-3 bg-surface-card border border-border-strong text-xs font-mono"
                />
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => updateBookingStep('SELECT_TIME')}
                className="text-xs font-semibold text-text-secondary hover:underline"
              >
                ← Back to Date & Time
              </button>
              <button
                onClick={handlePayNow}
                className="px-6 py-3 bg-status-success text-white font-bold text-xs hover:bg-green-700 shadow-sm"
              >
                Pay Now ₹770.00 →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: BOOKING CONFIRMATION & MARK COMPLETE */}
        {bookingDraft.step === 'CONFIRMED' && (
          <div className="flex flex-col gap-6">
            {/* Status Header Banner */}
            {bookingDraft.isCancelledByWorker || bookingDraft.status === 'CANCELLED_BY_WORKER' ? (
              <div className="bg-surface-card border-l-4 border-status-danger border border-border-subtle p-6 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-red-100 text-status-danger flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[28px]">cancel</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-status-danger uppercase tracking-wider">
                      Booking Ref: #{bookingDraft.referenceId}
                    </span>
                    <span className="bg-red-100 text-status-danger text-[11px] font-bold px-2.5 py-0.5 uppercase border border-red-300">
                      Cancelled by Worker
                    </span>
                  </div>
                  <h1 className="text-xl font-bold text-primary mt-1">Cancelled by Worker — Refund Initiated</h1>
                  <p className="text-xs font-semibold text-status-danger mt-1">
                    {bookingDraft.refundNote || 'Refund of ₹770.00 will be processed within 5-7 business days.'}
                  </p>
                </div>
              </div>
            ) : bookingDraft.isAcceptedByWorker || bookingDraft.status === 'ACCEPTED_IN_PROGRESS' ? (
              <div className="bg-surface-card border-l-4 border-status-success border border-border-subtle p-6 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-status-success/10 text-status-success flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[28px]">check_circle</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-status-success uppercase tracking-wider">
                      Booking Ref: #{bookingDraft.referenceId}
                    </span>
                    <span className="bg-blue-100 text-primary text-[11px] font-bold px-2 py-0.5 uppercase border border-blue-300">
                      Accepted — In Progress
                    </span>
                  </div>
                  <h1 className="text-xl font-bold text-primary mt-1">Worker Accepted Job & Dispatch In Progress</h1>
                  <p className="text-xs text-text-secondary mt-0.5">
                    Worker ({worker.name}) accepted your request for {bookingDraft.date} ({bookingDraft.timeSlot}).
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-surface-card border-l-4 border-status-success border border-border-subtle p-6 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-status-success/10 text-status-success flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[28px]">check_circle</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-status-success uppercase tracking-wider">
                      Booking Ref: #{bookingDraft.referenceId}
                    </span>
                    <span className="bg-blue-100 text-primary text-[11px] font-bold px-2 py-0.5 uppercase">
                      Service In Progress
                    </span>
                  </div>
                  <h1 className="text-xl font-bold text-primary mt-1">Payment Received & Booking Confirmed</h1>
                  <p className="text-xs text-text-secondary mt-0.5">
                    Worker has been dispatched for {bookingDraft.date} ({bookingDraft.timeSlot}).
                  </p>
                </div>
              </div>
            )}

            <div className="bg-surface-card border border-border-subtle shadow-sm p-6 flex flex-col gap-5">
              <h2 className="text-sm font-bold text-primary uppercase border-b border-border-subtle pb-2">
                Active Service Execution Ticket
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-surface-canvas p-4 border border-border-subtle space-y-1">
                  <span className="text-[11px] font-bold text-text-muted uppercase">Assigned Worker</span>
                  <p className="font-bold text-text-primary text-sm">{worker.name}</p>
                  <p className="text-text-secondary">{worker.trade}</p>
                  <p className="text-text-muted">{worker.society}</p>
                </div>

                <div className="bg-surface-canvas p-4 border border-border-subtle space-y-1">
                  <span className="text-[11px] font-bold text-text-muted uppercase">Booking Schedule & Status</span>
                  <p className="font-bold text-text-primary">Date: {bookingDraft.date}</p>
                  <p className="text-text-secondary">Time: {bookingDraft.timeSlot}</p>
                  <p className={`font-semibold ${bookingDraft.isCancelledByWorker ? 'text-status-danger' : 'text-status-success'}`}>
                    Payment: ₹770.00 ({bookingDraft.isCancelledByWorker ? 'Refund Initiated' : 'Escrow Locked'})
                  </p>
                </div>
              </div>

              {/* Cancellation Notice or Completion Action */}
              {bookingDraft.isCancelledByWorker || bookingDraft.status === 'CANCELLED_BY_WORKER' ? (
                <div className="bg-red-50 border border-status-danger/40 p-4 rounded text-xs text-status-danger flex items-start gap-2">
                  <span className="material-symbols-outlined text-[20px] shrink-0">info</span>
                  <div className="flex-1">
                    <p className="font-bold text-sm">Refund Information</p>
                    <p className="mt-0.5">
                      The assigned worker ({worker.name}) rejected the job request. Your payment of <strong>₹770.00</strong> will be refunded to your original payment method within 5-7 business days.
                    </p>
                    <div className="mt-3">
                      <Link to="/service-search" className="inline-block px-4 py-2 bg-primary text-on-primary font-bold rounded text-xs">
                        Search & Book Another Worker →
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-[#F0F4F8] border border-border-strong p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-sm text-primary">Simulate Service Completion</h3>
                    <p className="text-xs text-text-secondary">Click below once the worker finishes duty to release escrow DBT payment and submit rating.</p>
                  </div>
                  <button
                    onClick={handleMarkComplete}
                    className="px-5 py-2.5 bg-primary text-on-primary font-bold text-xs hover:bg-primary-container shrink-0 shadow-sm cursor-pointer"
                  >
                    Mark Service as Complete ✓
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 4: RATING & COMMENTS */}
        {bookingDraft.step === 'RATING' && (
          <div className="bg-surface-card border border-border-subtle shadow-sm p-6 flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <div>
                <span className="bg-green-100 text-status-success font-bold text-[11px] px-2 py-0.5 uppercase">
                  Service Completed
                </span>
                <h1 className="text-xl font-bold text-primary mt-1">Rate Worker & Submit Audit Feedback</h1>
              </div>
              <span className="text-xs font-mono text-text-muted">Ref: #{bookingDraft.referenceId}</span>
            </div>

            <p className="text-xs text-text-secondary">
              Your feedback is audited by the Ministry of Cooperation to calculate worker performance ratings and society welfare incentives.
            </p>

            {/* Interactive Stars */}
            <div className="flex items-center gap-2 my-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRatingStars(star)}
                  className={`text-3xl cursor-pointer transition-transform ${
                    star <= ratingStars ? 'text-gov-saffron scale-110' : 'text-gray-300'
                  }`}
                >
                  ★
                </button>
              ))}
              <span className="text-xs font-bold text-text-primary ml-2">{ratingStars}.0 / 5.0 Rating</span>
            </div>

            {/* Comment Box */}
            <div className="flex flex-col gap-1 text-xs">
              <label className="font-bold text-text-primary">Performance Comments & Quality Assessment:</label>
              <textarea
                rows={3}
                value={ratingComment}
                onChange={(e) => setRatingComment(e.target.value)}
                className="w-full p-3 bg-surface-card border border-border-strong text-xs text-text-primary focus:outline-none focus:border-primary"
              />
            </div>

            <button
              onClick={handleSubmitRating}
              className="w-full py-3 bg-status-success text-white font-bold text-xs hover:bg-green-700 shadow-sm"
            >
              Submit Official Rating & Finalize Booking →
            </button>
          </div>
        )}

        {/* STEP 5: FINAL COMPLETED SUMMARY */}
        {bookingDraft.step === 'COMPLETED' && (
          <div className="bg-surface-card border-2 border-status-success p-6 shadow-sm flex flex-col gap-5 text-xs">
            <div className="flex items-center gap-3 bg-green-50 p-4 border border-green-200">
              <span className="material-symbols-outlined text-status-success text-[32px]">verified</span>
              <div>
                <h2 className="text-base font-bold text-status-success">Booking Completed & Audited!</h2>
                <p className="text-text-secondary">
                  Statutory fee of ₹770.00 credited via Direct Benefit Transfer (DBT) to <strong>{worker.name}</strong>'s bank account.
                </p>
              </div>
            </div>

            <div className="bg-surface-canvas p-4 border border-border-subtle space-y-1">
              <p className="font-bold text-primary">Summary Record:</p>
              <p>Reference ID: #{bookingDraft.referenceId}</p>
              <p>Worker: {worker.name} ({worker.trade})</p>
              <p>Rating Submitted: {ratingStars}.0 ★</p>
              <p className="italic text-text-muted">"{ratingComment}"</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => navigate('/society-dashboard')}
                className="flex-1 py-2.5 bg-primary text-on-primary font-bold text-xs hover:bg-primary-container text-center"
              >
                View Society Admin Ledger →
              </button>
              <button
                onClick={() => navigate('/service-search')}
                className="flex-1 py-2.5 bg-surface-card border border-border-strong text-primary font-bold text-xs hover:bg-surface-canvas text-center"
              >
                Book Another Service
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
