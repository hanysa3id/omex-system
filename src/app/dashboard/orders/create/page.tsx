'use client';

import React, { useState } from 'react';
import { useI18n } from '@/lib/i18n/I18nContext';
import { INITIAL_CLIENTS, INITIAL_DRIVERS } from '@/lib/mockData';
import { PayType, OrderType } from '@/types';
import { useRouter } from 'next/navigation';
import {
  PackageCheck,
  Building2,
  User,
  Calculator,
  CheckSquare,
  Save,
  ArrowLeft,
  Printer,
  CheckCircle2,
  X,
  PlusCircle,
} from 'lucide-react';

export default function CreateOrderPage() {
  const { t, lang } = useI18n();
  const router = useRouter();

  // Auto-generate Voucher No
  const [voucherNo, setVoucherNo] = useState(`VCH-2026-${Math.floor(100000 + Math.random() * 900000)}`);
  const [refNo, setRefNo] = useState('');
  const [billNo, setBillNo] = useState(`INV-${Math.floor(1000 + Math.random() * 9000)}`);

  // Client & Customer state
  const [selectedClientId, setSelectedClientId] = useState(INITIAL_CLIENTS[0].id);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [emirate, setEmirate] = useState('Dubai');
  const [area, setArea] = useState('Business Bay');
  const [addressLine, setAddressLine] = useState('');

  // Configuration
  const [payType, setPayType] = useState<PayType>('COD');
  const [orderType, setOrderType] = useState<OrderType>('Standard');
  const [pickupDriverId, setPickupDriverId] = useState(INITIAL_DRIVERS[0].id);

  // Checkboxes
  const [isPickup, setIsPickup] = useState(true);
  const [isExchange, setIsExchange] = useState(false);
  const [isFragile, setIsFragile] = useState(false);

  // Financials
  const [quantity, setQuantity] = useState(1);
  const [productPrice, setProductPrice] = useState(150);
  const [deliveryCharge, setDeliveryCharge] = useState(25);

  // Success / Print Modal
  const [createdOrderModal, setCreatedOrderModal] = useState<boolean>(false);

  // VAT (5% on delivery charge)
  const taxAmount = parseFloat((deliveryCharge * 0.05).toFixed(2));
  const totalAmount = parseFloat((productPrice + deliveryCharge + taxAmount).toFixed(2));
  const codAmount = payType === 'COD' ? totalAmount : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !addressLine) {
      alert(lang === 'ar' ? 'الرجاء تعبئة جميع بيانات المستلم (الاسم، الهاتف، العنوان).' : 'Please complete recipient details (Name, Phone, Address).');
      return;
    }
    setCreatedOrderModal(true);
  };

  const selectedClient = INITIAL_CLIENTS.find((c) => c.id === selectedClientId);

  const resetForm = () => {
    setVoucherNo(`VCH-2026-${Math.floor(100000 + Math.random() * 900000)}`);
    setBillNo(`INV-${Math.floor(1000 + Math.random() * 9000)}`);
    setRefNo('');
    setCustomerName('');
    setCustomerPhone('');
    setAddressLine('');
    setCreatedOrderModal(false);
  };

  return (
    <div className="space-y-6 relative">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-[#169C47] font-bold text-xs">
              <PackageCheck className="w-4 h-4" />
              <span>{t.orders.title}</span>
            </div>
            <h2 className="text-xl font-black text-slate-900 mt-1">{t.orders.createTitle}</h2>
            <p className="text-slate-500 text-xs mt-0.5">
              Voucher auto-assigned: <span className="font-bold text-[#169C47] font-mono">{voucherNo}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all border border-slate-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.common.cancel}</span>
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-[#169C47] hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{t.orders.submitOrder}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Client & Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Section 1: Client & Identifiers */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Building2 className="w-4 h-4 text-[#169C47]" />
                <h3 className="font-bold text-slate-900 text-sm">
                  {lang === 'ar' ? 'بيانات العميل المورد ومرجع الشحنة' : 'Corporate Client & Reference'}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t.orders.client}</label>
                  <select
                    value={selectedClientId}
                    onChange={(e) => setSelectedClientId(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-[#169C47] outline-none"
                  >
                    {INITIAL_CLIENTS.map((cli) => (
                      <option key={cli.id} value={cli.id}>
                        {cli.companyName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t.orders.refNo}</label>
                  <input
                    type="text"
                    value={refNo}
                    onChange={(e) => setRefNo(e.target.value)}
                    placeholder="e.g. PO-99201"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#169C47] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t.orders.billNo}</label>
                  <input
                    type="text"
                    value={billNo}
                    onChange={(e) => setBillNo(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:ring-2 focus:ring-[#169C47] outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Recipient Customer Info */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <User className="w-4 h-4 text-[#169C47]" />
                <h3 className="font-bold text-slate-900 text-sm">
                  {lang === 'ar' ? 'تفاصيل المستلم (العميل النهائي)' : 'Recipient (End Customer) Details'}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t.orders.customerName} *</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={lang === 'ar' ? 'الاسم الكامل للمستلم' : 'Recipient full name'}
                    required
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#169C47] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t.orders.customerPhone} *</label>
                  <input
                    type="text"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+971 50 000 0000"
                    required
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:ring-2 focus:ring-[#169C47] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t.orders.customerEmirate}</label>
                  <select
                    value={emirate}
                    onChange={(e) => setEmirate(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#169C47] outline-none"
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

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t.orders.customerArea}</label>
                  <input
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="e.g. Business Bay, Al Marina"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#169C47] outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t.orders.address} *</label>
                  <input
                    type="text"
                    value={addressLine}
                    onChange={(e) => setAddressLine(e.target.value)}
                    placeholder={lang === 'ar' ? 'اسم البناية، الطابق، رقم الشقة أو الفيلا' : 'Building name, Floor, Apartment or Villa No.'}
                    required
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#169C47] outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Order Configuration & Checkboxes */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <CheckSquare className="w-4 h-4 text-[#169C47]" />
                <h3 className="font-bold text-slate-900 text-sm">
                  {lang === 'ar' ? 'نوع التوصيل والسائق المعين' : 'Type, Drivers & Flags'}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t.orders.payType}</label>
                  <select
                    value={payType}
                    onChange={(e) => setPayType(e.target.value as PayType)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-emerald-800 focus:ring-2 focus:ring-[#169C47] outline-none"
                  >
                    <option value="COD">COD - Cash On Delivery</option>
                    <option value="CAD">CAD - Cash Against Delivery</option>
                    <option value="CAO">CAO - Cash Against Order</option>
                    <option value="TAO">TAO - Transfer Against Order</option>
                    <option value="FOC">FOC - Free Of Charge</option>
                    <option value="APS">APS - Advance Sender</option>
                    <option value="APR">APR - Advance Receiver</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t.orders.orderType}</label>
                  <select
                    value={orderType}
                    onChange={(e) => setOrderType(e.target.value as OrderType)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[#169C47] outline-none"
                  >
                    <option value="Standard">Standard Delivery</option>
                    <option value="Chiller">Chiller Truck</option>
                    <option value="Fragile">Fragile / High Value</option>
                    <option value="Express">Express Courier</option>
                    <option value="File Document">File Document</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t.orders.pickupDriver}</label>
                  <select
                    value={pickupDriverId}
                    onChange={(e) => setPickupDriverId(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[#169C47] outline-none"
                  >
                    {INITIAL_DRIVERS.map((drv) => (
                      <option key={drv.id} value={drv.id}>
                        {drv.fullName} ({drv.emirate})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPickup}
                    onChange={(e) => setIsPickup(e.target.checked)}
                    className="w-4 h-4 text-[#169C47] rounded focus:ring-[#169C47]"
                  />
                  <span>{t.orders.isPickup}</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isExchange}
                    onChange={(e) => setIsExchange(e.target.checked)}
                    className="w-4 h-4 text-[#169C47] rounded focus:ring-[#169C47]"
                  />
                  <span>{t.orders.isExchange}</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFragile}
                    onChange={(e) => setIsFragile(e.target.checked)}
                    className="w-4 h-4 text-[#169C47] rounded focus:ring-[#169C47]"
                  />
                  <span>{t.orders.isFragile}</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Financial Summary Card */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 sticky top-6">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Calculator className="w-4 h-4 text-[#169C47]" />
                <h3 className="font-bold text-slate-900 text-sm">
                  {lang === 'ar' ? 'حساب التكلفة وضريبة قيمة المضافة 5%' : 'Financial Calculator & 5% VAT'}
                </h3>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t.orders.quantity}</label>
                  <input
                    type="number"
                    value={quantity}
                    min={1}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#169C47] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t.orders.productPrice}</label>
                  <input
                    type="number"
                    value={productPrice}
                    onChange={(e) => setProductPrice(parseFloat(e.target.value) || 0)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-[#169C47] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t.orders.deliveryCharge}</label>
                  <input
                    type="number"
                    value={deliveryCharge}
                    onChange={(e) => setDeliveryCharge(parseFloat(e.target.value) || 0)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-[#169C47] outline-none"
                  />
                </div>
              </div>

              {/* Calculations Breakdown */}
              <div className="bg-slate-50 rounded-xl p-4 space-y-2 border border-slate-200 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Base Products:</span>
                  <span className="font-bold text-slate-800">AED {productPrice.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Delivery Charge:</span>
                  <span className="font-bold text-slate-800">AED {deliveryCharge.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>UAE VAT (5%):</span>
                  <span className="font-bold text-emerald-700">AED {taxAmount.toFixed(2)}</span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex items-center justify-between font-black text-sm text-slate-900">
                  <span>{t.orders.totalAmount}:</span>
                  <span className="text-[#169C47]">AED {totalAmount.toFixed(2)}</span>
                </div>
                {payType === 'COD' && (
                  <div className="bg-amber-100 text-amber-900 p-2 rounded-lg font-bold text-xs flex items-center justify-between">
                    <span>COD Collection:</span>
                    <span>AED {codAmount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#169C47] hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{t.orders.submitOrder}</span>
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Success & Printable Voucher Modal */}
      {createdOrderModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-emerald-50">
              <div className="flex items-center gap-2 text-[#169C47]">
                <CheckCircle2 className="w-6 h-6" />
                <h3 className="font-bold text-slate-900 text-base">
                  {lang === 'ar' ? 'تم إنشاء البوليصة بنجاح!' : 'Order Created Successfully!'}
                </h3>
              </div>
              <button
                onClick={() => setCreatedOrderModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Printable Voucher View */}
            <div className="p-6 space-y-4">
              <div className="border border-slate-300 p-5 rounded-xl bg-white text-slate-900 space-y-3">
                <div className="flex justify-between items-start border-b border-slate-200 pb-3">
                  <div>
                    <h1 className="text-xl font-black text-[#169C47]">OMEX EXPRESS UAE</h1>
                    <p className="text-xs text-slate-500">Official Delivery Note</p>
                  </div>
                  <div className="text-end">
                    <p className="font-mono font-bold text-base text-[#169C47]">{voucherNo}</p>
                    <p className="text-xs text-slate-500">Bill: {billNo}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs border-b border-slate-200 pb-3">
                  <div>
                    <p className="font-bold text-slate-500">CLIENT (SENDER):</p>
                    <p className="font-bold text-slate-900">{selectedClient?.companyName}</p>
                    <p className="text-slate-600">Ref: {refNo || '-'}</p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-500">RECIPIENT (CUSTOMER):</p>
                    <p className="font-bold text-slate-900">{customerName}</p>
                    <p className="text-slate-700 font-mono">{customerPhone}</p>
                    <p className="text-slate-600">{addressLine}, {emirate}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg font-bold text-xs">
                  <span>Pay Type: <strong className="text-[#169C47]">{payType}</strong></span>
                  <span>Total Amount (Inc. 5% VAT): <strong className="text-sm">AED {totalAmount.toFixed(2)}</strong></span>
                </div>
              </div>

              {/* Action Buttons inside Modal */}
              <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition flex items-center gap-1.5"
                >
                  <PlusCircle className="w-4 h-4 text-[#169C47]" />
                  <span>{lang === 'ar' ? 'إنشاء طلب آخر' : 'Create Another'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition shadow-md flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'طباعة البوليصة الآن' : 'Print Voucher Now'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => router.push('/dashboard/orders/list')}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#169C47] hover:bg-[#128a3c] transition shadow-md"
                >
                  {lang === 'ar' ? 'الانتقال لقائمة الطلبات' : 'Go to Orders List'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
