import React from 'react';
import { useWorkers } from '../context/WorkerContext';

export default function SocietyAdminDashboard() {
  const { activeWorkers, pendingWorkers, completedBookings, approveWorker, rejectWorker, actionNotice } = useWorkers();

  return (
    <div className="w-full flex-1 bg-surface-canvas py-8">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 flex flex-col gap-6">
        {/* Header Ribbon */}
        <div className="bg-surface-card border border-border-subtle p-5 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-subtle pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-primary">Society Admin Dashboard</h1>
                <span className="bg-primary/10 text-primary font-bold text-xs px-2 py-0.5 border border-primary/30">
                  PACS REG: MAH/PNE/772
                </span>
              </div>
              <p className="text-xs text-text-secondary mt-0.5">
                Haveli Taluka Labour Primary Agricultural Credit Society (PACS) Ltd., Pune District
              </p>
            </div>
          </div>

          {/* Metric Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-5">
            <div className="bg-surface-canvas p-4 border border-border-subtle">
              <span className="text-[11px] font-bold uppercase text-text-muted">Pending Verification Applications</span>
              <div className="text-2xl font-bold text-status-warning mt-1">{pendingWorkers.length}</div>
              <span className="text-[11px] text-status-warning font-semibold">Requires Approval Action</span>
            </div>
            <div className="bg-surface-canvas p-4 border border-border-subtle">
              <span className="text-[11px] font-bold uppercase text-text-muted">Enrolled Active Workers</span>
              <div className="text-2xl font-bold text-primary mt-1">{activeWorkers.length + 138}</div>
              <span className="text-[11px] text-status-success font-semibold">{activeWorkers.length} Verified in Directory</span>
            </div>
            <div className="bg-surface-canvas p-4 border border-border-subtle">
              <span className="text-[11px] font-bold uppercase text-text-muted">Completed Jobs Ledger</span>
              <div className="text-2xl font-bold text-primary mt-1">{completedBookings.length}</div>
              <span className="text-[11px] text-status-info font-semibold">100% Audited</span>
            </div>
            <div className="bg-surface-canvas p-4 border border-border-subtle">
              <span className="text-[11px] font-bold uppercase text-text-muted">DBT Wages Disbursed</span>
              <div className="text-2xl font-bold text-status-success mt-1">₹4,82,400</div>
              <span className="text-[11px] text-text-muted">Direct RBI Escrow Transfer</span>
            </div>
          </div>
        </div>

        {/* Action Notice Alert */}
        {actionNotice && (
          <div className={`p-4 border text-xs font-semibold flex items-center justify-between shadow-sm transition-all ${
            actionNotice.type === 'success'
              ? 'bg-green-50 border-status-success text-status-success'
              : 'bg-red-50 border-status-danger text-status-danger'
          }`}>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">
                {actionNotice.type === 'success' ? 'check_circle' : 'cancel'}
              </span>
              <span>{actionNotice.message}</span>
            </div>
          </div>
        )}

        {/* Pending Worker Verifications Table */}
        <div className="bg-surface-card border-2 border-status-warning/60 shadow-sm p-5">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-border-subtle">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-status-warning text-[22px]">pending_actions</span>
              <div>
                <h2 className="text-base font-bold text-primary">Pending Worker Verifications</h2>
                <p className="text-xs text-text-muted">Audit Aadhaar/eShram identity and approve workers into active service directory</p>
              </div>
            </div>
            <span className="bg-yellow-100 text-status-warning font-bold text-xs px-2.5 py-1 border border-status-warning/40">
              {pendingWorkers.length} Pending Approval
            </span>
          </div>

          {pendingWorkers.length === 0 ? (
            <div className="bg-surface-canvas p-8 text-center border border-dashed border-border-subtle my-2">
              <span className="material-symbols-outlined text-status-success text-[36px]">verified</span>
              <p className="font-bold text-text-primary text-sm mt-1">All Worker Verifications Complete</p>
              <p className="text-xs text-text-muted">No pending worker applications awaiting society administrative clearance.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-surface-canvas border-b border-border-strong text-text-secondary uppercase text-[10px] tracking-wider">
                    <th className="p-3">Applicant Name</th>
                    <th className="p-3">Mobile Number</th>
                    <th className="p-3">Skill / Trade</th>
                    <th className="p-3">Submitted Date</th>
                    <th className="p-3">Verification Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {pendingWorkers.map((worker) => (
                    <tr key={worker.id} className="hover:bg-surface-canvas/50">
                      <td className="p-3 font-bold text-primary flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center">
                          {worker.name.charAt(0)}
                        </div>
                        {worker.name}
                      </td>
                      <td className="p-3 font-mono text-text-primary">{worker.phone}</td>
                      <td className="p-3 font-semibold text-text-secondary">{worker.skill}</td>
                      <td className="p-3 text-text-muted">{worker.submittedDate}</td>
                      <td className="p-3">
                        <span className="bg-yellow-100 text-status-warning px-2 py-0.5 text-[10px] font-bold uppercase border border-yellow-300">
                          Pending Approval
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => approveWorker(worker.id)}
                            className="px-3 py-1 bg-status-success text-white font-bold text-xs hover:bg-green-700 flex items-center gap-1 shadow-sm cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[14px]">check</span>
                            Approve
                          </button>
                          <button
                            onClick={() => rejectWorker(worker.id)}
                            className="px-3 py-1 bg-status-danger text-white font-bold text-xs hover:bg-red-700 flex items-center gap-1 shadow-sm cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[14px]">close</span>
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent Society Bookings & DBT Ledger */}
        <div className="bg-surface-card border border-border-subtle shadow-sm p-5">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-border-subtle">
            <div>
              <h2 className="text-base font-bold text-primary">Recent Society Bookings & DBT Ledger</h2>
              <p className="text-xs text-text-muted">Audited transaction ledger for local cooperative gig dispatches</p>
            </div>
            <span className="text-xs font-semibold text-text-secondary">Showing {completedBookings.length} Transactions</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-surface-canvas border-b border-border-strong text-text-secondary uppercase text-[10px] tracking-wider">
                  <th className="p-3">Booking ID</th>
                  <th className="p-3">Worker Name</th>
                  <th className="p-3">Trade</th>
                  <th className="p-3">Client / Citizen</th>
                  <th className="p-3">Fee Total</th>
                  <th className="p-3">Duty Status</th>
                  <th className="p-3">DBT Credit</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {completedBookings.map((row) => (
                  <tr key={row.id} className="hover:bg-surface-canvas/50">
                    <td className="p-3 font-bold text-primary">{row.id}</td>
                    <td className="p-3 font-semibold text-text-primary">{row.worker}</td>
                    <td className="p-3 text-text-secondary">{row.trade}</td>
                    <td className="p-3 text-text-secondary">{row.client}</td>
                    <td className="p-3 font-bold text-text-primary">{row.amount}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 text-[10px] font-bold uppercase border ${
                        row.status === 'Completed' ? 'bg-green-100 text-status-success border-green-300' :
                        row.status.includes('Cancelled') ? 'bg-red-100 text-status-danger border-red-300' :
                        row.status.includes('Accepted') ? 'bg-blue-100 text-primary border-blue-300' :
                        'bg-yellow-100 text-status-warning border-yellow-300'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="p-3 font-semibold text-status-info">{row.dbt}</td>
                    <td className="p-3 text-right">
                      <button className="text-primary font-bold hover:underline">View Receipt</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
