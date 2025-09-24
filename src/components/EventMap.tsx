'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPinIcon } from '@heroicons/react/24/outline';

// Fix for default markers in Next.js/React
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
}

interface EventMapProps {
  latitude?: number;
  longitude?: number;
  location?: string;
  eventTitle?: string;
}

const EventMap: React.FC<EventMapProps> = ({ latitude, longitude, location, eventTitle }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // Only create map if we have coordinates and the container exists and we're on client side
    if (!latitude || !longitude || !mapRef.current || typeof window === 'undefined') return;

    // Clean up previous map instance
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    // Create the map
    const map = L.map(mapRef.current, {
      center: [latitude, longitude],
      zoom: 15,
      zoomControl: true,
      scrollWheelZoom: false, // Disable scroll zoom for better UX in modals
    });

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    // Add marker
    const marker = L.marker([latitude, longitude]).addTo(map);

    // Add popup with event info
    if (eventTitle && location) {
      marker.bindPopup(`
        <div style="text-align: center; padding: 8px;">
          <strong style="color: #047857; font-size: 14px;">${eventTitle}</strong><br>
          <small style="color: #6b7280; margin-top: 4px; display: block;">${location}</small>
        </div>
      `);
    }

    // Store map instance for cleanup
    mapInstanceRef.current = map;

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [latitude, longitude, location, eventTitle]);

  // Don't render if no coordinates
  if (!latitude || !longitude) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center shadow-md">
        <div className="text-center text-gray-500">
          <MapPinIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="font-medium">{location || 'Posizione'}</p>
          <p className="text-sm">Aggiungi coordinate per visualizzare la mappa</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div
        ref={mapRef}
        className="w-full h-64 rounded-lg border border-gray-300 shadow-md"
        style={{ minHeight: '256px' }}
      />
      {location && (
        <p className="text-sm text-gray-600 mt-2 text-center flex items-center justify-center">
          <MapPinIcon className="w-4 h-4 mr-1 text-emerald-600" />
          {location}
        </p>
      )}
    </div>
  );
};

export default EventMap;