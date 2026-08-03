'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { ScanLine } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"barcode","en":"Barcode","ar":"الباركود"},{"key":"orderNo","en":"Order No","ar":"رقم الطلب"},{"key":"client","en":"Client","ar":"العميل"},{"key":"scannedBy","en":"Scanned By","ar":"المسؤول"},{"key":"time","en":"Time","ar":"الوقت"},{"key":"status","en":"Status","ar":"الحالة"}];
const sampleRows = [{"id":1,"barcode":"OMX001234567","orderNo":"OMX-20240115-001","client":"Noon.com","scannedBy":"Ahmed K.","time":"09:15 AM","status":"Received"},{"id":2,"barcode":"OMX001234568","orderNo":"OMX-20240115-002","client":"Namshi","scannedBy":"Ahmed K.","time":"09:16 AM","status":"Received"},{"id":3,"barcode":"OMX001234569","orderNo":"OMX-20240115-003","client":"Mumzworld","scannedBy":"Mohammed A.","time":"09:20 AM","status":"Received"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="In Scan"
      titleAr="مسح الدخول"
      descriptionEn="Scan packages entering the store"
      descriptionAr="مسح الطرود الداخلة للمخزن"
      icon={ScanLine}
      columns={columns}
      rows={sampleRows}
      showDateFilter={true} showCameraScanner={true} statusKey="status" statusColors={{"Received":"bg-green-100 text-green-700","Error":"bg-red-100 text-red-700"}} createLabelEn="Start Scan" createLabelAr="بدء المسح"
    />
  );
}
