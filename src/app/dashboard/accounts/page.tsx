'use client';

import React, { useState } from 'react';
import { useI18n } from '@/lib/i18n/I18nContext';
import { INITIAL_DRIVERS, INITIAL_CLIENTS, INITIAL_CUSTOMERS } from '@/lib/mockData';
import { exportToCsv } from '@/lib/exportExcel';
import {
  Users,
  UserCheck,
  Building2,
  Phone,
  Mail,
  Shield,
  Plus,
  Download,
  Search,
  Star,
  DollarSign,
  Car,
} from 'lucide-react';

export default function AccountsPage() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<'drivers' | 'clients' | 'customers' | 'users'>('drivers');

  const [drivers, setDrivers] = useState(INITIAL_DRIVERS);
  const [clients, setClients] = useState(INITIAL_CLIENTS);
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [searchQuery, setSearchQuery] = useState('');

  const systemUsers = [
    { id: 'usr-1', name: 'Ahmed Salem', email: 'ahmed.salem@omex.ae', role: 'Admin Dispatcher', status: 'Active' },
    { id: 'usr-2', name: 'Noura Al-Mazrouei', email: 'noura@omex.ae', role: 'Key Account Manager', status: 'Active' },
    { id: 'usr-3', name: 'Khaled Hassan', email: 'khaled.finance@omex.ae', role: 'Senior Accountant', status: 'Active' },
  ];

  const handleExport = () => {
    if (activeTab === 'drivers') exportToCsv('UAE_Drivers_Registry', drivers);
    else if (activeTab === 'clients') exportToCsv('UAE_Corporate_Clients', clients);
    else exportToCsv('UAE_End_Customers', customers);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-[#169C47] font-bold text-xs">
            <Users className="w-4 h-4" />
            <span>{t.accounts.title}</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 mt-1">{t.nav.accounts}</h2>
          <p className="text-slate-500 text-xs mt-0.5">{t.accounts.subTitle}</p>
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
            <span>
              {activeTab === 'drivers'
                ? t.accounts.addDriver
                : activeTab === 'clients'
                ? t.accounts.addClient
                : t.accounts.addCustomer}
            </span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2 bg-white px-4 pt-3 rounded-2xl border">
        <button
          onClick={() => setActiveTab('drivers')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all ${
            activeTab === 'drivers'
              ? 'border-[#169C47] text-[#169C47]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>{t.accounts.drivers}</span>
        </button>
        <button
          onClick={() => setActiveTab('clients')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all ${
            activeTab === 'clients'
              ? 'border-[#169C47] text-[#169C47]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>{t.accounts.clients}</span>
        </button>
        <button
          onClick={() => setActiveTab('customers')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all ${
            activeTab === 'customers'
              ? 'border-[#169C47] text-[#169C47]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>{t.accounts.customers}</span>
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all ${
            activeTab === 'users'
              ? 'border-[#169C47] text-[#169C47]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>{t.accounts.systemUsers}</span>
        </button>
      </div>

      {/* Drivers View */}
      {activeTab === 'drivers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {drivers.map((drv) => (
            <div key={drv.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#169C47] font-black flex items-center justify-center text-base shadow-xs">
                  {drv.fullName.slice(0, 2).toUpperCase()}
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    drv.status === 'On Delivery'
                      ? 'bg-blue-100 text-blue-700'
                      : drv.status === 'Active'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {drv.status}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-sm">{drv.fullName}</h3>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <Phone className="w-3 h-3 text-slate-400" />
                  <span>{drv.phone}</span>
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-3 space-y-1.5 border border-slate-100 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Assigned Vehicle:</span>
                  <span className="font-bold text-slate-900">{drv.vehiclePlate}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>License No:</span>
                  <span className="font-mono text-[11px]">{drv.licenseNumber}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Courier Rating:</span>
                  <span className="font-bold text-amber-600 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400" /> {drv.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Corporate Clients View */}
      {activeTab === 'clients' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3.5 text-start">{t.accounts.companyName}</th>
                <th className="p-3.5 text-start">{t.accounts.contactPerson}</th>
                <th className="p-3.5 text-start">{t.accounts.phone}</th>
                <th className="p-3.5 text-start">{t.accounts.trn}</th>
                <th className="p-3.5 text-start">{t.masters.emirate}</th>
                <th className="p-3.5 text-start">{t.accounts.balance}</th>
                <th className="p-3.5 text-start">{t.accounts.status}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {clients.map((cli) => (
                <tr key={cli.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5">
                    <p className="font-bold text-slate-900">{cli.companyName}</p>
                    <p className="text-[11px] text-slate-400">{cli.companyNameAr}</p>
                  </td>
                  <td className="p-3.5 font-semibold text-slate-800">{cli.contactPerson}</td>
                  <td className="p-3.5 font-mono text-slate-600">{cli.phone}</td>
                  <td className="p-3.5 font-mono text-slate-500">{cli.taxNumber}</td>
                  <td className="p-3.5 text-slate-700 font-medium">{cli.emirate}</td>
                  <td className="p-3.5 font-bold text-emerald-700">AED {cli.currentBalance.toFixed(2)}</td>
                  <td className="p-3.5">
                    <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* End Customers View */}
      {activeTab === 'customers' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3.5 text-start">{t.orders.customerName}</th>
                <th className="p-3.5 text-start">{t.orders.customerPhone}</th>
                <th className="p-3.5 text-start">{t.orders.customerEmirate}</th>
                <th className="p-3.5 text-start">{t.orders.customerArea}</th>
                <th className="p-3.5 text-start">{t.orders.address}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {customers.map((cust) => (
                <tr key={cust.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5 font-bold text-slate-900">{cust.name}</td>
                  <td className="p-3.5 font-mono text-slate-700">{cust.phone}</td>
                  <td className="p-3.5 font-semibold text-emerald-700">{cust.emirate}</td>
                  <td className="p-3.5 text-slate-700">{cust.area}</td>
                  <td className="p-3.5 text-slate-600">{cust.addressLine}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* System RBAC Users View */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <h3 className="font-bold text-slate-800 text-sm">System Users & Role Access</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {systemUsers.map((usr) => (
              <div key={usr.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-full bg-[#169C47] text-white font-bold flex items-center justify-center text-xs">
                    {usr.name.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold">
                    {usr.status}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">{usr.name}</h4>
                  <p className="text-[11px] text-slate-500">{usr.email}</p>
                </div>
                <span className="inline-block text-[11px] font-bold text-emerald-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                  {usr.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
