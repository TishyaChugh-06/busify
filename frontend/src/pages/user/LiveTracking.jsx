import React, { useEffect, useRef } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { mockLiveLocations } from '../../mockData';
import './UserPages.css';

// Fix for default marker icon in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const LiveTracking = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView([40.7128, -74.0060], 12);
    mapInstanceRef.current = map;

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    // Add bus markers
    mockLiveLocations.forEach(bus => {
      const marker = L.marker([bus.lat, bus.lng]).addTo(map);
      marker.bindPopup(`
        <strong>${bus.busNumber}</strong><br>
        Route: ${bus.route}<br>
        Next Stop: ${bus.nextStop}
      `);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div>
      <Navbar role="user" />
      <div className="dashboard-layout">
        <Sidebar role="user" />
        <main className="main-content">
          <div className="page-header">
            <h1>Live Bus Tracking</h1>
            <p>Track your bus in real-time</p>
          </div>
          
          <div className="card">
            <h2>Active Buses</h2>
            <div ref={mapRef} className="map-container"></div>
          </div>
          
          <div className="card" style={{marginTop: '20px'}}>
            <h2>Bus Status</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Bus Number</th>
                  <th>Route</th>
                  <th>Next Stop</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {mockLiveLocations.map(bus => (
                  <tr key={bus.busId}>
                    <td>{bus.busNumber}</td>
                    <td>{bus.route}</td>
                    <td>{bus.nextStop}</td>
                    <td><span style={{color: 'var(--success)', fontWeight: '500'}}>Active</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LiveTracking;
