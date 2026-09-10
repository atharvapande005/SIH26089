import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    fetch('/api/stats')
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoadingStats(false);
      })
      .catch((err) => {
        console.error('Failed to fetch stats from API:', err);
        setStats({ registeredSocieties: 48000, verifiedWorkers: 620000, directPayoutPercent: 93 });
        setLoadingStats(false);
      });
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* Official Ticker / Bulletin */}
      <section className="w-full bg-surface-container-high py-2 border-b border-border-subtle">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 flex flex-col md:flex-row md:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="inline-flex items-center gap-1 bg-primary text-on-primary px-2 py-0.5 font-bold uppercase tracking-wider text-[11px] shrink-0">
              <span className="material-symbols-outlined text-[14px]">campaign</span>
              Official Bulletin
            </span>
            <p className="text-text-primary truncate">
              <strong className="font-semibold text-primary">Statutory Update:</strong> Standard labour minimum wage rates updated for FY 2024-25 across all Cooperative clusters.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-text-muted">Ref: MoC/DIR/2024/782-B</span>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="w-full bg-surface-card py-10 border-b border-border-subtle">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Col: Main Mandate */}
            <div className="lg:col-span-8 flex flex-col">
              <div className="bg-surface-canvas px-3 py-1.5 mb-4 inline-block self-start border border-border-subtle">
                <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary flex items-center gap-2">
                  <span className="w-2 h-2 bg-gov-saffron"></span>
                  Statutory Platform under Ministry of Cooperation, Govt of India
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-primary tracking-tight mb-3">
                Cooperative-owned services. Verified workers. Fair wages.
              </h1>
              
              <p className="text-base text-text-secondary max-w-3xl mb-6 leading-relaxed">
                Empowering Primary Agricultural Credit Societies (PACS) and Labour Cooperative Societies nationwide. Direct citizen access to certified gig labour without platform commissions or middleman exploitation.
              </p>

              {/* Primary CTAs */}
              <div className="flex flex-wrap items-center gap-4 pb-6">
                <Link
                  to="/customer-signup"
                  className="inline-flex items-center justify-center h-[44px] px-6 bg-primary-container text-on-primary font-bold text-sm tracking-wide hover:bg-primary transition-colors border border-primary shadow-sm"
                >
                  <span className="material-symbols-outlined text-[18px] mr-2">person_add</span>
                  Citizen Sign Up
                </Link>
                <Link
                  to="/service-search"
                  className="inline-flex items-center justify-center h-[44px] px-6 bg-surface-card text-primary-container font-bold text-sm tracking-wide hover:bg-surface-canvas transition-colors border border-border-strong shadow-sm"
                >
                  <span className="material-symbols-outlined text-[18px] mr-2">search</span>
                  Search Services
                </Link>
                <div className="hidden sm:block h-8 w-px bg-border-subtle"></div>
                <Link
                  to="/worker-signup"
                  className="inline-flex items-center text-xs font-semibold text-text-secondary hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px] mr-1 text-gov-saffron">badge</span>
                  Looking for work? <span className="font-bold text-primary ml-1 underline">Worker Registration (Aadhaar/eShram)</span> →
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="bg-surface-canvas p-4 border border-border-subtle">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-status-success text-[20px] shrink-0 mt-0.5">verified_user</span>
                    <div>
                      <h4 className="font-bold text-text-primary">100% Aadhaar Verified</h4>
                      <p className="text-text-muted">Biometric background identity audited via UIDAI.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">account_balance</span>
                    <div>
                      <h4 className="font-bold text-text-primary">Zero Intermediary Cut</h4>
                      <p className="text-text-muted">Full fee transferred to worker & local society account.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-status-warning text-[20px] shrink-0 mt-0.5">gavel</span>
                    <div>
                      <h4 className="font-bold text-text-primary">Statutory Wage Rates</h4>
                      <p className="text-text-muted">Fixed municipal wages vetted by Ministry schedules.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Public Circulars / Portal Stats */}
            <div className="lg:col-span-4 bg-surface-card border border-border-subtle shadow-sm p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between pb-2 bg-surface-canvas px-3 py-2 border-b border-border-subtle">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary-container text-[20px]">notifications_active</span>
                  <h3 className="text-sm text-primary font-bold">Public Circulars</h3>
                </div>
                <span className="text-[11px] text-status-success font-semibold uppercase">Live Portal</span>
              </div>

              <div className="flex flex-col gap-3 text-xs">
                <div className="border-b border-border-subtle pb-2">
                  <span className="text-[10px] font-bold text-gov-saffron uppercase">Notice #4092</span>
                  <p className="font-semibold text-text-primary">Empathy & Safety Standards for Domestic Care Workers</p>
                  <span className="text-[11px] text-text-muted">Issued by National Cooperative Board</span>
                </div>
                <div className="border-b border-border-subtle pb-2">
                  <span className="text-[10px] font-bold text-gov-saffron uppercase">Notice #4088</span>
                  <p className="font-semibold text-text-primary">PACS Onboarding Schedule for Q3 Maharashtra & Gujarat</p>
                  <span className="text-[11px] text-text-muted">Directives for Society Secretaries</span>
                </div>
                <div className="pb-1">
                  <span className="text-[10px] font-bold text-gov-saffron uppercase">Notice #4075</span>
                  <p className="font-semibold text-text-primary">Direct Benefit Transfer (DBT) Direct Bank Credit System</p>
                  <span className="text-[11px] text-text-muted">Reserve Bank of India Guidelines</span>
                </div>
              </div>

              {/* Institutional Quick Access Card */}
              <div className="mt-2 bg-primary text-on-primary p-4 rounded-none">
                <h4 className="font-bold text-sm mb-1">Administrative Portals</h4>
                <p className="text-xs text-on-primary-container mb-3">Access Society Management & District Federation Portals</p>
                <div className="flex gap-2">
                  <Link to="/society-login" className="px-3 py-1.5 bg-gov-saffron text-primary font-bold text-xs hover:bg-yellow-400">
                    Society Admin
                  </Link>
                  <Link to="/federation-dashboard" className="px-3 py-1.5 bg-white/20 text-white font-bold text-xs hover:bg-white/30">
                    Federation Rollup
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Statistics Section (Fetched from Express Backend API) */}
      <section className="w-full bg-primary text-on-primary py-8 border-y border-border-strong">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-gov-saffron text-[22px]">analytics</span>
                National Cooperative Impact Statistics
              </h2>
              <p className="text-xs text-on-primary-container">Audited data dynamically served via Ministry of Cooperation API</p>
            </div>
            <span className="text-[11px] bg-white/10 px-3 py-1 font-mono text-gov-saffron border border-gov-saffron/30">
              API Endpoint: /api/stats
            </span>
          </div>

          {loadingStats ? (
            <div className="p-8 bg-white/5 border border-white/10 text-center text-xs text-on-primary-container animate-pulse flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[20px] animate-spin">sync</span>
              <span>Fetching live portal statistics...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Card 1: Registered Societies */}
              <div className="bg-white/10 border border-white/15 p-5 flex flex-col justify-between shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs text-on-primary-container font-semibold uppercase tracking-wider">Registered Societies</span>
                  <span className="material-symbols-outlined text-gov-saffron text-[22px]">corporate_fare</span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {stats?.registeredSocieties?.toLocaleString()} +
                </div>
                <p className="text-[11px] text-text-muted">Primary Agricultural Credit Societies (PACS) & Labour Unions</p>
              </div>

              {/* Card 2: Verified Workers */}
              <div className="bg-white/10 border border-white/15 p-5 flex flex-col justify-between shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs text-on-primary-container font-semibold uppercase tracking-wider">Verified Workers</span>
                  <span className="material-symbols-outlined text-status-success text-[22px]">badge</span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {stats?.verifiedWorkers?.toLocaleString()} +
                </div>
                <p className="text-[11px] text-text-muted">100% Aadhaar & eShram Biometric Background Audited</p>
              </div>

              {/* Card 3: Direct DBT Payout Rate */}
              <div className="bg-white/10 border border-white/15 p-5 flex flex-col justify-between shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs text-on-primary-container font-semibold uppercase tracking-wider">Direct DBT Payout Rate</span>
                  <span className="material-symbols-outlined text-gov-saffron text-[22px]">account_balance_wallet</span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {stats?.directPayoutPercent} %
                </div>
                <p className="text-[11px] text-text-muted">Wages credited directly to worker Aadhaar bank accounts</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Services Grid */}
      <section className="w-full py-10 bg-surface-canvas">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-primary">Cooperative Service Categories</h2>
            <p className="text-xs text-text-secondary">Certified trades operated through registered local labor cooperatives</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: 'Electrical & Power Maintenance', icon: 'electrical_services', count: '1,420 Workers', rate: '₹350/hr standard' },
              { title: 'Plumbing & Water Works', icon: 'plumbing', count: '980 Workers', rate: '₹300/hr standard' },
              { title: 'Agricultural & Labour Support', icon: 'agriculture', count: '4,500 Workers', rate: '₹450/day standard' },
              { title: 'Home Care & Sanitation', icon: 'cleaning_services', count: '2,100 Workers', rate: '₹280/hr standard' }
            ].map((cat, idx) => (
              <div key={idx} className="bg-surface-card border border-border-subtle p-4 flex flex-col justify-between hover:border-primary transition-colors shadow-sm">
                <div>
                  <div className="w-10 h-10 bg-primary/10 text-primary flex items-center justify-center mb-3">
                    <span className="material-symbols-outlined">{cat.icon}</span>
                  </div>
                  <h3 className="font-bold text-sm text-text-primary mb-1">{cat.title}</h3>
                  <p className="text-xs text-text-muted mb-2">{cat.count}</p>
                </div>
                <div className="border-t border-border-subtle pt-2 flex items-center justify-between text-xs">
                  <span className="font-semibold text-status-info">{cat.rate}</span>
                  <Link to="/service-search" className="text-primary font-bold hover:underline">Book →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
