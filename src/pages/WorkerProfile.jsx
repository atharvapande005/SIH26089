import React, { useState, useEffect } from 'react';
import { useWorkers } from '../context/WorkerContext';

const AVAILABLE_SKILLS = [
  'Electrician',
  'Plumber',
  'Cook',
  'Carpenter',
  'Solar Panel Specialist',
  'Heavy Machinery Operator',
  'Agricultural Operator',
  'Sanitation Specialist'
];

export default function WorkerProfile() {
  const {
    allWorkers,
    currentWorkerId,
    setCurrentWorkerId,
    jobRequests,
    acceptJobRequest,
    declineJobRequest,
    completeWorkerJob,
    updateWorkerProfile,
    actionNotice
  } = useWorkers();

  // Find currently selected worker or default to first
  const worker = allWorkers.find(w => w.id === currentWorkerId) || allWorkers[0] || {
    id: 'W-9041',
    name: 'Ramesh Balaji Patil',
    phone: '98220 11223',
    trade: 'Senior Certified Electrician',
    society: 'Haveli Taluka Labour PACS Ltd.',
    badge: 'Aadhaar Verified',
    isPending: false
  };

  // Edit Profile Local State
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(worker.name || '');
  const [editPhone, setEditPhone] = useState(worker.phone || '');
  const [selectedSkills, setSelectedSkills] = useState([]);

  // Sync edit form fields whenever worker selection changes
  useEffect(() => {
    setEditName(worker.name || '');
    setEditPhone(worker.phone || '');
    const currentTradeStr = worker.trade || worker.skill || '';
    const initialSelected = AVAILABLE_SKILLS.filter(s => currentTradeStr.toLowerCase().includes(s.toLowerCase()));
    setSelectedSkills(initialSelected.length > 0 ? initialSelected : [AVAILABLE_SKILLS[0]]);
    setIsEditing(false);
  }, [worker.id, worker.name, worker.phone, worker.trade, worker.skill]);

  const handleSkillToggle = (skillName) => {
    setSelectedSkills(prev => {
      if (prev.includes(skillName)) {
        if (prev.length === 1) return prev; // keep at least one skill
        return prev.filter(s => s !== skillName);
      } else {
        return [...prev, skillName];
      }
    });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateWorkerProfile(worker.id, {
      name: editName,
      phone: editPhone,
      trades: selectedSkills
    });
    setIsEditing(false);
  };

  // Filter job requests for this worker
  const workerJobRequests = jobRequests.filter(r => r.workerId === worker.id || r.workerName === worker.name);
  const pendingRequests = workerJobRequests.filter(r => r.status === 'PENDING');
  const acceptedRequests = workerJobRequests.filter(r => r.status === 'ACCEPTED');
  const completedRequests = workerJobRequests.filter(r => r.status === 'COMPLETED');

  return (
    <div style={{ backgroundColor: '#E8ECF1', width: '100%', minHeight: 'calc(100vh - 140px)', padding: '20px 10px', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: '420px', margin: '40px auto', background: 'white', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', padding: '20px', overflow: 'hidden' }}>
        
        {/* Worker Selector Header for Demo / Testing */}
        <div className="w-full bg-surface-card border border-border-subtle p-3.5 rounded-xl shadow-sm flex flex-col gap-1 text-xs mb-4">
          <label className="font-bold text-primary flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-gov-saffron">swap_horiz</span>
            View Profile As (Select Registered Worker):
          </label>
          <select
            value={worker.id}
            onChange={(e) => setCurrentWorkerId(e.target.value)}
            className="w-full h-9 px-3 bg-surface-canvas border border-border-strong text-xs font-bold focus:border-primary focus:outline-none rounded-md"
          >
            {allWorkers.map((w) => (
              <option key={w.id} value={w.id}>
                {w.name} ({w.trade || w.skill || 'Worker'}) — {w.isPending ? 'Pending Verification' : 'Approved / Active'}
              </option>
            ))}
          </select>
        </div>

        {/* Action Notification */}
        {actionNotice && (
          <div className={`w-full p-3 border rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm mb-4 ${
            actionNotice.type === 'success' ? 'bg-green-50 border-status-success text-status-success' : 'bg-red-50 border-status-danger text-status-danger'
          }`}>
            <span className="material-symbols-outlined text-[18px]">
              {actionNotice.type === 'success' ? 'check_circle' : 'cancel'}
            </span>
            <span>{actionNotice.message}</span>
          </div>
        )}

        {/* Mobile Frame Content */}
        <div className="w-full bg-surface-card border border-gray-200 rounded-xl overflow-hidden min-h-[550px] flex flex-col justify-between">
          
          <div>
            {/* Worker Profile Header */}
            <div className="bg-primary text-on-primary p-4 border-b border-gov-saffron">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gov-saffron bg-white/10 px-2 py-0.5 rounded">
                  SahakarSetu Worker Profile
                </span>
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${worker.isPending ? 'bg-status-warning' : 'bg-status-success animate-pulse'}`}></span>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-[11px] font-bold text-gov-saffron hover:underline flex items-center gap-1 bg-white/10 px-2 py-1 rounded border border-gov-saffron/40"
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {isEditing ? 'close' : 'edit'}
                    </span>
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>
              </div>

              {!isEditing ? (
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gov-saffron text-primary font-bold text-lg flex items-center justify-center border-2 border-white shrink-0">
                    {worker.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h2 className="font-bold text-sm text-white truncate">{worker.name}</h2>
                      {!worker.isPending && (
                        <span className="material-symbols-outlined text-status-success text-[16px] shrink-0">verified</span>
                      )}
                    </div>
                    <p className="text-xs text-on-primary-container truncate">{worker.trade || worker.skill}</p>
                    <p className="text-[10px] text-text-muted truncate">{worker.society || 'Haveli Taluka Labour PACS'}</p>
                    <p className="text-[10px] text-on-primary-container truncate">Phone: {worker.phone || 'N/A'}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSaveProfile} className="bg-white/10 p-3 rounded-lg border border-white/20 text-xs text-white space-y-3">
                  <h3 className="font-bold text-gov-saffron text-xs flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">edit_note</span>
                    Edit Worker Profile
                  </h3>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-on-primary-container mb-1">Full Name</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      required
                      className="w-full h-8 px-2.5 bg-white text-gray-900 font-semibold text-xs rounded border border-gray-300 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-on-primary-container mb-1">Mobile Number</label>
                    <input
                      type="text"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      required
                      className="w-full h-8 px-2.5 bg-white text-gray-900 font-semibold text-xs rounded border border-gray-300 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-on-primary-container mb-1">Skill Categories (Select Multiple)</label>
                    <div className="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto pr-1">
                      {AVAILABLE_SKILLS.map((skill) => {
                        const isChecked = selectedSkills.includes(skill);
                        return (
                          <label
                            key={skill}
                            className={`flex items-center gap-1.5 p-1.5 rounded cursor-pointer text-[11px] border transition-colors ${
                              isChecked ? 'bg-gov-saffron/20 border-gov-saffron text-white font-bold' : 'bg-white/5 border-white/20 text-on-primary-container hover:bg-white/10'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleSkillToggle(skill)}
                              className="accent-gov-saffron"
                            />
                            <span className="truncate">{skill}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-1 flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 py-1.5 bg-gov-saffron text-primary font-bold text-xs rounded hover:brightness-110 flex items-center justify-center gap-1 shadow cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px]">save</span>
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="py-1.5 px-3 bg-white/20 text-white font-bold text-xs rounded hover:bg-white/30 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Verification Status Warning if Pending */}
            {worker.isPending && (
              <div className="bg-yellow-50 border-b border-yellow-200 p-3 flex items-start gap-2 text-xs text-status-warning">
                <span className="material-symbols-outlined text-[18px] shrink-0">hourglass_top</span>
                <div>
                  <strong className="font-bold">Verification Pending:</strong> Your application is awaiting approval by your society administrator. Once approved, you will appear in the public booking directory.
                </div>
              </div>
            )}

            {/* SECTION: LIVE INCOMING JOB REQUESTS */}
            <div className="p-4 border-b border-border-subtle bg-[#F0F4F8]">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-primary uppercase tracking-wide flex items-center gap-1">
                  <span className="material-symbols-outlined text-gov-saffron text-[18px]">notifications_active</span>
                  Incoming Job Requests ({pendingRequests.length})
                </h3>
              </div>

              {pendingRequests.length === 0 ? (
                <div className="bg-white p-3 border border-border-subtle rounded-lg text-center text-xs text-text-muted">
                  No new pending job requests right now.
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingRequests.map((req) => (
                    <div key={req.id} className="bg-white border-2 border-gov-saffron p-3 rounded-lg shadow-sm space-y-2 text-xs">
                      <div className="flex justify-between items-start border-b border-border-subtle pb-1">
                        <span className="font-bold text-primary">{req.service}</span>
                        <span className="bg-yellow-100 text-status-warning font-bold text-[10px] px-1.5 py-0.5 rounded">NEW REQUEST</span>
                      </div>

                      <div className="space-y-0.5 text-text-secondary text-[11px]">
                        <p><strong>Customer:</strong> {req.client}</p>
                        <p><strong>Address:</strong> {req.address}</p>
                        <p><strong>Schedule:</strong> {req.date} ({req.timeSlot})</p>
                        <p><strong>Statutory Fee:</strong> <span className="font-bold text-primary">{req.fee}</span></p>
                      </div>

                      {/* Accept & Decline Buttons */}
                      <div className="pt-2 flex gap-2 border-t border-border-subtle">
                        <button
                          onClick={() => acceptJobRequest(req.id)}
                          className="flex-1 py-1.5 bg-status-success text-white font-bold text-xs hover:bg-green-700 rounded flex items-center justify-center gap-1 shadow-sm cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[14px]">check</span>
                          Accept Job
                        </button>
                        <button
                          onClick={() => declineJobRequest(req.id)}
                          className="flex-1 py-1.5 bg-status-danger text-white font-bold text-xs hover:bg-red-700 rounded flex items-center justify-center gap-1 shadow-sm cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[14px]">close</span>
                          Decline
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* SECTION: CURRENT / UPCOMING JOBS */}
            <div className="p-4 border-b border-border-subtle">
              <h3 className="text-xs font-bold text-primary uppercase tracking-wide mb-2">
                Current & Upcoming Accepted Jobs ({acceptedRequests.length})
              </h3>

              {acceptedRequests.length === 0 ? (
                <div className="bg-surface-canvas p-3 border border-border-subtle rounded-lg text-center text-xs text-text-muted">
                  No active accepted jobs at the moment.
                </div>
              ) : (
                <div className="space-y-3">
                  {acceptedRequests.map((job) => (
                    <div key={job.id} className="bg-white border border-primary p-3 rounded-lg shadow-sm space-y-2 text-xs">
                      <div className="flex justify-between items-start border-b border-border-subtle pb-1">
                        <span className="font-bold text-primary">{job.service}</span>
                        <span className="bg-blue-100 text-primary font-bold text-[10px] px-1.5 py-0.5 rounded">ACCEPTED</span>
                      </div>

                      <div className="text-[11px] space-y-0.5 text-text-secondary">
                        <p><strong>Customer:</strong> {job.client}</p>
                        <p><strong>Address:</strong> {job.address}</p>
                        <p><strong>Fee:</strong> <span className="font-bold text-status-success">{job.fee}</span></p>
                      </div>

                      <button
                        onClick={() => completeWorkerJob(job.id)}
                        className="w-full py-1.5 bg-primary text-on-primary font-bold text-xs hover:bg-primary-container rounded flex items-center justify-center gap-1 shadow-sm cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[14px]">task_alt</span>
                        Mark Job Complete (Release DBT)
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Wallet / DBT Financial Summary */}
            <div className="p-4 border-b border-border-subtle bg-surface-canvas">
              <h3 className="text-xs font-bold text-primary uppercase tracking-wide mb-3">
                Direct Benefit Transfer (DBT) Earnings
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-white p-3 border border-border-subtle rounded-lg">
                  <span className="text-[10px] text-text-muted uppercase block">Completed Jobs</span>
                  <span className="text-base font-bold text-status-success">{completedRequests.length + 2} Jobs</span>
                </div>
                <div className="bg-white p-3 border border-border-subtle rounded-lg">
                  <span className="text-[10px] text-text-muted uppercase block">Total Disbursed</span>
                  <span className="text-base font-bold text-primary">₹{(completedRequests.length + 2) * 770}</span>
                  <span className="text-[10px] text-text-muted block">Direct Bank Credit</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Mobile Nav Actions */}
          <div className="bg-primary p-3 text-on-primary flex items-center justify-center text-[11px]">
            <button className="flex flex-col items-center gap-0.5 text-gov-saffron font-bold">
              <span className="material-symbols-outlined text-[18px]">home</span>
              Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
