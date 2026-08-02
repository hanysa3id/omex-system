'use client';

import React, { useState } from 'react';
import { useI18n } from '@/lib/i18n/I18nContext';
import { INITIAL_SHIPMENTS, INITIAL_DRIVERS } from '@/lib/mockData';
import { Shipment } from '@/types';
import { exportToCsv } from '@/lib/exportExcel';
import { Truck, Plus, Download, MapPin, PackageCheck } from 'lucide-react';

export default function ShipmentsPage() {
  const { t } = useI18n();
  const [shipments, setShipments] = useState<Shipment[]>(INITIAL_SHIPMENTS);

  const handleExport = () => {
    exportToCsv('OMEX_UAE_Shipments_Manifests', shipments);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-[#169C47] font-bold text-xs">
            <Truck className="w-4 h-4" />
            <span>{t.shipments.title}</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 mt-1">{t.nav.shipments}</h2>
          <p className="text-slate-500 text-xs mt-0.5">Manage hub-to-hub linehaul manifests and bulk delivery shipments.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all border border-slate-200"
          >
            <Download className="w-4 h-4" />
            <span>{t.reports.exportExcel}</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#169C47] hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-all active:scale-95">
            <Plus className="w-4 h-4" />
            <span>{t.shipments.newShipment}</span>
          </button>
        </div>
      </div>

      {/* Shipments Datatable */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden p-6 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3.5 text-start">{t.shipments.shipmentCode}</th>
                <th className="p-3.5 text-start">{t.shipments.originHub}</th>
                <th className="p-3.5 text-start">{t.shipments.destinationHub}</th>
                <th className="p-3.5 text-start">{t.accounts.drivers}</th>
                <th className="p-3.5 text-start">{t.shipments.ordersCount}</th>
                <th className="p-3.5 text-start">{t.shipments.status}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {shipments.map((shp) => (
                <tr key={shp.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5 font-bold text-[#169C47] font-mono">{shp.shipmentCode}</td>
                  <td className="p-3.5 text-slate-800 font-semibold">{shp.originHub}</td>
                  <td className="p-3.5 text-slate-800 font-semibold">{shp.destinationHub}</td>
                  <td className="p-3.5 text-slate-700">
                    <p className="font-bold">{shp.driverName}</p>
                    <p className="text-[10px] text-slate-400">{shp.vehiclePlate}</p>
                  </td>
                  <td className="p-3.5 font-bold text-slate-900">{shp.totalOrders} Vouchers</td>
                  <td className="p-3.5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        shp.status === 'In Transit'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {shp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
