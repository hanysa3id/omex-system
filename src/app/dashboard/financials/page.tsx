'use client';

import React, { useState } from 'react';
import { useI18n } from '@/lib/i18n/I18nContext';
import { INITIAL_PAYMENTS, INITIAL_CLIENTS } from '@/lib/mockData';
import { Payment } from '@/types';
import { exportToCsv } from '@/lib/exportExcel';
import { Wallet, Plus, Download, DollarSign, Building2, CreditCard } from 'lucide-react';

export default function FinancialsPage() {
  const { t } = useI18n();
  const [payments, setPayments] = useState<Payment[]>(INITIAL_PAYMENTS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [clientId, setClientId] = useState(INITIAL_CLIENTS[0].id);
  const [amount, setAmount] = useState('1500');
  const [paymentMode, setPaymentMode] = useState<'Cash' | 'Bank Transfer' | 'Cheque' | 'Credit Card'>('Bank Transfer');
  const [refNo, setRefNo] = useState('FT-ENBD-88401');

  const handleAddPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const cli = INITIAL_CLIENTS.find((c) => c.id === clientId);
    const newPay: Payment = {
      id: `pay-${Date.now()}`,
      receiptNo: `RCT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      clientId,
      clientName: cli?.companyName || 'Corporate Client',
      amount: parseFloat(amount) || 0,
      paymentMode,
      referenceNo: refNo,
      paymentDate: new Date().toISOString().slice(0, 10),
    };

    setPayments([newPay, ...payments]);
    setIsModalOpen(false);
  };

  const handleExport = () => {
    exportToCsv('OMEX_UAE_Financial_Ledger', payments);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-[#169C47] font-bold text-xs">
            <Wallet className="w-4 h-4" />
            <span>{t.financials.title}</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 mt-1">{t.nav.financials}</h2>
          <p className="text-slate-500 text-xs mt-0.5">Corporate client settlements, driver COD collections, and bank receipts.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all border border-slate-200"
          >
            <Download className="w-4 h-4" />
            <span>{t.reports.exportExcel}</span>
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#169C47] hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>{t.financials.createPayment}</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase">{t.financials.clientLedger}</p>
            <h3 className="text-xl font-black text-slate-900 mt-1">AED 6,500.00</h3>
            <span className="text-[11px] font-bold text-emerald-600">Settled this week</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#169C47] flex items-center justify-center font-bold">
            <Wallet className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase">{t.financials.codCollections}</p>
            <h3 className="text-xl font-black text-slate-900 mt-1">AED 14,280.00</h3>
            <span className="text-[11px] font-bold text-blue-600">Collected by Couriers</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase">Pending Client Receivables</p>
            <h3 className="text-xl font-black text-slate-900 mt-1">AED 8,420.00</h3>
            <span className="text-[11px] font-bold text-amber-600">Outstanding Balance</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
            <CreditCard className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden p-6 space-y-4">
        <h3 className="font-bold text-slate-900 text-sm">Payment Receipts & Settlements</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3.5 text-start">Receipt No</th>
                <th className="p-3.5 text-start">{t.orders.client}</th>
                <th className="p-3.5 text-start">{t.financials.amount}</th>
                <th className="p-3.5 text-start">{t.financials.paymentMode}</th>
                <th className="p-3.5 text-start">{t.financials.referenceNo}</th>
                <th className="p-3.5 text-start">Payment Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payments.map((pay) => (
                <tr key={pay.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5 font-bold text-[#169C47] font-mono">{pay.receiptNo}</td>
                  <td className="p-3.5 font-bold text-slate-900">{pay.clientName}</td>
                  <td className="p-3.5 font-black text-emerald-700">AED {pay.amount.toFixed(2)}</td>
                  <td className="p-3.5">
                    <span className="px-2.5 py-0.5 bg-slate-100 text-slate-800 rounded font-bold text-[10px]">
                      {pay.paymentMode}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono text-slate-600">{pay.referenceNo}</td>
                  <td className="p-3.5 text-slate-500 font-medium">{pay.paymentDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Payment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <form onSubmit={handleAddPayment} className="bg-white rounded-2xl p-6 shadow-2xl border border-slate-200 w-full max-w-md space-y-4">
            <h3 className="font-bold text-slate-900 text-base">{t.financials.createPayment}</h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t.orders.client}</label>
              <select
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#169C47] outline-none"
              >
                {INITIAL_CLIENTS.map((cli) => (
                  <option key={cli.id} value={cli.id}>
                    {cli.companyName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t.financials.amount}</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#169C47] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t.financials.paymentMode}</label>
              <select
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#169C47] outline-none"
              >
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Cash">Cash</option>
                <option value="Cheque">Cheque</option>
                <option value="Credit Card">Credit Card</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t.financials.referenceNo}</label>
              <input
                type="text"
                value={refNo}
                onChange={(e) => setRefNo(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#169C47] outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
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
