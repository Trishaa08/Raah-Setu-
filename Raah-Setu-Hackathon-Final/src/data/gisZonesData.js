// GIS Polygon Coordinates & Boundary Definitions for Nagpur Planning-Authority Jurisdictions
export const nagpurGisZones = [
  {
    id: "NMC Central",
    name: "NMC Central Zone (CBD)",
    jurisdiction: "Nagpur Municipal Corporation",
    code: "NMC-C",
    color: "#EC4899", // Pink
    fillColor: "#EC4899",
    bounds: [[21.138, 79.075], [21.162, 79.115]],
    center: [21.148, 79.092],
    polygon: [
      [21.155, 79.075],
      [21.162, 79.095],
      [21.158, 79.115],
      [21.142, 79.112],
      [21.138, 79.088],
      [21.144, 79.075]
    ],
    areaSqKm: 18.4,
    keyCorridors: ["Sitabuldi Commercial Link", "Central Avenue Corridor"],
    description: "High-density retail, government headquarters, and central railway transit hub."
  },
  {
    id: "NMC South",
    name: "NMC South Zone (Airport & MIHAN)",
    jurisdiction: "Nagpur Municipal Corporation",
    code: "NMC-S",
    color: "#06B6D4", // Cyan
    fillColor: "#06B6D4",
    bounds: [[21.055, 79.05], [21.135, 79.095]],
    center: [21.095, 79.072],
    polygon: [
      [21.135, 79.075],
      [21.132, 79.095],
      [21.098, 79.088],
      [21.055, 79.075],
      [21.065, 79.050],
      [21.115, 79.062]
    ],
    areaSqKm: 34.2,
    keyCorridors: ["Wardha Road (NH-44)", "Airport Express Arterial"],
    description: "International Airport arterial route, Metro Line 1, and SEZ transit entry point."
  },
  {
    id: "NMC North",
    name: "NMC North Zone (Kamptee & Koradi)",
    jurisdiction: "Nagpur Municipal Corporation",
    code: "NMC-N",
    color: "#3B82F6", // Blue
    fillColor: "#3B82F6",
    bounds: [[21.155, 79.085], [21.23, 79.16]],
    center: [21.19, 79.12],
    polygon: [
      [21.158, 79.095],
      [21.195, 79.085],
      [21.230, 79.130],
      [21.220, 79.160],
      [21.170, 79.140],
      [21.158, 79.115]
    ],
    areaSqKm: 29.8,
    keyCorridors: ["Kamptee Road Corridor", "Koradi Express Link"],
    description: "Heavy commercial freight movement, thermal power entry, and northern bypass."
  },
  {
    id: "NMC West",
    name: "NMC West Zone (Dharampeth & Amravati)",
    jurisdiction: "Nagpur Municipal Corporation",
    code: "NMC-W",
    color: "#10B981", // Emerald
    fillColor: "#10B981",
    bounds: [[21.135, 78.96], [21.17, 79.08]],
    center: [21.152, 79.03],
    polygon: [
      [21.170, 79.030],
      [21.160, 79.078],
      [21.144, 79.075],
      [21.135, 79.035],
      [21.150, 78.960],
      [21.165, 78.970]
    ],
    areaSqKm: 26.5,
    keyCorridors: ["Amravati Road Corridor"],
    description: "Educational institutions (VNIT/University), residential hubs, and western logistics."
  },
  {
    id: "NMC South-East",
    name: "NMC South-East Zone (Manewada & Besa)",
    jurisdiction: "Nagpur Municipal Corporation",
    code: "NMC-SE",
    color: "#F59E0B", // Amber
    fillColor: "#F59E0B",
    bounds: [[21.06, 79.08], [21.135, 79.135]],
    center: [21.095, 79.105],
    polygon: [
      [21.135, 79.092],
      [21.135, 79.135],
      [21.085, 79.130],
      [21.060, 79.105],
      [21.085, 79.085],
      [21.105, 79.090]
    ],
    areaSqKm: 22.7,
    keyCorridors: ["Manewada Ring Link", "Besa Connector"],
    description: "Rapidly expanding residential suburbs and outer belt arterial access."
  },
  {
    id: "NMRDA Ring",
    name: "NMRDA Outer Ring Road Sector",
    jurisdiction: "Nagpur Metropolitan Region Development Authority",
    code: "NMRDA-R",
    color: "#8B5CF6", // Violet
    fillColor: "#8B5CF6",
    bounds: [[21.07, 79.01], [21.19, 79.16]],
    center: [21.13, 79.08],
    polygon: [
      [21.075, 79.020],
      [21.095, 79.035],
      [21.135, 79.040],
      [21.170, 79.060],
      [21.185, 79.110],
      [21.185, 79.150],
      [21.135, 79.155],
      [21.075, 79.110],
      [21.060, 79.050]
    ],
    areaSqKm: 68.0,
    keyCorridors: ["Outer Ring Road Bypass", "Ring Road East Express"],
    description: "Inter-state freight bypass corridor diverting heavy commercial traffic around city center."
  },
  {
    id: "NMRDA West-South",
    name: "NMRDA West-South (Hingna Industrial)",
    jurisdiction: "Nagpur Metropolitan Region Development Authority",
    code: "NMRDA-WS",
    color: "#F43F5E", // Rose
    fillColor: "#F43F5E",
    bounds: [[21.09, 78.99], [21.14, 79.04]],
    center: [21.11, 79.015],
    polygon: [
      [21.135, 79.035],
      [21.130, 79.005],
      [21.110, 78.990],
      [21.095, 79.035],
      [21.115, 79.038]
    ],
    areaSqKm: 19.3,
    keyCorridors: ["Hingna Industrial Link"],
    description: "MIDC Industrial estate, manufacturing freight traffic, and commuter transit."
  }
];

export const getGisZoneById = (id) => nagpurGisZones.find(z => z.id === id || z.id.includes(id));
