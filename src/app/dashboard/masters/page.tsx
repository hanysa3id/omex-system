'use client';

import React, { useState } from 'react';
import { useI18n } from '@/lib/i18n/I18nContext';
import { INITIAL_EMIRATES_AREAS, INITIAL_DRIVERS } from '@/lib/mockData';
import { EmirateArea } from '@/types';
import { exportToCsv } from '@/lib/exportExcel';
import {
  Boxes,
  Plus,
  Download,
  Search,
  Edit2,
  Trash2,
  CheckCircle,
  Shield,
  Layers,
  FileText,
  AlertTriangle,
} from 'lucide-react';

export default function MastersPage() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<'areas' | 'expenses' | 'types' | 'reasons'>('areas');
  const [areas, setAreas] = useState<EmirateArea[]>(INITIAL_EMIRATES_AREAS);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal state for adding area
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newEmirate, setNewEmirate] = useState('Dubai');
  const [newAreaName, setNewAreaName] = useState('');
  const [newAreaNameAr, setNewAreaNameAr] = useState('');
  const [newCharge, setNewCharge] = useState('25');
  const [newExpressCharge, setNewExpressCharge] = useState('45');
  const [newCommission, setNewCommission] = useState('5');

  // Expense Categories state
  const [expenses, setExpenses] = useState([
    { id: 'exp-1', category: 'Fuel & Gas', code: 'EXP-FUEL', active: true },
    { id: 'exp-[#2]', category: 'Vehicle Maintenance & Service', code: 'EXP-MAINT', active: true },
    { id: 'exp-3', category: 'Driver Meal Allowance', code: 'EXP-MEAL', active: true },
    { id: 'exp-4', category: 'Salik & Toll Gate', code: 'EXP-[#5]ALIK', active: true },
    { id: 'exp-5', category: 'Traffic Fines Settlement', code: 'EXP-FINE', active: true },
  ]);

  // Order Types state
  const [orderTypes, setOrderTypes] = useState([
    { id: 'ot-1', name: 'Standard Delivery', code: 'STD', desc: 'Normal 24-48 hr UAE delivery' },
    { id: 'ot-2', name: 'Chiller Cold Truck', code: 'CHL', desc: 'Temperature controlled food & perishables' },
    { id: 'ot-3', name: 'Fragile / High Value', code: 'FRG', desc: 'Perfumes, electronics, glassware' },
    { id: 'ot-4', name: 'Same-Day Express', code: 'EXP', desc: 'Under 4-hour direct express courier' },
    { id: 'ot-5', name: 'File & Legal Document', code: 'DOC', desc: 'Confidential documents & contracts' },
  ]);

  // Cancel reasons
  const [cancelReasons, setCancelReasons] = useState([
    { id: 'cr-1', reason: 'Customer Unreachable / No Answer' },
    { id: 'cr-2', reason: 'Customer Refused Delivery / Changed Mind' },
    { id: 'cr-3', reason: 'Incorrect Delivery Address or Emirate' },
    { id: 'cr-[#4]', reason: 'Product Damaged in Transit' },
    { id: 'cr-5', reason: 'COD Amount Discrepancy' },
  ]);

  const filteredAreas = areas.filter(
    (a) =>
      a.emirate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.areaName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.areaNameAr.includes(searchQuery)
  );

  const handleAddArea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAreaName.trim()) return;

    const newObj: EmirateArea = {
      id: `ea-${Date.now()}`,
      emirate: newEmirate,
      areaName: newAreaName,
      areaNameAr: newAreaNameAr || newAreaName,
      deliveryCharge: parseFloat(newCharge) || 25,
      expressCharge: parseFloat(newExpressCharge) || 45,
      driverCommission: parseFloat(newCommission) || 5,
      isActive: true,
    };

    setAreas([newObj, ...areas]);
    setIsAddModalOpen(false);
    setNewAreaName('');
    setNewAreaNameAr('');
  };

  const handleExportExcel = () => {
    exportToCsv('UAE_Delivery_Areas_Masters', filteredAreas);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-[#169C47] font-bold text-xs">
            <Boxes className="w-4 h-4" />
            <span>{t.masters.title}</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 mt-1">{t.nav.masters}</h2>
          <p className="text-slate-500 text-xs mt-0.5">{t.masters.subTitle}</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportExcel}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all border border-slate-200"
          >
            <Download className="w-4 h-4" />
            <span>{t.reports.exportExcel}</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#169C47] hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>{t.masters.addArea}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2 bg-white px-4 pt-3 rounded-2xl border">
        <button
          onClick={() => setActiveTab('areas')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all ${
            activeTab === 'areas'
              ? 'border-[#169C47] text-[#169C47]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>{t.masters.emiratesAreas}</span>
        </button>
        <button
          onClick={() => setActiveTab('expenses')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all ${
            activeTab === 'expenses'
              ? 'border-[#169C47] text-[#169C47]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>{t.masters.expenseCategories}</span>
        </button>
        <button
          onClick={() => setActiveTab('types')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all ${
            activeTab === 'types'
              ? 'border-[#169C47] text-[#169C47]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Boxes className="w-4 h-4" />
          <span>{t.masters.orderTypes}</span>
        </button>
        <button
          onClick={() => setActiveTab('reasons')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all ${
            activeTab === 'reasons'
              ? 'border-[#169C47] text-[#169C47]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>{t.masters.cancellationReasons}</span>
        </button>
      </div>

      {/* Tab 1: Emirates & Areas Table */}
      {activeTab === 'areas' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Emirates or Areas..."
                className="w-full ps-10 pe-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#169C47] focus:outline-none"
              />
            </div>
            <span className="text-xs text-slate-500 font-semibold">
              Total Zones: <span className="text-slate-900 font-bold">{filteredAreas.length}</span>
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-start">
              <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3.5 text-start">{t.masters.emirate}</th>
                  <th className="p-3.5 text-start">{t.masters.areaName}</th>
                  <th className="p-3.5 text-start">{t.masters.areaNameAr}</th>
                  <th className="p-3.5 text-start">{t.masters.deliveryCharge}</th>
                  <th className="p-3.5 text-start">{t.masters.expressCharge}</th>
                  <th className="p-3.5 text-start">{t.masters.driverCommission}</th>
                  <th className="p-3.5 text-start">{t.masters.assignedDriver}</th>
                  <th className="p-3.5 text-start">{t.accounts.actions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAreas.map((area) => (
                  <tr key={area.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900">{area.emirate}</td>
                    <td className="p-3.5 font-semibold text-slate-800">{area.areaName}</td>
                    <td className="p-3.5 text-slate-600 font-medium">{area.areaNameAr}</td>
                    <td className="p-3.5 font-bold text-emerald-700">AED {area.deliveryCharge.toFixed(2)}</td>
                    <td className="p-3.5 font-bold text-amber-700">AED {area.expressCharge.toFixed(2)}</td>
                    <td className="p-3.5 font-bold text-blue-700">AED {area.driverCommission.toFixed(2)}</td>
                    <td className="p-3.5 text-slate-600">
                      {INITIAL_DRIVERS.find((d) => d.id === area.assignedDriverId)?.fullName || 'Zayd Al-Farsi'}
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Expense Categories */}
      {activeTab === 'expenses' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-sm">{t.masters.expenseCategories}</h3>
            <button className="px-3 py-1.5 bg-emerald-50 text-[#169C47] font-bold text-xs rounded-xl hover:bg-emerald-100">
              {t.masters.addCategory}
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {expenses.map((exp) => (
              <div key={exp.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-slate-900">{exp.category}</h4>
                  <span className="text-[10px] font-bold text-slate-400">{exp.code}</span>
                </div>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold">Active</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Order Types */}
      {activeTab === 'types' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <h3 className="font-bold text-slate-800 text-sm">{t.masters.orderTypes}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {orderTypes.map((ot) => (
              <div key={ot.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-[#169C47]">{ot.name}</h4>
                  <span className="px-2 py-0.5 bg-slate-200 text-slate-700 rounded-md text-[10px] font-bold">{ot.code}</span>
                </div>
                <p className="text-[11px] text-slate-500">{ot.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Cancellation Reasons */}
      {activeTab === 'reasons' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <h3 className="font-bold text-slate-800 text-sm">{t.masters.cancellationReasons}</h3>
          <div className="space-y-2">
            {cancelReasons.map((cr, idx) => (
              <div key={cr.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs font-semibold text-slate-800">
                <span>{idx + 1}. {cr.reason}</span>
                <span className="text-[10px] text-slate-400">System Code</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add New Area Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <form onSubmit={handleAddArea} className="bg-white rounded-2xl p-6 shadow-2xl border border-slate-200 w-full max-w-md space-y-4">
            <h3 className="font-bold text-slate-900 text-base">{t.masters.addArea}</h3>
            
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t.masters.emirate}</label>
              <select
                value={newEmirate}
                onChange={(e) => setNewEmirate(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[#169C47] outline-none"
              >
                <option value="Dubai">Dubai</option>
                <option value="Abu Dhabi">Abu Dhabi</option>
                <option value="Sharjah">Sharjah</option>
                <option value="Ajman">Ajman</option>
                <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                <option value="Fujairah">Fujairah</option>
                <option value="Umm Al Quwain">Umm Al Quwain</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t.masters.areaName}</label>
                <input
                  type="text"
                  value={newAreaName}
                  onChange={(e) => setNewAreaName(e.target.value)}
                  placeholder="e.g. Jumeirah 1"
                  required
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#169C47] outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t.masters.areaNameAr}</label>
                <input
                  type="text"
                  value={newAreaNameAr}
                  onChange={(e) => setNewAreaNameAr(e.target.value)}
                  placeholder="جميرا 1"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#169C47] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Standard (AED)</label>
                <input
                  type="number"
                  value={newCharge}
                  onChange={(e) => setNewCharge(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#169C47] outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Express (AED)</label>
                <input
                  type="number"
                  value={newExpressCharge}
                  onChange={(e) => setNewExpressCharge(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#169C47] outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Comm (AED)</label>
                <input
                  type="number"
                  value={newCommission}
                  onChange={(e) => setNewCommission(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#169C47] outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700"
              >
                {t.common.cancel}
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#169C47] hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md"
              >
                {t.common.save}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
