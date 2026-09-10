import React, { createContext, useContext, useState } from 'react';

const WorkerContext = createContext();

const initialActiveWorkers = [
  {
    id: 'W-9041',
    name: 'Ramesh Balaji Patil',
    phone: '98220 11223',
    trade: 'Senior Certified Electrician',
    society: 'Haveli Taluka Labour PACS Ltd.',
    badge: 'Aadhaar Verified',
    rating: '4.9 ★ (124 jobs)',
    rate: '₹350 / hr',
    availability: 'Available Today',
    experience: '8 Years Exp',
    isPending: false
  },
  {
    id: 'W-8812',
    name: 'Suresh Vishnu Pawar',
    phone: '98223 34455',
    trade: 'Plumbing & Sanitation Specialist',
    society: 'Khed Cooperative Labour Union',
    badge: 'Aadhaar Verified',
    rating: '4.8 ★ (98 jobs)',
    rate: '₹300 / hr',
    availability: 'Available Tomorrow',
    experience: '6 Years Exp',
    isPending: false
  },
  {
    id: 'W-7734',
    name: 'Ganesh Pandurang Shinde',
    phone: '98224 55667',
    trade: 'Heavy Machinery & Tractor Operator',
    society: 'Baramati Agricultural Cooperative',
    badge: 'eShram Registered',
    rating: '4.95 ★ (210 jobs)',
    rate: '₹500 / hr',
    availability: 'Available Today',
    experience: '11 Years Exp',
    isPending: false
  },
  {
    id: 'W-6120',
    name: 'Sunita Maruti Deshmukh',
    phone: '98225 66778',
    trade: 'Solar Panel Maintenance Specialist',
    society: 'Pune Green Energy PACS',
    badge: 'Aadhaar Verified',
    rating: '4.85 ★ (65 jobs)',
    rate: '₹400 / hr',
    availability: 'Available Today',
    experience: '5 Years Exp',
    isPending: false
  }
];

const initialPendingWorkers = [
  {
    id: 'P-101',
    name: 'Vikas Tukaram Kadam',
    phone: '98901 23456',
    skill: 'Heavy Machinery & Tractor Operator',
    trade: 'Heavy Machinery & Tractor Operator',
    submittedDate: '09 Sep 2026',
    society: 'Haveli Taluka Labour PACS Ltd.',
    badge: 'Pending Verification',
    isPending: true
  },
  {
    id: 'P-102',
    name: 'Sunil Anna More',
    phone: '97654 32109',
    skill: 'Solar Panel Maintenance Specialist',
    trade: 'Solar Panel Maintenance Specialist',
    submittedDate: '10 Sep 2026',
    society: 'Pune Green Energy PACS',
    badge: 'Pending Verification',
    isPending: true
  }
];

const initialBookings = [
  { id: 'JOB-9912', worker: 'Ramesh Balaji Patil', trade: 'Electrician', client: 'Anand Deshmukh', amount: '₹770.00', status: 'Completed', dbt: 'Credited' },
  { id: 'JOB-9911', worker: 'Suresh Vishnu Pawar', trade: 'Plumber', client: 'Priya Kulkarni', amount: '₹600.00', status: 'Completed', dbt: 'Credited' },
  { id: 'JOB-9910', worker: 'Ganesh Shinde', trade: 'Tractor Operator', client: 'Maharashtra Agro Ltd', amount: '₹1,500.00', status: 'Completed', dbt: 'Credited' }
];

const initialJobRequests = [
  {
    id: 'REQ-88412',
    workerId: 'W-9041',
    workerName: 'Ramesh Balaji Patil',
    client: 'Anand Deshmukh',
    service: 'Main Switchboard Rewiring & Circuit Audit',
    address: 'Model Colony, Shivajinagar, Pune',
    date: '2026-09-11',
    timeSlot: '10:00 AM - 12:00 PM',
    fee: '₹770.00',
    otp: '4892',
    status: 'PENDING' // PENDING, ACCEPTED, DECLINED, COMPLETED
  }
];

export function WorkerProvider({ children }) {
  const [activeWorkers, setActiveWorkers] = useState(initialActiveWorkers);
  const [pendingWorkers, setPendingWorkers] = useState(initialPendingWorkers);
  const [completedBookings, setCompletedBookings] = useState(initialBookings);
  const [jobRequests, setJobRequests] = useState(initialJobRequests);
  const [currentWorkerId, setCurrentWorkerId] = useState(initialActiveWorkers[0].id);
  const [actionNotice, setActionNotice] = useState(null);

  // Current logged in user object: { role: 'citizen'|'worker'|'society'|'federation', name: string, phone: string, id: string }
  const [currentUser, setCurrentUser] = useState(null);
  const [currentRole, setCurrentRole] = useState(null); // null | 'citizen' | 'worker' | 'society' | 'federation'

  const loginAs = (role, userInfo = {}) => {
    setCurrentRole(role);
    if (role === 'citizen') {
      const citizenUser = {
        role: 'citizen',
        name: userInfo.name || 'Registered Citizen',
        phone: userInfo.phone || '',
        id: `C-${Date.now().toString().slice(-4)}`
      };
      setCurrentUser(citizenUser);
    } else if (role === 'worker') {
      const workerUser = {
        role: 'worker',
        name: userInfo.name || 'Registered Worker',
        phone: userInfo.phone || '',
        id: userInfo.id || currentWorkerId
      };
      setCurrentUser(workerUser);
    } else {
      setCurrentUser({ role, name: userInfo.name || role });
    }
  };

  const logout = () => {
    setCurrentRole(null);
    setCurrentUser(null);
  };

  // Active Booking Flow State
  const [bookingDraft, setBookingDraft] = useState({
    step: 'SELECT_TIME',
    worker: initialActiveWorkers[0],
    date: '2026-09-11',
    timeSlot: '10:00 AM - 12:00 PM',
    referenceId: 'SS-2026-88412',
    paymentMethod: 'UPI',
    paid: false,
    jobCompleted: false,
    ratingSubmitted: false,
    ratingStars: 5,
    ratingComment: ''
  });

  // All combined workers for profile switcher
  const allWorkers = [
    ...activeWorkers.map(w => ({ ...w, isPending: false })),
    ...pendingWorkers.map(w => ({ ...w, trade: w.skill || w.trade, isPending: true }))
  ];

  // Worker Signup Handler
  const registerNewWorker = ({ name, phone, aadhaar, skill, society }) => {
    const cleanPhone = phone ? phone.trim().replace(/\D/g, '') : '';

    const phoneExistsInPending = pendingWorkers.some(w => w.phone && w.phone.replace(/\D/g, '') === cleanPhone);
    const phoneExistsInActive = activeWorkers.some(w => w.phone && w.phone.replace(/\D/g, '') === cleanPhone);

    if (cleanPhone && (phoneExistsInPending || phoneExistsInActive)) {
      return {
        success: false,
        message: 'This mobile number is already registered in the system.'
      };
    }

    const newId = `P-${Date.now().toString().slice(-4)}`;
    const newWorker = {
      id: newId,
      name: name || 'New Worker',
      phone: phone || '9876543210',
      aadhaar: aadhaar || 'XXXX-XXXX-XXXX',
      skill: skill || 'General Services',
      trade: skill || 'General Services',
      society: society || 'Haveli Taluka Labour PACS Ltd.',
      submittedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      badge: 'Pending Verification',
      isPending: true
    };

    setPendingWorkers(prev => [newWorker, ...prev]);
    setCurrentWorkerId(newId); // Set profile to the new worker

    setActionNotice({
      type: 'success',
      message: `Worker "${name}" successfully registered! Pending society admin verification.`
    });

    setTimeout(() => setActionNotice(null), 5000);

    return { success: true, worker: newWorker };
  };

  const approveWorker = (id) => {
    const workerToApprove = pendingWorkers.find(w => w.id === id);
    if (!workerToApprove) return;

    setPendingWorkers(prev => prev.filter(w => w.id !== id));

    const newActiveWorker = {
      id: workerToApprove.id,
      name: workerToApprove.name,
      phone: workerToApprove.phone,
      trade: workerToApprove.skill || workerToApprove.trade,
      society: workerToApprove.society || 'Haveli Taluka Labour PACS Ltd.',
      badge: 'Aadhaar Verified',
      rating: '5.0 ★ (New)',
      rate: '₹350 / hr',
      availability: 'Available Today',
      experience: 'Newly Verified',
      isPending: false
    };

    setActiveWorkers(prev => [newActiveWorker, ...prev]);
    setCurrentWorkerId(newActiveWorker.id);

    setActionNotice({
      type: 'success',
      message: `Worker "${workerToApprove.name}" approved and moved to active service directory!`
    });

    setTimeout(() => setActionNotice(null), 4000);
  };

  const rejectWorker = (id) => {
    const workerToReject = pendingWorkers.find(w => w.id === id);
    if (!workerToReject) return;

    setPendingWorkers(prev => prev.filter(w => w.id !== id));

    setActionNotice({
      type: 'danger',
      message: `Worker registration for "${workerToReject.name}" rejected.`
    });

    setTimeout(() => setActionNotice(null), 4000);
  };

  const updateWorkerProfile = (workerId, updatedData) => {
    const { name, phone, trades } = updatedData;
    const tradeStr = Array.isArray(trades) ? trades.join(', ') : (trades || '');

    setActiveWorkers(prev => prev.map(w => {
      if (w.id === workerId) {
        return {
          ...w,
          name: name !== undefined ? name : w.name,
          phone: phone !== undefined ? phone : w.phone,
          trade: tradeStr || w.trade
        };
      }
      return w;
    }));

    setPendingWorkers(prev => prev.map(w => {
      if (w.id === workerId) {
        return {
          ...w,
          name: name !== undefined ? name : w.name,
          phone: phone !== undefined ? phone : w.phone,
          skill: tradeStr || w.skill,
          trade: tradeStr || w.trade
        };
      }
      return w;
    }));

    setActionNotice({
      type: 'success',
      message: `Profile updated successfully for worker ${name || workerId}!`
    });
    setTimeout(() => setActionNotice(null), 4000);
  };

  // Booking Initiation by Customer
  const initiateBooking = (worker) => {
    const ref = `SS-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const clientName = (currentUser && currentUser.name) ? currentUser.name : 'Registered Citizen';

    setBookingDraft({
      step: 'SELECT_TIME',
      worker: worker,
      clientName: clientName,
      date: '2026-09-11',
      timeSlot: '10:00 AM - 12:00 PM',
      referenceId: ref,
      paymentMethod: 'UPI',
      paid: false,
      jobCompleted: false,
      ratingSubmitted: false,
      ratingStars: 5,
      ratingComment: ''
    });

    // Also push a PENDING job request into worker's inbox
    const newJobRequest = {
      id: `REQ-${ref.split('-')[2]}`,
      workerId: worker.id,
      workerName: worker.name,
      client: clientName,
      service: `${worker.trade} Dispatch`,
      address: 'Model Colony, Shivajinagar, Pune',
      date: '2026-09-11',
      timeSlot: '10:00 AM - 12:00 PM',
      fee: '₹770.00',
      otp: Math.floor(1000 + Math.random() * 9000).toString(),
      status: 'PENDING'
    };

    setJobRequests(prev => [newJobRequest, ...prev]);
  };

  const updateBookingStep = (step, data = {}) => {
    setBookingDraft(prev => {
      const updated = {
        ...prev,
        ...data,
        step
      };

      // When customer completes payment (CONFIRMED step), ensure entry in completedBookings ledger
      if (step === 'CONFIRMED') {
        setCompletedBookings(ledger => {
          const refId = updated.referenceId || 'SS-2026-88412';
          const exists = ledger.some(b => b.id === refId || b.id === 'REQ-88412');
          const clientName = updated.clientName || currentUser?.name || 'Registered Citizen';
          if (!exists) {
            return [{
              id: refId,
              worker: updated.worker?.name || 'Ramesh Balaji Patil',
              trade: updated.worker?.trade || 'Services',
              client: clientName,
              amount: '₹770.00',
              status: 'Confirmed (Paid)',
              dbt: 'Escrow Locked'
            }, ...ledger];
          }
          return ledger.map(b => (b.id === refId || b.id === 'REQ-88412') ? {
            ...b,
            status: 'Confirmed (Paid)',
            dbt: 'Escrow Locked'
          } : b);
        });
      }

      return updated;
    });
  };

  const acceptJobRequest = (requestId) => {
    setJobRequests(prev => prev.map(req =>
      req.id === requestId ? { ...req, status: 'ACCEPTED' } : req
    ));

    const targetReq = jobRequests.find(r => r.id === requestId);
    const feeAmount = targetReq ? targetReq.fee : '₹770.00';
    const clientName = targetReq ? targetReq.client : (bookingDraft.clientName || currentUser?.name || 'Registered Citizen');

    // Update customer booking draft
    setBookingDraft(prev => ({
      ...prev,
      step: 'CONFIRMED',
      status: 'ACCEPTED_IN_PROGRESS',
      statusText: 'Accepted — In Progress',
      isAcceptedByWorker: true,
      isCancelledByWorker: false
    }));

    // Update or insert in Society Admin Ledger
    setCompletedBookings(prev => {
      const reqIdStr = targetReq ? targetReq.id : requestId;
      const refIdStr = bookingDraft.referenceId || 'SS-2026-88412';
      const exists = prev.some(b => b.id === reqIdStr || b.id === refIdStr);

      if (exists) {
        return prev.map(b => (b.id === reqIdStr || b.id === refIdStr) ? {
          ...b,
          status: 'Accepted — In Progress',
          dbt: 'Escrow Held'
        } : b);
      } else {
        return [{
          id: refIdStr || reqIdStr,
          worker: targetReq ? targetReq.workerName : bookingDraft.worker.name,
          trade: bookingDraft.worker.trade || 'Service Duty',
          client: clientName,
          amount: feeAmount,
          status: 'Accepted — In Progress',
          dbt: 'Escrow Held'
        }, ...prev];
      }
    });

    setActionNotice({
      type: 'success',
      message: `Job Request ${requestId} accepted! Booking status updated to "Accepted — In Progress".`
    });
    setTimeout(() => setActionNotice(null), 4000);
  };

  const declineJobRequest = (requestId) => {
    setJobRequests(prev => prev.map(req =>
      req.id === requestId ? { ...req, status: 'DECLINED' } : req
    ));

    const targetReq = jobRequests.find(r => r.id === requestId);
    const feeAmount = targetReq ? targetReq.fee : '₹770.00';

    // Update customer booking draft
    setBookingDraft(prev => ({
      ...prev,
      step: 'CONFIRMED',
      status: 'CANCELLED_BY_WORKER',
      statusText: 'Cancelled by Worker — Refund Initiated',
      refundNote: `Refund of ${feeAmount} will be processed within 5-7 business days`,
      isCancelledByWorker: true,
      isAcceptedByWorker: false
    }));

    // Update or insert in Society Admin Ledger
    setCompletedBookings(prev => {
      const reqIdStr = targetReq ? targetReq.id : requestId;
      const refIdStr = bookingDraft.referenceId || 'SS-2026-88412';
      const exists = prev.some(b => b.id === reqIdStr || b.id === refIdStr);

      if (exists) {
        return prev.map(b => (b.id === reqIdStr || b.id === refIdStr) ? {
          ...b,
          status: 'Cancelled — Refund Pending',
          dbt: 'Refund Processing'
        } : b);
      } else {
        return [{
          id: refIdStr || reqIdStr,
          worker: targetReq ? targetReq.workerName : bookingDraft.worker.name,
          trade: bookingDraft.worker.trade || 'Service Duty',
          client: targetReq ? targetReq.client : 'Anand Deshmukh (Citizen)',
          amount: feeAmount,
          status: 'Cancelled — Refund Pending',
          dbt: 'Refund Processing'
        }, ...prev];
      }
    });

    setActionNotice({
      type: 'danger',
      message: `Job Request ${requestId} rejected! Booking status set to "Cancelled by Worker — Refund Initiated".`
    });
    setTimeout(() => setActionNotice(null), 4000);
  };

  const completeWorkerJob = (requestId) => {
    const targetReq = jobRequests.find(r => r.id === requestId);
    if (!targetReq) return;

    setJobRequests(prev => prev.map(req =>
      req.id === requestId ? { ...req, status: 'COMPLETED' } : req
    ));

    // Append to completed ledger
    setCompletedBookings(prev => [
      {
        id: targetReq.id,
        worker: targetReq.workerName,
        trade: 'Service Duty',
        client: targetReq.client,
        amount: targetReq.fee,
        status: 'Completed',
        dbt: 'Credited'
      },
      ...prev
    ]);

    setActionNotice({
      type: 'success',
      message: `Job ${requestId} completed! DBT funds released to society ledger.`
    });
    setTimeout(() => setActionNotice(null), 4000);
  };

  const completeBookingAndAddToLedger = (stars, comment) => {
    const updatedDraft = {
      ...bookingDraft,
      step: 'COMPLETED',
      ratingSubmitted: true,
      ratingStars: stars,
      ratingComment: comment
    };
    setBookingDraft(updatedDraft);

    const clientName = updatedDraft.clientName || currentUser?.name || 'Anand Deshmukh (Citizen)';
    const ledgerEntry = {
      id: updatedDraft.referenceId,
      worker: updatedDraft.worker.name,
      trade: updatedDraft.worker.trade || 'Services',
      client: clientName,
      amount: '₹770.00',
      status: 'Completed',
      dbt: 'Credited'
    };

    setCompletedBookings(prev => [ledgerEntry, ...prev]);

    // Also update matching jobRequest if any
    setJobRequests(prev => prev.map(req =>
      req.workerId === updatedDraft.worker.id ? { ...req, status: 'COMPLETED' } : req
    ));
  };

  return (
    <WorkerContext.Provider value={{
      currentUser,
      currentRole,
      setCurrentRole,
      loginAs,
      logout,
      activeWorkers,
      pendingWorkers,
      allWorkers,
      completedBookings,
      jobRequests,
      currentWorkerId,
      setCurrentWorkerId,
      registerNewWorker,
      updateWorkerProfile,
      approveWorker,
      rejectWorker,
      actionNotice,
      bookingDraft,
      initiateBooking,
      updateBookingStep,
      acceptJobRequest,
      declineJobRequest,
      completeWorkerJob,
      completeBookingAndAddToLedger
    }}>
      {children}
    </WorkerContext.Provider>
  );
}

export function useWorkers() {
  return useContext(WorkerContext);
}
