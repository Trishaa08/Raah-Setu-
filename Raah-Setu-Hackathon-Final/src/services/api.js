// API abstraction layer (connects to mock data now, ready for FastAPI endpoints)
import { roadsData, summaryStats } from '../data/trafficData';
import { initialSignals } from '../data/signalData';
import { initialIncidents, incidentStats } from '../data/incidentData';
import { routePresets } from '../data/routeData';
import { liveCameras } from '../data/cameraData';
import { densityHistory24h, peakHoursDistribution, aiPerformanceMetrics, beforeVsAfterMetrics, alertsHistory } from '../data/analyticsData';

// Simulated API delay helper
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const delay = (ms = 150) => new Promise(resolve => setTimeout(resolve, ms));
const postJSON = async (path, body) => {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!response.ok) throw new Error(`API ${response.status}`);
  return response.json();
};

export const trafficApi = {
  // GET /api/traffic/summary
  getSummary: async () => {
    await delay();
    return { ...summaryStats };
  },

  // GET /api/traffic/roads
  getRoads: async () => {
    try { const data = await fetch(`${API_BASE}/traffic/roads`).then(r => r.json()); return data.roads || []; }
    catch { await delay(); return [...roadsData]; }
  },

  // GET /api/signals
  getSignals: async () => {
    await delay();
    return [...initialSignals];
  },

  // POST /api/signals/:id/optimize
  applySignalOptimization: async (signalId) => {
    await delay(300);
    return {
      success: true,
      signalId,
      message: `AI timing successfully synchronized for signal ${signalId}. Phase cycle updated.`,
      timestamp: new Date().toISOString()
    };
  },

  // GET /api/incidents
  getIncidents: async () => {
    await delay();
    return {
      incidents: [...initialIncidents],
      stats: { ...incidentStats }
    };
  },

  // POST /api/incidents/:id/action
  handleIncidentAction: async (incidentId, actionType) => {
    await delay(250);
    return {
      success: true,
      incidentId,
      action: actionType,
      message: `Action '${actionType}' executed for Incident ${incidentId}.`,
      timestamp: new Date().toISOString()
    };
  },

  // POST /api/traffic/predict
  generatePrediction: async ({ location, horizonMinutes, weather, event, hour = 19, dow = 1, inflow }) => {
    try {
      return await postJSON('/traffic/predict', { location, horizonMinutes, weather, event, hour, dow, inflow });
    } catch (error) {
      console.warn('Python backend unavailable; using local demo fallback.', error);
      await delay(250);
      return {
        location, horizonMinutes: horizonMinutes || 30, predictedLevel: 'HIGH',
        confidence: 82, currentDensity: 64, predictedDensity: 78,
        factors: ['Python API unavailable — demo fallback active', 'Evening peak pattern', 'Capacity utilization'],
        recommendation: { actionText: `Divert approximately 12% flow from ${location} toward the Ring Road and extend green time.`, expectedDelayReduction: '12–18%', estimatedMinutesSaved: 7 },
        forecastTimeline: [0,15,30,45,60].map((m,i)=>({horizon:m?'+'+m+' min':'Now',vehiclesPerHour:3200+i*180,congestion:64+i*4}))
      };
    }
  },

  runSimulation: async (payload) => {
    return postJSON('/simulation/run', payload);
  },

  getOptimalRoute: async (origin, destination, hour = 19) => {
    return postJSON('/routes/optimal', { origin, destination, hour });
  },

  // POST /api/routes/optimize
  getOptimizedRoutes: async (origin, destination) => {
    await delay(300);
    const match = routePresets.find(r => r.origin.includes(origin) || r.id.includes('airport')) || routePresets[0];
    return match;
  },

  // GET /api/cameras
  getCameras: async () => {
    await delay();
    return [...liveCameras];
  },

  // GET /api/analytics
  getAnalyticsData: async () => {
    await delay();
    return {
      densityHistory: [...densityHistory24h],
      peakHours: [...peakHoursDistribution],
      aiPerformance: { ...aiPerformanceMetrics },
      beforeVsAfter: [...beforeVsAfterMetrics],
      alerts: [...alertsHistory]
    };
  }
};
