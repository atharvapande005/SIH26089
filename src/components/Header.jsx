import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useWorkers } from '../context/WorkerContext';

export default function Header() {
  const { currentRole, logout } = useWorkers();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Determine navigation tabs according to active user role
  let navItems = [];
  if (!currentRole) {
    navItems = [
      { path: '/', label: 'Home' },
      { path: '/customer-signup', label: 'Citizen Sign Up / Login' },
      { path: '/worker-signup', label: 'Worker Registration / Login' }
    ];
  } else if (currentRole === 'citizen') {
    navItems = [
      { path: '/', label: 'Home' },
      { path: '/service-search', label: 'Service Search' },
      { path: '/booking-confirmation', label: 'My Bookings' }
    ];
  } else if (currentRole === 'worker') {
    navItems = [
      { path: '/', label: 'Home' },
      { path: '/worker-profile', label: 'Worker Profile' }
    ];
  } else if (currentRole === 'society') {
    navItems = [
      { path: '/', label: 'Home' },
      { path: '/society-dashboard', label: 'Society Admin Dashboard' }
    ];
  } else if (currentRole === 'federation') {
    navItems = [
      { path: '/', label: 'Home' },
      { path: '/federation-dashboard', label: 'Federation Dashboard' }
    ];
  }

  const roleLabels = {
    citizen: 'Citizen Portal',
    worker: 'Worker Portal',
    society: 'Society Admin',
    federation: 'Federation Admin'
  };

  return (
    <header className="w-full bg-surface-card z-50 border-b border-border-subtle shadow-sm">
      {/* Government of India Top Banner */}
      <div className="w-full bg-primary text-on-primary border-b border-border-strong">
        <div className="h-8 max-w-[1280px] mx-auto px-4 md:px-6 flex items-center justify-between font-label-sm text-xs">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-none bg-gov-saffron"></span>
            <span className="font-semibold">भारत सरकार | Government of India</span>
          </div>
          <div className="flex items-center gap-3">
            <a className="hover:underline hidden sm:inline" href="#main-content">Skip to main content</a>
            <span className="text-border-subtle hidden sm:inline">|</span>
            
            {/* Small less prominent link for Society / Federation Login when not logged in */}
            {!currentRole ? (
              <Link 
                to="/society-login" 
                className="text-[11px] text-gov-saffron hover:underline font-semibold flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded"
              >
                <span className="material-symbols-outlined text-[13px]">domain</span>
                Society / Federation Login
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-gov-saffron font-bold text-[11px] bg-white/10 px-2 py-0.5 rounded uppercase">
                  {roleLabels[currentRole] || currentRole}
                </span>
              </div>
            )}
            
            <span className="text-border-subtle">|</span>
            <button className="font-bold hover:text-gov-saffron" type="button">हिंदी / English</button>
          </div>
        </div>
      </div>

      {/* Main Header Brand Bar */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gov-saffron/10 border border-gov-saffron/30 flex items-center justify-center font-bold text-gov-saffron text-lg shrink-0">
            🏛️
          </div>
          <div className="border-l border-border-subtle pl-4 flex flex-col">
            <span className="text-[11px] font-semibold tracking-tight text-text-secondary uppercase">
              सहकारिता मंत्रालय | Ministry of Cooperation
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary">SahakarSetu</span>
              <span className="text-base font-semibold text-text-primary hidden sm:inline">(सहकार सेतु)</span>
            </div>
            <span className="text-xs text-text-muted hidden md:inline">
              National Cooperative Gig Services Platform
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col text-right text-xs">
            <span className="font-semibold text-text-primary">Toll-Free Helpline</span>
            <span className="text-status-info font-bold text-sm">1800-11-2024</span>
          </div>
          {currentRole && (
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 bg-status-danger hover:bg-red-700 text-white font-bold text-xs rounded flex items-center gap-1 shadow-sm cursor-pointer transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">logout</span>
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Navigation Links Bar */}
      <nav className="w-full bg-primary-container border-t border-border-subtle">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 flex items-center justify-between overflow-x-auto text-xs font-semibold">
          <div className="flex items-center">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-4 py-3 border-r border-secondary/30 whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-primary text-on-primary font-bold border-b-2 border-b-gov-saffron'
                      : 'text-on-primary-container hover:bg-primary hover:text-on-primary'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Additional right side link if unauthenticated */}
          {!currentRole && (
            <div className="hidden sm:flex items-center pr-2">
              <Link 
                to="/society-login" 
                className="text-on-primary-container hover:text-gov-saffron text-xs font-semibold px-3 py-1 flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[15px]">corporate_fare</span>
                Society / Federation Portal →
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
