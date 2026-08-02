'use client';

import React, { useState } from 'react';
import { useI18n } from '@/lib/i18n/I18nContext';
import { BarChart3, TrendingUp, TrendingDown, Truck, CheckCircle, XCircle, Clock } from 'lucide-react';

const dailyStats = [
  { day: 'Sun', delivered: 145, failed: 12, pending: 8 },
  { day: 'Mon', delivered: 162, failed: 15, pending: 5 },
  { day: 'Tue', delivered: 158, failed: 10, pending: 12 },
  { day: 'Wed', delivered: 175, failed: 8, pending: 3 },
  { day: 'Thu', delivered: 180, failed: 11, pending: 6 },
  { day: 'Fri', delivered: 92, failed: 5, pending: 2 },
  { day: 'Sat', delivered: 130, failed: 9, pending: 10 },
];

const driverPerformance = [
  { name: 'Ahmed Khalil', delivered: 22, failed: 1, rate: 95.7 },
  { name: 'Mohammed Ali', delivered: 20, failed: 2, rate: 90.9 },
  { name: 'Omar Hassan', delivered: 18, failed: 0, rate: 100 },
  { name: 'Saif Rashid', delivered: 15, failed: 3, rate: 83.3 },
  { name: 'Yusuf Karim', delivered: 12, failed: 1, rate: 92.3 },
];

export default function DeliveryStatisticsPage() {
  const { lang } = useI18n();

  const totalDelivered = dailyStats.reduce((s, d) => s + d.delivered, 0);
  const totalFailed = dailyStats.reduce((s, d) => s + d.failed, 0);
  const totalPending = dailyStats.reduce((s, d) => s + d.pending, 0);
  const maxBar = Math.max(...dailyStats.map((d) => d.delivered + d.failed + d.pending));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{lang === 'ar' ? 'إحصائيات التوصيل' : 'Delivery Statistics'}</h1>
        <p className="text-sm text-gray-500 mt-1">{lang === 'ar' ? 'تحليل أداء التوصيل الأسبوعي' : 'Weekly delivery performance analysis'}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: lang === 'ar' ? 'تم التوصيل' : 'Delivered', value: totalDelivered, icon: CheckCircle, color: 'bg-green-500', trend: '+12%' },
          { label: lang === 'ar' ? 'فاشل' : 'Failed', value: totalFailed, icon: XCircle, color: 'bg-red-500', trend: '-5%' },
          { label: lang === 'ar' ? 'قيد الانتظار' : 'Pending', value: totalPending, icon: Clock, color: 'bg-amber-500', trend: '-8%' },
          { label: lang === 'ar' ? 'نسبة النجاح' : 'Success Rate', value: ((totalDelivered / (totalDelivered + totalFailed)) * 100).toFixed(1) + '%', icon: TrendingUp, color: 'bg-blue-500', trend: '+2%' },
        ].map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className={`${kpi.color} text-white p-2.5 rounded-xl`}><Icon className="w-5 h-5" /></div>
                <span className={`text-xs font-bold ${kpi.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{kpi.trend}</span>
              </div>
              <p className="text-3xl font-black text-gray-900">{kpi.value}</p>
              <p className="text-sm text-gray-500 mt-1">{kpi.label}</p>
            </div>
          );
        })}
      </div>

      {/* Chart - CSS bar chart */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">{lang === 'ar' ? 'الأداء اليومي' : 'Daily Performance'}</h2>
        <div className="flex items-end gap-3 h-52">
          {dailyStats.map((d, i) => {
            const total = d.delivered + d.failed + d.pending;
            const hPct = (total / maxBar) * 100;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs font-bold text-gray-700">{total}</span>
                <div className="w-full rounded-t-lg overflow-hidden" style={{ height: `${hPct}%` }}>
                  <div className="bg-green-400 w-full" style={{ height: `${(d.delivered / total) * 100}%` }} />
                  <div className="bg-red-400 w-full" style={{ height: `${(d.failed / total) * 100}%` }} />
                  <div className="bg-amber-400 w-full" style={{ height: `${(d.pending / total) * 100}%` }} />
                </div>
                <span className="text-xs text-gray-500 font-medium">{d.day}</span>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-6 mt-4 justify-center">
          <span className="flex items-center gap-1.5 text-xs"><span className="w-3 h-3 rounded bg-green-400" /> {lang === 'ar' ? 'تم التوصيل' : 'Delivered'}</span>
          <span className="flex items-center gap-1.5 text-xs"><span className="w-3 h-3 rounded bg-red-400" /> {lang === 'ar' ? 'فاشل' : 'Failed'}</span>
          <span className="flex items-center gap-1.5 text-xs"><span className="w-3 h-3 rounded bg-amber-400" /> {lang === 'ar' ? 'قيد الانتظار' : 'Pending'}</span>
        </div>
      </div>

      {/* Driver Performance Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">{lang === 'ar' ? 'أداء السائقين اليوم' : "Today's Driver Performance"}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-5 py-3 text-start text-xs font-semibold text-gray-500 uppercase">{lang === 'ar' ? 'السائق' : 'Driver'}</th>
                <th className="px-5 py-3 text-start text-xs font-semibold text-gray-500 uppercase">{lang === 'ar' ? 'تم التوصيل' : 'Delivered'}</th>
                <th className="px-5 py-3 text-start text-xs font-semibold text-gray-500 uppercase">{lang === 'ar' ? 'فاشل' : 'Failed'}</th>
                <th className="px-5 py-3 text-start text-xs font-semibold text-gray-500 uppercase">{lang === 'ar' ? 'نسبة النجاح' : 'Rate'}</th>
                <th className="px-5 py-3 text-start text-xs font-semibold text-gray-500 uppercase">{lang === 'ar' ? 'الأداء' : 'Performance'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {driverPerformance.map((dp, i) => (
                <tr key={i} className="hover:bg-gray-50/50">
                  <td className="px-5 py-3.5 font-semibold text-gray-900">{dp.name}</td>
                  <td className="px-5 py-3.5 text-green-600 font-bold">{dp.delivered}</td>
                  <td className="px-5 py-3.5 text-red-600 font-bold">{dp.failed}</td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${dp.rate >= 95 ? 'bg-green-100 text-green-700' : dp.rate >= 90 ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                      {dp.rate}%
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${dp.rate >= 95 ? 'bg-green-500' : dp.rate >= 90 ? 'bg-blue-500' : 'bg-amber-500'}`} style={{ width: `${dp.rate}%` }} />
                    </div>
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
