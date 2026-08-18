// Mock Analytics, Historical Trends, and AI Performance Comparison Data
export const densityHistory24h = [
  { time: "00:00", density: 14, predicted: 12, baseline: 15, avgSpeed: 56 },
  { time: "02:00", density: 8, predicted: 9, baseline: 10, avgSpeed: 60 },
  { time: "04:00", density: 12, predicted: 11, baseline: 14, avgSpeed: 58 },
  { time: "06:00", density: 28, predicted: 30, baseline: 32, avgSpeed: 48 },
  { time: "08:00", density: 74, predicted: 76, baseline: 88, avgSpeed: 24 },
  { time: "10:00", density: 86, predicted: 84, baseline: 95, avgSpeed: 21 },
  { time: "12:00", density: 58, predicted: 60, baseline: 68, avgSpeed: 36 },
  { time: "14:00", density: 52, predicted: 50, baseline: 62, avgSpeed: 40 },
  { time: "16:00", density: 68, predicted: 70, baseline: 78, avgSpeed: 30 },
  { time: "18:00", density: 92, predicted: 89, baseline: 98, avgSpeed: 18 },
  { time: "20:00", density: 78, predicted: 75, baseline: 86, avgSpeed: 26 },
  { time: "22:00", density: 38, predicted: 36, baseline: 45, avgSpeed: 44 }
];

export const peakHoursDistribution = [
  { hour: "8 AM", volume: 7200, congestion: 74, level: "High" },
  { hour: "10 AM", volume: 8800, congestion: 86, level: "Critical" },
  { hour: "12 PM", volume: 4600, congestion: 58, level: "Medium" },
  { hour: "2 PM", volume: 4100, congestion: 52, level: "Medium" },
  { hour: "4 PM", volume: 6900, congestion: 68, level: "High" },
  { hour: "6 PM", volume: 9800, congestion: 92, level: "Critical" },
  { hour: "8 PM", volume: 7400, congestion: 78, level: "High" },
  { hour: "10 PM", volume: 3200, congestion: 38, level: "Low" }
];

export const aiPerformanceMetrics = {
  predictionAccuracy: 91.4, // %
  averageDelayReduction: 18.7, // %
  averageResponseTime: 4.2, // seconds
  routeOptimizationGain: 14.3, // %
  totalCo2SavedTonnes: 142.8,
  emergencyCorridorSuccess: "99.2%",
  activeModelsRunning: 6
};

export const beforeVsAfterMetrics = [
  {
    metric: "Average Corridor Delay",
    beforeAI: "24.2 min",
    withAI: "18.4 min",
    improvement: "↓ 24.0%",
    status: "positive",
    icon: "Clock"
  },
  {
    metric: "Peak Hour Congestion Index",
    beforeAI: "78.4%",
    withAI: "61.2%",
    improvement: "↓ 17.2%",
    status: "positive",
    icon: "Activity"
  },
  {
    metric: "Average Arterial Speed",
    beforeAI: "27.1 km/h",
    withAI: "34.6 km/h",
    improvement: "↑ 27.6%",
    status: "positive",
    icon: "Zap"
  },
  {
    metric: "Incident Emergency Response Time",
    beforeAI: "12.0 min",
    withAI: "6.4 min",
    improvement: "↓ 46.7%",
    status: "positive",
    icon: "ShieldAlert"
  },
  {
    metric: "Fuel Idling Losses",
    beforeAI: "1,840 L/day",
    withAI: "1,290 L/day",
    improvement: "↓ 29.8%",
    status: "positive",
    icon: "Fuel"
  },
  {
    metric: "Signal Queue Spillover Incidents",
    beforeAI: "42 / week",
    withAI: "8 / week",
    improvement: "↓ 80.9%",
    status: "positive",
    icon: "TrafficCone"
  }
];

export const alertsHistory = [
  {
    id: "ALT-01",
    type: "CRITICAL",
    category: "Traffic",
    title: "Heavy congestion predicted on Wardha Road",
    description: "Inflow exceeding 4,800 veh/hr at Airport Chowk. Predicted bottleneck duration: 60 mins.",
    timeAgo: "2 minutes ago",
    timestamp: "18:42",
    isRead: false,
    actionLink: "/prediction"
  },
  {
    id: "ALT-02",
    type: "WARNING",
    category: "Incidents",
    title: "Accident reported near Airport Junction (NH-44)",
    description: "2-car collision blocking lane 1 & 2 northbound. Emergency team dispatched.",
    timeAgo: "8 minutes ago",
    timestamp: "18:36",
    isRead: false,
    actionLink: "/incidents"
  },
  {
    id: "ALT-03",
    type: "SYSTEM",
    category: "Signals",
    title: "Signal timing optimization automatically applied",
    description: "S001 Wardha Rd green phase extended by +10s to accommodate SEZ commuter surge.",
    timeAgo: "15 minutes ago",
    timestamp: "18:29",
    isRead: true,
    actionLink: "/signals"
  },
  {
    id: "ALT-04",
    type: "CRITICAL",
    category: "Incidents",
    title: "Emergency Ambulance Green Corridor Activated",
    description: "Ambulance-12 priority route locked from Amravati Road to GMC Hospital.",
    timeAgo: "18 minutes ago",
    timestamp: "18:26",
    isRead: true,
    actionLink: "/incidents"
  },
  {
    id: "ALT-05",
    type: "INFO",
    category: "System",
    title: "AI Prediction Model v4.2 Weights Synced",
    description: "Updated weather and historical weekend peak flow weights loaded successfully.",
    timeAgo: "42 minutes ago",
    timestamp: "18:02",
    isRead: true,
    actionLink: "/analytics"
  }
];
