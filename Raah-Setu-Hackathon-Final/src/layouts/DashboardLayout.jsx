import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import GlobalSearchModal from '../components/common/GlobalSearchModal';
import DemoTourModal from '../components/common/DemoTourModal';
import ToastContainer from '../components/common/Toast';

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#060b14] text-slate-100 flex flex-col font-sans">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        {/* Top Navbar */}
        <Navbar
          onOpenSearch={setIsSearchOpen}
          onToggleMobileSidebar={() => setIsMobileOpen(!isMobileOpen)}
        />

        {/* Dynamic Page Routed Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          <Outlet />
        </main>
      </div>

      {/* Overlays & Modals */}
      <GlobalSearchModal isOpen={isSearchOpen} onClose={setIsSearchOpen} />
      <DemoTourModal />
      <ToastContainer />
    </div>
  );
};

export default DashboardLayout;
