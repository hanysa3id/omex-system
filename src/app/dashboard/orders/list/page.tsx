'use client';

import React, { useState } from 'react';
import { useI18n } from '@/lib/i18n/I18nContext';
import { INITIAL_ORDERS } from '@/lib/mockData';
import { Order } from '@/types';
import { exportToCsv } from '@/lib/exportExcel';
import {
  PackageCheck,
  Search,
  Printer,
  PauseCircle,
  RotateCcw,
  Download,
  PlusCircle,
  Eye,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useData } from '@/lib/context/DataContext';

export default function OrderListPage() {
  const { t, lang } = useI18n();
  const { orders, toggleHoldOrder, reverseCancelOrder, updateOrderStatus } = useData();
  const router = useRouter();
  const isAr = lang === 'ar';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  
  // Print Modal
  const [printModalOrder, setPrintModalOrder] = useState<Order | null>(null);
  const [isBatchPrintOpen, setIsBatchPrintOpen] = useState(false);

  const filteredOrders = orders.filter((ord) => {
    const matchesSearch =
      ord.voucherNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.billNo.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus === 'All' || ord.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const toggleSelectOrder = (id: string) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map((o) => o.id));
    }
  };

  const handleHoldOrder = (id: string) => {
    toggleHoldOrder(id);
  };

  const handleReverseCancel = (id: string) => {
    reverseCancelOrder(id);
  };

  const handleExportExcel = () => {
    exportToCsv('OMEX_UAE_Orders_Registry', filteredOrders);
  };

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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-[#352F7A] font-bold text-xs">
            <PackageCheck className="w-4 h-4 text-[#E87722]" />
            <span>{t.orders.title}</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 mt-1">{t.nav.orderList}</h2>
          <p className="text-slate-500 text-xs mt-0.5">
            {isAr ? 'تصفية الطرود، تجميد/إلغاء الطلبات وطباعة البوالص مجمعة' : 'Filter vouchers, hold/reverse orders, and batch print delivery notes.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {selectedOrders.length > 0 && (
            <button
              onClick={() => setIsBatchPrintOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>{t.orders.batchPrint} ({selectedOrders.length})</span>
            </button>
          )}
          <button
            onClick={handleExportExcel}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all border border-slate-200"
          >
            <Download className="w-4 h-4" />
            <span>{t.reports.exportExcel}</span>
          </button>
          <Link
            href="/dashboard/orders/create"
            className="flex items-center gap-2 px-4 py-2 bg-[#E87722] hover:bg-[#D46615] text-white rounded-xl text-xs font-bold shadow-md transition-all active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t.orders.createTitle}</span>
          </Link>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.orders.filterOrders}
            className="w-full ps-10 pe-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#352F7A] outline-none"
          />
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {['All', 'Pickup Scheduled', 'In Transit', 'Out for Delivery', 'Delivered', 'On Hold'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedStatus === st
                  ? 'bg-[#352F7A] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st === 'All' ? (isAr ? 'الكل' : 'All') : st}
            </button>
          ))}
        </div>
      </div>

      {/* Datatable */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3.5 text-start w-10">
                  <input
                    type="checkbox"
                    checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 text-[#169C47] rounded focus:ring-[#169C47]"
                  />
                </th>
                <th className="p-3.5 text-start">{t.orders.voucherNo}</th>
                <th className="p-3.5 text-start">{t.orders.client}</th>
                <th className="p-3.5 text-start">{t.orders.customerName}</th>
                <th className="p-3.5 text-start">{t.orders.customerEmirate}</th>
                <th className="p-3.5 text-start">{t.orders.payType}</th>
                <th className="p-3.5 text-start">{t.orders.totalAmount}</th>
                <th className="p-3.5 text-start">{t.accounts.status}</th>
                <th className="p-3.5 text-start">{t.accounts.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5">
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(ord.id)}
                      onChange={() => toggleSelectOrder(ord.id)}
                      className="w-4 h-4 text-[#169C47] rounded focus:ring-[#169C47]"
                    />
                  </td>
                  <td className="p-3.5">
                    <Link
                      href="/dashboard/orders/details"
                      className="font-bold text-[#169C47] font-mono hover:underline block"
                    >
                      {ord.voucherNo}
                    </Link>
                    <p className="text-[10px] text-slate-400 font-mono">{ord.billNo}</p>
                  </td>
                  <td className="p-3.5 font-bold text-slate-900">{ord.clientName}</td>
                  <td className="p-3.5 text-slate-700">
                    <p className="font-semibold">{ord.customerName}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{ord.customerPhone}</p>
                  </td>
                  <td className="p-3.5 font-semibold text-slate-800">
                    {ord.emirate} ({ord.area})
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded font-bold text-[10px]">
                      {ord.payType}
                    </span>
                  </td>
                  <td className="p-3.5 font-bold text-slate-900">AED {ord.totalAmount.toFixed(2)}</td>
                  <td className="p-3.5">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusBadge(
                        ord.status
                      )}`}
                    >
                      {ord.status}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <div className="flex items-center gap-2">
                      {/* Status Change Selector Dropdown */}
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                        className="text-[11px] font-bold p-1 bg-slate-50 border border-slate-200 rounded-lg outline-none cursor-pointer focus:ring-2 focus:ring-[#352F7A]"
                      >
                        <option value="Pickup Scheduled">{isAr ? 'مجدول للاستلام' : 'Pickup Scheduled'}</option>
                        <option value="In Transit">{isAr ? 'في الطريق' : 'In Transit'}</option>
                        <option value="Out for Delivery">{isAr ? 'خرج للتوصيل' : 'Out for Delivery'}</option>
                        <option value="Delivered">{isAr ? 'تم التسليم' : 'Delivered'}</option>
                        <option value="On Hold">{isAr ? 'تجميد الطلب' : 'On Hold'}</option>
                        <option value="Cancelled">{isAr ? 'إلغاء الطلب' : 'Cancelled'}</option>
                      </select>

                      <Link
                        href="/dashboard/orders/details"
                        className="p-1.5 text-slate-500 hover:text-indigo-600 rounded-lg hover:bg-indigo-50"
                        title={isAr ? 'عرض التفاصيل' : 'View Details'}
                      >
                        <Eye className="w-4 h-4 text-[#352F7A]" />
                      </Link>
                      <button
                        onClick={() => setPrintModalOrder(ord)}
                        className="p-1.5 text-slate-500 hover:text-orange-600 rounded-lg hover:bg-orange-50 cursor-pointer"
                        title={t.orders.printNote}
                      >
                        <Printer className="w-4 h-4 text-[#E87722]" />
                      </button>
                      <button
                        onClick={() => handleHoldOrder(ord.id)}
                        className={`p-1.5 rounded-lg cursor-pointer ${
                          ord.isOnHold
                            ? 'text-purple-600 bg-purple-50'
                            : 'text-slate-400 hover:text-purple-600 hover:bg-purple-50'
                        }`}
                        title={t.orders.holdOrder}
                      >
                        <PauseCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Single Delivery Note Printable Modal (Bilingual AR / EN) */}
      {printModalOrder && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 shadow-2xl border border-slate-200 w-full max-w-2xl printable-area">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4 no-print">
              <h3 className="font-bold text-slate-900 text-sm">
                {isAr ? 'طباعة بوليصة التوصيل' : 'Print Delivery Voucher Note'}
              </h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-[#169C47] text-white text-xs font-bold rounded-xl flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Printer className="w-4 h-4" />
                  <span>{isAr ? 'طباعة الآن' : 'Print Now'}</span>
                </button>
                <button onClick={() => setPrintModalOrder(null)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Content Voucher - Translates based on active language */}
            <div className="space-y-4 border-2 border-slate-800 p-6 rounded-xl bg-white text-slate-900">
              <div className="flex justify-between items-start border-b-2 border-slate-800 pb-4">
                <div>
                  <h1 className="text-2xl font-black text-[#169C47]">OMEX EXPRESS UAE</h1>
                  <p className="text-xs text-slate-500 font-bold">
                    {isAr ? 'بوليصة توصيل رسمية' : 'Official Delivery Voucher Note'}
                  </p>
                </div>
                <div className="text-end">
                  <p className="font-mono font-bold text-lg text-[#169C47]">{printModalOrder.voucherNo}</p>
                  <p className="text-xs text-slate-500">{isAr ? 'التاريخ:' : 'Date:'} {printModalOrder.deliveryDate}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs border-b border-slate-200 pb-4">
                <div>
                  <p className="font-bold text-slate-500 uppercase">{isAr ? 'العميل (الراسل):' : 'Sender Client:'}</p>
                  <p className="font-bold text-sm text-slate-900">{printModalOrder.clientName}</p>
                  <p className="text-slate-600">{isAr ? 'المرجع:' : 'Ref:'} {printModalOrder.refNo}</p>
                </div>
                <div>
                  <p className="font-bold text-slate-500 uppercase">{isAr ? 'الزبون (المستلم):' : 'Recipient Customer:'}</p>
                  <p className="font-bold text-sm text-slate-900">{printModalOrder.customerName}</p>
                  <p className="text-slate-700 font-mono">{printModalOrder.customerPhone}</p>
                  <p className="text-slate-600">{printModalOrder.addressLine}, {printModalOrder.emirate}</p>
                </div>
              </div>

              <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl font-bold text-xs">
                <div>
                  <span>{isAr ? 'نوع الدفع: ' : 'Pay Type: '}</span>
                  <span className="text-[#169C47]">{printModalOrder.payType}</span>
                </div>
                <div>
                  <span>{isAr ? 'إجمالي المبلغ (شامل 5% ضريبة): ' : 'Total Amount (Inc. 5% VAT): '}</span>
                  <span className="text-sm text-[#169C47]">AED {printModalOrder.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Batch Print Modal */}
      {isBatchPrintOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 shadow-2xl border border-slate-200 w-full max-w-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-bold text-slate-900 text-sm">
                {isAr ? `طباعة فواتير مجمعة (${selectedOrders.length} طلبات)` : `Batch Invoice Printer (${selectedOrders.length} Orders)`}
              </h3>
              <button onClick={() => setIsBatchPrintOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-600">
              {isAr ? 'جاري توليد البوالص والملصقات الحرارية المجمعة للطلبات المحددة.' : 'Generating bulk thermal labels and delivery notes for selected vouchers.'}
            </p>
            <div className="flex justify-end gap-3 pt-3">
              <button
                onClick={() => setIsBatchPrintOpen(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
              >
                {isAr ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                onClick={() => {
                  window.print();
                  setIsBatchPrintOpen(false);
                }}
                className="px-5 py-2 bg-[#169C47] text-white font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Printer className="w-4 h-4" />
                <span>{isAr ? 'طباعة جميع المحدد' : 'Print All Selected'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
