// Mock active and historical incidents for Nagpur city traffic command
export const initialIncidents = [
  {
    id: "INC-101",
    type: "ACCIDENT", // ACCIDENT, ROAD_BLOCK, EMERGENCY, BREAKDOWN, VIP_CONVOY
    title: "Multi-Vehicle Collision",
    location: "Wardha Road Near Airport Junction",
    severity: "CRITICAL", // CRITICAL, HIGH, MEDIUM, LOW
    status: "ACTIVE", // ACTIVE, DISPATCHED, DIVERTING, RESOLVED
    reportedTime: "18:32",
    elapsedMinutes: 12,
    vehiclesAffected: 320,
    coordinates: [21.0980, 79.0740],
    description: "2-car collision blocking lane 1 & 2 northbound. Oil spill reported. Emergency ambulance en route.",
    recommendations: [
      { id: 1, step: "Divert northbound traffic through Outer Ring Road Sector 5.", action: "Divert Traffic", status: "PENDING" },
      { id: 2, step: "Establish Priority Green Emergency Corridor for dispatched ambulance from AIIMS.", action: "Clear Corridor", status: "PENDING" },
      { id: 3, step: "Notify downstream signals S001 and S003 to increase discharge cycle.", action: "Sync Signals", status: "PENDING" },
      { id: 4, step: "Alert Nagpur Traffic Police PCR Unit 04 & Fire Rescue.", action: "Alert Police", status: "PENDING" }
    ],
    unitsDispatched: ["Ambulance-09", "Traffic PCR-04", "Towing-02"],
    estimatedClearanceTime: "25 min",
    delayImpact: "+18 mins on NH-44"
  },
  {
    id: "INC-102",
    type: "ROAD_BLOCK",
    title: "Metro Girders Crane Maintenance",
    location: "Kamptee Road — Kadbi Chowk",
    severity: "MEDIUM",
    status: "ACTIVE",
    reportedTime: "17:45",
    elapsedMinutes: 59,
    vehiclesAffected: 180,
    coordinates: [21.1700, 79.1150],
    description: "Scheduled metro rail maintenance. Single lane operating alternately.",
    recommendations: [
      { id: 1, step: "Activate automated contra-flow signal timing on S006.", action: "Adjust Signal", status: "PENDING" },
      { id: 2, step: "Broadcast detour via Automotive Square to navigation apps.", action: "Broadcast Detour", status: "PENDING" }
    ],
    unitsDispatched: ["Traffic Warden Team-02"],
    estimatedClearanceTime: "35 min",
    delayImpact: "+6 mins"
  },
  {
    id: "INC-103",
    type: "EMERGENCY",
    title: "Critical Patient Hospital Transit",
    location: "Amravati Road to Government Medical College (GMC)",
    severity: "CRITICAL",
    status: "DISPATCHED",
    reportedTime: "18:40",
    elapsedMinutes: 4,
    vehiclesAffected: 95,
    coordinates: [21.1450, 79.0500],
    description: "Cardiac ICU Ambulance en route. Green wave priority requested across 4 intersections.",
    recommendations: [
      { id: 1, step: "Lock Green Signal Wave across Law College Sq -> Sitabuldi -> GMC.", action: "Lock Green Wave", status: "DONE" },
      { id: 2, step: "Preempt cross-traffic pedestrian signals.", action: "Preempt Signals", status: "DONE" }
    ],
    unitsDispatched: ["ICU-Adv-Ambulance-12"],
    estimatedClearanceTime: "8 min",
    delayImpact: "Zero (Corridor Active)"
  },
  {
    id: "INC-104",
    type: "BREAKDOWN",
    title: "Heavy Cargo Truck Axle Breakdown",
    location: "Ring Road Sector 4 Overpass",
    severity: "LOW",
    status: "ACTIVE",
    reportedTime: "18:15",
    elapsedMinutes: 29,
    vehiclesAffected: 85,
    coordinates: [21.1350, 79.0400],
    description: "Loaded cement truck stalled on shoulder. Slowdown in rightmost merge lane.",
    recommendations: [
      { id: 1, step: "Dispatch Heavy Crane Towing Unit 01.", action: "Dispatch Towing", status: "PENDING" }
    ],
    unitsDispatched: ["Heavy Recovery Tow-01"],
    estimatedClearanceTime: "15 min",
    delayImpact: "+3 mins"
  },
  {
    id: "INC-105",
    type: "ACCIDENT",
    title: "Motorcycle Skid at Rain Slippery Patch",
    location: "Central Avenue — Dosar Bhavan Square",
    severity: "MEDIUM",
    status: "ACTIVE",
    reportedTime: "18:28",
    elapsedMinutes: 16,
    vehiclesAffected: 140,
    coordinates: [21.1540, 79.1250],
    description: "Minor skid due to light drizzle and oil spill. First aid administered.",
    recommendations: [
      { id: 1, step: "Municipal sand spraying team alerted.", action: "Clean Surface", status: "PENDING" }
    ],
    unitsDispatched: ["Beat Patrol-08"],
    estimatedClearanceTime: "10 min",
    delayImpact: "+4 mins"
  }
];

export const incidentStats = {
  activeIncidents: 7,
  criticalIncidents: 2,
  resolvedToday: 18,
  averageResponseMinutes: 6.4,
  responseImprovement: "↓ 46.7% vs traditional response"
};
