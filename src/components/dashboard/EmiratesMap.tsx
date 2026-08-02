'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

// Dynamic import for Leaflet elements to avoid SSR window errors
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

interface DeliveryPin {
  id: string;
  name: string;
  lat: number;
  lng: number;
  ordersCount: number;
  status: string;
}

const UAE_PINS: DeliveryPin[] = [
  { id: '1', name: 'Dubai Business Bay Hub', lat: 25.1857, lng: 55.2694, ordersCount: 142, status: 'High Activity' },
  { id: '2', name: 'Dubai Marina Zone', lat: 25.0805, lng: 55.1403, ordersCount: 98, status: 'Active' },
  { id: '3', name: 'Abu Dhabi Reem Island', lat: 24.4952, lng: 54.3982, ordersCount: 84, status: 'Active' },
  { id: '4', name: 'Sharjah Al Majaz Center', lat: 25.3375, lng: 55.3854, ordersCount: 56, status: 'Normal' },
  { id: '5', name: 'Ajman Nuaimia Zone', lat: 25.3995, lng: 55.4797, ordersCount: 32, status: 'Normal' },
  { id: '6', name: 'Ras Al Khaimah Nakheel', lat: 25.7895, lng: 55.9432, ordersCount: 19, status: 'Normal' },
];

export default function EmiratesMap() {
  const [mounted, setMounted] = useState(false);
  const [customIcon, setCustomIcon] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    // Initialize Leaflet custom icon on client
    import('leaflet').then((L) => {
      const icon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      });
      setCustomIcon(icon);
    });
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-80 bg-slate-100 animate-pulse rounded-2xl flex items-center justify-center text-slate-400 text-xs font-semibold">
        Loading UAE Interactive Map...
      </div>
    );
  }

  return (
    <div className="w-full h-80 rounded-2xl overflow-hidden shadow-inner border border-slate-200 relative">
      <MapContainer
        center={[25.0, 55.0]}
        zoom={8}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {customIcon &&
          UAE_PINS.map((pin) => (
            <Marker key={pin.id} position={[pin.lat, pin.lng]} icon={customIcon}>
              <Popup>
                <div className="p-1 space-y-1">
                  <h4 className="font-bold text-xs text-[#169C47]">{pin.name}</h4>
                  <p className="text-[11px] text-slate-600">
                    Active Orders: <span className="font-bold text-slate-900">{pin.ordersCount}</span>
                  </p>
                  <span className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-[#169C47] font-semibold">
                    {pin.status}
                  </span>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}
