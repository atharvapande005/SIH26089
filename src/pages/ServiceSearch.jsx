import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkers } from '../context/WorkerContext';

export default function ServiceSearch() {
  const { activeWorkers, initiateBooking } = useWorkers();
  const navigate = useNavigate();

  const handleBookWorker = (worker) => {
    initiateBooking(worker);
    navigate('/booking-confirmation');
  };

  return (
    <div className="w-full flex-1 bg-surface-canvas py-8">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 flex flex-col gap-6">
        {/* Header Ribbon */}
        <div className="bg-surface-card border border-border-subtle p-5 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-subtle pb-4 mb-4">
            <div>
              <h1 className="text-xl font-bold text-primary">Cooperative Service Directory & Booking</h1>
              <p className="text-xs text-text-secondary">Official database of vetted workers from registered primary cooperative societies</p>
            </div>
            <div className="flex items-center gap-2 text-xs bg-surface-canvas px-3 py-1.5 border border-border-subtle">
              <span className="w-2 h-2 rounded-full bg-status-success"></span>
              <span className="font-semibold text-text-primary">{activeWorkers.length} Verified Workers Available in Pune District</span>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div>
              <label className="text-[11px] font-bold uppercase text-text-muted mb-1 block">Trade Category</label>
              <select className="w-full h-9 px-3 bg-surface-card border border-border-strong text-xs font-semibold">
                <option>All Services (Electrician, Plumber, etc.)</option>
                <option>Electrical Maintenance</option>
                <option>Plumbing & Sanitation</option>
                <option>Agricultural Operators</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase text-text-muted mb-1 block">District / Taluka</label>
              <input
                type="text"
                className="w-full h-9 px-3 bg-surface-card border border-border-strong text-xs"
                defaultValue="Pune District, Maharashtra"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase text-text-muted mb-1 block">Date Required</label>
              <input
                type="date"
                className="w-full h-9 px-3 bg-surface-card border border-border-strong text-xs"
                defaultValue="2026-09-10"
              />
            </div>
            <div className="flex items-end">
              <button className="w-full h-9 bg-primary text-on-primary font-bold text-xs hover:bg-primary-container flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-[16px]">search</span>
                Filter Directory
              </button>
            </div>
          </div>
        </div>

        {/* Worker Cards List */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between text-xs text-text-secondary px-1">
            <span>Showing <strong>{activeWorkers.length}</strong> available certified workers in Pune District</span>
            <span className="text-text-muted">Sorted by statutory clearance & rating</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeWorkers.map((worker) => (
              <div key={worker.id} className="bg-surface-card border border-border-subtle p-5 shadow-sm flex flex-col justify-between hover:border-primary transition-colors">
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-bold text-base">
                        {worker.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sm text-text-primary">{worker.name}</h3>
                          <span className="bg-green-100 text-status-success text-[10px] px-1.5 py-0.5 font-bold uppercase">
                            {worker.badge}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-primary">{worker.trade}</p>
                        <p className="text-[11px] text-text-muted">{worker.society}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-surface-canvas p-2.5 border border-border-subtle grid grid-cols-3 gap-2 text-xs mb-4 text-center">
                    <div>
                      <span className="text-[10px] text-text-muted block uppercase">Rating</span>
                      <span className="font-bold text-status-warning">{worker.rating}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-text-muted block uppercase">Experience</span>
                      <span className="font-semibold text-text-primary">{worker.experience}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-text-muted block uppercase">Availability</span>
                      <span className="font-semibold text-status-success">{worker.availability}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-border-subtle pt-3 text-xs">
                  <div>
                    <span className="text-[10px] text-text-muted block uppercase">Statutory Fee</span>
                    <span className="font-bold text-sm text-primary">{worker.rate}</span>
                  </div>
                  <button
                    onClick={() => handleBookWorker(worker)}
                    className="px-4 py-2 bg-primary text-on-primary font-bold text-xs hover:bg-primary-container flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">bookmark_add</span>
                    Book Service Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
