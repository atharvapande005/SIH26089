import React from 'react';

export default function FederationDashboard() {
  const districtPerformance = [
    { district: 'Pune District Federation', societies: 18, workers: '4,850', totalJobs: '42,100', dbtDisbursed: '₹52.40 Lakh', rating: '4.88 ★', compliance: '99.5%' },
    { district: 'Nashik Labour Federation', societies: 12, workers: '3,200', totalJobs: '28,400', dbtDisbursed: '₹34.10 Lakh', rating: '4.82 ★', compliance: '98.9%' },
    { district: 'Thane District Cooperative', societies: 10, workers: '2,900', totalJobs: '24,100', dbtDisbursed: '₹31.50 Lakh', rating: '4.85 ★', compliance: '99.1%' },
    { district: 'Nagpur Rural Federation', societies: 8, workers: '1,500', totalJobs: '12,800', dbtDisbursed: '₹14.80 Lakh', rating: '4.79 ★', compliance: '98.5%' }
  ];

  return (
    <div className="w-full flex-1 bg-surface-canvas py-8">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 flex flex-col gap-6">
        {/* Header Ribbon */}
        <div className="bg-primary text-on-primary border-b-4 border-gov-saffron p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-gov-saffron"></span>
                <span className="text-xs uppercase font-bold tracking-wider text-gov-saffron">
                  Ministry of Cooperation • Apex Governance Portal
                </span>
              </div>
              <h1 className="text-2xl font-bold text-white mt-1">
                State Cooperative Federation Rollup Dashboard
              </h1>
              <p className="text-xs text-on-primary-container mt-0.5">
                Integrated Rollup Monitoring for Primary Agricultural Credit Societies (PACS) & District Federations
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-white/10 px-3 py-1 text-xs font-semibold rounded text-white border border-white/20">
                FY 2024-25 Q3 Live Analytics
              </span>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 p-4 border border-white/15">
              <span className="text-[11px] font-bold uppercase text-on-primary-container">Affiliated Societies (PACS)</span>
              <div className="text-2xl font-bold text-white mt-1">48</div>
              <span className="text-[11px] text-gov-saffron font-semibold">100% Statutory Clearance</span>
            </div>
            <div className="bg-white/10 p-4 border border-white/15">
              <span className="text-[11px] font-bold uppercase text-on-primary-container">Active Gig Workers</span>
              <div className="text-2xl font-bold text-white mt-1">12,450</div>
              <span className="text-[11px] text-green-300 font-semibold">12,100 eShram Linked</span>
            </div>
            <div className="bg-white/10 p-4 border border-white/15">
              <span className="text-[11px] font-bold uppercase text-on-primary-container">Cumulative DBT Disbursed</span>
              <div className="text-2xl font-bold text-gov-saffron mt-1">₹1.328 Crore</div>
              <span className="text-[11px] text-white">0% Platform Cut Audited</span>
            </div>
            <div className="bg-white/10 p-4 border border-white/15">
              <span className="text-[11px] font-bold uppercase text-on-primary-container">National Compliance Index</span>
              <div className="text-2xl font-bold text-green-400 mt-1">99.2%</div>
              <span className="text-[11px] text-white font-semibold">Grade A Statutory Audit</span>
            </div>
          </div>
        </div>

        {/* District Rollup Table (4 sample rows as requested) */}
        <div className="bg-surface-card border border-border-subtle shadow-sm p-5">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-border-subtle">
            <div>
              <h2 className="text-base font-bold text-primary">District Federation Performance Matrix</h2>
              <p className="text-xs text-text-muted">Aggregated performance and minimum wage compliance across district clusters</p>
            </div>
            <button className="px-3 py-1.5 bg-primary text-on-primary text-xs font-bold hover:bg-primary-container">
              Download Ministry Rollup PDF
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-surface-canvas border-b border-border-strong text-text-secondary uppercase text-[10px] tracking-wider">
                  <th className="p-3">District Federation</th>
                  <th className="p-3">Active PACS</th>
                  <th className="p-3">Enrolled Workers</th>
                  <th className="p-3">Completed Jobs</th>
                  <th className="p-3">DBT Disbursed</th>
                  <th className="p-3">Avg Rating</th>
                  <th className="p-3">Compliance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {districtPerformance.map((row, idx) => (
                  <tr key={idx} className="hover:bg-surface-canvas/50">
                    <td className="p-3 font-bold text-primary">{row.district}</td>
                    <td className="p-3 font-semibold text-text-primary">{row.societies}</td>
                    <td className="p-3 text-text-primary">{row.workers}</td>
                    <td className="p-3 text-text-primary">{row.totalJobs}</td>
                    <td className="p-3 font-bold text-status-success">{row.dbtDisbursed}</td>
                    <td className="p-3 font-bold text-status-warning">{row.rating}</td>
                    <td className="p-3">
                      <span className="bg-green-100 text-status-success font-bold text-[10px] px-2 py-0.5">
                        {row.compliance}
                      </span>
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
