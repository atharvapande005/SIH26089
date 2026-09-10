import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { WorkerProvider, useWorkers } from './context/WorkerContext';
import Header from './components/Header';
import Footer from './components/Footer';

import Landing from './pages/Landing';
import CustomerSignup from './pages/CustomerSignup';
import ServiceSearch from './pages/ServiceSearch';
import BookingConfirmation from './pages/BookingConfirmation';
import WorkerSignup from './pages/WorkerSignup';
import WorkerProfile from './pages/WorkerProfile';
import SocietyAdminLogin from './pages/SocietyAdminLogin';
import SocietyAdminDashboard from './pages/SocietyAdminDashboard';
import FederationDashboard from './pages/FederationDashboard';

function ProtectedRoute({ allowedRole, redirectTo, children }) {
  const { currentRole } = useWorkers();
  if (currentRole !== allowedRole) {
    return <Navigate to={redirectTo} replace />;
  }
  return children;
}

export default function App() {
  return (
    <WorkerProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-surface-canvas font-body-md text-text-primary antialiased">
          <Header />
          <main id="main-content" className="flex-1 flex flex-col">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/customer-signup" element={<CustomerSignup />} />
              <Route path="/worker-signup" element={<WorkerSignup />} />
              <Route path="/society-login" element={<SocietyAdminLogin />} />

              {/* Citizen Protected Routes */}
              <Route path="/service-search" element={
                <ProtectedRoute allowedRole="citizen" redirectTo="/customer-signup">
                  <ServiceSearch />
                </ProtectedRoute>
              } />
              <Route path="/booking-confirmation" element={
                <ProtectedRoute allowedRole="citizen" redirectTo="/customer-signup">
                  <BookingConfirmation />
                </ProtectedRoute>
              } />

              {/* Worker Protected Routes */}
              <Route path="/worker-profile" element={
                <ProtectedRoute allowedRole="worker" redirectTo="/worker-signup">
                  <WorkerProfile />
                </ProtectedRoute>
              } />

              {/* Society Admin Protected Route */}
              <Route path="/society-dashboard" element={
                <ProtectedRoute allowedRole="society" redirectTo="/society-login">
                  <SocietyAdminDashboard />
                </ProtectedRoute>
              } />

              {/* Federation Protected Route */}
              <Route path="/federation-dashboard" element={
                <ProtectedRoute allowedRole="federation" redirectTo="/society-login">
                  <FederationDashboard />
                </ProtectedRoute>
              } />

              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </WorkerProvider>
  );
}
