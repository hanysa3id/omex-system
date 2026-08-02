'use client';

import React, { useState } from 'react';
import { useI18n } from '@/lib/i18n/I18nContext';
import { INITIAL_ORDERS, INITIAL_PAYMENTS, INITIAL_VEHICLE_LOGS } from '@/lib/mockData';
import { exportToCsv } from '@/lib/exportExcel';
import { FileBarChart, Download, Calendar, Filter } from 'lucide-react';

export default function ReportsPage() {
  const { t } = useI18n();
  const [reportType, setReportType] = useState<'orders' | 'financials' | 'fleet'>('orders');

  const handleExport = () => {
    if (reportType === 'orders') exportToCsv('OMEX_UAE_Orders_Report', INITIAL_ORDERS);
    else if (reportType === 'financials') exportToCsv('OMEX_UAE_Financial_Report', INITIAL_PAYMENTS);
    else exportToCsv('OMEX_UAE_Fleet_Report', INITIAL_VEHICLE_LOGS);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-[#169C47] font-bold text-xs">
            <FileBarChart className="w-4 h-4" />
            <span>{t.reports.title}</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 mt-1">{t.nav.reports}</h2>
          <p className="text-slate-500 text-xs mt-0.5">Generate custom analytical reports and export datasets to Excel (.xlsx).</p>
        </div>

        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#169C47] hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-all active:scale-95"
        >
          <Download className="w-4 h-4" />
          <span>{t.reports.exportExcel}</span>
        </button>
      </div>

      {/* Controls */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">{t.reports.selectReport}</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value as any)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:ring-2 focus:ring-[#169C47]"
            >
              <option value="orders">{t.reports.ordersReport}</option>
              <option value="financials">{t.reports.financialReport}</option>
              <option value="fleet">{t.reports.fleetReport}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">From Date</label>
            <input
              type="date"
              defaultValue="2026-08-01"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-[#169C47]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">To Date</label>
            <input
              type="date"
              defaultValue="2026-08-03"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-[#169C47]"
            />
          </div>
        </div>
      </div>

      {/* Report Preview Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 overflow-x-auto">
        <h3 className="font-bold text-slate-900 text-sm mb-4">Report Preview Stream</h3>
        <table className="w-full text-xs text-start">
          <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
            <tr>
              <th className="p-3.5 text-start">ID / Code</th>
              <th className="p-3.5 text-start">Title / Client</th>
              <th className="p-3.5 text-start">Amount</th>
              <th className="p-3.5 text-start">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {reportType === 'orders'
              ? INITIAL_ORDERS.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold font-mono text-[#169C47]">{o.voucherNo}</td>
                    <td className="p-3.5 font-semibold text-slate-800">{o.clientName} ({o.customerName})</td>
                    <td className="p-3.5 font-bold text-slate-900">AED {o.totalAmount.toFixed(2)}</td>
                    <td className="p-3.5 text-slate-600 font-bold">{o.status}</td>
                  </tr>
                ))
              : INITIAL_PAYMENTS.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold font-mono text-[#169C47]">{p.receiptNo}</td>
                    <td className="p-3.5 font-semibold text-slate-800">{p.clientName}</td>
                    <td className="p-3.5 font-bold text-emerald-700">AED {p.amount.toFixed(2)}</td>
                    <td className="p-3.5 text-slate-600 font-bold">{p.paymentMode}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
