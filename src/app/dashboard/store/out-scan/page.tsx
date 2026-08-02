'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { ScanLine } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"barcode","en":"Barcode","ar":"الباركود"},{"key":"orderNo","en":"Order No","ar":"رقم الطلب"},{"key":"driver","en":"Driver","ar":"السائق"},{"key":"scannedBy","en":"Scanned By","ar":"المسؤول"},{"key":"time","en":"Time","ar":"الوقت"},{"key":"status","en":"Status","ar":"الحالة"}];
const sampleRows = [{"id":1,"barcode":"OMX001234567","orderNo":"OMX-20240115-001","driver":"Ahmed K.","scannedBy":"Warehouse M.","time":"10:30 AM","status":"Dispatched"},{"id":2,"barcode":"OMX001234568","orderNo":"OMX-20240115-002","driver":"Ahmed K.","scannedBy":"Warehouse M.","time":"10:31 AM","status":"Dispatched"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Out Scan"
      titleAr="مسح الخروج"
      descriptionEn="Scan packages leaving the store"
      descriptionAr="مسح الطرود الخارجة من المخزن"
      icon={ScanLine}
      columns={columns}
      rows={sampleRows}
      showDateFilter={true} statusKey="status" statusColors={{"Dispatched":"bg-blue-100 text-blue-700","Error":"bg-red-100 text-red-700"}} createLabelEn="Start Scan" createLabelAr="بدء المسح"
    />
  );
}
