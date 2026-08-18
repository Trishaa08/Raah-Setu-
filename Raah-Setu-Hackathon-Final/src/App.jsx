import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DribbbleHome from './pages/DribbbleHome';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import LiveTraffic from './pages/LiveTraffic';
import Prediction from './pages/Prediction';
import Signals from './pages/Signals';
import RoutesPage from './pages/Routes';
import Incidents from './pages/Incidents';
import Analytics from './pages/Analytics';
import Alerts from './pages/Alerts';
import Settings from './pages/Settings';
import Simulation from './pages/Simulation';

function App() {
  return (
    <Routes>
      {/* Dribbble Style Homepage / Discovery Grid */}
      <Route path="/" element={<DribbbleHome />} />

      {/* Landing / Login */}
      <Route path="/login" element={<Login />} />

      {/* Main Authenticated Command Center Layout */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/live-traffic" element={<LiveTraffic />} />
        <Route path="/prediction" element={<Prediction />} />
        <Route path="/simulation" element={<Simulation />} />
        <Route path="/signals" element={<Signals />} />
        <Route path="/routes" element={<RoutesPage />} />
        <Route path="/incidents" element={<Incidents />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
