'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n/I18nContext';
import EmiratesMap from '@/components/dashboard/EmiratesMap';
import { INITIAL_ORDERS, INITIAL_DRIVERS, INITIAL_CLIENTS } from '@/lib/mockData';
import {
  PackageCheck,
  Users,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  ArrowUpRight,
  PlusCircle,
  Calendar,
} from 'lucide-react';
import Link from 'next/link';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

export default function DashboardPage() {
  const { t } = useI18n();

  // Status donut data
  const statusData = [
    { name: 'Delivered', value: 340, color: '#169C47' },
    { name: 'In Transit', value: 120, color: '#3b82f6' },
    { name: 'Out for Delivery', value: 85, color: '#06b6d4' },
    { name: 'Pending Pickup', value: 64, color: '#f59e0b' },
    { name: 'On Hold', value: 22, color: '#8b5cf6' },
    { name: 'Returned', value: 18, color: '#ef4444' },
  ];

  // Top clients horizontal data
  const topClientsData = INITIAL_CLIENTS.map((cli) => ({
    name: cli.companyName,
    orders: Math.floor(Math.random() * 200) + 120,
  }));

  // Emirates distribution
  const emirateData = [
    { emirate: 'Dubai', orders: 480 },
    { emirate: 'Abu Dhabi', orders: 290 },
    { emirate: 'Sharjah', orders: 160 },
    { emirate: 'Ajman', orders: 75 },
    { emirate: 'RAK', orders: 45 },
    { emirate: 'Fujairah', orders: 30 },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Out for Delivery':
        return 'bg-cyan-100 text-cyan-800 border-cyan-300';
      case 'In Transit':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'On Hold':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Returned':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      default:
        return 'bg-amber-100 text-amber-800 border-amber-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#169C47] to-emerald-700 p-6 rounded-2xl text-white shadow-lg">
        <div>
          <h2 className="text-2xl font-black tracking-tight">{t.nav.dashboard}</h2>
          <p className="text-emerald-100 text-xs sm:text-sm mt-1">
            Real-time UAE delivery metrics, driver telemetry, and voucher status overview.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/orders/create"
            className="flex items-center gap-2 px-4 py-2.5 bg-white text-[#169C47] hover:bg-emerald-50 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t.orders.createTitle}</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.kpi.totalOrders}</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">1,489</h3>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 mt-1">
              <TrendingUp className="w-3 h-3" /> +12.4% vs last month
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#169C47] flex items-center justify-center">
            <PackageCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.kpi.completedToday}</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">142</h3>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 mt-1">
              <CheckCircle2 className="w-3 h-3" /> 94% on-time delivery
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.kpi.pendingOrders}</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">86</h3>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 mt-1">
              <Clock className="w-3 h-3" /> Active couriers en-route
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.kpi.revenue}</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">AED 48,250</h3>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 mt-1">
              <TrendingUp className="w-3 h-3" /> 5% VAT inclusive
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Analytics Grid: Charts & Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Delivery Status Donut Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 text-sm">{t.dashboard.deliveryStatusChart}</h3>
            <span className="text-[11px] font-bold text-slate-400">August 2026</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-100 text-xs">
            {statusData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-slate-600 text-[11px] truncate">{item.name}:</span>
                <span className="font-bold text-slate-900 text-[11px]">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Clients Horizontal Bar Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 text-sm">{t.dashboard.topClientsChart}</h3>
            <Link href="/dashboard/accounts" className="text-xs font-bold text-[#169C47] hover:underline">
              {t.dashboard.viewAll}
            </Link>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={topClientsData} margin={{ left: 10, right: 10 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={110} tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="orders" fill="#169C47" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* UAE Interactive Delivery Map */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 text-sm">{t.dashboard.emiratesMap}</h3>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              Live GPS Pins
            </span>
          </div>
          <EmiratesMap />
        </div>
      </div>

      {/* Emirates Breakdown & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 text-sm">{t.dashboard.recentOrders}</h3>
            <Link
              href="/dashboard/orders/list"
              className="text-xs font-bold text-[#169C47] hover:underline flex items-center gap-1"
            >
              <span>{t.dashboard.viewAll}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3 text-start">{t.orders.voucherNo}</th>
                  <th className="p-3 text-start">{t.orders.client}</th>
                  <th className="p-3 text-start">{t.orders.customerName}</th>
                  <th className="p-3 text-start">{t.orders.customerEmirate}</th>
                  <th className="p-3 text-start">{t.orders.totalAmount}</th>
                  <th className="p-3 text-start">{t.accounts.status}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {INITIAL_ORDERS.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 font-bold text-[#169C47]">{ord.voucherNo}</td>
                    <td className="p-3 font-medium text-slate-800">{ord.clientName}</td>
                    <td className="p-3 text-slate-600">{ord.customerName}</td>
                    <td className="p-3 text-slate-600 font-semibold">{ord.emirate}</td>
                    <td className="p-3 font-bold text-slate-900">AED {ord.totalAmount.toFixed(2)}</td>
                    <td className="p-3">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusBadge(
                          ord.status
                        )}`}
                      >
                        {ord.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Drivers Summary */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 text-sm">{t.dashboard.driversSummary}</h3>
              <Link href="/dashboard/accounts" className="text-xs font-bold text-[#169C47] hover:underline">
                {t.dashboard.viewAll}
              </Link>
            </div>

            <div className="space-y-3">
              {INITIAL_DRIVERS.map((drv) => (
                <div
                  key={drv.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#169C47] font-bold flex items-center justify-center text-xs">
                      {drv.fullName.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">{drv.fullName}</p>
                      <p className="text-[11px] text-slate-500">{drv.vehiclePlate}</p>
                    </div>
                  </div>
                  <div className="text-end">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        drv.status === 'On Delivery'
                          ? 'bg-blue-100 text-blue-700'
                          : drv.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {drv.status}
                    </span>
                    <p className="text-[10px] font-semibold text-slate-400 mt-0.5">
                      {drv.completedTodayCount} done today
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
