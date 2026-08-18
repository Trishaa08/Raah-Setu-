// Mock signals for Nagpur traffic junctions with phase state & timing parameters
export const initialSignals = [
  {
    id: "S001",
    name: "Wardha Rd — Airport Junction T-Point",
    location: "Wardha Road",
    coordinates: [21.0980, 79.0740],
    currentPhase: "GREEN", // GREEN, YELLOW, RED
    secondsRemaining: 18,
    greenTime: 42,
    cycleTime: 90,
    trafficDensity: "High",
    status: "Optimized", // Optimized, Normal, Critical, Manual
    timings: {
      northSouth: 45,
      eastWest: 30,
      pedestrian: 15
    },
    aiRecommendedTimings: {
      northSouth: 55,
      eastWest: 25,
      pedestrian: 10
    },
    aiRecommendationReason: "Heavy evening commuter surge from MIHAN / SEZ corridor toward Central Nagpur. Increase North-South green window by +10s to purge queue.",
    expectedImprovement: "↓ 16% waiting time (saves ~3.2 mins per vehicle)",
    isAITimingApplied: false,
    history: [
      { time: "18:00", queueLength: 38, avgDelay: 54 },
      { time: "18:15", queueLength: 46, avgDelay: 68 },
      { time: "18:30", queueLength: 52, avgDelay: 82 },
      { time: "18:45", queueLength: 48, avgDelay: 74 }
    ]
  },
  {
    id: "S002",
    name: "Sitabuldi Metro Interchange Junction",
    location: "Sitabuldi Central",
    coordinates: [21.1450, 79.0880],
    currentPhase: "RED",
    secondsRemaining: 31,
    greenTime: 35,
    cycleTime: 85,
    trafficDensity: "Medium",
    status: "Normal",
    timings: {
      northSouth: 35,
      eastWest: 35,
      pedestrian: 15
    },
    aiRecommendedTimings: {
      northSouth: 40,
      eastWest: 30,
      pedestrian: 15
    },
    aiRecommendationReason: "Minor eastbound buildup. Standard balanced split optimal.",
    expectedImprovement: "↓ 8% queue length",
    isAITimingApplied: false,
    history: [
      { time: "18:00", queueLength: 22, avgDelay: 32 },
      { time: "18:15", queueLength: 28, avgDelay: 38 },
      { time: "18:30", queueLength: 31, avgDelay: 42 },
      { time: "18:45", queueLength: 29, avgDelay: 39 }
    ]
  },
  {
    id: "S003",
    name: "Airport Road VIP Gate Chowk",
    location: "Airport Road",
    coordinates: [21.0780, 79.0620],
    currentPhase: "GREEN",
    secondsRemaining: 55,
    greenTime: 55,
    cycleTime: 90,
    trafficDensity: "Low",
    status: "Optimized",
    timings: {
      northSouth: 55,
      eastWest: 25,
      pedestrian: 10
    },
    aiRecommendedTimings: {
      northSouth: 55,
      eastWest: 25,
      pedestrian: 10
    },
    aiRecommendationReason: "Optimal green corridor established for airport departures.",
    expectedImprovement: "Holding optimal 98% throughput",
    isAITimingApplied: true,
    history: [
      { time: "18:00", queueLength: 10, avgDelay: 15 },
      { time: "18:15", queueLength: 12, avgDelay: 18 },
      { time: "18:30", queueLength: 11, avgDelay: 16 },
      { time: "18:45", queueLength: 9, avgDelay: 14 }
    ]
  },
  {
    id: "S004",
    name: "Central Avenue — Agrasen Square",
    location: "Central Avenue",
    coordinates: [21.1510, 79.1080],
    currentPhase: "YELLOW",
    secondsRemaining: 4,
    greenTime: 38,
    cycleTime: 80,
    trafficDensity: "High",
    status: "Critical",
    timings: {
      northSouth: 38,
      eastWest: 30,
      pedestrian: 12
    },
    aiRecommendedTimings: {
      northSouth: 48,
      eastWest: 22,
      pedestrian: 10
    },
    aiRecommendationReason: "Commercial market peak causing westbound spillover into square.",
    expectedImprovement: "↓ 21% congestion relief",
    isAITimingApplied: false,
    history: [
      { time: "18:00", queueLength: 42, avgDelay: 60 },
      { time: "18:15", queueLength: 55, avgDelay: 78 },
      { time: "18:30", queueLength: 64, avgDelay: 92 },
      { time: "18:45", queueLength: 61, avgDelay: 88 }
    ]
  },
  {
    id: "S005",
    name: "Ring Road — Narendra Nagar Flyover Chowk",
    location: "Outer Ring Road",
    coordinates: [21.1150, 79.0795],
    currentPhase: "GREEN",
    secondsRemaining: 24,
    greenTime: 40,
    cycleTime: 75,
    trafficDensity: "Low",
    status: "Optimized",
    timings: {
      northSouth: 40,
      eastWest: 25,
      pedestrian: 10
    },
    aiRecommendedTimings: {
      northSouth: 40,
      eastWest: 25,
      pedestrian: 10
    },
    aiRecommendationReason: "Bypass traffic moving freely under flyover synchronized green wave.",
    expectedImprovement: "Stable green wave flow",
    isAITimingApplied: true,
    history: [
      { time: "18:00", queueLength: 14, avgDelay: 20 },
      { time: "18:15", queueLength: 15, avgDelay: 22 },
      { time: "18:30", queueLength: 18, avgDelay: 24 },
      { time: "18:45", queueLength: 16, avgDelay: 21 }
    ]
  },
  {
    id: "S006",
    name: "Amravati Road — Law College Square",
    location: "Amravati Road",
    coordinates: [21.1500, 79.0500],
    currentPhase: "RED",
    secondsRemaining: 22,
    greenTime: 36,
    cycleTime: 70,
    trafficDensity: "Medium",
    status: "Normal",
    timings: {
      northSouth: 36,
      eastWest: 24,
      pedestrian: 10
    },
    aiRecommendedTimings: {
      northSouth: 42,
      eastWest: 20,
      pedestrian: 8
    },
    aiRecommendationReason: "University campus evening exit wave detected.",
    expectedImprovement: "↓ 12% junction wait time",
    isAITimingApplied: false,
    history: [
      { time: "18:00", queueLength: 20, avgDelay: 28 },
      { time: "18:15", queueLength: 26, avgDelay: 35 },
      { time: "18:30", queueLength: 32, avgDelay: 44 },
      { time: "18:45", queueLength: 30, avgDelay: 40 }
    ]
  }
];
