'use client';

import React, { useState } from 'react';
import { useI18n } from '@/lib/i18n/I18nContext';
import { Printer, MapPin, Paperclip, RotateCcw, DollarSign, Send, Truck, Package, History, Clock, FileText } from 'lucide-react';

export default function OrderDetailsPage() {
  const { lang } = useI18n();
  const [activeTab, setActiveTab] = useState('ORDER INFO');

  const isAr = lang === 'ar';

  const orderData = {
    voucherNo: 'OD531664664',
    clientBillNo: 'N/A',
    refNo: '1',
    orderDate: '02/08/2026',
    pickupDate: '02/08/2026',
    deliveryDate: '03/08/2026',
    payType: 'COD',
    paymentStatus: 'Processing',
    returnStatus: 'Processing',
    createdBy: 'ebook',
    updatedBy: 'ebook',
    attempts: 'N/A',
    reason: 'N/A',
    batchNo: 'N/A',
    pickedBy: 'N/A',
    status: 'Pickup Scheduled',

    // Pricing
    productPrice: 500,
    previousProductPrice: 500,
    actualProductPrice: 500,
    deliveryCharge: 20,
    tax: 1,
    clientAmount: 500,
    customerAmount: 521,
    agent: 'N/A',
    commission: 0,

    // Delivery Address
    deliveryAddress: {
      location: isAr ? 'بزنس بيه' : 'Business Bay',
      emirate: 'Dubai',
      area: 'Dubai',
      address: 'N/A',
      poBox: 'N/A',
      locationUrl: 'N/A',
    },

    // Consignee Details (Recipient)
    consignee: {
      name: '6544',
      mobile1: '65464684',
      mobile2: 'N/A',
    },

    // Shipping Address
    shippingAddress: {
      contactNo: 'N/A',
      location: isAr ? 'اذن' : 'Idhn',
      emirate: 'Ras Al Khaimah',
      area: 'Ras Al Khaimah',
      address: 'N/A',
      poBox: 'N/A',
      locationUrl: 'N/A',
    },

    // Shipper Details (Client)
    shipper: {
      name: isAr ? 'تالانتارلا' : 'Talantarla',
      clientNo: '176',
      mobile1: '325465353',
    },
  };

  const tabs = [
    { id: 'ORDER INFO', labelEn: 'ORDER INFO', labelAr: 'معلومات الطلب', icon: FileText },
    { id: 'STATUS UPDATES', labelEn: 'STATUS UPDATES', labelAr: 'تحديثات الحالة', icon: Clock },
    { id: 'ORDER HISTORY', labelEn: 'ORDER HISTORY', labelAr: 'سجل الطلب', icon: History },
    { id: 'PICKUP', labelEn: 'PICKUP', labelAr: 'الاستلام', icon: Package },
    { id: 'DELIVERY', labelEn: 'DELIVERY', labelAr: 'التوصيل', icon: Truck },
    { id: 'SHIPPING', labelEn: 'SHIPPING', labelAr: 'الشحن', icon: Send },
    { id: 'PAYMENTS', labelEn: 'PAYMENTS', labelAr: 'المدفوعات', icon: DollarSign },
    { id: 'RETURNS', labelEn: 'RETURNS', labelAr: 'المرتجعات', icon: RotateCcw },
    { id: 'ATTACHMENTS', labelEn: 'ATTACHMENTS', labelAr: 'المرفقات', icon: Paperclip },
    { id: 'DELIVERY MAP', labelEn: 'DELIVERY MAP', labelAr: 'خريطة التوصيل', icon: MapPin },
  ];

  return (
    <div className="space-y-6 bg-slate-50 min-h-screen p-4 sm:p-6 printable-area">
      {/* Header Bar */}
      <div className="flex items-center justify-between no-print">
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#169C47] hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md transition active:scale-95 cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>{isAr ? 'طباعة' : 'PRINT'}</span>
        </button>

        <h1 className="text-2xl font-black text-slate-900">
          {isAr ? 'تفاصيل الطلب' : 'Order Details'}
        </h1>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-slate-200 bg-white rounded-xl shadow-xs p-1 flex items-center gap-2 overflow-x-auto scrollbar-none no-print">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all border-b-2 ${
                isActive
                  ? 'border-[#169C47] text-[#169C47] bg-emerald-50/50'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{isAr ? tab.labelAr : tab.labelEn}</span>
            </button>
          );
        })}
      </div>

      {/* ORDER INFO Tab Content (Matching Reference Image 1:1) */}
      {activeTab === 'ORDER INFO' && (
        <div className="space-y-6">
          {/* Top Main Section */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Pricing Details */}
            <div className="space-y-3">
              <h2 className="text-base font-black text-slate-900 border-b border-slate-100 pb-2">
                {isAr ? 'تفاصيل الأسعار والمالية' : 'Pricing Details'}
              </h2>

              <div className="space-y-1.5 text-xs text-slate-700">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">{isAr ? 'سعر المنتج:' : 'Product Price:'}</span>
                  <span className="font-bold">AED {orderData.productPrice}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">{isAr ? 'سعر المنتج السابـق:' : 'Previous Product Price:'}</span>
                  <span className="font-bold">AED {orderData.previousProductPrice}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">{isAr ? 'سعر المنتج الفعلي:' : 'Actual Product Price:'}</span>
                  <span className="font-bold">AED {orderData.actualProductPrice}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">{isAr ? 'رسوم التوصيل:' : 'Delivery Charge:'}</span>
                  <span className="font-bold">AED {orderData.deliveryCharge}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">{isAr ? 'الضريبة (5%):' : 'Tax:'}</span>
                  <span className="font-bold">AED {orderData.tax}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50 font-black text-slate-900 bg-slate-50 px-2 rounded-lg">
                  <span>{isAr ? 'مبلغ العميل:' : 'Client Amount:'}</span>
                  <span className="text-[#169C47]">AED {orderData.clientAmount}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50 font-black text-slate-900 bg-emerald-50 px-2 rounded-lg">
                  <span>{isAr ? 'مبلغ الزبون:' : 'Customer Amount:'}</span>
                  <span className="text-emerald-700">AED {orderData.customerAmount}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">{isAr ? 'الوكيل:' : 'Agent:'}</span>
                  <span className="font-bold">{orderData.agent}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">{isAr ? 'العمولة:' : 'Commission:'}</span>
                  <span className="font-bold">AED {orderData.commission}</span>
                </div>
              </div>
            </div>

            {/* Middle Column: Status & Order Metadata */}
            <div className="space-y-3 border-s border-slate-100 ps-0 lg:ps-6">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                <div><span className="text-slate-400">{isAr ? 'حالة الدفع:' : 'Payment Status:'}</span> <strong className="block text-slate-800">{orderData.paymentStatus}</strong></div>
                <div><span className="text-slate-400">{isAr ? 'رقم السند:' : 'Voucher No:'}</span> <strong className="block font-mono text-[#169C47]">{orderData.voucherNo}</strong></div>

                <div><span className="text-slate-400">{isAr ? 'حالة المرتجع:' : 'Return Status:'}</span> <strong className="block text-slate-800">{orderData.returnStatus}</strong></div>
                <div><span className="text-slate-400">{isAr ? 'رقم فاتورة العميل:' : 'Client Bill No:'}</span> <strong className="block text-slate-800">{orderData.clientBillNo}</strong></div>

                <div><span className="text-slate-400">{isAr ? 'بواسطة:' : 'Created By:'}</span> <strong className="block text-slate-800">{orderData.createdBy}</strong></div>
                <div><span className="text-slate-400">{isAr ? 'رقم المرجع:' : 'Ref No:'}</span> <strong className="block text-slate-800">{orderData.refNo}</strong></div>

                <div><span className="text-slate-400">{isAr ? 'تم التحديث بواسطة:' : 'Updated By:'}</span> <strong className="block text-slate-800">{orderData.updatedBy}</strong></div>
                <div><span className="text-slate-400">{isAr ? 'تاريخ الطلب:' : 'Order Date:'}</span> <strong className="block text-slate-800">{orderData.orderDate}</strong></div>

                <div><span className="text-slate-400">{isAr ? 'المحاولات:' : 'Attempts:'}</span> <strong className="block text-slate-800">{orderData.attempts}</strong></div>
                <div><span className="text-slate-400">{isAr ? 'تاريخ الاستلام:' : 'Pickup Date:'}</span> <strong className="block text-slate-800">{orderData.pickupDate}</strong></div>

                <div><span className="text-slate-400">{isAr ? 'السبب:' : 'Reason:'}</span> <strong className="block text-slate-800">{orderData.reason}</strong></div>
                <div><span className="text-slate-400">{isAr ? 'تاريخ التسليم:' : 'Delivery Date:'}</span> <strong className="block text-slate-800">{orderData.deliveryDate}</strong></div>

                <div><span className="text-slate-400">{isAr ? 'رقم الدفعة:' : 'Batch No:'}</span> <strong className="block text-slate-800">{orderData.batchNo}</strong></div>
                <div><span className="text-slate-400">{isAr ? 'نوع الدفع:' : 'Pay Type:'}</span> <strong className="block text-slate-800 font-bold">{orderData.payType}</strong></div>

                <div><span className="text-slate-400">{isAr ? 'تم الاستلام بواسطة:' : 'Picked By:'}</span> <strong className="block text-slate-800">{orderData.pickedBy}</strong></div>
              </div>
            </div>

            {/* Right Column: Barcode, QR Code & Status */}
            <div className="flex flex-col items-center justify-center space-y-4 border-s border-slate-100 ps-0 lg:ps-6 text-center">
              {/* QR Code SVG */}
              <div className="bg-white p-3 border-2 border-slate-900 rounded-xl shadow-xs">
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                  <rect width="100" height="100" fill="white"/>
                  <rect x="10" y="10" width="30" height="30" fill="black"/>
                  <rect x="15" y="15" width="20" height="20" fill="white"/>
                  <rect x="20" y="20" width="10" height="10" fill="black"/>
                  
                  <rect x="60" y="10" width="30" height="30" fill="black"/>
                  <rect x="65" y="15" width="20" height="20" fill="white"/>
                  <rect x="70" y="20" width="10" height="10" fill="black"/>

                  <rect x="10" y="60" width="30" height="30" fill="black"/>
                  <rect x="15" y="65" width="20" height="20" fill="white"/>
                  <rect x="20" y="70" width="10" height="10" fill="black"/>

                  <rect x="50" y="50" width="15" height="15" fill="black"/>
                  <rect x="70" y="65" width="15" height="20" fill="black"/>
                  <rect x="55" y="75" width="10" height="15" fill="black"/>
                </svg>
              </div>

              {/* Barcode Graphic */}
              <div className="space-y-1">
                <div className="flex gap-1 justify-center h-12 items-center px-4 bg-white border border-slate-200 rounded-lg">
                  <span className="w-1 h-10 bg-slate-900"></span>
                  <span className="w-0.5 h-10 bg-slate-900"></span>
                  <span className="w-1.5 h-10 bg-slate-900"></span>
                  <span className="w-0.5 h-10 bg-slate-900"></span>
                  <span className="w-2 h-10 bg-slate-900"></span>
                  <span className="w-1 h-10 bg-slate-900"></span>
                  <span className="w-0.5 h-10 bg-slate-900"></span>
                  <span className="w-2 h-10 bg-slate-900"></span>
                  <span className="w-1 h-10 bg-slate-900"></span>
                  <span className="w-1.5 h-10 bg-slate-900"></span>
                  <span className="w-0.5 h-10 bg-slate-900"></span>
                  <span className="w-1 h-10 bg-slate-900"></span>
                </div>
                <p className="font-mono font-bold text-sm tracking-widest text-slate-800">{orderData.voucherNo}</p>
              </div>

              {/* Status Badge */}
              <div className="pt-2">
                <span className="px-4 py-1.5 bg-purple-100 text-purple-800 font-black text-xs rounded-full border border-purple-200">
                  {isAr ? `الحالة: ${orderData.status}` : `Status: ${orderData.status}`}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom 4-Column Address & Details Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Delivery Address */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="font-black text-slate-900 text-sm border-b border-slate-100 pb-2">
                {isAr ? 'عنوان التسليم' : 'Delivery Address'}
              </h3>
              <div className="space-y-1.5 text-xs text-slate-700">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400">{isAr ? 'الموقع:' : 'Location:'}</span>
                  <span className="font-bold">{orderData.deliveryAddress.location}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400">{isAr ? 'الإمارة:' : 'Emirate:'}</span>
                  <span className="font-bold">{orderData.deliveryAddress.emirate}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400">{isAr ? 'المنطقة:' : 'Area:'}</span>
                  <span className="font-bold">{orderData.deliveryAddress.area}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400">{isAr ? 'العنوان:' : 'Address:'}</span>
                  <span className="font-bold">{orderData.deliveryAddress.address}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400">{isAr ? 'ص.ب:' : 'PO Box:'}</span>
                  <span className="font-bold">{orderData.deliveryAddress.poBox}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">{isAr ? 'رابط الموقع:' : 'Location URL:'}</span>
                  <span className="font-bold text-blue-600">{orderData.deliveryAddress.locationUrl}</span>
                </div>
              </div>
            </div>

            {/* 2. Consignee Details (Recipient/Customer) */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="font-black text-slate-900 text-sm border-b border-slate-100 pb-2">
                {isAr ? 'تفاصيل الزبون (المستلم)' : 'Consignee Details'}
              </h3>
              <div className="space-y-1.5 text-xs text-slate-700">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400">{isAr ? 'الاسم:' : 'Name:'}</span>
                  <span className="font-bold">{orderData.consignee.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400">{isAr ? 'جوال 1:' : 'Mobile No1:'}</span>
                  <span className="font-bold font-mono">{orderData.consignee.mobile1}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">{isAr ? 'جوال 2:' : 'Mobile No2:'}</span>
                  <span className="font-bold">{orderData.consignee.mobile2}</span>
                </div>
              </div>
            </div>

            {/* 3. Shipping Address */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="font-black text-slate-900 text-sm border-b border-slate-100 pb-2">
                {isAr ? 'عنوان الشحن' : 'Shipping Address'}
              </h3>
              <div className="space-y-1.5 text-xs text-slate-700">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400">{isAr ? 'رقم التواصل:' : 'Contact No:'}</span>
                  <span className="font-bold">{orderData.shippingAddress.contactNo}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400">{isAr ? 'الموقع:' : 'Location:'}</span>
                  <span className="font-bold">{orderData.shippingAddress.location}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400">{isAr ? 'الإمارة:' : 'Emirate:'}</span>
                  <span className="font-bold">{orderData.shippingAddress.emirate}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400">{isAr ? 'المنطقة:' : 'Area:'}</span>
                  <span className="font-bold">{orderData.shippingAddress.area}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400">{isAr ? 'العنوان:' : 'Address:'}</span>
                  <span className="font-bold">{orderData.shippingAddress.address}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">{isAr ? 'ص.ب:' : 'PO Box:'}</span>
                  <span className="font-bold">{orderData.shippingAddress.poBox}</span>
                </div>
              </div>
            </div>

            {/* 4. Shipper Details (Client/Sender) */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="font-black text-slate-900 text-sm border-b border-slate-100 pb-2">
                {isAr ? 'تفاصيل العميل (الراسل)' : 'Shipper Details'}
              </h3>
              <div className="space-y-1.5 text-xs text-slate-700">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400">{isAr ? 'الاسم:' : 'Name:'}</span>
                  <span className="font-bold">{orderData.shipper.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400">{isAr ? 'رقم العميل:' : 'Client No:'}</span>
                  <span className="font-bold">{orderData.shipper.clientNo}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">{isAr ? 'جوال 1:' : 'Mobile No1:'}</span>
                  <span className="font-bold font-mono">{orderData.shipper.mobile1}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
