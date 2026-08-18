// Mock road network and real-time traffic data for Nagpur Smart City
export const roadsData = [
  {
    id: "RD-01",
    name: "NH-44 — Wardha Road",
    zone: "South Corridor",
    lengthKm: 14.2,
    trafficLevel: "HIGH", // LOW, MEDIUM, HIGH, CRITICAL
    color: "#EF4444",
    vehiclesPerHour: 4820,
    averageSpeed: 21, // km/h
    freeFlowSpeed: 55,
    occupancyPercent: 88,
    predictedCongestion: "HIGH",
    expectedPeak: "19:00 – 20:00",
    recommendation: "Divert traffic through Ring Road Phase 2 & increase green signal by 18s at Airport T-Junction",
    coordinates: [
      [21.0825, 79.0685],
      [21.0980, 79.0740],
      [21.1150, 79.0795],
      [21.1320, 79.0835],
      [21.1450, 79.0880]
    ]
  },
  {
    id: "RD-02",
    name: "Outer Ring Road (Sector 4-6)",
    zone: "Ring Corridor",
    lengthKm: 22.8,
    trafficLevel: "LOW",
    color: "#22C55E",
    vehiclesPerHour: 2180,
    averageSpeed: 58,
    freeFlowSpeed: 60,
    occupancyPercent: 32,
    predictedCongestion: "LOW",
    expectedPeak: "Stable",
    recommendation: "Optimal detour corridor. 6-lane bypass operating smoothly.",
    coordinates: [
      [21.0750, 79.0200],
      [21.0950, 79.0350],
      [21.1350, 79.0400],
      [21.1700, 79.0600],
      [21.1850, 79.1100]
    ]
  },
  {
    id: "RD-03",
    name: "Sitabuldi Interchange / Central Ave",
    zone: "Central CBD",
    lengthKm: 8.5,
    trafficLevel: "MEDIUM",
    color: "#F59E0B",
    vehiclesPerHour: 3410,
    averageSpeed: 31,
    freeFlowSpeed: 45,
    occupancyPercent: 64,
    predictedCongestion: "MEDIUM",
    expectedPeak: "18:30 – 19:30",
    recommendation: "Pedestrian priority active. Coordinate signals S002 & S004 for synchronized wave.",
    coordinates: [
      [21.1450, 79.0880],
      [21.1480, 79.0950],
      [21.1510, 79.1080],
      [21.1540, 79.1250]
    ]
  },
  {
    id: "RD-04",
    name: "Airport Road Junction Corridor",
    zone: "South Corridor",
    lengthKm: 6.2,
    trafficLevel: "CRITICAL",
    color: "#DC2626",
    vehiclesPerHour: 5120,
    averageSpeed: 14,
    freeFlowSpeed: 50,
    occupancyPercent: 94,
    predictedCongestion: "CRITICAL",
    expectedPeak: "Current (Accident Bottleneck)",
    recommendation: "Accident reported near Junction. Emergency corridor active. Divert via Hingna link.",
    coordinates: [
      [21.0650, 79.0550],
      [21.0780, 79.0620],
      [21.0980, 79.0740]
    ]
  },
  {
    id: "RD-05",
    name: "Amravati Road Highway",
    zone: "West Corridor",
    lengthKm: 16.5,
    trafficLevel: "LOW",
    color: "#22C55E",
    vehiclesPerHour: 1890,
    averageSpeed: 52,
    freeFlowSpeed: 60,
    occupancyPercent: 36,
    predictedCongestion: "LOW",
    expectedPeak: "20:00 – 21:00",
    recommendation: "Smooth expressway flow. Automated variable message signs active.",
    coordinates: [
      [21.1450, 79.0880],
      [21.1500, 79.0500],
      [21.1550, 79.0100],
      [21.1600, 78.9600]
    ]
  },
  {
    id: "RD-06",
    name: "Kamptee Road Corridor",
    zone: "North Corridor",
    lengthKm: 11.0,
    trafficLevel: "MEDIUM",
    color: "#F59E0B",
    vehiclesPerHour: 2950,
    averageSpeed: 33,
    freeFlowSpeed: 50,
    occupancyPercent: 58,
    predictedCongestion: "MEDIUM",
    expectedPeak: "19:15 – 20:15",
    recommendation: "Metro construction constriction at Kadbi Chowk. Lane 2 narrowed.",
    coordinates: [
      [21.1510, 79.1080],
      [21.1700, 79.1150],
      [21.1950, 79.1300],
      [21.2200, 79.1500]
    ]
  },
  {
    id: "RD-07",
    name: "Hingna Industrial Link",
    zone: "West-South Link",
    lengthKm: 9.8,
    trafficLevel: "LOW",
    color: "#22C55E",
    vehiclesPerHour: 1640,
    averageSpeed: 46,
    freeFlowSpeed: 50,
    occupancyPercent: 38,
    predictedCongestion: "LOW",
    expectedPeak: "17:30 – 18:30",
    recommendation: "Clear alternative for Airport traffic bypass.",
    coordinates: [
      [21.0950, 79.0350],
      [21.1100, 79.0150],
      [21.1300, 79.0050]
    ]
  }
];

export const summaryStats = {
  totalMonitoredVehicles: 128430,
  vehicleTrend: "+8.4%",
  activeSignals: 142,
  optimizedSignals: 138,
  manualSignals: 4,
  criticalSignals: 2,
  activeIncidents: 7,
  incidentTrend: "-12%",
  averageCitySpeed: 34.6, // km/h
  speedTrend: "+5.2%",
  averageTravelTime: 18.4, // min
  travelTimeTrend: "-7.8%",
  trafficDistribution: {
    low: 42,
    medium: 31,
    high: 27
  },
  corridorSummary: {
    high: 18,
    medium: 31,
    low: 42
  }
};
