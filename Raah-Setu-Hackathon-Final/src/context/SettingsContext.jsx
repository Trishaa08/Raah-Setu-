import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  // Map Layer Preferences
  const [mapLayers, setMapLayers] = useState({
    showCameras: true,
    showSignals: true,
    showIncidents: true,
    showTrafficDensity: true,
  });

  // System Automation Preferences
  const [systemSettings, setSystemSettings] = useState({
    autoRefresh: true,
    autoRefreshIntervalSec: 5,
    aiRecommendationsEnabled: true,
    emergencyAlertsEnabled: true,
    audioAlerts: false,
    darkMode: true,
    simulationSpeed: 1, // 1x, 2x, 5x
  });

  // Current Operator Profile
  const [currentUser, setCurrentUser] = useState({
    name: "Vikram Rathore",
    role: "Senior Traffic Controller",
    badgeNumber: "NMC-TC-084",
    department: "Nagpur Smart City Command & Control Centre",
    email: "vikram.rathore@raah-setu.gov.in",
    shift: "Evening Peak (16:00 - 00:00)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80"
  });

  const toggleMapLayer = (layerKey) => {
    setMapLayers(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  const updateSystemSetting = (key, value) => {
    setSystemSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <SettingsContext.Provider
      value={{
        mapLayers,
        toggleMapLayer,
        systemSettings,
        updateSystemSetting,
        currentUser,
        setCurrentUser
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
