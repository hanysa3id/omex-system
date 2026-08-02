'use client';

import React, { useState } from 'react';
import { useI18n } from '@/lib/i18n/I18nContext';
import { INITIAL_ORDERS, INITIAL_DRIVERS } from '@/lib/mockData';
import { Order, Driver } from '@/types';
import { Grid3X3, Truck, UserCheck, ArrowRight, CheckCircle } from 'lucide-react';

export default function DeliveryAllocationPage() {
  const { t } = useI18n();
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [drivers] = useState<Driver[]>(INITIAL_DRIVERS);
  const [selectedDriverId, setSelectedDriverId] = useState(INITIAL_DRIVERS[0].id);

  const unallocatedOrders = orders.filter((o) => !o.deliveryDriverId || o.status === 'Pickup Scheduled');

  const assignDriverToOrder = (orderId: string) => {
    const drv = drivers.find((d) => d.id === selectedDriverId);
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              deliveryDriverId: drv?.id,
              deliveryDriverName: drv?.fullName,
              status: 'Out for Delivery',
            }
          : o
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-[#169C47] font-bold text-xs">
            <Grid3X3 className="w-4 h-4" />
            <span>{t.operations.title}</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 mt-1">{t.operations.allocationGrid}</h2>
          <p className="text-slate-500 text-xs mt-0.5">Assign pending vouchers to active UAE couriers.</p>
        </div>

        {/* Driver Selector */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-700">Select Target Driver:</span>
          <select
            value={selectedDriverId}
            onChange={(e) => setSelectedDriverId(e.target.value)}
            className="p-2.5 bg-emerald-50 border border-emerald-200 text-[#169C47] font-bold rounded-xl text-xs outline-none"
          >
            {drivers.map((drv) => (
              <option key={drv.id} value={drv.id}>
                {drv.fullName} ({drv.emirate})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid of Unallocated Vouchers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((ord) => (
          <div
            key={ord.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3 relative hover:border-emerald-300 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-xs text-[#169C47] bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                {ord.voucherNo}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 rounded-md text-slate-700">
                {ord.emirate}
              </span>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-sm">{ord.customerName}</h4>
              <p className="text-xs text-slate-500">{ord.addressLine}, {ord.area}</p>
            </div>

            <div className="bg-slate-50 rounded-xl p-3 text-xs space-y-1">
              <div className="flex justify-between text-slate-600">
                <span>Client:</span>
                <span className="font-semibold text-slate-900">{ord.clientName}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Assigned Courier:</span>
                <span className="font-bold text-blue-700">{ord.deliveryDriverName || 'Unassigned'}</span>
              </div>
            </div>

            <button
              onClick={() => assignDriverToOrder(ord.id)}
              className="w-full py-2 bg-[#169C47] hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95"
            >
              <UserCheck className="w-4 h-4" />
              <span>Assign to {drivers.find((d) => d.id === selectedDriverId)?.fullName.split(' ')[0]}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
