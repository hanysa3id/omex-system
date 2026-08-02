'use client';

import React, { useState } from 'react';
import { useI18n } from '@/lib/i18n/I18nContext';
import { INITIAL_ORDERS } from '@/lib/mockData';
import { Repeat, Clock, CheckCircle2, RotateCcw, Send, AlertCircle } from 'lucide-react';

export default function OperationsPage() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<'pickup' | 'delivery' | 'returns' | 'push'>('pickup');
  const [orders] = useState(INITIAL_ORDERS);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-[#169C47] font-bold text-xs">
            <Repeat className="w-4 h-4" />
            <span>{t.operations.title}</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 mt-1">{t.nav.operations}</h2>
          <p className="text-slate-500 text-xs mt-0.5">{t.operations.subTitle}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2 bg-white px-4 pt-3 rounded-2xl border">
        <button
          onClick={() => setActiveTab('pickup')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all ${
            activeTab === 'pickup'
              ? 'border-[#169C47] text-[#169C47]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>{t.operations.pickupFollowup}</span>
        </button>
        <button
          onClick={() => setActiveTab('delivery')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all ${
            activeTab === 'delivery'
              ? 'border-[#169C47] text-[#169C47]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{t.operations.deliveryFollowup}</span>
        </button>
        <button
          onClick={() => setActiveTab('returns')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all ${
            activeTab === 'returns'
              ? 'border-[#169C47] text-[#169C47]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>{t.operations.returnFollowup}</span>
        </button>
        <button
          onClick={() => setActiveTab('push')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all ${
            activeTab === 'push'
              ? 'border-[#169C47] text-[#169C47]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Send className="w-4 h-4" />
          <span>{t.operations.pushOrder}</span>
        </button>
      </div>

      {/* Content Stream */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-sm">
          {activeTab === 'pickup'
            ? 'Pending Pickups Stream'
            : activeTab === 'delivery'
            ? 'Live Deliveries En-Route'
            : activeTab === 'returns'
            ? 'Returned & Exchange Orders'
            : 'Re-route / Push Orders to Hub'}
        </h3>

        <div className="space-y-3">
          {orders.map((ord) => (
            <div
              key={ord.id}
              className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#169C47] font-bold flex items-center justify-center text-xs">
                  {ord.voucherNo.slice(-3)}
                </div>
                <div>
                  <span className="font-mono font-bold text-xs text-[#169C47]">{ord.voucherNo}</span>
                  <h4 className="font-bold text-slate-900 text-xs">{ord.customerName} - {ord.emirate}</h4>
                  <p className="text-[11px] text-slate-500">{ord.clientName}</p>
                </div>
              </div>

              <div className="text-end space-y-1">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                  {ord.status}
                </span>
                <p className="text-xs font-bold text-slate-900">AED {ord.totalAmount.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
