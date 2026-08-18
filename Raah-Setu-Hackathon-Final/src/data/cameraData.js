// Mock CCTV traffic monitoring cameras for Nagpur city
export const liveCameras = [
  {
    id: "CAM-01",
    name: "CAM 01 — Wardha Road (Airport Flyover Inflow)",
    zone: "South Corridor",
    coordinates: [21.0980, 79.0740],
    status: "LIVE",
    streamQuality: "1080p 60fps",
    vehiclesPerMin: 84,
    hourlyVehicleRate: 4820,
    density: "High",
    averageSpeed: "19 km/h",
    congestionPercentage: 88,
    laneCount: 3,
    detectionClasses: {
      cars: 58,
      twoWheelers: 28,
      buses: 6,
      trucks: 8
    },
    cameraType: "PTZ AI Optical Sensor",
    thumbnail: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "CAM-02",
    name: "CAM 02 — Sitabuldi Metro Interchange",
    zone: "Central CBD",
    coordinates: [21.1450, 79.0880],
    status: "LIVE",
    streamQuality: "1080p 60fps",
    vehiclesPerMin: 42,
    hourlyVehicleRate: 2420,
    density: "Low",
    averageSpeed: "42 km/h",
    congestionPercentage: 35,
    laneCount: 4,
    detectionClasses: {
      cars: 45,
      twoWheelers: 45,
      buses: 8,
      trucks: 2
    },
    cameraType: "ANPR Dual-Spectrum",
    thumbnail: "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "CAM-03",
    name: "CAM 03 — Airport VIP Junction North",
    zone: "South Corridor",
    coordinates: [21.0780, 79.0620],
    status: "LIVE",
    streamQuality: "1080p 60fps",
    vehiclesPerMin: 61,
    hourlyVehicleRate: 3660,
    density: "Medium",
    averageSpeed: "28 km/h",
    congestionPercentage: 62,
    laneCount: 3,
    detectionClasses: {
      cars: 60,
      twoWheelers: 22,
      buses: 10,
      trucks: 8
    },
    cameraType: "AI Flow Sensor",
    thumbnail: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "CAM-04",
    name: "CAM 04 — Outer Ring Road Sector 5 Bypass",
    zone: "Ring Corridor",
    coordinates: [21.0950, 79.0350],
    status: "LIVE",
    streamQuality: "1080p 60fps",
    vehiclesPerMin: 31,
    hourlyVehicleRate: 1860,
    density: "Low",
    averageSpeed: "58 km/h",
    congestionPercentage: 25,
    laneCount: 6,
    detectionClasses: {
      cars: 50,
      twoWheelers: 15,
      buses: 5,
      trucks: 30
    },
    cameraType: "High-Speed Highway Tracker",
    thumbnail: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "CAM-05",
    name: "CAM 05 — Central Avenue Dosar Bhavan Chowk",
    zone: "Central CBD",
    coordinates: [21.1510, 79.1080],
    status: "LIVE",
    streamQuality: "1080p 60fps",
    vehiclesPerMin: 72,
    hourlyVehicleRate: 4120,
    density: "High",
    averageSpeed: "22 km/h",
    congestionPercentage: 82,
    laneCount: 3,
    detectionClasses: {
      cars: 40,
      twoWheelers: 45,
      buses: 10,
      trucks: 5
    },
    cameraType: "360 Panoramic Sensor",
    thumbnail: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "CAM-06",
    name: "CAM 06 — Amravati Road University Gate",
    zone: "West Corridor",
    coordinates: [21.1500, 79.0500],
    status: "LIVE",
    streamQuality: "1080p 60fps",
    vehiclesPerMin: 48,
    hourlyVehicleRate: 2880,
    density: "Medium",
    averageSpeed: "38 km/h",
    congestionPercentage: 48,
    laneCount: 4,
    detectionClasses: {
      cars: 55,
      twoWheelers: 35,
      buses: 8,
      trucks: 2
    },
    cameraType: "Optical Flow Counter",
    thumbnail: "https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=600&q=80"
  }
];
