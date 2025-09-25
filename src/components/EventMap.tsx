'use client';

import { useEffect, useRef, useState } from 'react';
import { MapPinIcon } from '@heroicons/react/24/outline';

// Dynamically import Leaflet only on client side
const loadLeaflet = async () => {
  if (typeof window === 'undefined') return null;

  const L = await import('leaflet');
  await import('leaflet/dist/leaflet.css');

  // Fix for default markers in Next.js/React
  delete (L.default.Icon.Default.prototype as any)._getIconUrl;
  L.default.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });

  return L.default;
};

interface EventMapProps {
  latitude?: number;
  longitude?: number;
  location?: string;
  eventTitle?: string;
}

const EventMap: React.FC<EventMapProps> = ({ latitude, longitude, location, eventTitle }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const initializeMap = async () => {
      // Only create map if we have coordinates and the container exists and we're on client side
      if (!latitude || !longitude || !mapRef.current || typeof window === 'undefined') {
        setIsLoading(false);
        return;
      }

      try {
        // Load Leaflet dynamically
        const L = await loadLeaflet();
        if (!L || !isMounted) return;

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

        if (isMounted) {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error loading map:', error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initializeMap();

    // Cleanup function
    return () => {
      isMounted = false;
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

  if (isLoading) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center shadow-md">
        <div className="text-center text-gray-500">
          <div className="animate-spin w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full mx-auto mb-2"></div>
          <p className="text-sm">Caricamento mappa...</p>
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