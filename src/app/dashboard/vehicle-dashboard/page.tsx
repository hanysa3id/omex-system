'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n/I18nContext';
import { Car, Fuel, Wrench, AlertTriangle, Gauge, CheckCircle, XCircle, Clock } from 'lucide-react';

const stats = [
  { labelEn: 'Total Vehicles', labelAr: 'إجمالي المركبات', value: 48, icon: Car, color: 'bg-emerald-500' },
  { labelEn: 'Active', labelAr: 'نشط', value: 36, icon: CheckCircle, color: 'bg-green-500' },
  { labelEn: 'In Maintenance', labelAr: 'في الصيانة', value: 5, icon: Wrench, color: 'bg-amber-500' },
  { labelEn: 'Inactive', labelAr: 'غير نشط', value: 7, icon: XCircle, color: 'bg-red-500' },
];

const vehicles = [
  { plate: 'DXB A-12345', model: 'Toyota Hiace 2024', driver: 'Ahmed Khalil', status: 'Active', fuel: 78, km: 1250 },
  { plate: 'SHJ B-67890', model: 'Nissan NV350 2023', driver: 'Mohammed Ali', status: 'Active', fuel: 45, km: 890 },
  { plate: 'AJM C-11223', model: 'Ford Transit 2024', driver: 'Omar Hassan', status: 'Maintenance', fuel: 92, km: 340 },
  { plate: 'ABD D-44556', model: 'Mitsubishi L300 2023', driver: 'Saif Rashid', status: 'Active', fuel: 61, km: 2100 },
  { plate: 'FJR E-78901', model: 'Toyota Hiace 2023', driver: 'Yusuf Karim', status: 'Inactive', fuel: 15, km: 0 },
];

export default function VehicleDashboardPage() {
  const { lang } = useI18n();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{lang === 'ar' ? 'لوحة المركبات' : 'Vehicle Dashboard'}</h1>
        <p className="text-sm text-gray-500 mt-1">{lang === 'ar' ? 'نظرة عامة على حالة الأسطول' : 'Fleet status overview'}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className={`${s.color} text-white p-2.5 rounded-xl`}><Icon className="w-5 h-5" /></div>
                <span className="text-3xl font-black text-gray-900">{s.value}</span>
              </div>
              <p className="text-sm text-gray-500 font-medium">{lang === 'ar' ? s.labelAr : s.labelEn}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">{lang === 'ar' ? 'حالة المركبات' : 'Vehicle Status'}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-5 py-3 text-start text-xs font-semibold text-gray-500 uppercase">{lang === 'ar' ? 'اللوحة' : 'Plate'}</th>
                <th className="px-5 py-3 text-start text-xs font-semibold text-gray-500 uppercase">{lang === 'ar' ? 'الموديل' : 'Model'}</th>
                <th className="px-5 py-3 text-start text-xs font-semibold text-gray-500 uppercase">{lang === 'ar' ? 'السائق' : 'Driver'}</th>
                <th className="px-5 py-3 text-start text-xs font-semibold text-gray-500 uppercase">{lang === 'ar' ? 'الحالة' : 'Status'}</th>
                <th className="px-5 py-3 text-start text-xs font-semibold text-gray-500 uppercase">{lang === 'ar' ? 'الوقود %' : 'Fuel %'}</th>
                <th className="px-5 py-3 text-start text-xs font-semibold text-gray-500 uppercase">{lang === 'ar' ? 'كم اليوم' : 'KM Today'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {vehicles.map((v, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition">
                  <td className="px-5 py-3.5 font-mono font-semibold text-gray-900">{v.plate}</td>
                  <td className="px-5 py-3.5 text-gray-700">{v.model}</td>
                  <td className="px-5 py-3.5 text-gray-700">{v.driver}</td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                      v.status === 'Active' ? 'bg-green-100 text-green-700' :
                      v.status === 'Maintenance' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>{v.status}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className={`h-2 rounded-full ${v.fuel > 50 ? 'bg-green-500' : v.fuel > 25 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: v.fuel + '%' }} />
                      </div>
                      <span className="text-xs font-semibold text-gray-600">{v.fuel}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-gray-700">{v.km.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
