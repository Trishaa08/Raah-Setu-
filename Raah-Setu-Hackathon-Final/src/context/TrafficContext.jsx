import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { initialSignals } from '../data/signalData';
import { initialIncidents, incidentStats } from '../data/incidentData';
import { roadsData, summaryStats } from '../data/trafficData';
import { alertsHistory } from '../data/analyticsData';

const TrafficContext = createContext();

export const TrafficProvider = ({ children }) => {
  // State management
  const [selectedZone, setSelectedZone] = useState('ALL');
  const [signals, setSignals] = useState(initialSignals);
  const [incidents, setIncidents] = useState(initialIncidents);
  const [roads, setRoads] = useState(roadsData);
  const [stats, setStats] = useState(summaryStats);
  const [alerts, setAlerts] = useState(alertsHistory);
  const [appliedRecommendations, setAppliedRecommendations] = useState([]);
  const [toasts, setToasts] = useState([]);
  
  // Guided Demo Tour State (Story mode for hackathon judging)
  const [demoTourActive, setDemoTourActive] = useState(false);
  const [demoStep, setDemoStep] = useState(0);

  // Toast Notification Trigger
  const showToast = useCallback((message, type = 'success', duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Simulated Signal Phase Countdown Clock (every 1 sec)
  useEffect(() => {
    const timer = setInterval(() => {
      setSignals((prevSignals) =>
        prevSignals.map((signal) => {
          let newRemaining = signal.secondsRemaining - 1;
          let newPhase = signal.currentPhase;

          if (newRemaining <= 0) {
            if (signal.currentPhase === 'GREEN') {
              newPhase = 'YELLOW';
              newRemaining = 4;
            } else if (signal.currentPhase === 'YELLOW') {
              newPhase = 'RED';
              newRemaining = signal.cycleTime - signal.greenTime - 4;
            } else {
              newPhase = 'GREEN';
              newRemaining = signal.greenTime;
            }
          }

          return {
            ...signal,
            currentPhase: newPhase,
            secondsRemaining: newRemaining,
          };
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Apply AI Signal Timing Optimization
  const applySignalAITiming = useCallback((signalId) => {
    setSignals((prev) =>
      prev.map((s) => {
        if (s.id === signalId) {
          return {
            ...s,
            status: 'Optimized',
            isAITimingApplied: true,
            timings: { ...s.aiRecommendedTimings },
            greenTime: s.aiRecommendedTimings.northSouth,
          };
        }
        return s;
      })
    );

    // Update global KPI
    setStats((prev) => ({
      ...prev,
      optimizedSignals: Math.min(prev.activeSignals, prev.optimizedSignals + 1),
      averageTravelTime: Number((prev.averageTravelTime * 0.96).toFixed(1)),
    }));

    showToast(`✓ AI Timing applied successfully for Signal ${signalId}! Green time synchronized.`, 'success');
  }, [showToast]);

  // Apply AI Recommendation from Prediction Module
  const applyPredictionRecommendation = useCallback((recommendationText, location) => {
    const recId = Date.now();
    setAppliedRecommendations((prev) => [...prev, { id: recId, text: recommendationText, location, time: new Date().toLocaleTimeString() }]);
    
    // Alleviate road congestion in simulated state
    setRoads((prev) =>
      prev.map((r) => {
        if (r.name.includes(location) || location.includes(r.name)) {
          return {
            ...r,
            trafficLevel: 'MEDIUM',
            color: '#F59E0B',
            vehiclesPerHour: Math.round(r.vehiclesPerHour * 0.85),
            averageSpeed: r.averageSpeed + 8,
          };
        }
        return r;
      })
    );

    showToast(`✓ Recommendation applied: Green signal increased by 18s & traffic diverted to Ring Road.`, 'success');
  }, [showToast]);

  // Incident Actions
  const dispatchIncidentResponse = useCallback((incidentId) => {
    setIncidents((prev) =>
      prev.map((inc) => {
        if (inc.id === incidentId) {
          return {
            ...inc,
            status: 'DISPATCHED',
            recommendations: inc.recommendations.map((r) => (r.action.includes('Corridor') || r.action.includes('Tow') ? { ...r, status: 'DONE' } : r)),
          };
        }
        return inc;
      })
    );
    showToast(`🚨 Emergency response units dispatched for ${incidentId}. Priority corridor cleared!`, 'warning');
  }, [showToast]);

  const divertIncidentTraffic = useCallback((incidentId) => {
    setIncidents((prev) =>
      prev.map((inc) => {
        if (inc.id === incidentId) {
          return {
            ...inc,
            status: 'DIVERTING',
            recommendations: inc.recommendations.map((r) => (r.action.includes('Divert') ? { ...r, status: 'DONE' } : r)),
          };
        }
        return inc;
      })
    );
    showToast(`🛣️ Traffic diversion active via Outer Ring Road Sector 5. Digital VMS signs updated.`, 'info');
  }, [showToast]);

  const resolveIncident = useCallback((incidentId) => {
    setIncidents((prev) =>
      prev.map((inc) => {
        if (inc.id === incidentId) {
          return {
            ...inc,
            status: 'RESOLVED',
            severity: 'LOW',
            recommendations: inc.recommendations.map((r) => ({ ...r, status: 'DONE' })),
          };
        }
        return inc;
      })
    );
    showToast(`✓ Incident ${incidentId} marked as RESOLVED. Standard flow restored.`, 'success');
  }, [showToast]);

  // Demo Tour Controls
  const startDemoTour = () => {
    setDemoTourActive(true);
    setDemoStep(0);
  };

  const nextDemoStep = () => {
    setDemoStep((prev) => prev + 1);
  };

  const prevDemoStep = () => {
    setDemoStep((prev) => Math.max(0, prev - 1));
  };

  const endDemoTour = () => {
    setDemoTourActive(false);
    setDemoStep(0);
  };

  return (
    <TrafficContext.Provider
      value={{
        selectedZone,
        setSelectedZone,
        signals,
        incidents,
        roads,
        stats,
        alerts,
        appliedRecommendations,
        toasts,
        showToast,
        removeToast,
        applySignalAITiming,
        applyPredictionRecommendation,
        dispatchIncidentResponse,
        divertIncidentTraffic,
        resolveIncident,
        demoTourActive,
        demoStep,
        startDemoTour,
        nextDemoStep,
        prevDemoStep,
        endDemoTour,
      }}
    >
      {children}
    </TrafficContext.Provider>
  );
};

export const useTraffic = () => {
  const context = useContext(TrafficContext);
  if (!context) {
    throw new Error('useTraffic must be used within a TrafficProvider');
  }
  return context;
};
