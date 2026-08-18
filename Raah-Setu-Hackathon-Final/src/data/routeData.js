// Mock route optimization alternatives for Nagpur origin-destination pairs
export const routePresets = [
  {
    id: "route-airport-to-railway",
    origin: "Dr. Babasaheb Ambedkar International Airport",
    destination: "Nagpur Central Railway Station",
    originCoords: [21.0922, 79.0664],
    destinationCoords: [21.1528, 79.0886],
    routes: [
      {
        id: "R1",
        name: "Route 1 — AI Dynamic Recommended",
        tag: "⭐ AI Recommended",
        isRecommended: true,
        distanceKm: 11.4,
        estimatedMinutes: 24,
        timeSavedMinutes: 8,
        trafficLevel: "Medium",
        congestionIndex: "38%",
        color: "#22C55E", // Green
        via: "via Ring Road Sector 5 & Wardha Bypass",
        path: [
          [21.0922, 79.0664],
          [21.0950, 79.0350],
          [21.1200, 79.0450],
          [21.1400, 79.0700],
          [21.1480, 79.0820],
          [21.1528, 79.0886]
        ],
        reasons: [
          "Lower vehicle density along Ring Road Bypass",
          "Bypasses active accident bottleneck on NH-44 near Airport Junction",
          "Fewer signal stops (4 vs 9 intersections)",
          "Synchronized green wave timings active along Sectors 4-6"
        ],
        fuelSavedLiters: "0.45 L",
        co2ReductionKg: "1.08 kg"
      },
      {
        id: "R2",
        name: "Route 2 — Fastest Current (Direct NH-44)",
        tag: "Direct Highway",
        isRecommended: false,
        distanceKm: 10.2,
        estimatedMinutes: 28,
        timeSavedMinutes: 0,
        trafficLevel: "High",
        congestionIndex: "84%",
        color: "#F97316", // Orange
        via: "Direct NH-44 / Wardha Road Corridor",
        path: [
          [21.0922, 79.0664],
          [21.0980, 79.0740],
          [21.1150, 79.0795],
          [21.1320, 79.0835],
          [21.1450, 79.0880],
          [21.1528, 79.0886]
        ],
        reasons: [
          "Shortest geographical distance (10.2 km)",
          "Severe bottleneck between Chhatrapati Square and Ajni",
          "9 signal intersections with average 72s wait per cycle"
        ],
        fuelSavedLiters: "0.00 L",
        co2ReductionKg: "0.00 kg"
      },
      {
        id: "R3",
        name: "Route 3 — Scenic West Alternative",
        tag: "Low Traffic",
        isRecommended: false,
        distanceKm: 13.1,
        estimatedMinutes: 31,
        timeSavedMinutes: 0,
        trafficLevel: "Low",
        congestionIndex: "24%",
        color: "#3B82F6", // Blue
        via: "via Hingna Link & Ambazari Lake Boulevard",
        path: [
          [21.0922, 79.0664],
          [21.0800, 79.0400],
          [21.1000, 79.0200],
          [21.1300, 79.0400],
          [21.1450, 79.0650],
          [21.1528, 79.0886]
        ],
        reasons: [
          "Completely free flow with minimal traffic",
          "Longer total distance (+2.9 km)",
          "Scenic lake perimeter road with 50 km/h steady flow"
        ],
        fuelSavedLiters: "-0.15 L",
        co2ReductionKg: "-0.32 kg"
      }
    ]
  },
  {
    id: "route-mihan-to-sitabuldi",
    origin: "MIHAN InfoTech Park SEZ",
    destination: "Sitabuldi Central Commercial Hub",
    originCoords: [21.0350, 79.0300],
    destinationCoords: [21.1450, 79.0880],
    routes: [
      {
        id: "R1-MIHAN",
        name: "Route 1 — AI Adaptive Route",
        tag: "⭐ AI Recommended",
        isRecommended: true,
        distanceKm: 14.8,
        estimatedMinutes: 26,
        timeSavedMinutes: 11,
        trafficLevel: "Low",
        congestionIndex: "30%",
        color: "#22C55E",
        via: "via Samruddhi Express Feeder & Outer Ring Rd",
        path: [
          [21.0350, 79.0300],
          [21.0600, 79.0250],
          [21.0950, 79.0350],
          [21.1350, 79.0400],
          [21.1450, 79.0880]
        ],
        reasons: [
          "Bypasses entire Wardha Road evening commute peak",
          "Maintains high speed (65 km/h avg) on 6-lane bypass",
          "Predicted congestion avoided at Chhatrapati Sq"
        ],
        fuelSavedLiters: "0.62 L",
        co2ReductionKg: "1.45 kg"
      }
    ]
  }
];
