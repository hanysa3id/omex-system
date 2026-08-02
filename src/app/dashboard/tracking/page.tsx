'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useI18n } from '@/lib/i18n/I18nContext';
import { INITIAL_ORDERS, INITIAL_DRIVERS } from '@/lib/mockData';
import { Order } from '@/types';
import EmiratesMap from '@/components/dashboard/EmiratesMap';
import { MapPin, Search, CheckCircle2, Clock, Truck, ShieldCheck, UserCheck } from 'lucide-react';

function TrackingContent() {
  const { t } = useI18n();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(
    INITIAL_ORDERS.find(
      (o) =>
        o.voucherNo.toLowerCase() === initialQuery.toLowerCase() ||
        o.customerPhone.includes(initialQuery)
    ) || INITIAL_ORDERS[0]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = INITIAL_ORDERS.find(
      (o) =>
        o.voucherNo.toLowerCase().includes(query.toLowerCase()) ||
        o.billNo.toLowerCase().includes(query.toLowerCase()) ||
        o.customerPhone.includes(query)
    );
    setSearchedOrder(found || null);
  };

  const steps = [
    { title: 'Voucher Created', date: '08:30 AM', done: true },
    { title: 'Courier Pickup', date: '09:15 AM', done: true },
    { title: 'In Transit Hub', date: '10:45 AM', done: true },
    { title: 'Out for Delivery', date: '11:30 AM', done: searchedOrder?.status === 'Out for Delivery' || searchedOrder?.status === 'Delivered' },
    { title: 'Delivered & Signed', date: 'Pending', done: searchedOrder?.status === 'Delivered' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Search */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-[#169C47] font-bold text-xs">
          <MapPin className="w-4 h-4" />
          <span>{t.nav.tracking}</span>
        </div>
        <h2 className="text-xl font-black text-slate-900">{t.nav.publicTrack}</h2>

        <form onSubmit={handleSearch} className="flex gap-3 max-w-xl">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter Voucher No (e.g. VCH-2026-00101) or Mobile Phone..."
              className="w-full ps-10 pe-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:ring-2 focus:ring-[#169C47] outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#169C47] text-white font-bold text-xs rounded-xl shadow-md"
          >
            Track Voucher
          </button>
        </form>
      </div>

      {searchedOrder ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Timeline View */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="font-mono font-bold text-sm text-[#169C47]">{searchedOrder.voucherNo}</span>
                <h3 className="font-bold text-slate-900 text-base mt-0.5">{searchedOrder.customerName}</h3>
                <p className="text-xs text-slate-500">{searchedOrder.addressLine}, {searchedOrder.emirate}</p>
              </div>
              <div className="mt-2 sm:mt-0 text-start sm:text-end">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
                  {searchedOrder.status}
                </span>
                <p className="text-xs font-bold text-slate-900 mt-1">AED {searchedOrder.totalAmount.toFixed(2)}</p>
              </div>
            </div>

            {/* Stepper */}
            <div className="py-4">
              <h4 className="font-bold text-xs text-slate-500 uppercase mb-6">Delivery Progress Timeline</h4>
              <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                {steps.map((step, idx) => (
                  <div key={step.title} className="flex md:flex-col items-center gap-3 relative z-10">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shadow-xs ${
                        step.done
                          ? 'bg-[#169C47] text-white'
                          : 'bg-slate-100 text-slate-400 border border-slate-200'
                      }`}
                    >
                      {step.done ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                    </div>
                    <div className="text-start md:text-center">
                      <p className={`text-xs font-bold ${step.done ? 'text-slate-900' : 'text-slate-400'}`}>
                        {step.title}
                      </p>
                      <p className="text-[10px] text-slate-400 font-semibold">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Map */}
            <div>
              <h4 className="font-bold text-xs text-slate-500 uppercase mb-3">Live Courier GPS Pin</h4>
              <EmiratesMap />
            </div>
          </div>

          {/* Courier Telemetry Side Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Assigned Courier</h3>
            <div className="bg-slate-50 p-4 rounded-xl space-y-3 border border-slate-100 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#169C47] font-bold flex items-center justify-center">
                  ZA
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{searchedOrder.deliveryDriverName || 'Zayd Al-Farsi'}</h4>
                  <p className="text-[11px] text-slate-500">Courier ID: DRV-992</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 space-y-1.5 text-slate-600">
                <div className="flex justify-between">
                  <span>Vehicle:</span>
                  <span className="font-bold text-slate-900">Dubai I-67482</span>
                </div>
                <div className="flex justify-between">
                  <span>Contact:</span>
                  <span className="font-mono">+971 50 444 1122</span>
                </div>
                <div className="flex justify-between">
                  <span>ETA to Recipient:</span>
                  <span className="font-bold text-emerald-700">18 Minutes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-2">
          <p className="font-bold text-slate-700 text-sm">No Voucher Found matching "{query}"</p>
          <p className="text-xs text-slate-400">Please verify the voucher number and try again.</p>
        </div>
      )}
    </div>
  );
}

export default function TrackingPage() {
  return (
    <React.Suspense fallback={<div className="p-6 text-xs font-bold text-slate-500">Loading Order Tracker...</div>}>
      <TrackingContent />
    </React.Suspense>
  );
}
