'use client';

import React, { useState } from 'react';
import { useI18n } from '@/lib/i18n/I18nContext';
import { INITIAL_CLIENTS, INITIAL_DRIVERS } from '@/lib/mockData';
import { PayType, OrderType } from '@/types';
import { useRouter } from 'next/navigation';
import {
  Save,
  ArrowLeft,
  Printer,
  CheckCircle2,
  X,
  PlusCircle,
  Search,
  Home,
  RefreshCw,
  Edit,
  HelpCircle,
} from 'lucide-react';

export default function CreateOrderPage() {
  const { t, lang } = useI18n();
  const router = useRouter();

  // Section 1: Order Meta
  const [voucherNo] = useState(`OD${Math.floor(1000 + Math.random() * 9000)}`);
  const [refNo, setRefNo] = useState('0');
  const [pickupDriver, setPickupDriver] = useState('');
  const [payType, setPayType] = useState<PayType>('COD');
  const [isPickup, setIsPickup] = useState(false);
  const [isExchange, setIsExchange] = useState(false);
  const [isFragile, setIsFragile] = useState(false);

  const [collectFrom, setCollectFrom] = useState<'Client' | 'Customer'>('Customer');
  const [clientInvoiceNo, setClientInvoiceNo] = useState('');
  const [orderType, setOrderType] = useState<OrderType>('Normal');
  const [agentName, setAgentName] = useState('');
  const [deliveryArea, setDeliveryArea] = useState('');

  // Section 2: Client (Sender) Details
  const [clientName, setClientName] = useState('');
  const [clientNo, setClientNo] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmirate, setClientEmirate] = useState('');
  const [clientLocation, setClientLocation] = useState('');
  const [clientLocationLink, setClientLocationLink] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [clientPoBox, setClientPoBox] = useState('');

  // Section 2: Customer (Recipient / الزبون) Details
  const [customerName, setCustomerName] = useState('');
  const [customerPhone1, setCustomerPhone1] = useState('');
  const [customerPhone2, setCustomerPhone2] = useState('');
  const [customerEmirate, setCustomerEmirate] = useState('');
  const [customerLocation, setCustomerLocation] = useState('');
  const [customerLocationLink, setCustomerLocationLink] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerPoBox, setCustomerPoBox] = useState('');

  // Section 3: Financials & Dates
  const todayStr = new Date().toISOString().slice(0, 10);
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().slice(0, 10);

  const [pickupDate, setPickupDate] = useState(todayStr);
  const [deliveryDate, setDeliveryDate] = useState(tomorrowStr);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  const [productPrice, setProductPrice] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(20);

  // Success Modal
  const [createdOrderModal, setCreatedOrderModal] = useState<boolean>(false);

  // VAT & Amounts
  const vatAmount = parseFloat((deliveryCharge * 0.05).toFixed(2));
  const totalCustomerAmount = collectFrom === 'Customer' ? productPrice + deliveryCharge + vatAmount : 0;
  const totalClientAmount = collectFrom === 'Client' ? deliveryCharge + vatAmount : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCreatedOrderModal(true);
  };

  const resetForm = () => {
    setClientName('');
    setClientNo('');
    setClientPhone('');
    setCustomerName('');
    setCustomerPhone1('');
    setCustomerPhone2('');
    setCustomerAddress('');
    setNotes('');
    setCreatedOrderModal(false);
  };

  return (
    <div className="space-y-6 relative text-xs font-sans">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">
            {lang === 'ar' ? 'إدخال الطلب' : 'Create Order'}
          </h1>
          <p className="text-slate-500 text-xs mt-0.5">
            {lang === 'ar' ? 'إنشاء وإدارة الطلبات' : 'Create and manage orders'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === 'ar' ? 'إلغاء' : 'Cancel'}</span>
          </button>

          <button
            onClick={handleSubmit}
            type="button"
            className="flex items-center gap-2 px-5 py-2 bg-[#169C47] hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition active:scale-95 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{lang === 'ar' ? 'حفظ الطلب' : 'Save Order'}</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* ── SECTION 1: Order Meta Card (إدخال الطلب العلوي) ── */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          {/* Row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 items-end">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                {lang === 'ar' ? 'رقم السند' : 'Voucher No'}
              </label>
              <input
                type="text"
                readOnly
                value={voucherNo}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-slate-800 text-center"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                {lang === 'ar' ? 'رقم المرجع' : 'Ref No'}
              </label>
              <input
                type="text"
                value={refNo}
                onChange={(e) => setRefNo(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                {lang === 'ar' ? 'الاستلام بواسطة' : 'Pickup By'}
              </label>
              <input
                type="text"
                value={pickupDriver}
                onChange={(e) => setPickupDriver(e.target.value)}
                placeholder={lang === 'ar' ? 'ابحث أو اختر السائق' : 'Search driver'}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-start"
              />
            </div>

            <div>
              <div className="flex items-center gap-1 mb-1">
                <label className="block text-[11px] font-bold text-slate-700">
                  {lang === 'ar' ? 'نوع الدفع' : 'Pay Type'}
                </label>
                <HelpCircle className="w-3 h-3 text-slate-400" />
              </div>
              <select
                value={payType}
                onChange={(e) => setPayType(e.target.value as PayType)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
              >
                <option value="COD">COD</option>
                <option value="CAD">CAD</option>
                <option value="CAO">CAO</option>
                <option value="TAO">TAO</option>
                <option value="FOC">FOC</option>
              </select>
            </div>

            {/* Checkboxes */}
            <div className="flex items-center gap-4 py-2">
              <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPickup}
                  onChange={(e) => setIsPickup(e.target.checked)}
                  className="w-4 h-4 text-[#169C47] rounded"
                />
                <span>{lang === 'ar' ? 'للاستلام؟' : 'Pickup?'}</span>
              </label>
              <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isExchange}
                  onChange={(e) => setIsExchange(e.target.checked)}
                  className="w-4 h-4 text-[#169C47] rounded"
                />
                <span>{lang === 'ar' ? 'تبديل؟' : 'Exchange?'}</span>
              </label>
              <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFragile}
                  onChange={(e) => setIsFragile(e.target.checked)}
                  className="w-4 h-4 text-[#169C47] rounded"
                />
                <span>{lang === 'ar' ? 'قابل للكسر؟' : 'Fragile?'}</span>
              </label>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 items-end">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                {lang === 'ar' ? 'التحصيل من' : 'Collect From'}
              </label>
              <select
                value={collectFrom}
                onChange={(e) => setCollectFrom(e.target.value as any)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
              >
                <option value="Customer">{lang === 'ar' ? 'الزبون (المستلم)' : 'Customer'}</option>
                <option value="Client">{lang === 'ar' ? 'العميل (الراسل)' : 'Client'}</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                {lang === 'ar' ? 'رقم فاتورة العميل' : 'Client Invoice No'}
              </label>
              <input
                type="text"
                value={clientInvoiceNo}
                onChange={(e) => setClientInvoiceNo(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                {lang === 'ar' ? 'النوع' : 'Type'}
              </label>
              <select
                value={orderType}
                onChange={(e) => setOrderType(e.target.value as OrderType)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
              >
                <option value="Normal">Normal</option>
                <option value="Standard">Standard</option>
                <option value="Express">Express</option>
                <option value="Chiller">Chiller</option>
                <option value="Fragile">Fragile</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                {lang === 'ar' ? 'الوكيل' : 'Agent'}
              </label>
              <select
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
              >
                <option value="">{lang === 'ar' ? 'اختر الوكيل' : 'Select Agent'}</option>
                <option value="Express Delivery Co.">Express Delivery Co.</option>
                <option value="Speed Cargo">Speed Cargo</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                {lang === 'ar' ? 'منطقة التسليم' : 'Delivery Zone'}
              </label>
              <select
                value={deliveryArea}
                onChange={(e) => setDeliveryArea(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
              >
                <option value="">-</option>
                <option value="Business Bay">Business Bay</option>
                <option value="Deira">Deira</option>
                <option value="JBR">JBR</option>
                <option value="Al Reem">Al Reem Island</option>
              </select>
            </div>
          </div>
        </div>

        {/* ── SECTION 2: Client & Customer Side-by-Side Boxes ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Box 1: العميل (Client - Sender) */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-black text-slate-900 text-sm">
                {lang === 'ar' ? 'العميل (الراسل)' : 'Client (Sender)'}
              </h3>
              <div className="flex items-center gap-2 text-slate-400">
                <button type="button" className="p-1 hover:text-slate-600"><Search className="w-3.5 h-3.5" /></button>
                <button type="button" className="p-1 hover:text-slate-600"><Home className="w-3.5 h-3.5" /></button>
                <button type="button" className="p-1 hover:text-slate-600"><RefreshCw className="w-3.5 h-3.5" /></button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <div>
                <label className="block text-[10px] font-bold text-slate-700 mb-1">{lang === 'ar' ? 'اسم العميل' : 'Client Name'}</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder={lang === 'ar' ? 'ابحث أو أدخل عميلاً جديداً' : 'Search or enter client'}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-700 mb-1">{lang === 'ar' ? 'رقم العميل' : 'Client No'}</label>
                <input
                  type="text"
                  value={clientNo}
                  onChange={(e) => setClientNo(e.target.value)}
                  placeholder={lang === 'ar' ? 'أدخل رقم العميل' : 'Enter client ID'}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-700 mb-1">{lang === 'ar' ? 'رقم الجوال' : 'Mobile'}</label>
                <input
                  type="text"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder={lang === 'ar' ? 'أدخل رقم الجوال' : 'Enter mobile'}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 mb-1">{lang === 'ar' ? 'الإمارة' : 'Emirate'}</label>
                <select
                  value={clientEmirate}
                  onChange={(e) => setClientEmirate(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                >
                  <option value="">{lang === 'ar' ? 'اختر الإمارة' : 'Select Emirate'}</option>
                  <option value="Dubai">Dubai</option>
                  <option value="Abu Dhabi">Abu Dhabi</option>
                  <option value="Sharjah">Sharjah</option>
                  <option value="Ajman">Ajman</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-700 mb-1">{lang === 'ar' ? 'الموقع' : 'Location'}</label>
                <input
                  type="text"
                  value={clientLocation}
                  onChange={(e) => setClientLocation(e.target.value)}
                  placeholder={lang === 'ar' ? 'ابحث أو اختر الموقع' : 'Search location'}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-700 mb-1">{lang === 'ar' ? 'رابط الموقع' : 'Location Link'}</label>
                <input
                  type="text"
                  value={clientLocationLink}
                  onChange={(e) => setClientLocationLink(e.target.value)}
                  placeholder={lang === 'ar' ? 'رابط' : 'URL Link'}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-[10px] font-bold text-slate-700 mb-1">{lang === 'ar' ? 'العنوان' : 'Address'}</label>
                <input
                  type="text"
                  value={clientAddress}
                  onChange={(e) => setClientAddress(e.target.value)}
                  placeholder={lang === 'ar' ? 'أدخل العنوان' : 'Enter address'}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-700 mb-1">{lang === 'ar' ? 'صندوق البريد' : 'P.O. Box'}</label>
                <input
                  type="text"
                  value={clientPoBox}
                  onChange={(e) => setClientPoBox(e.target.value)}
                  placeholder={lang === 'ar' ? 'ص.ب' : 'P.O. Box'}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-center"
                />
              </div>
            </div>
          </div>

          {/* Box 2: الزبون (Customer - Recipient) */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-black text-slate-900 text-sm">
                {lang === 'ar' ? 'الزبون (المستلم)' : 'Customer (Recipient)'}
              </h3>
              <div className="flex items-center gap-2 text-slate-400">
                <button type="button" className="p-1 hover:text-slate-600"><Search className="w-3.5 h-3.5" /></button>
                <button type="button" className="p-1 hover:text-slate-600"><Home className="w-3.5 h-3.5" /></button>
                <button type="button" className="p-1 hover:text-slate-600"><Edit className="w-3.5 h-3.5" /></button>
                <button type="button" className="p-1 hover:text-slate-600"><RefreshCw className="w-3.5 h-3.5" /></button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <div>
                <label className="block text-[10px] font-bold text-slate-700 mb-1">{lang === 'ar' ? 'اسم الزبون' : 'Customer Name'}</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder={lang === 'ar' ? 'ابحث أو أدخل زبوناً جديداً' : 'Search or enter customer'}
                  required
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-700 mb-1">{lang === 'ar' ? 'جوال 1' : 'Mobile 1'}</label>
                <input
                  type="text"
                  value={customerPhone1}
                  onChange={(e) => setCustomerPhone1(e.target.value)}
                  placeholder={lang === 'ar' ? 'أدخل رقم الجوال' : 'Enter mobile 1'}
                  required
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-700 mb-1">{lang === 'ar' ? 'جوال 2' : 'Mobile 2'}</label>
                <input
                  type="text"
                  value={customerPhone2}
                  onChange={(e) => setCustomerPhone2(e.target.value)}
                  placeholder={lang === 'ar' ? 'اختياري' : 'Optional'}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 mb-1">{lang === 'ar' ? 'الإمارة' : 'Emirate'}</label>
                <select
                  value={customerEmirate}
                  onChange={(e) => setCustomerEmirate(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-blue-500 rounded-xl font-bold ring-2 ring-blue-100"
                >
                  <option value="">{lang === 'ar' ? 'اختر الإمارة' : 'Select Emirate'}</option>
                  <option value="Dubai">Dubai</option>
                  <option value="Abu Dhabi">Abu Dhabi</option>
                  <option value="Sharjah">Sharjah</option>
                  <option value="Ajman">Ajman</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-700 mb-1">{lang === 'ar' ? 'الموقع' : 'Location'}</label>
                <input
                  type="text"
                  value={customerLocation}
                  onChange={(e) => setCustomerLocation(e.target.value)}
                  placeholder={lang === 'ar' ? 'ابحث أو اختر الموقع' : 'Search location'}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-700 mb-1">{lang === 'ar' ? 'رابط الموقع' : 'Location Link'}</label>
                <input
                  type="text"
                  value={customerLocationLink}
                  onChange={(e) => setCustomerLocationLink(e.target.value)}
                  placeholder={lang === 'ar' ? 'رابط' : 'URL Link'}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-[10px] font-bold text-slate-700 mb-1">{lang === 'ar' ? 'العنوان' : 'Address'}</label>
                <input
                  type="text"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder={lang === 'ar' ? 'أدخل العنوان' : 'Enter address'}
                  required
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-700 mb-1">{lang === 'ar' ? 'صندوق البريد' : 'P.O. Box'}</label>
                <input
                  type="text"
                  value={customerPoBox}
                  onChange={(e) => setCustomerPoBox(e.target.value)}
                  placeholder={lang === 'ar' ? 'ص.ب' : 'P.O. Box'}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-center"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 3: Financials & Dates (تفاصيل الطلب والمالية) ── */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-black text-slate-900 text-sm border-b border-slate-100 pb-2">
            {lang === 'ar' ? 'تفاصيل الطلب والمالية' : 'Order & Financial Details'}
          </h3>

          {/* Row 1: Notes, Qty, Dates */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
            <div className="md:col-span-2">
              <label className="block text-[11px] font-bold text-slate-700 mb-1">{lang === 'ar' ? 'ملاحظات' : 'Notes'}</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={lang === 'ar' ? 'أدخل الملاحظات' : 'Enter notes'}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">{lang === 'ar' ? 'الكمية' : 'Quantity'}</label>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-bold text-slate-700 mb-1">{lang === 'ar' ? 'تاريخ الاستلام' : 'Pickup Date'}</label>
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-[11px]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-700 mb-1">{lang === 'ar' ? 'تاريخ التسليم' : 'Delivery Date'}</label>
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-[11px]"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Money Inputs & Highlighted Result Boxes */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 items-end pt-2">
            <div>
              <label className="block text-[10px] font-bold text-slate-700 mb-1">{lang === 'ar' ? 'سعر المنتج' : 'Product Price'}</label>
              <input
                type="number"
                value={productPrice}
                onChange={(e) => setProductPrice(parseFloat(e.target.value) || 0)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-700 mb-1">{lang === 'ar' ? 'رسوم التوصيل' : 'Delivery Charge'}</label>
              <input
                type="number"
                value={deliveryCharge}
                onChange={(e) => setDeliveryCharge(parseFloat(e.target.value) || 0)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-700 mb-1">{lang === 'ar' ? 'الضريبة (5%)' : 'VAT (5%)'}</label>
              <input
                type="number"
                readOnly
                value={vatAmount}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-500"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-blue-800 mb-1">{lang === 'ar' ? 'مبلغ العميل' : 'Client Amount'}</label>
              <div className="w-full p-2 bg-blue-50 border border-blue-200 rounded-xl text-center font-black text-blue-700 text-sm">
                {totalClientAmount.toFixed(0)}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-green-800 mb-1">{lang === 'ar' ? 'مبلغ الزبون' : 'Customer Amount'}</label>
              <div className="w-full p-2 bg-emerald-50 border border-emerald-300 rounded-xl text-center font-black text-[#169C47] text-sm">
                {totalCustomerAmount.toFixed(0)}
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Success Modal */}
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
                    <p className="text-xs text-slate-500">Invoice: {clientInvoiceNo || '-'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs border-b border-slate-200 pb-3">
                  <div>
                    <p className="font-bold text-slate-500">SENDER (العميل):</p>
                    <p className="font-bold text-slate-900">{clientName || 'General Client'}</p>
                    <p className="text-slate-600">{clientPhone}</p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-500">RECIPIENT (الزبون):</p>
                    <p className="font-bold text-slate-900">{customerName}</p>
                    <p className="text-slate-700 font-mono">{customerPhone1}</p>
                    <p className="text-slate-600">{customerAddress}, {customerEmirate}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg font-bold text-xs">
                  <span>Pay Type: <strong className="text-[#169C47]">{payType}</strong></span>
                  <span>Customer Amount: <strong className="text-sm text-[#169C47]">AED {totalCustomerAmount.toFixed(0)}</strong></span>
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
