'use client';

import React, { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n/I18nContext';
import { Navigation, Phone, MapPin, Clock, CheckCircle } from 'lucide-react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

const MapContainer = dynamic(() => import('react-leaflet').then((m) => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((m) => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((m) => m.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((m) => m.Popup), { ssr: false });

const drivers = [
  { id: 1, name: 'Ahmed Khalil', phone: '+971501234567', vehicle: 'DXB A-12345', lat: 25.276987, lng: 55.296249, status: 'Active', deliveries: 15, remaining: 5, lastUpdate: '2 min ago' },
  { id: 2, name: 'Mohammed Ali', phone: '+971502345678', vehicle: 'SHJ B-67890', lat: 25.338473, lng: 55.420932, status: 'Active', deliveries: 12, remaining: 6, lastUpdate: '1 min ago' },
  { id: 3, name: 'Omar Hassan', phone: '+971503456789', vehicle: 'AJM C-11223', lat: 25.406374, lng: 55.513472, status: 'Break', deliveries: 8, remaining: 7, lastUpdate: '15 min ago' },
  { id: 4, name: 'Saif Rashid', phone: '+971504567890', vehicle: 'ABD D-44556', lat: 24.453884, lng: 54.377343, status: 'Active', deliveries: 10, remaining: 8, lastUpdate: '5 min ago' },
];

export default function DriverTrackingPage() {
  const { lang } = useI18n();
  const [selectedDriver, setSelectedDriver] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [customIcon, setCustomIcon] = useState<any>(null);

  useEffect(() => {
    setIsClient(true);
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{lang === 'ar' ? 'تتبع السائقين' : 'Driver Tracking'}</h1>
        <p className="text-sm text-gray-500 mt-1">{lang === 'ar' ? 'تتبع مواقع السائقين مباشرة على الخريطة' : 'Track driver locations in real-time on the map'}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Driver List */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">{lang === 'ar' ? 'السائقون النشطون' : 'Active Drivers'}</h2>
            <p className="text-xs text-gray-500 mt-0.5">{drivers.length} {lang === 'ar' ? 'سائق' : 'drivers'}</p>
          </div>
          <div className="divide-y divide-gray-50 max-h-[500px] overflow-y-auto">
            {drivers.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDriver(d.id)}
                className={`w-full p-4 text-start hover:bg-gray-50 transition ${selectedDriver === d.id ? 'bg-green-50 border-s-4 border-[#169C47]' : ''}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-gray-900 text-sm">{d.name}</span>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${d.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {d.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 font-mono">{d.vehicle}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-green-500" /> {d.deliveries}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-amber-500" /> {d.remaining}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {d.lastUpdate}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden" style={{ minHeight: 500 }}>
          {isClient ? (
            <MapContainer
              center={[25.2048, 55.2708]}
              zoom={8}
              style={{ height: '100%', width: '100%', minHeight: 500 }}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {customIcon &&
                drivers.map((d) => (
                  <Marker key={d.id} position={[d.lat, d.lng]} icon={customIcon}>
                    <Popup>
                      <div className="text-sm">
                        <p className="font-bold">{d.name}</p>
                        <p className="text-gray-500">{d.vehicle}</p>
                        <p className="text-green-600 font-semibold">{d.deliveries} delivered · {d.remaining} remaining</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
            </MapContainer>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">Loading Map...</div>
          )}
        </div>
      </div>
    </div>
  );
}
