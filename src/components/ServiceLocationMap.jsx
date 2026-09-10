import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet marker icon asset paths for Webpack/Vite bundled builds
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Class component error boundary to guarantee total isolation
class MapErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn("Leaflet Map failed to load silently:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-[300px] bg-surface-canvas border border-border-subtle flex flex-col justify-center items-center text-xs text-text-muted p-4 text-center">
          <span className="material-symbols-outlined text-[24px] text-text-muted mb-1">map</span>
          <span>Service location map preview currently unavailable</span>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function ServiceLocationMap({ workerName = 'Assigned Worker', address = 'Model Colony, Shivajinagar, Pune' }) {
  // Fixed coordinates for Pune, Maharashtra demo location
  const position = [18.5204, 73.8567];

  return (
    <MapErrorBoundary>
      <div className="w-full bg-surface-card border border-border-subtle p-3.5 shadow-sm rounded-lg flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1">
            <span className="material-symbols-outlined text-gov-saffron text-[16px]">location_on</span>
            Service Location Map (Pune District)
          </label>
          <span className="text-[10px] text-text-muted bg-surface-canvas px-2 py-0.5 border border-border-subtle font-mono">
            {address}
          </span>
        </div>
        <div className="w-full h-[280px] rounded overflow-hidden border border-border-strong relative z-0">
          <MapContainer
            center={position}
            zoom={14}
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                <div className="text-xs font-sans">
                  <strong className="block text-primary font-bold">{workerName}</strong>
                  <span className="text-text-secondary text-[11px]">Service Location — {address}</span>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </MapErrorBoundary>
  );
}
