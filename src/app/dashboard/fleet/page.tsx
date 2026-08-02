'use client';

import React, { useState } from 'react';
import { useI18n } from '@/lib/i18n/I18nContext';
import { INITIAL_VEHICLES, INITIAL_VEHICLE_LOGS } from '@/lib/mockData';
import { Vehicle, VehicleLog } from '@/types';
import { exportToCsv } from '@/lib/exportExcel';
import { Car, Plus, Download, Wrench, Fuel, ShieldAlert, FileCheck, Gauge } from 'lucide-react';

export default function FleetPage() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<'vehicles' | 'logs' | 'expirations'>('vehicles');
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [vehicleLogs, setVehicleLogs] = useState<VehicleLog[]>(INITIAL_VEHICLE_LOGS);

  const handleExport = () => {
    if (activeTab === 'vehicles') exportToCsv('OMEX_UAE_Fleet_Registry', vehicles);
    else exportToCsv('OMEX_UAE_Fleet_Logs', vehicleLogs);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-[#169C47] font-bold text-xs">
            <Car className="w-4 h-4" />
            <span>{t.fleet.title}</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 mt-1">{t.nav.fleet}</h2>
          <p className="text-slate-500 text-xs mt-0.5">{t.fleet.subTitle}</p>
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
            <span>{t.fleet.addVehicle}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2 bg-white px-4 pt-3 rounded-2xl border">
        <button
          onClick={() => setActiveTab('vehicles')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all ${
            activeTab === 'vehicles'
              ? 'border-[#169C47] text-[#169C47]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Car className="w-4 h-4" />
          <span>Vehicle List & Status</span>
        </button>
        <button
          onClick={() => setActiveTab('logs')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all ${
            activeTab === 'logs'
              ? 'border-[#169C47] text-[#169C47]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>Maintenance & Fuel Logs</span>
        </button>
        <button
          onClick={() => setActiveTab('expirations')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all ${
            activeTab === 'expirations'
              ? 'border-[#169C47] text-[#169C47]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>Mulkiya & Insurance Expirations</span>
        </button>
      </div>

      {/* View 1: Vehicles List */}
      {activeTab === 'vehicles' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {vehicles.map((veh) => (
            <div key={veh.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono font-black text-[#169C47] text-base bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-100">
                  {veh.emirateRegistered} {veh.plateCode}-{veh.plateNumber}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    veh.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {veh.status}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm">{veh.makeModel}</h4>
                <p className="text-xs text-slate-500">{veh.type} ({veh.year})</p>
              </div>

              <div className="bg-slate-50 rounded-xl p-3 text-xs space-y-1 border border-slate-100">
                <div className="flex justify-between text-slate-600">
                  <span>Odometer:</span>
                  <span className="font-bold text-slate-900">{veh.odometerKm.toLocaleString()} km</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Mulkiya Expiry:</span>
                  <span className="font-bold text-emerald-700">{veh.mulkiyaExpiry}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View 2: Maintenance & Fuel Logs */}
      {activeTab === 'logs' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3.5 text-start">{t.fleet.plateNumber}</th>
                <th className="p-3.5 text-start">Log Type</th>
                <th className="p-3.5 text-start">Description</th>
                <th className="p-3.5 text-start">{t.financials.amount}</th>
                <th className="p-3.5 text-start">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {vehicleLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5 font-bold font-mono text-[#169C47]">{log.plateNumber}</td>
                  <td className="p-3.5 font-bold text-slate-900">{log.logType}</td>
                  <td className="p-3.5 text-slate-700">{log.description}</td>
                  <td className="p-3.5 font-bold text-rose-600">AED {log.amount.toFixed(2)}</td>
                  <td className="p-3.5 text-slate-500 font-medium">{log.logDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View 3: Document Expirations */}
      {activeTab === 'expirations' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Mulkiya & Insurance Validity Tracking</h3>
          <div className="space-y-3">
            {vehicles.map((v) => (
              <div key={v.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-slate-900">{v.emirateRegistered} {v.plateCode}-{v.plateNumber} ({v.makeModel})</h4>
                  <p className="text-[11px] text-slate-500">Insurance Expiry: <span className="font-bold text-slate-800">{v.insuranceExpiry}</span></p>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
                  Valid Document
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
