import React, { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Polyline, Polygon, Marker, Popup, CircleMarker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useTraffic } from '../../context/TrafficContext';
import { useSettings } from '../../context/SettingsContext';
import { nagpurGisZones, getGisZoneById } from '../../data/gisZonesData';
import { Activity, ArrowRight, Bot, Layers, Zap, Radio, AlertTriangle, ShieldCheck, Flame, Cpu, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Custom Map Markers
const createCustomIcon = (html, className = '', size = [34,34]) => L.divIcon({
  html: `<div class="${className}">${html}</div>`, 
  className: 'custom-map-icon', 
  size, 
  iconAnchor: [size[0]/2, size[1]/2], 
  popupAnchor: [0, -size[1]/2]
});

const endpointIcon = (label, color) => createCustomIcon(`
  <div style="width:34px;height:34px;border-radius:50%;background:${color};border:3px solid #fff;display:flex;align-items:center;justify-content:center;color:#06101c;font-size:11px;font-weight:900;box-shadow:0 0 22px ${color};">${label}</div>`
);

const signalIcon = (phase) => {
  const color = phase === 'GREEN' ? '#22C55E' : phase === 'YELLOW' ? '#F59E0B' : '#EF4444';
  return createCustomIcon(`
    <div style="background:#08111e;border:2px solid ${color};width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;box-shadow:0 0 16px ${color}88;">
      <div style="width:10px;height:10px;border-radius:50%;background:${color};box-shadow:0 0 10px ${color};"></div>
    </div>`
  );
};

const incidentIcon = (severity) => {
  const color = severity === 'CRITICAL' ? '#EF4444' : '#F59E0B';
  return createCustomIcon(`
    <div style="background:${color};width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2.5px solid #fff;box-shadow:0 0 18px ${color};color:#fff;font-size:16px;font-weight:900;" class="animate-bounce">
      !
    </div>`
  );
};

// Component to handle pan & flyTo for zone switching
const ZoneViewController = ({ selectedZone, roads }) => {
  const map = useMap();

  useEffect(() => {
    if (!selectedZone || selectedZone === 'ALL') {
      // Zoom to all Nagpur bounds
      const bounds = L.latLngBounds([[21.05, 78.96], [21.23, 79.16]]);
      map.flyToBounds(bounds, { padding: [40, 40], duration: 1.2 });
      return;
    }

    const gisZone = getGisZoneById(selectedZone);
    if (gisZone && gisZone.bounds) {
      map.flyToBounds(gisZone.bounds, { padding: [50, 50], duration: 1.2, maxZoom: 14 });
    } else if (roads && roads.length > 0) {
      const zoneRoads = roads.filter(r => r.zone === selectedZone || r.zone.includes(selectedZone));
      if (zoneRoads.length > 0) {
        const coords = zoneRoads.flatMap(r => r.coordinates);
        const bounds = L.latLngBounds(coords);
        map.flyToBounds(bounds, { padding: [60, 60], duration: 1.2, maxZoom: 14 });
      }
    }
  }, [selectedZone, roads, map]);

  return null;
};

// Controller to fit selected AI route
const RouteFitController = ({ path }) => {
  const map = useMap();
  useEffect(() => {
    if (path && path.length > 1) {
      map.flyToBounds(L.latLngBounds(path), { padding: [70, 70], maxZoom: 14, duration: 1 });
    }
  }, [path, map]);
  return null;
};

const TrafficMap = ({
  height = '520px',
  selectedRoute = null,
  customCenter = [21.1458, 79.0882],
  customZoom = 12,
  highlightRoadId = null,
  showRouteLegend = true,
  selectedZone: externalZone = null,
  onZoneSelect = null,
  selectedLevel: externalLevel = null,
  searchQuery: externalSearch = ''
}) => {
  const navigate = useNavigate();
  const { roads, signals, incidents, selectedZone: contextZone, setSelectedZone: setContextZone, applySignalAITiming } = useTraffic();
  const { mapLayers } = useSettings();
  
  // Layer Toggles State
  const [showZonePolygons, setShowZonePolygons] = useState(true);
  const [showLayerMenu, setShowLayerMenu] = useState(false);
  const [selectedRoad, setSelectedRoad] = useState(null);

  // Active Zone (Priority: external prop > context state)
  const activeZone = externalZone || contextZone || 'ALL';

  const handleZoneClick = (zoneId) => {
    if (onZoneSelect) onZoneSelect(zoneId);
    if (setContextZone) setContextZone(zoneId);
  };

  // Filter roads by zone, level, search
  const filteredRoads = useMemo(() => {
    return roads.filter(road => {
      const matchesZone = activeZone === 'ALL' || road.zone === activeZone || road.zone.includes(activeZone);
      const matchesLevel = !externalLevel || externalLevel === 'ALL' || road.trafficLevel === externalLevel;
      const matchesSearch = !externalSearch || 
        road.name.toLowerCase().includes(externalSearch.toLowerCase()) || 
        road.zone.toLowerCase().includes(externalSearch.toLowerCase());
      return matchesZone && matchesLevel && matchesSearch;
    });
  }, [roads, activeZone, externalLevel, externalSearch]);

  const activeRoute = selectedRoute?.path || null;

  const zoneList = ['ALL', ...nagpurGisZones.map(z => z.id)];

  return (
    <div className="relative rounded-3xl overflow-hidden border border-cyan-400/20 shadow-2xl bg-[#08111e] font-sans" style={{ height }}>
      
      {/* Top Left GIS Header & Zone Selector Pill Bar */}
      <div className="absolute top-3 left-3 right-3 z-[1000] flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
        <div className="flex flex-wrap items-center gap-2">
          {/* Live Badge */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#07101d]/90 backdrop-blur-md border border-cyan-400/30 shadow-lg text-xs font-bold text-white">
            <Activity className="w-4 h-4 text-cyan-300 animate-pulse" />
            <span className="font-mono tracking-wider">NAGPUR GIS COMMAND MAP</span>
          </div>

          {/* Zone Selector Pills on Map Overlay */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-[#07101d]/90 backdrop-blur-md border border-slate-700 text-xs font-bold shadow-lg overflow-x-auto max-w-[90vw] sm:max-w-none">
            {zoneList.map(zoneId => {
              const isActive = activeZone === zoneId;
              const gisZone = nagpurGisZones.find(z => z.id === zoneId);
              return (
                <button
                  key={zoneId}
                  onClick={() => handleZoneClick(zoneId)}
                  className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {gisZone && (
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: gisZone.color }}
                    />
                  )}
                  <span>{zoneId === 'ALL' ? 'ALL ZONES' : zoneId}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* GIS Layer Menu & Legend */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowLayerMenu(!showLayerMenu)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#07101d]/90 backdrop-blur-md border border-cyan-400/30 text-xs font-bold text-slate-200 hover:text-white shadow-lg transition-all"
          >
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>GIS Layers</span>
          </button>

          {showRouteLegend && (
            <div className="hidden lg:flex items-center gap-3 px-3 py-1.5 rounded-full bg-[#07101d]/90 backdrop-blur-md border border-slate-700 text-[11px] font-semibold text-slate-200 shadow-lg">
              <span><i className="inline-block w-4 h-1 rounded-full bg-yellow-300 align-middle mr-1.5 shadow-[0_0_8px_#fde047]" />AI Route</span>
              <span><i className="inline-block w-2.5 h-2.5 rounded-full bg-rose-500 align-middle mr-1" />Critical</span>
              <span><i className="inline-block w-2.5 h-2.5 rounded-full bg-amber-400 align-middle mr-1" />High</span>
              <span><i className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 align-middle mr-1" />Low</span>
            </div>
          )}
        </div>
      </div>

      {/* Floating Layer Control Popover */}
      {showLayerMenu && (
        <div className="absolute top-14 right-3 z-[1000] p-4 rounded-2xl bg-[#07101d]/95 backdrop-blur-xl border border-cyan-400/30 shadow-2xl text-xs text-white space-y-2.5 w-56 animate-in fade-in">
          <div className="font-bold text-cyan-300 border-b border-slate-800 pb-2 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-pink-400" />
            GIS Overlays & Telemetry
          </div>

          <label className="flex items-center justify-between cursor-pointer hover:text-cyan-300">
            <span>🗺️ Zone Boundary Polygons</span>
            <input
              type="checkbox"
              checked={showZonePolygons}
              onChange={(e) => setShowZonePolygons(e.target.checked)}
              className="accent-cyan-500"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer hover:text-cyan-300">
            <span>🛣️ Traffic Corridors</span>
            <input
              type="checkbox"
              checked={mapLayers.showTrafficDensity}
              className="accent-cyan-500"
              readOnly
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer hover:text-cyan-300">
            <span>🚦 Signal Wave Markers</span>
            <input
              type="checkbox"
              checked={mapLayers.showSignals}
              className="accent-cyan-500"
              readOnly
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer hover:text-cyan-300">
            <span>🚨 Incident Emergency Markers</span>
            <input
              type="checkbox"
              checked={mapLayers.showIncidents}
              className="accent-cyan-500"
              readOnly
            />
          </label>
        </div>
      )}

      {/* Bottom Status Bar */}
      <div className="absolute bottom-3 left-3 z-[1000] pointer-events-none px-3.5 py-2 rounded-2xl bg-[#07101d]/90 backdrop-blur-md border border-slate-700 text-[10px] text-slate-300 font-mono shadow-lg flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>Selected Zone: <strong className="text-cyan-300">{activeZone}</strong> • {filteredRoads.length} Active Corridors • Leaflet GIS Active</span>
      </div>

      {/* Floating Selected Road Detailed AI Inspector */}
      {selectedRoad && (
        <div className="absolute right-3 bottom-3 z-[1000] w-[310px] max-w-[calc(100%-1.5rem)] p-4 rounded-3xl bg-[#07101d]/95 backdrop-blur-xl border border-cyan-400/30 shadow-2xl animate-in slide-in-from-bottom-2 text-white">
          <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-cyan-300 font-black flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-pink-400" />
                <span>REAL-TIME CORRIDOR AI</span>
              </div>
              <h3 className="text-base font-black text-white mt-0.5">{selectedRoad.name}</h3>
              <p className="text-[11px] text-slate-400">{selectedRoad.zone} • {selectedRoad.lengthKm} km</p>
            </div>
            <button
              onClick={() => setSelectedRoad(null)}
              className="text-slate-400 hover:text-white p-1 rounded-full text-lg leading-none"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 my-3 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Traffic Flow</span>
              <b className="block text-white font-mono text-sm mt-0.5">{Number(selectedRoad.vehiclesPerHour || 0).toLocaleString()} veh/h</b>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Average Speed</span>
              <b className="block text-cyan-300 font-mono text-sm mt-0.5">{selectedRoad.averageSpeed || '—'} km/h</b>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Occupancy</span>
              <b className="block text-pink-300 font-mono text-sm mt-0.5">{selectedRoad.occupancyPercent || '—'}%</b>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Density Level</span>
              <b className={`block font-mono text-sm mt-0.5 ${
                selectedRoad.trafficLevel === 'CRITICAL' ? 'text-rose-400' : selectedRoad.trafficLevel === 'HIGH' ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {selectedRoad.trafficLevel}
              </b>
            </div>
          </div>

          {/* AI 30-Min Forecast Progress */}
          <div className="p-3 rounded-2xl bg-indigo-950/60 border border-indigo-500/30 text-xs space-y-1.5">
            <div className="flex justify-between font-bold">
              <span className="text-indigo-300 flex items-center gap-1">
                <Bot className="w-3.5 h-3.5 text-pink-400" />
                30-Min AI Forecast:
              </span>
              <span className="text-pink-300 font-mono">{selectedRoad.predictedCongestion || 'HIGH'}</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              {selectedRoad.recommendation || 'Optimize signal timing split & divert flow to adjacent corridor.'}
            </p>
          </div>

          {/* Quick Action Button */}
          <button
            onClick={() => navigate('/prediction')}
            className="mt-3 w-full py-2.5 rounded-full bg-gradient-to-r from-cyan-600 via-blue-600 to-pink-600 hover:brightness-110 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
          >
            <span>Run Neural Forecast</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Leaflet Map Container */}
      <MapContainer
        center={customCenter}
        zoom={customZoom}
        minZoom={10}
        maxZoom={19}
        scrollWheelZoom
        className="w-full h-full z-0"
      >
        {/* Controllers */}
        <ZoneViewController selectedZone={activeZone} roads={roads} />
        {activeRoute && <RouteFitController path={activeRoute} />}

        {/* Leaflet Dark Tile Base */}
        <TileLayer
          attribution='&copy; OpenStreetMap contributors &copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          maxZoom={20}
          subdomains="abcd"
        />

        {/* Render GIS Zone Boundary Polygons */}
        {showZonePolygons && nagpurGisZones.map(zone => {
          const isSelectedZone = activeZone === zone.id;
          return (
            <Polygon
              key={zone.id}
              positions={zone.polygon}
              pathOptions={{
                color: zone.color,
                weight: isSelectedZone ? 3.5 : 1.5,
                opacity: isSelectedZone ? 1 : 0.6,
                fillColor: zone.fillColor,
                fillOpacity: isSelectedZone ? 0.22 : 0.08,
                dashArray: isSelectedZone ? undefined : '6 6'
              }}
              eventHandlers={{
                click: () => handleZoneClick(zone.id)
              }}
            >
              <Popup>
                <div className="p-3.5 min-w-[240px] text-slate-100 bg-[#0c1422] rounded-xl font-sans space-y-2">
                  <div className="flex items-center gap-2 border-b border-slate-700 pb-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: zone.color }} />
                    <div>
                      <h4 className="font-bold text-sm text-white">{zone.name}</h4>
                      <span className="text-[10px] text-cyan-300 font-mono">{zone.jurisdiction}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300">{zone.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2 rounded bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Area</span>
                      <b className="text-white">{zone.areaSqKm} km²</b>
                    </div>
                    <div className="p-2 rounded bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Code</span>
                      <b className="text-cyan-300">{zone.code}</b>
                    </div>
                  </div>
                  <button
                    onClick={() => handleZoneClick(zone.id)}
                    className="mt-2 w-full py-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-xs rounded-lg text-center"
                  >
                    Filter Telemetry for {zone.id}
                  </button>
                </div>
              </Popup>
            </Polygon>
          );
        })}

        {/* Render Road Network Polylines */}
        {mapLayers.showTrafficDensity && filteredRoads.map(road => {
          const highlighted = highlightRoadId === road.id || selectedRoad?.id === road.id;
          return (
            <Polyline
              key={road.id}
              positions={road.coordinates}
              pathOptions={{
                color: road.color,
                weight: highlighted ? 10 : 6,
                opacity: highlighted ? 1 : 0.9,
                lineCap: 'round',
                lineJoin: 'round',
                dashArray: road.trafficLevel === 'CRITICAL' ? '10 8' : undefined
              }}
              eventHandlers={{
                click: () => setSelectedRoad(road)
              }}
            >
              <Popup>
                <div className="p-3.5 min-w-[260px] text-slate-100 bg-[#0c1422] rounded-xl font-sans">
                  <div className="flex items-start justify-between gap-2 border-b border-slate-700 pb-2 mb-2">
                    <div>
                      <h4 className="font-bold text-sm text-white">{road.name}</h4>
                      <span className="text-[11px] text-slate-400">{road.zone} • {road.lengthKm} km</span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded ${
                      road.trafficLevel === 'CRITICAL' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-slate-800 text-cyan-300'
                    }`}>
                      {road.trafficLevel}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-300 font-mono">
                    <div className="flex justify-between">
                      <span>Traffic Volume</span>
                      <strong className="text-white">{road.vehiclesPerHour.toLocaleString()} veh/h</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Arterial Speed</span>
                      <strong className="text-cyan-300">{road.averageSpeed} km/h</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Occupancy</span>
                      <strong className="text-pink-300">{road.occupancyPercent}%</strong>
                    </div>
                  </div>

                  <div className="mt-3 p-2 rounded-lg bg-cyan-950/60 border border-cyan-800/50 text-[11px] text-cyan-100">
                    <Bot className="w-3.5 h-3.5 inline mr-1 text-pink-400" />
                    {road.recommendation}
                  </div>

                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => navigate('/prediction')}
                      className="flex-1 py-2 bg-gradient-to-r from-cyan-600 to-pink-600 text-white font-bold text-xs rounded-lg text-center"
                    >
                      AI Prediction
                    </button>
                    <button
                      onClick={() => navigate('/routes')}
                      className="px-3 py-2 bg-slate-800 text-slate-200 hover:text-white font-bold text-xs rounded-lg"
                    >
                      Reroute
                    </button>
                  </div>
                </div>
              </Popup>
            </Polyline>
          );
        })}

        {/* Render Highlighted Bright AI Route overlay */}
        {activeRoute && (
          <>
            <Polyline positions={activeRoute} pathOptions={{ color: '#000', weight: 15, opacity: 0.65, lineCap: 'round', lineJoin: 'round' }} />
            <Polyline positions={activeRoute} pathOptions={{ color: '#FDE047', weight: 9, opacity: 1, lineCap: 'round', lineJoin: 'round' }} />
            <Polyline positions={activeRoute} pathOptions={{ color: '#FFF7AE', weight: 3, opacity: 1, lineCap: 'round', lineJoin: 'round' }} />
            <CircleMarker center={activeRoute[0]} radius={8} pathOptions={{ color: '#fff', weight: 3, fillColor: '#22D3EE', fillOpacity: 1 }}>
              <Popup><strong className="text-cyan-700">AI Route Origin</strong></Popup>
            </CircleMarker>
            <CircleMarker center={activeRoute[activeRoute.length - 1]} radius={8} pathOptions={{ color: '#fff', weight: 3, fillColor: '#F43F5E', fillOpacity: 1 }}>
              <Popup><strong className="text-rose-700">AI Route Destination</strong></Popup>
            </CircleMarker>
          </>
        )}

        {/* Signals Markers */}
        {mapLayers.showSignals && signals.map(signal => (
          <Marker key={signal.id} position={signal.coordinates} icon={signalIcon(signal.currentPhase)}>
            <Popup>
              <div className="p-3 bg-[#0c1422] text-white font-sans">
                <div className="font-bold text-sm text-white">{signal.name}</div>
                <div className="text-xs text-slate-300 mt-1 flex items-center justify-between">
                  <span>Phase: <strong className="text-cyan-300">{signal.currentPhase}</strong></span>
                  <span className="font-mono text-pink-400 font-bold">{signal.secondsRemaining}s</span>
                </div>
                <button
                  onClick={() => applySignalAITiming(signal.id)}
                  className="mt-2.5 w-full py-1.5 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-bold text-xs rounded-lg"
                >
                  Optimize Signal Wave
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Incident Markers */}
        {mapLayers.showIncidents && incidents.filter(i => i.status !== 'RESOLVED').map(i => (
          <Marker key={i.id} position={i.coordinates} icon={incidentIcon(i.severity)}>
            <Popup>
              <div className="p-3 bg-[#0c1422] text-white font-sans">
                <b className="text-rose-400 text-sm block">🚨 {i.type}</b>
                <div className="text-xs text-slate-300 mt-1">{i.location}</div>
                <div className="text-[11px] text-rose-300 mt-1 font-semibold">Impact: {i.impact}</div>
                <button
                  onClick={() => navigate('/incidents')}
                  className="mt-2.5 w-full py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-lg"
                >
                  Dispatch Emergency Route
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        {activeRoute && <Marker position={activeRoute[0]} icon={endpointIcon('A', '#22D3EE')}><Popup>AI Route Origin</Popup></Marker>}
        {activeRoute && <Marker position={activeRoute[activeRoute.length - 1]} icon={endpointIcon('B', '#F43F5E')}><Popup>AI Route Destination</Popup></Marker>}
      </MapContainer>
    </div>
  );
};

export default TrafficMap;
