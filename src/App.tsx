import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BuyVehicles from './pages/BuyVehicles';
import VehicleDetail from './pages/VehicleDetail';
import Dealers from './pages/Dealers';
import DealerProfile from './pages/DealerProfile';
import BecomeSeller from './pages/BecomeSeller';
import Dashboard from './pages/Dashboard';

function AppContent() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <div className="flex flex-col min-h-screen font-sans text-slate-900 antialiased">
      {!isDashboard && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buy" element={<BuyVehicles />} />
          <Route path="/vehicle/:id" element={<VehicleDetail />} />
          <Route path="/dealers" element={<Dealers />} />
          <Route path="/dealer/:id" element={<DealerProfile />} />
          <Route path="/become-seller" element={<BecomeSeller />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Fallback for 404 */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      {!isDashboard && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
