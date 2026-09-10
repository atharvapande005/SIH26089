import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-primary text-on-primary border-t-2 border-gov-saffron mt-auto">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        {/* Left Side */}
        <div className="font-semibold text-white">
          SahakarSetu — Ministry of Cooperation, Government of India
        </div>

        {/* Right Side */}
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <a href="#" className="text-on-primary-container hover:text-white hover:underline transition-colors">
            About
          </a>
          <a href="#" className="text-on-primary-container hover:text-white hover:underline transition-colors">
            Contact
          </a>
          <a href="#" className="text-on-primary-container hover:text-white hover:underline transition-colors">
            Grievance
          </a>
          <span className="text-white/30 hidden sm:inline">|</span>
          <span className="text-on-primary-container">
            Helpline: <strong className="text-gov-saffron font-bold ml-1">1800-11-2024</strong>
          </span>
        </div>
      </div>
    </footer>
  );
}
